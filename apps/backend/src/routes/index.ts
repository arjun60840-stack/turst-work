import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/database';
import { env } from '../config/env';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { authService } from '../services/auth.service';
import { matchingService } from '../services/matching.service';
import { haversineDistance } from '../utils/geo';
import { successResponse, errorResponse, paginate, paginationMeta, generateId } from '../utils/helpers';
import logger from '../utils/logger';

const router = Router();

// ===================== HEALTH =====================
router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Work Trust API is running', timestamp: new Date().toISOString() });
});

// ===================== AUTH =====================
router.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, role, name, phone } = req.body;
    if (!email || !password || !role || !name) {
      res.status(400).json(errorResponse('Email, password, role, and name are required'));
      return;
    }
    if (!['customer', 'worker', 'cooperative'].includes(role)) {
      res.status(400).json(errorResponse('Role must be customer, worker, or cooperative'));
      return;
    }
    const result = await authService.register(email, password, role, name, phone);
    res.status(201).json(successResponse(result, 'Registration successful'));
  } catch (err: any) {
    res.status(400).json(errorResponse(err.message));
  }
});

router.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json(errorResponse('Email and password required'));
      return;
    }
    const result = await authService.login(email, password);
    res.status(200).json(successResponse(result, 'Login successful'));
  } catch (err: any) {
    res.status(401).json(errorResponse(err.message));
  }
});

router.post('/auth/refresh', async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      res.status(400).json(errorResponse('Refresh token required'));
      return;
    }
    const tokens = await authService.refreshToken(refresh_token);
    res.json(successResponse(tokens));
  } catch (err: any) {
    res.status(401).json(errorResponse(err.message));
  }
});

router.post('/auth/logout', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    await authService.logout(req.user!.id);
    res.json(successResponse(null, 'Logged out'));
  } catch (err: any) {
    res.status(400).json(errorResponse(err.message));
  }
});

// ===================== SKILLS & CATEGORIES =====================
router.get('/skills/categories', async (_req, res) => {
  const categories = await db('service_categories').where({ is_active: true }).orderBy('name');
  res.json(successResponse(categories));
});

router.get('/skills', async (req, res) => {
  let query = db('skills').where({ 'skills.is_active': true })
    .join('service_categories', 'skills.category_id', 'service_categories.id')
    .select('skills.*', 'service_categories.name as category_name');
  if (req.query.category_id) query = query.where({ 'skills.category_id': req.query.category_id as string });
  const skills = await query.orderBy('skills.name');
  res.json(successResponse(skills));
});

// ===================== WORKERS =====================
router.get('/workers', authenticate, async (req: AuthRequest, res) => {
  const { page, perPage, limit, offset } = paginate(
    parseInt(req.query.page as string) || 1,
    parseInt(req.query.per_page as string) || 20
  );
  let query = db('workers');
  if (req.query.verified === 'true') query = query.where({ verification_status: 'verified' });
  if (req.query.available === 'true') query = query.where({ is_available: true });

  const total = await query.clone().count('* as count').first();
  const workers = await query.clone().limit(limit).offset(offset).orderBy('reliability_score', 'desc');

  // Attach skills to each worker
  for (const w of workers) {
    w.skills = await db('worker_skills')
      .where({ worker_id: w.id })
      .join('skills', 'worker_skills.skill_id', 'skills.id')
      .select('worker_skills.*', 'skills.name as skill_name');
  }

  res.json({
    success: true,
    data: workers,
    pagination: paginationMeta((total as any).count, page, perPage),
  });
});

router.get('/workers/:id', authenticate, async (req: AuthRequest, res) => {
  const worker = await db('workers').where({ id: req.params.id }).first();
  if (!worker) { res.status(404).json(errorResponse('Worker not found')); return; }

  worker.skills = await db('worker_skills')
    .where({ worker_id: worker.id })
    .join('skills', 'worker_skills.skill_id', 'skills.id')
    .select('worker_skills.*', 'skills.name as skill_name');
  worker.certificates = await db('certificates').where({ worker_id: worker.id });
  worker.reviews = await db('reviews').where({ reviewee_id: worker.user_id }).orderBy('created_at', 'desc').limit(10);
  worker.availability = await db('worker_availability').where({ worker_id: worker.id });

  res.json(successResponse(worker));
});

router.put('/workers/:id', authenticate, async (req: AuthRequest, res) => {
  const worker = await db('workers').where({ id: req.params.id }).first();
  if (!worker) { res.status(404).json(errorResponse('Worker not found')); return; }
  if (req.user!.role !== 'admin' && worker.user_id !== req.user!.id) {
    res.status(403).json(errorResponse('Not authorized')); return;
  }

  const allowedFields = ['name', 'bio', 'address', 'latitude', 'longitude', 'service_radius_km', 'is_available', 'photo_url'];
  const updates: any = {};
  for (const f of allowedFields) {
    if (req.body[f] !== undefined) updates[f] = req.body[f];
  }
  updates.updated_at = new Date().toISOString();
  await db('workers').where({ id: req.params.id }).update(updates);
  const updated = await db('workers').where({ id: req.params.id }).first();
  res.json(successResponse(updated, 'Worker updated'));
});

router.get('/workers/:id/skill-passport', authenticate, async (req: AuthRequest, res) => {
  const worker = await db('workers').where({ id: req.params.id }).first();
  if (!worker) { res.status(404).json(errorResponse('Worker not found')); return; }

  const skills = await db('worker_skills')
    .where({ worker_id: worker.id })
    .join('skills', 'worker_skills.skill_id', 'skills.id')
    .join('service_categories', 'skills.category_id', 'service_categories.id')
    .select('worker_skills.*', 'skills.name as skill_name', 'service_categories.name as category_name');
  const certificates = await db('certificates').where({ worker_id: worker.id });
  const availability = await db('worker_availability').where({ worker_id: worker.id });
  const reviews = await db('reviews').where({ reviewee_id: worker.user_id }).orderBy('created_at', 'desc').limit(5);
  const completedJobs = await db('bookings')
    .join('booking_workers', 'bookings.id', 'booking_workers.booking_id')
    .where({ 'booking_workers.worker_id': worker.id })
    .whereIn('bookings.status', ['completed', 'paid', 'closed'])
    .count('* as count').first();

  res.json(successResponse({
    worker, skills, certificates, availability, reviews,
    completed_jobs: (completedJobs as any)?.count || 0,
  }));
});

router.post('/workers/:id/skills', authenticate, async (req: AuthRequest, res) => {
  const worker = await db('workers').where({ id: req.params.id }).first();
  if (!worker || (req.user!.role !== 'admin' && worker.user_id !== req.user!.id)) {
    res.status(403).json(errorResponse('Not authorized')); return;
  }
  const { skill_id, skill_level, years_experience } = req.body;
  if (!skill_id) { res.status(400).json(errorResponse('skill_id required')); return; }

  const existing = await db('worker_skills').where({ worker_id: worker.id, skill_id }).first();
  if (existing) { res.status(400).json(errorResponse('Skill already added')); return; }

  const now = new Date().toISOString();
  await db('worker_skills').insert({
    id: generateId(), worker_id: worker.id, skill_id,
    skill_level: skill_level || 'intermediate',
    years_experience: years_experience || 0,
    is_verified: false, created_at: now, updated_at: now,
  });
  res.status(201).json(successResponse(null, 'Skill added'));
});

router.put('/workers/:id/availability', authenticate, async (req: AuthRequest, res) => {
  const worker = await db('workers').where({ id: req.params.id }).first();
  if (!worker || worker.user_id !== req.user!.id) {
    res.status(403).json(errorResponse('Not authorized')); return;
  }
  const { availability } = req.body; // Array of { day_of_week, start_time, end_time, is_available }
  if (!Array.isArray(availability)) { res.status(400).json(errorResponse('availability array required')); return; }

  await db('worker_availability').where({ worker_id: worker.id }).del();
  const now = new Date().toISOString();
  for (const a of availability) {
    await db('worker_availability').insert({
      id: generateId(), worker_id: worker.id,
      day_of_week: a.day_of_week, start_time: a.start_time || '09:00',
      end_time: a.end_time || '18:00', is_available: a.is_available !== false,
      created_at: now, updated_at: now,
    });
  }
  res.json(successResponse(null, 'Availability updated'));
});

router.get('/workers/:id/earnings', authenticate, async (req: AuthRequest, res) => {
  const worker = await db('workers').where({ id: req.params.id }).first();
  if (!worker) { res.status(404).json(errorResponse('Worker not found')); return; }

  const splits = await db('payment_splits')
    .where({ recipient_type: 'worker', recipient_id: worker.id })
    .join('payments', 'payment_splits.payment_id', 'payments.id')
    .where({ 'payments.status': 'completed' })
    .select('payment_splits.*', 'payments.paid_at');

  const totalEarnings = splits.reduce((s: number, p: any) => s + p.amount, 0);
  res.json(successResponse({ total_earnings: totalEarnings, transactions: splits }));
});

router.get('/workers/:id/jobs', authenticate, async (req: AuthRequest, res) => {
  const worker = await db('workers').where({ id: req.params.id }).first();
  if (!worker) { res.status(404).json(errorResponse('Worker not found')); return; }

  const bookings = await db('booking_workers')
    .where({ 'booking_workers.worker_id': worker.id })
    .join('bookings', 'booking_workers.booking_id', 'bookings.id')
    .join('job_requests', 'bookings.job_id', 'job_requests.id')
    .select('job_requests.*', 'bookings.status as booking_status', 'bookings.id as booking_id',
      'booking_workers.wage_amount', 'booking_workers.attendance_verified');

  res.json(successResponse(bookings));
});

// ===================== CUSTOMERS =====================
router.get('/customers/:id', authenticate, async (req: AuthRequest, res) => {
  const customer = await db('customers').where({ id: req.params.id }).first();
  if (!customer) { res.status(404).json(errorResponse('Customer not found')); return; }
  res.json(successResponse(customer));
});

router.put('/customers/:id', authenticate, async (req: AuthRequest, res) => {
  const customer = await db('customers').where({ id: req.params.id }).first();
  if (!customer || (req.user!.role !== 'admin' && customer.user_id !== req.user!.id)) {
    res.status(403).json(errorResponse('Not authorized')); return;
  }
  const updates: any = {};
  ['name', 'phone', 'address', 'latitude', 'longitude', 'photo_url'].forEach(f => {
    if (req.body[f] !== undefined) updates[f] = req.body[f];
  });
  updates.updated_at = new Date().toISOString();
  await db('customers').where({ id: req.params.id }).update(updates);
  res.json(successResponse(null, 'Customer updated'));
});

router.get('/customers/:id/jobs', authenticate, async (req: AuthRequest, res) => {
  const customer = await db('customers').where({ id: req.params.id }).first();
  if (!customer) { res.status(404).json(errorResponse('Customer not found')); return; }

  const jobs = await db('job_requests').where({ customer_id: customer.id }).orderBy('created_at', 'desc');
  res.json(successResponse(jobs));
});

// ===================== COOPERATIVES =====================
router.post('/cooperatives', authenticate, authorize('cooperative'), async (req: AuthRequest, res) => {
  const existing = await db('cooperatives').where({ leader_user_id: req.user!.id }).first();
  if (existing) { res.json(successResponse(existing, 'Cooperative already exists')); return; }

  const { name, description, latitude, longitude, service_radius_km } = req.body;
  const now = new Date().toISOString();
  const id = generateId();
  await db('cooperatives').insert({
    id, name: name || 'My Cooperative', description, leader_user_id: req.user!.id,
    latitude, longitude, service_radius_km: service_radius_km || 15,
    verification_status: 'pending', reliability_score: 50, is_active: true,
    created_at: now, updated_at: now,
  });
  const coop = await db('cooperatives').where({ id }).first();
  res.status(201).json(successResponse(coop, 'Cooperative created'));
});

router.get('/cooperatives', authenticate, async (_req, res) => {
  const cooperatives = await db('cooperatives').where({ is_active: true }).orderBy('name');
  for (const c of cooperatives) {
    c.members = await db('cooperative_members')
      .where({ 'cooperative_members.cooperative_id': c.id, 'cooperative_members.is_active': true })
      .join('workers', 'cooperative_members.worker_id', 'workers.id')
      .select('workers.*', 'cooperative_members.role as member_role');
  }
  res.json(successResponse(cooperatives));
});

router.get('/cooperatives/:id', authenticate, async (req, res) => {
  const coop = await db('cooperatives').where({ id: req.params.id }).first();
  if (!coop) { res.status(404).json(errorResponse('Cooperative not found')); return; }

  coop.members = await db('cooperative_members')
    .where({ 'cooperative_members.cooperative_id': coop.id, 'cooperative_members.is_active': true })
    .join('workers', 'cooperative_members.worker_id', 'workers.id')
    .select('workers.*', 'cooperative_members.role as member_role');

  // Get team skills
  const teamSkills: any[] = [];
  for (const m of coop.members) {
    const skills = await db('worker_skills')
      .where({ worker_id: m.id })
      .join('skills', 'worker_skills.skill_id', 'skills.id')
      .select('skills.name', 'worker_skills.skill_level');
    teamSkills.push(...skills);
  }
  coop.team_skills = teamSkills;

  res.json(successResponse(coop));
});

router.post('/cooperatives/:id/members', authenticate, authorize('cooperative'), async (req: AuthRequest, res) => {
  const coop = await db('cooperatives').where({ id: req.params.id }).first();
  if (!coop || coop.leader_user_id !== req.user!.id) {
    res.status(403).json(errorResponse('Not authorized')); return;
  }
  const { worker_id } = req.body;
  if (!worker_id) { res.status(400).json(errorResponse('worker_id required')); return; }

  const worker = await db('workers').where({ id: worker_id }).first();
  if (!worker) { res.status(404).json(errorResponse('Worker not found')); return; }

  const existing = await db('cooperative_members').where({ cooperative_id: coop.id, worker_id }).first();
  if (existing) { res.status(400).json(errorResponse('Already a member')); return; }

  const now = new Date().toISOString();
  await db('cooperative_members').insert({
    id: generateId(), cooperative_id: coop.id, worker_id, role: 'member',
    joined_at: now, is_active: true, created_at: now, updated_at: now,
  });
  await db('workers').where({ id: worker_id }).update({ cooperative_id: coop.id });
  await db('cooperatives').where({ id: coop.id }).increment('member_count', 1);

  res.status(201).json(successResponse(null, 'Member added'));
});

router.get('/cooperatives/:id/jobs', authenticate, async (req: AuthRequest, res) => {
  const coop = await db('cooperatives').where({ id: req.params.id }).first();
  if (!coop) { res.status(404).json(errorResponse('Cooperative not found')); return; }

  const bookings = await db('bookings')
    .where({ cooperative_id: coop.id })
    .join('job_requests', 'bookings.job_id', 'job_requests.id')
    .select('job_requests.*', 'bookings.id as booking_id', 'bookings.status as booking_status',
      'bookings.total_amount', 'bookings.cooperative_amount');

  res.json(successResponse(bookings));
});

router.post('/cooperatives/:id/accept-job', authenticate, authorize('cooperative'), async (req: AuthRequest, res) => {
  const coop = await db('cooperatives').where({ id: req.params.id }).first();
  if (!coop || coop.leader_user_id !== req.user!.id) {
    res.status(403).json(errorResponse('Not authorized')); return;
  }
  const { booking_id } = req.body;
  const booking = await db('bookings').where({ id: booking_id, cooperative_id: coop.id }).first();
  if (!booking) { res.status(404).json(errorResponse('Booking not found')); return; }

  await db('bookings').where({ id: booking_id }).update({ status: 'assigned', updated_at: new Date().toISOString() });
  await db('job_requests').where({ id: booking.job_id }).update({ status: 'assigned', updated_at: new Date().toISOString() });

  // Notify customer
  await db('notifications').insert({
    id: generateId(), user_id: (await db('customers').where({ id: booking.customer_id }).first()).user_id,
    type: 'job_assigned', title: 'Team Assigned', message: `${coop.name} has accepted your job request.`,
    is_read: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  });

  res.json(successResponse(null, 'Job accepted'));
});

router.post('/cooperatives/:id/assign-workers', authenticate, authorize('cooperative'), async (req: AuthRequest, res) => {
  const coop = await db('cooperatives').where({ id: req.params.id }).first();
  if (!coop || coop.leader_user_id !== req.user!.id) {
    res.status(403).json(errorResponse('Not authorized')); return;
  }
  const { booking_id, worker_ids } = req.body;
  if (!booking_id || !Array.isArray(worker_ids) || worker_ids.length === 0) {
    res.status(400).json(errorResponse('booking_id and worker_ids array required')); return;
  }

  const booking = await db('bookings').where({ id: booking_id, cooperative_id: coop.id }).first();
  if (!booking) { res.status(404).json(errorResponse('Booking not found')); return; }

  const job = await db('job_requests').where({ id: booking.job_id }).first();
  const workerAmount = booking.worker_amount;
  const perWorker = workerAmount / worker_ids.length;
  const now = new Date().toISOString();

  // Clear existing assignments
  await db('booking_workers').where({ booking_id }).del();

  for (const wid of worker_ids) {
    await db('booking_workers').insert({
      id: generateId(), booking_id, worker_id: wid, wage_amount: perWorker,
      attendance_verified: false, created_at: now, updated_at: now,
    });

    // Notify each worker
    const worker = await db('workers').where({ id: wid }).first();
    if (worker) {
      await db('notifications').insert({
        id: generateId(), user_id: worker.user_id,
        type: 'job_assigned', title: 'Job Assigned',
        message: `You have been assigned to: ${job.title}`,
        data: JSON.stringify({ booking_id, job_id: job.id }),
        is_read: false, created_at: now, updated_at: now,
      });
    }
  }

  res.json(successResponse(null, `${worker_ids.length} workers assigned`));
});

// ===================== JOBS =====================
router.post('/jobs', authenticate, authorize('customer'), async (req: AuthRequest, res) => {
  const customer = await db('customers').where({ user_id: req.user!.id }).first();
  if (!customer) { res.status(404).json(errorResponse('Customer profile not found')); return; }

  const {
    title, description, category_id, hiring_type, workers_needed,
    required_skill_ids, latitude, longitude, address,
    scheduled_date, scheduled_time, estimated_duration_hours, budget,
    additional_requirements,
  } = req.body;

  if (!title || !category_id || !latitude || !longitude || !scheduled_date || !scheduled_time || !budget) {
    res.status(400).json(errorResponse('Missing required fields'));
    return;
  }

  const now = new Date().toISOString();
  const jobId = generateId();

  await db('job_requests').insert({
    id: jobId, customer_id: customer.id, title, description,
    category_id, hiring_type: hiring_type || 'individual',
    workers_needed: workers_needed || 1,
    latitude, longitude, address, scheduled_date, scheduled_time,
    estimated_duration_hours: estimated_duration_hours || 2,
    budget, status: 'requested', additional_requirements,
    created_at: now, updated_at: now,
  });

  // Insert job requirements
  if (Array.isArray(required_skill_ids)) {
    for (const skillId of required_skill_ids) {
      await db('job_requirements').insert({
        id: generateId(), job_id: jobId, skill_id: skillId,
        workers_needed: 1, created_at: now, updated_at: now,
      });
    }
  }

  // Update customer stats
  await db('customers').where({ id: customer.id }).increment('total_jobs_posted', 1);

  // Record demand
  const category = await db('service_categories').where({ id: category_id }).first();
  await db('demand_history').insert({
    id: generateId(), category_id, latitude, longitude,
    area_name: address || 'Unknown', date: scheduled_date,
    jobs_requested: 1, created_at: now, updated_at: now,
  });

  const job = await db('job_requests').where({ id: jobId }).first();
  res.status(201).json(successResponse(job, 'Job created'));
});

router.get('/jobs', authenticate, async (req: AuthRequest, res) => {
  let query = db('job_requests')
    .join('service_categories', 'job_requests.category_id', 'service_categories.id')
    .select('job_requests.*', 'service_categories.name as category_name');

  if (req.query.status) query = query.where({ 'job_requests.status': req.query.status });
  if (req.query.category_id) query = query.where({ 'job_requests.category_id': req.query.category_id });

  const jobs = await query.orderBy('job_requests.created_at', 'desc');
  res.json(successResponse(jobs));
});

router.get('/jobs/:id', authenticate, async (req, res) => {
  const job = await db('job_requests')
    .where({ 'job_requests.id': req.params.id })
    .join('service_categories', 'job_requests.category_id', 'service_categories.id')
    .select('job_requests.*', 'service_categories.name as category_name')
    .first();
  if (!job) { res.status(404).json(errorResponse('Job not found')); return; }

  job.requirements = await db('job_requirements')
    .where({ job_id: job.id })
    .join('skills', 'job_requirements.skill_id', 'skills.id')
    .select('job_requirements.*', 'skills.name as skill_name');

  job.customer = await db('customers').where({ id: job.customer_id }).first();
  job.booking = await db('bookings').where({ job_id: job.id }).first();
  if (job.booking) {
    job.booking.assigned_workers = await db('booking_workers')
      .where({ booking_id: job.booking.id })
      .join('workers', 'booking_workers.worker_id', 'workers.id')
      .select('workers.*', 'booking_workers.wage_amount', 'booking_workers.attendance_verified');
  }

  res.json(successResponse(job));
});

// ===================== MATCHING =====================
router.post('/matching/run', authenticate, async (req: AuthRequest, res) => {
  try {
    const { job_id, max_results, max_distance_km } = req.body;
    if (!job_id) { res.status(400).json(errorResponse('job_id required')); return; }

    const results = await matchingService.runMatching(job_id, max_results || 10, max_distance_km);
    res.json(successResponse(results, `${results.length} candidates found`));
  } catch (err: any) {
    res.status(400).json(errorResponse(err.message));
  }
});

router.get('/matching/results/:jobId', authenticate, async (req, res) => {
  try {
    const results = await matchingService.getMatchResults(req.params.jobId);
    res.json(successResponse(results));
  } catch (err: any) {
    res.status(400).json(errorResponse(err.message));
  }
});

// ===================== BOOKINGS =====================
router.post('/bookings', authenticate, authorize('customer'), async (req: AuthRequest, res) => {
  const customer = await db('customers').where({ user_id: req.user!.id }).first();
  if (!customer) { res.status(404).json(errorResponse('Customer profile not found')); return; }

  const { job_id, candidate_id, candidate_type } = req.body;
  if (!job_id || !candidate_id || !candidate_type) {
    res.status(400).json(errorResponse('job_id, candidate_id, candidate_type required'));
    return;
  }

  const job = await db('job_requests').where({ id: job_id }).first();
  if (!job) { res.status(404).json(errorResponse('Job not found')); return; }

  // Calculate wage split
  const platformFeePercent = 10;
  const coopContribPercent = candidate_type === 'cooperative' ? 10 : 0;
  const platformFee = job.budget * (platformFeePercent / 100);
  const coopAmount = (job.budget - platformFee) * (coopContribPercent / 100);
  const workerAmount = job.budget - platformFee - coopAmount;

  const now = new Date().toISOString();
  const bookingId = generateId();

  await db('bookings').insert({
    id: bookingId, job_id, customer_id: customer.id,
    worker_id: candidate_type === 'worker' ? candidate_id : null,
    cooperative_id: candidate_type === 'cooperative' ? candidate_id : null,
    hiring_type: job.hiring_type, status: 'booked',
    total_amount: job.budget, worker_amount: workerAmount,
    cooperative_amount: coopAmount, platform_fee: platformFee,
    otp_verified: false, otp_attempts: 0,
    agreement_accepted_customer: false, agreement_accepted_worker: false,
    created_at: now, updated_at: now,
  });

  // Mark candidate as selected
  await db('job_candidates')
    .where({ job_id })
    .where(function() {
      if (candidate_type === 'worker') this.where({ worker_id: candidate_id });
      else this.where({ cooperative_id: candidate_id });
    })
    .update({ is_selected: true });

  // Update job status
  await db('job_requests').where({ id: job_id }).update({ status: 'booked', updated_at: now });

  // Notify worker/cooperative
  if (candidate_type === 'cooperative') {
    const coop = await db('cooperatives').where({ id: candidate_id }).first();
    if (coop) {
      await db('notifications').insert({
        id: generateId(), user_id: coop.leader_user_id,
        type: 'job_booked', title: 'New Job Booking',
        message: `Your team has been booked for: ${job.title}`,
        data: JSON.stringify({ booking_id: bookingId, job_id }),
        is_read: false, created_at: now, updated_at: now,
      });
    }
  } else {
    const worker = await db('workers').where({ id: candidate_id }).first();
    if (worker) {
      await db('notifications').insert({
        id: generateId(), user_id: worker.user_id,
        type: 'job_booked', title: 'New Job Booking',
        message: `You have been booked for: ${job.title}`,
        data: JSON.stringify({ booking_id: bookingId, job_id }),
        is_read: false, created_at: now, updated_at: now,
      });
    }
  }

  const booking = await db('bookings').where({ id: bookingId }).first();
  res.status(201).json(successResponse(booking, 'Booking created'));
});

router.get('/bookings/:id', authenticate, async (req, res) => {
  const booking = await db('bookings').where({ id: req.params.id }).first();
  if (!booking) { res.status(404).json(errorResponse('Booking not found')); return; }

  booking.job = await db('job_requests').where({ id: booking.job_id }).first();
  booking.customer = await db('customers').where({ id: booking.customer_id }).first();
  if (booking.worker_id) booking.worker = await db('workers').where({ id: booking.worker_id }).first();
  if (booking.cooperative_id) {
    booking.cooperative = await db('cooperatives').where({ id: booking.cooperative_id }).first();
  }
  booking.assigned_workers = await db('booking_workers')
    .where({ booking_id: booking.id })
    .join('workers', 'booking_workers.worker_id', 'workers.id')
    .select('workers.*', 'booking_workers.wage_amount', 'booking_workers.attendance_verified');

  res.json(successResponse(booking));
});

router.post('/bookings/:id/agreement', authenticate, async (req: AuthRequest, res) => {
  const booking = await db('bookings').where({ id: req.params.id }).first();
  if (!booking) { res.status(404).json(errorResponse('Booking not found')); return; }

  const now = new Date().toISOString();
  const update: any = { updated_at: now };

  if (req.user!.role === 'customer') {
    update.agreement_accepted_customer = true;
  } else {
    update.agreement_accepted_worker = true;
  }

  await db('bookings').where({ id: req.params.id }).update(update);
  const updated = await db('bookings').where({ id: req.params.id }).first();

  // If both accepted
  if (updated.agreement_accepted_customer && updated.agreement_accepted_worker) {
    await db('bookings').where({ id: req.params.id }).update({
      agreement_accepted_at: now, updated_at: now,
    });
  }

  res.json(successResponse(updated, 'Agreement accepted'));
});

router.post('/bookings/:id/generate-otp', authenticate, async (req: AuthRequest, res) => {
  const booking = await db('bookings').where({ id: req.params.id }).first();
  if (!booking) { res.status(404).json(errorResponse('Booking not found')); return; }

  const otpCode = env.OTP_MODE === 'demo' ? env.OTP_DEMO_CODE : Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  await db('bookings').where({ id: req.params.id }).update({
    otp_code: otpCode, otp_expires_at: expiresAt, otp_attempts: 0,
    updated_at: new Date().toISOString(),
  });

  const response: any = { otp_expires_at: expiresAt };
  if (env.OTP_MODE === 'demo') {
    response.demo_otp = otpCode;
    response.notice = 'DEMO MODE: OTP is shown here. In production, it would be sent via SMS.';
  }

  res.json(successResponse(response, 'OTP generated'));
});

router.post('/bookings/:id/verify-otp', authenticate, async (req: AuthRequest, res) => {
  const booking = await db('bookings').where({ id: req.params.id }).first();
  if (!booking) { res.status(404).json(errorResponse('Booking not found')); return; }

  const { otp_code, latitude, longitude, worker_id } = req.body;
  if (!otp_code) { res.status(400).json(errorResponse('OTP code required')); return; }

  // Check attempts
  if (booking.otp_attempts >= 3) {
    res.status(400).json(errorResponse('Maximum OTP attempts exceeded'));
    return;
  }

  // Check expiry
  if (booking.otp_expires_at && new Date(booking.otp_expires_at) < new Date()) {
    res.status(400).json(errorResponse('OTP has expired'));
    return;
  }

  // Verify OTP
  if (booking.otp_code !== otp_code) {
    await db('bookings').where({ id: req.params.id }).update({
      otp_attempts: (booking.otp_attempts || 0) + 1,
    });
    res.status(400).json(errorResponse('Invalid OTP'));
    return;
  }

  const now = new Date().toISOString();
  await db('bookings').where({ id: req.params.id }).update({
    otp_verified: true, status: 'attendance_verified', updated_at: now,
  });
  await db('job_requests').where({ id: booking.job_id }).update({
    status: 'attendance_verified', updated_at: now,
  });

  // Mark worker attendance if worker_id provided
  if (worker_id) {
    await db('booking_workers').where({ booking_id: req.params.id, worker_id }).update({
      attendance_verified: true, attendance_time: now,
      attendance_latitude: latitude, attendance_longitude: longitude,
      updated_at: now,
    });
  }

  res.json(successResponse(null, 'OTP verified. Attendance confirmed.'));
});

router.put('/jobs/:id/status', authenticate, async (req: AuthRequest, res) => {
  const { status } = req.body;
  const job = await db('job_requests').where({ id: req.params.id }).first();
  if (!job) { res.status(404).json(errorResponse('Job not found')); return; }

  const VALID_TRANSITIONS: Record<string, string[]> = {
    requested: ['matching', 'cancelled'],
    matching: ['booked', 'cancelled'],
    booked: ['assigned', 'cancelled'],
    assigned: ['arriving', 'cancelled'],
    arriving: ['attendance_verified', 'cancelled'],
    attendance_verified: ['in_progress'],
    in_progress: ['completed', 'disputed'],
    completed: ['payment_pending'],
    payment_pending: ['paid'],
    paid: ['feedback_pending', 'closed'],
    feedback_pending: ['closed'],
    closed: [],
    cancelled: [],
    disputed: ['closed'],
  };

  const allowed = VALID_TRANSITIONS[job.status] || [];
  if (!allowed.includes(status)) {
    res.status(400).json(errorResponse(`Cannot transition from ${job.status} to ${status}`));
    return;
  }

  const now = new Date().toISOString();
  await db('job_requests').where({ id: req.params.id }).update({ status, updated_at: now });

  // Also update booking status
  const booking = await db('bookings').where({ job_id: req.params.id }).first();
  if (booking) {
    await db('bookings').where({ id: booking.id }).update({ status, updated_at: now });
  }

  res.json(successResponse({ status }, `Job status updated to ${status}`));
});

router.post('/bookings/:id/complete', authenticate, async (req: AuthRequest, res) => {
  const booking = await db('bookings').where({ id: req.params.id }).first();
  if (!booking) { res.status(404).json(errorResponse('Booking not found')); return; }

  const now = new Date().toISOString();
  await db('bookings').where({ id: req.params.id }).update({ status: 'completed', updated_at: now });
  await db('job_requests').where({ id: booking.job_id }).update({ status: 'completed', updated_at: now });

  res.json(successResponse(null, 'Job completed'));
});

router.get('/bookings/:id/wage-split', authenticate, async (req, res) => {
  const booking = await db('bookings').where({ id: req.params.id }).first();
  if (!booking) { res.status(404).json(errorResponse('Booking not found')); return; }

  const assignedWorkers = await db('booking_workers')
    .where({ booking_id: booking.id })
    .join('workers', 'booking_workers.worker_id', 'workers.id')
    .select('workers.id', 'workers.name', 'booking_workers.wage_amount');

  const coopName = booking.cooperative_id
    ? (await db('cooperatives').where({ id: booking.cooperative_id }).first())?.name
    : null;

  res.json(successResponse({
    total_amount: booking.total_amount,
    workers: assignedWorkers.map((w: any) => ({
      worker_id: w.id, name: w.name, amount: w.wage_amount,
    })),
    cooperative_amount: booking.cooperative_amount,
    cooperative_name: coopName,
    platform_fee: booking.platform_fee,
  }));
});

// ===================== PAYMENTS =====================
router.post('/payments', authenticate, async (req: AuthRequest, res) => {
  const { booking_id } = req.body;
  if (!booking_id) { res.status(400).json(errorResponse('booking_id required')); return; }

  const booking = await db('bookings').where({ id: booking_id }).first();
  if (!booking) { res.status(404).json(errorResponse('Booking not found')); return; }

  const now = new Date().toISOString();
  const paymentId = generateId();
  const transactionId = `DEMO-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  await db('payments').insert({
    id: paymentId, booking_id, job_id: booking.job_id, customer_id: booking.customer_id,
    amount: booking.total_amount, status: 'completed', payment_mode: 'demo',
    payment_method: 'demo_payment', transaction_id: transactionId,
    paid_at: now, created_at: now, updated_at: now,
  });

  // Create payment splits
  const workers = await db('booking_workers')
    .where({ booking_id })
    .join('workers', 'booking_workers.worker_id', 'workers.id')
    .select('workers.id', 'workers.name', 'booking_workers.wage_amount');

  for (const w of workers) {
    await db('payment_splits').insert({
      id: generateId(), payment_id: paymentId, booking_id,
      recipient_type: 'worker', recipient_id: w.id,
      amount: w.wage_amount, description: `Wages for ${w.name}`,
      created_at: now, updated_at: now,
    });

    // Update worker earnings
    await db('workers').where({ id: w.id }).increment('total_earnings', w.wage_amount);
  }

  if (booking.cooperative_amount > 0 && booking.cooperative_id) {
    await db('payment_splits').insert({
      id: generateId(), payment_id: paymentId, booking_id,
      recipient_type: 'cooperative', recipient_id: booking.cooperative_id,
      amount: booking.cooperative_amount, description: 'Cooperative contribution',
      created_at: now, updated_at: now,
    });
  }

  await db('payment_splits').insert({
    id: generateId(), payment_id: paymentId, booking_id,
    recipient_type: 'platform', recipient_id: null,
    amount: booking.platform_fee, description: 'Work Trust platform service fee',
    created_at: now, updated_at: now,
  });

  // Update statuses
  await db('bookings').where({ id: booking_id }).update({ status: 'paid', updated_at: now });
  await db('job_requests').where({ id: booking.job_id }).update({ status: 'paid', updated_at: now });

  const payment = await db('payments').where({ id: paymentId }).first();
  payment.splits = await db('payment_splits').where({ payment_id: paymentId });
  payment.notice = 'DEMO PAYMENT: No real money was transferred.';

  res.status(201).json(successResponse(payment, 'Demo payment processed'));
});

router.get('/payments/:id', authenticate, async (req, res) => {
  const payment = await db('payments').where({ id: req.params.id }).first();
  if (!payment) { res.status(404).json(errorResponse('Payment not found')); return; }
  payment.splits = await db('payment_splits').where({ payment_id: payment.id });
  res.json(successResponse(payment));
});

router.get('/payments/booking/:bookingId', authenticate, async (req, res) => {
  const payment = await db('payments').where({ booking_id: req.params.bookingId }).first();
  if (!payment) { res.status(404).json(errorResponse('Payment not found')); return; }
  payment.splits = await db('payment_splits').where({ payment_id: payment.id });
  res.json(successResponse(payment));
});

// ===================== REVIEWS =====================
router.post('/reviews', authenticate, async (req: AuthRequest, res) => {
  const { booking_id, rating, comment, service_quality, punctuality, communication } = req.body;
  if (!booking_id || !rating) { res.status(400).json(errorResponse('booking_id and rating required')); return; }

  const booking = await db('bookings').where({ id: booking_id }).first();
  if (!booking) { res.status(404).json(errorResponse('Booking not found')); return; }

  // Determine reviewee
  let revieweeId: string | undefined;
  if (req.user!.role === 'customer') {
    // Customer reviews worker/cooperative
    if (booking.cooperative_id) {
      const coop = await db('cooperatives').where({ id: booking.cooperative_id }).first();
      if (coop) revieweeId = coop.leader_user_id;
    }
    if (!revieweeId && booking.worker_id) {
      const worker = await db('workers').where({ id: booking.worker_id }).first();
      if (worker) revieweeId = worker.user_id;
    }
    if (!revieweeId) {
      const anyMember = await db('booking_workers')
        .where({ booking_id: booking.id })
        .join('workers', 'booking_workers.worker_id', 'workers.id')
        .first();
      if (anyMember) revieweeId = anyMember.user_id;
    }
    if (!revieweeId) {
      const leader = await db('users').where({ role: 'cooperative' }).first();
      revieweeId = leader ? leader.id : req.user!.id;
    }
  } else {
    // Worker reviews customer
    const customer = await db('customers').where({ id: booking.customer_id }).first();
    revieweeId = customer ? customer.user_id : booking.customer_id;
  }

  const existing = await db('reviews').where({ booking_id, reviewer_id: req.user!.id }).first();
  if (existing) { res.status(400).json(errorResponse('Already reviewed')); return; }

  const now = new Date().toISOString();
  await db('reviews').insert({
    id: generateId(), booking_id, job_id: booking.job_id,
    reviewer_id: req.user!.id, reviewee_id: revieweeId,
    reviewer_role: req.user!.role, rating: Math.min(5, Math.max(1, rating)),
    comment, service_quality, punctuality, communication,
    created_at: now, updated_at: now,
  });

  // Update average rating for reviewee
  const allReviews = await db('reviews').where({ reviewee_id: revieweeId });
  const avgRating = allReviews.reduce((s: number, r: any) => s + r.rating, 0) / allReviews.length;

  // Update worker or customer rating
  const revieweeUser = await db('users').where({ id: revieweeId }).first();
  if (revieweeUser?.role === 'worker') {
    const worker = await db('workers').where({ user_id: revieweeId }).first();
    if (worker) await db('workers').where({ id: worker.id }).update({ average_rating: avgRating });
  } else if (revieweeUser?.role === 'customer') {
    const customer = await db('customers').where({ user_id: revieweeId }).first();
    if (customer) await db('customers').where({ id: customer.id }).update({ average_rating: avgRating });
  }

  // Update job status
  await db('job_requests').where({ id: booking.job_id }).update({ status: 'closed', updated_at: now });
  await db('bookings').where({ id: booking_id }).update({ status: 'closed', updated_at: now });

  res.status(201).json(successResponse(null, 'Review submitted'));
});

router.get('/reviews/user/:userId', authenticate, async (req, res) => {
  const reviews = await db('reviews').where({ reviewee_id: req.params.userId }).orderBy('created_at', 'desc');
  res.json(successResponse(reviews));
});

router.get('/reviews/booking/:bookingId', authenticate, async (req, res) => {
  const reviews = await db('reviews').where({ booking_id: req.params.bookingId });
  res.json(successResponse(reviews));
});

// ===================== WELFARE =====================
router.get('/welfare/:workerId', authenticate, async (req, res) => {
  const profile = await db('welfare_profiles').where({ worker_id: req.params.workerId }).first();
  if (!profile) { res.status(404).json(errorResponse('Welfare profile not found')); return; }
  const contributions = await db('welfare_contributions')
    .where({ worker_id: req.params.workerId }).orderBy('contributed_at', 'desc');
  const safetyRequests = await db('safety_requests')
    .where({ worker_id: req.params.workerId }).orderBy('created_at', 'desc');
  res.json(successResponse({ profile, contributions, safety_requests: safetyRequests }));
});

router.post('/welfare/safety-request', authenticate, async (req: AuthRequest, res) => {
  const worker = await db('workers').where({ user_id: req.user!.id }).first();
  if (!worker) { res.status(404).json(errorResponse('Worker profile not found')); return; }

  const { type, title, description } = req.body;
  const now = new Date().toISOString();
  await db('safety_requests').insert({
    id: generateId(), worker_id: worker.id, type: type || 'support',
    title, description, status: 'open', created_at: now, updated_at: now,
  });
  res.status(201).json(successResponse(null, 'Safety request created'));
});

// ===================== COMPLAINTS =====================
router.post('/complaints', authenticate, async (req: AuthRequest, res) => {
  const { job_id, booking_id, category, title, description } = req.body;
  if (!title || !category) { res.status(400).json(errorResponse('title and category required')); return; }

  const now = new Date().toISOString();
  await db('complaints').insert({
    id: generateId(), reporter_id: req.user!.id, reporter_role: req.user!.role,
    job_id, booking_id, category, title, description,
    status: 'open', created_at: now, updated_at: now,
  });
  res.status(201).json(successResponse(null, 'Complaint submitted'));
});

router.get('/complaints', authenticate, async (req: AuthRequest, res) => {
  let query = db('complaints');
  if (req.user!.role !== 'admin') query = query.where({ reporter_id: req.user!.id });
  const complaints = await query.orderBy('created_at', 'desc');
  res.json(successResponse(complaints));
});

router.put('/complaints/:id', authenticate, authorize('admin'), async (req: AuthRequest, res) => {
  const { status, admin_notes } = req.body;
  const update: any = { updated_at: new Date().toISOString() };
  if (status) update.status = status;
  if (admin_notes) update.admin_notes = admin_notes;
  if (status === 'resolved') update.resolved_at = new Date().toISOString();
  await db('complaints').where({ id: req.params.id }).update(update);
  res.json(successResponse(null, 'Complaint updated'));
});

// ===================== NOTIFICATIONS =====================
router.get('/notifications', authenticate, async (req: AuthRequest, res) => {
  const notifications = await db('notifications')
    .where({ user_id: req.user!.id })
    .orderBy('created_at', 'desc').limit(50);
  res.json(successResponse(notifications));
});

router.put('/notifications/:id/read', authenticate, async (req: AuthRequest, res) => {
  await db('notifications').where({ id: req.params.id, user_id: req.user!.id })
    .update({ is_read: true, read_at: new Date().toISOString() });
  res.json(successResponse(null, 'Marked as read'));
});

router.put('/notifications/read-all', authenticate, async (req: AuthRequest, res) => {
  await db('notifications').where({ user_id: req.user!.id, is_read: false })
    .update({ is_read: true, read_at: new Date().toISOString() });
  res.json(successResponse(null, 'All marked as read'));
});

// ===================== ADMIN =====================
router.get('/admin/dashboard', authenticate, authorize('admin'), async (_req, res) => {
  const totalWorkers = await db('workers').count('* as count').first();
  const verifiedWorkers = await db('workers').where({ verification_status: 'verified' }).count('* as count').first();
  const totalCustomers = await db('customers').count('* as count').first();
  const totalCooperatives = await db('cooperatives').count('* as count').first();
  const activeJobs = await db('job_requests').whereIn('status', ['requested', 'matching', 'booked', 'assigned', 'in_progress']).count('* as count').first();
  const completedJobs = await db('job_requests').whereIn('status', ['completed', 'paid', 'closed']).count('* as count').first();
  const totalPayments = await db('payments').where({ status: 'completed' }).sum('amount as total').first();
  const openComplaints = await db('complaints').where({ status: 'open' }).count('* as count').first();

  res.json(successResponse({
    total_workers: (totalWorkers as any).count,
    verified_workers: (verifiedWorkers as any).count,
    total_customers: (totalCustomers as any).count,
    total_cooperatives: (totalCooperatives as any).count,
    active_jobs: (activeJobs as any).count,
    completed_jobs: (completedJobs as any).count,
    total_transactions: (totalPayments as any)?.total || 0,
    open_complaints: (openComplaints as any).count,
  }));
});

router.get('/admin/workers', authenticate, authorize('admin'), async (req, res) => {
  const workers = await db('workers').orderBy('created_at', 'desc');
  for (const w of workers) {
    w.skills = await db('worker_skills')
      .where({ worker_id: w.id })
      .join('skills', 'worker_skills.skill_id', 'skills.id')
      .select('skills.name');
    w.user = await db('users').where({ id: w.user_id }).select('email', 'role', 'is_active').first();
  }
  res.json(successResponse(workers));
});

router.get('/admin/customers', authenticate, authorize('admin'), async (_req, res) => {
  const customers = await db('customers').orderBy('created_at', 'desc');
  res.json(successResponse(customers));
});

router.get('/admin/cooperatives', authenticate, authorize('admin'), async (_req, res) => {
  const coops = await db('cooperatives').orderBy('created_at', 'desc');
  for (const c of coops) {
    c.members = await db('cooperative_members')
      .where({ 'cooperative_members.cooperative_id': c.id, 'cooperative_members.is_active': true })
      .join('workers', 'cooperative_members.worker_id', 'workers.id')
      .select('workers.name', 'workers.id');
  }
  res.json(successResponse(coops));
});

router.get('/admin/jobs', authenticate, authorize('admin'), async (_req, res) => {
  const jobs = await db('job_requests')
    .join('service_categories', 'job_requests.category_id', 'service_categories.id')
    .join('customers', 'job_requests.customer_id', 'customers.id')
    .select('job_requests.*', 'service_categories.name as category_name', 'customers.name as customer_name')
    .orderBy('job_requests.created_at', 'desc');
  res.json(successResponse(jobs));
});

router.get('/admin/payments', authenticate, authorize('admin'), async (_req, res) => {
  const payments = await db('payments').orderBy('created_at', 'desc');
  for (const p of payments) {
    p.splits = await db('payment_splits').where({ payment_id: p.id });
  }
  res.json(successResponse(payments));
});

router.get('/admin/complaints', authenticate, authorize('admin'), async (_req, res) => {
  const complaints = await db('complaints').orderBy('created_at', 'desc');
  res.json(successResponse(complaints));
});

router.get('/admin/verifications', authenticate, authorize('admin'), async (_req, res) => {
  const pending = await db('workers').where({ verification_status: 'pending' });
  for (const w of pending) {
    w.skills = await db('worker_skills')
      .where({ worker_id: w.id })
      .join('skills', 'worker_skills.skill_id', 'skills.id')
      .select('skills.name', 'worker_skills.skill_level');
    w.certificates = await db('certificates').where({ worker_id: w.id });
  }
  res.json(successResponse(pending));
});

router.put('/admin/verify/:type/:id', authenticate, authorize('admin'), async (req: AuthRequest, res) => {
  const { status } = req.body; // 'verified' or 'rejected'
  if (!['verified', 'rejected'].includes(status)) {
    res.status(400).json(errorResponse('Status must be verified or rejected'));
    return;
  }

  const { type, id } = req.params;
  const now = new Date().toISOString();

  if (type === 'worker') {
    await db('workers').where({ id }).update({ verification_status: status, updated_at: now });
    const worker = await db('workers').where({ id }).first();
    if (worker) {
      await db('notifications').insert({
        id: generateId(), user_id: worker.user_id,
        type: 'verification_update', title: 'Verification Update',
        message: `Your verification has been ${status}.`,
        is_read: false, created_at: now, updated_at: now,
      });
    }
  } else if (type === 'cooperative') {
    await db('cooperatives').where({ id }).update({ verification_status: status, updated_at: now });
  } else if (type === 'certificate') {
    await db('certificates').where({ id }).update({ verification_status: status, updated_at: now });
  }

  res.json(successResponse(null, `${type} ${status}`));
});

router.get('/admin/demand', authenticate, authorize('admin'), async (_req, res) => {
  const history = await db('demand_history')
    .join('service_categories', 'demand_history.category_id', 'service_categories.id')
    .select('demand_history.*', 'service_categories.name as category_name')
    .orderBy('demand_history.date', 'desc').limit(100);

  const predictions = await db('demand_predictions')
    .join('service_categories', 'demand_predictions.category_id', 'service_categories.id')
    .select('demand_predictions.*', 'service_categories.name as category_name')
    .orderBy('demand_predictions.prediction_date', 'desc').limit(20);

  // Generate demand insights
  const categoryDemand = await db('demand_history')
    .join('service_categories', 'demand_history.category_id', 'service_categories.id')
    .select('service_categories.name as category_name')
    .sum('demand_history.jobs_requested as total_requested')
    .groupBy('service_categories.name')
    .orderBy('total_requested', 'desc');

  res.json(successResponse({ history, predictions, category_demand: categoryDemand }));
});

export default router;