'use client';

import styles from './BadgeIcon.module.css';

interface BadgeIconProps {
  variant?: number;
  size?: number;
  animate?: boolean;
}

const OLIVE = '#6B7A5A';
const OLIVE_LIGHT = '#8A9970';
const OLIVE_PALE = '#E8EDE0';
const SAND = '#F5F0E8';

export function BadgeIcon({ variant = 0, size = 72, animate = true }: BadgeIconProps) {
  const v = ((variant % 7) + 7) % 7;
  const base = {
    width: size,
    height: size,
  };

  switch (v) {
    case 0:
      return (
        <svg {...base} viewBox="0 0 72 72" fill="none" className={animate ? styles.flourish : undefined}>
          <circle cx="36" cy="36" r="36" fill={OLIVE_PALE} />
          <path d="M36 54V30" stroke={OLIVE} strokeWidth="2.5" strokeLinecap="round" />
          <g className={animate ? styles.leafL : undefined}>
            <path d="M36 42 C36 42 25 38 21 27 C27 25 38 30 38 40" fill={OLIVE} opacity="0.85" />
          </g>
          <g className={animate ? styles.leafR : undefined}>
            <path d="M36 35 C36 35 45 31 51 21 C45 19 35 25 35 35" fill={OLIVE_LIGHT} opacity="0.8" />
          </g>
        </svg>
      );
    case 1:
      return (
        <svg {...base} viewBox="0 0 72 72" fill="none" className={animate ? styles.spin : undefined}>
          <circle cx="36" cy="36" r="36" fill={OLIVE_PALE} />
          <g>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <ellipse
                key={i}
                cx="36"
                cy="20"
                rx="3.5"
                ry="7"
                fill={OLIVE_LIGHT}
                opacity="0.7"
                transform={`rotate(${deg} 36 36)`}
              />
            ))}
          </g>
          <circle cx="36" cy="36" r="10" fill={OLIVE} />
          <circle cx="36" cy="36" r="6" fill={OLIVE_PALE} opacity="0.5" />
        </svg>
      );
    case 2:
      return (
        <svg {...base} viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="36" fill={OLIVE_PALE} />
          <g className={animate ? styles.pulse : undefined}>
            <path d="M36 16 C36 16 52 28 52 40 C52 49 44.8 56 36 56 C27.2 56 20 49 20 40 C20 28 36 16 36 16Z" fill={OLIVE} opacity="0.9" />
            <path d="M36 26 C36 26 45 33 45 40 C45 44.4 40.97 48 36 48 C31.03 48 27 44.4 27 40 C27 33 36 26 36 26Z" fill={SAND} opacity="0.4" />
          </g>
        </svg>
      );
    case 3:
      return (
        <svg {...base} viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="36" fill={OLIVE_PALE} />
          <g className={animate ? styles.sway : undefined}>
            <path d="M36 54 L36 32" stroke={OLIVE} strokeWidth="3" strokeLinecap="round" />
            <path d="M36 44 C36 44 26 40 22 32 C28 29 36 36 36 44" fill={OLIVE} opacity="0.85" />
            <path d="M36 38 C36 38 46 34 50 26 C44 23 36 30 36 38" fill={OLIVE_LIGHT} opacity="0.8" />
            <path d="M36 32 C36 32 30 27 28 20 C33 18 38 24 36 32" fill={OLIVE} opacity="0.6" />
          </g>
        </svg>
      );
    case 4:
      return (
        <svg {...base} viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="36" fill={OLIVE_PALE} />
          <g className={animate ? styles.wiggle : undefined}>
            <path d="M36 52 C20 52 16 36 24 24 C28 18 36 16 44 20 C52 24 56 36 52 44 C48 50 42 52 36 52Z" fill={OLIVE} opacity="0.85" />
            <path d="M36 52 L36 20" stroke={SAND} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M36 44 C30 40 26 32 28 26" stroke={SAND} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
            <path d="M36 36 C42 32 46 26 44 20" stroke={SAND} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          </g>
        </svg>
      );
    case 5:
      return (
        <svg {...base} viewBox="0 0 72 72" fill="none" className={animate ? styles.spinSlow : undefined}>
          <circle cx="36" cy="36" r="36" fill={OLIVE_PALE} />
          {[0, 60, 120].map((deg, i) => (
            <line
              key={i}
              x1="36"
              y1="16"
              x2="36"
              y2="56"
              stroke={OLIVE}
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${deg} 36 36)`}
            />
          ))}
          {[0, 60, 120].map((deg, i) => (
            <g key={`b${i}`} transform={`rotate(${deg} 36 36)`}>
              <line x1="28" y1="22" x2="36" y2="28" stroke={OLIVE_LIGHT} strokeWidth="1.8" strokeLinecap="round" />
              <line x1="44" y1="22" x2="36" y2="28" stroke={OLIVE_LIGHT} strokeWidth="1.8" strokeLinecap="round" />
              <line x1="28" y1="50" x2="36" y2="44" stroke={OLIVE_LIGHT} strokeWidth="1.8" strokeLinecap="round" />
              <line x1="44" y1="50" x2="36" y2="44" stroke={OLIVE_LIGHT} strokeWidth="1.8" strokeLinecap="round" />
            </g>
          ))}
          <circle cx="36" cy="36" r="4" fill={OLIVE} />
        </svg>
      );
    case 6:
    default:
      return (
        <svg {...base} viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="36" fill={OLIVE_PALE} />
          <g className={animate ? styles.pulseSlow : undefined}>
            <path d="M36 52 L36 28" stroke={OLIVE} strokeWidth="3" strokeLinecap="round" />
            <path d="M36 52 C36 52 26 50 22 56" stroke={OLIVE} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <path d="M36 52 C36 52 46 50 50 56" stroke={OLIVE} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <path d="M36 52 C36 52 30 56 28 62" stroke={OLIVE_LIGHT} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <path d="M36 52 C36 52 42 56 44 62" stroke={OLIVE_LIGHT} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          </g>
          <g className={animate ? styles.leafL : undefined}>
            <path d="M36 30 C36 30 26 26 22 16 C28 13 37 20 36 30" fill={OLIVE} opacity="0.85" />
          </g>
          <g className={animate ? styles.leafR : undefined}>
            <path d="M36 28 C36 28 46 24 50 14 C44 11 35 18 36 28" fill={OLIVE_LIGHT} opacity="0.8" />
          </g>
        </svg>
      );
  }
}
