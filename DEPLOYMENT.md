# WORK TRUST — Production Deployment Guide

**SIH 2026 Problem Statement ID**: 26089  
**Theme**: Agriculture, Foodtech & Rural Development  
**GitHub Repository**: [https://github.com/arjun60840-stack/turst-work.git](https://github.com/arjun60840-stack/turst-work.git)

---

## ?? 1. One-Click Cloud Deployment via Render Blueprint (Recommended - 100% Free)

Work Trust includes a pre-configured **Render Blueprint** (`render.yaml`) in the repository root that deploys both the **Backend API** and the **Admin Web Portal** automatically in 1 click!

### Steps:
1. Go to [https://dashboard.render.com](https://dashboard.render.com) and log in with your GitHub account.
2. Click **New +** in the top right and select **Blueprint**.
3. Connect your GitHub repository:
   ```
   https://github.com/arjun60840-stack/turst-work.git
   ```
4. Render will automatically detect `render.yaml` and show the 2 services:
   - **`worktrust-api`** (Web Service, Node.js, runs migrations and seeds automatically)
   - **`worktrust-admin`** (Static Site, React + Vite Admin dashboard)
5. Click **Apply**.
6. Render will build and deploy both services within 2–3 minutes!
7. Your API will be live at `https://worktrust-api.onrender.com` (with Swagger API docs at `/api-docs`).
8. Your Admin Portal will be live at `https://worktrust-admin.onrender.com`.

---

## ? 2. Deploy Admin Portal on Vercel (Alternative Frontend - 30 Seconds)

If you prefer Vercel for the Admin dashboard:

### Steps:
1. Go to [https://vercel.com](https://vercel.com) and log in.
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository: `arjun60840-stack/turst-work`.
4. In the configuration settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click `Edit` and select `apps/admin`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. In **Environment Variables**, add:
   - `VITE_API_URL`: `https://worktrust-api.onrender.com/api` (or your backend URL)
6. Click **Deploy**!

---

## ?? 3. Local / Self-Hosted Production with Docker

If deploying on an Ubuntu VPS, AWS EC2, or local Docker engine:

```bash
# Clone the repository
git clone https://github.com/arjun60840-stack/turst-work.git
cd turst-work

# Build and start all services
docker compose up -d --build

# Verify all containers are healthy
docker compose ps

# Access services:
# Backend API: http://localhost:3000 (Swagger docs: http://localhost:3000/api-docs)
# Admin Portal: http://localhost:5173
```

---

## ?? 4. Mobile App (Expo / React Native)

The mobile client (`apps/mobile`) can be distributed immediately:

### Instant Web / QR Code Preview:
```bash
cd apps/mobile
npm install
npx expo start
```
Scan the displayed QR code with the **Expo Go** app on Android or iOS.

### Production Android APK Build:
```bash
# Install EAS CLI
npm install -g eas-cli
eas login

# Configure and build APK
eas build -p android --profile preview
```

---

## ?? Pre-Seeded Production Demo Accounts

| Role | Mobile / Username | Password | Notes |
|---|---|---|---|
| **Admin** | `admin` | `Admin@123` | Full platform dashboard & audit log oversight |
| **Worker (Plumbing / Agr)** | `+919876543210` | `Worker@123` | Rajesh Kumar (Reliability: 94%, Verified) |
| **Customer** | `+919876543230` | `Customer@123` | Anita Sharma (New Delhi) |
| **Cooperative Leader** | `+919876543220` | `Coop@123` | GreenFields Agri Co-op |
