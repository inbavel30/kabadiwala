import React from 'react';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  showText?: boolean;
  className?: string;
}

/**
 * High-fidelity vector rendering of the Reduce-Reuse-Recycle Earth logo
 * in clean Blue and White palette.
 */
export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  showText = false,
  className = '',
}) => {
  const sizeMap = {
    sm: { px: 32, textClass: 'text-sm' },
    md: { px: 44, textClass: 'text-base' },
    lg: { px: 76, textClass: 'text-xl' },
    xl: { px: 110, textClass: 'text-2xl' },
    '2xl': { px: 136, textClass: 'text-3xl' },
    '3xl': { px: 176, textClass: 'text-4xl' },
  };

  const { px } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform hover:scale-105"
        style={{ width: px, height: px }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEFINITIONS: GRADIENTS & FILTERS */}
          <defs>
            {/* Earth Ocean Gradient (Blue) */}
            <linearGradient id="oceanGrad" x1="40" y1="40" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="45%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>

            {/* Earth Continent Gradient (Crisp White / Light Blue) */}
            <linearGradient id="landGrad" x1="50" y1="50" x2="150" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#DBEAFE" />
            </linearGradient>

            {/* Blue Arrow Gradient */}
            <linearGradient id="arrowGrad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1E3A8A" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* 1. CENTRAL EARTH GLOBE BASE */}
          <circle cx="100" cy="100" r="72" fill="url(#oceanGrad)" />

          {/* 2. CONTINENTS & ISLANDS (Crisp White/Ice Blue Vector Blobs) */}
          {/* North America / Europe style landmass */}
          <path
            d="M70 42 C85 36, 115 38, 125 50 C135 62, 140 70, 130 82 C120 90, 110 85, 100 80 C88 74, 75 88, 62 80 C50 72, 55 52, 70 42 Z"
            fill="url(#landGrad)"
            opacity="0.95"
          />

          {/* Africa / Asia style landmass */}
          <path
            d="M95 90 C110 88, 135 95, 145 110 C155 125, 148 145, 130 152 C115 158, 105 142, 98 135 C90 128, 85 136, 75 130 C65 124, 70 102, 85 96 C90 94, 92 90, 95 90 Z"
            fill="url(#landGrad)"
            opacity="0.95"
          />

          {/* South America style landmass */}
          <path
            d="M45 92 C55 88, 62 96, 60 110 C58 122, 50 135, 42 130 C35 125, 36 102, 45 92 Z"
            fill="url(#landGrad)"
            opacity="0.95"
          />

          {/* Ocean wave contour highlights (Blue layered depth) */}
          <path
            d="M80 65 Q95 72 110 65 Q125 58 135 68"
            stroke="#93C5FD"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M60 115 Q80 122 105 118 Q125 114 140 125"
            stroke="#BFDBFE"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />

          {/* 3. THREE BLUE & WHITE CURVED RECYCLING ARROWS */}

          {/* --- ARROW 1: TOP RIGHT (REDUCE) --- */}
          <g id="arrow-reduce">
            <path
              d="M 64 28 C 96 14, 145 20, 168 52 L 150 65 C 132 38, 92 34, 64 45 Z"
              fill="url(#arrowGrad)"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <polygon
              points="140,48 178,56 160,88 152,70 142,66"
              fill="url(#arrowGrad)"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <text
              x="122"
              y="37"
              fill="#FFFFFF"
              fontSize="12.5"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="middle"
              transform="rotate(18, 122, 37)"
              letterSpacing="0.5"
            >
              Reduce
            </text>
          </g>

          {/* --- ARROW 2: BOTTOM RIGHT (RECYCLE) --- */}
          <g id="arrow-recycle">
            <path
              d="M 172 125 C 160 156, 124 182, 88 182 L 88 162 C 114 162, 142 142, 152 118 Z"
              fill="url(#arrowGrad)"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <polygon
              points="102,185 64,178 76,144 84,158 96,160"
              fill="url(#arrowGrad)"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <text
              x="130"
              y="172"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="middle"
              transform="rotate(-2, 130, 172)"
              letterSpacing="0.5"
            >
              Recycle
            </text>
          </g>

          {/* --- ARROW 3: LEFT (REUSE) --- */}
          <g id="arrow-reuse">
            <path
              d="M 52 165 C 24 140, 18 90, 42 54 L 58 66 C 40 94, 44 130, 66 150 Z"
              fill="url(#arrowGrad)"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <polygon
              points="45,74 46,36 82,48 68,56 64,68"
              fill="url(#arrowGrad)"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <text
              x="30"
              y="114"
              fill="#FFFFFF"
              fontSize="12.5"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="middle"
              transform="rotate(-68, 30, 114)"
              letterSpacing="0.5"
            >
              Reuse
            </text>
          </g>

          {/* Central shine highlight */}
          <ellipse cx="80" cy="55" rx="30" ry="14" fill="#FFFFFF" opacity="0.25" transform="rotate(-25, 80, 55)" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-black tracking-tight text-blue-950 font-sans">
              KABADI<span className="text-blue-600">2</span>RECYCLE
            </span>
            <span className="bg-blue-600 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
              Govt MPCB
            </span>
          </div>
          <span className="text-[11px] font-semibold text-blue-800/70 tracking-tight mt-0.5">
            E-Waste Circular Network
          </span>
        </div>
      )}
    </div>
  );
};
