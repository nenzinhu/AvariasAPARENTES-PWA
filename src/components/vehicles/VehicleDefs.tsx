import React from 'react';

const VehicleDefs: React.FC = () => {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute', overflow: 'hidden' }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Gradientes Radiais Dinâmicos (Reflexos Suaves) */}
        <radialGradient id="metal-car-blue" cx="50%" cy="50%" r="80%" fx="var(--light-x, 30%)" fy="var(--light-y, 30%)">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.75" />
          <stop offset="48%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>

        <radialGradient id="metal-moto-red" cx="50%" cy="50%" r="80%" fx="var(--light-x, 30%)" fy="var(--light-y, 30%)">
          <stop offset="0%" stopColor="#fecaca" stopOpacity="0.72" />
          <stop offset="45%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </radialGradient>

        <radialGradient id="metal-moto-dark" cx="50%" cy="45%" r="80%" fx="var(--light-x, 35%)" fy="var(--light-y, 28%)">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="48%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        
        <radialGradient id="metal-truck-grey" cx="50%" cy="50%" r="80%" fx="var(--light-x, 30%)" fy="var(--light-y, 30%)">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.72" />
          <stop offset="45%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </radialGradient>

        <radialGradient id="metal-bus-green" cx="50%" cy="50%" r="80%" fx="var(--light-x, 30%)" fy="var(--light-y, 30%)">
          <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.72" />
          <stop offset="48%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#065f46" />
        </radialGradient>

        <radialGradient id="metal-van-slate" cx="50%" cy="50%" r="80%" fx="var(--light-x, 30%)" fy="var(--light-y, 30%)">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.72" />
          <stop offset="48%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>

        <linearGradient id="grad-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.28" />
          <stop offset="35%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        <linearGradient id="metal-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.86" />
          <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.82" />
        </linearGradient>

        <linearGradient id="gloss-reflex" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
          <stop offset="42%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0.18" />
        </linearGradient>

        {/* Rodas e Detalhes */}
        <radialGradient id="radial-wheel" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="45%" stopColor="#111827" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>

        <radialGradient id="radial-calota" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="45%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>

        <linearGradient id="wheel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="42%" stopColor="#a3a3a3" />
          <stop offset="100%" stopColor="#525252" />
        </linearGradient>

        {/* Sombra suave */}
        <filter id="shadow-filter">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
        </filter>

        <filter id="part-shadow" x="-18%" y="-18%" width="136%" height="136%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="2" stdDeviation="2.2" floodColor="#020617" floodOpacity="0.32" />
        </filter>

        <filter id="part-hover-glow" x="-28%" y="-28%" width="156%" height="156%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="0" stdDeviation="2.6" floodColor="#38bdf8" floodOpacity="0.48" />
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#020617" floodOpacity="0.22" />
        </filter>

        <filter id="selected-glow" x="-32%" y="-32%" width="164%" height="164%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="0" stdDeviation="3.8" floodColor="#f8fafc" floodOpacity="0.65" />
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.5" />
        </filter>

        {/* Blueprint Mode Patterns & Filters */}
        <pattern id="blueprint-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e293b" strokeWidth="0.2" />
        </pattern>

        <filter id="blueprint-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default VehicleDefs;
