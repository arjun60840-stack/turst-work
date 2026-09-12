# NEXVION Security Hardening Guide

---

## 1. Authentication & Session Strategy
- **Password Protection**: Passwords hashed with `bcryptjs` using 10 salt rounds.
- **JWT Token Topology**:
  - `access_token`: Short-lived (15 minutes or 24 hours in dev) bearing `{ id, email, role }`.
  - `refresh_token`: Long-lived (7 days), stored in the `refresh_tokens` database table with revocation flags (`is_revoked`).
- **Role-Based Access Control (RBAC)**:
  - Role hierarchy enforced strictly on backend route middleware: `authorize('admin')`, `authorize('customer')`, etc.
  - Workers cannot access customer payment methods or admin dispute resolution tools.

---

## 2. API & Network Protection
- **CORS Configuration**: Restricts methods to `['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']` with controlled headers.
- **Helmet**: Injects security headers (`X-DNS-Prefetch-Control`, `X-Frame-Options`, `X-XSS-Protection`, etc.).
- **Rate Limiting**:
  - Global limiter: Max 100 requests per 15 minutes window (`RATE_LIMIT_WINDOW_MS`).
  - Auth limiter: Max 20 attempts per 15 minutes window to block credential brute-forcing.

---

## 3. Financial & Attendance Safeguards
- **Idempotency**: Transparent wage splits and payments generate distinct `transaction_id` markers before settlement.
- **OTP Safety**:
  - 6-digit cryptographic random code with 10-minute expiry (`otp_expires_at`).
  - Max 3 verification attempts before locking (`otp_attempts`).
  - Strict GPS proximity binding prevents attendance spoofing.
- **Zero Sensitive Storage**: No credit card PANs, Aadhaar numbers, or banking credentials are saved in plaintext.
