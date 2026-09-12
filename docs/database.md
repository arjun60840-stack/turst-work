# NEXVION Database Schema Reference

**Engine**: SQLite (Development) / PostgreSQL 15+ with PostGIS (Production)  
**ORM / Migration Tool**: Knex.js

---

## Entity Relationship Summary

The schema is normalized into 27 core relational entities:

### 1. Identity & Role Access
- **`users`**: Central authentication table (`id`, `email`, `password_hash`, `phone`, `role`, `is_active`, timestamps)
- **`refresh_tokens`**: Rotating session tokens for secure token renewal (`token`, `expires_at`, `is_revoked`)

### 2. Stakeholder Profiles
- **`workers`**: Comprehensive workforce entities (`user_id`, `name`, `bio`, `verification_status`, `reliability_score`, `total_jobs_completed`, `total_earnings`, `service_radius_km`, `is_available`, `cooperative_id`)
- **`customers`**: Service consumer entities (`user_id`, `name`, `address`, `latitude`, `longitude`, `total_jobs_posted`, `average_rating`)
- **`cooperatives`**: Self-governing worker collectives (`name`, `leader_user_id`, `service_radius_km`, `verification_status`, `reliability_score`, `member_count`)
- **`cooperative_members`**: Many-to-many relationship mapping workers into cooperatives with roles (`leader` vs `member`)

### 3. Skill Taxonomy & Verifications
- **`service_categories`**: Core macro classifications (Electrical, Plumbing, Carpentry, Masonry, Agriculture, etc.)
- **`skills`**: Granular technical proficiencies linked to categories
- **`worker_skills`**: Worker competency map (`skill_level`, `years_experience`, `is_verified`)
- **`certificates`**: Digital skill credentials with verification status (`issuing_authority`, `file_url`, `verification_status`)
- **`worker_availability`**: Weekly scheduling matrix (`day_of_week`, `start_time`, `end_time`, `is_available`)

### 4. Job Lifecycle & Group Hiring
- **`job_requests`**: Service requirements created by customers (`category_id`, `hiring_type`, `workers_needed`, `budget`, `scheduled_date`, `status`)
- **`job_requirements`**: Per-job skill competencies requested
- **`job_candidates`**: AI-evaluated match results with audit logs (`match_score`, `match_reasons` JSON)
- **`bookings`**: Contractual commitments between customers and workers/teams (`otp_code`, `otp_verified`, `agreement_accepted_customer`, `agreement_accepted_worker`)
- **`booking_workers`**: Roster of allocated workers on group gigs with per-worker wage allocation and attendance timestamps

### 5. Financial Transparency
- **`payments`**: Transaction records (`amount`, `status`, `payment_mode`, `transaction_id`, `paid_at`)
- **`payment_splits`**: Line-item distribution of every rupee (`recipient_type`, `recipient_id`, `amount`, `description`)

### 6. Welfare & Community Protection
- **`welfare_profiles`**: Micro-insurance and safety coverage status (`insurance_status`, `emergency_contact_phone`, `total_contributions`)
- **`welfare_contributions`**: Automated platform and gig contribution deductions
- **`safety_requests`**: On-site incident, SOS, and physical hazard escalation tickets

### 7. Governance, Dispute & Feedback
- **`reviews`**: Dual-sided ratings across quality, punctuality, and communication
- **`complaints`**: Dispute tickets with status tracking (`OPEN`, `UNDER_REVIEW`, `RESOLVED`, `REJECTED`)
- **`notifications`**: Real-time in-app lifecycle alerts
- **`demand_history`** & **`demand_predictions`**: Spatial-temporal analytics for demand forecasting
- **`audit_logs`**: Tamper-resistant trail of sensitive operations
