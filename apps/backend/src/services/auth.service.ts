import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/database';
import { env } from '../config/env';
import logger from '../utils/logger';

export class AuthService {
  async register(email: string, password: string, role: string, name: string, phone?: string) {
    const existing = await db('users').where({ email }).first();
    if (existing) throw new Error('Email already registered');

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const now = new Date().toISOString();

    await db('users').insert({
      id: userId, email, password_hash: passwordHash, phone, role,
      is_active: true, created_at: now, updated_at: now,
    });

    let profileId: string | undefined;
    if (role === 'worker') {
      profileId = uuidv4();
      await db('workers').insert({
        id: profileId, user_id: userId, name,
        verification_status: 'pending', reliability_score: 50,
        is_available: true, service_radius_km: 10,
        created_at: now, updated_at: now,
      });
      // Create welfare profile
      await db('welfare_profiles').insert({
        id: uuidv4(), worker_id: profileId, insurance_status: 'pending',
        total_contributions: 0, is_demo: true, created_at: now, updated_at: now,
      });
    } else if (role === 'customer') {
      profileId = uuidv4();
      await db('customers').insert({
        id: profileId, user_id: userId, name, phone,
        created_at: now, updated_at: now,
      });
    } else if (role === 'cooperative') {
      profileId = uuidv4();
      await db('cooperatives').insert({
        id: profileId, name: name + "'s Cooperative", leader_user_id: userId,
        verification_status: 'pending', reliability_score: 50,
        service_radius_km: 15, is_active: true,
        created_at: now, updated_at: now,
      });
    }

    const tokens = this.generateTokens(userId, email, role);
    await this.storeRefreshToken(userId, tokens.refresh_token);

    const user = await db('users').where({ id: userId }).first();
    const worker = role === 'worker' ? await db('workers').where({ user_id: userId }).first() : undefined;
    const customer = role === 'customer' ? await db('customers').where({ user_id: userId }).first() : undefined;
    const cooperative = role === 'cooperative' ? await db('cooperatives').where({ leader_user_id: userId }).first() : undefined;

    return {
      user: { id: user.id, email: user.email, role: user.role, is_active: user.is_active },
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      worker, customer, cooperative,
    };
  }

  async login(email: string, password: string) {
    const user = await db('users').where({ email, is_active: true }).first();
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new Error('Invalid credentials');

    await db('users').where({ id: user.id }).update({ last_login: new Date().toISOString() });

    const tokens = this.generateTokens(user.id, user.email, user.role);
    await this.storeRefreshToken(user.id, tokens.refresh_token);

    const worker = user.role === 'worker' ? await db('workers').where({ user_id: user.id }).first() : undefined;
    const customer = user.role === 'customer' ? await db('customers').where({ user_id: user.id }).first() : undefined;
    const cooperative = user.role === 'cooperative' ? await db('cooperatives').where({ leader_user_id: user.id }).first() : undefined;

    return {
      user: { id: user.id, email: user.email, role: user.role, is_active: user.is_active },
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      worker, customer, cooperative,
    };
  }

  async refreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as any;
      const stored = await db('refresh_tokens')
        .where({ token, user_id: decoded.id, is_revoked: false })
        .first();
      if (!stored) throw new Error('Invalid refresh token');

      const user = await db('users').where({ id: decoded.id, is_active: true }).first();
      if (!user) throw new Error('User not found');

      // Revoke old and issue new
      await db('refresh_tokens').where({ id: stored.id }).update({ is_revoked: true });
      const tokens = this.generateTokens(user.id, user.email, user.role);
      await this.storeRefreshToken(user.id, tokens.refresh_token);

      return tokens;
    } catch {
      throw new Error('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    await db('refresh_tokens').where({ user_id: userId }).update({ is_revoked: true });
  }

  private generateTokens(userId: string, email: string, role: string) {
    const payload = { id: userId, email, role };
    const access_token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '24h' });
    const refresh_token = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { access_token, refresh_token };
  }

  private async storeRefreshToken(userId: string, token: string) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    await db('refresh_tokens').insert({
      id: uuidv4(), user_id: userId, token, expires_at: expires, is_revoked: false,
      created_at: new Date().toISOString(),
    });
  }
}

export const authService = new AuthService();
