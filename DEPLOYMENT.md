# NEXVION Production Deployment Guide

---

## 1. Cloud Architecture Overview

```
                      +-----------------------------+
                      |   Cloudflare / Custom DNS   |
                      |   *.nexvion.app             |
                      +--------------+--------------+
                                     |
              +----------------------+----------------------+
              |                                             |
              v                                             v
+-----------------------------+               +-----------------------------+
|    Admin Web Dashboard      |               |     Backend REST API        |
|    Hosted on Vercel         |               |     Hosted on Render / Fly  |
|    admin.nexvion.app        |               |     api.nexvion.app         |
+-----------------------------+               +--------------+--------------+
                                                             |
                                              +--------------+--------------+
                                              |                             |
                                              v                             v
                               +-----------------------------+  +----------------------+
                               |   Neon Managed PostgreSQL   |  | AWS S3 / Cloudflare  |
                               |   + PostGIS Extension       |  | R2 Document Storage  |
                               +-----------------------------+  +----------------------+
```

---

## 2. Step-by-Step Production Deployment

### Option A: Docker Compose (Self-Hosted / VPS)
```bash
# Clone and prepare environment
git clone <your-repo>
cd nexvion
cp .env.example .env
# Edit .env with production credentials

# Spin up Postgres + PostGIS, Backend, and Admin Portal
docker compose up -d --build

# Verify container health
docker compose ps
```

### Option B: Managed Serverless Cloud (Render + Vercel + Neon)

#### 1. Neon Managed PostgreSQL
1. Create a free project at [neon.tech](https://neon.tech).
2. Enable PostGIS extension: `CREATE EXTENSION postgis;`.
3. Copy the connection string.

#### 2. Render Backend Deployment
1. Connect repository to [Render](https://render.com).
2. Select **Web Service** or use the included `render.yaml` blueprint.
3. Configure Environment Variables:
   - `DB_CLIENT`: `pg`
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` from Neon.
   - `JWT_SECRET`: Random 64-char string.
   - `NODE_ENV`: `production`.
4. Deploy service!

#### 3. Vercel Admin Deployment
1. Import `apps/admin` on [Vercel](https://vercel.com).
2. Set Build Command: `npm run build` and Output Directory: `dist`.
3. Set `VITE_API_URL` to your Render API domain (e.g. `https://api.nexvion.app/api`).
4. Deploy!
