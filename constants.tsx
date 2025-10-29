import type { ElementInfo, ElementType } from './types';

export const TASK_HP_MULTIPLIER = 25; // 25 minutes per effort point

export const ELEMENTS: Record<ElementType, ElementInfo> = {
  'Creative': {
    name: 'Creative',
    emoji: '🔥',
    colors: 'Deep amber, coral, gold',
    motion: 'Bursting, expanding particles',
    effect: 'Erupts into sparks that scatter, leaving an ember glow',
    color: 'var(--elem-fire)',
  },
  'Administrative': {
    name: 'Administrative',
    emoji: '💧',
    colors: 'Indigo, turquoise, deep blue',
    motion: 'Flowing ribbons, slow ripples',
    effect: 'Surface undulates like water, creating a ripple that spreads',
    color: 'var(--elem-water)',
  },
  'Maintenance': {
    name: 'Maintenance',
    emoji: '🌿',
    colors: 'Olive, jade, cream',
    motion: 'Growth, swelling, fractal vines',
    effect: 'Faint leaf vein patterns grow and fade into texture',
    color: 'var(--elem-earth)',
  },
  'Quick Wins': {
    name: 'Quick Wins',
    emoji: '⚡',
    colors: 'Electric cyan, violet, magenta',
    motion: 'Streaks, pulses, high velocity',
    effect: 'Static arcs trace edges, dissolves with a quick flash',
    color: 'var(--elem-air)',
  },
  'Emotional': {
    name: 'Emotional',
    emoji: '🪶',
    colors: 'Soft pink, lavender, white',
    motion: 'Floating motes, slow rotations',
    effect: 'Aura shimmer follows pointer like incense smoke, dissolves into light dust',
    color: 'var(--elem-spirit)',
  },
};

export const ARTISTIC_COLORS = [
    { name: 'Fire', hex: '#FF6A3D' },
    { name: 'Water', hex: '#2FD3FF' },
    { name: 'Earth', hex: '#6BCB77' },
    { name: 'Air', hex: '#8A7DFF' },
    { name: 'Spirit', hex: '#F7A6FF' },
    { name: 'Accent', hex: '#3DE0FF' },
];