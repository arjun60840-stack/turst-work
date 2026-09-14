const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'apps', 'admin', 'public', 'assets', 'workers');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const workers = [
  { id: 'electrician', title: 'Certified Electrician', color1: '#1E3A8A', color2: '#3B82F6', accent: '#F59E0B', badge: 'High Voltage & Smart Metering', tool: '⚡' },
  { id: 'plumber', title: 'Master Plumber', color1: '#0F766E', color2: '#14B8A6', accent: '#06B6D4', badge: 'Hydro & Pipeline Specialist', tool: '🔧' },
  { id: 'carpenter', title: 'Precision Carpenter', color1: '#78350F', color2: '#D97706', accent: '#FCD34D', badge: 'Modular & Structural Joinery', tool: '🪚' },
  { id: 'painter', title: 'Architectural Painter', color1: '#831843', color2: '#EC4899', accent: '#F43F5E', badge: 'Interior / Texture Finishes', tool: '🎨' },
  { id: 'mason', title: 'Civil Mason & Tiler', color1: '#374151', color2: '#6B7280', accent: '#F97316', badge: 'Reinforced Masonry & Flooring', tool: '🧱' },
  { id: 'agri', title: 'Agri-Crew Specialist', color1: '#14532D', color2: '#22C55E', accent: '#84CC16', badge: 'Harvesting & Farm Operations', tool: '🌾' },
  { id: 'cleaner', title: 'Industrial Deep Cleaner', color1: '#1E1B4B', color2: '#6366F1', accent: '#38BDF8', badge: 'Sanitization & Deep Cleaning', tool: '✨' },
  { id: 'technician', title: 'HVAC & Appliance Expert', color1: '#0C4A6E', color2: '#0284C7', accent: '#38BDF8', badge: 'Smart Diagnosis & Refrigeration', tool: '❄️' }
];

workers.forEach((w) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-${w.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${w.color1}" />
      <stop offset="50%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="${w.color2}" />
    </linearGradient>
    <linearGradient id="glow-${w.id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${w.accent}" stop-opacity="0.8" />
      <stop offset="100%" stop-color="${w.color2}" stop-opacity="0.2" />
    </linearGradient>
    <radialGradient id="halo-${w.id}" cx="50%" cy="38%" r="55%">
      <stop offset="0%" stop-color="${w.color2}" stop-opacity="0.4" />
      <stop offset="70%" stop-color="#0F172A" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="600" height="700" fill="url(#bg-${w.id})" rx="24"/>
  <circle cx="300" cy="260" r="210" fill="url(#halo-${w.id})" />
  <circle cx="300" cy="250" r="140" fill="#090E1A" stroke="url(#glow-${w.id})" stroke-width="4" />
  <g transform="translate(160, 120)">
    <path d="M70 55 C70 15, 210 15, 210 55 C225 58, 235 70, 225 78 C205 85, 75 85, 55 78 C45 70, 55 58, 70 55 Z" fill="${w.accent}" />
    <ellipse cx="140" cy="45" rx="55" ry="28" fill="${w.accent}" />
    <ellipse cx="140" cy="110" rx="38" ry="42" fill="#D97706" opacity="0.95" />
    <rect x="126" y="142" width="28" height="26" fill="#B45309" rx="3" />
    <path d="M50 250 L68 170 Q140 155 212 170 L230 250 Z" fill="#1E293B" />
    <path d="M82 170 L68 250 L95 250 L104 170 Z" fill="${w.accent}" opacity="0.95" />
    <path d="M198 170 L212 250 L185 250 L176 170 Z" fill="${w.accent}" opacity="0.95" />
    <rect x="70" y="210" width="140" height="12" fill="#E2E8F0" opacity="0.85" rx="2" />
  </g>
  <g transform="translate(260, 350)">
    <circle cx="40" cy="40" r="34" fill="${w.color2}" stroke="#FFFFFF" stroke-width="3" />
    <text x="40" y="48" font-size="28" text-anchor="middle" dominant-baseline="middle">${w.tool}</text>
  </g>
  <g transform="translate(40, 470)">
    <rect width="520" height="190" rx="18" fill="rgba(15, 23, 42, 0.88)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />
    <rect x="24" y="22" width="110" height="24" rx="12" fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" stroke-width="1"/>
    <circle cx="36" cy="34" r="4" fill="#10B981" />
    <text x="46" y="38" fill="#34D399" font-family="system-ui, sans-serif" font-size="11" font-weight="700">VERIFIED PRO</text>
    <rect x="420" y="22" width="76" height="24" rx="12" fill="rgba(245, 158, 11, 0.2)" stroke="#F59E0B" stroke-width="1"/>
    <text x="458" y="38" fill="#FBBF24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle">★ 4.96</text>
    <text x="24" y="82" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="24" font-weight="800">${w.title}</text>
    <text x="24" y="110" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="13" font-weight="500">${w.badge}</text>
    <g transform="translate(24, 134)">
      <rect width="145" height="32" rx="8" fill="rgba(255,255,255,0.06)" />
      <text x="12" y="21" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="12" font-weight="600">⚡ 98% On-Time</text>
    </g>
    <g transform="translate(180, 134)">
      <rect width="150" height="32" rx="8" fill="rgba(255,255,255,0.06)" />
      <text x="12" y="21" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="12" font-weight="600">🛡️ Skill Escrow</text>
    </g>
    <g transform="translate(340, 134)">
      <rect width="156" height="32" rx="8" fill="rgba(37, 99, 235, 0.25)" stroke="rgba(59, 130, 246, 0.4)" />
      <text x="12" y="21" fill="#93C5FD" font-family="system-ui, sans-serif" font-size="12" font-weight="700">📍 Geo-Matched</text>
    </g>
  </g>
</svg>`;
  fs.writeFileSync(path.join(outDir, `${w.id}.svg`), svg.trim(), 'utf8');
});
console.log('Worker SVGs created successfully!');
