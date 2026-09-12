# NEXVION Architecture Specification

**SIH 2026 Problem Statement ID**: 26089  
**Theme**: Agriculture, Foodtech & Rural Development  
**Title**: Cooperative Gig Services platform for household & community services

---

## 1. Architectural Philosophy

NEXVION is built specifically to address the structural dysfunctions of the informal workforce in India:
1. **Irregular Employment** $\rightarrow$ Aggregated through Cooperative Workforces & Demand Forecasting
2. **Unfair Wages** $\rightarrow$ Guaranteed transparent wage split with platform caps and zero hidden commissions
3. **Time & Money Wastage** $\rightarrow$ Explainable AI Matching Engine factoring localized transit and service radii
4. **Lack of Safety & Welfare** $\rightarrow$ Dedicated NEXVION Welfare & Safety Shield with micro-insurance and SOS channels

---

## 2. System Overview

```
                      +-----------------------------+
                      |   NEXVION Cross-Platform    |
                      |   Mobile & Web Clients      |
                      |  (Workers, Coops, Customers)|
                      +--------------+--------------+
                                     |
                                     | REST (JSON / JWT)
                                     v
                      +-----------------------------+
                      |     NEXVION API Gateway     |
                      |      (Express + TypeScript) |
                      +--------------+--------------+
                                     |
         +---------------------------+---------------------------+
         |                           |                           |
         v                           v                           v
+------------------+       +------------------+       +------------------+
| AI Matching      |       |  Job Lifecycle   |       | Welfare & Safety |
| & Reliability    |       |  State Machine   |       | Shield Module    |
| Engine           |       |  & Wage Split    |       |                  |
+------------------+       +------------------+       +------------------+
         |                           |                           |
         +---------------------------+---------------------------+
                                     |
                                     v
                      +-----------------------------+
                      |   Relational Persistence    |
                      |   PostgreSQL / PostGIS      |
                      |  (SQLite for Local Dev)     |
                      +-----------------------------+
```

---

## 3. Core Modules

### A. Skill Passport
Each worker possesses a verifiable digital Skill Passport featuring:
- Biographic and credential identification
- Multi-tier verification status: `PENDING`, `VERIFIED`, `REJECTED`
- Skill competencies with certified experience years
- Historical completion logs and reliability ratings
- Verification badges sanctioned by cooperative leaders and platform administrators

### B. Group Hiring Engine
Enables customers to request multi-person workforce cohorts (e.g. 4-10 workers for agricultural harvesting, community drain clearing, complex building repairs) with:
- Team capability filtering
- Cooperative capacity checks
- Real-time member assignment
- Collective attendance tracking

### C. Explainable AI Smart Matching
Deterministic multi-factor scoring algorithm producing normalized match percentages and human-auditable reasons:
$$\text{Match Score} = \sum_{i} w_i \cdot f_i$$
Where weights $w_i$ are:
- Skill Match: 30%
- Availability: 15%
- Distance: 15%
- Reliability: 15%
- Experience: 10%
- Customer Rating: 5%
- Verification Status: 5%
- Wage Compatibility: 5%

### D. Fair Wage & Transparent Payment Architecture
Eliminates opaque middleman cuts. For every job, transparent breakdowns are calculated:
- **Individual Gig**: 90% Worker Net Wage, 10% Platform & Safety Shield Fee
- **Group Cooperative Gig**: 80% Direct Worker Wages, 10% Cooperative Equipment & Welfare Fund, 10% Platform & Safety Shield Fee
- Idempotent transaction generation supporting Demo UPI/Cards with production webhooks ready for Razorpay/Stripe.

### E. OTP + GPS Attendance Validation
Ensures physical presence before work commences:
1. Customer is issued a time-sensitive 6-digit OTP (Demo: `123456`).
2. Worker/Team enters OTP upon arrival.
3. System verifies GPS proximity via Haversine calculation $\le$ Job Coordinates.
4. Status transitions automatically to `IN_PROGRESS`.
