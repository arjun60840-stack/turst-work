# NEXVION — AI-Powered Cooperative Gig Platform

> **Smart India Hackathon (SIH) 2026**  
> **Problem Statement ID**: 26089  
> **Title**: Cooperative Gig Services platform for household & community services  
> **Theme**: Agriculture, Foodtech & Rural Development

---

## 1. Project Overview

**NEXVION** is a purpose-built, full-stack digital cooperative workforce platform. It bridges the gap between household/community gig seekers and informal workers by organizing them into resilient, self-governing **Worker Cooperatives & Teams**.

### Core Problems Solved
1. **Irregular Employment**: Individual gig workers face volatile, sporadic work. NEXVION aggregates community & rural demand, funneling group contracts to cooperative rosters.
2. **Unfair Wages & Hidden Commissions**: Typical aggregators extract 20–35% opaque commissions. NEXVION enforces a **Transparent Wage Split** directly audited by workers and customers.
3. **Time & Transit Wastage**: Workers spend excessive time traveling. NEXVION's **Explainable AI Matching Engine** factors in precise geolocation and travel radius.
4. **Lack of Safety & Social Protection**: Informality leaves workers without recourse. NEXVION introduces the **Welfare & Safety Shield** (micro-insurance tracking, emergency SOS, and cooperative safety reserves).

---

## 2. The 4 Innovation Pillars

| Pillar | Description |
|---|---|
| 🪪 **Skill Passport** | Verifiable digital credentials, certified trade experience, NSDC badges, and real-time reliability metrics. |
| 🤝 **Group Hiring** | Dynamic assembly and booking of 2 to 10+ worker teams for agricultural harvesting, community maintenance, and construction. |
| 🛡️ **Welfare & Safety Shield** | Built-in micro-insurance status, platform welfare contributions, on-site SOS, and incident management. |
| 🧠 **Explainable AI Engine** | Transparent multi-criteria candidate ranking (Skills 30%, Availability 15%, Distance 15%, Reliability 15%, Experience 10%, Rating 5%, Verification 5%, Wage 5%). |

---

## 3. Technology Stack

- **Backend API**: Node.js, TypeScript, Express.js
- **Database**: SQLite (local development with zero native compilation) / PostgreSQL 15+ with PostGIS (production) via Knex.js
- **Mobile Client**: React Native + Expo (Expo Router, Zustand, React Query, React Native Paper)
- **Admin Portal**: React 19, Vite, Tailwind CSS, Recharts
- **Testing**: Jest, ts-jest, Supertest
- **Security**: JWT Access & Refresh tokens, bcryptjs, Helmet, CORS, rate limiting

---

## 4. Demo Accounts (Local / Presentation)

All demo accounts are pre-seeded with realistic data:

| Role | Email | Password | Details |
|---|---|---|---|
| **Admin** | `admin@nexvion.demo` | `NexvionDemo@2026` | Platform governance, verification review, demand insights |
| **Customer** | `customer@nexvion.demo` | `Demo@12345` | Ananya Sharma (Bandra, Mumbai) |
| **Worker** | `worker@nexvion.demo` | `Demo@12345` | Rahul Kumar (Master Electrician, Skill Passport verified) |
| **Cooperative** | `cooperative@nexvion.demo` | `Demo@12345` | Team Alpha Leader (Electrical & Repair Cooperative) |

*(Additional pre-seeded accounts: `customer1`–`customer10@nexvion.demo`, `worker1`–`worker20@nexvion.demo`, `coop1`–`coop5@nexvion.demo` with password `Demo@12345`)*

---

## 5. Quick Start Instructions

### Prerequisites
- **Node.js**: v18+ (tested on Node.js v25.8.1)
- **npm**: v9+

### A. Backend Setup & Startup
```bash
# 1. Navigate to backend directory
cd apps/backend

# 2. Install dependencies
npm install

# 3. Run database migrations (creates all 27 tables)
npx knex migrate:latest

# 4. Seed realistic demo dataset (20 workers, 5 coops, 10 customers, 32 jobs)
npx knex seed:run

# 5. Start the backend server
npm run dev
# Server will run at http://localhost:3000/api
# Health check at http://localhost:3000/api/health
```

### B. Run Automated Test Suite
```bash
cd apps/backend
npm test
# Runs Unit Tests (Matching, Reliability, Wage Split, State Machine) and E2E Demo Scenario
```

### C. Admin Web Portal
```bash
cd apps/admin
npm install
npm run dev
# Dashboard available at http://localhost:5173
```

### D. Mobile Application (Web Preview / Expo Go)
```bash
cd apps/mobile
npm install
npx expo start --web
```

---

## 6. Transparent Wage Split Formula

For any job with budget $B$:
- **Platform Safety & Operations Fee**: $F_{\text{platform}} = B \times 10\%$
- **Cooperative Equipment & Welfare Reserve**: $C_{\text{coop}} = (B - F_{\text{platform}}) \times 10\%$
- **Net Direct Worker Wages**: $W_{\text{total}} = B - F_{\text{platform}} - C_{\text{coop}}$
- **Per Worker Wage** (for $N$ workers): $W_i = \frac{W_{\text{total}}}{N}$

*Example for ₹5,000 Group Job (4 Workers):*
- Worker 1: ₹1,013
- Worker 2: ₹1,013
- Worker 3: ₹1,012
- Worker 4: ₹1,012
- Cooperative Reserve: ₹450
- Platform Shield: ₹500

---

## 7. SIH 2026 End-to-End Demonstration Flow

1. **Customer Login**: Login as `customer@nexvion.demo`
2. **Post Group Gig**: Request 4 Electricians for a Community Hall Wiring project (Budget: ₹5,000)
3. **AI Matching**: System runs multi-factor scoring $\rightarrow$ recommends **Team Alpha (95% Match)** with explainable reasons
4. **Booking & Agreement**: Customer books Team Alpha and signs the Digital Job Agreement
5. **On-Site Attendance**: Customer shares Demo OTP `123456`. Worker logs in, inputs OTP + GPS coordinates $\rightarrow$ status advances to `IN_PROGRESS`
6. **Completion & Wage Split**: Work completed $\rightarrow$ transparent line-item wage split displayed $\rightarrow$ Demo payment processed
7. **Dual Review**: Customer reviews Team Alpha $\rightarrow$ Reliability & ratings updated
8. **Admin Verification**: Administrator reviews audit logs, verification requests, and demand analytics charts

---

## 8. Documentation Index

- [Architecture Specification](docs/architecture.md)
- [Database Schema Reference](docs/database.md)
- [REST API Specification](docs/api.md)
- [Explainable AI & Reliability Engine](docs/ai.md)
- [SIH Master Demonstration Guide](docs/demo.md)
