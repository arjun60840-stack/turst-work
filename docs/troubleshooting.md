# NEXVION Operational Troubleshooting Guide

---

## 1. Backend Issues

### Port 3000 in Use (`EADDRINUSE`)
```bash
# Check process on port 3000
netstat -ano | findstr :3000
# Terminate using PID
taskkill /PID <PID> /F
```

### Database Migration Reset
```bash
cd apps/backend
# Delete current sqlite file if needed
del nexvion.sqlite
# Re-run migration and seed
npx knex migrate:latest
npx knex seed:run
```

---

## 2. Admin Dashboard Issues

### Packages Missing or Tailwind Version Mismatch
```bash
cd apps/admin
npm install
npm run dev
```

---

## 3. Mobile Client Issues

### Expo Port Conflict or Cache Clearing
```bash
cd apps/mobile
npx expo start -c
```

### Running on Physical Android / iOS Devices via Expo Go
1. Install **Expo Go** from Google Play Store or Apple App Store.
2. Run `npx expo start` in `apps/mobile`.
3. Scan the generated QR code using your phone camera (iOS) or Expo Go app (Android).
4. Note: Ensure your phone and development PC are connected to the same Wi-Fi network, and update `API_BASE_URL` in `apps/mobile/src/api/client.ts` to your machine's local LAN IP (e.g. `http://192.168.1.15:3000/api`).
