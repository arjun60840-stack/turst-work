import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_CLIENT: process.env.DB_CLIENT || 'sqlite3',
  DB_FILE: process.env.DB_FILE || './nexvion.sqlite',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME || 'nexvion',
  DB_USER: process.env.DB_USER || 'nexvion_user',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  JWT_SECRET: process.env.JWT_SECRET || 'supersecret123',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'superrefreshsecret123',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  PLATFORM_FEE_PERCENT: Number(process.env.PLATFORM_FEE_PERCENT) || 10,
  COOPERATIVE_CONTRIBUTION_PERCENT: Number(process.env.COOPERATIVE_CONTRIBUTION_PERCENT) || 10,
  OTP_MODE: process.env.OTP_MODE || 'demo',
  OTP_DEMO_CODE: process.env.OTP_DEMO_CODE || '123456',
  PAYMENT_MODE: process.env.PAYMENT_MODE || 'demo',
  MAX_SERVICE_RADIUS_KM: Number(process.env.MAX_SERVICE_RADIUS_KM) || 50,
  MATCH_WEIGHT_SKILL: Number(process.env.MATCH_WEIGHT_SKILL) || 0.30,
  MATCH_WEIGHT_AVAILABILITY: Number(process.env.MATCH_WEIGHT_AVAILABILITY) || 0.15,
  MATCH_WEIGHT_DISTANCE: Number(process.env.MATCH_WEIGHT_DISTANCE) || 0.15,
  MATCH_WEIGHT_RELIABILITY: Number(process.env.MATCH_WEIGHT_RELIABILITY) || 0.15,
  MATCH_WEIGHT_EXPERIENCE: Number(process.env.MATCH_WEIGHT_EXPERIENCE) || 0.10,
  MATCH_WEIGHT_RATING: Number(process.env.MATCH_WEIGHT_RATING) || 0.05,
  MATCH_WEIGHT_VERIFICATION: Number(process.env.MATCH_WEIGHT_VERIFICATION) || 0.05,
  MATCH_WEIGHT_WAGE: Number(process.env.MATCH_WEIGHT_WAGE) || 0.05,
};
