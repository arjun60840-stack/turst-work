import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // 1. Users
  await knex.schema.createTable('users', (t) => {
    t.text('id').primary();
    t.text('email').unique().notNullable();
    t.text('password_hash').notNullable();
    t.text('phone');
    t.text('role').notNullable(); // customer, worker, cooperative, admin
    t.boolean('is_active').defaultTo(true);
    t.text('last_login');
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 2. Service Categories
  await knex.schema.createTable('service_categories', (t) => {
    t.text('id').primary();
    t.text('name').unique().notNullable();
    t.text('description');
    t.text('icon');
    t.boolean('is_active').defaultTo(true);
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 3. Skills
  await knex.schema.createTable('skills', (t) => {
    t.text('id').primary();
    t.text('name').notNullable();
    t.text('category_id').references('id').inTable('service_categories');
    t.text('description');
    t.boolean('is_active').defaultTo(true);
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 4. Cooperatives (before workers, since workers reference cooperatives)
  await knex.schema.createTable('cooperatives', (t) => {
    t.text('id').primary();
    t.text('name').notNullable();
    t.text('description');
    t.text('logo_url');
    t.text('leader_user_id').references('id').inTable('users');
    t.float('latitude');
    t.float('longitude');
    t.float('service_radius_km').defaultTo(15);
    t.text('verification_status').defaultTo('pending');
    t.float('reliability_score').defaultTo(50);
    t.integer('total_jobs_completed').defaultTo(0);
    t.float('average_rating').defaultTo(0);
    t.integer('member_count').defaultTo(0);
    t.boolean('is_active').defaultTo(true);
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 5. Workers
  await knex.schema.createTable('workers', (t) => {
    t.text('id').primary();
    t.text('user_id').references('id').inTable('users').unique().notNullable();
    t.text('name').notNullable();
    t.text('photo_url');
    t.text('bio');
    t.text('date_of_birth');
    t.text('gender');
    t.text('address');
    t.float('latitude');
    t.float('longitude');
    t.float('service_radius_km').defaultTo(10);
    t.text('verification_status').defaultTo('pending');
    t.float('reliability_score').defaultTo(50);
    t.integer('total_jobs_completed').defaultTo(0);
    t.float('total_earnings').defaultTo(0);
    t.float('average_rating').defaultTo(0);
    t.boolean('is_available').defaultTo(true);
    t.text('cooperative_id').references('id').inTable('cooperatives');
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 6. Customers
  await knex.schema.createTable('customers', (t) => {
    t.text('id').primary();
    t.text('user_id').references('id').inTable('users').unique().notNullable();
    t.text('name').notNullable();
    t.text('photo_url');
    t.text('phone');
    t.text('address');
    t.float('latitude');
    t.float('longitude');
    t.integer('total_jobs_posted').defaultTo(0);
    t.float('average_rating').defaultTo(0);
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 7. Cooperative Members
  await knex.schema.createTable('cooperative_members', (t) => {
    t.text('id').primary();
    t.text('cooperative_id').references('id').inTable('cooperatives').notNullable();
    t.text('worker_id').references('id').inTable('workers').notNullable();
    t.text('role').defaultTo('member'); // leader, member
    t.text('joined_at').defaultTo(knex.fn.now());
    t.boolean('is_active').defaultTo(true);
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
    t.unique(['cooperative_id', 'worker_id']);
  });

  // 8. Worker Skills
  await knex.schema.createTable('worker_skills', (t) => {
    t.text('id').primary();
    t.text('worker_id').references('id').inTable('workers').notNullable();
    t.text('skill_id').references('id').inTable('skills').notNullable();
    t.text('skill_level').defaultTo('intermediate');
    t.integer('years_experience').defaultTo(0);
    t.boolean('is_verified').defaultTo(false);
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
    t.unique(['worker_id', 'skill_id']);
  });

  // 9. Certificates
  await knex.schema.createTable('certificates', (t) => {
    t.text('id').primary();
    t.text('worker_id').references('id').inTable('workers').notNullable();
    t.text('name').notNullable();
    t.text('issuing_authority');
    t.text('issue_date');
    t.text('expiry_date');
    t.text('file_url');
    t.text('verification_status').defaultTo('pending');
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 10. Worker Availability
  await knex.schema.createTable('worker_availability', (t) => {
    t.text('id').primary();
    t.text('worker_id').references('id').inTable('workers').notNullable();
    t.text('day_of_week').notNullable();
    t.text('start_time').defaultTo('09:00');
    t.text('end_time').defaultTo('18:00');
    t.boolean('is_available').defaultTo(true);
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 11. Job Requests
  await knex.schema.createTable('job_requests', (t) => {
    t.text('id').primary();
    t.text('customer_id').references('id').inTable('customers').notNullable();
    t.text('title').notNullable();
    t.text('description');
    t.text('category_id').references('id').inTable('service_categories');
    t.text('hiring_type').defaultTo('individual');
    t.integer('workers_needed').defaultTo(1);
    t.float('latitude').notNullable();
    t.float('longitude').notNullable();
    t.text('address');
    t.text('scheduled_date').notNullable();
    t.text('scheduled_time').notNullable();
    t.float('estimated_duration_hours').defaultTo(2);
    t.float('budget').notNullable();
    t.text('status').defaultTo('requested');
    t.text('photo_url');
    t.text('additional_requirements');
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 12. Job Requirements
  await knex.schema.createTable('job_requirements', (t) => {
    t.text('id').primary();
    t.text('job_id').references('id').inTable('job_requests').notNullable();
    t.text('skill_id').references('id').inTable('skills').notNullable();
    t.text('min_skill_level');
    t.integer('workers_needed').defaultTo(1);
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 13. Job Candidates (AI match results)
  await knex.schema.createTable('job_candidates', (t) => {
    t.text('id').primary();
    t.text('job_id').references('id').inTable('job_requests').notNullable();
    t.text('worker_id').references('id').inTable('workers');
    t.text('cooperative_id').references('id').inTable('cooperatives');
    t.float('match_score').defaultTo(0);
    t.text('match_reasons'); // JSON string
    t.boolean('is_selected').defaultTo(false);
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 14. Bookings
  await knex.schema.createTable('bookings', (t) => {
    t.text('id').primary();
    t.text('job_id').references('id').inTable('job_requests').notNullable();
    t.text('customer_id').references('id').inTable('customers').notNullable();
    t.text('worker_id').references('id').inTable('workers');
    t.text('cooperative_id').references('id').inTable('cooperatives');
    t.text('hiring_type').defaultTo('individual');
    t.text('status').defaultTo('booked');
    t.float('total_amount').defaultTo(0);
    t.float('worker_amount').defaultTo(0);
    t.float('cooperative_amount').defaultTo(0);
    t.float('platform_fee').defaultTo(0);
    t.text('otp_code');
    t.text('otp_expires_at');
    t.boolean('otp_verified').defaultTo(false);
    t.integer('otp_attempts').defaultTo(0);
    t.boolean('agreement_accepted_customer').defaultTo(false);
    t.boolean('agreement_accepted_worker').defaultTo(false);
    t.text('agreement_accepted_at');
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 15. Booking Workers (for group hiring)
  await knex.schema.createTable('booking_workers', (t) => {
    t.text('id').primary();
    t.text('booking_id').references('id').inTable('bookings').notNullable();
    t.text('worker_id').references('id').inTable('workers').notNullable();
    t.float('wage_amount').defaultTo(0);
    t.boolean('attendance_verified').defaultTo(false);
    t.text('attendance_time');
    t.float('attendance_latitude');
    t.float('attendance_longitude');
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 16. Payments
  await knex.schema.createTable('payments', (t) => {
    t.text('id').primary();
    t.text('booking_id').references('id').inTable('bookings').notNullable();
    t.text('job_id').references('id').inTable('job_requests').notNullable();
    t.text('customer_id').references('id').inTable('customers').notNullable();
    t.float('amount').notNullable();
    t.text('status').defaultTo('pending');
    t.text('payment_mode').defaultTo('demo');
    t.text('payment_method');
    t.text('transaction_id');
    t.text('paid_at');
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 17. Payment Splits
  await knex.schema.createTable('payment_splits', (t) => {
    t.text('id').primary();
    t.text('payment_id').references('id').inTable('payments').notNullable();
    t.text('booking_id').references('id').inTable('bookings').notNullable();
    t.text('recipient_type').notNullable(); // worker, cooperative, platform
    t.text('recipient_id');
    t.float('amount').notNullable();
    t.text('description');
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 18. Reviews
  await knex.schema.createTable('reviews', (t) => {
    t.text('id').primary();
    t.text('booking_id').references('id').inTable('bookings').notNullable();
    t.text('job_id').references('id').inTable('job_requests').notNullable();
    t.text('reviewer_id').references('id').inTable('users').notNullable();
    t.text('reviewee_id').references('id').inTable('users').notNullable();
    t.text('reviewer_role');
    t.integer('rating').notNullable();
    t.text('comment');
    t.integer('service_quality');
    t.integer('punctuality');
    t.integer('communication');
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
    t.unique(['booking_id', 'reviewer_id']);
  });

  // 19. Welfare Profiles
  await knex.schema.createTable('welfare_profiles', (t) => {
    t.text('id').primary();
    t.text('worker_id').references('id').inTable('workers').unique().notNullable();
    t.text('insurance_status').defaultTo('pending');
    t.text('insurance_provider');
    t.text('insurance_policy_number');
    t.text('emergency_contact_name');
    t.text('emergency_contact_phone');
    t.float('total_contributions').defaultTo(0);
    t.boolean('is_demo').defaultTo(true);
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 20. Welfare Contributions
  await knex.schema.createTable('welfare_contributions', (t) => {
    t.text('id').primary();
    t.text('worker_id').references('id').inTable('workers').notNullable();
    t.float('amount').notNullable();
    t.text('source');
    t.text('description');
    t.text('contributed_at').defaultTo(knex.fn.now());
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 21. Safety Requests
  await knex.schema.createTable('safety_requests', (t) => {
    t.text('id').primary();
    t.text('worker_id').references('id').inTable('workers').notNullable();
    t.text('type').notNullable(); // emergency, incident, support, safety_concern
    t.text('title').notNullable();
    t.text('description');
    t.text('status').defaultTo('open');
    t.text('resolved_at');
    t.text('resolution_notes');
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 22. Complaints
  await knex.schema.createTable('complaints', (t) => {
    t.text('id').primary();
    t.text('reporter_id').references('id').inTable('users').notNullable();
    t.text('reporter_role');
    t.text('job_id').references('id').inTable('job_requests');
    t.text('booking_id').references('id').inTable('bookings');
    t.text('category');
    t.text('title').notNullable();
    t.text('description');
    t.text('evidence_url');
    t.text('status').defaultTo('open');
    t.text('admin_notes');
    t.text('resolved_at');
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 23. Notifications
  await knex.schema.createTable('notifications', (t) => {
    t.text('id').primary();
    t.text('user_id').references('id').inTable('users').notNullable();
    t.text('type');
    t.text('title');
    t.text('message');
    t.text('data'); // JSON string
    t.boolean('is_read').defaultTo(false);
    t.text('read_at');
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 24. Demand History
  await knex.schema.createTable('demand_history', (t) => {
    t.text('id').primary();
    t.text('category_id').references('id').inTable('service_categories');
    t.float('latitude');
    t.float('longitude');
    t.text('area_name');
    t.text('date');
    t.integer('jobs_requested').defaultTo(0);
    t.integer('jobs_completed').defaultTo(0);
    t.integer('jobs_unfulfilled').defaultTo(0);
    t.integer('workers_available').defaultTo(0);
    t.integer('workers_needed').defaultTo(0);
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 25. Demand Predictions
  await knex.schema.createTable('demand_predictions', (t) => {
    t.text('id').primary();
    t.text('category_id').references('id').inTable('service_categories');
    t.text('area_name');
    t.text('prediction_date');
    t.integer('predicted_demand');
    t.text('confidence').defaultTo('medium');
    t.text('trend').defaultTo('stable');
    t.text('recommendation');
    t.boolean('is_demo').defaultTo(true);
    t.text('created_at').defaultTo(knex.fn.now());
    t.text('updated_at').defaultTo(knex.fn.now());
  });

  // 26. Audit Logs
  await knex.schema.createTable('audit_logs', (t) => {
    t.text('id').primary();
    t.text('user_id').references('id').inTable('users');
    t.text('action').notNullable();
    t.text('entity_type');
    t.text('entity_id');
    t.text('details'); // JSON
    t.text('ip_address');
    t.text('created_at').defaultTo(knex.fn.now());
  });

  // 27. Refresh Tokens
  await knex.schema.createTable('refresh_tokens', (t) => {
    t.text('id').primary();
    t.text('user_id').references('id').inTable('users').notNullable();
    t.text('token').notNullable();
    t.text('expires_at').notNullable();
    t.boolean('is_revoked').defaultTo(false);
    t.text('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  const tables = [
    'refresh_tokens', 'audit_logs', 'demand_predictions', 'demand_history',
    'notifications', 'complaints', 'safety_requests', 'welfare_contributions',
    'welfare_profiles', 'reviews', 'payment_splits', 'payments',
    'booking_workers', 'bookings', 'job_candidates', 'job_requirements',
    'job_requests', 'worker_availability', 'certificates', 'worker_skills',
    'cooperative_members', 'workers', 'customers', 'cooperatives',
    'skills', 'service_categories', 'users',
  ];
  for (const table of tables) {
    await knex.schema.dropTableIfExists(table);
  }
}