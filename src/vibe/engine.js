/** ZenithFlow – Vibe Engine (Dynamic Color Theming) */
import { subscribe, getState } from '../store.js';

/**
 * 5 progress tiers with smooth interpolation.
 * Each tier defines CSS custom property overrides.
 */
const TIERS = [
  { // 0-20%: Novice – Deep Navy
    min: 0, max: 20, name: 'Novice',
    bgPrimary: [6, 9, 24],
    bgSecondary: [10, 14, 39],
    accentH: 224, accentS: 90, accentL: 63,
    accentRgb: '74, 124, 247',
    particleColor: [74, 124, 247],
    particleCount: 30,
  },
  { // 20-40%: Learner – Midnight Teal
    min: 20, max: 40, name: 'Learner',
    bgPrimary: [8, 18, 30],
    bgSecondary: [13, 33, 55],
    accentH: 164, accentS: 85, accentL: 52,
    accentRgb: '0, 212, 170',
    particleColor: [0, 212, 170],
    particleCount: 40,
  },
  { // 40-60%: Practitioner – Deep Forest
    min: 40, max: 60, name: 'Practitioner',
    bgPrimary: [8, 22, 14],
    bgSecondary: [13, 42, 26],
    accentH: 145, accentS: 70, accentL: 55,
    accentRgb: '46, 204, 113',
    particleColor: [46, 204, 113],
    particleCount: 50,
  },
  { // 60-80%: Adept – Dark Amber
    min: 60, max: 80, name: 'Adept',
    bgPrimary: [22, 16, 7],
    bgSecondary: [42, 31, 13],
    accentH: 36, accentS: 90, accentL: 53,
    accentRgb: '243, 156, 18',
    particleColor: [243, 156, 18],
    particleCount: 60,
  },
  { // 80-100%: Master – Electric Gold
    min: 80, max: 100, name: 'Master',
    bgPrimary: [20, 16, 4],
    bgSecondary: [36, 28, 8],
    accentH: 45, accentS: 88, accentL: 60,
    accentRgb: '240, 192, 64',
    particleColor: [240, 192, 64],
    particleCount: 75,
  },
];

function lerp(a, b, t) { return a + (b - a) * t; }
function lerpColor(c1, c2, t) {
  return c1.map((v, i) => Math.round(lerp(v, c2[i], t)));
}

/** Get interpolated tier values for a given progress percentage */
function getVibeValues(progress) {
  const p = Math.max(0, Math.min(100, progress));

  // Find the two tiers to interpolate between
  let lower = TIERS[0];
  let upper = TIERS[0];

  for (let i = 0; i < TIERS.length; i++) {
    if (p >= TIERS[i].min) {
      lower = TIERS[i];
      upper = TIERS[Math.min(i + 1, TIERS.length - 1)];
    }
  }

  if (lower === upper) {
    return { ...lower };
  }

  const range = upper.min - lower.min;
  const t = range > 0 ? (p - lower.min) / range : 0;

  return {
    name: t > 0.5 ? upper.name : lower.name,
    bgPrimary: lerpColor(lower.bgPrimary, upper.bgPrimary, t),
    bgSecondary: lerpColor(lower.bgSecondary, upper.bgSecondary, t),
    accentH: Math.round(lerp(lower.accentH, upper.accentH, t)),
    accentS: Math.round(lerp(lower.accentS, upper.accentS, t)),
    accentL: Math.round(lerp(lower.accentL, upper.accentL, t)),
    accentRgb: lerpColor(lower.particleColor, upper.particleColor, t).join(', '),
    particleColor: lerpColor(lower.particleColor, upper.particleColor, t),
    particleCount: Math.round(lerp(lower.particleCount, upper.particleCount, t)),
  };
}

/** Apply vibe values to CSS custom properties */
function applyVibe(values) {
  const root = document.documentElement.style;
  const [r1, g1, b1] = values.bgPrimary;
  const [r2, g2, b2] = values.bgSecondary;

  root.setProperty('--bg-primary', `rgb(${r1}, ${g1}, ${b1})`);
  root.setProperty('--bg-secondary', `rgb(${r2}, ${g2}, ${b2})`);
  root.setProperty('--accent-h', values.accentH);
  root.setProperty('--accent-s', values.accentS + '%');
  root.setProperty('--accent-l', values.accentL + '%');
  root.setProperty('--accent-rgb', values.accentRgb);
}

/** Current vibe values (used by particle system) */
let currentVibe = getVibeValues(0);

export function getCurrentVibe() { return currentVibe; }
export function getTierName(progress) { return getVibeValues(progress).name; }

/** Initialize the vibe engine and subscribe to state changes */
export function initVibeEngine() {
  // Apply initial vibe
  const state = getState();
  currentVibe = getVibeValues(state.progress);
  applyVibe(currentVibe);

  // Subscribe to progress changes
  subscribe((newState) => {
    currentVibe = getVibeValues(newState.progress);
    applyVibe(currentVibe);
  });
}
