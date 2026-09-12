import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing data in reverse dependency order
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
    await knex(table).del();
  }

  const now = new Date().toISOString();
  const pastDate = (daysAgo: number) => new Date(Date.now() - daysAgo * 86400000).toISOString();

  const demoPasswordHash = await bcrypt.hash('Demo@12345', 10);
  const adminPasswordHash = await bcrypt.hash('NexvionDemo@2026', 10);

  // 1. Service Categories
  const categories = [
    { id: uuidv4(), name: 'Electrical', icon: '⚡', description: 'Wiring, circuit maintenance, and electrical repairs', is_active: true },
    { id: uuidv4(), name: 'Plumbing', icon: '🔧', description: 'Piping, leak repairs, bathroom fittings and drainage', is_active: true },
    { id: uuidv4(), name: 'Carpentry', icon: '🪚', description: 'Woodwork, furniture repair, doors and windows framing', is_active: true },
    { id: uuidv4(), name: 'Painting', icon: '🎨', description: 'Interior, exterior wall painting and surface polishing', is_active: true },
    { id: uuidv4(), name: 'Masonry', icon: '🧱', description: 'Brickwork, tiling, plastering and concrete repairs', is_active: true },
    { id: uuidv4(), name: 'Cleaning', icon: '🧹', description: 'Household deep cleaning, post-construction and sanitation', is_active: true },
    { id: uuidv4(), name: 'Agriculture', icon: '🌾', description: 'Harvesting, irrigation, crop maintenance and farm labor', is_active: true },
    { id: uuidv4(), name: 'Repair & Maintenance', icon: '🔨', description: 'General household and community equipment fixes', is_active: true },
    { id: uuidv4(), name: 'Household Help', icon: '🏠', description: 'Domestic chores, elder assistance and general home aid', is_active: true },
    { id: uuidv4(), name: 'Community Services', icon: '🤝', description: 'Public park upkeep, sanitation drives and community works', is_active: true },
    { id: uuidv4(), name: 'Gardening', icon: '🌿', description: 'Lawn mowing, tree trimming and landscaping', is_active: true },
    { id: uuidv4(), name: 'Construction', icon: '🏗️', description: 'Small-scale building, site labor and scaffolding', is_active: true },
  ];
  await knex('service_categories').insert(categories.map(c => ({ ...c, created_at: now, updated_at: now })));

  const catMap = Object.fromEntries(categories.map(c => [c.name, c.id]));

  // 2. Skills
  const rawSkills = [
    { name: 'House Wiring', cat: 'Electrical', desc: 'Wiring setup and short-circuit repair' },
    { name: 'Appliance Repair', cat: 'Electrical', desc: 'Repairing motors, fans, heaters' },
    { name: 'Solar Installation', cat: 'Electrical', desc: 'Rooftop solar panel and inverter wiring' },
    { name: 'Pipe Fitting', cat: 'Plumbing', desc: 'PVC and metal pipe joint fitting' },
    { name: 'Drainage Clearing', cat: 'Plumbing', desc: 'Clearing blocked drains and septic setups' },
    { name: 'Water Tank Fitting', cat: 'Plumbing', desc: 'Overhead tank connection and valve repair' },
    { name: 'Furniture Making', cat: 'Carpentry', desc: 'Custom wood tables, chairs, cabinets' },
    { name: 'Door & Lock Fitting', cat: 'Carpentry', desc: 'Installing door frames and hinges' },
    { name: 'Wall Painting', cat: 'Painting', desc: 'Primer, emulsion and waterproof coating' },
    { name: 'Wood Varnishing', cat: 'Painting', desc: 'Sanding and polishing wood surfaces' },
    { name: 'Brick Laying', cat: 'Masonry', desc: 'Standard brick and mortar construction' },
    { name: 'Tile Laying', cat: 'Masonry', desc: 'Floor and wall ceramic tile fixing' },
    { name: 'Deep Home Cleaning', cat: 'Cleaning', desc: 'Intensive scrubbing, vacuuming and disinfection' },
    { name: 'Waste Disposal', cat: 'Cleaning', desc: 'Segregation and eco-friendly waste removal' },
    { name: 'Crop Harvesting', cat: 'Agriculture', desc: 'Manual grain, vegetable and fruit harvesting' },
    { name: 'Field Irrigation', cat: 'Agriculture', desc: 'Drip lines, canal furrowing and pump ops' },
    { name: 'General Handyman', cat: 'Repair & Maintenance', desc: 'Multi-skilled quick fixes' },
    { name: 'Masonry Labor', cat: 'Construction', desc: 'Mixing cement and carrying heavy materials' },
    { name: 'Community Sanitation', cat: 'Community Services', desc: 'Drain disinfections and public area cleaning' },
    { name: 'Lawn Landscaping', cat: 'Gardening', desc: 'Turf laying, hedge cutting and bed prep' },
  ];

  const skillRecords = rawSkills.map(s => ({
    id: uuidv4(),
    name: s.name,
    category_id: catMap[s.cat],
    description: s.desc,
    is_active: true,
    created_at: now,
    updated_at: now,
  }));
  await knex('skills').insert(skillRecords);
  const skillMap = Object.fromEntries(skillRecords.map(s => [s.name, s.id]));

  // 3. Admin Account
  const adminUserId = uuidv4();
  await knex('users').insert({
    id: adminUserId,
    email: 'admin@nexvion.demo',
    password_hash: adminPasswordHash,
    phone: '+91-9876543210',
    role: 'admin',
    is_active: true,
    created_at: now,
    updated_at: now,
  });

  // 4. Primary Showcase Demo Accounts
  const demoCustomerId = uuidv4();
  await knex('users').insert({
    id: demoCustomerId,
    email: 'customer@nexvion.demo',
    password_hash: demoPasswordHash,
    phone: '+91-9123456780',
    role: 'customer',
    is_active: true,
    created_at: now,
    updated_at: now,
  });
  const primeCustomerRecordId = uuidv4();
  await knex('customers').insert({
    id: primeCustomerRecordId,
    user_id: demoCustomerId,
    name: 'Ananya Sharma (Customer Demo)',
    phone: '+91-9123456780',
    address: 'Bandra West, Mumbai, MH',
    latitude: 19.0596,
    longitude: 72.8295,
    total_jobs_posted: 6,
    average_rating: 4.9,
    created_at: now,
    updated_at: now,
  });

  const demoWorkerId = uuidv4();
  await knex('users').insert({
    id: demoWorkerId,
    email: 'worker@nexvion.demo',
    password_hash: demoPasswordHash,
    phone: '+91-9820011223',
    role: 'worker',
    is_active: true,
    created_at: now,
    updated_at: now,
  });
  const primeWorkerRecordId = uuidv4();
  await knex('workers').insert({
    id: primeWorkerRecordId,
    user_id: demoWorkerId,
    name: 'Rahul Kumar (Worker Demo)',
    bio: 'Certified Master Electrician with 7+ years of residential and community experience.',
    address: 'Dharavi Main Road, Mumbai, MH',
    latitude: 19.0402,
    longitude: 72.8508,
    service_radius_km: 15,
    verification_status: 'verified',
    reliability_score: 96.5,
    total_jobs_completed: 24,
    total_earnings: 34500,
    average_rating: 4.85,
    is_available: true,
    created_at: now,
    updated_at: now,
  });

  // 5. Cooperative Leaders & Teams
  const coopConfigs = [
    { name: 'Team Alpha — Electrical & Repair Cooperative', email: 'coop1@nexvion.demo', leader: 'Sunil Patil', lat: 19.0510, lng: 72.8410 },
    { name: 'Team Beta — JalSeva Plumbing Union', email: 'coop2@nexvion.demo', leader: 'Manoj Jadhav', lat: 19.0620, lng: 72.8350 },
    { name: 'Team Gamma — Community Builders Guild', email: 'coop3@nexvion.demo', leader: 'Ramesh Sawant', lat: 19.0730, lng: 72.8550 },
    { name: 'Team Delta — Swachh Bharat Sanitation Team', email: 'coop4@nexvion.demo', leader: 'Pooja Gaikwad', lat: 19.0350, lng: 72.8250 },
    { name: 'Team Epsilon — Rural Artisans Collective', email: 'coop5@nexvion.demo', leader: 'Ganesh More', lat: 19.0800, lng: 72.8600 },
  ];

  const coopRecords: any[] = [];
  for (let i = 0; i < coopConfigs.length; i++) {
    const cfg = coopConfigs[i];
    const leaderUserId = uuidv4();
    await knex('users').insert({
      id: leaderUserId,
      email: cfg.email,
      password_hash: demoPasswordHash,
      phone: `+91-998800112${i}`,
      role: 'cooperative',
      is_active: true,
      created_at: now,
      updated_at: now,
    });

    // Also link cooperative@nexvion.demo alias as Team Alpha
    if (i === 0) {
      await knex('users').insert({
        id: uuidv4(),
        email: 'cooperative@nexvion.demo',
        password_hash: demoPasswordHash,
        phone: '+91-9988009999',
        role: 'cooperative',
        is_active: true,
        created_at: now,
        updated_at: now,
      });
    }

    const coopId = uuidv4();
    const coopRecord = {
      id: coopId,
      name: cfg.name,
      description: `Registered rural and urban service cooperative led by ${cfg.leader}.`,
      leader_user_id: leaderUserId,
      latitude: cfg.lat,
      longitude: cfg.lng,
      service_radius_km: 25,
      verification_status: 'verified',
      reliability_score: 93.0 + i,
      total_jobs_completed: 18 + i * 4,
      average_rating: 4.8,
      member_count: 4,
      is_active: true,
      created_at: now,
      updated_at: now,
    };
    await knex('cooperatives').insert(coopRecord);
    coopRecords.push(coopRecord);
  }

  // Assign demo worker to Team Alpha
  await knex('workers').where({ id: primeWorkerRecordId }).update({ cooperative_id: coopRecords[0].id });
  await knex('cooperative_members').insert({
    id: uuidv4(),
    cooperative_id: coopRecords[0].id,
    worker_id: primeWorkerRecordId,
    role: 'leader',
    joined_at: pastDate(180),
    is_active: true,
    created_at: now,
    updated_at: now,
  });

  // Assign demo worker skills
  await knex('worker_skills').insert([
    {
      id: uuidv4(),
      worker_id: primeWorkerRecordId,
      skill_id: skillMap['House Wiring'],
      skill_level: 'expert',
      years_experience: 7,
      is_verified: true,
      created_at: now,
      updated_at: now,
    },
    {
      id: uuidv4(),
      worker_id: primeWorkerRecordId,
      skill_id: skillMap['Appliance Repair'],
      skill_level: 'advanced',
      years_experience: 5,
      is_verified: true,
      created_at: now,
      updated_at: now,
    },
    {
      id: uuidv4(),
      worker_id: primeWorkerRecordId,
      skill_id: skillMap['Solar Installation'],
      skill_level: 'intermediate',
      years_experience: 3,
      is_verified: true,
      created_at: now,
      updated_at: now,
    },
  ]);

  // Demo worker certificate
  await knex('certificates').insert({
    id: uuidv4(),
    worker_id: primeWorkerRecordId,
    name: 'National Skill Development Corp (NSDC) - Level 4 Electrician',
    issuing_authority: 'Skill India / NSDC',
    issue_date: '2022-04-10',
    expiry_date: '2028-04-10',
    verification_status: 'verified',
    created_at: now,
    updated_at: now,
  });

  // Demo worker welfare profile
  await knex('welfare_profiles').insert({
    id: uuidv4(),
    worker_id: primeWorkerRecordId,
    insurance_status: 'active',
    insurance_provider: 'NEXVION Shield Community Micro-Insurance (Demo)',
    insurance_policy_number: 'NEX-SHIELD-2026-0899',
    emergency_contact_name: 'Priya Kumar (Spouse)',
    emergency_contact_phone: '+91-9820099887',
    total_contributions: 3200,
    is_demo: true,
    created_at: now,
    updated_at: now,
  });

  // 6. Generate 20 Workers
  const workerNames = [
    'Amit Verma', 'Suresh Shinde', 'Pooja Nair', 'Dinesh Yadav',
    'Vikram Solanki', 'Deepak Chauhan', 'Kavita Joshi', 'Ravi Shankar',
    'Arjun Kamble', 'Meena Devi', 'Sanjay Gite', 'Neha Barde',
    'Rajeshwari Iyer', 'Prakash Waghmare', 'Anil Lokhande', 'Sunita Mahajan',
    'Gopal Tambe', 'Baban Salunkhe', 'Vandana Kale', 'Mahesh Bhil'
  ];

  const workerSkillOptions = Object.values(skillMap);
  const createdWorkers: any[] = [ { id: primeWorkerRecordId, user_id: demoWorkerId, name: 'Rahul Kumar' } ];

  for (let i = 0; i < workerNames.length; i++) {
    const uId = uuidv4();
    await knex('users').insert({
      id: uId,
      email: `worker${i + 1}@nexvion.demo`,
      password_hash: demoPasswordHash,
      phone: `+91-98110022${(i + 10).toString().padStart(2, '0')}`,
      role: 'worker',
      is_active: true,
      created_at: now,
      updated_at: now,
    });

    const wId = uuidv4();
    // Distribute among cooperatives (4 members per coop)
    const assignedCoop = coopRecords[i % coopRecords.length];
    const reliability = 80 + Math.round((i * 1.7) % 19);
    const rating = 4.2 + ((i * 3) % 8) / 10;

    await knex('workers').insert({
      id: wId,
      user_id: uId,
      name: workerNames[i],
      bio: `Skilled professional member of ${assignedCoop.name} with over ${3 + (i % 6)} years experience.`,
      address: `Locality Sector ${i + 1}, Greater Mumbai, MH`,
      latitude: 19.0400 + (i * 0.005) - 0.03,
      longitude: 72.8300 + (i * 0.004) - 0.02,
      service_radius_km: 12 + (i % 8),
      verification_status: i % 5 === 0 ? 'pending' : 'verified',
      reliability_score: reliability,
      total_jobs_completed: 8 + i * 2,
      total_earnings: (8 + i * 2) * 850,
      average_rating: rating,
      is_available: true,
      cooperative_id: assignedCoop.id,
      created_at: now,
      updated_at: now,
    });

    // Add member to cooperative
    await knex('cooperative_members').insert({
      id: uuidv4(),
      cooperative_id: assignedCoop.id,
      worker_id: wId,
      role: 'member',
      joined_at: pastDate(120 - i * 4),
      is_active: true,
      created_at: now,
      updated_at: now,
    });

    // Add 2-3 skills per worker
    const primarySkill = workerSkillOptions[i % workerSkillOptions.length];
    const secondarySkill = workerSkillOptions[(i + 3) % workerSkillOptions.length];
    await knex('worker_skills').insert([
      {
        id: uuidv4(),
        worker_id: wId,
        skill_id: primarySkill,
        skill_level: 'advanced',
        years_experience: 3 + (i % 5),
        is_verified: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        worker_id: wId,
        skill_id: secondarySkill,
        skill_level: 'intermediate',
        years_experience: 2 + (i % 3),
        is_verified: true,
        created_at: now,
        updated_at: now,
      },
    ]);

    // Welfare Profile
    await knex('welfare_profiles').insert({
      id: uuidv4(),
      worker_id: wId,
      insurance_status: 'active',
      insurance_provider: 'NEXVION Micro-Shield',
      insurance_policy_number: `NEX-POL-2026-${1000 + i}`,
      emergency_contact_name: `Guardian of ${workerNames[i]}`,
      emergency_contact_phone: '+91-9111223344',
      total_contributions: 500 + i * 150,
      is_demo: true,
      created_at: now,
      updated_at: now,
    });

    // Worker availability (all weekdays)
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    for (const day of days) {
      await knex('worker_availability').insert({
        id: uuidv4(),
        worker_id: wId,
        day_of_week: day,
        start_time: '08:30',
        end_time: '18:00',
        is_available: true,
        created_at: now,
        updated_at: now,
      });
    }

    createdWorkers.push({ id: wId, user_id: uId, name: workerNames[i] });
  }

  // 7. Generate 10 Customers
  const customerNames = [
    'Rohan Kulkarni', 'Kavita Menon', 'Siddharth Roy', 'Ayesha Khan',
    'Vikramaditya Rao', 'Preeti Deshmukh', 'Rajeev Singhania',
    'Bhavna Patel', 'Tanmay Goswami', 'Shalini Hegde'
  ];
  const createdCustomers: any[] = [ { id: primeCustomerRecordId, user_id: demoCustomerId, name: 'Ananya Sharma' } ];

  for (let i = 0; i < customerNames.length; i++) {
    const uId = uuidv4();
    await knex('users').insert({
      id: uId,
      email: `customer${i + 1}@nexvion.demo`,
      password_hash: demoPasswordHash,
      phone: `+91-97001122${(i + 10).toString().padStart(2, '0')}`,
      role: 'customer',
      is_active: true,
      created_at: now,
      updated_at: now,
    });

    const cId = uuidv4();
    await knex('customers').insert({
      id: cId,
      user_id: uId,
      name: customerNames[i],
      phone: `+91-97001122${(i + 10).toString().padStart(2, '0')}`,
      address: `Society Block ${String.fromCharCode(65 + i)}, Khar West, Mumbai`,
      latitude: 19.0700 + (i * 0.003),
      longitude: 72.8350 + (i * 0.003),
      total_jobs_posted: 3 + (i % 4),
      average_rating: 4.6 + (i % 4) / 10,
      created_at: now,
      updated_at: now,
    });
    createdCustomers.push({ id: cId, user_id: uId, name: customerNames[i] });
  }

  // 8. Generate 30+ Realistic Jobs (Historical & Active)
  const jobTemplates = [
    { title: 'Community Water Line Maintenance', cat: 'Plumbing', skill: 'Pipe Fitting', budget: 4800, workers: 4, type: 'group' },
    { title: 'Apartment Complex Electric Overhaul', cat: 'Electrical', skill: 'House Wiring', budget: 6000, workers: 4, type: 'group' },
    { title: 'Public Park Boundary Brickwork', cat: 'Masonry', skill: 'Brick Laying', budget: 5500, workers: 5, type: 'group' },
    { title: 'Village Community Hall Painting', cat: 'Painting', skill: 'Wall Painting', budget: 7000, workers: 4, type: 'group' },
    { title: 'Sanitation & Drainage Disinfection Drive', cat: 'Cleaning', skill: 'Drainage Clearing', budget: 3600, workers: 3, type: 'group' },
    { title: 'Farmland Solar Pump Wiring', cat: 'Electrical', skill: 'Solar Installation', budget: 5000, workers: 3, type: 'group' },
    { title: 'Kitchen Sink & Drain Trap Replacement', cat: 'Plumbing', skill: 'Pipe Fitting', budget: 850, workers: 1, type: 'individual' },
    { title: 'Main Switchboard Breaker Tripping Fix', cat: 'Electrical', skill: 'House Wiring', budget: 950, workers: 1, type: 'individual' },
    { title: 'Teakwood Main Door Frame Alignment', cat: 'Carpentry', skill: 'Door & Lock Fitting', budget: 1200, workers: 1, type: 'individual' },
    { title: 'Living Room Accent Wall Repainting', cat: 'Painting', skill: 'Wall Painting', budget: 2200, workers: 2, type: 'individual' },
  ];

  for (let i = 0; i < 32; i++) {
    const tpl = jobTemplates[i % jobTemplates.length];
    const customer = createdCustomers[i % createdCustomers.length];
    const jobId = uuidv4();
    const daysAgo = 32 - i;
    const isHistorical = i < 26;
    const status = isHistorical ? 'closed' : (i === 26 ? 'in_progress' : (i === 27 ? 'booked' : 'requested'));

    await knex('job_requests').insert({
      id: jobId,
      customer_id: customer.id,
      title: `${tpl.title} #${i + 1}`,
      description: `Detailed community gig assignment: ${tpl.title}. High focus on safety, punctuality, and fair wage distribution.`,
      category_id: catMap[tpl.cat],
      hiring_type: tpl.type,
      workers_needed: tpl.workers,
      latitude: 19.0550 + (i % 6) * 0.004,
      longitude: 72.8380 + (i % 6) * 0.003,
      address: `Site Location Plot ${100 + i}, Bandra-Khar Link, Mumbai`,
      scheduled_date: new Date(Date.now() - (daysAgo - 2) * 86400000).toISOString().split('T')[0],
      scheduled_time: '10:00',
      estimated_duration_hours: 4,
      budget: tpl.budget,
      status: status,
      created_at: pastDate(daysAgo),
      updated_at: pastDate(Math.max(0, daysAgo - 1)),
    });

    // Job requirement
    await knex('job_requirements').insert({
      id: uuidv4(),
      job_id: jobId,
      skill_id: skillMap[tpl.skill] || skillRecords[0].id,
      min_skill_level: 'intermediate',
      workers_needed: tpl.workers,
      created_at: pastDate(daysAgo),
      updated_at: pastDate(daysAgo),
    });

    // If historical, create booking, assignment, payment, split, review
    if (isHistorical) {
      const selectedCoop = coopRecords[i % coopRecords.length];
      const bookingId = uuidv4();
      const platformFee = tpl.budget * 0.10;
      const coopContrib = tpl.budget * 0.10;
      const workerTotal = tpl.budget - platformFee - coopContrib;

      await knex('bookings').insert({
        id: bookingId,
        job_id: jobId,
        customer_id: customer.id,
        cooperative_id: tpl.type === 'group' ? selectedCoop.id : null,
        worker_id: tpl.type === 'individual' ? primeWorkerRecordId : null,
        hiring_type: tpl.type,
        status: 'closed',
        total_amount: tpl.budget,
        worker_amount: workerTotal,
        cooperative_amount: coopContrib,
        platform_fee: platformFee,
        otp_code: '123456',
        otp_verified: true,
        agreement_accepted_customer: true,
        agreement_accepted_worker: true,
        agreement_accepted_at: pastDate(daysAgo - 1),
        created_at: pastDate(daysAgo),
        updated_at: pastDate(daysAgo - 1),
      });

      // Assign workers
      const numAssigned = tpl.workers;
      const perWorkerWage = Math.round(workerTotal / numAssigned);
      for (let w = 0; w < numAssigned; w++) {
        const assignedW = createdWorkers[(i + w) % createdWorkers.length];
        await knex('booking_workers').insert({
          id: uuidv4(),
          booking_id: bookingId,
          worker_id: assignedW.id,
          wage_amount: perWorkerWage,
          attendance_verified: true,
          attendance_time: pastDate(daysAgo - 1),
          created_at: pastDate(daysAgo),
          updated_at: pastDate(daysAgo - 1),
        });
      }

      // Payment
      const paymentId = uuidv4();
      await knex('payments').insert({
        id: paymentId,
        booking_id: bookingId,
        job_id: jobId,
        customer_id: customer.id,
        amount: tpl.budget,
        status: 'completed',
        payment_mode: 'demo',
        payment_method: 'demo_upi',
        transaction_id: `DEMO-TXN-2026-${1000 + i}`,
        paid_at: pastDate(daysAgo - 1),
        created_at: pastDate(daysAgo),
        updated_at: pastDate(daysAgo - 1),
      });

      // Payment splits
      for (let w = 0; w < numAssigned; w++) {
        const assignedW = createdWorkers[(i + w) % createdWorkers.length];
        await knex('payment_splits').insert({
          id: uuidv4(),
          payment_id: paymentId,
          booking_id: bookingId,
          recipient_type: 'worker',
          recipient_id: assignedW.id,
          amount: perWorkerWage,
          description: `Wages paid to ${assignedW.name}`,
          created_at: pastDate(daysAgo - 1),
          updated_at: pastDate(daysAgo - 1),
        });
      }

      await knex('payment_splits').insert({
        id: uuidv4(),
        payment_id: paymentId,
        booking_id: bookingId,
        recipient_type: 'cooperative',
        recipient_id: selectedCoop.id,
        amount: coopContrib,
        description: `Cooperative contribution for ${selectedCoop.name}`,
        created_at: pastDate(daysAgo - 1),
        updated_at: pastDate(daysAgo - 1),
      });

      await knex('payment_splits').insert({
        id: uuidv4(),
        payment_id: paymentId,
        booking_id: bookingId,
        recipient_type: 'platform',
        recipient_id: null,
        amount: platformFee,
        description: 'NEXVION platform safety and service fee',
        created_at: pastDate(daysAgo - 1),
        updated_at: pastDate(daysAgo - 1),
      });

      // Customer review
      await knex('reviews').insert({
        id: uuidv4(),
        booking_id: bookingId,
        job_id: jobId,
        reviewer_id: customer.user_id,
        reviewee_id: selectedCoop.leader_user_id,
        reviewer_role: 'customer',
        rating: 5,
        comment: 'Outstanding teamwork, arrived promptly, verified attendance via OTP, and finished with top safety standards.',
        service_quality: 5,
        punctuality: 5,
        communication: 5,
        created_at: pastDate(daysAgo - 1),
        updated_at: pastDate(daysAgo - 1),
      });
    }
  }

  // 9. Seed Demand History (Past 30 Days)
  for (let d = 30; d >= 0; d--) {
    const dt = new Date(Date.now() - d * 86400000).toISOString().split('T')[0];
    for (const cat of categories.slice(0, 6)) {
      const requested = 3 + Math.floor(Math.random() * 8);
      const completed = requested - Math.floor(Math.random() * 2);
      await knex('demand_history').insert({
        id: uuidv4(),
        category_id: cat.id,
        latitude: 19.0550,
        longitude: 72.8400,
        area_name: 'Bandra & Suburban Cluster',
        date: dt,
        jobs_requested: requested,
        jobs_completed: completed,
        jobs_unfulfilled: requested - completed,
        workers_available: 12 + Math.floor(Math.random() * 6),
        workers_needed: requested * 2,
        created_at: now,
        updated_at: now,
      });
    }
  }

  // 10. Seed Demand Predictions (Demo)
  const forecastCats = [
    { cat: 'Electrical', pred: 28, trend: 'rising', rec: 'High electrical repair demand projected due to seasonal power transitions. Mobilize additional wiremen.' },
    { cat: 'Plumbing', pred: 22, trend: 'rising', rec: 'Community pipeline maintenance requests surged 25% this week in western suburbs.' },
    { cat: 'Painting', pred: 14, trend: 'stable', rec: 'Consistent requirement for surface finishings and weatherproofing.' },
    { cat: 'Masonry', pred: 18, trend: 'rising', rec: 'Suburban pavement and boundary repair tenders require 5 additional team allocations.' },
  ];

  for (const fc of forecastCats) {
    await knex('demand_predictions').insert({
      id: uuidv4(),
      category_id: catMap[fc.cat],
      area_name: 'Western Mumbai District Cluster',
      prediction_date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      predicted_demand: fc.pred,
      confidence: 'high',
      trend: fc.trend,
      recommendation: fc.rec,
      is_demo: true,
      created_at: now,
      updated_at: now,
    });
  }

  // 11. Seed Complaints
  await knex('complaints').insert([
    {
      id: uuidv4(),
      reporter_id: demoCustomerId,
      reporter_role: 'customer',
      category: 'Service Quality',
      title: 'Water pipe joint had slight dripping after 2 hours',
      description: 'The team did great work overall, but one secondary kitchen pipe had minor dripping after pressure was restored.',
      status: 'resolved',
      admin_notes: 'Cooperative returned same evening to seal Teflon tape fitting. Customer verified satisfaction.',
      resolved_at: pastDate(2),
      created_at: pastDate(3),
      updated_at: pastDate(2),
    },
    {
      id: uuidv4(),
      reporter_id: demoWorkerId,
      reporter_role: 'worker',
      category: 'Safety Concern',
      title: 'Unsecured overhead power line on access road',
      description: 'Access alley to the community site had low dangling local cable wires. Needed platform caution flag.',
      status: 'open',
      admin_notes: 'Under review by platform safety coordinator.',
      created_at: pastDate(1),
      updated_at: pastDate(1),
    },
  ]);

  // 12. Seed Notifications
  await knex('notifications').insert([
    {
      id: uuidv4(),
      user_id: demoCustomerId,
      type: 'job_completed',
      title: 'Job Completed & Verified',
      message: 'Team Alpha completed "Community Water Line Maintenance". Please review the transparent wage split and provide feedback.',
      is_read: false,
      created_at: pastDate(1),
      updated_at: pastDate(1),
    },
    {
      id: uuidv4(),
      user_id: demoWorkerId,
      type: 'payment_received',
      title: 'Fair Wage Credited (Demo)',
      message: '₹1,100 credited to your account for completing job assignment with Team Alpha.',
      is_read: false,
      created_at: pastDate(1),
      updated_at: pastDate(1),
    },
  ]);

  console.log('✅ NEXVION Demo Data Seeded Successfully with full realistic dataset!');
}