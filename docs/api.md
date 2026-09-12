# NEXVION API Specification

Base URL: `http://localhost:3000/api`

---

## Authentication & Authorization
All endpoints except `/api/auth/register`, `/api/auth/login`, and `/api/health` require a Bearer token:
`Authorization: Bearer <access_token>`

| Method | Endpoint | Description | Role |
|---|---|---|---|
| POST | `/api/auth/register` | Register customer, worker, or cooperative leader | Public |
| POST | `/api/auth/login` | Login with email and password | Public |
| POST | `/api/auth/refresh` | Refresh access token | Public |
| POST | `/api/auth/logout` | Revoke session / refresh token | Authenticated |

---

## Workers & Skill Passport
| Method | Endpoint | Description | Role |
|---|---|---|---|
| GET | `/api/workers` | List workers with filters (`verified`, `available`) | Authenticated |
| GET | `/api/workers/:id` | Detailed worker profile | Authenticated |
| PUT | `/api/workers/:id` | Update profile information | Worker/Admin |
| GET | `/api/workers/:id/skill-passport` | Get complete verifiable Skill Passport | Authenticated |
| POST | `/api/workers/:id/skills` | Add skill competency | Worker/Admin |
| PUT | `/api/workers/:id/availability` | Update working hours and available days | Worker |
| GET | `/api/workers/:id/earnings` | View earnings and transparent transaction history | Worker |
| GET | `/api/workers/:id/jobs` | View current and assigned jobs | Worker |

---

## Customer & Job Management
| Method | Endpoint | Description | Role |
|---|---|---|---|
| POST | `/api/jobs` | Post new job request (Individual or Group) | Customer |
| GET | `/api/jobs` | List jobs with status and category filtering | Authenticated |
| GET | `/api/jobs/:id` | Retrieve job details and assigned members | Authenticated |
| PUT | `/api/jobs/:id/status` | Update status via strict state machine | Authenticated |

---

## Explainable AI Matching
| Method | Endpoint | Description | Role |
|---|---|---|---|
| POST | `/api/matching/run` | Execute multi-factor scoring for candidate recommendation | Authenticated |
| GET | `/api/matching/results/:jobId` | Retrieve cached match explanations and ranking | Authenticated |

---

## Bookings, OTP Attendance & Agreements
| Method | Endpoint | Description | Role |
|---|---|---|---|
| POST | `/api/bookings` | Book recommended worker or cooperative team | Customer |
| GET | `/api/bookings/:id` | Retrieve booking details and digital agreement | Authenticated |
| POST | `/api/bookings/:id/agreement` | Digital sign-off for job terms | Customer/Worker |
| POST | `/api/bookings/:id/generate-otp` | Generate time-sensitive attendance OTP | Customer |
| POST | `/api/bookings/:id/verify-otp` | Worker enters OTP + GPS to verify arrival | Worker |
| POST | `/api/bookings/:id/complete` | Mark job completed and trigger wage settlement | Worker/Customer |
| GET | `/api/bookings/:id/wage-split` | View transparent breakdown of customer total | Authenticated |

---

## Payments & Transparent Splits
| Method | Endpoint | Description | Role |
|---|---|---|---|
| POST | `/api/payments` | Process payment (Demo / Sandbox) | Customer |
| GET | `/api/payments/:id` | Retrieve payment record and split allocations | Authenticated |
| GET | `/api/payments/booking/:bookingId` | Get transaction for specific booking | Authenticated |

---

## Welfare & Safety Shield
| Method | Endpoint | Description | Role |
|---|---|---|---|
| GET | `/api/welfare/:workerId` | View micro-insurance, safety history and contributions | Authenticated |
| POST | `/api/welfare/safety-request` | File urgent safety concern or SOS support | Worker |

---

## Administration & Analytics
| Method | Endpoint | Description | Role |
|---|---|---|---|
| GET | `/api/admin/dashboard` | Aggregated platform KPIs | Admin |
| GET | `/api/admin/verifications` | Review pending Skill Passports & credentials | Admin |
| PUT | `/api/admin/verify/:type/:id` | Approve or reject verification | Admin |
| GET | `/api/admin/demand` | Demand history and forecasting analytics | Admin |
| GET | `/api/admin/complaints` | Review customer/worker dispute tickets | Admin |
| PUT | `/api/admin/complaints/:id` | Update complaint status and resolution notes | Admin |
