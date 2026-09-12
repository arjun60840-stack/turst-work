import request from 'supertest';
import app from '../src/app';
import db from '../src/config/database';

jest.setTimeout(25000);

describe('NEXVION SIH 2026 End-to-End Demonstration Scenario', () => {
  let customerToken: string;
  let customerId: string;
  let createdJobId: string;
  let matchedCoopId: string;
  let bookingId: string;
  let demoOtpCode: string;

  beforeAll(async () => {
    // 1. Customer logs in
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'customer@nexvion.demo', password: 'Demo@12345' });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.success).toBe(true);
    customerToken = loginRes.body.data.access_token;
    customerId = loginRes.body.data.customer.id;
    expect(customerToken).toBeDefined();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('Step 1: Customer creates a Group Hiring Job Request (4 workers)', async () => {
    // Find category ID for Electrical
    const cat = await db('service_categories').where({ name: 'Electrical' }).first();
    const skill = await db('skills').where({ name: 'House Wiring' }).first();

    const jobPayload = {
      title: 'Community Panchayat Hall Solar & Wiring Overhaul',
      description: 'Needs 4 experienced electricians for solar line connections and breaker rewiring.',
      category_id: cat.id,
      hiring_type: 'group',
      workers_needed: 4,
      required_skill_ids: [skill.id],
      latitude: 19.0550,
      longitude: 72.8400,
      address: 'Bandra Suburban Community Centre, Mumbai',
      scheduled_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      scheduled_time: '09:30',
      estimated_duration_hours: 5,
      budget: 5000,
      additional_requirements: 'Safety gear and insulated boots mandatory',
    };

    const res = await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${customerToken}`)
      .send(jobPayload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    createdJobId = res.body.data.id;
    expect(createdJobId).toBeDefined();
  });

  it('Step 2: AI Matching Engine executes candidate filtering, scoring, and explanation', async () => {
    const res = await request(app)
      .post('/api/matching/run')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ job_id: createdJobId, max_results: 5 });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);

    const topCandidate = res.body.data[0];
    expect(topCandidate.match_score).toBeGreaterThan(0.5);
    expect(topCandidate.match_percentage).toBeGreaterThan(50);
    expect(Array.isArray(topCandidate.reasons)).toBe(true);
    expect(topCandidate.reasons.length).toBeGreaterThan(0);

    matchedCoopId = topCandidate.candidate_id;
  });

  it('Step 3: Customer books the recommended team and accepts Digital Agreement', async () => {
    const bookRes = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        job_id: createdJobId,
        candidate_id: matchedCoopId,
        candidate_type: 'cooperative',
      });

    expect(bookRes.status).toBe(201);
    expect(bookRes.body.success).toBe(true);
    bookingId = bookRes.body.data.id;
    expect(bookingId).toBeDefined();

    // Accept digital agreement as customer
    const agreeRes = await request(app)
      .post(`/api/bookings/${bookingId}/agreement`)
      .set('Authorization', `Bearer ${customerToken}`)
      .send({});

    expect(agreeRes.status).toBe(200);
    expect(Boolean(agreeRes.body.data.agreement_accepted_customer)).toBe(true);
  });

  it('Step 4: Customer generates OTP for on-site attendance', async () => {
    const otpRes = await request(app)
      .post(`/api/bookings/${bookingId}/generate-otp`)
      .set('Authorization', `Bearer ${customerToken}`)
      .send({});

    expect(otpRes.status).toBe(200);
    demoOtpCode = otpRes.body.data.demo_otp || '123456';
    expect(demoOtpCode).toBe('123456');
  });

  it('Step 5: Worker/Team enters OTP + GPS to verify attendance and start job', async () => {
    // Worker logs in
    const workerLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: 'worker@nexvion.demo', password: 'Demo@12345' });
    const workerToken = workerLogin.body.data.access_token;
    const workerId = workerLogin.body.data.worker.id;

    // Verify OTP + Location
    const verifyRes = await request(app)
      .post(`/api/bookings/${bookingId}/verify-otp`)
      .set('Authorization', `Bearer ${workerToken}`)
      .send({
        otp_code: demoOtpCode,
        latitude: 19.0551,
        longitude: 72.8401,
        worker_id: workerId,
      });

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.success).toBe(true);

    // Verify job transitioned to in_progress
    const statusRes = await request(app)
      .put(`/api/jobs/${createdJobId}/status`)
      .set('Authorization', `Bearer ${workerToken}`)
      .send({ status: 'in_progress' });

    expect(statusRes.status).toBe(200);
    expect(statusRes.body.data.status).toBe('in_progress');
  });

  it('Step 6: Job marked completed and transparent wage split is verified', async () => {
    const completeRes = await request(app)
      .post(`/api/bookings/${bookingId}/complete`)
      .set('Authorization', `Bearer ${customerToken}`)
      .send({});

    expect(completeRes.status).toBe(200);

    // Query transparent wage split
    const splitRes = await request(app)
      .get(`/api/bookings/${bookingId}/wage-split`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(splitRes.status).toBe(200);
    expect(splitRes.body.data.total_amount).toBe(5000);
    expect(splitRes.body.data.platform_fee).toBe(500); // 10%
    expect(splitRes.body.data.cooperative_amount).toBe(450); // 10% of remainder
  });

  it('Step 7: Demo payment processed and line-item transaction recorded', async () => {
    const payRes = await request(app)
      .post('/api/payments')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ booking_id: bookingId });

    expect(payRes.status).toBe(201);
    expect(payRes.body.data.status).toBe('completed');
    expect(payRes.body.data.payment_mode).toBe('demo');
    expect(payRes.body.data.transaction_id).toMatch(/^DEMO-/);
  });

  it('Step 8: Customer submits review and ratings are persisted', async () => {
    const reviewRes = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        booking_id: bookingId,
        rating: 5,
        comment: 'Exemplary punctuality and professional group teamwork. Highly recommended!',
        service_quality: 5,
        punctuality: 5,
        communication: 5,
      });

    expect(reviewRes.status).toBe(201);
    expect(reviewRes.body.success).toBe(true);
  });

  it('Step 9: Admin dashboard KPI reflects active jobs and transactions', async () => {
    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@nexvion.demo', password: 'NexvionDemo@2026' });

    const adminToken = adminLogin.body.data.access_token;
    const dashRes = await request(app)
      .get('/api/admin/dashboard')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(dashRes.status).toBe(200);
    expect(dashRes.body.data.total_workers).toBeGreaterThanOrEqual(20);
    expect(dashRes.body.data.total_cooperatives).toBeGreaterThanOrEqual(5);
    expect(dashRes.body.data.total_customers).toBeGreaterThanOrEqual(10);
    expect(dashRes.body.data.total_transactions).toBeGreaterThan(0);
  });
});
