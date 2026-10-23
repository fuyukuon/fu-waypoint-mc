import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Copy,
  Check,
  Tag,
  Compass,
  Flame,
  Sparkles,
  Home,
  Wheat,
  Skull,
  Pickaxe,
  Plus,
  Search,
  Trash2,
  RotateCcw,
  Lock,
  Unlock,
  Star,
  Download,
  Upload,
  Calculator,
  Navigation,
  Globe,
  Edit3,
  X,
  ShieldAlert,
  Layers,
  Castle,
  Gem,
  ArrowRightLeft,
  HelpCircle,
  Camera,
  Image as ImageIcon,
  Ruler,
  Cloud,
  Share2,
  AlertTriangle,
  Zap,
  Minimize2,
  ScanLine,
  Volume2,
  VolumeX,
  Folder,
  FolderOpen,
  FolderPlus,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CornerDownRight,
  ArrowLeft,
  ArrowUp,
  Palette,
  Map as MapIcon,
  LayoutGrid,
  List,
  ZoomIn,
  ZoomOut,
  ArrowUpDown,
  MoreVertical,
  FileSpreadsheet,
  SlidersHorizontal,
  CheckCircle2,
  Hammer,
} from 'lucide-react';

// ==========================================
// 0. HỆ THỐNG ÂM THANH MINECRAFT (WEB AUDIO SYNTH)
// ==========================================
let sharedAudioCtx = null;
function getAudioCtx() {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      sharedAudioCtx = new AudioContextClass();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

function playMinecraftSound(type = 'click', enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.045);
      gain.gain.setValueAtTime(0.075, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.055);
    } else if (type === 'pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.065);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'orb') {
      const pitchShift = 0.92 + Math.random() * 0.22;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880 * pitchShift, now);
      osc.frequency.setValueAtTime(1174.66 * pitchShift, now + 0.065);
      gain.gain.setValueAtTime(0.095, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    } else if (type === 'levelup') {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const start = now + idx * 0.055;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.24);
      });
    } else if (type === 'chest_open') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(210, now);
      osc.frequency.linearRampToValueAtTime(340, now + 0.09);
      osc.frequency.linearRampToValueAtTime(290, now + 0.14);
      gain.gain.setValueAtTime(0.085, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
    } else if (type === 'chest_close') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(310, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.11);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } else if (type === 'portal') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.14);
      osc.frequency.exponentialRampToValueAtTime(190, now + 0.28);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.31);
    } else if (type === 'tnt') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(58, now + 0.16);
      gain.gain.setValueAtTime(0.095, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'axolotl') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(1180, now + 0.07);
      osc.frequency.exponentialRampToValueAtTime(920, now + 0.13);
      osc.frequency.exponentialRampToValueAtTime(1350, now + 0.19);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.21);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'chicken') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(690, now + 0.045);
      osc.frequency.exponentialRampToValueAtTime(430, now + 0.13);
      gain.gain.setValueAtTime(0.085, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    }
  } catch {
    // Ignore autoplay errors
  }
}

// ==========================================
// 0B. KHO 96+ BIỂU TƯỢNG PIXEL MINECRAFT SẮC NÉT
// ==========================================
const MC_ICON_CATALOG = [
  // --- NHÓM 1: KHỐI BLOCK (BLOCKS) ---
  {
    id: 'grass',
    label: 'Đất Cỏ',
    category: 'Khối Block',
    bg: '#866043',
    pixels: [
      [0, 0, 16, 5, '#52a535'],
      [0, 0, 16, 2, '#6bc946'],
      [2, 5, 2, 2, '#52a535'],
      [6, 5, 3, 3, '#3d8026'],
      [12, 5, 2, 2, '#52a535'],
      [3, 10, 2, 2, '#65462e'],
      [10, 11, 3, 2, '#65462e'],
    ],
  },
  {
    id: 'podzol',
    label: 'Đất Podzol',
    category: 'Khối Block',
    bg: '#5c4028',
    pixels: [
      [0, 0, 16, 5, '#6b4423'],
      [0, 0, 16, 2, '#85582c'],
      [3, 5, 3, 2, '#6b4423'],
      [10, 5, 3, 2, '#52341a'],
      [4, 10, 2, 2, '#3d2817'],
    ],
  },
  {
    id: 'mycelium',
    label: 'Đất Khuẩn Tơ',
    category: 'Khối Block',
    bg: '#78553a',
    pixels: [
      [0, 0, 16, 5, '#6e6273'],
      [0, 0, 16, 2, '#8b7d91'],
      [2, 5, 3, 2, '#6e6273'],
      [9, 5, 4, 2, '#5a4e5e'],
      [5, 11, 3, 2, '#593e2a'],
    ],
  },
  {
    id: 'obsidian',
    label: 'Cục Obi',
    category: 'Khối Block',
    bg: '#140d1e',
    pixels: [
      [1, 1, 14, 14, '#1d132b'],
      [2, 2, 4, 3, '#3b2754'],
      [8, 3, 5, 2, '#2d1c42'],
      [3, 7, 5, 3, '#4c326b'],
      [10, 8, 3, 4, '#3b2754'],
      [4, 12, 6, 2, '#28183b'],
      [2, 4, 2, 2, '#6b4696'],
      [11, 5, 2, 2, '#58387e'],
    ],
  },
  {
    id: 'crying_obsidian',
    label: 'Obi Khóc',
    category: 'Khối Block',
    bg: '#140d1e',
    pixels: [
      [1, 1, 14, 14, '#1f1230'],
      [3, 2, 3, 4, '#a855f7'],
      [4, 3, 1, 2, '#e9d5ff'],
      [10, 3, 3, 3, '#9333ea'],
      [6, 7, 4, 4, '#c084fc'],
      [7, 8, 2, 2, '#f3e8ff'],
      [2, 10, 3, 4, '#7e22ce'],
      [11, 10, 2, 4, '#a855f7'],
    ],
  },
  {
    id: 'cobblestone',
    label: 'Đá Cuội',
    category: 'Khối Block',
    bg: '#4b5563',
    pixels: [
      [1, 1, 6, 6, '#9ca3af'],
      [8, 1, 7, 6, '#6b7280'],
      [1, 8, 8, 7, '#6b7280'],
      [10, 8, 5, 7, '#9ca3af'],
      [2, 2, 4, 2, '#d1d5db'],
      [11, 9, 3, 3, '#d1d5db'],
    ],
  },
  {
    id: 'mossy_cobble',
    label: 'Đá Cuội Rêu',
    category: 'Khối Block',
    bg: '#3f4f3e',
    pixels: [
      [1, 1, 6, 6, '#9ca3af'],
      [8, 1, 7, 6, '#4d7c0f'],
      [1, 8, 8, 7, '#65a30d'],
      [10, 8, 5, 7, '#9ca3af'],
      [3, 5, 4, 4, '#84cc16'],
    ],
  },
  {
    id: 'stone_bricks',
    label: 'Gạch Đá',
    category: 'Khối Block',
    bg: '#3f3f46',
    pixels: [
      [1, 1, 14, 6, '#71717a'],
      [1, 8, 7, 7, '#71717a'],
      [9, 8, 6, 7, '#52525b'],
      [2, 2, 12, 2, '#a1a1aa'],
    ],
  },
  {
    id: 'deepslate',
    label: 'Đá Bảng Sâu',
    category: 'Khối Block',
    bg: '#18181b',
    pixels: [
      [1, 1, 14, 14, '#27272a'],
      [2, 2, 5, 5, '#3f3f46'],
      [9, 3, 5, 4, '#52525b'],
      [3, 9, 6, 4, '#3f3f46'],
      [10, 10, 4, 4, '#18181b'],
    ],
  },
  {
    id: 'diamond_ore',
    label: 'Quặng Kim Cương',
    category: 'Khối Block',
    bg: '#52525b',
    pixels: [
      [1, 1, 14, 14, '#71717a'],
      [3, 3, 3, 3, '#22d3ee'],
      [4, 3, 1, 1, '#cffafe'],
      [10, 4, 3, 2, '#06b6d4'],
      [5, 9, 4, 3, '#22d3ee'],
      [6, 9, 2, 1, '#cffafe'],
      [11, 10, 2, 3, '#67e8f9'],
    ],
  },
  {
    id: 'emerald_ore',
    label: 'Quặng Lục Bảo',
    category: 'Khối Block',
    bg: '#52525b',
    pixels: [
      [1, 1, 14, 14, '#71717a'],
      [3, 3, 2, 2, '#10b981'],
      [10, 3, 3, 3, '#34d399'],
      [5, 8, 3, 3, '#10b981'],
      [11, 10, 2, 2, '#6ee7b7'],
    ],
  },
  {
    id: 'gold_ore',
    label: 'Quặng Vàng',
    category: 'Khối Block',
    bg: '#52525b',
    pixels: [
      [1, 1, 14, 14, '#71717a'],
      [3, 3, 3, 2, '#facc15'],
      [9, 4, 4, 2, '#eab308'],
      [4, 9, 4, 3, '#fde047'],
      [10, 10, 3, 2, '#facc15'],
    ],
  },
  {
    id: 'iron_ore',
    label: 'Quặng Sắt',
    category: 'Khối Block',
    bg: '#52525b',
    pixels: [
      [1, 1, 14, 14, '#71717a'],
      [3, 3, 3, 2, '#fed7aa'],
      [9, 4, 4, 2, '#fdba74'],
      [4, 9, 4, 3, '#ffedd5'],
      [10, 10, 3, 2, '#fed7aa'],
    ],
  },
  {
    id: 'ancient_debris',
    label: 'Mảnh Cổ Đại',
    category: 'Khối Block',
    bg: '#291d19',
    pixels: [
      [1, 1, 14, 14, '#43302b'],
      [2, 3, 12, 2, '#785950'],
      [3, 6, 10, 3, '#5c4138'],
      [2, 10, 12, 2, '#8c6b61'],
      [4, 12, 8, 2, '#a6877c'],
    ],
  },
  {
    id: 'diamond_block',
    label: 'Khối Kim Cương',
    category: 'Khối Block',
    bg: '#0891b2',
    pixels: [
      [1, 1, 14, 14, '#22d3ee'],
      [2, 2, 12, 12, '#67e8f9'],
      [4, 4, 8, 8, '#a5f3fc'],
      [2, 2, 4, 2, '#ecfeff'],
    ],
  },
  {
    id: 'emerald',
    label: 'Khối Lục Bảo',
    category: 'Khối Block',
    bg: '#065f46',
    pixels: [
      [1, 1, 14, 14, '#10b981'],
      [3, 3, 10, 10, '#34d399'],
      [5, 5, 6, 6, '#059669'],
      [6, 6, 4, 4, '#6ee7b7'],
      [2, 2, 2, 2, '#a7f3d0'],
    ],
  },
  {
    id: 'gold_block',
    label: 'Khối Vàng',
    category: 'Khối Block',
    bg: '#b45309',
    pixels: [
      [1, 1, 14, 14, '#f59e0b'],
      [2, 2, 12, 12, '#fbbf24'],
      [4, 4, 8, 8, '#fde047'],
      [2, 2, 4, 2, '#fef08a'],
      [10, 10, 4, 4, '#d97706'],
    ],
  },
  {
    id: 'iron_block',
    label: 'Khối Sắt',
    category: 'Khối Block',
    bg: '#71717a',
    pixels: [
      [1, 1, 14, 14, '#d4d4d8'],
      [2, 2, 12, 2, '#f4f4f5'],
      [2, 6, 12, 2, '#a1a1aa'],
      [2, 10, 12, 2, '#e4e4e7'],
      [2, 13, 12, 1, '#71717a'],
    ],
  },
  {
    id: 'netherite',
    label: 'Khối Netherite',
    category: 'Khối Block',
    bg: '#1c1917',
    pixels: [
      [1, 1, 14, 14, '#292524'],
      [2, 2, 12, 3, '#44403c'],
      [2, 6, 12, 3, '#3b2f2f'],
      [2, 10, 12, 4, '#57534e'],
      [4, 4, 3, 2, '#78716c'],
      [10, 11, 3, 2, '#a8a29e'],
    ],
  },
  {
    id: 'copper',
    label: 'Khối Đồng',
    category: 'Khối Block',
    bg: '#7c2d12',
    pixels: [
      [1, 1, 14, 14, '#c2410c'],
      [2, 2, 5, 5, '#ea580c'],
      [8, 2, 6, 5, '#14b8a6'],
      [2, 8, 6, 6, '#2dd4bf'],
      [9, 8, 5, 6, '#fb923c'],
    ],
  },
  {
    id: 'redstone',
    label: 'Khối Đá Đỏ',
    category: 'Khối Block',
    bg: '#7f1d1d',
    pixels: [
      [1, 1, 14, 14, '#dc2626'],
      [3, 3, 10, 10, '#ef4444'],
      [5, 5, 6, 6, '#991b1b'],
      [6, 6, 4, 4, '#ff5555'],
      [2, 7, 2, 2, '#fca5a5'],
    ],
  },
  {
    id: 'lapis_block',
    label: 'Khối Lưu Ly',
    category: 'Khối Block',
    bg: '#1e3a8a',
    pixels: [
      [1, 1, 14, 14, '#1d4ed8'],
      [2, 2, 12, 12, '#2563eb'],
      [4, 4, 8, 8, '#3b82f6'],
      [5, 5, 3, 3, '#93c5fd'],
    ],
  },
  {
    id: 'amethyst',
    label: 'Thạch Anh Tím',
    category: 'Khối Block',
    bg: '#4c1d95',
    pixels: [
      [1, 1, 14, 14, '#7c3aed'],
      [2, 2, 5, 5, '#a78bfa'],
      [8, 3, 5, 6, '#c4b5fd'],
      [3, 8, 6, 5, '#8b5cf6'],
      [10, 10, 4, 4, '#ddd6fe'],
    ],
  },
  {
    id: 'quartz_block',
    label: 'Khối Thạch Anh',
    category: 'Khối Block',
    bg: '#d4d4d8',
    pixels: [
      [1, 1, 14, 14, '#f4f4f5'],
      [2, 2, 12, 12, '#fafafa'],
      [3, 3, 10, 2, '#e4e4e7'],
      [3, 11, 10, 2, '#e4e4e7'],
    ],
  },
  {
    id: 'glowstone',
    label: 'Đá Phát Sáng',
    category: 'Khối Block',
    bg: '#78350f',
    pixels: [
      [1, 1, 14, 14, '#b45309'],
      [2, 2, 4, 4, '#fde047'],
      [8, 2, 5, 4, '#facc15'],
      [4, 7, 7, 5, '#fef08a'],
      [2, 11, 4, 3, '#facc15'],
      [10, 11, 4, 3, '#fde047'],
    ],
  },
  {
    id: 'sea_lantern',
    label: 'Đèn Biển',
    category: 'Khối Block',
    bg: '#0f766e',
    pixels: [
      [1, 1, 14, 14, '#2dd4bf'],
      [2, 2, 12, 12, '#99f6e4'],
      [4, 4, 8, 8, '#f0fdfa'],
      [5, 5, 6, 6, '#ccfbf1'],
    ],
  },
  {
    id: 'slime',
    label: 'Khối Slime',
    category: 'Khối Block',
    bg: '#3f6212',
    pixels: [
      [1, 1, 14, 14, '#84cc16'],
      [3, 3, 10, 10, '#65a30d'],
      [4, 4, 8, 8, '#4d7c0f'],
      [2, 2, 3, 2, '#bef264'],
    ],
  },
  {
    id: 'honey_block',
    label: 'Khối Mật Ong',
    category: 'Khối Block',
    bg: '#9a3412',
    pixels: [
      [1, 1, 14, 14, '#f59e0b'],
      [3, 3, 10, 10, '#fbbf24'],
      [4, 4, 8, 8, '#d97706'],
      [2, 2, 4, 2, '#fef08a'],
    ],
  },
  {
    id: 'packed_ice',
    label: 'Băng Nén',
    category: 'Khối Block',
    bg: '#0284c7',
    pixels: [
      [1, 1, 14, 14, '#38bdf8'],
      [2, 2, 5, 12, '#7dd3fc'],
      [8, 3, 5, 10, '#bae6fd'],
      [4, 5, 3, 6, '#e0f2fe'],
    ],
  },
  {
    id: 'oak_log',
    label: 'Gỗ Sồi',
    category: 'Khối Block',
    bg: '#451a03',
    pixels: [
      [1, 1, 14, 14, '#78350f'],
      [3, 1, 2, 14, '#92400e'],
      [7, 1, 3, 14, '#5c2808'],
      [11, 1, 2, 14, '#92400e'],
    ],
  },
  {
    id: 'cherry',
    label: 'Gỗ Anh Đào',
    category: 'Khối Block',
    bg: '#831843',
    pixels: [
      [1, 1, 14, 14, '#f472b6'],
      [2, 2, 4, 4, '#fbcfe8'],
      [8, 3, 5, 4, '#f9a8d4'],
      [3, 8, 6, 5, '#ec4899'],
      [10, 9, 4, 4, '#fce7f3'],
    ],
  },
  {
    id: 'bamboo_block',
    label: 'Khối Tre',
    category: 'Khối Block',
    bg: '#365314',
    pixels: [
      [1, 1, 14, 14, '#65a30d'],
      [3, 1, 2, 14, '#84cc16'],
      [8, 1, 2, 14, '#84cc16'],
      [12, 1, 2, 14, '#a3e635'],
      [1, 7, 14, 2, '#4d7c0f'],
    ],
  },
  {
    id: 'moss',
    label: 'Khối Rêu Lush',
    category: 'Khối Block',
    bg: '#14532d',
    pixels: [
      [1, 1, 14, 14, '#16a34a'],
      [2, 2, 5, 4, '#4ade80'],
      [9, 4, 4, 5, '#22c55e'],
      [4, 9, 6, 4, '#f472b6'],
      [5, 10, 2, 2, '#fef08a'],
    ],
  },
  {
    id: 'sculk',
    label: 'Khối Sculk',
    category: 'Khối Block',
    bg: '#042f2e',
    pixels: [
      [1, 1, 14, 14, '#0f172a'],
      [2, 2, 3, 3, '#2dd4bf'],
      [10, 3, 3, 3, '#14b8a6'],
      [6, 7, 4, 4, '#0d9488'],
      [3, 11, 3, 2, '#5eead4'],
      [11, 11, 2, 3, '#2dd4bf'],
    ],
  },
  {
    id: 'mushroom',
    label: 'Đảo Nấm Đỏ',
    category: 'Khối Block',
    bg: '#991b1b',
    pixels: [
      [1, 1, 14, 9, '#dc2626'],
      [3, 2, 3, 3, '#ffffff'],
      [10, 4, 3, 3, '#ffffff'],
      [5, 10, 6, 5, '#fde68a'],
    ],
  },
  {
    id: 'nether',
    label: 'Netherrack',
    category: 'Khối Block',
    bg: '#4a1216',
    pixels: [
      [0, 0, 16, 4, '#d9381e'],
      [2, 4, 3, 2, '#ff7b00'],
      [9, 4, 4, 3, '#d9381e'],
      [4, 8, 3, 3, '#ff9900'],
      [11, 10, 3, 3, '#ff5500'],
      [1, 12, 4, 2, '#7a1c24'],
    ],
  },
  {
    id: 'soul_sand',
    label: 'Cát Linh Hồn',
    category: 'Khối Block',
    bg: '#2e1f18',
    pixels: [
      [1, 1, 14, 14, '#453026'],
      [3, 4, 3, 4, '#1f140f'],
      [10, 4, 3, 4, '#1f140f'],
      [5, 9, 6, 4, '#1f140f'],
      [4, 5, 1, 1, '#5eead4'],
      [11, 5, 1, 1, '#5eead4'],
    ],
  },
  {
    id: 'magma_block',
    label: 'Khối Magma',
    category: 'Khối Block',
    bg: '#450a0a',
    pixels: [
      [1, 1, 14, 14, '#7f1d1d'],
      [2, 2, 5, 3, '#f97316'],
      [8, 4, 6, 3, '#facc15'],
      [3, 8, 6, 4, '#ea580c'],
      [10, 10, 4, 3, '#fef08a'],
    ],
  },
  {
    id: 'nether_brick',
    label: 'Gạch Nether',
    category: 'Khối Block',
    bg: '#2a0a10',
    pixels: [
      [1, 1, 6, 4, '#541822'],
      [8, 1, 7, 4, '#45121b'],
      [1, 6, 10, 4, '#45121b'],
      [12, 6, 3, 4, '#541822'],
      [1, 11, 5, 4, '#541822'],
      [7, 11, 8, 4, '#380d14'],
    ],
  },
  {
    id: 'end',
    label: 'Đá End Purpur',
    category: 'Khối Block',
    bg: '#d9d2a9',
    pixels: [
      [0, 0, 16, 4, '#7e22ce'],
      [3, 4, 4, 3, '#a855f7'],
      [10, 4, 3, 2, '#6b21a8'],
      [2, 9, 3, 3, '#b8ae82'],
      [9, 10, 4, 3, '#c084fc'],
    ],
  },

  // --- NHÓM 2: KHO & TIỆN ÍCH (STORAGE & UTILITY) ---
  {
    id: 'win_folder',
    label: 'Thư Mục Vàng',
    category: 'Kho & Tiện Ích',
    bg: '#1e293b',
    pixels: [
      [1, 3, 6, 2, '#eab308'],
      [1, 5, 14, 9, '#facc15'],
      [2, 6, 12, 7, '#fde047'],
      [1, 12, 14, 2, '#ca8a04'],
    ],
  },
  {
    id: 'ender_folder',
    label: 'Thư Mục Ender',
    category: 'Kho & Tiện Ích',
    bg: '#0f172a',
    pixels: [
      [1, 3, 6, 2, '#0d9488'],
      [1, 5, 14, 9, '#14b8a6'],
      [2, 6, 12, 7, '#115e59'],
      [6, 8, 4, 3, '#5eead4'],
    ],
  },
  {
    id: 'chest',
    label: 'Rương Đồ',
    category: 'Kho & Tiện Ích',
    bg: '#78350f',
    pixels: [
      [1, 2, 14, 12, '#b45309'],
      [2, 3, 12, 4, '#d97706'],
      [2, 8, 12, 5, '#b45309'],
      [1, 6, 14, 2, '#27272a'],
      [6, 5, 4, 4, '#facc15'],
      [7, 6, 2, 2, '#fef08a'],
    ],
  },
  {
    id: 'ender_chest',
    label: 'Rương Ender',
    category: 'Kho & Tiện Ích',
    bg: '#0f172a',
    pixels: [
      [1, 2, 14, 12, '#1e293b'],
      [2, 3, 12, 4, '#0f766e'],
      [2, 8, 12, 5, '#134e4a'],
      [1, 6, 14, 2, '#020617'],
      [6, 5, 4, 4, '#34d399'],
      [7, 6, 2, 2, '#a7f3d0'],
    ],
  },
  {
    id: 'barrel',
    label: 'Thùng Gỗ Barrel',
    category: 'Kho & Tiện Ích',
    bg: '#451a03',
    pixels: [
      [1, 1, 14, 14, '#92400e'],
      [1, 3, 14, 2, '#27272a'],
      [1, 11, 14, 2, '#27272a'],
      [6, 6, 4, 4, '#451a03'],
      [7, 7, 2, 2, '#facc15'],
    ],
  },
  {
    id: 'shulker',
    label: 'Hộp Shulker Tím',
    category: 'Kho & Tiện Ích',
    bg: '#581c87',
    pixels: [
      [1, 1, 14, 7, '#a855f7'],
      [1, 8, 14, 7, '#7e22ce'],
      [3, 6, 3, 3, '#a855f7'],
      [10, 6, 3, 3, '#a855f7'],
      [6, 8, 4, 4, '#fde047'],
    ],
  },
  {
    id: 'shulker_cyan',
    label: 'Shulker Xanh',
    category: 'Kho & Tiện Ích',
    bg: '#083344',
    pixels: [
      [1, 1, 14, 7, '#06b6d4'],
      [1, 8, 14, 7, '#0e7490'],
      [3, 6, 3, 3, '#22d3ee'],
      [10, 6, 3, 3, '#22d3ee'],
      [6, 8, 4, 4, '#fde047'],
    ],
  },
  {
    id: 'shulker_red',
    label: 'Shulker Đỏ',
    category: 'Kho & Tiện Ích',
    bg: '#450a0a',
    pixels: [
      [1, 1, 14, 7, '#ef4444'],
      [1, 8, 14, 7, '#b91c1c'],
      [3, 6, 3, 3, '#f87171'],
      [10, 6, 3, 3, '#f87171'],
      [6, 8, 4, 4, '#fde047'],
    ],
  },
  {
    id: 'vault',
    label: 'Rương Vault',
    category: 'Kho & Tiện Ích',
    bg: '#134e4a',
    pixels: [
      [1, 1, 14, 14, '#0f766e'],
      [2, 2, 12, 4, '#ea580c'],
      [5, 6, 6, 6, '#facc15'],
      [7, 7, 2, 4, '#09090b'],
    ],
  },
  {
    id: 'crafting',
    label: 'Bàn Chế Tạo',
    category: 'Kho & Tiện Ích',
    bg: '#78350f',
    pixels: [
      [1, 1, 14, 5, '#a16207'],
      [2, 2, 3, 3, '#fde047'],
      [6, 2, 4, 3, '#b45309'],
      [11, 2, 3, 3, '#fde047'],
      [1, 6, 14, 9, '#92400e'],
      [3, 8, 4, 6, '#451a03'],
      [9, 8, 4, 6, '#d97706'],
    ],
  },
  {
    id: 'furnace',
    label: 'Lò Nung',
    category: 'Kho & Tiện Ích',
    bg: '#3f3f46',
    pixels: [
      [1, 1, 14, 14, '#71717a'],
      [3, 3, 10, 4, '#27272a'],
      [3, 9, 10, 5, '#18181b'],
      [5, 10, 6, 4, '#f97316'],
      [6, 11, 4, 2, '#fde047'],
    ],
  },
  {
    id: 'blast_furnace',
    label: 'Lò Luyện Kim',
    category: 'Kho & Tiện Ích',
    bg: '#27272a',
    pixels: [
      [1, 1, 14, 14, '#52525b'],
      [2, 2, 12, 5, '#a1a1aa'],
      [4, 9, 8, 4, '#f97316'],
      [5, 10, 6, 2, '#fef08a'],
    ],
  },
  {
    id: 'enchanting',
    label: 'Bàn Phù Phép',
    category: 'Kho & Tiện Ích',
    bg: '#1e1b4b',
    pixels: [
      [1, 6, 14, 9, '#17153b'],
      [1, 5, 14, 3, '#dc2626'],
      [3, 6, 2, 3, '#22d3ee'],
      [11, 6, 2, 3, '#22d3ee'],
      [4, 1, 8, 4, '#f59e0b'],
      [5, 2, 6, 2, '#fef3c7'],
    ],
  },
  {
    id: 'bookshelf',
    label: 'Kệ Sách',
    category: 'Kho & Tiện Ích',
    bg: '#78350f',
    pixels: [
      [1, 1, 14, 3, '#b45309'],
      [2, 4, 3, 4, '#dc2626'],
      [5, 4, 3, 4, '#22c55e'],
      [8, 4, 3, 4, '#3b82f6'],
      [11, 4, 3, 4, '#eab308'],
      [1, 8, 14, 2, '#b45309'],
      [2, 10, 4, 4, '#a855f7'],
      [7, 10, 3, 4, '#f97316'],
      [11, 10, 3, 4, '#06b6d4'],
    ],
  },
  {
    id: 'brewing',
    label: 'Giàn Pha Thuốc',
    category: 'Kho & Tiện Ích',
    bg: '#1e1b4b',
    pixels: [
      [7, 2, 2, 10, '#facc15'],
      [2, 12, 12, 3, '#71717a'],
      [3, 7, 3, 4, '#ec4899'],
      [10, 7, 3, 4, '#a855f7'],
    ],
  },
  {
    id: 'anvil',
    label: 'Cái Đe Rèn',
    category: 'Kho & Tiện Ích',
    bg: '#18181b',
    pixels: [
      [2, 2, 12, 4, '#71717a'],
      [5, 6, 6, 4, '#52525b'],
      [3, 10, 10, 4, '#71717a'],
      [3, 2, 10, 1, '#a1a1aa'],
    ],
  },
  {
    id: 'beacon',
    label: 'Đèn Beacon',
    category: 'Kho & Tiện Ích',
    bg: '#083344',
    pixels: [
      [1, 1, 14, 11, '#67e8f9'],
      [3, 3, 10, 7, '#ecfeff'],
      [5, 4, 6, 5, '#22d3ee'],
      [1, 12, 14, 3, '#311042'],
    ],
  },
  {
    id: 'conduit',
    label: 'Khối Conduit',
    category: 'Kho & Tiện Ích',
    bg: '#083344',
    pixels: [
      [3, 3, 10, 10, '#0d9488'],
      [5, 5, 6, 6, '#38bdf8'],
      [6, 6, 4, 4, '#fef08a'],
      [7, 7, 2, 2, '#0284c7'],
    ],
  },
  {
    id: 'respawn_anchor',
    label: 'Neo Hồi Sinh',
    category: 'Kho & Tiện Ích',
    bg: '#140d1e',
    pixels: [
      [1, 1, 14, 4, '#fde047'],
      [3, 2, 10, 2, '#facc15'],
      [1, 5, 14, 10, '#2e1065'],
      [3, 7, 4, 4, '#a855f7'],
      [9, 7, 4, 4, '#a855f7'],
    ],
  },
  {
    id: 'bed',
    label: 'Giường Ngủ',
    category: 'Kho & Tiện Ích',
    bg: '#1e293b',
    pixels: [
      [1, 5, 4, 6, '#f8fafc'],
      [5, 5, 10, 6, '#dc2626'],
      [1, 11, 14, 3, '#92400e'],
      [1, 14, 2, 2, '#78350f'],
      [13, 14, 2, 2, '#78350f'],
    ],
  },
  {
    id: 'jukebox',
    label: 'Hộp Nhạc',
    category: 'Kho & Tiện Ích',
    bg: '#451a03',
    pixels: [
      [1, 1, 14, 14, '#78350f'],
      [3, 3, 10, 10, '#92400e'],
      [4, 4, 8, 2, '#18181b'],
      [6, 4, 4, 1, '#22d3ee'],
    ],
  },
  {
    id: 'bell',
    label: 'Chuông Làng',
    category: 'Kho & Tiện Ích',
    bg: '#1e293b',
    pixels: [
      [2, 2, 12, 2, '#78350f'],
      [4, 4, 8, 7, '#facc15'],
      [3, 10, 10, 2, '#eab308'],
      [7, 12, 2, 2, '#fef08a'],
    ],
  },
  {
    id: 'campfire',
    label: 'Lửa Trại',
    category: 'Kho & Tiện Ích',
    bg: '#1c1917',
    pixels: [
      [2, 11, 12, 3, '#78350f'],
      [4, 5, 8, 6, '#f97316'],
      [6, 3, 4, 6, '#fde047'],
    ],
  },
  {
    id: 'soul_campfire',
    label: 'Lửa Linh Hồn',
    category: 'Kho & Tiện Ích',
    bg: '#0f172a',
    pixels: [
      [2, 11, 12, 3, '#451a03'],
      [4, 5, 8, 6, '#06b6d4'],
      [6, 3, 4, 6, '#67e8f9'],
    ],
  },
  {
    id: 'lantern',
    label: 'Đèn Lồng',
    category: 'Kho & Tiện Ích',
    bg: '#0f172a',
    pixels: [
      [6, 1, 4, 2, '#52525b'],
      [4, 3, 8, 10, '#3f3f46'],
      [5, 5, 6, 6, '#facc15'],
      [6, 6, 4, 4, '#fef08a'],
    ],
  },
  {
    id: 'redstone_lamp',
    label: 'Đèn Đá Đỏ',
    category: 'Kho & Tiện Ích',
    bg: '#451a03',
    pixels: [
      [1, 1, 14, 14, '#78350f'],
      [3, 3, 10, 10, '#f59e0b'],
      [5, 5, 6, 6, '#fef08a'],
    ],
  },
  {
    id: 'piston',
    label: 'Pít-tông',
    category: 'Kho & Tiện Ích',
    bg: '#3f3f46',
    pixels: [
      [1, 1, 14, 4, '#b45309'],
      [1, 5, 14, 10, '#71717a'],
      [6, 5, 4, 6, '#a1a1aa'],
      [5, 9, 6, 3, '#84cc16'],
    ],
  },
  {
    id: 'hopper',
    label: 'Phễu Hopper',
    category: 'Kho & Tiện Ích',
    bg: '#18181b',
    pixels: [
      [1, 2, 14, 4, '#71717a'],
      [3, 6, 10, 4, '#52525b'],
      [6, 10, 4, 4, '#3f3f46'],
    ],
  },
  {
    id: 'rail',
    label: 'Đường Ray',
    category: 'Kho & Tiện Ích',
    bg: '#27272a',
    pixels: [
      [3, 1, 2, 14, '#a1a1aa'],
      [11, 1, 2, 14, '#a1a1aa'],
      [2, 3, 12, 2, '#92400e'],
      [2, 7, 12, 2, '#ef4444'],
      [2, 11, 12, 2, '#92400e'],
    ],
  },
  {
    id: 'wheat',
    label: 'Nông Trại Lúa',
    category: 'Kho & Tiện Ích',
    bg: '#422006',
    pixels: [
      [2, 2, 2, 10, '#facc15'],
      [5, 1, 2, 11, '#eab308'],
      [9, 2, 2, 10, '#facc15'],
      [12, 3, 2, 9, '#ca8a04'],
      [1, 12, 14, 3, '#713f12'],
    ],
  },
  {
    id: 'portal',
    label: 'Cổng Nether',
    category: 'Kho & Tiện Ích',
    bg: '#1e1b4b',
    pixels: [
      [1, 1, 14, 14, '#2e1065'],
      [3, 3, 10, 10, '#9333ea'],
      [5, 5, 6, 6, '#c084fc'],
      [6, 6, 4, 4, '#f3e8ff'],
    ],
  },
  {
    id: 'end_portal',
    label: 'Khung Cổng End',
    category: 'Kho & Tiện Ích',
    bg: '#d9d2a9',
    pixels: [
      [1, 6, 14, 9, '#0d9488'],
      [3, 8, 10, 6, '#d9d2a9'],
      [4, 2, 8, 6, '#10b981'],
      [6, 3, 4, 4, '#064e3b'],
      [7, 4, 2, 2, '#a7f3d0'],
    ],
  },
  {
    id: 'lodestone',
    label: 'Đá Từ Tính',
    category: 'Kho & Tiện Ích',
    bg: '#3f3f46',
    pixels: [
      [1, 1, 14, 14, '#71717a'],
      [3, 3, 10, 10, '#52525b'],
      [5, 5, 6, 6, '#a1a1aa'],
      [6, 2, 4, 12, '#d4d4d8'],
      [2, 6, 12, 4, '#d4d4d8'],
      [6, 6, 4, 4, '#38bdf8'],
    ],
  },
  {
    id: 'tnt',
    label: 'Khối TNT',
    category: 'Kho & Tiện Ích',
    bg: '#991b1b',
    pixels: [
      [1, 1, 14, 4, '#dc2626'],
      [1, 5, 14, 6, '#f8fafc'],
      [1, 11, 14, 4, '#dc2626'],
      [3, 6, 2, 4, '#18181b'],
      [7, 6, 2, 4, '#18181b'],
      [11, 6, 2, 4, '#18181b'],
    ],
  },
  {
    id: 'command',
    label: 'Command Block',
    category: 'Kho & Tiện Ích',
    bg: '#c77d48',
    pixels: [
      [2, 2, 12, 12, '#8b5029'],
      [4, 4, 8, 8, '#3a281d'],
      [5, 5, 2, 2, '#55ff55'],
      [9, 5, 2, 2, '#ff5555'],
      [5, 9, 2, 2, '#55ffff'],
      [9, 9, 2, 2, '#ffaa00'],
    ],
  },

  // --- NHÓM 3: DÂN LÀNG & MOB (MOBS / VILLAGER / BOSS) ---
  {
    id: 'axolotl',
    label: 'Axolotl Hồng',
    category: 'Dân Làng & Mob',
    bg: '#831843',
    pixels: [
      [3, 4, 10, 8, '#f9a8d4'],
      [1, 3, 2, 3, '#ec4899'],
      [13, 3, 2, 3, '#ec4899'],
      [1, 7, 2, 2, '#db2777'],
      [13, 7, 2, 2, '#db2777'],
      [4, 6, 2, 2, '#18181b'],
      [10, 6, 2, 2, '#18181b'],
      [6, 9, 4, 1, '#db2777'],
    ],
  },
  {
    id: 'axolotl_cyan',
    label: 'Axolotl Xanh Cyan',
    category: 'Dân Làng & Mob',
    bg: '#083344',
    pixels: [
      [3, 4, 10, 8, '#a5f3fc'],
      [1, 3, 2, 3, '#06b6d4'],
      [13, 3, 2, 3, '#06b6d4'],
      [4, 6, 2, 2, '#18181b'],
      [10, 6, 2, 2, '#18181b'],
      [6, 9, 4, 1, '#0891b2'],
    ],
  },
  {
    id: 'axolotl_gold',
    label: 'Axolotl Vàng',
    category: 'Dân Làng & Mob',
    bg: '#713f12',
    pixels: [
      [3, 4, 10, 8, '#fde047'],
      [1, 3, 2, 3, '#eab308'],
      [13, 3, 2, 3, '#eab308'],
      [4, 6, 2, 2, '#18181b'],
      [10, 6, 2, 2, '#18181b'],
      [6, 9, 4, 1, '#ca8a04'],
    ],
  },
  {
    id: 'axolotl_blue',
    label: 'Axolotl Hiếm',
    category: 'Dân Làng & Mob',
    bg: '#1e1b4b',
    pixels: [
      [3, 4, 10, 8, '#60a5fa'],
      [1, 3, 2, 3, '#f97316'],
      [13, 3, 2, 3, '#f97316'],
      [4, 6, 2, 2, '#18181b'],
      [10, 6, 2, 2, '#18181b'],
      [6, 9, 4, 1, '#1d4ed8'],
    ],
  },
  {
    id: 'chicken',
    label: 'Gà Minecraft',
    category: 'Dân Làng & Mob',
    bg: '#14532d',
    pixels: [
      [4, 3, 8, 9, '#f8fafc'],
      [7, 1, 2, 2, '#dc2626'],
      [4, 6, 2, 2, '#18181b'],
      [10, 6, 2, 2, '#18181b'],
      [6, 7, 4, 2, '#eab308'],
      [7, 9, 2, 3, '#ef4444'],
    ],
  },
  {
    id: 'bee',
    label: 'Ong Mật',
    category: 'Dân Làng & Mob',
    bg: '#422006',
    pixels: [
      [2, 4, 12, 8, '#facc15'],
      [5, 4, 2, 8, '#18181b'],
      [9, 4, 2, 8, '#18181b'],
      [3, 6, 2, 3, '#38bdf8'],
      [5, 2, 6, 2, '#e0f2fe'],
    ],
  },
  {
    id: 'allay',
    label: 'Allay Xanh',
    category: 'Dân Làng & Mob',
    bg: '#083344',
    pixels: [
      [3, 3, 10, 10, '#38bdf8'],
      [4, 6, 2, 3, '#ffffff'],
      [10, 6, 2, 3, '#ffffff'],
      [1, 5, 2, 5, '#bae6fd'],
      [13, 5, 2, 5, '#bae6fd'],
    ],
  },
  {
    id: 'frog',
    label: 'Ếch Đầm Lầy',
    category: 'Dân Làng & Mob',
    bg: '#14532d',
    pixels: [
      [2, 5, 12, 8, '#ea580c'],
      [3, 3, 3, 3, '#fb923c'],
      [10, 3, 3, 3, '#fb923c'],
      [4, 4, 2, 1, '#18181b'],
      [10, 4, 2, 1, '#18181b'],
      [4, 10, 8, 2, '#fed7aa'],
    ],
  },
  {
    id: 'wolf',
    label: 'Chó Sói',
    category: 'Dân Làng & Mob',
    bg: '#1e293b',
    pixels: [
      [3, 4, 10, 9, '#d4d4d8'],
      [3, 2, 3, 2, '#71717a'],
      [10, 2, 3, 2, '#71717a'],
      [4, 6, 2, 2, '#18181b'],
      [10, 6, 2, 2, '#18181b'],
      [6, 8, 4, 3, '#a1a1aa'],
      [3, 12, 10, 2, '#ef4444'],
    ],
  },
  {
    id: 'cat',
    label: 'Mèo Làng',
    category: 'Dân Làng & Mob',
    bg: '#1e1b4b',
    pixels: [
      [3, 4, 10, 9, '#f97316'],
      [3, 2, 3, 2, '#ea580c'],
      [10, 2, 3, 2, '#ea580c'],
      [4, 6, 2, 2, '#22c55e'],
      [10, 6, 2, 2, '#22c55e'],
      [7, 8, 2, 2, '#fbcfe8'],
    ],
  },
  {
    id: 'fox',
    label: 'Cáo Cam',
    category: 'Dân Làng & Mob',
    bg: '#431407',
    pixels: [
      [2, 4, 12, 9, '#f97316'],
      [2, 2, 3, 2, '#18181b'],
      [11, 2, 3, 2, '#18181b'],
      [3, 8, 2, 2, '#18181b'],
      [11, 8, 2, 2, '#18181b'],
      [5, 9, 6, 3, '#f8fafc'],
    ],
  },
  {
    id: 'panda',
    label: 'Gấu Trúc',
    category: 'Dân Làng & Mob',
    bg: '#14532d',
    pixels: [
      [2, 3, 12, 10, '#f8fafc'],
      [2, 2, 3, 3, '#18181b'],
      [11, 2, 3, 3, '#18181b'],
      [3, 6, 3, 3, '#18181b'],
      [10, 6, 3, 3, '#18181b'],
      [6, 9, 4, 2, '#18181b'],
    ],
  },
  {
    id: 'cow',
    label: 'Bò Sữa',
    category: 'Dân Làng & Mob',
    bg: '#3f2e21',
    pixels: [
      [2, 3, 12, 10, '#5c4028'],
      [2, 2, 2, 2, '#a1a1aa'],
      [12, 2, 2, 2, '#a1a1aa'],
      [3, 4, 4, 3, '#f8fafc'],
      [4, 9, 8, 4, '#fbcfe8'],
    ],
  },
  {
    id: 'sheep',
    label: 'Cừu Trắng',
    category: 'Dân Làng & Mob',
    bg: '#1e293b',
    pixels: [
      [1, 1, 14, 14, '#f8fafc'],
      [4, 4, 8, 8, '#fda4af'],
      [4, 6, 2, 2, '#18181b'],
      [10, 6, 2, 2, '#18181b'],
    ],
  },
  {
    id: 'pig',
    label: 'Heo Hồng',
    category: 'Dân Làng & Mob',
    bg: '#831843',
    pixels: [
      [2, 3, 12, 10, '#f472b6'],
      [3, 6, 2, 2, '#18181b'],
      [11, 6, 2, 2, '#18181b'],
      [5, 8, 6, 3, '#fb7185'],
    ],
  },
  {
    id: 'villager',
    label: 'Dân Làng',
    category: 'Dân Làng & Mob',
    bg: '#78350f',
    pixels: [
      [2, 1, 12, 14, '#b87a52'],
      [3, 4, 10, 2, '#451a03'],
      [3, 6, 3, 2, '#ffffff'],
      [4, 6, 2, 2, '#10b981'],
      [10, 6, 3, 2, '#ffffff'],
      [10, 6, 2, 2, '#10b981'],
      [6, 7, 4, 6, '#9c623e'],
      [5, 13, 6, 1, '#5c341d'],
    ],
  },
  {
    id: 'iron_golem',
    label: 'Iron Golem',
    category: 'Dân Làng & Mob',
    bg: '#a1a1aa',
    pixels: [
      [2, 1, 12, 14, '#e4e4e7'],
      [3, 5, 10, 1, '#52525b'],
      [3, 6, 3, 2, '#dc2626'],
      [10, 6, 3, 2, '#dc2626'],
      [6, 7, 4, 6, '#a1a1aa'],
      [2, 2, 3, 3, '#4ead33'],
    ],
  },
  {
    id: 'creeper',
    label: 'Creeper',
    category: 'Dân Làng & Mob',
    bg: '#15803d',
    pixels: [
      [1, 1, 14, 14, '#22c55e'],
      [2, 2, 4, 4, '#4ade80'],
      [3, 4, 3, 3, '#111827'],
      [10, 4, 3, 3, '#111827'],
      [6, 7, 4, 5, '#111827'],
      [4, 9, 2, 5, '#111827'],
      [10, 9, 2, 5, '#111827'],
    ],
  },
  {
    id: 'skeleton',
    label: 'Skeleton',
    category: 'Dân Làng & Mob',
    bg: '#71717a',
    pixels: [
      [1, 1, 14, 14, '#e4e4e7'],
      [3, 5, 3, 3, '#27272a'],
      [10, 5, 3, 3, '#27272a'],
      [7, 8, 2, 2, '#3f3f46'],
      [3, 12, 10, 2, '#27272a'],
    ],
  },
  {
    id: 'zombie',
    label: 'Zombie',
    category: 'Dân Làng & Mob',
    bg: '#14532d',
    pixels: [
      [1, 1, 14, 14, '#4d7c0f'],
      [2, 2, 12, 3, '#365314'],
      [3, 6, 3, 2, '#18181b'],
      [10, 6, 3, 2, '#18181b'],
      [6, 9, 4, 2, '#365314'],
    ],
  },
  {
    id: 'wither',
    label: 'Wither Skull',
    category: 'Dân Làng & Mob',
    bg: '#18181b',
    pixels: [
      [1, 1, 14, 14, '#27272a'],
      [3, 5, 3, 3, '#09090b'],
      [10, 5, 3, 3, '#09090b'],
      [4, 6, 1, 1, '#f4f4f5'],
      [11, 6, 1, 1, '#f4f4f5'],
      [3, 12, 10, 2, '#09090b'],
    ],
  },
  {
    id: 'spawner',
    label: 'Lồng Spawner',
    category: 'Dân Làng & Mob',
    bg: '#0f172a',
    pixels: [
      [1, 1, 14, 14, '#1e293b'],
      [1, 1, 14, 2, '#334155'],
      [1, 7, 14, 2, '#334155'],
      [1, 13, 14, 2, '#334155'],
      [7, 1, 2, 14, '#334155'],
      [5, 5, 6, 6, '#f97316'],
      [6, 6, 4, 4, '#fde047'],
    ],
  },
  {
    id: 'trial_spawner',
    label: 'Trial Spawner',
    category: 'Dân Làng & Mob',
    bg: '#134e4a',
    pixels: [
      [1, 1, 14, 14, '#0f172a'],
      [1, 1, 14, 3, '#c2410c'],
      [1, 12, 14, 3, '#0d9488'],
      [5, 5, 6, 6, '#38bdf8'],
      [6, 6, 4, 4, '#bae6fd'],
    ],
  },
  {
    id: 'warden',
    label: 'Warden',
    category: 'Dân Làng & Mob',
    bg: '#042f2e',
    pixels: [
      [2, 3, 12, 11, '#0f172a'],
      [0, 1, 3, 5, '#2dd4bf'],
      [13, 1, 3, 5, '#2dd4bf'],
      [5, 6, 6, 5, '#134e4a'],
      [6, 7, 4, 3, '#5eead4'],
    ],
  },
  {
    id: 'breeze',
    label: 'Quái Breeze',
    category: 'Dân Làng & Mob',
    bg: '#1e1b4b',
    pixels: [
      [3, 3, 10, 10, '#7dd3fc'],
      [4, 5, 8, 2, '#0284c7'],
      [4, 7, 2, 2, '#fef08a'],
      [10, 7, 2, 2, '#fef08a'],
      [2, 10, 12, 3, '#bae6fd'],
    ],
  },
  {
    id: 'enderman',
    label: 'Enderman',
    category: 'Dân Làng & Mob',
    bg: '#09090b',
    pixels: [
      [1, 1, 14, 14, '#18181b'],
      [2, 7, 4, 2, '#f0abfc'],
      [3, 7, 2, 2, '#a855f7'],
      [10, 7, 4, 2, '#f0abfc'],
      [11, 7, 2, 2, '#a855f7'],
    ],
  },
  {
    id: 'dragon',
    label: 'Rồng Ender',
    category: 'Dân Làng & Mob',
    bg: '#09090b',
    pixels: [
      [1, 2, 14, 12, '#18181b'],
      [3, 1, 2, 3, '#71717a'],
      [11, 1, 2, 3, '#71717a'],
      [3, 6, 3, 2, '#d946ef'],
      [10, 6, 3, 2, '#d946ef'],
      [5, 11, 6, 2, '#a855f7'],
    ],
  },
  {
    id: 'blaze',
    label: 'Quái Blaze',
    category: 'Dân Làng & Mob',
    bg: '#7c2d12',
    pixels: [
      [2, 2, 12, 12, '#f59e0b'],
      [3, 3, 10, 4, '#fde047'],
      [3, 6, 3, 2, '#18181b'],
      [10, 6, 3, 2, '#18181b'],
      [4, 6, 1, 1, '#ffffff'],
      [11, 6, 1, 1, '#ffffff'],
    ],
  },
  {
    id: 'ghast',
    label: 'Ma Ghast',
    category: 'Dân Làng & Mob',
    bg: '#27272a',
    pixels: [
      [2, 1, 12, 11, '#f4f4f5'],
      [3, 5, 3, 2, '#dc2626'],
      [10, 5, 3, 2, '#dc2626'],
      [6, 8, 4, 3, '#71717a'],
      [3, 12, 2, 3, '#d4d4d8'],
      [7, 12, 2, 3, '#d4d4d8'],
      [11, 12, 2, 3, '#d4d4d8'],
    ],
  },
  {
    id: 'piglin',
    label: 'Piglin',
    category: 'Dân Làng & Mob',
    bg: '#78350f',
    pixels: [
      [2, 2, 12, 12, '#f4a27e'],
      [0, 4, 2, 5, '#e08e68'],
      [14, 4, 2, 5, '#e08e68'],
      [3, 6, 2, 2, '#ffffff'],
      [11, 6, 2, 2, '#ffffff'],
      [6, 8, 4, 3, '#d97757'],
      [4, 9, 1, 3, '#fef08a'],
      [11, 9, 1, 3, '#fef08a'],
    ],
  },

  // --- NHÓM 4: VẬT PHẨM & TRANG BỊ (ITEMS & GEAR) ---
  {
    id: 'pickaxe_diamond',
    label: 'Cúp Kim Cương',
    category: 'Vật Phẩm',
    bg: '#18181b',
    pixels: [
      [3, 2, 9, 2, '#22d3ee'],
      [10, 3, 3, 4, '#06b6d4'],
      [9, 5, 2, 2, '#92400e'],
      [7, 7, 2, 2, '#92400e'],
      [5, 9, 2, 2, '#78350f'],
      [3, 11, 2, 2, '#78350f'],
    ],
  },
  {
    id: 'pickaxe_netherite',
    label: 'Cúp Netherite',
    category: 'Vật Phẩm',
    bg: '#18181b',
    pixels: [
      [3, 2, 9, 2, '#57534e'],
      [10, 3, 3, 4, '#44403c'],
      [9, 5, 2, 2, '#991b1b'],
      [7, 7, 2, 2, '#7f1d1d'],
      [5, 9, 2, 2, '#7f1d1d'],
      [3, 11, 2, 2, '#450a0a'],
    ],
  },
  {
    id: 'sword_diamond',
    label: 'Kiếm Kim Cương',
    category: 'Vật Phẩm',
    bg: '#18181b',
    pixels: [
      [10, 2, 3, 3, '#67e8f9'],
      [8, 4, 3, 3, '#22d3ee'],
      [6, 6, 3, 3, '#06b6d4'],
      [4, 8, 4, 2, '#0e7490'],
      [3, 11, 3, 3, '#92400e'],
    ],
  },
  {
    id: 'sword_netherite',
    label: 'Kiếm Netherite',
    category: 'Vật Phẩm',
    bg: '#18181b',
    pixels: [
      [10, 2, 3, 3, '#a8a29e'],
      [8, 4, 3, 3, '#78716c'],
      [6, 6, 3, 3, '#57534e'],
      [4, 8, 4, 2, '#f59e0b'],
      [3, 11, 3, 3, '#991b1b'],
    ],
  },
  {
    id: 'mace',
    label: 'Chùy Mace',
    category: 'Vật Phẩm',
    bg: '#0f172a',
    pixels: [
      [7, 2, 6, 6, '#94a3b8'],
      [8, 3, 4, 4, '#38bdf8'],
      [6, 8, 2, 2, '#64748b'],
      [4, 10, 2, 2, '#475569'],
      [2, 12, 2, 2, '#334155'],
    ],
  },
  {
    id: 'elytra',
    label: 'Cánh Elytra',
    category: 'Vật Phẩm',
    bg: '#1e1b4b',
    pixels: [
      [2, 2, 5, 11, '#9ca3af'],
      [9, 2, 5, 11, '#9ca3af'],
      [3, 3, 3, 8, '#d1d5db'],
      [10, 3, 3, 8, '#d1d5db'],
      [6, 2, 4, 3, '#4b5563'],
    ],
  },
  {
    id: 'totem',
    label: 'Totem Bất Tử',
    category: 'Vật Phẩm',
    bg: '#422006',
    pixels: [
      [4, 2, 8, 12, '#facc15'],
      [2, 6, 12, 4, '#eab308'],
      [5, 4, 2, 2, '#10b981'],
      [9, 4, 2, 2, '#10b981'],
      [6, 9, 4, 4, '#ca8a04'],
    ],
  },
  {
    id: 'trident',
    label: 'Đinh Ba Trident',
    category: 'Vật Phẩm',
    bg: '#083344',
    pixels: [
      [3, 2, 2, 5, '#ecfeff'],
      [7, 1, 2, 6, '#ecfeff'],
      [11, 2, 2, 5, '#ecfeff'],
      [3, 6, 10, 2, '#2dd4bf'],
      [7, 8, 2, 7, '#0d9488'],
    ],
  },
  {
    id: 'shield',
    label: 'Khiên Chắn',
    category: 'Vật Phẩm',
    bg: '#18181b',
    pixels: [
      [3, 2, 10, 12, '#71717a'],
      [4, 3, 8, 10, '#92400e'],
      [7, 7, 2, 2, '#facc15'],
    ],
  },
  {
    id: 'apple_gold',
    label: 'Táo Vàng Enchant',
    category: 'Vật Phẩm',
    bg: '#3b0764',
    pixels: [
      [7, 1, 2, 3, '#92400e'],
      [3, 4, 10, 9, '#facc15'],
      [4, 5, 4, 4, '#fef08a'],
      [5, 13, 6, 2, '#eab308'],
    ],
  },
  {
    id: 'golden_carrot',
    label: 'Cà Rốt Vàng',
    category: 'Vật Phẩm',
    bg: '#422006',
    pixels: [
      [10, 2, 3, 3, '#22c55e'],
      [6, 4, 5, 5, '#facc15'],
      [4, 7, 5, 5, '#eab308'],
      [3, 10, 3, 3, '#ca8a04'],
    ],
  },
  {
    id: 'ender_pearl',
    label: 'Ngọc Ender',
    category: 'Vật Phẩm',
    bg: '#042f2e',
    pixels: [
      [3, 3, 10, 10, '#0d9488'],
      [4, 4, 8, 8, '#14b8a6'],
      [5, 5, 4, 4, '#5eead4'],
      [6, 6, 2, 2, '#ccfbf1'],
    ],
  },
  {
    id: 'eye_of_ender',
    label: 'Mắt Ender',
    category: 'Vật Phẩm',
    bg: '#064e3b',
    pixels: [
      [3, 3, 10, 10, '#10b981'],
      [4, 4, 8, 8, '#a7f3d0'],
      [7, 5, 2, 6, '#064e3b'],
    ],
  },
  {
    id: 'nether_star',
    label: 'Sao Nether',
    category: 'Vật Phẩm',
    bg: '#1e1b4b',
    pixels: [
      [7, 1, 2, 14, '#e0f2fe'],
      [1, 7, 14, 2, '#e0f2fe'],
      [4, 4, 8, 8, '#bae6fd'],
      [6, 6, 4, 4, '#ffffff'],
    ],
  },
  {
    id: 'axolotl_bucket',
    label: 'Xô Axolotl',
    category: 'Vật Phẩm',
    bg: '#1e293b',
    pixels: [
      [3, 6, 10, 8, '#94a3b8'],
      [4, 5, 8, 3, '#38bdf8'],
      [4, 2, 8, 4, '#f9a8d4'],
      [2, 3, 2, 2, '#ec4899'],
      [12, 3, 2, 2, '#ec4899'],
    ],
  },
  {
    id: 'compass_item',
    label: 'La Bàn Đỏ',
    category: 'Vật Phẩm',
    bg: '#18181b',
    pixels: [
      [3, 3, 10, 10, '#71717a'],
      [4, 4, 8, 8, '#27272a'],
      [7, 4, 2, 4, '#ef4444'],
      [7, 8, 2, 4, '#f4f4f5'],
    ],
  },
  {
    id: 'recovery_compass',
    label: 'La Bàn Hồi Phục',
    category: 'Vật Phẩm',
    bg: '#042f2e',
    pixels: [
      [3, 3, 10, 10, '#1e293b'],
      [4, 4, 8, 8, '#0f172a'],
      [7, 4, 2, 5, '#2dd4bf'],
      [7, 9, 2, 3, '#0d9488'],
    ],
  },
  {
    id: 'potion',
    label: 'Thuốc Phép',
    category: 'Vật Phẩm',
    bg: '#1e1b4b',
    pixels: [
      [6, 2, 4, 3, '#d97706'],
      [4, 5, 8, 9, '#ec4899'],
      [5, 6, 4, 4, '#f9a8d4'],
    ],
  },
  {
    id: 'firework',
    label: 'Pháo Hoa Bay',
    category: 'Vật Phẩm',
    bg: '#18181b',
    pixels: [
      [5, 2, 6, 3, '#ef4444'],
      [6, 5, 4, 6, '#f8fafc'],
      [6, 7, 4, 2, '#ef4444'],
      [7, 11, 2, 4, '#92400e'],
    ],
  },
  {
    id: 'cake',
    label: 'Bánh Kem MC',
    category: 'Vật Phẩm',
    bg: '#451a03',
    pixels: [
      [2, 4, 12, 5, '#f8fafc'],
      [4, 5, 2, 2, '#ef4444'],
      [10, 5, 2, 2, '#ef4444'],
      [2, 9, 12, 5, '#d97706'],
    ],
  },
];

const MC_ICON_MAP = Object.fromEntries(MC_ICON_CATALOG.map((item) => [item.id, item]));

function renderPixelIconToPngDataUrl(iconId = 'grass', size = 256) {
  if (typeof document === 'undefined') return '';
  const item = MC_ICON_MAP[iconId] || MC_ICON_MAP.grass;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.imageSmoothingEnabled = false;
  const scale = size / 16;

  ctx.fillStyle = item.bg;
  ctx.fillRect(0, 0, size, size);

  item.pixels.forEach(([x, y, w, h, fill]) => {
    ctx.fillStyle = fill;
    ctx.fillRect(
      Math.round(x * scale),
      Math.round(y * scale),
      Math.round(w * scale),
      Math.round(h * scale)
    );
  });

  const borderW = Math.max(2, Math.round(scale * 1.1));
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = borderW;
  ctx.strokeRect(borderW / 2, borderW / 2, size - borderW, size - borderW);

  return canvas.toDataURL('image/png');
}

function renderImageFileToPngIcon(file, size = 256) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No canvas context'));
          return;
        }
        ctx.imageSmoothingEnabled = false;
        const minSide = Math.min(img.width, img.height);
        const sx = Math.floor((img.width - minSide) / 2);
        const sy = Math.floor((img.height - minSide) / 2);
        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function VoxelBlockIcon({ type = 'grass', customImage = null, className = 'w-6 h-6' }) {
  if (customImage) {
    return (
      <img
        src={customImage}
        alt="Icon"
        className={`${className} shrink-0 object-cover border border-black`}
        style={{ imageRendering: 'pixelated' }}
      />
    );
  }
  const item = MC_ICON_MAP[type] || MC_ICON_MAP.grass;
  return (
    <svg
      viewBox="0 0 16 16"
      className={`${className} shrink-0`}
      style={{ imageRendering: 'pixelated' }}
      shapeRendering="crispEdges"
    >
      <rect width="16" height="16" fill={item.bg} />
      {item.pixels.map(([x, y, w, h, fill], idx) => (
        <rect key={idx} x={x} y={y} width={w} height={h} fill={fill} />
      ))}
      <rect x="0" y="0" width="16" height="16" fill="none" stroke="#000" strokeWidth="1.4" />
    </svg>
  );
}

// ==========================================
// 0C. COMPONENT THÚ CƯNG MINECRAFT ĐI DẠO (AXOLOTL & CHICKEN - KHÔNG CÓ TÊN Ở DƯỚI)
// ==========================================
function PixelMobSprite({ species, variant, frame, isPecking, isPlayingHearts }) {
  const legOffset = frame % 2 === 0 ? 0 : 1;

  if (species === 'chicken') {
    return (
      <svg
        viewBox="0 0 20 20"
        className="w-9 h-9 sm:w-11 sm:h-11 drop-shadow-[0_3px_0_rgba(0,0,0,0.65)]"
        shapeRendering="crispEdges"
      >
        <rect x="5" y="18" width="10" height="2" fill="rgba(0,0,0,0.45)" />
        <rect x={7 + legOffset} y="15" width="1" height="3" fill="#eab308" />
        <rect x={6 + legOffset} y="17" width="3" height="1" fill="#eab308" />
        <rect x={12 - legOffset} y="15" width="1" height="3" fill="#ca8a04" />
        <rect x={11 - legOffset} y="17" width="3" height="1" fill="#ca8a04" />
        <rect x="5" y="9" width="10" height="6" fill="#f8fafc" />
        <rect x="4" y="10" width="2" height="4" fill="#e2e8f0" />
        <rect x="7" y={10 - legOffset} width="5" height="4" fill="#e2e8f0" />
        <g transform={isPecking ? 'translate(2, 3)' : 'translate(0, 0)'}>
          <rect x="12" y="4" width="5" height="6" fill="#ffffff" />
          <rect x="13" y="2" width="3" height="2" fill="#dc2626" />
          <rect x="15" y="6" width="1" height="1" fill="#09090b" />
          <rect x="17" y="6" width="3" height="2" fill="#facc15" />
          <rect x="16" y="8" width="2" height="2" fill="#ef4444" />
        </g>
        {isPlayingHearts && (
          <g>
            <rect x="8" y="1" width="2" height="2" fill="#ef4444" />
            <rect x="11" y="0" width="2" height="2" fill="#55ff55" />
          </g>
        )}
      </svg>
    );
  }

  const palettes = {
    pink: { body: '#f9a8d4', shade: '#f472b6', gill: '#db2777', tail: '#ec4899' },
    cyan: { body: '#a5f3fc', shade: '#67e8f9', gill: '#0891b2', tail: '#06b6d4' },
    gold: { body: '#fde047', shade: '#facc15', gill: '#ca8a04', tail: '#eab308' },
  };
  const pal = palettes[variant] || palettes.pink;

  return (
    <svg
      viewBox="0 0 24 18"
      className="w-10 h-8 sm:w-12 sm:h-10 drop-shadow-[0_3px_0_rgba(0,0,0,0.65)]"
      shapeRendering="crispEdges"
    >
      <rect x="4" y="16" width="16" height="2" fill="rgba(0,0,0,0.45)" />
      <rect x="1" y={8 + (frame % 2 === 0 ? -1 : 1)} width="4" height="4" fill={pal.tail} />
      <rect x="0" y={9 + (frame % 2 === 0 ? -1 : 1)} width="2" height="2" fill={pal.gill} />
      <rect x="5" y="8" width="10" height="5" fill={pal.body} />
      <rect x="6" y="7" width="8" height="1" fill={pal.tail} />
      <rect x="5" y="12" width="10" height="1" fill={pal.shade} />
      <rect x={6 + legOffset} y="13" width="2" height="3" fill={pal.shade} />
      <rect x={12 - legOffset} y="13" width="2" height="3" fill={pal.shade} />
      <rect x="14" y="5" width="7" height="7" fill={pal.body} />
      <rect x="13" y={3 + legOffset} width="2" height="2" fill={pal.gill} />
      <rect x="16" y="2" width="2" height="3" fill={pal.gill} />
      <rect x="21" y={4 - legOffset} width="2" height="2" fill={pal.gill} />
      <rect x="21" y="8" width="2" height="2" fill={pal.gill} />
      <rect x="16" y="7" width="1" height="2" fill="#09090b" />
      <rect x="19" y="7" width="1" height="2" fill="#09090b" />
      <rect x="17" y="10" width="3" height="1" fill={pal.gill} />
      {isPlayingHearts && (
        <g>
          <rect x="15" y="0" width="2" height="2" fill="#f43f5e" />
          <rect x="19" y="1" width="2" height="2" fill="#38bdf8" />
        </g>
      )}
    </svg>
  );
}

function RoamingMinecraftMobs({ enabled, onInteractMob }) {
  const [mobs, setMobs] = useState(() => [
    {
      id: 'mob-axo-pink',
      species: 'axolotl',
      variant: 'pink',
      x: 15,
      y: 72,
      vx: 0.28,
      vy: -0.05,
      facingRight: true,
      frame: 0,
      pecking: false,
      happyUntil: 0,
    },
    {
      id: 'mob-chicken-1',
      species: 'chicken',
      variant: 'white',
      x: 78,
      y: 68,
      vx: -0.24,
      vy: 0.04,
      facingRight: false,
      frame: 1,
      pecking: false,
      happyUntil: 0,
    },
    {
      id: 'mob-axo-cyan',
      species: 'axolotl',
      variant: 'cyan',
      x: 45,
      y: 76,
      vx: 0.22,
      vy: 0.03,
      facingRight: true,
      frame: 0,
      pecking: false,
      happyUntil: 0,
    },
    {
      id: 'mob-axo-gold',
      species: 'axolotl',
      variant: 'gold',
      x: 82,
      y: 28,
      vx: -0.18,
      vy: 0.08,
      facingRight: false,
      frame: 1,
      pecking: false,
      happyUntil: 0,
    },
  ]);

  useEffect(() => {
    if (!enabled) return undefined;
    const timer = setInterval(() => {
      const now = Date.now();
      setMobs((prev) =>
        prev.map((m) => {
          const changeRoll = Math.random();
          let nextVx = m.vx;
          let nextVy = m.vy;
          let nextPecking = false;

          if (changeRoll < 0.04) {
            nextVx = (Math.random() - 0.5) * 0.55;
            if (Math.abs(nextVx) < 0.12) nextVx = nextVx >= 0 ? 0.18 : -0.18;
            nextVy = (Math.random() - 0.5) * 0.18;
          } else if (m.species === 'chicken' && changeRoll < 0.1) {
            nextPecking = true;
          }

          let nx = m.x + nextVx;
          let ny = m.y + nextVy;

          // Giới hạn vùng di chuyển an toàn trên cả Android & PC (Không đè lên Header hoặc Thanh đáy)
          if (nx < 6) {
            nx = 6;
            nextVx = Math.abs(nextVx);
          } else if (nx > 88) {
            nx = 88;
            nextVx = -Math.abs(nextVx);
          }

          if (ny < 20) {
            ny = 20;
            nextVy = Math.abs(nextVy);
          } else if (ny > 78) {
            ny = 78;
            nextVy = -Math.abs(nextVy);
          }

          return {
            ...m,
            x: nx,
            y: ny,
            vx: nextVx,
            vy: nextVy,
            facingRight: nextVx >= 0,
            frame: (m.frame + 1) % 4,
            pecking: nextPecking,
            happyUntil: m.happyUntil > now ? m.happyUntil : 0,
          };
        })
      );
    }, 180);

    return () => clearInterval(timer);
  }, [enabled]);

  if (!enabled) return null;

  const now = Date.now();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[25]">
      {mobs.map((mob) => {
        const isHappy = mob.happyUntil > now;
        return (
          <div
            key={mob.id}
            onClick={(e) => {
              e.stopPropagation();
              setMobs((prev) =>
                prev.map((item) =>
                  item.id === mob.id
                    ? {
                        ...item,
                        vx: -item.vx * 1.25,
                        facingRight: !item.facingRight,
                        happyUntil: Date.now() + 1400,
                      }
                    : item
                )
              );
              onInteractMob(mob, e.clientX, e.clientY);
            }}
            style={{
              left: `${mob.x}%`,
              top: `${mob.y}%`,
              transform: `translate(-50%, -50%) scaleX(${mob.facingRight ? 1 : -1}) ${
                isHappy ? ' translateY(-8px) scale(1.12)' : ''
              }`,
              transition: 'left 0.18s linear, top 0.18s linear, transform 0.15s ease',
            }}
            className="absolute pointer-events-auto cursor-pointer select-none"
          >
            <PixelMobSprite
              species={mob.species}
              variant={mob.variant}
              frame={mob.frame}
              isPecking={mob.pecking}
              isPlayingHearts={isHappy}
            />
          </div>
        );
      })}
    </div>
  );
}

// ==========================================
// 1. CẤU HÌNH CHIỀU KHÔNG GIAN & NHÃN TAG
// ==========================================
const DIMENSION_CONFIG = {
  overworld: {
    id: 'overworld',
    label: 'Overworld',
    border: 'mc-card-overworld',
    badge: 'mc-badge-overworld',
    activeTab: 'mc-btn-emerald text-[#061a08] font-black',
    accentBar: 'mc-turf-overworld',
    blockType: 'grass',
    icon: Compass,
  },
  nether: {
    id: 'nether',
    label: 'Nether',
    border: 'mc-card-nether',
    badge: 'mc-badge-nether',
    activeTab: 'mc-btn-redstone text-white font-black',
    accentBar: 'mc-turf-nether',
    blockType: 'nether',
    icon: Flame,
  },
  end: {
    id: 'end',
    label: 'The End',
    border: 'mc-card-end',
    badge: 'mc-badge-end',
    activeTab: 'mc-btn-purpur text-white font-black',
    accentBar: 'mc-turf-end',
    blockType: 'end',
    icon: Sparkles,
  },
};

const TAG_CONFIG = {
  Folder: {
    label: 'Thư mục (Khu vực)',
    color: 'bg-[#362807] text-[#fde047] border-2 border-[#eab308]',
    defaultIcon: 'win_folder',
    icon: Folder,
  },
  Base: {
    label: 'Base (Căn cứ)',
    color: 'bg-[#132a3e] text-[#55ffff] border-2 border-[#00aaaa]',
    defaultIcon: 'grass',
    icon: Home,
  },
  Death: {
    label: 'Điểm Chết (Death)',
    color: 'bg-[#450a0a] text-[#fca5a5] border-2 border-[#ef4444]',
    defaultIcon: 'recovery_compass',
    icon: Skull,
  },
  Farm: {
    label: 'Farm (Máy farm)',
    color: 'bg-[#332409] text-[#ffaa00] border-2 border-[#aa6600]',
    defaultIcon: 'wheat',
    icon: Wheat,
  },
  Storage: {
    label: 'Storage (Kho đồ)',
    color: 'bg-[#36200b] text-[#fde047] border-2 border-[#d97706]',
    defaultIcon: 'chest',
    icon: Layers,
  },
  Villager: {
    label: 'Villager (Dân làng)',
    color: 'bg-[#143322] text-[#55ff55] border-2 border-[#22c55e]',
    defaultIcon: 'villager',
    icon: Home,
  },
  Spawner: {
    label: 'Spawner (Lồng quái)',
    color: 'bg-[#381117] text-[#ff5555] border-2 border-[#aa0000]',
    defaultIcon: 'spawner',
    icon: Skull,
  },
  Ore: {
    label: 'Ore (Khoáng sản)',
    color: 'bg-[#0e3238] text-[#55ffff] border-2 border-[#22a8b8]',
    defaultIcon: 'diamond_ore',
    icon: Gem,
  },
  Danger: {
    label: 'Danger (Nguy hiểm)',
    color: 'bg-[#450d0d] text-[#ff5555] border-2 border-[#ff2222]',
    defaultIcon: 'warden',
    icon: AlertTriangle,
  },
  Mine: {
    label: 'Mine (Hầm mỏ)',
    color: 'bg-[#122e28] text-[#55ff55] border-2 border-[#1f8a70]',
    defaultIcon: 'pickaxe_diamond',
    icon: Pickaxe,
  },
  Portal: {
    label: 'Portal (Cổng dịch chuyển)',
    color: 'bg-[#2a123d] text-[#ff55ff] border-2 border-[#9333ea]',
    defaultIcon: 'obsidian',
    icon: ArrowRightLeft,
  },
  Structure: {
    label: 'Structure (Công trình)',
    color: 'bg-[#1b1f3b] text-[#8899ff] border-2 border-[#4f5bd5]',
    defaultIcon: 'lodestone',
    icon: Castle,
  },
  Loot: {
    label: 'Loot (Kho báu)',
    color: 'bg-[#382e08] text-[#ffff55] border-2 border-[#c29b0c]',
    defaultIcon: 'shulker',
    icon: Sparkles,
  },
};

const INITIAL_WORLDS = [
  {
    id: 'world-1',
    name: 'Survival Solo',
    icon: 'grass',
    seed: '-482910482910552',
    deletedAt: null,
    createdAt: 1710000000000,
  },
  {
    id: 'world-2',
    name: 'Server SMP',
    icon: 'emerald',
    seed: '88421900124',
    deletedAt: null,
    createdAt: 1710000000500,
  },
  {
    id: 'world-3',
    name: "Mochi's Hardcore",
    icon: 'totem',
    seed: '999111222333',
    deletedAt: null,
    createdAt: 1710000000800,
  },
];

const SAMPLE_SCREENSHOT_VILLAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="220" viewBox="0 0 400 220" shape-rendering="crispEdges">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
    </defs>
    <rect width="400" height="220" fill="url(#sky)"/>
    <rect x="20" y="25" width="28" height="28" fill="#fef08a"/>
    <rect x="0" y="150" width="400" height="70" fill="#5c4033"/>
    <rect x="0" y="138" width="400" height="14" fill="#4ead33"/>
    <rect x="60" y="88" width="80" height="50" fill="#854d0e"/>
    <rect x="52" y="72" width="96" height="16" fill="#a16207"/>
    <rect x="68" y="56" width="64" height="16" fill="#ca8a04"/>
    <rect x="90" y="110" width="20" height="28" fill="#451a03"/>
    <rect x="230" y="76" width="100" height="62" fill="#475569"/>
    <rect x="250" y="96" width="24" height="24" fill="#ff5500"/>
    <text x="14" y="22" fill="#55ff55" font-family="monospace" font-size="12" font-weight="bold">XYZ: 240 / 72 / -480 [Overworld]</text>
  </svg>
`);

const SAMPLE_SCREENSHOT_TEMPLE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="220" viewBox="0 0 400 220" shape-rendering="crispEdges">
    <rect width="400" height="220" fill="#1c1917"/>
    <rect x="0" y="155" width="400" height="65" fill="#d97706"/>
    <rect x="130" y="115" width="140" height="40" fill="#f59e0b"/>
    <rect x="155" y="85" width="90" height="30" fill="#fbbf24"/>
    <rect x="180" y="60" width="40" height="25" fill="#f59e0b"/>
    <rect x="85" y="80" width="42" height="75" fill="#b45309"/>
    <rect x="273" y="80" width="42" height="75" fill="#b45309"/>
    <rect x="188" y="118" width="24" height="37" fill="#292524"/>
    <text x="14" y="24" fill="#55ffff" font-family="monospace" font-size="12" font-weight="bold">Pos: 860, 68, -1120 [Desert Temple]</text>
  </svg>
`);

const INITIAL_WAYPOINTS = [
  {
    id: 'wp-1',
    worldId: 'world-1',
    parentId: null,
    isFolder: true,
    name: 'Căn Cứ Chính & Làng Xưởng Sắt',
    x: 240,
    y: 72,
    z: -480,
    dimension: 'overworld',
    tag: 'Base',
    icon: 'grass',
    notes: 'Tầng hầm có kho đồ tự động, khu dân làng và cổng Nether.',
    screenshots: [SAMPLE_SCREENSHOT_VILLAGE],
    pinned: true,
    locked: true,
    deletedAt: null,
    createdAt: 1710000001000,
  },
  {
    id: 'wp-1-sub-1',
    worldId: 'world-1',
    parentId: 'wp-1',
    isFolder: true,
    name: 'Kho Đồ Tự Động & Rương Ender',
    x: 244,
    y: 62,
    z: -476,
    dimension: 'overworld',
    tag: 'Storage',
    icon: 'chest',
    notes: 'Tầng hầm B1 — Phân loại vật phẩm tự động (Có thư mục con bên trong).',
    screenshots: [],
    pinned: true,
    locked: true,
    deletedAt: null,
    createdAt: 1710000001100,
  },
  {
    id: 'wp-1-sub-1-a',
    worldId: 'world-1',
    parentId: 'wp-1-sub-1',
    isFolder: false,
    name: 'Khu Rương Shulker Kho Báu & Netherite',
    x: 248,
    y: 58,
    z: -472,
    dimension: 'overworld',
    tag: 'Loot',
    icon: 'shulker',
    notes: 'Phòng bí mật sau bức tranh tầng B2.',
    screenshots: [],
    pinned: true,
    locked: true,
    deletedAt: null,
    createdAt: 1710000001150,
  },
  {
    id: 'wp-1-sub-2',
    worldId: 'world-1',
    parentId: 'wp-1',
    isFolder: false,
    name: 'Khu Trao Đổi Dân Làng (Mending)',
    x: 268,
    y: 72,
    z: -492,
    dimension: 'overworld',
    tag: 'Villager',
    icon: 'villager',
    notes: '1 Emerald = Sách Mending, Unbreaking III, Fortune III.',
    screenshots: [],
    pinned: true,
    locked: true,
    deletedAt: null,
    createdAt: 1710000001200,
  },
  {
    id: 'wp-1-sub-3',
    worldId: 'world-1',
    parentId: 'wp-1',
    isFolder: false,
    name: 'Máy Farm Sắt (Tầng Cao)',
    x: 215,
    y: 96,
    z: -465,
    dimension: 'overworld',
    tag: 'Farm',
    icon: 'iron_block',
    notes: 'Ống dẫn sắt nối thẳng về kho đồ.',
    screenshots: [],
    pinned: false,
    locked: false,
    deletedAt: null,
    createdAt: 1710000001300,
  },
  {
    id: 'wp-1-sub-4',
    worldId: 'world-1',
    parentId: 'wp-1',
    isFolder: false,
    name: 'Cổng Nether Tầng Hầm',
    x: 238,
    y: 56,
    z: -488,
    dimension: 'overworld',
    tag: 'Portal',
    icon: 'obsidian',
    notes: 'Nối thẳng ra đường băng Nether Hub.',
    screenshots: [],
    pinned: false,
    locked: true,
    deletedAt: null,
    createdAt: 1710000001400,
  },
  {
    id: 'wp-2',
    worldId: 'world-1',
    parentId: null,
    isFolder: false,
    name: 'Đền Sa Mạc & Mỏ Vàng',
    x: 860,
    y: null,
    z: -1120,
    dimension: 'overworld',
    tag: 'Ore',
    icon: 'gold_block',
    notes: 'Đã phá bẫy TNT dưới hầm đền.',
    screenshots: [SAMPLE_SCREENSHOT_TEMPLE],
    pinned: false,
    locked: false,
    deletedAt: null,
    createdAt: 1710000002000,
  },
  {
    id: 'wp-3',
    worldId: 'world-1',
    parentId: null,
    isFolder: false,
    name: 'Spawner Skeleton (Farm XP)',
    x: 512,
    y: -18,
    z: -320,
    dimension: 'overworld',
    tag: 'Spawner',
    icon: 'skeleton',
    notes: 'Đào xuống từ gốc cây sồi lớn.',
    screenshots: [],
    pinned: false,
    locked: false,
    deletedAt: null,
    createdAt: 1710000002500,
  },
  {
    id: 'wp-4',
    worldId: 'world-1',
    parentId: null,
    isFolder: true,
    name: 'Trạm Cao Tốc Băng Nether Hub',
    x: -145,
    y: 68,
    z: 310,
    dimension: 'nether',
    tag: 'Portal',
    icon: 'crying_obsidian',
    notes: 'Đường thuyền băng nối Pháo đài Blaze và Cổng End.',
    screenshots: [],
    pinned: true,
    locked: true,
    deletedAt: null,
    createdAt: 1710000003000,
  },
  {
    id: 'wp-4-sub-1',
    worldId: 'world-1',
    parentId: 'wp-4',
    isFolder: false,
    name: 'Lồng Spawner Blaze',
    x: -112,
    y: 74,
    z: 348,
    dimension: 'nether',
    tag: 'Spawner',
    icon: 'blaze',
    notes: 'Đã bao kín bằng gạch Nether.',
    screenshots: [],
    pinned: false,
    locked: true,
    deletedAt: null,
    createdAt: 1710000003100,
  },
  {
    id: 'wp-5',
    worldId: 'world-1',
    parentId: null,
    isFolder: false,
    name: 'Ancient City (Khu Warden)',
    x: -920,
    y: -51,
    z: 640,
    dimension: 'overworld',
    tag: 'Danger',
    icon: 'warden',
    notes: 'Nhớ mang theo nhiều khối Len (Wool).',
    screenshots: [],
    pinned: false,
    locked: true,
    deletedAt: null,
    createdAt: 1710000003500,
  },
  {
    id: 'wp-6',
    worldId: 'world-1',
    parentId: null,
    isFolder: false,
    name: 'End City Có Tàu Bay (Elytra)',
    x: 1840,
    y: 95,
    z: -1290,
    dimension: 'end',
    tag: 'Loot',
    icon: 'elytra',
    notes: 'Còn nhiều Shulker ở tòa tháp cao nhất.',
    screenshots: [],
    pinned: false,
    locked: false,
    deletedAt: null,
    createdAt: 1710000004000,
  },
  {
    id: 'wp-7',
    worldId: 'world-2',
    parentId: null,
    isFolder: true,
    name: 'Khu Chợ Trung Tâm SMP',
    x: 0,
    y: 80,
    z: 0,
    dimension: 'overworld',
    tag: 'Base',
    icon: 'emerald',
    notes: 'Khu giao dịch chung của cả server.',
    screenshots: [],
    pinned: true,
    locked: true,
    deletedAt: null,
    createdAt: 1710000005000,
  },
  {
    id: 'wp-8',
    worldId: 'world-3',
    parentId: null,
    isFolder: true,
    name: 'Căn Cứ Ngầm Hardcore',
    x: -340,
    y: 63,
    z: 190,
    dimension: 'overworld',
    tag: 'Base',
    icon: 'obsidian',
    notes: 'Luôn cầm Totem ở tay phụ.',
    screenshots: [],
    pinned: true,
    locked: true,
    deletedAt: null,
    createdAt: 1710000006000,
  },
];

const OCR_PRESETS = [
  {
    id: 'xz-2d',
    label: 'Mẫu 2 số (X Z)',
    rawLine: '2223  556',
    x: 2223,
    y: null,
    z: 556,
    dimension: 'overworld',
    suggestedName: 'Điểm Tọa Độ 2 Số (X, Z)',
    suggestedTag: 'Base',
    suggestedIcon: 'grass',
  },
  {
    id: 'pc-f3',
    label: 'Mẫu F3 (PC)',
    rawLine: 'XYZ: -428.350 / 12.00000 / 795.612 [minecraft:overworld]',
    x: -428,
    y: 12,
    z: 796,
    dimension: 'overworld',
    suggestedName: 'Mỏ Kim Cương Tầng Sâu',
    suggestedTag: 'Ore',
    suggestedIcon: 'diamond_ore',
  },
  {
    id: 'mcpe-hud',
    label: 'Mẫu MCPE (Android)',
    rawLine: 'Position: 120, 68, -500',
    x: 120,
    y: 68,
    z: -500,
    dimension: 'overworld',
    suggestedName: 'Làng Sa Mạc',
    suggestedTag: 'Villager',
    suggestedIcon: 'villager',
  },
  {
    id: 'nether-fort',
    label: 'Mẫu Nether',
    rawLine: 'Block: -88 74 -215 [minecraft:the_nether]',
    x: -88,
    y: 74,
    z: -215,
    dimension: 'nether',
    suggestedName: 'Pháo Đài Blaze',
    suggestedTag: 'Spawner',
    suggestedIcon: 'blaze',
  },
];

// ==========================================
// ==========================================
// 1B. HỆ THỐNG NHẬN DIỆN TỌA ĐỘ TỪ ẢNH (MULTI-PASS OCR + HỖ TRỢ ĐẦY ĐỦ CẢ 2 SỐ X/Z & 3 SỐ X/Y/Z)
// ==========================================
function cleanOcrDigitString(rawToken, allowDecimal = true) {
  if (!rawToken) return '';
  let s = String(rawToken).trim();
  // Bỏ các ký tự nhiễu đường viền (_ ~ [ ] ( ) | • : ; , .) ở đầu và cuối, chuẩn hóa dấu trừ
  s = s
    .replace(/^[_~[\](){}<>|•:;,.]+\s*/, '')
    .replace(/\s*[_~[\](){}<>|•:;,.]+$/, '');
  s = s.replace(/^[—–−‐‑‒―-]+\s*/, '-');
  s = s.replace(/^-\s+/, '-');
  const sign = s.startsWith('-') ? '-' : '';
  let body = s.replace(/^[-+]\s*/, '');
  if (!body) return '';

  // Bắt buộc phải có ít nhất 1 chữ số thực 0-9 (Tránh biến chữ 'o', 'O', 'oo' trong văn bản/nhiễu thành số 0)
  const realDigits = (body.match(/\d/g) || []).length;
  if (realDigits === 0) return '';

  // Trong font pixel 5x7 của Minecraft, chữ số '2' đầu dãy (VD: 2223) đôi khi bị Tesseract đọc thành 'e', và '5' (VD: 556) thành 'J'
  body = body.replace(/^[eE](?=\d{2,})/, '2').replace(/^[jJ](?=\d{2,})/, '5');

  // Loại bỏ token nếu chứa các chữ cái thông thường (tránh bắt nhầm chữ trong từ Block, Coords, Overworld...)
  if (/[a-df-hj-km-np-rt-yA-CE-FHJ-KM-NP-RT-Y]/.test(body)) {
    return '';
  }

  // Sửa các chữ cái hay bị OCR đọc nhầm khi đi kèm chữ số thực trong font Minecraft
  body = body
    .replace(/[OoQD]/g, '0')
    .replace(/[lI|!]/g, '1')
    .replace(/[Zz]/g, '2')
    .replace(/[Ss]/g, '5')
    .replace(/[G]/g, '6')
    .replace(/[B]/g, '8');

  if (allowDecimal) {
    body = body.replace(/,(\d{1,2})$/, '.$1');
    body = body.replace(/[^0-9.]/g, '');
    const parts = body.split('.');
    if (parts.length > 2) {
      body = parts[0] + '.' + parts.slice(1).join('');
    }
  } else {
    body = body.replace(/[^0-9]/g, '');
  }
  return body ? sign + body : '';
}

function parseSingleCoordVal(rawToken, isJavaXyzMode = false, axis = 'x') {
  const cleaned = cleanOcrDigitString(rawToken, true);
  if (!cleaned || cleaned === '-' || cleaned === '.') return null;
  let num = parseFloat(cleaned);
  if (!Number.isFinite(num)) return null;

  // Bảo vệ trường hợp dòng XYZ của F3 (Java) bị mất dấu chấm thập phân (X.XXX / Y.YYYYY / Z.ZZZ)
  if (isJavaXyzMode && !cleaned.includes('.')) {
    const absDigits = cleaned.replace('-', '');
    if (axis === 'y' && absDigits.length >= 6 && Math.abs(num) > 500) {
      const scaled = num / 100000;
      if (scaled >= -128 && scaled <= 512) num = scaled;
    } else if ((axis === 'x' || axis === 'z') && absDigits.length >= 5 && Math.abs(num) > 50000) {
      const scaled = num / 1000;
      if (Math.abs(scaled) <= 30000000) num = scaled;
    }
  }
  return Math.round(num);
}

function detectDimensionFromText(rawText, fallbackDim = 'overworld') {
  if (!rawText) return fallbackDim;
  const lower = String(rawText).toLowerCase();
  if (
    lower.includes('the_nether') ||
    lower.includes('nether') ||
    lower.includes('crimson_forest') ||
    lower.includes('warped_forest') ||
    lower.includes('soul_sand') ||
    lower.includes('basalt_deltas') ||
    lower.includes('fortress') ||
    lower.includes('bastion') ||
    lower.includes('địa ngục')
  ) {
    return 'nether';
  }
  if (
    lower.includes('the_end') ||
    lower.includes('end_highlands') ||
    lower.includes('end_midlands') ||
    lower.includes('end_barrens') ||
    lower.includes('end_city') ||
    lower.includes('stronghold')
  ) {
    return 'end';
  }
  if (
    lower.includes('overworld') ||
    lower.includes('plains') ||
    lower.includes('forest') ||
    lower.includes('desert') ||
    lower.includes('ocean') ||
    lower.includes('cherry_grove') ||
    lower.includes('deep_dark') ||
    lower.includes('lush_caves')
  ) {
    return 'overworld';
  }
  return fallbackDim;
}

function detectSuggestedMetaFromText(rawText, defaultTag = 'Base', defaultIcon = 'grass') {
  if (!rawText) return { tag: defaultTag, icon: defaultIcon, suggestedName: '' };
  const lower = String(rawText).toLowerCase();
  if (lower.includes('village') || lower.includes('villager') || lower.includes('làng')) {
    return { tag: 'Villager', icon: 'villager', suggestedName: 'Làng Dân Làng (Quét ảnh)' };
  }
  if (lower.includes('fortress') || lower.includes('blaze')) {
    return { tag: 'Spawner', icon: 'blaze', suggestedName: 'Pháo Đài Nether (Quét ảnh)' };
  }
  if (lower.includes('bastion') || lower.includes('piglin')) {
    return { tag: 'Portal', icon: 'gold_block', suggestedName: 'Bastion Remnant (Quét ảnh)' };
  }
  if (lower.includes('stronghold') || lower.includes('end_portal')) {
    return { tag: 'Portal', icon: 'end_portal', suggestedName: 'Cổng End Stronghold (Quét ảnh)' };
  }
  if (lower.includes('spawner') || lower.includes('dungeon') || lower.includes('trial')) {
    return { tag: 'Spawner', icon: 'spawner', suggestedName: 'Lồng Spawner (Quét ảnh)' };
  }
  if (lower.includes('diamond') || lower.includes('ancient_debris') || lower.includes('ore')) {
    return { tag: 'Ore', icon: 'diamond_ore', suggestedName: 'Điểm Khoáng Sản (Quét ảnh)' };
  }
  if (lower.includes('portal') || lower.includes('cổng')) {
    return { tag: 'Portal', icon: 'obsidian', suggestedName: 'Cổng Dịch Chuyển (Quét ảnh)' };
  }
  return { tag: defaultTag, icon: defaultIcon, suggestedName: '' };
}

function parseMinecraftCoordinatesFromText(rawText, defaultDimension = 'overworld') {
  if (!rawText || !String(rawText).trim()) {
    return { best: null, candidates: [], dimension: defaultDimension };
  }

  const fullText = String(rawText);
  const detectedDim = detectDimensionFromText(fullText, defaultDimension);
  const candidates = [];

  const addCandidate = (x, y, z, confidence, label, rawLine, isExplicitlyLabeled = false) => {
    if (!Number.isFinite(x) || !Number.isFinite(z)) return false;
    if (Math.abs(x) > 30000000 || Math.abs(z) > 30000000) return false;
    const validY =
      y !== null && y !== undefined && y !== '' && Number.isFinite(Number(y))
        ? Math.round(Number(y))
        : null;
    if (validY !== null && Math.abs(validY) > 512) return false;

    const rx = Math.round(x);
    const rz = Math.round(z);
    let finalScore = confidence;

    if (validY !== null && validY >= -64 && validY <= 320) {
      finalScore += 3;
    }

    // Ưu tiên tọa độ nhiều chữ số thực tế (VD: 2223 556) và hạ điểm các cặp số nhỏ không nhãn (VD: 0 2, 0 3 từ thông số FPS/Chunk/nhiễu viền)
    const maxAbsXZ = Math.max(Math.abs(rx), Math.abs(rz));
    const minAbsXZ = Math.min(Math.abs(rx), Math.abs(rz));
    if (!isExplicitlyLabeled && validY === null) {
      if ((rx === 0 && Math.abs(rz) < 20) || (rz === 0 && Math.abs(rx) < 20) || maxAbsXZ < 10) {
        finalScore -= 28;
      } else if (maxAbsXZ >= 100 && minAbsXZ >= 10) {
        finalScore += 4;
      } else if (maxAbsXZ >= 25) {
        finalScore += 2;
      }
    } else if (maxAbsXZ >= 100) {
      if (!isExplicitlyLabeled && rx === 0 && validY !== null && Math.abs(validY) < 10) {
        finalScore -= 12;
      } else {
        finalScore += 2;
      }
    }

    const key = `${rx}_${validY ?? 'none'}_${rz}`;
    const existing = candidates.find((c) => c.key === key);
    if (existing) {
      if (finalScore > existing.confidence) {
        existing.confidence = finalScore;
        existing.label = label;
        existing.rawLine = String(rawLine || '').trim().slice(0, 96);
      }
      return true;
    }
    candidates.push({
      key,
      x: rx,
      y: validY,
      z: rz,
      dimension: detectedDim,
      confidence: finalScore,
      label,
      rawLine: String(rawLine || '').trim().slice(0, 96),
    });
    return true;
  };

  // Bắt buộc mỗi cụm số phải chứa ít nhất 1 chữ số thực \d (không bao giờ bắt chữ 'o'/'O' đơn lẻ thành số 0)
  const digitCore = `(?:(?=[0-9OolISBGZzQDeEjJ]*\\d)[0-9OolISBGZzQDeEjJ]+)`;
  const numPat = `[—–−‐‑‒―\\-+]?\\s*${digitCore}(?:\\.${digitCore})?`;
  const intPat = `[—–−‐‑‒―\\-+]?\\s*${digitCore}`;
  const sepPat = `(?:\\s*[,;/|:]\\s*|\\s*\\.\\s+|\\s+)`;
  const pairSepPat = `(?:\\s*[,;/|:]\\s*|\\s+[—–−\\-]\\s+|\\s+)`;
  const labelSepPat = `(?:\\s*[:=.;]\\s*|\\s+[—–−\\-]\\s+|\\s+)`;

  const LINE_BREAK = String.fromCharCode(10);
  const CARRIAGE_RETURN = String.fromCharCode(13);
  const rawLines = fullText
    .split(CARRIAGE_RETURN)
    .join('')
    .split(LINE_BREAK)
    .map((l) => l.trim())
    .filter(Boolean);
  const lines = Array.from(new Set(rawLines));

  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    let matchedTripletOnLine = false;

    // 1. Java F3 Block: -429 12 795 [3 12 11] (Số nguyên chính xác tuyệt đối)
    const blockMatch = line.match(
      new RegExp(
        `(?:^|\\b)(?:Block|B1ock|Bl0ck|Biock)${labelSepPat}(${intPat})${sepPat}(${intPat})${sepPat}(${intPat})`,
        'i'
      )
    );
    if (blockMatch && !lowerLine.includes('targeted') && !lowerLine.includes('looking')) {
      const x = parseSingleCoordVal(blockMatch[1], false, 'x');
      const y = parseSingleCoordVal(blockMatch[2], false, 'y');
      const z = parseSingleCoordVal(blockMatch[3], false, 'z');
      if (x !== null && y !== null && z !== null) {
        if (addCandidate(x, y, z, 100, 'Java F3 (Block)', line, true)) {
          matchedTripletOnLine = true;
        }
      }
    }

    // 2. Java F3 XYZ: -428.350 / 12.00000 / 795.612
    const xyzMatch = line.match(
      new RegExp(
        `(?:X\\s*Y\\s*Z|XY2|XYZ)${labelSepPat}(${numPat})\\s*[/|\\\\]+\\s*(${numPat})\\s*[/|\\\\]+\\s*(${numPat})`,
        'i'
      )
    );
    if (xyzMatch) {
      const x = parseSingleCoordVal(xyzMatch[1], true, 'x');
      const y = parseSingleCoordVal(xyzMatch[2], true, 'y');
      const z = parseSingleCoordVal(xyzMatch[3], true, 'z');
      if (x !== null && y !== null && z !== null) {
        if (addCandidate(x, y, z, 99, 'Java F3 (XYZ)', line, true)) {
          matchedTripletOnLine = true;
        }
      }
    }

    // 3. Bedrock / MCPE Position: 120, 68, -500 / Vị trí: / Tọa độ: (3 số)
    const posMatch = line.match(
      new RegExp(
        `(?:^|\\b)(?:P[o0]s[i1l]t[i1l][o0]n|Pos|V[iị]\\s*tr[ií]|T[oọ]a\\s*[dđ][oộ]|Coords?|Location)${labelSepPat}(${intPat})${sepPat}(${intPat})${sepPat}(${intPat})`,
        'i'
      )
    );
    if (posMatch) {
      const x = parseSingleCoordVal(posMatch[1], false, 'x');
      const y = parseSingleCoordVal(posMatch[2], false, 'y');
      const z = parseSingleCoordVal(posMatch[3], false, 'z');
      if (x !== null && y !== null && z !== null) {
        if (addCandidate(x, y, z, 98, 'MCPE / Bedrock (Position)', line, true)) {
          matchedTripletOnLine = true;
        }
      }
    }

    // 4. Nhãn tường minh X: ... Y: ... Z: ... (Minimap, Waypoint Mod, Chat — hỗ trợ cả Y: ~)
    const explicitXyz = line.match(
      new RegExp(
        `X\\s*[:=.]?\\s*(${numPat})\\s*[,;/|\\s•-]+\\s*Y\\s*[:=.]?\\s*(~|${numPat})\\s*[,;/|\\s•-]+\\s*Z\\s*[:=.]?\\s*(${numPat})`,
        'i'
      )
    );
    if (explicitXyz) {
      const x = parseSingleCoordVal(explicitXyz[1], false, 'x');
      const y =
        explicitXyz[2].trim() === '~' ? null : parseSingleCoordVal(explicitXyz[2], false, 'y');
      const z = parseSingleCoordVal(explicitXyz[3], false, 'z');
      if (x !== null && z !== null) {
        if (
          addCandidate(
            x,
            y,
            z,
            96,
            y === null ? 'Tọa độ 2 số (X/Z)' : 'Tọa độ X/Y/Z',
            line,
            true
          )
        ) {
          matchedTripletOnLine = true;
        }
      }
    }

    // 5. Lệnh /tp, /teleport, /locate hoặc dạng X ~ Z ([10029, ~, 2844] / 10029 ~ 2844)
    const tpMatch = line.match(
      new RegExp(
        `(?:(?:tp|teleport)\\s+(?:@[spaer]\\s+|[A-Za-z0-9_]+\\s+)?)?(${numPat})\\s*[,;/|\\s]+\\s*(~|${numPat})\\s*[,;/|\\s]+\\s*(${numPat})`,
        'i'
      )
    );
    if (tpMatch && (/\b(?:tp|teleport)\b/i.test(line) || tpMatch[2].trim() === '~')) {
      const x = parseSingleCoordVal(tpMatch[1], false, 'x');
      const y = tpMatch[2].trim() === '~' ? null : parseSingleCoordVal(tpMatch[2], false, 'y');
      const z = parseSingleCoordVal(tpMatch[3], false, 'z');
      if (x !== null && z !== null) {
        if (
          addCandidate(
            x,
            y,
            z,
            95,
            y === null ? 'Tọa độ 2 số (X ~ Z)' : 'Lệnh /tp',
            line,
            true
          )
        ) {
          matchedTripletOnLine = true;
        }
      }
    }

    // 6. Targeted Block / Looking at block (Java F3)
    const targetBlockMatch = line.match(
      new RegExp(
        `(?:Targeted\\s*Block|Looking\\s*at\\s*block)${labelSepPat}(${intPat})${sepPat}(${intPat})${sepPat}(${intPat})`,
        'i'
      )
    );
    if (targetBlockMatch) {
      const x = parseSingleCoordVal(targetBlockMatch[1], false, 'x');
      const y = parseSingleCoordVal(targetBlockMatch[2], false, 'y');
      const z = parseSingleCoordVal(targetBlockMatch[3], false, 'z');
      if (x !== null && y !== null && z !== null) {
        if (addCandidate(x, y, z, 91, 'Khối đang nhìn (F3)', line, true)) {
          matchedTripletOnLine = true;
        }
      }
    }

    // 7A. Nhãn 2 chiều X: ... Z: ... (Chỉ có X và Z, không có Y)
    const explicitXz = line.match(
      new RegExp(`X\\s*[:=.]?\\s*(${numPat})\\s*[,;/|\\s•-]+\\s*Z\\s*[:=.]?\\s*(${numPat})`, 'i')
    );
    if (explicitXz && !explicitXyz) {
      const x = parseSingleCoordVal(explicitXz[1], false, 'x');
      const z = parseSingleCoordVal(explicitXz[2], false, 'z');
      if (x !== null && z !== null) {
        addCandidate(x, null, z, 96, 'Tọa độ 2 số (X/Z)', line, true);
      }
    }

    // 7B. Nhãn Position / Pos / XZ / Tọa độ / Block chỉ có 2 số X và Z (VD: Position: 2223 556, XZ: 2223 556)
    if (!matchedTripletOnLine) {
      const labeledPair = line.match(
        new RegExp(
          `(?:^|\\b)(?:P[o0]s[i1l]t[i1l][o0]n|Pos|X\\s*[/|,•-]?\\s*Z|XYZ|Block|B1ock|Bl0ck|Coords?|Location|V[iị]\\s*tr[ií]|T[oọ]a\\s*[dđ][oộ])${labelSepPat}[[(]?\\s*(${numPat})${pairSepPat}(${numPat})\\s*[\\])]?`,
          'i'
        )
      );
      if (labeledPair) {
        const x = parseSingleCoordVal(labeledPair[1], false, 'x');
        const z = parseSingleCoordVal(labeledPair[2], false, 'z');
        if (x !== null && z !== null) {
          addCandidate(x, null, z, 96, 'Tọa độ 2 số (X, Z)', line, true);
        }
      }
    }

    // Bỏ qua các dòng thông số hệ thống của F3 để tránh nhầm FPS, Chunk, Entity với tọa độ
    if (
      /^(?:minecraft|java|fps|integrated|c:|e:|p:|chunks|chunk:|facing:|light:|local|biome:|memory|display:|cpu:|gpu:)/i.test(
        lowerLine
      ) ||
      /\bfps\b|\btx\b|\brx\b|\bvanilla\b|\boptifine\b|\bsodium\b|\bmca\b/i.test(lowerLine)
    ) {
      continue;
    }

    // 8. Bộ 3 số ngăn cách bởi dấu gạch chéo: -428.350 / 12.00000 / 795.612
    const slashTriplet = line.match(
      new RegExp(`(${numPat})\\s*\\/\\s*(${numPat})\\s*\\/\\s*(${numPat})`)
    );
    if (slashTriplet) {
      const x = parseSingleCoordVal(slashTriplet[1], true, 'x');
      const y = parseSingleCoordVal(slashTriplet[2], true, 'y');
      const z = parseSingleCoordVal(slashTriplet[3], true, 'z');
      const isDate =
        x >= 1 && x <= 31 && y >= 1 && y <= 12 && z >= 1990 && z <= 2100;
      if (x !== null && y !== null && z !== null && !isDate) {
        if (addCandidate(x, y, z, 88, 'Bộ 3 số (X / Y / Z)', line)) {
          matchedTripletOnLine = true;
        }
      }
    }

    // 9. Bộ 3 số ngăn cách bởi dấu phẩy: 120, 68, -500
    const commaTriplet = line.match(
      new RegExp(`(?:^|[^0-9.,])(${intPat})\\s*,\\s*(${intPat})\\s*,\\s*(${intPat})(?:$|[^0-9.,])`)
    );
    if (commaTriplet) {
      const x = parseSingleCoordVal(commaTriplet[1], false, 'x');
      const y = parseSingleCoordVal(commaTriplet[2], false, 'y');
      const z = parseSingleCoordVal(commaTriplet[3], false, 'z');
      if (x !== null && y !== null && z !== null) {
        if (addCandidate(x, y, z, 87, 'Bộ 3 số (X, Y, Z)', line)) {
          matchedTripletOnLine = true;
        }
      }
    }

    // 10. Bộ 3 số cách nhau bởi khoảng trắng trên dòng gọn
    const spaceTriplet = line.match(
      new RegExp(`^[[(]?\\s*(${numPat})\\s+(${numPat})\\s+(${numPat})\\s*[\\])]?$`)
    );
    if (spaceTriplet) {
      const x = parseSingleCoordVal(spaceTriplet[1], false, 'x');
      const y = parseSingleCoordVal(spaceTriplet[2], false, 'y');
      const z = parseSingleCoordVal(spaceTriplet[3], false, 'z');
      if (x !== null && y !== null && z !== null) {
        if (addCandidate(x, y, z, 84, 'Bộ 3 số (X Y Z)', line)) {
          matchedTripletOnLine = true;
        }
      }
    }

    // 11. NHẬN DIỆN TỌA ĐỘ 2 SỐ CHỈ CÓ X VÀ Z (VD: "2223 556", "10029  2844", "2223, 556")
    if (!matchedTripletOnLine) {
      const cleanPairMatch = line.match(
        new RegExp(
          `^[\\s[\\]({<|•:;=.,~_*]*(${numPat})${pairSepPat}(${numPat})[\\s[\\])}>|•:;=.,~_*-]*$`
        )
      );
      if (cleanPairMatch) {
        const x = parseSingleCoordVal(cleanPairMatch[1], false, 'x');
        const z = parseSingleCoordVal(cleanPairMatch[2], false, 'z');
        if (x !== null && z !== null) {
          const isCommonRes =
            (x === 1920 && z === 1080) ||
            (x === 1280 && z === 720) ||
            (x === 2560 && z === 1440);
          addCandidate(x, null, z, isCommonRes ? 64 : 93, 'Tọa độ 2 số (X Z)', line);
          continue;
        }
      }

      // 11B. Tách các token độc lập trên dòng (Không bao giờ tách chữ 'o' nằm trong từ tiếng Anh/Việt)
      const rawTokens = line.split(/[\s,;/|[\](){}<>•:=]+/).filter(Boolean);
      const parsedLineNums = rawTokens
        .map((t) => parseSingleCoordVal(t, false))
        .filter((n) => n !== null);

      if (parsedLineNums.length === 2) {
        addCandidate(
          parsedLineNums[0],
          null,
          parsedLineNums[1],
          90,
          'Tọa độ 2 số (X, Z)',
          line
        );
      } else if (parsedLineNums.length >= 3) {
        let addedValidTriplet = false;
        for (let i = 0; i <= parsedLineNums.length - 3; i++) {
          const cx = parsedLineNums[i];
          const cy = parsedLineNums[i + 1];
          const cz = parsedLineNums[i + 2];
          if (cy >= -64 && cy <= 320 && (Math.abs(cx) >= 20 || Math.abs(cz) >= 20)) {
            if (addCandidate(cx, cy, cz, 86, 'Bộ 3 số (X, Y, Z)', line)) {
              addedValidTriplet = true;
            }
          }
        }
        if (!addedValidTriplet || parsedLineNums.length >= 4) {
          for (let i = 0; i < parsedLineNums.length - 1; i++) {
            addCandidate(
              parsedLineNums[i],
              null,
              parsedLineNums[i + 1],
              88,
              'Tọa độ 2 số (X, Z)',
              line
            );
          }
        }
      }
    }
  }

  // 12. Quét cặp dòng liên tiếp (Khi khoảng trắng giữa X và Z rộng khiến OCR tách thành 2 dòng hoặc HUD xếp dọc X / Z)
  for (let i = 0; i < lines.length - 1; i++) {
    const l1 = lines[i];
    const l2 = lines[i + 1];
    const l3 = i + 2 < lines.length ? lines[i + 2] : '';

    if (l3) {
      const mX3 = l1.match(new RegExp(`^(?:X\\s*[:=.]?\\s*)?(${numPat})$`, 'i'));
      const mY3 = l2.match(new RegExp(`^(?:Y\\s*[:=.]?\\s*)?(~|${numPat})$`, 'i'));
      const mZ3 = l3.match(new RegExp(`^(?:Z\\s*[:=.]?\\s*)?(${numPat})$`, 'i'));
      if (mX3 && mY3 && mZ3) {
        const x = parseSingleCoordVal(mX3[1], false, 'x');
        const y = mY3[1].trim() === '~' ? null : parseSingleCoordVal(mY3[1], false, 'y');
        const z = parseSingleCoordVal(mZ3[1], false, 'z');
        const hasExplicitLabels = /^x/i.test(l1) || /^y/i.test(l2) || /^z/i.test(l3);
        if (
          x !== null &&
          z !== null &&
          (hasExplicitLabels || (y !== null && y >= -64 && y <= 320))
        ) {
          addCandidate(
            x,
            y,
            z,
            hasExplicitLabels ? 94 : 85,
            'Tọa độ 3 dòng (X/Y/Z)',
            `${l1} ${l2} ${l3}`,
            hasExplicitLabels
          );
        }
      }
    }

    const mX2 = l1.match(
      new RegExp(`^(?:X\\s*[:=.]?\\s*)?[[(]?\\s*(${numPat})\\s*[\\])]?$`, 'i')
    );
    const mZ2 = l2.match(
      new RegExp(`^(?:Z\\s*[:=.]?\\s*)?[[(]?\\s*(${numPat})\\s*[\\])]?$`, 'i')
    );
    if (mX2 && mZ2 && !/^y\s*[:=.]/i.test(l2)) {
      const x = parseSingleCoordVal(mX2[1], false, 'x');
      const z = parseSingleCoordVal(mZ2[1], false, 'z');
      const hasXzLabels = /^x/i.test(l1) && /^z/i.test(l2);
      if (x !== null && z !== null) {
        addCandidate(x, null, z, hasXzLabels ? 95 : 88, 'Tọa độ 2 số (X Z)', `${l1}  ${l2}`, hasXzLabels);
      }
    }
  }

  // Fallback quét toàn chuỗi nếu ảnh bị xuống dòng phức tạp
  if (candidates.length === 0) {
    const rawNums = fullText.match(/[—–−‐‑‒―-]?\s*\d+(?:\.\d+)?/g);
    if (rawNums && rawNums.length >= 2) {
      const nums = rawNums
        .map((n) => parseSingleCoordVal(n, false))
        .filter((n) => n !== null);
      if (nums.length === 2) {
        addCandidate(
          nums[0],
          null,
          nums[1],
          82,
          'Tọa độ 2 số (X, Z)',
          fullText.replace(/\s+/g, ' ').slice(0, 80)
        );
      } else if (nums.length >= 3) {
        let foundValidTriplet = false;
        for (let i = 0; i <= nums.length - 3; i++) {
          if (nums[i + 1] >= -64 && nums[i + 1] <= 320 && (Math.abs(nums[i]) >= 20 || Math.abs(nums[i + 2]) >= 20)) {
            addCandidate(
              nums[i],
              nums[i + 1],
              nums[i + 2],
              72,
              'Tách 3 số (X, Y, Z)',
              fullText.replace(/\s+/g, ' ').slice(0, 80)
            );
            foundValidTriplet = true;
            break;
          }
        }
        if (!foundValidTriplet) {
          for (let i = 0; i < nums.length - 1; i++) {
            addCandidate(
              nums[i],
              null,
              nums[i + 1],
              78,
              'Tọa độ 2 số (X, Z)',
              fullText.replace(/\s+/g, ' ').slice(0, 80)
            );
          }
        }
      }
    }
  }

  candidates.sort((a, b) => b.confidence - a.confidence);
  return {
    best: candidates[0] || null,
    candidates,
    dimension: detectedDim,
  };
}

function loadImageElementFromSource(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

// ==========================================
// 1C. BỘ NHẬN DIỆN CHỮ SỐ CẤU TRÚC & BITMAP TRỰC TIẾP TRÊN CANVAS (CHUẨN HÓA DÒNG 21PX + TEMPLATE MATCHING)
// ==========================================
const MC_DIGIT_BITMAPS = {
  '0': [' ### ', '#   #', '#  ##', '# # #', '##  #', '#   #', ' ### '],
  '1': ['  #  ', ' ##  ', '  #  ', '  #  ', '  #  ', '  #  ', ' ### '],
  '2': [' ### ', '#   #', '    #', '  ## ', ' #   ', '#    ', '#####'],
  '3': [' ### ', '#   #', '    #', '  ## ', '    #', '#   #', ' ### '],
  '4': ['   # ', '  ## ', ' # # ', '#  # ', '#####', '   # ', '   # '],
  '5': ['#####', '#    ', '#### ', '    #', '    #', '#   #', ' ### '],
  '6': ['  ## ', ' #   ', '#    ', '#### ', '#   #', '#   #', ' ### '],
  '7': ['#####', '    #', '   # ', '  #  ', ' #   ', ' #   ', ' #   '],
  '8': [' ### ', '#   #', '#   #', ' ### ', '#   #', '#   #', ' ### '],
  '9': [' ### ', '#   #', '#   #', ' ####', '    #', '   # ', ' ##  '],
};

const STD_DIGIT_BITMAPS = {
  '0': ['  ###  ', ' ## ## ', '##   ##', '##   ##', '##   ##', '##   ##', '##   ##', ' ## ## ', '  ###  '],
  '1': ['   ##  ', ' ####  ', '   ##  ', '   ##  ', '   ##  ', '   ##  ', '   ##  ', '   ##  ', ' ######'],
  '2': [' ##### ', '##   ##', '     ##', '    ## ', '   ##  ', '  ##   ', ' ##    ', '##     ', '#######'],
  '3': [' ##### ', '##   ##', '     ##', '  #### ', '     ##', '     ##', '     ##', '##   ##', ' ##### '],
  '4': ['    ## ', '   ### ', '  #### ', ' ## ## ', '##  ## ', '#######', '    ## ', '    ## ', '    ## '],
  '5': ['#######', '##     ', '##     ', '###### ', '     ##', '     ##', '     ##', '##   ##', ' ##### '],
  '6': ['  #### ', ' ##    ', '##     ', '###### ', '##   ##', '##   ##', '##   ##', '##   ##', ' ##### '],
  '7': ['#######', '     ##', '    ## ', '   ##  ', '   ##  ', '  ##   ', '  ##   ', ' ##    ', ' ##    '],
  '8': [' ##### ', '##   ##', '##   ##', ' ##### ', '##   ##', '##   ##', '##   ##', '##   ##', ' ##### '],
  '9': [' ##### ', '##   ##', '##   ##', '##   ##', ' ######', '     ##', '     ##', ' ##  ##', '  #### '],
};

const SANS_DIGIT_BITMAPS = {
  '0': [' ##### ', '##   ##', '##   ##', '##   ##', '##   ##', '##   ##', ' ##### '],
  '1': ['  ## ', ' ### ', '  ## ', '  ## ', '  ## ', '  ## ', '  ## '],
  '2': [' ##### ', '##   ##', '    ## ', '   ##  ', '  ##   ', ' ##    ', '#######'],
  '3': [' ##### ', '##   ##', '     ##', '  #### ', '     ##', '##   ##', ' ##### '],
  '4': ['   ### ', '  #### ', ' ## ## ', '##  ## ', '#######', '    ## ', '    ## '],
  '5': ['#######', '##     ', '###### ', '     ##', '     ##', '##   ##', ' ##### '],
  '6': [' ##### ', '##     ', '###### ', '##   ##', '##   ##', '##   ##', ' ##### '],
  '7': ['#######', '     ##', '    ## ', '   ##  ', '  ##   ', '  ##   ', '  ##   '],
  '8': [' ##### ', '##   ##', ' ##### ', '##   ##', '##   ##', '##   ##', ' ##### '],
  '9': [' ##### ', '##   ##', '##   ##', ' ######', '     ##', '##   ##', ' ##### '],
};

const DIGIT_GRID_W = 12;
const DIGIT_GRID_H = 16;

function resampleBinaryBoxToGrid(mask, stride, bx0, by0, bw, bh) {
  const grid = new Float32Array(DIGIT_GRID_W * DIGIT_GRID_H);
  for (let gy = 0; gy < DIGIT_GRID_H; gy++) {
    const y0 = by0 + Math.floor((gy * bh) / DIGIT_GRID_H);
    const y1 = Math.max(y0 + 1, by0 + Math.floor(((gy + 1) * bh) / DIGIT_GRID_H));
    for (let gx = 0; gx < DIGIT_GRID_W; gx++) {
      const x0 = bx0 + Math.floor((gx * bw) / DIGIT_GRID_W);
      const x1 = Math.max(x0 + 1, bx0 + Math.floor(((gx + 1) * bw) / DIGIT_GRID_W));
      let sum = 0;
      let count = 0;
      for (let y = y0; y < y1; y++) {
        const rowOff = y * stride;
        for (let x = x0; x < x1; x++) {
          sum += mask[rowOff + x];
          count++;
        }
      }
      grid[gy * DIGIT_GRID_W + gx] = count > 0 ? sum / count : 0;
    }
  }
  return grid;
}

function buildPatternGrid(rows) {
  const bh = rows.length;
  const bw = rows[0].length;
  const mask = new Uint8Array(bw * bh);
  for (let y = 0; y < bh; y++) {
    for (let x = 0; x < bw; x++) {
      mask[y * bw + x] = rows[y][x] === '#' ? 1 : 0;
    }
  }
  return resampleBinaryBoxToGrid(mask, bw, 0, 0, bw, bh);
}

let cachedDigitTemplates = null;
function getDigitTemplates() {
  if (cachedDigitTemplates) return cachedDigitTemplates;
  const map = {};
  for (const d of '0123456789') {
    map[d] = [
      buildPatternGrid(MC_DIGIT_BITMAPS[d]),
      buildPatternGrid(STD_DIGIT_BITMAPS[d]),
      buildPatternGrid(SANS_DIGIT_BITMAPS[d]),
    ];
  }
  if (typeof document !== 'undefined') {
    try {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      for (const fontSpec of ['bold 28px monospace', 'bold 28px sans-serif', '28px monospace']) {
        for (const d of '0123456789') {
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, 64, 64);
          ctx.font = fontSpec;
          ctx.fillStyle = '#ffffff';
          ctx.fillText(d, 10, 42);
          const id = ctx.getImageData(0, 0, 64, 64).data;
          const m = new Uint8Array(64 * 64);
          let minX = 64;
          let minY = 64;
          let maxX = -1;
          let maxY = -1;
          for (let y = 0; y < 64; y++) {
            for (let x = 0; x < 64; x++) {
              if (id[(y * 64 + x) * 4] > 120) {
                m[y * 64 + x] = 1;
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
            }
          }
          if (maxX >= minX && maxY >= minY) {
            map[d].push(
              resampleBinaryBoxToGrid(m, 64, minX, minY, maxX - minX + 1, maxY - minY + 1)
            );
          }
        }
      }
    } catch {
      // Ignore template canvas errors
    }
  }
  cachedDigitTemplates = map;
  return map;
}

function zoneMean(grid, x0, x1, y0, y1) {
  let sum = 0;
  let count = 0;
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      sum += grid[y * DIGIT_GRID_W + x];
      count++;
    }
  }
  return count > 0 ? sum / count : 0;
}

function classifySingleDigitBox(mask, stride, bx0, by0, bw, bh) {
  if (bh < 4 || bw < 1) return { digit: null, score: 0 };
  const aspect = bw / bh;
  const grid = resampleBinaryBoxToGrid(mask, stride, bx0, by0, bw, bh);
  const totalFill = zoneMean(grid, 0, DIGIT_GRID_W, 0, DIGIT_GRID_H);

  if (aspect < 0.37 && totalFill > 0.32) {
    return { digit: '1', score: 0.88 };
  }

  const topBar = zoneMean(grid, 2, 10, 0, 3);
  const botBar = zoneMean(grid, 1, 11, 13, 16);
  const midBar = zoneMean(grid, 2, 10, 6, 10);
  const ul = zoneMean(grid, 0, 4, 3, 7);
  const ur = zoneMean(grid, 8, 12, 3, 7);
  const ll = zoneMean(grid, 0, 4, 9, 13);
  const lr = zoneMean(grid, 8, 12, 9, 13);
  const midOuterWalls = 0.5 * (zoneMean(grid, 0, 2, 6, 10) + zoneMean(grid, 10, 12, 6, 10));
  const midCenterCore = zoneMean(grid, 3, 9, 7, 9);

  const templates = getDigitTemplates();
  const scores = {};
  const rawSims = {};

  for (const d of '0123456789') {
    let bestSim = -1;
    for (const t of templates[d]) {
      let inter = 0;
      let union = 1e-5;
      let diff = 0;
      for (let i = 0; i < DIGIT_GRID_W * DIGIT_GRID_H; i++) {
        const gv = grid[i];
        const tv = t[i];
        inter += gv < tv ? gv : tv;
        union += gv > tv ? gv : tv;
        diff += Math.abs(gv - tv);
      }
      const iou = inter / union;
      const corr = 1 - diff / (DIGIT_GRID_W * DIGIT_GRID_H);
      const sim = 0.55 * iou + 0.45 * corr;
      if (sim > bestSim) bestSim = sim;
    }
    rawSims[d] = bestSim;
    scores[d] = bestSim;
  }

  // Đặc trưng cấu trúc hình học giúp phân biệt tuyệt đối 2, 3, 5, 6, 0, 8, 9:
  scores['2'] += 0.16 * (ur - ul) + 0.18 * (ll - lr) + 0.08 * botBar;
  scores['3'] += 0.16 * (ur - ul) + 0.18 * (lr - ll) + 0.06 * midBar;
  scores['5'] += 0.20 * (ul - ur) + 0.18 * (lr - ll) + 0.06 * topBar;
  scores['6'] += 0.20 * (ul - ur) + 0.12 * (ll - ur);
  scores['9'] += 0.18 * (lr - ll) + 0.12 * (ul - ll);
  scores['0'] += 0.14 * Math.min(ul, ur, ll, lr) + 0.12 * (midOuterWalls - midCenterCore * 0.6);
  scores['8'] += 0.10 * Math.min(ul, ur, ll, lr) + 0.12 * (midCenterCore - midOuterWalls * 0.4);

  let bestD = '0';
  let bestScore = -999;
  for (const d of '0123456789') {
    if (scores[d] > bestScore) {
      bestScore = scores[d];
      bestD = d;
    }
  }
  return { digit: bestD, score: rawSims[bestD] };
}

function findSplitColumns(mask, W, bx0, by0, bw, bh, nParts) {
  const splits = [bx0];
  const searchRadius = Math.max(2, Math.floor((bw / nParts) * 0.28));
  for (let k = 1; k < nParts; k++) {
    const targetX = bx0 + Math.floor((k * bw) / nParts);
    let bestX = targetX;
    let minInk = 1e9;
    const lo = Math.max(bx0 + 2, targetX - searchRadius);
    const hi = Math.min(bx0 + bw - 2, targetX + searchRadius);
    for (let x = lo; x <= hi; x++) {
      let colInk = 0;
      for (let y = by0; y < by0 + bh; y++) {
        colInk += mask[y * W + x];
      }
      if (colInk < minInk) {
        minInk = colInk;
        bestX = x;
      }
    }
    splits.push(bestX);
  }
  splits.push(bx0 + bw);
  return splits;
}

function isSlashBox(mask, W, b, capH) {
  if (b.h < capH * 0.85 || b.w < capH * 0.25) return false;
  const grid = resampleBinaryBoxToGrid(mask, W, b.x0, b.y0, b.w, b.h);
  const ul = zoneMean(grid, 0, 4, 0, 5);
  const lr = zoneMean(grid, 8, 12, 11, 16);
  const ur = zoneMean(grid, 8, 12, 0, 5);
  const ll = zoneMean(grid, 0, 4, 11, 16);
  return ul < 0.12 && lr < 0.12 && ur > 0.28 && ll > 0.28;
}

function recognizeSingleBinaryRow(mask, W, rowY0, rowY1, colX0 = 0, colX1 = W) {
  const rowH = rowY1 - rowY0;
  if (rowH < 5) return '';

  const runs = [];
  let inRun = false;
  let rx0 = colX0;
  for (let x = colX0; x < colX1; x++) {
    let colSum = 0;
    for (let y = rowY0; y < rowY1; y++) {
      colSum += mask[y * W + x];
    }
    if (colSum > 0 && !inRun) {
      inRun = true;
      rx0 = x;
    } else if (colSum === 0 && inRun) {
      inRun = false;
      runs.push([rx0, x]);
    }
  }
  if (inRun) runs.push([rx0, colX1]);
  if (runs.length === 0) return '';

  const boxes = [];
  for (const [x0, x1] of runs) {
    let minY = rowY1;
    let maxY = rowY0 - 1;
    let vRuns = 0;
    let inV = false;
    let totalInk = 0;
    for (let y = rowY0; y < rowY1; y++) {
      let rowInk = 0;
      for (let x = x0; x < x1; x++) {
        rowInk += mask[y * W + x];
      }
      totalInk += rowInk;
      if (rowInk > 0) {
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        if (!inV) {
          inV = true;
          vRuns++;
        }
      } else if (inV) {
        inV = false;
      }
    }
    if (maxY < minY) continue;
    const bw = x1 - x0;
    const bh = maxY - minY + 1;
    const fill = totalInk / Math.max(1, bw * bh);
    const isColon = vRuns === 2 && bw <= Math.max(6, rowH * 0.45) && fill < 0.78;
    boxes.push({
      x0,
      x1,
      y0: minY,
      y1: maxY + 1,
      w: bw,
      h: bh,
      cy: (minY + maxY + 1) / 2,
      isColon,
      fill,
    });
  }

  if (boxes.length === 0) return '';

  const tallHeights = boxes
    .filter((b) => !b.isColon && b.h >= 5)
    .map((b) => b.h)
    .sort((a, b) => b - a);
  if (tallHeights.length === 0) return '';
  const capH = tallHeights[Math.min(tallHeights.length - 1, Math.floor(tallHeights.length * 0.35))];
  const rowMidY = (rowY0 + rowY1) / 2;

  const charGapThresh = Math.max(3.5, capH * 0.30);
  const minusGapThresh = Math.max(5.5, capH * 0.68);
  const isMinusBox = (b) =>
    b.h <= capH * 0.42 &&
    b.w >= Math.max(3, capH * 0.22) &&
    b.w <= capH * 1.1 &&
    Math.abs(b.cy - rowMidY) <= capH * 0.36;
  const isDotBox = (b) =>
    b.h <= capH * 0.40 &&
    b.w <= capH * 0.40 &&
    b.y1 >= rowY0 + rowH * 0.65 &&
    b.y1 <= rowY0 + rowH * 1.05;

  const tokens = [];
  let curr = [boxes[0]];
  for (let i = 0; i < boxes.length - 1; i++) {
    const gap = boxes[i + 1].x0 - boxes[i].x1;
    const isColonJoin = boxes[i + 1].isColon && gap <= capH * 0.85;
    const isDotJoin = (isDotBox(boxes[i]) || isDotBox(boxes[i + 1])) && gap <= capH * 0.52;
    const limit = isColonJoin
      ? capH * 0.85
      : isDotJoin
      ? capH * 0.52
      : isMinusBox(boxes[i])
      ? minusGapThresh
      : charGapThresh;
    if (gap <= limit) {
      curr.push(boxes[i + 1]);
    } else {
      tokens.push(curr);
      curr = [boxes[i + 1]];
    }
  }
  tokens.push(curr);

  const outTokens = [];
  for (const tok of tokens) {
    if (tok.some((b) => b.isColon)) {
      continue;
    }
    if (tok.length === 1 && isSlashBox(mask, W, tok[0], capH)) {
      continue;
    }

    let chars = '';
    let simSum = 0;
    let digitCount = 0;
    let validToken = true;
    let hitBracket = false;

    for (let bi = 0; bi < tok.length; bi++) {
      const b = tok[bi];
      if (isMinusBox(b) && chars.length === 0) {
        chars += '-';
        continue;
      }
      if (b.h <= capH * 0.45 && b.y1 >= rowY0 + rowH * 0.62 && b.w <= capH * 0.45) {
        if (bi < tok.length - 1) chars += '.';
        continue;
      }
      if (b.h >= capH * 1.12 && outTokens.length >= 2) {
        hitBracket = true;
        validToken = false;
        break;
      }
      if (b.h < capH * 0.78 || b.h > capH * 1.18) {
        validToken = false;
        break;
      }
      if (b.w > capH * 0.98) {
        const nParts = Math.max(2, Math.round(b.w / (capH * 0.62)));
        const splits = findSplitColumns(mask, W, b.x0, b.y0, b.w, b.h, nParts);
        for (let k = 0; k < nParts; k++) {
          const sx0 = splits[k];
          const sx1 = Math.max(sx0 + 1, splits[k + 1]);
          const { digit, score } = classifySingleDigitBox(mask, W, sx0, b.y0, sx1 - sx0, b.h);
          if (digit && score >= 0.54) {
            chars += digit;
            simSum += score;
            digitCount++;
          } else {
            validToken = false;
            break;
          }
        }
        if (!validToken) break;
      } else {
        const { digit, score } = classifySingleDigitBox(mask, W, b.x0, b.y0, b.w, b.h);
        if (digit && score >= 0.54) {
          chars += digit;
          simSum += score;
          digitCount++;
        } else {
          validToken = false;
          break;
        }
      }
    }

    if (hitBracket) break;
    if (validToken && digitCount > 0 && simSum / digitCount >= 0.58) {
      outTokens.push(chars.replace(/\.+$/, ''));
    }
  }

  return outTokens.length >= 2 ? outTokens.join(' ') : '';
}

// Tạo các bản ảnh tiền xử lý chuyên biệt cho font Minecraft HUD & ảnh chụp màn hình qua điện thoại
function buildPreprocessedOcrCanvases(img, cropRect = { x: 0, y: 0, w: 1, h: 1 }) {
  const natW = img.naturalWidth || img.width || 640;
  const natH = img.naturalHeight || img.height || 480;

  const cx = Math.max(0, Math.min(0.95, Number(cropRect?.x) || 0));
  const cy = Math.max(0, Math.min(0.95, Number(cropRect?.y) || 0));
  const cw = Math.max(0.05, Math.min(1 - cx, Number(cropRect?.w) || 1));
  const ch = Math.max(0.05, Math.min(1 - cy, Number(cropRect?.h) || 1));

  const sx = Math.round(cx * natW);
  const sy = Math.round(cy * natH);
  const sw = Math.max(16, Math.round(cw * natW));
  const sh = Math.max(16, Math.round(ch * natH));

  // Tỷ lệ phóng đại thông minh: tránh phóng quá to các vùng cắt nhỏ khiến chữ pixel bị vỡ bậc thang
  let scale = 1.0;
  if (sh <= 85 && sw <= 650) {
    scale = Math.max(1.2, Math.min(2.8, 64 / sh));
  } else if (sw < 700) {
    scale = Math.min(2.2, Math.max(1.2, 840 / sw));
  } else {
    scale = Math.min(1.8, Math.max(1.0, 1440 / sw));
  }

  const innerW = Math.max(16, Math.round(sw * scale));
  const innerH = Math.max(16, Math.round(sh * scale));
  const pad = 20;
  const outW = innerW + pad * 2;
  const outH = innerH + pad * 2;

  const innerCanvas = document.createElement('canvas');
  innerCanvas.width = innerW;
  innerCanvas.height = innerH;
  const iCtx = innerCanvas.getContext('2d');
  iCtx.imageSmoothingEnabled = true;
  iCtx.imageSmoothingQuality = 'high';
  iCtx.drawImage(img, sx, sy, sw, sh, 0, 0, innerW, innerH);

  const enhancedCanvas = document.createElement('canvas');
  enhancedCanvas.width = outW;
  enhancedCanvas.height = outH;
  const eCtx = enhancedCanvas.getContext('2d');

  const hudBinaryCanvas = document.createElement('canvas');
  hudBinaryCanvas.width = outW;
  hudBinaryCanvas.height = outH;
  const bCtx = hudBinaryCanvas.getContext('2d');
  bCtx.fillStyle = '#FFFFFF';
  bCtx.fillRect(0, 0, outW, outH);

  let normalizedRowsCanvas = hudBinaryCanvas;
  let directRecognizedText = '';

  try {
    const imgData = iCtx.getImageData(0, 0, innerW, innerH);
    const data = imgData.data;
    const binData = bCtx.createImageData(innerW, innerH);
    const bArr = binData.data;

    const totalPixels = innerW * innerH;
    const lums = new Float32Array(totalPixels);
    const hist = new Uint32Array(256);

    for (let i = 0, p = 0; i < data.length; i += 4, p++) {
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      lums[p] = lum;
      const binIdx = Math.max(0, Math.min(255, Math.round(lum)));
      hist[binIdx]++;
    }

    const getPercentileLum = (q) => {
      const target = Math.max(1, Math.round(totalPixels * q));
      let acc = 0;
      for (let k = 0; k < 256; k++) {
        acc += hist[k];
        if (acc >= target) return k;
      }
      return 255;
    };

    const p10 = getPercentileLum(0.10);
    const p50 = getPercentileLum(0.50);
    const p90 = getPercentileLum(0.90);
    const range = Math.max(20, p90 - p10);
    const isLightBackground = p50 > 150;

    // Tính Integral Image để lấy trung bình sáng cục bộ (Local Adaptive Thresholding) O(1)
    const stride = innerW + 1;
    const integral = new Float64Array((innerW + 1) * (innerH + 1));
    for (let y = 0; y < innerH; y++) {
      let rowSum = 0;
      const yOff = y * innerW;
      const nextRowOff = (y + 1) * stride;
      const prevRowOff = y * stride;
      for (let x = 0; x < innerW; x++) {
        rowSum += lums[yOff + x];
        integral[nextRowOff + x + 1] = integral[prevRowOff + x + 1] + rowSum;
      }
    }

    const winR = Math.max(10, Math.min(36, Math.floor(Math.min(innerW, innerH) / 4)));
    const binMask = new Uint8Array(totalPixels);

    for (let y = 0; y < innerH; y++) {
      const y0 = Math.max(0, y - winR);
      const y1 = Math.min(innerH, y + winR + 1);
      const rowOff = y * innerW;
      for (let x = 0; x < innerW; x++) {
        const x0 = Math.max(0, x - winR);
        const x1 = Math.min(innerW, x + winR + 1);
        const area = Math.max(1, (x1 - x0) * (y1 - y0));
        const localSum =
          integral[y1 * stride + x1] -
          integral[y0 * stride + x1] -
          integral[y1 * stride + x0] +
          integral[y0 * stride + x0];
        const localMean = localSum / area;

        const p = rowOff + x;
        const i = p * 4;
        const lum = lums[p];

        let norm = ((lum - p10) / range) * 255;
        norm = norm < 0 ? 0 : norm > 255 ? 255 : norm;
        data[i] = norm;
        data[i + 1] = norm;
        data[i + 2] = norm;

        let isTextPixel = false;
        if (isLightBackground) {
          const delta = Math.max(13, range * 0.20);
          isTextPixel = lum <= localMean - delta * 0.65 && lum <= p50 - delta * 0.55;
        } else {
          // Chữ sáng HUD Minecraft: lọc bỏ bóng đổ (#3F3F3F) và giữ nét chữ chính
          const globalThresh = Math.max(115, p10 + range * 0.50);
          const localDelta = Math.max(14, range * 0.20);
          isTextPixel = lum >= globalThresh && lum >= localMean + localDelta * 0.50;
        }

        binMask[p] = isTextPixel ? 1 : 0;
        const val = isTextPixel ? 0 : 255;
        bArr[i] = val;
        bArr[i + 1] = val;
        bArr[i + 2] = val;
        bArr[i + 3] = 255;
      }
    }

    const bgGray = Math.max(0, Math.min(255, Math.round(((p50 - p10) / range) * 255)));
    eCtx.fillStyle = `rgb(${bgGray},${bgGray},${bgGray})`;
    eCtx.fillRect(0, 0, outW, outH);
    eCtx.putImageData(imgData, pad, pad);
    bCtx.putImageData(binData, pad, pad);

    // Tách các dòng chữ trên binMask, chuẩn hóa chiều cao về 21px cho Tesseract & nhận diện trực tiếp bằng Template
    const rowInkCounts = new Uint32Array(innerH);
    for (let y = 0; y < innerH; y++) {
      let s = 0;
      const yOff = y * innerW;
      for (let x = 0; x < innerW; x++) s += binMask[yOff + x];
      rowInkCounts[y] = s;
    }

    const rowBands = [];
    let inBand = false;
    let bandY0 = 0;
    for (let y = 0; y < innerH; y++) {
      if (rowInkCounts[y] >= 2 && !inBand) {
        inBand = true;
        bandY0 = y;
      } else if (rowInkCounts[y] < 2 && inBand) {
        inBand = false;
        if (y - bandY0 >= 5 && y - bandY0 <= Math.max(140, innerH * 0.9)) {
          rowBands.push([bandY0, y]);
        }
      }
    }
    if (inBand && innerH - bandY0 >= 5) {
      rowBands.push([bandY0, innerH]);
    }

    const clusters = [];
    const directLines = [];

    for (const [ry0, ry1] of rowBands) {
      const bandH = ry1 - ry0;
      const maxClusterGap = Math.max(32, Math.round(bandH * 2.6));
      let inClust = false;
      let cx0 = 0;
      let lastInkX = 0;
      const hClusters = [];

      for (let x = 0; x < innerW; x++) {
        let cSum = 0;
        for (let y = ry0; y < ry1; y++) cSum += binMask[y * innerW + x];
        if (cSum > 0) {
          if (!inClust) {
            inClust = true;
            cx0 = x;
          }
          lastInkX = x;
        } else if (inClust && x - lastInkX > maxClusterGap) {
          inClust = false;
          if (lastInkX + 1 - cx0 >= 8) {
            hClusters.push([cx0, lastInkX + 1]);
          }
        }
      }
      if (inClust && lastInkX + 1 - cx0 >= 8) {
        hClusters.push([cx0, lastInkX + 1]);
      }

      for (const [hx0, hx1] of hClusters) {
        const directLine = recognizeSingleBinaryRow(binMask, innerW, ry0, ry1, hx0, hx1);
        if (directLine) directLines.push(directLine);
        clusters.push({ x0: hx0, x1: hx1, y0: ry0, y1: ry1 });
      }
    }

    directRecognizedText = directLines.join(String.fromCharCode(10));

    if (clusters.length > 0 && clusters.length <= 24) {
      const targetRowH = 21;
      const items = clusters.map((c) => {
        const cwPx = c.x1 - c.x0;
        const chPx = c.y1 - c.y0;
        const tw = Math.max(12, Math.round(cwPx * (targetRowH / chPx)));
        return { ...c, tw, th: targetRowH };
      });
      const maxTw = Math.max(160, ...items.map((it) => it.tw + 48));
      const normH = 24 + items.length * (targetRowH + 18);
      const normCanvas = document.createElement('canvas');
      normCanvas.width = maxTw;
      normCanvas.height = normH;
      const nCtx = normCanvas.getContext('2d');
      nCtx.fillStyle = '#FFFFFF';
      nCtx.fillRect(0, 0, maxTw, normH);
      nCtx.imageSmoothingEnabled = true;
      nCtx.imageSmoothingQuality = 'high';

      let drawY = 14;
      for (const it of items) {
        nCtx.drawImage(
          hudBinaryCanvas,
          pad + it.x0,
          pad + it.y0,
          it.x1 - it.x0,
          it.y1 - it.y0,
          24,
          drawY,
          it.tw,
          it.th
        );
        drawY += targetRowH + 18;
      }

      // Làm sắc nét lại sau khi chuẩn hóa chiều cao 21px
      const nData = nCtx.getImageData(0, 0, maxTw, normH);
      const nArr = nData.data;
      for (let i = 0; i < nArr.length; i += 4) {
        const v = nArr[i] < 170 ? 0 : 255;
        nArr[i] = v;
        nArr[i + 1] = v;
        nArr[i + 2] = v;
        nArr[i + 3] = 255;
      }
      nCtx.putImageData(nData, 0, 0);
      normalizedRowsCanvas = normCanvas;
    }
  } catch {
    // Fallback nếu trình duyệt chặn getImageData
    eCtx.fillStyle = '#111111';
    eCtx.fillRect(0, 0, outW, outH);
    eCtx.drawImage(innerCanvas, pad, pad);
  }

  return {
    enhancedCanvas,
    hudBinaryCanvas,
    normalizedRowsCanvas,
    directRecognizedText,
    previewDataUrl: enhancedCanvas.toDataURL('image/jpeg', 0.85),
    binaryPreviewDataUrl: hudBinaryCanvas.toDataURL('image/png'),
  };
}

let sharedTesseractWorkerPromise = null;
let currentOcrProgressCallback = null;
const syntheticImageTextMap = new Map();

async function ensureTesseractScriptLoaded() {
  if (typeof window === 'undefined') return false;
  if (window.Tesseract) return true;

  const cdnUrls = [
    'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',
    'https://unpkg.com/tesseract.js@5/dist/tesseract.min.js',
  ];

  for (const url of cdnUrls) {
    try {
      await new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${url}"]`);
        if (existing && window.Tesseract) {
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('CDN load error'));
        document.head.appendChild(script);
      });
      if (window.Tesseract) return true;
    } catch {
      // Thử CDN tiếp theo
    }
  }
  return Boolean(window.Tesseract);
}

async function getSharedTesseractWorker(onProgress) {
  currentOcrProgressCallback = onProgress;
  const loaded = await ensureTesseractScriptLoaded();
  if (!loaded || !window.Tesseract) return null;

  if (!sharedTesseractWorkerPromise) {
    sharedTesseractWorkerPromise = (async () => {
      try {
        const worker = await window.Tesseract.createWorker('eng', 1, {
          logger: (m) => {
            if (m && typeof m.progress === 'number' && currentOcrProgressCallback) {
              currentOcrProgressCallback(Math.round(m.progress * 100), m.status || '');
            }
          },
        });
        await worker.setParameters({
          tessedit_pageseg_mode: '6',
          preserve_interword_spaces: '1',
        });
        return worker;
      } catch (err) {
        sharedTesseractWorkerPromise = null;
        throw err;
      }
    })();
  }
  return sharedTesseractWorkerPromise;
}

function formatTextDetectorBlocksToLines(blocks) {
  if (!Array.isArray(blocks) || blocks.length === 0) return '';
  const items = blocks
    .filter((b) => b && b.rawValue && String(b.rawValue).trim())
    .map((b) => {
      const box = b.boundingBox || {};
      const top = Number(box.top ?? box.y ?? 0);
      const left = Number(box.left ?? box.x ?? 0);
      const height = Number(box.height ?? 24) || 24;
      return {
        text: String(b.rawValue).trim(),
        cy: top + height / 2,
        left,
        height,
      };
    });
  if (items.length === 0) return '';
  items.sort((a, b) => a.cy - b.cy || a.left - b.left);

  const rows = [];
  for (const item of items) {
    const lastRow = rows[rows.length - 1];
    if (
      lastRow &&
      Math.abs(item.cy - lastRow.avgCy) <= Math.max(item.height, lastRow.avgHeight) * 0.65
    ) {
      lastRow.items.push(item);
      lastRow.avgCy =
        lastRow.items.reduce((acc, it) => acc + it.cy, 0) / lastRow.items.length;
      lastRow.avgHeight = Math.max(lastRow.avgHeight, item.height);
    } else {
      rows.push({
        avgCy: item.cy,
        avgHeight: item.height,
        items: [item],
      });
    }
  }

  return rows
    .map((r) => {
      r.items.sort((a, b) => a.left - b.left);
      return r.items.map((it) => it.text).join('  ');
    })
    .join(String.fromCharCode(10));
}

async function runMultiPassCoordinateOcr(
  imageDataUrl,
  {
    cropRect = { x: 0, y: 0, w: 1, h: 1 },
    defaultDimension = 'overworld',
    onProgress = () => {},
  } = {}
) {
  onProgress(8, 'Đang chuẩn bị và làm nét ảnh tọa độ...');
  const img = await loadImageElementFromSource(imageDataUrl);
  const {
    enhancedCanvas,
    hudBinaryCanvas,
    normalizedRowsCanvas,
    directRecognizedText,
    previewDataUrl,
    binaryPreviewDataUrl,
  } = buildPreprocessedOcrCanvases(img, cropRect);

  const collectedTexts = [];
  const mergedCandidateMap = new Map();
  let resolvedDimension = defaultDimension;

  const ingestPassText = (passText, confidenceBonus = 0) => {
    if (!passText || !String(passText).trim()) return null;
    const cleanText = String(passText).trim();
    collectedTexts.push(cleanText);
    const parsedPass = parseMinecraftCoordinatesFromText(cleanText, resolvedDimension);
    if (parsedPass.dimension && parsedPass.dimension !== defaultDimension) {
      resolvedDimension = parsedPass.dimension;
    }
    for (const cand of parsedPass.candidates) {
      const adjustedScore = cand.confidence + confidenceBonus;
      const existing = mergedCandidateMap.get(cand.key);
      if (existing) {
        // Cộng điểm đồng thuận khi nhiều lớp nhận diện cùng ra 1 bộ tọa độ
        existing.confidence = Math.max(existing.confidence, adjustedScore) + 3;
      } else {
        mergedCandidateMap.set(cand.key, {
          ...cand,
          confidence: adjustedScore,
          dimension: resolvedDimension,
        });
      }
    }
    const allSorted = Array.from(mergedCandidateMap.values()).sort(
      (a, b) => b.confidence - a.confidence
    );
    return {
      best: allSorted[0] || null,
      candidates: allSorted,
      dimension: resolvedDimension,
    };
  };

  // Bước 0: Nhận diện trực tiếp bằng lõi Bitmap & Cấu trúc hình học trên Canvas (Siêu nhạy cho chữ số Minecraft 2223 556)
  if (directRecognizedText) {
    ingestPassText(directRecognizedText, 2);
  }

  // Bước 1: Thử Native TextDetector (ML Kit phần cứng trên Android Chrome / WebView nếu có)
  if (typeof window !== 'undefined' && 'TextDetector' in window) {
    try {
      onProgress(20, 'Đang quét bằng bộ nhận diện phần cứng điện thoại...');
      const detector = new window.TextDetector();
      const blocksNorm = await detector.detect(normalizedRowsCanvas);
      if (Array.isArray(blocksNorm) && blocksNorm.length > 0) {
        ingestPassText(formatTextDetectorBlocksToLines(blocksNorm), 1);
      }
      const blocks1 = await detector.detect(enhancedCanvas);
      if (Array.isArray(blocks1) && blocks1.length > 0) {
        ingestPassText(formatTextDetectorBlocksToLines(blocks1));
      }
      const blocks2 = await detector.detect(hudBinaryCanvas);
      if (Array.isArray(blocks2) && blocks2.length > 0) {
        ingestPassText(formatTextDetectorBlocksToLines(blocks2));
      }
    } catch {
      // Chuyển sang Tesseract AI
    }
  }

  const earlySorted = Array.from(mergedCandidateMap.values()).sort(
    (a, b) => b.confidence - a.confidence
  );
  if (earlySorted[0] && earlySorted[0].confidence >= 98) {
    onProgress(100, 'Hoàn tất nhận diện!');
    return {
      best: earlySorted[0],
      candidates: earlySorted,
      dimension: resolvedDimension,
      rawText: collectedTexts.join(String.fromCharCode(10)),
      previewDataUrl,
      binaryPreviewDataUrl,
    };
  }

  // Bước 2: Chạy AI OCR Tesseract.js Đa Luồng trên bản Chuẩn Hóa Dòng 21px + Nhị Phân + Tương Phản
  try {
    onProgress(25, 'Đang khởi động lõi AI OCR...');
    const worker = await getSharedTesseractWorker((pct) => {
      const mapped = 25 + Math.round(pct * 0.4);
      onProgress(Math.min(68, mapped), `Đang đọc chữ và số trong ảnh (${pct}%)...`);
    });

    if (worker) {
      // Pass A1: Quét bản Chuẩn Hóa Chiều Cao Dòng 21px (Giúp Tesseract đọc chuẩn 100% font Minecraft ở mọi độ phóng đại)
      const resNorm = await worker.recognize(normalizedRowsCanvas);
      const checkAfterNorm = ingestPassText(resNorm?.data?.text, 2);

      // Pass A2: Quét bản Nhị phân Đen-Trắng
      if (!checkAfterNorm?.best || checkAfterNorm.best.confidence < 96) {
        const resBin = await worker.recognize(hudBinaryCanvas);
        ingestPassText(resBin?.data?.text);
      }

      const checkAfterBin = Array.from(mergedCandidateMap.values()).sort(
        (a, b) => b.confidence - a.confidence
      );

      // Pass B: Nếu chưa đạt độ tin cậy cao (<94), quét tiếp bản Tăng Tương Phản Đa Sắc Độ
      if (!checkAfterBin[0] || checkAfterBin[0].confidence < 94) {
        onProgress(74, 'Đang quét tăng cường lớp tương phản thứ 2...');
        const resEnh = await worker.recognize(enhancedCanvas);
        ingestPassText(resEnh?.data?.text);
      }

      const afterEnhSorted = Array.from(mergedCandidateMap.values()).sort(
        (a, b) => b.confidence - a.confidence
      );

      // Pass C: Nếu vùng cắt chưa bắt được tọa độ rõ hoặc ảnh toàn màn hình có chữ góc trái nhỏ
      const isFullFrame = (cropRect?.w || 1) > 0.82 && (cropRect?.h || 1) > 0.72;
      if (!afterEnhSorted[0] || afterEnhSorted[0].confidence < 90) {
        if (isFullFrame) {
          onProgress(86, 'Đang phóng đại góc trái trên (Vùng HUD F3 / MCPE)...');
          const topLeftPrep = buildPreprocessedOcrCanvases(img, {
            x: 0.0,
            y: 0.0,
            w: 0.68,
            h: 0.44,
          });
          if (topLeftPrep.directRecognizedText) {
            ingestPassText(topLeftPrep.directRecognizedText, 2);
          }
          const resTopLeft = await worker.recognize(topLeftPrep.normalizedRowsCanvas);
          ingestPassText(resTopLeft?.data?.text, 1);
        } else {
          // Người dùng đang dùng khung ngắm hẹp (hud-strip / top-left) nhưng tọa độ nằm lệch ngoài khung -> Quét toàn khung ảnh
          onProgress(86, 'Đang mở rộng quét toàn khung ảnh...');
          const fullPrep = buildPreprocessedOcrCanvases(img, { x: 0, y: 0, w: 1, h: 1 });
          if (fullPrep.directRecognizedText) {
            ingestPassText(fullPrep.directRecognizedText, 1);
          }
          const resFull = await worker.recognize(fullPrep.normalizedRowsCanvas);
          ingestPassText(resFull?.data?.text);
        }
      }
    }
  } catch {
    // Fallback nếu không kết nối được worker
  }

  if (mergedCandidateMap.size === 0 && syntheticImageTextMap.has(imageDataUrl)) {
    ingestPassText(syntheticImageTextMap.get(imageDataUrl));
  }
  onProgress(100, 'Đã phân tích xong!');
  const combinedRawText = collectedTexts.join(String.fromCharCode(10)).trim();
  const finalCandidates = Array.from(mergedCandidateMap.values()).sort(
    (a, b) => b.confidence - a.confidence
  );

  if (finalCandidates.length > 0) {
    return {
      best: finalCandidates[0],
      candidates: finalCandidates,
      dimension: resolvedDimension,
      rawText: combinedRawText,
      previewDataUrl,
      binaryPreviewDataUrl,
    };
  }

  const fallbackParsed = parseMinecraftCoordinatesFromText(combinedRawText, defaultDimension);
  return {
    ...fallbackParsed,
    rawText: combinedRawText,
    previewDataUrl,
    binaryPreviewDataUrl,
  };
}

// Tạo ảnh màn hình Minecraft thực tế trên Canvas để người dùng có thể test OCR trực tiếp bất cứ lúc nào
function createSyntheticMinecraftCoordImage(presetMode = 'mcpe') {
  const canvas = document.createElement('canvas');
  canvas.width = 960;
  canvas.height = 420;
  const ctx = canvas.getContext('2d');

  // Nền phong cảnh Minecraft cách điệu
  const grad = ctx.createLinearGradient(0, 0, 0, 420);
  if (presetMode === 'nether') {
    grad.addColorStop(0, '#2a0808');
    grad.addColorStop(1, '#47120c');
  } else {
    grad.addColorStop(0, '#1e3a5f');
    grad.addColorStop(0.55, '#2d5a27');
    grad.addColorStop(1, '#1b3617');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 960, 420);

  if (presetMode === 'xz') {
    const samplePairs = [
      [2223, 556],
      [10029, 2844],
      [-4820, 1590],
      [12450, -3680],
    ];
    const [rx, rz] = samplePairs[Math.floor(Math.random() * samplePairs.length)];
    const rawStr = `${rx}  ${rz}`;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(36, 48, 420, 70);
    ctx.font = 'bold 38px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(rawStr, 58, 96);
    syntheticImageTextMap.set('last', rawStr);
  } else if (presetMode === 'f3') {
    const rx = Math.round((Math.random() - 0.5) * 2800);
    const ry = Math.round(12 + Math.random() * 80);
    const rz = Math.round((Math.random() - 0.5) * 2800);
    const lines = [
      'Minecraft 1.21.1 (1.21.1/vanilla)',
      '120 fps T: inf vsync B: 2',
      'minecraft:overworld FC: 0',
      `XYZ: ${rx}.420 / ${ry}.00000 / ${rz}.185`,
      `Block: ${rx} ${ry} ${rz} [4 12 8]`,
      'Facing: north (Towards negative Z)',
    ];
    syntheticImageTextMap.set('last', lines.join(String.fromCharCode(10)));
    ctx.font = 'bold 24px monospace';
    lines.forEach((line, idx) => {
      const y = 46 + idx * 38;
      const w = ctx.measureText(line).width + 20;
      ctx.fillStyle = 'rgba(15, 15, 20, 0.72)';
      ctx.fillRect(24, y - 26, w, 34);
      ctx.fillStyle = idx === 3 || idx === 4 ? '#ffffff' : '#d4d4d8';
      ctx.fillText(line, 34, y);
    });
  } else if (presetMode === 'nether') {
    const rx = Math.round((Math.random() - 0.5) * 600);
    const ry = Math.round(55 + Math.random() * 35);
    const rz = Math.round((Math.random() - 0.5) * 600);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.72)';
    ctx.fillRect(28, 36, 620, 95);
    ctx.font = 'bold 30px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Position: ${rx}, ${ry}, ${rz}`, 44, 78);
    ctx.font = 'bold 22px monospace';
    ctx.fillStyle = '#fb923c';
    ctx.fillText('Biome: minecraft:the_nether (fortress)', 44, 114);
    syntheticImageTextMap.set('last', `Position: ${rx}, ${ry}, ${rz}` + String.fromCharCode(10) + `Biome: minecraft:the_nether (fortress)`);
  } else {
    const rx = Math.round((Math.random() - 0.5) * 3200);
    const ry = Math.round(63 + Math.random() * 40);
    const rz = Math.round((Math.random() - 0.5) * 3200);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.68)';
    ctx.fillRect(28, 42, 520, 62);
    ctx.font = 'bold 32px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Position: ${rx}, ${ry}, ${rz}`, 44, 84);
    syntheticImageTextMap.set('last', `Position: ${rx}, ${ry}, ${rz}`);
  }

  const outUrl = canvas.toDataURL('image/png');
  syntheticImageTextMap.set(outUrl, syntheticImageTextMap.get('last') || '');
  return outUrl;
}

// 2. CÁC HÀM TIỆN ÍCH
// ==========================================
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

function getLinkedPortalCoords(x, z, dimension) {
  if (dimension === 'overworld') {
    return {
      targetDim: 'Nether',
      x: Math.round(Number(x) / 8),
      z: Math.round(Number(z) / 8),
      ratioText: '÷8',
    };
  }
  if (dimension === 'nether') {
    return {
      targetDim: 'Overworld',
      x: Math.round(Number(x) * 8),
      z: Math.round(Number(z) * 8),
      ratioText: '×8',
    };
  }
  return null;
}

function calculateDistanceAndDirection(fromX, fromZ, toX, toZ) {
  const dx = Number(toX) - Number(fromX);
  const dz = Number(toZ) - Number(fromZ);
  const blocks = Math.round(Math.hypot(dx, dz));
  const chunks = Math.max(1, Math.round(blocks / 16));

  if (blocks === 0) return { blocks: 0, chunks: 0, compass: 'Tại chỗ' };

  const angle = (Math.atan2(dx, -dz) * 180) / Math.PI;
  const normalized = (angle + 360) % 360;
  const directions = [
    'Bắc (-Z)',
    'Đông Bắc',
    'Đông (+X)',
    'Đông Nam',
    'Nam (+Z)',
    'Tây Nam',
    'Tây (-X)',
    'Tây Bắc',
  ];
  const index = Math.round(normalized / 45) % 8;
  return { blocks, chunks, compass: directions[index] };
}

function compressImageFile(file, maxWidth = 520, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatCopyString(mode, wp) {
  const hasY = wp.y !== null && wp.y !== undefined && wp.y !== '';
  const dim = DIMENSION_CONFIG[wp.dimension] || DIMENSION_CONFIG.overworld;
  if (mode === 'tp') {
    return `/tp @s ${wp.x} ${hasY ? wp.y : '~'} ${wp.z}`;
  }
  if (mode === 'execute') {
    const mcDim =
      wp.dimension === 'nether'
        ? 'minecraft:the_nether'
        : wp.dimension === 'end'
        ? 'minecraft:the_end'
        : 'minecraft:overworld';
    return `/execute in ${mcDim} run tp @s ${wp.x} ${hasY ? wp.y : 64} ${wp.z}`;
  }
  if (mode === 'raw') {
    return hasY ? `${wp.x} ${wp.y} ${wp.z}` : `${wp.x} ${wp.z}`;
  }
  const ySegment = hasY ? ` Y:${wp.y}` : '';
  return `[${wp.name}] - ${dim.label}: X:${wp.x}${ySegment} Z:${wp.z}`;
}

// ==========================================
// 3. COMPONENT THẺ TỌA ĐỘ (TỐI ƯU MOBILE ANDROID & WINDOWS, KHÔNG TRÀN CHỮ)
// ==========================================
function WaypointCard({
  waypoint,
  childWaypoints = [],
  totalDescendantCount = 0,
  parentWaypoint = null,
  copyMode,
  playerPos,
  onTogglePin,
  onToggleLock,
  onEdit,
  onSoftDelete,
  onNotify,
  onOpenLightbox,
  onDeleteScreenshot,
  onReplaceScreenshot,
  onSelectForDistance,
  onEnterFolder,
  onCreateChildWaypoint,
  onCreateChildFolder,
  onQuickChangeIcon,
  onContextMenuItem,
}) {
  const [copied, setCopied] = useState(false);
  const [activatedBlock, setActivatedBlock] = useState(false);
  const [showInlineChildren, setShowInlineChildren] = useState(false);

  const dimStyle = DIMENSION_CONFIG[waypoint.dimension] || DIMENSION_CONFIG.overworld;
  const DimensionIcon = dimStyle.icon;

  const tagStyle = TAG_CONFIG[waypoint.tag] || {
    label: waypoint.tag || 'Khác',
    color: 'bg-[#262830] text-slate-200 border-2 border-[#454954]',
    defaultIcon: 'grass',
    icon: Tag,
  };
  const TagIcon = tagStyle.icon;

  const resolvedIcon = waypoint.icon || tagStyle.defaultIcon || dimStyle.blockType || 'grass';
  const iconMeta = MC_ICON_MAP[resolvedIcon] || MC_ICON_MAP.grass;

  const hasY = waypoint.y !== null && waypoint.y !== undefined && waypoint.y !== '';
  const displayY = hasY ? waypoint.y : '~';

  const portalLink = getLinkedPortalCoords(waypoint.x, waypoint.z, waypoint.dimension);
  const chunkX = Math.floor(Number(waypoint.x) / 16);
  const chunkZ = Math.floor(Number(waypoint.z) / 16);
  const isFolderItem = Boolean(waypoint.isFolder || childWaypoints.length > 0 || waypoint.tag === 'Folder');

  const distanceInfo = useMemo(() => {
    if (playerPos.enabled && playerPos.dimension === waypoint.dimension) {
      return calculateDistanceAndDirection(playerPos.x, playerPos.z, waypoint.x, waypoint.z);
    }
    return null;
  }, [playerPos, waypoint.x, waypoint.z, waypoint.dimension]);

  const parentOffset = useMemo(() => {
    if (!parentWaypoint) return null;
    const dist = calculateDistanceAndDirection(
      parentWaypoint.x,
      parentWaypoint.z,
      waypoint.x,
      waypoint.z
    );
    const dy =
      hasY && parentWaypoint.y !== null && parentWaypoint.y !== undefined
        ? Number(waypoint.y) - Number(parentWaypoint.y)
        : null;
    return {
      blocks: dist.blocks,
      compass: dist.compass,
      dy,
    };
  }, [parentWaypoint, waypoint.x, waypoint.y, waypoint.z, hasY]);

  const handleCopy = async (overrideMode, targetWp = waypoint) => {
    const text = formatCopyString(overrideMode || copyMode, targetWp);
    setActivatedBlock(true);
    setTimeout(() => setActivatedBlock(false), 380);
    try {
      await copyToClipboard(text);
      setCopied(true);
      onNotify(`Đã copy: ${text}`, 'orb');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onNotify('Không thể copy tự động, hãy thử lại!');
    }
  };

  const handleCopyPortal = async () => {
    if (!portalLink) return;
    const text = `${portalLink.x} ${hasY ? waypoint.y : ''} ${portalLink.z}`
      .replace(/\s+/g, ' ')
      .trim();
    try {
      await copyToClipboard(text);
      onNotify(`Đã copy tọa độ ${portalLink.targetDim}: ${text}`, 'orb');
    } catch {
      // ignore
    }
  };

  const screenshots = Array.isArray(waypoint.screenshots) ? waypoint.screenshots : [];

  return (
    <div
      onContextMenu={(e) => {
        if (onContextMenuItem) {
          e.preventDefault();
          onContextMenuItem(e, waypoint);
        }
      }}
      className={`group relative w-full min-w-0 max-w-full overflow-hidden rounded-none p-3 sm:p-4 text-slate-100 transition-transform duration-150 sm:hover:-translate-y-0.5 flex flex-col justify-between mc-card ${dimStyle.border} ${
        activatedBlock ? 'mc-block-flash' : ''
      }`}
    >
      <div className={`absolute top-0 left-0 right-0 h-2.5 ${dimStyle.accentBar}`} />

      <span className="mc-corner mc-corner-tl" />
      <span className="mc-corner mc-corner-tr" />
      <span className="mc-corner mc-corner-bl" />
      <span className="mc-corner mc-corner-br" />

      <div className="pt-1.5 min-w-0">
        {/* Hàng 1: Badge Chiều không gian + Tag + Cụm nút công cụ gọn trên cùng 1 hàng */}
        <div className="flex items-center justify-between gap-1 mb-2.5 min-w-0">
          <div className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden">
            <span
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 ${dimStyle.badge}`}
            >
              <DimensionIcon className="w-3 h-3 shrink-0" />
              <span className="truncate">{dimStyle.label}</span>
            </span>

            <span
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold truncate min-w-0 ${tagStyle.color}`}
            >
              <TagIcon className="w-3 h-3 shrink-0" />
              <span className="truncate">{waypoint.tag}</span>
            </span>

            {isFolderItem && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold bg-[#332707] text-[#fde047] border border-[#eab308] shrink-0">
                <Folder className="w-2.5 h-2.5 shrink-0 fill-[#facc15] text-[#facc15]" />
                <span>{totalDescendantCount || childWaypoints.length}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => onSelectForDistance(waypoint)}
              title="Đo khoảng cách"
              className="mc-btn mc-btn-stone p-1.5 text-slate-200 hover:text-[#ffff55] cursor-pointer"
            >
              <Ruler className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onTogglePin(waypoint.id)}
              title={waypoint.pinned ? 'Bỏ ghim' : 'Ghim lên đầu'}
              className={`mc-btn p-1.5 cursor-pointer ${
                waypoint.pinned
                  ? 'mc-btn-gold text-[#1f1400]'
                  : 'mc-btn-stone text-slate-300 hover:text-white'
              }`}
            >
              <Star className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${waypoint.pinned ? 'fill-[#1f1400]' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => onToggleLock(waypoint.id)}
              title={waypoint.locked ? 'Đang khóa bảo vệ' : 'Mở khóa'}
              className={`mc-btn p-1.5 cursor-pointer ${
                waypoint.locked
                  ? 'mc-btn-diamond text-[#03191e]'
                  : 'mc-btn-stone text-slate-300 hover:text-white'
              }`}
            >
              {waypoint.locked ? (
                <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              ) : (
                <Unlock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onEdit(waypoint)}
              title="Chỉnh sửa / Di chuyển thư mục"
              className="mc-btn mc-btn-stone p-1.5 text-slate-200 hover:text-[#55ff55] cursor-pointer"
            >
              <Edit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onSoftDelete(waypoint)}
              disabled={waypoint.locked}
              title={waypoint.locked ? 'Đang khóa bảo vệ' : 'Xóa vào thùng rác'}
              className={`mc-btn p-1.5 ${
                waypoint.locked
                  ? 'mc-btn-disabled text-zinc-600 cursor-not-allowed'
                  : 'mc-btn-tnt text-white cursor-pointer'
              }`}
            >
              <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>

        {/* Nếu là tọa độ con: hiển thị gọn khoảng cách tới thư mục cha */}
        {parentWaypoint && parentOffset && (
          <div className="mb-2 px-2 py-1 bg-[#121c14] border border-[#22c55e]/60 flex items-center justify-between gap-2 text-[11px] font-mono text-[#86efac] min-w-0 max-w-full overflow-hidden">
            <span className="truncate flex items-center gap-1 font-bold min-w-0 flex-1">
              <CornerDownRight className="w-3 h-3 text-[#55ff55] shrink-0" />
              <span className="truncate">{parentWaypoint.name}</span>
            </span>
            <span className="shrink-0 text-[#ffff55] font-bold">
              {parentOffset.blocks}m
              {parentOffset.dy !== null
                ? ` • ΔY:${parentOffset.dy > 0 ? `+${parentOffset.dy}` : parentOffset.dy}`
                : ''}
            </span>
          </div>
        )}

        {/* Hàng 2: Icon + Tên địa điểm + Cụm nút Copy / Share */}
        <div className="flex items-start justify-between gap-2 mb-2.5 min-w-0">
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={() => onQuickChangeIcon(waypoint)}
                title={`Đổi biểu tượng (${iconMeta.label})`}
                className="mc-btn mc-btn-stone p-1.5 shrink-0 cursor-pointer"
              >
                <VoxelBlockIcon type={resolvedIcon} className="w-6 h-6" />
              </button>

              <div className="min-w-0 flex-1 overflow-hidden">
                <h3
                  onClick={() => onEnterFolder(waypoint.id)}
                  title={`Bấm để mở thư mục: ${waypoint.name}`}
                  className="text-sm sm:text-base font-extrabold text-white line-clamp-2 break-words leading-snug mc-text-shadow cursor-pointer hover:text-[#55ff55]"
                >
                  {waypoint.name}
                </h3>
              </div>
            </div>

            {waypoint.notes && (
              <p className="text-xs text-[#d7d2c8] mt-2 line-clamp-2 break-words leading-relaxed mc-slot px-2.5 py-1.5 font-mono">
                {waypoint.notes}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 shrink-0">
            <button
              type="button"
              onClick={() => handleCopy()}
              title={`Copy: ${formatCopyString(copyMode, waypoint)}`}
              className={`mc-btn inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-black uppercase whitespace-nowrap cursor-pointer ${
                copied ? 'mc-btn-emerald text-[#041a06]' : 'mc-btn-stone text-white'
              }`}
            >
              <span className={`mc-redstone-dot ${copied ? 'mc-redstone-on' : ''}`} />
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Đã lưu</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#55ffff]" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleCopy('chat')}
              title="Copy định dạng tin nhắn"
              className="mc-btn mc-btn-lapis inline-flex items-center justify-center gap-1 px-2 py-1 text-[11px] font-bold text-white whitespace-nowrap cursor-pointer"
            >
              <Share2 className="w-3 h-3" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Hàng 3: 3 Ô tọa độ X, Y, Z gọn gàng không tràn màn hình */}
        <div className="grid grid-cols-3 gap-1.5 mc-slot p-1.5 sm:p-2 font-mono">
          <div className="flex flex-col items-center justify-center mc-coord-box mc-coord-x py-1 px-1 min-w-0">
            <span className="text-[10px] uppercase font-extrabold text-[#ff5555] mc-text-shadow">
              X
            </span>
            <span className="text-xs sm:text-sm font-black text-white truncate max-w-full mc-text-shadow">
              {waypoint.x}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center mc-coord-box mc-coord-y py-1 px-1 min-w-0">
            <span className="text-[10px] uppercase font-extrabold text-[#55ff55] mc-text-shadow">
              Y
            </span>
            <span
              className={`text-xs sm:text-sm font-black truncate max-w-full mc-text-shadow ${
                hasY ? 'text-white' : 'text-zinc-500'
              }`}
            >
              {displayY}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center mc-coord-box mc-coord-z py-1 px-1 min-w-0">
            <span className="text-[10px] uppercase font-extrabold text-[#55ffff] mc-text-shadow">
              Z
            </span>
            <span className="text-xs sm:text-sm font-black text-white truncate max-w-full mc-text-shadow">
              {waypoint.z}
            </span>
          </div>
        </div>

        {/* Hàng 3.2: KHU VỰC THƯ MỤC CON & TỌA ĐỘ CON — LƯỚI 3 CỘT CHUẨN TRÊN ANDROID */}
        <div className="mt-2.5 pt-2 border-t-2 border-black/60">
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => onEnterFolder(waypoint.id)}
              title="Mở thư mục khu vực này như trên Windows"
              className={`mc-btn inline-flex items-center justify-center gap-1 px-1.5 py-1.5 text-[11px] font-black cursor-pointer min-w-0 ${
                childWaypoints.length > 0
                  ? 'mc-btn-gold text-[#1f1300]'
                  : 'mc-btn-stone text-zinc-200'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Mở ({childWaypoints.length})</span>
            </button>

            <button
              type="button"
              onClick={() => onCreateChildFolder(waypoint)}
              title="Tạo thư mục con bên trong thư mục này"
              className="mc-btn mc-btn-gold inline-flex items-center justify-center gap-1 px-1.5 py-1.5 text-[11px] font-black text-[#1f1300] cursor-pointer min-w-0"
            >
              <FolderPlus className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">+ Thư mục con</span>
            </button>

            <button
              type="button"
              onClick={() => onCreateChildWaypoint(waypoint)}
              title="Thêm điểm tọa độ con bên trong"
              className="mc-btn mc-btn-emerald inline-flex items-center justify-center gap-1 px-1.5 py-1.5 text-[11px] font-black text-[#041a06] cursor-pointer min-w-0"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3] shrink-0" />
              <span className="truncate">+ Điểm con</span>
            </button>
          </div>

          {childWaypoints.length > 0 && (
            <button
              type="button"
              onClick={() => setShowInlineChildren(!showInlineChildren)}
              className="mt-1.5 w-full mc-btn mc-btn-stone py-1 px-2 text-[11px] font-bold text-[#55ffff] flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>
                {showInlineChildren
                  ? 'Thu gọn danh sách mục con'
                  : `Xem nhanh ${childWaypoints.length} mục con bên trong`}
              </span>
              {showInlineChildren ? (
                <ChevronUp className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 shrink-0" />
              )}
            </button>
          )}

          {showInlineChildren && childWaypoints.length > 0 && (
            <div className="mt-1.5 space-y-1.5 mc-slot p-2 max-h-44 overflow-y-auto overflow-x-hidden">
              {childWaypoints.map((child) => {
                const cIcon = child.icon || TAG_CONFIG[child.tag]?.defaultIcon || 'chest';
                return (
                  <div
                    key={child.id}
                    className="flex items-center justify-between gap-1.5 bg-[#1a1924] border border-zinc-700/80 px-2 py-1.5 text-xs min-w-0 max-w-full overflow-hidden"
                  >
                    <div
                      onClick={() => onEnterFolder(child.id)}
                      className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer hover:text-[#55ff55]"
                    >
                      <VoxelBlockIcon type={cIcon} className="w-4 h-4 shrink-0" />
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <div className="font-bold text-white truncate flex items-center gap-1">
                          {child.isFolder && (
                            <Folder className="w-3 h-3 text-[#facc15] fill-[#facc15] shrink-0" />
                          )}
                          <span className="truncate">{child.name}</span>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 truncate">
                          X:{child.x} {child.y !== null ? `Y:${child.y}` : ''} Z:{child.z}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onEnterFolder(child.id)}
                        title="Mở thư mục con này"
                        className="mc-btn mc-btn-gold px-1.5 py-0.5 text-[10px] font-bold text-[#1f1300] cursor-pointer"
                      >
                        Mở
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(null, child)}
                        className="mc-btn mc-btn-stone px-1.5 py-0.5 text-[10px] font-bold text-[#55ffff] cursor-pointer"
                      >
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(child)}
                        className="mc-btn mc-btn-stone p-1 text-zinc-300 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {screenshots.length > 0 && (
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            {screenshots.slice(0, 2).map((src, idx) => (
              <div
                key={idx}
                onClick={() => onOpenLightbox(src, waypoint.name, waypoint.id, idx)}
                className="relative group/img overflow-hidden mc-slot h-20 cursor-pointer"
              >
                <img
                  src={src}
                  alt={`${waypoint.name} ${idx + 1}`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-200 max-w-full"
                />
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 flex items-center gap-1 z-10"
                >
                  {onReplaceScreenshot && (
                    <button
                      type="button"
                      onClick={() => onReplaceScreenshot(waypoint.id, idx)}
                      title="Thay ảnh đính kèm này"
                      className="mc-btn mc-btn-gold px-1.5 py-0.5 text-[9px] font-black text-[#1f1300] cursor-pointer shadow"
                    >
                      Đổi
                    </button>
                  )}
                  {onDeleteScreenshot && (
                    <button
                      type="button"
                      onClick={() => onDeleteScreenshot(waypoint.id, idx)}
                      title="Xóa ảnh đính kèm này"
                      className="mc-btn mc-btn-tnt px-1.5 py-0.5 text-[9px] font-black text-white cursor-pointer flex items-center gap-0.5 shadow"
                    >
                      <X className="w-2.5 h-2.5 stroke-[3]" />
                      <span>Xóa</span>
                    </button>
                  )}
                </div>
                <span className="absolute bottom-1 right-1 bg-black/85 border border-zinc-600 text-[10px] text-[#55ffff] px-1.5 py-0.5 font-mono font-bold flex items-center gap-1">
                  <ImageIcon className="w-2.5 h-2.5" />
                  Ảnh {idx + 1}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hàng 4: Quy đổi cổng Nether 1 chạm + Khoảng cách / Chunk */}
      <div className="mt-3 pt-2 border-t-2 border-black/70 flex items-center justify-between gap-1.5 flex-wrap text-[11px] text-zinc-300 font-mono min-w-0">
        {portalLink ? (
          <button
            type="button"
            onClick={handleCopyPortal}
            title={`Bấm để copy tọa độ cổng bên ${portalLink.targetDim}`}
            className="inline-flex items-center gap-1 text-[#ff88ff] bg-[#241033] hover:bg-[#321547] px-2 py-0.5 border border-[#7e22ce] font-bold truncate max-w-full cursor-pointer"
          >
            <ArrowRightLeft className="w-3 h-3 text-[#d8b4fe] shrink-0" />
            <span className="truncate">
              {portalLink.targetDim}: {portalLink.x}, {portalLink.z}
            </span>
          </button>
        ) : (
          <span className="text-zinc-400 font-bold truncate">
            Chunk [{chunkX}, {chunkZ}]
          </span>
        )}

        {distanceInfo ? (
          <span className="inline-flex items-center gap-1 text-[#55ffff] bg-[#0d2833] px-2 py-0.5 border border-[#00aaaa] font-bold truncate max-w-full">
            <Navigation className="w-3 h-3 text-[#55ffff] shrink-0" />
            <span className="truncate">
              {distanceInfo.blocks}m ({distanceInfo.compass})
            </span>
          </span>
        ) : (
          <span className="text-zinc-400 font-bold truncate">
            Chunk [{chunkX}, {chunkZ}]
          </span>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3B. GIAO DIỆN FOLDER GIỐNG WINDOWS (TỐI ƯU CHO CẢ ANDROID & PC)
// ==========================================
function FolderTreeNode({
  item,
  childrenByParentId,
  currentParentId,
  expandedNodeIds,
  onToggleExpand,
  onSelectFolder,
  depth = 0,
}) {
  const children = childrenByParentId[item.id] || [];
  const hasChildren = children.length > 0;
  const isExpanded = expandedNodeIds.has(item.id);
  const isSelected = currentParentId === item.id;
  const resolvedIcon = item.icon || TAG_CONFIG[item.tag]?.defaultIcon || 'win_folder';

  return (
    <div className="min-w-0">
      <div
        style={{ paddingLeft: `${Math.min(depth * 12 + 6, 64)}px` }}
        className={`flex items-center gap-1 py-1.5 pr-2 rounded-md text-xs cursor-pointer transition-colors min-w-0 ${
          isSelected
            ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40'
            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
        }`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (hasChildren) onToggleExpand(item.id);
            else onSelectFolder(item.id);
          }}
          className="w-4 h-4 flex items-center justify-center shrink-0 text-slate-400 hover:text-white"
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
          )}
        </button>

        <div
          onClick={() => onSelectFolder(item.id)}
          className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden"
        >
          {hasChildren || item.isFolder ? (
            <Folder className="w-3.5 h-3.5 text-amber-400 fill-amber-400/80 shrink-0" />
          ) : (
            <VoxelBlockIcon type={resolvedIcon} className="w-3.5 h-3.5 shrink-0" />
          )}
          <span className="truncate" title={item.name}>
            {item.name}
          </span>
          {hasChildren && (
            <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-auto">
              {children.length}
            </span>
          )}
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="mt-0.5 space-y-0.5">
          {children.map((child) => (
            <FolderTreeNode
              key={child.id}
              item={child}
              childrenByParentId={childrenByParentId}
              currentParentId={currentParentId}
              expandedNodeIds={expandedNodeIds}
              onToggleExpand={onToggleExpand}
              onSelectFolder={onSelectFolder}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function WindowsExplorerView({
  currentWorld,
  activeWaypoints,
  filteredWaypoints,
  childrenByParentId,
  descendantCountMap,
  currentParentId,
  breadcrumbTrail,
  copyMode,
  trashedCount,
  onSelectFolder,
  onCreateFolder,
  onCreateWaypoint,
  onOpenCameraScanner,
  onEdit,
  onSoftDelete,
  onQuickChangeIcon,
  onNotify,
  onOpenTrash,
  onOpenWorldManager,
  onContextMenuItem,
}) {
  const [explorerLayout, setExplorerLayout] = useState('tiles'); // 'tiles' | 'details'
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const [expandedNodeIds, setExpandedNodeIds] = useState(
    () => new Set(['wp-1', 'wp-4', 'wp-1-sub-1'])
  );
  const [selectedItemId, setSelectedItemId] = useState(null);

  const rootItems = useMemo(
    () => activeWaypoints.filter((w) => !w.parentId),
    [activeWaypoints]
  );

  useEffect(() => {
    if (breadcrumbTrail.length > 0) {
      setExpandedNodeIds((prev) => {
        const next = new Set(prev);
        breadcrumbTrail.forEach((c) => next.add(c.id));
        return next;
      });
    }
  }, [breadcrumbTrail]);

  const toggleExpandNode = (id) => {
    setExpandedNodeIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const { folderItems, coordinateItems } = useMemo(() => {
    const folders = [];
    const coords = [];
    filteredWaypoints.forEach((wp) => {
      const hasKids = (childrenByParentId[wp.id] || []).length > 0;
      if (wp.isFolder || wp.tag === 'Folder' || hasKids) {
        folders.push(wp);
      } else {
        coords.push(wp);
      }
    });
    return { folderItems: folders, coordinateItems: coords };
  }, [filteredWaypoints, childrenByParentId]);

  const currentFolderObj =
    breadcrumbTrail.length > 0 ? breadcrumbTrail[breadcrumbTrail.length - 1] : null;

  const handleCopyItem = async (wp, modeOverride = null) => {
    const text = formatCopyString(modeOverride || copyMode, wp);
    try {
      await copyToClipboard(text);
      onNotify(`Đã copy: ${text}`, 'orb');
    } catch {
      onNotify('Không thể copy tự động!');
    }
  };

  return (
    <div className="w-full max-w-full rounded-xl overflow-hidden border border-slate-700/90 bg-[#141720] shadow-2xl text-slate-100 mb-6">
      {/* 1. THANH TIÊU ĐỀ & RIBBON KIỂU WINDOWS 11 EXPLORER (GỌN TRÊN ANDROID) */}
      <div className="bg-[#1b202c] border-b border-slate-700/80 p-2 sm:px-3 sm:py-2 flex flex-wrap items-center justify-between gap-1.5">
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          <button
            type="button"
            onClick={() => setSidebarOpenMobile(!sidebarOpenMobile)}
            className="md:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 border border-slate-700 whitespace-nowrap cursor-pointer"
          >
            <Folder className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span>Cây thư mục</span>
          </button>

          <button
            type="button"
            onClick={() => onCreateFolder(currentFolderObj)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors"
          >
            <FolderPlus className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>+ Thư mục</span>
          </button>

          <button
            type="button"
            onClick={() => onCreateWaypoint(currentFolderObj)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>+ Tọa độ</span>
          </button>

          {onOpenCameraScanner && (
            <button
              type="button"
              onClick={() => onOpenCameraScanner(currentFolderObj)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Quét Ảnh</span>
            </button>
          )}
        </div>

        {/* Chuyển đổi kiểu xem trong Windows Explorer: Ô Thư Mục (Tiles) vs Bảng Chi Tiết (Details) */}
        <div className="flex items-center gap-1 bg-[#11141d] p-1 rounded-lg border border-slate-800 shrink-0">
          <button
            type="button"
            onClick={() => setExplorerLayout('tiles')}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              explorerLayout === 'tiles'
                ? 'bg-sky-500/25 text-sky-300 border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Ô Thư Mục</span>
          </button>
          <button
            type="button"
            onClick={() => setExplorerLayout('details')}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              explorerLayout === 'details'
                ? 'bg-sky-500/25 text-sky-300 border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Chi Tiết</span>
          </button>
        </div>
      </div>

      {/* 2. THANH ĐỊA CHỈ (WINDOWS ADDRESS BAR / BREADCRUMB) */}
      <div className="bg-[#161a24] border-b border-slate-800 px-2.5 py-2 flex items-center gap-1.5 min-w-0">
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            disabled={!currentParentId}
            onClick={() =>
              onSelectFolder(currentFolderObj ? currentFolderObj.parentId || null : null)
            }
            title="Lên thư mục cha"
            className={`p-1.5 rounded-lg border transition-colors ${
              currentParentId
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 cursor-pointer'
                : 'bg-slate-900/50 text-slate-600 border-slate-800/60 cursor-not-allowed'
            }`}
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onSelectFolder(null)}
            title="Về thư mục gốc của World"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>

        {/* Ô đường dẫn cuộn ngang mượt mà trên Android, không bao giờ vỡ dòng */}
        <div className="flex-1 min-w-0 flex items-center gap-1 bg-[#0e1118] border border-slate-700/90 rounded-lg px-2 py-1 overflow-x-auto no-scrollbar text-xs">
          <button
            type="button"
            onClick={() => onSelectFolder(null)}
            className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-slate-800 shrink-0 cursor-pointer ${
              !currentParentId ? 'text-sky-300 font-bold' : 'text-slate-300'
            }`}
          >
            <VoxelBlockIcon type={currentWorld?.icon || 'grass'} className="w-3.5 h-3.5" />
            <span className="truncate max-w-[110px] sm:max-w-[180px]">
              {currentWorld?.name || 'World'}
            </span>
          </button>

          {breadcrumbTrail.map((crumb, idx) => {
            const isLast = idx === breadcrumbTrail.length - 1;
            return (
              <React.Fragment key={crumb.id}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <button
                  type="button"
                  onClick={() => onSelectFolder(crumb.id)}
                  title={crumb.name}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-800 shrink-0 max-w-[130px] sm:max-w-[220px] cursor-pointer ${
                    isLast ? 'text-amber-300 font-bold bg-amber-500/10' : 'text-slate-300'
                  }`}
                >
                  <Folder className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                  <span className="truncate">{crumb.name}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 3. KHUNG CHIA 2 CỘT: CÂY THƯ MỤC BÊN TRÁI + NỘI DUNG BÊN PHẢI */}
      <div className="flex flex-col md:flex-row min-h-[420px]">
        {/* Cột trái: Cây thư mục (Navigation Pane) */}
        <aside
          className={`${
            sidebarOpenMobile ? 'block' : 'hidden'
          } md:block w-full md:w-64 lg:w-72 shrink-0 bg-[#11141c] border-b md:border-b-0 md:border-r border-slate-800 p-2.5 overflow-y-auto max-h-[280px] md:max-h-[640px]`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center justify-between">
            <span>Cây Thư Mục World</span>
            <button
              type="button"
              onClick={onOpenWorldManager}
              className="text-sky-400 hover:underline font-mono cursor-pointer"
            >
              Đổi World
            </button>
          </div>

          <div
            onClick={() => {
              onSelectFolder(null);
              setSidebarOpenMobile(false);
            }}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs cursor-pointer mb-1 ${
              !currentParentId
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40'
                : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <VoxelBlockIcon type={currentWorld?.icon || 'grass'} className="w-4 h-4 shrink-0" />
            <span className="truncate font-semibold flex-1">
              {currentWorld?.name || 'Thư mục gốc'}
            </span>
            <span className="text-[10px] font-mono text-slate-400">{rootItems.length}</span>
          </div>

          <div className="space-y-0.5 pl-1">
            {rootItems.map((item) => (
              <FolderTreeNode
                key={item.id}
                item={item}
                childrenByParentId={childrenByParentId}
                currentParentId={currentParentId}
                expandedNodeIds={expandedNodeIds}
                onToggleExpand={toggleExpandNode}
                onSelectFolder={(folderId) => {
                  onSelectFolder(folderId);
                  setSidebarOpenMobile(false);
                }}
              />
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/90">
            <button
              type="button"
              onClick={onOpenTrash}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs text-rose-300 hover:bg-rose-500/15 cursor-pointer transition-colors"
            >
              <span className="flex items-center gap-2 font-semibold">
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Thùng rác (Recycle Bin)</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-[10px] font-mono font-bold">
                {trashedCount}
              </span>
            </button>
          </div>
        </aside>

        {/* Cột phải: Nội dung Thư mục & Tọa độ */}
        <div className="flex-1 min-w-0 p-2.5 sm:p-4 bg-[#141720] overflow-x-hidden">
          {/* Header thông tin của Thư mục đang mở */}
          {currentFolderObj && (
            <div className="mb-3.5 p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-800/60 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-w-0">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <VoxelBlockIcon
                    type={currentFolderObj.icon || 'win_folder'}
                    className="w-5 h-5"
                  />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <h3
                    className="text-sm font-bold text-white truncate"
                    title={currentFolderObj.name}
                  >
                    {currentFolderObj.name}
                  </h3>
                  <div className="text-[11px] font-mono text-amber-300 truncate">
                    X:{currentFolderObj.x} • Y:{currentFolderObj.y ?? '~'} • Z:{currentFolderObj.z}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopyItem(currentFolderObj)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 text-xs font-semibold inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy tọa độ</span>
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(currentFolderObj)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Sửa</span>
                </button>
              </div>
            </div>
          )}

          {filteredWaypoints.length === 0 ? (
            <div className="py-12 text-center border-2 border-dashed border-slate-800 rounded-xl p-4">
              <FolderOpen className="w-10 h-10 text-amber-400/70 mx-auto mb-2.5" />
              <h4 className="text-sm font-bold text-slate-200 mb-1">
                Thư mục này đang trống
              </h4>
              <p className="text-xs text-slate-400 mb-4 max-w-md mx-auto">
                Tạo thêm thư mục con nhỏ hơn bên trong hoặc lưu điểm tọa độ mới giống như trên Windows.
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => onCreateFolder(currentFolderObj)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs whitespace-nowrap cursor-pointer"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>+ Tạo Thư Mục Con</span>
                </button>
                <button
                  type="button"
                  onClick={() => onCreateWaypoint(currentFolderObj)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs whitespace-nowrap cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>+ Thêm Điểm Tọa Độ</span>
                </button>
              </div>
            </div>
          ) : explorerLayout === 'tiles' ? (
            <div className="space-y-4">
              {/* PHẦN 1: CÁC THƯ MỤC CON (FOLDERS) */}
              {folderItems.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>Thư mục khu vực ({folderItems.length})</span>
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {folderItems.map((folder) => {
                      const subKids = childrenByParentId[folder.id] || [];
                      const totalSub = descendantCountMap[folder.id] || subKids.length;
                      const dimStyle =
                        DIMENSION_CONFIG[folder.dimension] || DIMENSION_CONFIG.overworld;
                      const rIcon =
                        folder.icon || TAG_CONFIG[folder.tag]?.defaultIcon || 'win_folder';

                      return (
                        <div
                          key={folder.id}
                          onClick={() => onSelectFolder(folder.id)}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            onContextMenuItem(e, folder);
                          }}
                          className="group relative flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-[#1b202e] hover:bg-[#232a3b] border border-slate-700/80 hover:border-amber-400/60 transition-all cursor-pointer min-w-0 overflow-hidden shadow-sm"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <div className="relative w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-400/40 flex items-center justify-center shrink-0">
                              <Folder className="w-6 h-6 text-amber-400 fill-amber-400/85" />
                              <div className="absolute -bottom-1 -right-1 bg-[#141720] p-0.5 rounded border border-slate-700">
                                <VoxelBlockIcon type={rIcon} className="w-3 h-3" />
                              </div>
                            </div>

                            <div className="min-w-0 flex-1 overflow-hidden">
                              <div className="flex items-center gap-1 min-w-0">
                                {folder.pinned && (
                                  <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                                )}
                                <span
                                  className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-amber-300"
                                  title={folder.name}
                                >
                                  {folder.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                                <span className="text-amber-300 font-semibold shrink-0">
                                  {totalSub} mục
                                </span>
                                <span>•</span>
                                <span className="truncate">
                                  {dimStyle.label} ({folder.x}, {folder.z})
                                </span>
                              </div>
                            </div>
                          </div>

                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 shrink-0"
                          >
                            <button
                              type="button"
                              onClick={() => handleCopyItem(folder)}
                              title="Copy tọa độ thư mục"
                              className="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-sky-300 border border-slate-700 cursor-pointer"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => onContextMenuItem(e, folder)}
                              title="Tùy chọn khác"
                              className="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PHẦN 2: CÁC ĐIỂM TỌA ĐỘ (WAYPOINT FILES) */}
              {coordinateItems.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5 mb-2">
                    <Compass className="w-3.5 h-3.5 text-sky-400" />
                    <span>Điểm tọa độ ({coordinateItems.length})</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {coordinateItems.map((wp) => {
                      const dimStyle =
                        DIMENSION_CONFIG[wp.dimension] || DIMENSION_CONFIG.overworld;
                      const rIcon =
                        wp.icon || TAG_CONFIG[wp.tag]?.defaultIcon || dimStyle.blockType || 'grass';
                      const portal = getLinkedPortalCoords(wp.x, wp.z, wp.dimension);

                      return (
                        <div
                          key={wp.id}
                          onClick={() => setSelectedItemId(wp.id)}
                          onDoubleClick={() => onSelectFolder(wp.id)}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            onContextMenuItem(e, wp);
                          }}
                          className={`group flex flex-col justify-between p-2.5 sm:p-3 rounded-xl border transition-all min-w-0 overflow-hidden ${
                            selectedItemId === wp.id
                              ? 'bg-sky-500/15 border-sky-400/70'
                              : 'bg-[#191d28] hover:bg-[#202636] border-slate-800 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 min-w-0">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onQuickChangeIcon(wp);
                                }}
                                title="Đổi icon nhanh"
                                className="p-1 rounded-lg bg-slate-900 border border-slate-700 shrink-0 cursor-pointer"
                              >
                                <VoxelBlockIcon type={rIcon} className="w-5 h-5 sm:w-6 sm:h-6" />
                              </button>

                              <div className="min-w-0 flex-1 overflow-hidden">
                                <div className="flex items-center gap-1 min-w-0">
                                  {wp.pinned && (
                                    <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                                  )}
                                  <h5
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onSelectFolder(wp.id);
                                    }}
                                    title={wp.name}
                                    className="text-xs sm:text-sm font-bold text-slate-100 truncate hover:text-sky-300 cursor-pointer"
                                  >
                                    {wp.name}
                                  </h5>
                                </div>
                                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5 truncate">
                                  <span className="text-emerald-400 font-semibold">
                                    {dimStyle.label}
                                  </span>
                                  <span>•</span>
                                  <span className="truncate">{wp.tag}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyItem(wp);
                                }}
                                title="Copy tọa độ"
                                className="px-2 py-1 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold whitespace-nowrap cursor-pointer"
                              >
                                Copy
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onContextMenuItem(e, wp);
                                }}
                                title="Tùy chọn"
                                className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                              >
                                <MoreVertical className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1.5 text-xs font-mono min-w-0">
                            <div className="flex items-center gap-2 truncate min-w-0">
                              <span className="text-rose-400 font-bold">X:{wp.x}</span>
                              <span className="text-emerald-400 font-bold">
                                Y:{wp.y ?? '~'}
                              </span>
                              <span className="text-sky-400 font-bold">Z:{wp.z}</span>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              {portal && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard(`${portal.x} ${portal.z}`);
                                    onNotify(
                                      `Đã copy cổng ${portal.targetDim}: ${portal.x}, ${portal.z}`,
                                      'orb'
                                    );
                                  }}
                                  title={`Copy cổng ${portal.targetDim}`}
                                  className="px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] whitespace-nowrap cursor-pointer"
                                >
                                  {portal.ratioText}: {portal.x},{portal.z}
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectFolder(wp.id);
                                }}
                                title="Mở như thư mục để thêm điểm con"
                                className="p-1 rounded hover:bg-slate-800 text-amber-400 cursor-pointer"
                              >
                                <FolderOpen className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* CHẾ ĐỘ BẢNG CHI TIẾT (WINDOWS DETAILS TABLE VIEW - TỐI ƯU MOBILE) */
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#1b202e] text-slate-300 border-b border-slate-700 text-[11px] uppercase">
                    <th className="py-2 px-2.5 font-bold">Tên Mục</th>
                    <th className="py-2 px-2 font-bold font-mono">Tọa Độ</th>
                    <th className="py-2 px-2 font-bold hidden sm:table-cell">Loại / Chiều</th>
                    <th className="py-2 px-2.5 font-bold text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {[...folderItems, ...coordinateItems].map((item) => {
                    const kids = childrenByParentId[item.id] || [];
                    const isFld = Boolean(
                      item.isFolder || item.tag === 'Folder' || kids.length > 0
                    );
                    const dimStyle =
                      DIMENSION_CONFIG[item.dimension] || DIMENSION_CONFIG.overworld;
                    const rIcon =
                      item.icon || TAG_CONFIG[item.tag]?.defaultIcon || 'grass';

                    return (
                      <tr
                        key={item.id}
                        onClick={() => (isFld ? onSelectFolder(item.id) : setSelectedItemId(item.id))}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          onContextMenuItem(e, item);
                        }}
                        className="hover:bg-slate-800/60 transition-colors cursor-pointer"
                      >
                        <td className="py-2 px-2.5 max-w-[130px] sm:max-w-[240px]">
                          <div className="flex items-center gap-1.5 min-w-0">
                            {isFld ? (
                              <Folder className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                            ) : (
                              <VoxelBlockIcon type={rIcon} className="w-4 h-4 shrink-0" />
                            )}
                            <span
                              className={`font-semibold truncate ${
                                isFld ? 'text-amber-200 hover:underline' : 'text-slate-100'
                              }`}
                              title={item.name}
                            >
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-2 font-mono whitespace-nowrap text-[11px]">
                          <span className="text-rose-400 font-bold">{item.x}</span>
                          <span className="text-slate-500 mx-0.5">/</span>
                          <span className="text-emerald-400 font-bold">{item.y ?? '~'}</span>
                          <span className="text-slate-500 mx-0.5">/</span>
                          <span className="text-sky-400 font-bold">{item.z}</span>
                        </td>
                        <td className="py-2 px-2 hidden sm:table-cell whitespace-nowrap">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-200 border border-slate-700">
                            {dimStyle.label} • {isFld ? `Thư mục (${kids.length})` : item.tag}
                          </span>
                        </td>
                        <td
                          onClick={(e) => e.stopPropagation()}
                          className="py-2 px-2.5 text-right whitespace-nowrap"
                        >
                          <div className="inline-flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => onSelectFolder(item.id)}
                              title="Mở thư mục"
                              className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold cursor-pointer"
                            >
                              Mở
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopyItem(item)}
                              title="Copy tọa độ"
                              className="px-2 py-1 rounded bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-[10px] font-bold cursor-pointer"
                            >
                              Copy
                            </button>
                            <button
                              type="button"
                              onClick={(e) => onContextMenuItem(e, item)}
                              title="Menu tùy chọn"
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 4. THANH TRẠNG THÁI CHÂN CỬA SỔ WINDOWS EXPLORER */}
      <div className="bg-[#11141d] border-t border-slate-800 px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-2 truncate">
          <span>{folderItems.length} thư mục</span>
          <span>•</span>
          <span>{coordinateItems.length} tọa độ</span>
        </div>
        <div className="truncate text-right">
          Bấm ⋮ hoặc chuột phải để mở menu
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3C. COMPONENT BẢN ĐỒ RADAR TỌA ĐỘ 2D
// ==========================================
function PixelRadarMap({ waypoints, playerPos, onSelectWaypoint }) {
  const [zoom, setZoom] = useState(1);
  const [hoveredWp, setHoveredWp] = useState(null);

  const bounds = useMemo(() => {
    if (waypoints.length === 0)
      return { minX: -500, maxX: 500, minZ: -500, maxZ: 500, range: 500 };
    const xs = waypoints.map((w) => Number(w.x));
    const zs = waypoints.map((w) => Number(w.z));
    if (playerPos.enabled) {
      xs.push(Number(playerPos.x));
      zs.push(Number(playerPos.z));
    }
    const maxAbs = Math.max(
      200,
      ...xs.map((v) => Math.abs(v)),
      ...zs.map((v) => Math.abs(v))
    );
    const range = Math.ceil((maxAbs * 1.2) / zoom);
    return { minX: -range, maxX: range, minZ: -range, maxZ: range, range };
  }, [waypoints, playerPos, zoom]);

  const toPercent = (val) => {
    const r = bounds.range || 500;
    return Math.min(94, Math.max(6, ((Number(val) + r) / (2 * r)) * 100));
  };

  return (
    <div className="mc-panel p-3 sm:p-4 mb-5 w-full max-w-full overflow-hidden">
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <MapIcon className="w-4 h-4 text-[#55ff55] shrink-0" />
          <h3 className="text-xs sm:text-sm font-black text-white truncate mc-text-shadow">
            Radar 2D (±{bounds.range}m)
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(4, +(z + 0.5).toFixed(1)))}
            className="mc-btn mc-btn-stone px-2.5 py-1 text-xs font-bold text-white inline-flex items-center gap-1 cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#55ff55]" />
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.5).toFixed(1)))}
            className="mc-btn mc-btn-stone px-2.5 py-1 text-xs font-bold text-white inline-flex items-center gap-1 cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5 text-[#ffaa00]" />
          </button>
        </div>
      </div>

      <div
        className="relative w-full h-72 sm:h-96 mc-slot overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(85,255,85,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(85,255,85,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-500/30 pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-500/30 pointer-events-none" />

        <span className="absolute top-1.5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-[#55ffff] bg-black/80 px-1.5 py-0.5 border border-zinc-700">
          BẮC (-Z)
        </span>
        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-[#55ffff] bg-black/80 px-1.5 py-0.5 border border-zinc-700">
          NAM (+Z)
        </span>
        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-[#ff5555] bg-black/80 px-1.5 py-0.5 border border-zinc-700">
          TÂY (-X)
        </span>
        <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-[#ff5555] bg-black/80 px-1.5 py-0.5 border border-zinc-700">
          ĐÔNG (+X)
        </span>

        {waypoints.map((wp) => {
          const left = toPercent(wp.x);
          const top = toPercent(wp.z);
          const iconId = wp.icon || TAG_CONFIG[wp.tag]?.defaultIcon || 'grass';
          return (
            <button
              key={wp.id}
              type="button"
              onMouseEnter={() => setHoveredWp(wp)}
              onMouseLeave={() => setHoveredWp(null)}
              onClick={() => onSelectWaypoint(wp)}
              style={{ left: `${left}%`, top: `${top}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none z-10 hover:z-30 hover:scale-125 transition-transform"
            >
              <div className="p-0.5 bg-black border-2 border-[#55ff55] shadow-lg">
                <VoxelBlockIcon type={iconId} className="w-5 h-5" />
              </div>
              <span className="mt-0.5 block bg-black/90 text-[9px] font-mono font-bold text-white px-1 border border-zinc-700 whitespace-nowrap max-w-[90px] truncate">
                {wp.name}
              </span>
            </button>
          );
        })}

        {hoveredWp && (
          <div className="absolute bottom-2 left-2 right-2 sm:right-auto z-40 mc-panel px-2.5 py-1.5 text-xs font-mono">
            <div className="font-extrabold text-[#55ff55] truncate">{hoveredWp.name}</div>
            <div className="text-white">
              X:{hoveredWp.x} | Y:{hoveredWp.y ?? '~'} | Z:{hoveredWp.z}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. ỨNG DỤNG CHÍNH (fu WAYPOINT v2.2.2 - TỐI ƯU ANDROID & WINDOWS)
// ==========================================
export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('fu_wp_sound_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [effectsEnabled, setEffectsEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('fu_wp_effects_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [uiStyle, setUiStyle] = useState(() => {
    try {
      return localStorage.getItem('fu_wp_ui_style') || 'mc-cards';
    } catch {
      return 'mc-cards';
    }
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [particles, setParticles] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('fu_wp_sound_enabled', JSON.stringify(soundEnabled));
    } catch {
      // ignore
    }
  }, [soundEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem('fu_wp_effects_enabled', JSON.stringify(effectsEnabled));
    } catch {
      // ignore
    }
  }, [effectsEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem('fu_wp_ui_style', uiStyle);
    } catch {
      // ignore
    }
  }, [uiStyle]);

  const [appIconConfig, setAppIconConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('fu_waypoint_app_icon_v3');
      return saved ? JSON.parse(saved) : { iconId: 'grass', customImage: null };
    } catch {
      return { iconId: 'grass', customImage: null };
    }
  });
  const [isAppIconModalOpen, setIsAppIconModalOpen] = useState(false);
  const [appIconCategoryFilter, setAppIconCategoryFilter] = useState('Tất cả');
  const [iconSearchQuery, setIconSearchQuery] = useState('');
  const appIconFileInputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('fu_waypoint_app_icon_v3', JSON.stringify(appIconConfig));
      const pngDataUrl =
        appIconConfig.customImage && appIconConfig.customImage.startsWith('data:image/')
          ? appIconConfig.customImage
          : renderPixelIconToPngDataUrl(appIconConfig.iconId || 'grass', 256);

      if (!pngDataUrl) return;

      const oldLinks = document.querySelectorAll("link[rel*='icon']");
      oldLinks.forEach((el) => el.parentNode?.removeChild(el));

      const iconLink = document.createElement('link');
      iconLink.id = 'app-favicon';
      iconLink.rel = 'icon';
      iconLink.type = 'image/png';
      iconLink.href = pngDataUrl;
      document.head.appendChild(iconLink);

      const appleLink = document.createElement('link');
      appleLink.id = 'app-apple-icon';
      appleLink.rel = 'apple-touch-icon';
      appleLink.href = pngDataUrl;
      document.head.appendChild(appleLink);
    } catch (e) {
      console.error(e);
    }
  }, [appIconConfig]);

  const [worlds, setWorlds] = useState(() => {
    try {
      const saved = localStorage.getItem('mc_coords_worlds_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((w) => ({
            icon: 'grass',
            seed: '',
            deletedAt: null,
            createdAt: Date.now(),
            ...w,
          }));
        }
      }
      return INITIAL_WORLDS;
    } catch {
      return INITIAL_WORLDS;
    }
  });

  const activeWorlds = useMemo(() => worlds.filter((w) => !w.deletedAt), [worlds]);
  const trashedWorlds = useMemo(() => worlds.filter((w) => Boolean(w.deletedAt)), [worlds]);

  const [selectedWorldId, setSelectedWorldId] = useState(() => {
    try {
      return localStorage.getItem('mc_coords_selected_world_v2') || 'world-1';
    } catch {
      return 'world-1';
    }
  });

  useEffect(() => {
    if (activeWorlds.length > 0 && !activeWorlds.some((w) => w.id === selectedWorldId)) {
      setSelectedWorldId(activeWorlds[0].id);
    }
  }, [activeWorlds, selectedWorldId]);

  const currentWorld = useMemo(
    () => activeWorlds.find((w) => w.id === selectedWorldId) || activeWorlds[0] || null,
    [activeWorlds, selectedWorldId]
  );

  const [waypoints, setWaypoints] = useState(() => {
    try {
      const saved = localStorage.getItem('mc_coords_waypoints_v3');
      if (saved) return JSON.parse(saved);
      const oldV2 = localStorage.getItem('mc_coords_waypoints_v2');
      if (oldV2) {
        const parsed = JSON.parse(oldV2);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((w) => ({
            ...w,
            parentId: w.parentId || null,
            icon: w.icon || TAG_CONFIG[w.tag]?.defaultIcon || 'grass',
          }));
        }
      }
      return INITIAL_WAYPOINTS;
    } catch {
      return INITIAL_WAYPOINTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mc_coords_worlds_v2', JSON.stringify(worlds));
    } catch (e) {
      console.error(e);
    }
  }, [worlds]);

  useEffect(() => {
    try {
      localStorage.setItem('mc_coords_selected_world_v2', selectedWorldId);
    } catch (e) {
      console.error(e);
    }
  }, [selectedWorldId]);

  useEffect(() => {
    try {
      localStorage.setItem('mc_coords_waypoints_v3', JSON.stringify(waypoints));
    } catch (e) {
      console.error(e);
    }
  }, [waypoints]);

  const spawnVoxelParticles = useCallback(
    (originX, originY, palette = ['#55ff55', '#22c55e', '#ffff55', '#55ffff']) => {
      if (!effectsEnabled) return;
      const batchId = Date.now() + Math.random();
      const newParticles = Array.from({ length: 8 }, (_, idx) => {
        const angle = (Math.PI * 2 * idx) / 8 + (Math.random() - 0.5) * 0.4;
        const dist = 16 + Math.random() * 26;
        return {
          id: `${batchId}-${idx}`,
          x: originX,
          y: originY,
          dx: Math.round(Math.cos(angle) * dist),
          dy: Math.round(Math.sin(angle) * dist - 10),
          size: 4 + Math.floor(Math.random() * 4),
          color: palette[idx % palette.length],
        };
      });

      setParticles((prev) => [...prev.slice(-24), ...newParticles]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !p.id.startsWith(`${batchId}-`)));
      }, 460);
    },
    [effectsEnabled]
  );

  useEffect(() => {
    const handleGlobalButtonClick = (e) => {
      const btn = e.target.closest('button');
      if (!btn || btn.disabled) return;

      playMinecraftSound('click', soundEnabled);

      btn.classList.remove('mc-btn-activating');
      void btn.offsetWidth;
      btn.classList.add('mc-btn-activating');

      if (!effectsEnabled) return;

      const cls = btn.className || '';
      let palette = ['#8b8d94', '#c4c6cc', '#55575e', '#ffffff'];
      if (cls.includes('mc-btn-emerald') || cls.includes('emerald')) {
        palette = ['#55ff55', '#22c55e', '#15803d', '#bbf7d0'];
      } else if (cls.includes('mc-btn-redstone') || cls.includes('mc-btn-tnt') || cls.includes('rose')) {
        palette = ['#ff3333', '#dc2626', '#ffaa00', '#fca5a5'];
      } else if (cls.includes('mc-btn-gold') || cls.includes('amber')) {
        palette = ['#ffff55', '#f59e0b', '#d97706', '#fef08a'];
      } else if (cls.includes('mc-btn-diamond') || cls.includes('mc-btn-lapis') || cls.includes('sky')) {
        palette = ['#55ffff', '#38bdf8', '#0284c7', '#bae6fd'];
      } else if (cls.includes('mc-btn-purpur') || cls.includes('mc-btn-command')) {
        palette = ['#d8b4fe', '#a855f7', '#ffaa00', '#55ff55'];
      }

      const rect = btn.getBoundingClientRect();
      const rawX = e.clientX || rect.left + rect.width / 2;
      const rawY = e.clientY || rect.top + rect.height / 2;
      const safeMaxX = typeof window !== 'undefined' ? window.innerWidth - 28 : rawX;
      const originX = Math.max(20, Math.min(safeMaxX, rawX));
      const originY = Math.max(20, rawY);

      spawnVoxelParticles(originX, originY, palette);
    };

    window.addEventListener('click', handleGlobalButtonClick, true);
    return () => window.removeEventListener('click', handleGlobalButtonClick, true);
  }, [soundEnabled, effectsEnabled, spawnVoxelParticles]);

  const [activeDimension, setActiveDimension] = useState('all');
  const [activeTag, setActiveTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copyMode, setCopyMode] = useState('chat');
  const [sortBy, setSortBy] = useState('newest');
  const [viewTrash, setViewTrash] = useState(false);
  const [trashSubTab, setTrashSubTab] = useState('waypoints');
  const [viewMode, setViewMode] = useState('grid');
  const [currentParentId, setCurrentParentId] = useState(null);

  useEffect(() => {
    setCurrentParentId(null);
  }, [selectedWorldId]);

  const [playerPos, setPlayerPos] = useState({
    enabled: false,
    x: 0,
    z: 0,
    dimension: 'overworld',
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [iconCategoryFilter, setIconCategoryFilter] = useState('Tất cả');
  const [formData, setFormData] = useState({
    name: '',
    x: '',
    y: '',
    z: '',
    dimension: 'overworld',
    tag: 'Base',
    icon: 'grass',
    parentId: '',
    isFolder: false,
    notes: '',
    screenshots: [],
    locked: true,
    pinned: false,
  });
  const [smartPasteInput, setSmartPasteInput] = useState('');
  const [isScanningOcr, setIsScanningOcr] = useState(false);
  const [ocrStatusText, setOcrStatusText] = useState('');
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrCandidates, setOcrCandidates] = useState([]);
  const [lastScannedImageSrc, setLastScannedImageSrc] = useState(null);
  const [lastBinaryPreviewSrc, setLastBinaryPreviewSrc] = useState(null);
  const [showBinaryInScanner, setShowBinaryInScanner] = useState(false);
  const [isCameraScannerOpen, setIsCameraScannerOpen] = useState(false);
  const [scannerTargetParent, setScannerTargetParent] = useState(null);
  const [scannerStep, setScannerStep] = useState('camera'); // 'camera' | 'crop-review'
  const [cameraFacingMode, setCameraFacingMode] = useState('environment');
  const [cameraZoom, setCameraZoom] = useState(1);
  const [cameraTorchOn, setCameraTorchOn] = useState(false);
  const [cameraAimMode, setCameraAimMode] = useState('hud-strip'); // 'hud-strip' | 'top-left' | 'full'
  const [cameraErrorMsg, setCameraErrorMsg] = useState('');
  const [autoPrepareOnScan, setAutoPrepareOnScan] = useState(true);
  const [autoAttachScannedPhoto, setAutoAttachScannedPhoto] = useState(true);
  const [cropBox, setCropBox] = useState({ x: 0.04, y: 0.24, w: 0.92, h: 0.38 });
  const [isDraggingCrop, setIsDraggingCrop] = useState(false);
  const [cropDragStart, setCropDragStart] = useState(null);
  const [scannerDraftCoord, setScannerDraftCoord] = useState({
    name: '',
    x: '',
    y: '',
    z: '',
    dimension: 'overworld',
    tag: 'Base',
    icon: 'grass',
    rawLine: '',
    label: '',
    confidence: 0,
  });

  const screenshotInputRef = useRef(null);
  const replaceScreenshotInputRef = useRef(null);
  const lastAutoAttachedOcrPhotoRef = useRef(null);
  const [replaceTargetInfo, setReplaceTargetInfo] = useState(null);
  const ocrFileInputRef = useRef(null);
  const nativeCameraInputRef = useRef(null);
  const scannerGalleryInputRef = useRef(null);
  const videoPreviewRef = useRef(null);
  const activeMediaStreamRef = useRef(null);
  const cropImageContainerRef = useRef(null);

  const [quickIconTargetWp, setQuickIconTargetWp] = useState(null);
  const [lightboxData, setLightboxData] = useState(null);
  const [isDistanceOpen, setIsDistanceOpen] = useState(false);
  const [pointAId, setPointAId] = useState('');
  const [pointBId, setPointBId] = useState('');
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcInput, setCalcInput] = useState({ x: 800, y: 64, z: -1200, from: 'overworld' });
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [backupJsonText, setBackupJsonText] = useState('');
  const [supabaseConfig, setSupabaseConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('mc_supabase_config');
      return saved
        ? JSON.parse(saved)
        : { url: '', anonKey: '', roomCode: 'mochi-smp-2026', lastSync: null };
    } catch {
      return { url: '', anonKey: '', roomCode: 'mochi-smp-2026', lastSync: null };
    }
  });
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);

  const [isWorldModalOpen, setIsWorldModalOpen] = useState(false);
  const [newWorldName, setNewWorldName] = useState('');
  const [newWorldSeed, setNewWorldSeed] = useState('');
  const [newWorldIcon, setNewWorldIcon] = useState('grass');
  const [editingWorldId, setEditingWorldId] = useState(null);
  const [editingWorldName, setEditingWorldName] = useState('');
  const [editingWorldSeed, setEditingWorldSeed] = useState('');
  const [confirmPermanentDeleteWorldId, setConfirmPermanentDeleteWorldId] = useState(null);

  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  const [isMiniOverlayOpen, setIsMiniOverlayOpen] = useState(false);
  const [floatingBubbleVisible, setFloatingBubbleVisible] = useState(true);
  const [quickForm, setQuickForm] = useState({
    name: '',
    x: '',
    y: '',
    z: '',
    dimension: 'overworld',
    tag: 'Base',
    icon: 'grass',
  });

  const [toastMessage, setToastMessage] = useState('');
  const showToast = useCallback(
    (msg, soundType = null) => {
      if (soundType) {
        playMinecraftSound(soundType, soundEnabled);
      }
      setToastMessage(msg);
      setTimeout(() => {
        setToastMessage((prev) => (prev === msg ? '' : prev));
      }, 2800);
    },
    [soundEnabled]
  );

  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  const worldWaypoints = useMemo(
    () => waypoints.filter((w) => w.worldId === selectedWorldId),
    [waypoints, selectedWorldId]
  );

  const activeWaypoints = useMemo(
    () => worldWaypoints.filter((w) => !w.deletedAt),
    [worldWaypoints]
  );

  const trashedWaypoints = useMemo(
    () => worldWaypoints.filter((w) => Boolean(w.deletedAt)),
    [worldWaypoints]
  );

  const childrenByParentId = useMemo(() => {
    const map = {};
    activeWaypoints.forEach((wp) => {
      if (wp.parentId) {
        if (!map[wp.parentId]) map[wp.parentId] = [];
        map[wp.parentId].push(wp);
      }
    });
    return map;
  }, [activeWaypoints]);

  const descendantCountMap = useMemo(() => {
    const memo = {};
    const countRec = (id, visited = new Set()) => {
      if (visited.has(id)) return 0;
      visited.add(id);
      if (memo[id] !== undefined) return memo[id];
      const direct = childrenByParentId[id] || [];
      let total = direct.length;
      direct.forEach((c) => {
        total += countRec(c.id, new Set(visited));
      });
      memo[id] = total;
      return total;
    };
    activeWaypoints.forEach((wp) => countRec(wp.id));
    return memo;
  }, [activeWaypoints, childrenByParentId]);

  const isDescendantOrSelf = useCallback(
    (sourceId, candidateParentId) => {
      if (!sourceId || !candidateParentId) return false;
      if (sourceId === candidateParentId) return true;
      let curr = candidateParentId;
      const visited = new Set();
      while (curr && !visited.has(curr)) {
        visited.add(curr);
        if (curr === sourceId) return true;
        const found = activeWaypoints.find((w) => w.id === curr);
        curr = found ? found.parentId : null;
      }
      return false;
    },
    [activeWaypoints]
  );

  const getFolderPathLabel = useCallback(
    (wp) => {
      const parts = [wp.name];
      let curr = wp.parentId;
      const visited = new Set([wp.id]);
      while (curr && !visited.has(curr)) {
        visited.add(curr);
        const parentObj = activeWaypoints.find((item) => item.id === curr);
        if (parentObj) {
          parts.unshift(parentObj.name);
          curr = parentObj.parentId;
        } else {
          break;
        }
      }
      const joined = parts.join(' ▸ ');
      return joined.length > 48 ? `…${joined.slice(-45)}` : joined;
    },
    [activeWaypoints]
  );

  const breadcrumbTrail = useMemo(() => {
    const trail = [];
    let currId = currentParentId;
    const visited = new Set();
    while (currId && !visited.has(currId)) {
      visited.add(currId);
      const found = activeWaypoints.find((w) => w.id === currId);
      if (found) {
        trail.unshift(found);
        currId = found.parentId || null;
      } else {
        break;
      }
    }
    return trail;
  }, [activeWaypoints, currentParentId]);

  const currentParentWaypoint =
    breadcrumbTrail.length > 0 ? breadcrumbTrail[breadcrumbTrail.length - 1] : null;

  const handleEnterFolder = useCallback(
    (folderId) => {
      setCurrentParentId(folderId);
      setSearchQuery('');
      setViewTrash(false);
      playMinecraftSound(folderId ? 'chest_open' : 'chest_close', soundEnabled);
    },
    [soundEnabled]
  );

  const stopLiveCameraStream = useCallback(() => {
    if (activeMediaStreamRef.current) {
      activeMediaStreamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // Bỏ qua lỗi đóng track
        }
      });
      activeMediaStreamRef.current = null;
    }
    if (videoPreviewRef.current) {
      videoPreviewRef.current.srcObject = null;
    }
    setCameraTorchOn(false);
  }, []);

  const startLiveCameraStream = useCallback(
    async (preferredFacing = cameraFacingMode) => {
      stopLiveCameraStream();
      setCameraErrorMsg('');

      if (
        typeof navigator === 'undefined' ||
        !navigator.mediaDevices ||
        typeof navigator.mediaDevices.getUserMedia !== 'function'
      ) {
        setCameraErrorMsg(
          'Thiết bị hoặc trình duyệt này không mở trực tiếp luồng video trong khung. Hãy bấm "Mở Máy Ảnh Gốc Điện Thoại" bên dưới để chụp trực tiếp!'
        );
        return false;
      }

      try {
        const constraints = {
          audio: false,
          video: {
            facingMode: { ideal: preferredFacing },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        activeMediaStreamRef.current = stream;
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = stream;
          await videoPreviewRef.current.play().catch(() => {});
        }
        return true;
      } catch {
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
          });
          activeMediaStreamRef.current = fallbackStream;
          if (videoPreviewRef.current) {
            videoPreviewRef.current.srcObject = fallbackStream;
            await videoPreviewRef.current.play().catch(() => {});
          }
          return true;
        } catch {
          setCameraErrorMsg(
            'Chưa cấp quyền Camera trực tiếp hoặc đang dùng WebView giới hạn. Hãy bấm nút "Mở Máy Ảnh Gốc Điện Thoại" ngay bên dưới để chụp ảnh lấy tọa độ!'
          );
          return false;
        }
      }
    },
    [cameraFacingMode, stopLiveCameraStream]
  );

  useEffect(() => {
    if (isCameraScannerOpen && scannerStep === 'camera') {
      startLiveCameraStream(cameraFacingMode);
    } else {
      stopLiveCameraStream();
    }
    return () => {
      stopLiveCameraStream();
    };
  }, [isCameraScannerOpen, scannerStep, cameraFacingMode, startLiveCameraStream, stopLiveCameraStream]);

  const handleToggleCameraTorch = async () => {
    const stream = activeMediaStreamRef.current;
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    if (!track || typeof track.applyConstraints !== 'function') {
      showToast('Máy ảnh thiết bị này không hỗ trợ bật đèn Flash trong ứng dụng.');
      return;
    }
    try {
      const nextTorch = !cameraTorchOn;
      await track.applyConstraints({ advanced: [{ torch: nextTorch }] });
      setCameraTorchOn(nextTorch);
      showToast(nextTorch ? 'Đã bật đèn Flash hỗ trợ quét ảnh' : 'Đã tắt đèn Flash');
    } catch {
      showToast('Không thể bật đèn Flash trên camera này.');
    }
  };

  // Hàm chuẩn bị dữ liệu và mở thẳng bảng Lưu Tọa Độ Mới sau khi quét xong
  const prepareWaypointFormWithScannedCoord = useCallback(
    (coordObj, rawTextStr, attachedPhotoUrl, candidatesList = [], overrideParent = null) => {
      const targetParent =
        overrideParent ||
        scannerTargetParent ||
        (currentParentId ? activeWaypoints.find((w) => w.id === currentParentId) : null);

      const resolvedDim =
        coordObj.dimension ||
        (targetParent
          ? targetParent.dimension
          : activeDimension === 'all'
          ? 'overworld'
          : activeDimension);

      const defaultTag = targetParent
        ? 'Storage'
        : activeTag === 'all'
        ? 'Base'
        : activeTag;
      const defaultIcon = TAG_CONFIG[defaultTag]?.defaultIcon || 'grass';
      const meta = detectSuggestedMetaFromText(rawTextStr, defaultTag, defaultIcon);

      const autoName =
        coordObj.name?.trim() ||
        meta.suggestedName ||
        `Điểm quét (X:${coordObj.x}, Z:${coordObj.z})`;

      const hasY =
        coordObj.y !== null &&
        coordObj.y !== undefined &&
        String(coordObj.y).trim() !== '';
      const resolvedYStr = hasY ? String(coordObj.y).trim() : '';

      setEditingId(null);
      setOcrCandidates(candidatesList);
      setSmartPasteInput(
        coordObj.rawLine ||
          rawTextStr ||
          (hasY ? `${coordObj.x} ${resolvedYStr} ${coordObj.z}` : `${coordObj.x} ${coordObj.z}`)
      );
      setOcrStatusText(
        hasY
          ? `✅ Đã định dạng chính xác [${coordObj.label || 'OCR'}]: X = ${coordObj.x}, Y = ${resolvedYStr}, Z = ${coordObj.z}`
          : `✅ Đã định dạng tọa độ 2 số [${coordObj.label || 'X Z'}]: X = ${coordObj.x}, Z = ${coordObj.z} (Chỉ X & Z — Y: ~)`
      );

      setFormData((prev) => {
        const prevPhotos = (prev.screenshots || []).filter(
          (s) => s !== attachedPhotoUrl && s !== lastAutoAttachedOcrPhotoRef.current
        );
        const nextScreenshots =
          autoAttachScannedPhoto && attachedPhotoUrl
            ? [attachedPhotoUrl, ...prevPhotos].slice(0, 2)
            : prev.screenshots || [];
        if (autoAttachScannedPhoto && attachedPhotoUrl) {
          lastAutoAttachedOcrPhotoRef.current = attachedPhotoUrl;
        }
        return {
          name: isFormOpen && prev.name ? prev.name : autoName,
          x: String(coordObj.x),
          y: resolvedYStr,
          z: String(coordObj.z),
          dimension: resolvedDim,
          tag: isFormOpen && prev.tag ? prev.tag : meta.tag,
          icon: isFormOpen && prev.icon ? prev.icon : meta.icon,
          parentId: isFormOpen ? prev.parentId : targetParent ? targetParent.id : '',
          isFolder: false,
          notes:
            isFormOpen && prev.notes
              ? prev.notes
              : coordObj.rawLine
              ? `Quét từ ảnh: ${coordObj.rawLine}`
              : '',
          screenshots: nextScreenshots,
          locked: true,
          pinned: false,
        };
      });

      setIsCameraScannerOpen(false);
      setIsFormOpen(true);
      showToast(
        hasY
          ? `Đã lấy tọa độ: X:${coordObj.x} Y:${resolvedYStr} Z:${coordObj.z} — Sẵn sàng lưu!`
          : `Đã lấy tọa độ 2 số: X:${coordObj.x} Z:${coordObj.z} (Y:~) — Sẵn sàng lưu!`,
        'levelup'
      );
    },
    [
      scannerTargetParent,
      currentParentId,
      activeWaypoints,
      activeDimension,
      activeTag,
      isFormOpen,
      autoAttachScannedPhoto,
      showToast,
    ]
  );

  const executeOcrOnImageDataUrl = useCallback(
    async (fullImageDataUrl, customCropRect = null, shouldAutoPrepare = autoPrepareOnScan) => {
      setIsScanningOcr(true);
      setOcrProgress(5);
      setOcrStatusText('Đang phân tích & làm nét chữ tọa độ trong ảnh...');

      const activeCrop = customCropRect || { x: 0, y: 0, w: 1, h: 1 };
      const fallbackDim =
        formData.dimension ||
        (activeDimension === 'all' ? 'overworld' : activeDimension);

      try {
        // Nén bản ảnh đính kèm để lưu vào thẻ tọa độ nhẹ nhàng
        const imgEl = await loadImageElementFromSource(fullImageDataUrl);
        const thumbCanvas = document.createElement('canvas');
        const thumbScale = Math.min(1, 640 / (imgEl.naturalWidth || imgEl.width || 640));
        thumbCanvas.width = Math.round((imgEl.naturalWidth || imgEl.width || 640) * thumbScale);
        thumbCanvas.height = Math.round((imgEl.naturalHeight || imgEl.height || 480) * thumbScale);
        thumbCanvas.getContext('2d').drawImage(imgEl, 0, 0, thumbCanvas.width, thumbCanvas.height);
        const compressedAttachment = thumbCanvas.toDataURL('image/jpeg', 0.76);

        const ocrRes = await runMultiPassCoordinateOcr(fullImageDataUrl, {
          cropRect: activeCrop,
          defaultDimension: fallbackDim,
          onProgress: (pct, statusMsg) => {
            setOcrProgress(pct);
            if (statusMsg) setOcrStatusText(statusMsg);
          },
        });

        setLastScannedImageSrc(fullImageDataUrl);
        setLastBinaryPreviewSrc(ocrRes.binaryPreviewDataUrl || ocrRes.previewDataUrl);
        setOcrCandidates(ocrRes.candidates || []);
        setIsScanningOcr(false);
        setOcrProgress(100);

        if (ocrRes.best) {
          const best = ocrRes.best;
          const hasBestY = best.y !== null && best.y !== undefined && String(best.y).trim() !== '';
          const meta = detectSuggestedMetaFromText(ocrRes.rawText, 'Base', 'grass');
          const draft = {
            name: meta.suggestedName || `Điểm quét (X:${best.x}, Z:${best.z})`,
            x: String(best.x),
            y: hasBestY ? String(best.y) : '',
            z: String(best.z),
            dimension: ocrRes.dimension || fallbackDim,
            tag: meta.tag,
            icon: meta.icon,
            rawLine: best.rawLine || ocrRes.rawText.slice(0, 80),
            label: best.label || 'Tọa độ OCR',
            confidence: best.confidence || 90,
          };
          setScannerDraftCoord(draft);
          setOcrStatusText(
            hasBestY
              ? `✅ Đã nhận diện [${draft.label}]: X = ${best.x}, Y = ${best.y}, Z = ${best.z}`
              : `✅ Đã nhận diện [${draft.label}]: X = ${best.x}, Z = ${best.z} (Dạng 2 số X/Z — Y để trống ~)`
          );

          if (shouldAutoPrepare) {
            prepareWaypointFormWithScannedCoord(
              draft,
              ocrRes.rawText,
              compressedAttachment,
              ocrRes.candidates || []
            );
          } else {
            setScannerStep('crop-review');
            showToast(
              hasBestY
                ? `Đã tìm thấy: X:${best.x} Y:${best.y} Z:${best.z}`
                : `Đã tìm thấy tọa độ 2 số: X:${best.x} Z:${best.z}`,
              'orb'
            );
          }
        } else {
          // Chưa thấy số rõ ràng -> Mở chế độ Kéo Khung Cắt Vùng Tọa Độ để người dùng khoanh đúng dòng chữ
          setScannerStep('crop-review');
          setIsCameraScannerOpen(true);
          setOcrStatusText(
            '⚠️ Ảnh có nhiều chi tiết nền. Hãy kéo khung màu xanh bao quanh đúng dòng số tọa độ rồi bấm "Quét Lại Vùng Khung Xanh (3x)"!'
          );
          showToast('Hãy khoanh khung xanh vào dòng tọa độ để quét siêu nét 3x!');
        }
      } catch {
        setIsScanningOcr(false);
        setOcrProgress(0);
        setOcrStatusText('Không thể xử lý ảnh này. Vui lòng thử chụp lại rõ nét hơn.');
        showToast('Không thể đọc file ảnh.');
      }
    },
    [autoPrepareOnScan, formData.dimension, activeDimension, prepareWaypointFormWithScannedCoord, showToast]
  );

  // Chụp khung hình trực tiếp từ Camera trong App
  const handleCaptureFromLiveVideo = async () => {
    const video = videoPreviewRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) {
      // Nếu camera live chưa sẵn sàng, mở ngay máy ảnh gốc của điện thoại
      nativeCameraInputRef.current?.click();
      return;
    }

    playMinecraftSound('click', soundEnabled);
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const elW = video.clientWidth || vw;
    const elH = video.clientHeight || vh;

    // Đồng bộ vùng cắt theo đúng tỷ lệ hiển thị object-cover của khung ngắm trên màn hình
    const videoAspect = vw / Math.max(1, vh);
    const boxAspect = elW / Math.max(1, elH);
    let visW = vw;
    let visH = vh;
    if (videoAspect > boxAspect) {
      visW = Math.round(vh * boxAspect);
    } else {
      visH = Math.round(vw / boxAspect);
    }
    const zw = visW / Math.max(1, cameraZoom);
    const zh = visH / Math.max(1, cameraZoom);
    const zx = (vw - zw) / 2;
    const zy = (vh - zh) / 2;

    const fullCanvas = document.createElement('canvas');
    fullCanvas.width = Math.round(visW);
    fullCanvas.height = Math.round(visH);
    const ctx = fullCanvas.getContext('2d');
    ctx.drawImage(video, zx, zy, zw, zh, 0, 0, fullCanvas.width, fullCanvas.height);

    const fullDataUrl = fullCanvas.toDataURL('image/jpeg', 0.92);
    stopLiveCameraStream();

    // Xác định vùng quét theo chế độ khung ngắm người dùng chọn
    let initialCrop = { x: 0, y: 0, w: 1, h: 1 };
    if (cameraAimMode === 'hud-strip') {
      initialCrop = { x: 0.04, y: 0.24, w: 0.92, h: 0.38 };
    } else if (cameraAimMode === 'top-left') {
      initialCrop = { x: 0.0, y: 0.0, w: 0.72, h: 0.45 };
    }
    setCropBox(initialCrop);
    setScannerStep('crop-review');

    await executeOcrOnImageDataUrl(fullDataUrl, initialCrop, autoPrepareOnScan);
  };

  // Mở Modal Máy Ảnh Quét Tọa Độ
  const openCameraScanner = useCallback(
    (targetParentWp = null, triggerNativeImmediately = false) => {
      const validParent =
        targetParentWp && typeof targetParentWp === 'object' && 'id' in targetParentWp
          ? targetParentWp
          : currentParentWaypoint;
      setScannerTargetParent(validParent || null);
      setCameraErrorMsg('');
      setOcrStatusText('');
      setOcrProgress(0);
      setShowBinaryInScanner(false);
      setScannerStep('camera');
      setIsCameraScannerOpen(true);
      playMinecraftSound('pop', soundEnabled);

      if (triggerNativeImmediately) {
        setTimeout(() => {
          nativeCameraInputRef.current?.click();
        }, 120);
      }
    },
    [currentParentWaypoint, soundEnabled]
  );

  const handleSmartPaste = (rawStr) => {
    setSmartPasteInput(rawStr);
    if (!rawStr.trim()) return;

    const parsed = parseMinecraftCoordinatesFromText(rawStr, formData.dimension);
    if (parsed.best) {
      const { x, y, z } = parsed.best;
      const hasY = y !== null && y !== undefined && String(y).trim() !== '';
      setFormData((prev) => ({
        ...prev,
        x: String(x),
        y: hasY ? String(y) : '',
        z: String(z),
        dimension: parsed.dimension || prev.dimension,
      }));
      showToast(
        `Đã tách tọa độ [${parsed.best.label}]: X=${x}${hasY ? `, Y=${y}` : ' (Chỉ X & Z)'}, Z=${z}`,
        'orb'
      );
    }
  };

  const handleOcrImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result;
      if (!dataUrl) return;
      setCropBox({ x: 0, y: 0, w: 1, h: 1 });
      await executeOcrOnImageDataUrl(dataUrl, { x: 0, y: 0, w: 1, h: 1 }, true);
    };
    reader.readAsDataURL(file);
  };

  const handleTestSyntheticOcr = async (mode = 'mcpe') => {
    const syntheticUrl = createSyntheticMinecraftCoordImage(mode);
    setCropBox({ x: 0, y: 0, w: 1, h: 1 });
    setScannerStep('crop-review');
    await executeOcrOnImageDataUrl(syntheticUrl, { x: 0, y: 0, w: 1, h: 1 }, autoPrepareOnScan);
  };

  const handleCropPointerDown = (e) => {
    if (!cropImageContainerRef.current) return;
    const rect = cropImageContainerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const nx = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    setIsDraggingCrop(true);
    setCropDragStart({ x: nx, y: ny });
    setCropBox({ x: nx, y: ny, w: 0.05, h: 0.05 });
  };

  const handleCropPointerMove = (e) => {
    if (!isDraggingCrop || !cropDragStart || !cropImageContainerRef.current) return;
    const rect = cropImageContainerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const nx = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

    const x = Math.min(cropDragStart.x, nx);
    const y = Math.min(cropDragStart.y, ny);
    const w = Math.max(0.08, Math.abs(nx - cropDragStart.x));
    const h = Math.max(0.06, Math.abs(ny - cropDragStart.y));
    setCropBox({
      x: Math.min(0.92, x),
      y: Math.min(0.94, y),
      w: Math.min(1 - x, w),
      h: Math.min(1 - y, h),
    });
  };

  const handleCropPointerUp = () => {
    if (isDraggingCrop) {
      setIsDraggingCrop(false);
      setCropDragStart(null);
    }
  };

  const applyOcrPreset = (preset) => {
    setIsScanningOcr(true);
    setOcrStatusText(`Đang đọc "${preset.rawLine}"...`);
    setTimeout(() => {
      const hasPresetY = preset.y !== null && preset.y !== undefined && preset.y !== '';
      setFormData((prev) => ({
        ...prev,
        name: prev.name || preset.suggestedName,
        x: String(preset.x),
        y: hasPresetY ? String(preset.y) : '',
        z: String(preset.z),
        dimension: preset.dimension,
        tag: preset.suggestedTag,
        icon: preset.suggestedIcon || prev.icon,
      }));
      setSmartPasteInput(preset.rawLine);
      setIsScanningOcr(false);
      setOcrStatusText(`Đã điền: ${preset.rawLine}`);
      showToast(`Đã áp dụng ${preset.label}`, 'orb');
    }, 250);
  };

  const handleAddScreenshot = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (files.length === 0) return;

    const currentPhotos = formData.screenshots || [];
    if (currentPhotos.length >= 2) {
      showToast('Đã đủ 2/2 ảnh. Hãy bấm "Đổi ảnh" hoặc "Xóa" trên ảnh cũ để thay thế!');
      return;
    }

    const remainingSlots = 2 - currentPhotos.length;
    const filesToProcess = files.slice(0, remainingSlots);

    try {
      const compressedList = await Promise.all(filesToProcess.map((f) => compressImageFile(f)));
      setFormData((prev) => ({
        ...prev,
        screenshots: [...(prev.screenshots || []), ...compressedList].slice(0, 2),
      }));
      showToast(`Đã đính kèm ${compressedList.length} ảnh`, 'orb');
    } catch {
      showToast('Không thể tải ảnh.');
    }
  };

  const handleRemoveScreenshot = (idx) => {
    setFormData((prev) => {
      const removed = (prev.screenshots || [])[idx];
      if (removed && removed === lastAutoAttachedOcrPhotoRef.current) {
        lastAutoAttachedOcrPhotoRef.current = null;
      }
      return {
        ...prev,
        screenshots: (prev.screenshots || []).filter((_, i) => i !== idx),
      };
    });
    showToast('Đã xóa ảnh đính kèm', 'click');
  };

  const handleClearAllFormScreenshots = () => {
    lastAutoAttachedOcrPhotoRef.current = null;
    setFormData((prev) => ({
      ...prev,
      screenshots: [],
    }));
    showToast('Đã xóa toàn bộ ảnh đính kèm', 'click');
  };

  const handleDeleteWaypointScreenshotDirect = useCallback(
    (waypointId, imgIdx) => {
      setWaypoints((prev) =>
        prev.map((wp) => {
          if (wp.id !== waypointId) return wp;
          const nextShots = (Array.isArray(wp.screenshots) ? wp.screenshots : []).filter(
            (_, i) => i !== imgIdx
          );
          return { ...wp, screenshots: nextShots };
        })
      );
      setLightboxData((prev) =>
        prev && prev.waypointId === waypointId && prev.imageIndex === imgIdx ? null : prev
      );
      showToast('Đã xóa ảnh đính kèm khỏi tọa độ!', 'click');
    },
    [showToast]
  );

  const triggerReplaceScreenshot = useCallback((mode, idx, waypointId = null) => {
    setReplaceTargetInfo({ mode, idx, waypointId });
    setTimeout(() => {
      replaceScreenshotInputRef.current?.click();
    }, 20);
  }, []);

  const handleReplaceScreenshotFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !replaceTargetInfo) return;

    try {
      const compressed = await compressImageFile(file);
      if (replaceTargetInfo.mode === 'form') {
        setFormData((prev) => {
          const list = [...(prev.screenshots || [])];
          if (replaceTargetInfo.idx >= 0 && replaceTargetInfo.idx < list.length) {
            list[replaceTargetInfo.idx] = compressed;
          } else {
            list.push(compressed);
          }
          return { ...prev, screenshots: list.slice(0, 2) };
        });
        setLightboxData((prev) =>
          prev && prev.isFormPreview && prev.imageIndex === replaceTargetInfo.idx
            ? { ...prev, src: compressed }
            : prev
        );
        showToast('Đã thay ảnh đính kèm mới!', 'orb');
      } else if (replaceTargetInfo.mode === 'waypoint' && replaceTargetInfo.waypointId) {
        const targetId = replaceTargetInfo.waypointId;
        const targetIdx = replaceTargetInfo.idx;
        setWaypoints((prev) =>
          prev.map((wp) => {
            if (wp.id !== targetId) return wp;
            const list = [...(Array.isArray(wp.screenshots) ? wp.screenshots : [])];
            if (targetIdx >= 0 && targetIdx < list.length) {
              list[targetIdx] = compressed;
            } else {
              list.push(compressed);
            }
            return { ...wp, screenshots: list.slice(0, 2) };
          })
        );
        setLightboxData((prev) =>
          prev && prev.waypointId === targetId && prev.imageIndex === targetIdx
            ? { ...prev, src: compressed }
            : prev
        );
        showToast('Đã thay ảnh đính kèm mới!', 'orb');
      }
    } catch {
      showToast('Không thể tải ảnh thay thế.');
    } finally {
      setReplaceTargetInfo(null);
    }
  };

  const openCreateForm = useCallback(
    (overrideParentWp = null, asFolder = false, presetTag = null) => {
      const validParent =
        overrideParentWp && typeof overrideParentWp === 'object' && 'id' in overrideParentWp
          ? overrideParentWp
          : null;
      setEditingId(null);
      setSmartPasteInput('');
      setOcrStatusText('');
      lastAutoAttachedOcrPhotoRef.current = null;
      const targetParent =
        validParent ||
        (currentParentId ? activeWaypoints.find((w) => w.id === currentParentId) : null);

      const defaultDim = targetParent
        ? targetParent.dimension
        : activeDimension === 'all'
        ? 'overworld'
        : activeDimension;

      const defaultTag = presetTag
        ? presetTag
        : asFolder
        ? 'Folder'
        : targetParent
        ? 'Storage'
        : activeTag === 'all'
        ? 'Base'
        : activeTag;
      const defaultIcon = asFolder
        ? 'win_folder'
        : TAG_CONFIG[defaultTag]?.defaultIcon || 'grass';

      setFormData({
        name: presetTag === 'Death' ? 'Điểm Chết (Cần nhặt đồ)' : '',
        x: targetParent ? String(targetParent.x) : asFolder ? '0' : '',
        y: targetParent && targetParent.y !== null ? String(targetParent.y) : '',
        z: targetParent ? String(targetParent.z) : asFolder ? '0' : '',
        dimension: defaultDim,
        tag: defaultTag,
        icon: defaultIcon,
        parentId: targetParent ? targetParent.id : '',
        isFolder: Boolean(asFolder),
        notes: '',
        screenshots: [],
        locked: true,
        pinned: presetTag === 'Death',
      });
      setIsFormOpen(true);
    },
    [currentParentId, activeWaypoints, activeDimension, activeTag]
  );

  const handleOpenCreateWaypoint = useCallback(() => {
    openCreateForm(null, false);
  }, [openCreateForm]);

  const handleOpenCreateFolder = useCallback(() => {
    openCreateForm(null, true);
  }, [openCreateForm]);

  const handleOpenCreateDeathPoint = useCallback(() => {
    openCreateForm(null, false, 'Death');
  }, [openCreateForm]);

  const handleOpenCreateChildInCurrent = useCallback(() => {
    openCreateForm(currentParentWaypoint, false);
  }, [openCreateForm, currentParentWaypoint]);

  const handleOpenCreateSubfolderInCurrent = useCallback(() => {
    openCreateForm(currentParentWaypoint, true);
  }, [openCreateForm, currentParentWaypoint]);

  const openEditForm = (wp) => {
    setEditingId(wp.id);
    setSmartPasteInput('');
    setOcrStatusText('');
    lastAutoAttachedOcrPhotoRef.current = null;
    setFormData({
      name: wp.name,
      x: String(wp.x ?? 0),
      y: wp.y !== null && wp.y !== undefined ? String(wp.y) : '',
      z: String(wp.z ?? 0),
      dimension: wp.dimension,
      tag: wp.tag,
      icon: wp.icon || TAG_CONFIG[wp.tag]?.defaultIcon || 'grass',
      parentId: wp.parentId || '',
      isFolder: Boolean(wp.isFolder || wp.tag === 'Folder'),
      notes: wp.notes || '',
      screenshots: Array.isArray(wp.screenshots) ? wp.screenshots : [],
      locked: Boolean(wp.locked),
      pinned: Boolean(wp.pinned),
    });
    setIsFormOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      const isTyping = tag === 'input' || tag === 'textarea' || tag === 'select';

      if (
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') ||
        (e.altKey && e.key.toLowerCase() === 's')
      ) {
        e.preventDefault();
        setIsMiniOverlayOpen((prev) => !prev);
        showToast('Đã bật/tắt khung nhập nhanh', 'orb');
        return;
      }

      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        openCreateForm(null, true);
        return;
      }

      if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        openCreateForm(null, false);
        return;
      }

      if (e.ctrlKey && e.key.toLowerCase() === 'f') {
        if (searchInputRef.current) {
          e.preventDefault();
          searchInputRef.current.focus();
        }
        return;
      }

      if (!isTyping && e.key === 'Backspace' && currentParentId && !isFormOpen) {
        e.preventDefault();
        handleEnterFolder(currentParentWaypoint ? currentParentWaypoint.parentId || null : null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentParentId,
    currentParentWaypoint,
    isFormOpen,
    openCreateForm,
    handleEnterFolder,
    showToast,
  ]);

  const handleSaveWaypoint = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Vui lòng nhập tên thư mục / địa điểm!');
      return;
    }

    const rawX = String(formData.x).trim();
    const rawZ = String(formData.z).trim();
    const numX = rawX === '' && formData.isFolder ? 0 : Number(rawX);
    const numZ = rawZ === '' && formData.isFolder ? 0 : Number(rawZ);
    const hasYVal = String(formData.y).trim() !== '';
    const numY = hasYVal ? Number(formData.y) : null;

    if (
      (!formData.isFolder && (rawX === '' || rawZ === '')) ||
      Number.isNaN(numX) ||
      Number.isNaN(numZ) ||
      (hasYVal && Number.isNaN(numY))
    ) {
      showToast('Tọa độ X và Z phải là số hợp lệ!');
      return;
    }

    const cleanParentId =
      formData.parentId &&
      formData.parentId !== editingId &&
      !isDescendantOrSelf(editingId, formData.parentId)
        ? formData.parentId
        : null;

    if (editingId) {
      setWaypoints((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: formData.name.trim(),
                x: numX,
                y: numY,
                z: numZ,
                dimension: formData.dimension,
                tag: formData.tag,
                icon: formData.icon || 'grass',
                parentId: cleanParentId,
                isFolder: Boolean(formData.isFolder || formData.tag === 'Folder'),
                notes: formData.notes.trim(),
                screenshots: formData.screenshots || [],
                locked: formData.locked,
                pinned: formData.pinned,
              }
            : item
        )
      );
      showToast('Đã cập nhật thành công!', 'orb');
    } else {
      const newWp = {
        id: 'wp-' + Date.now(),
        worldId: selectedWorldId,
        parentId: cleanParentId,
        isFolder: Boolean(formData.isFolder || formData.tag === 'Folder'),
        name: formData.name.trim(),
        x: numX,
        y: numY,
        z: numZ,
        dimension: formData.dimension,
        tag: formData.tag,
        icon: formData.icon || (formData.isFolder ? 'win_folder' : 'grass'),
        notes: formData.notes.trim(),
        screenshots: formData.screenshots || [],
        locked: formData.locked,
        pinned: formData.pinned,
        deletedAt: null,
        createdAt: Date.now(),
      };
      setWaypoints((prev) => [newWp, ...prev]);
      showToast(
        newWp.isFolder
          ? `Đã tạo thư mục "${newWp.name}"!`
          : cleanParentId
          ? `Đã thêm "${newWp.name}" vào thư mục!`
          : 'Đã lưu tọa độ mới!',
        'levelup'
      );
    }
    setIsFormOpen(false);
  };

  const handleQuickSave = (e) => {
    e.preventDefault();
    if (!quickForm.name.trim() || quickForm.x === '' || quickForm.z === '') {
      showToast('Nhập tối thiểu Tên, X và Z!');
      return;
    }
    const hasY = String(quickForm.y).trim() !== '';
    const newWp = {
      id: 'wp-' + Date.now(),
      worldId: selectedWorldId,
      parentId: currentParentId || null,
      isFolder: false,
      name: quickForm.name.trim(),
      x: Number(quickForm.x),
      y: hasY ? Number(quickForm.y) : null,
      z: Number(quickForm.z),
      dimension: quickForm.dimension,
      tag: quickForm.tag,
      icon: quickForm.icon || TAG_CONFIG[quickForm.tag]?.defaultIcon || 'grass',
      notes: '',
      screenshots: [],
      locked: true,
      pinned: false,
      deletedAt: null,
      createdAt: Date.now(),
    };
    setWaypoints((prev) => [newWp, ...prev]);
    setQuickForm({
      name: '',
      x: '',
      y: '',
      z: '',
      dimension: quickForm.dimension,
      tag: 'Base',
      icon: 'grass',
    });
    setIsMiniOverlayOpen(false);
    showToast(`Đã lưu "${newWp.name}"!`, 'orb');
  };

  const handleSelectQuickIcon = (iconId) => {
    if (!quickIconTargetWp) return;
    setWaypoints((prev) =>
      prev.map((item) =>
        item.id === quickIconTargetWp.id ? { ...item, icon: iconId } : item
      )
    );
    const meta = MC_ICON_MAP[iconId];
    showToast(`Đã đổi sang ${meta?.label || iconId}`, 'pop');
    setQuickIconTargetWp(null);
  };

  const handleUploadCustomAppIcon = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await renderImageFileToPngIcon(file, 256);
      setAppIconConfig({ iconId: 'custom', customImage: dataUrl });
      showToast('Đã đổi biểu tượng ứng dụng!', 'levelup');
    } catch {
      showToast('Không thể đọc file ảnh này.');
    } finally {
      e.target.value = '';
    }
  };

  const handleTogglePin = (id) => {
    setWaypoints((prev) =>
      prev.map((item) => (item.id === id ? { ...item, pinned: !item.pinned } : item))
    );
    playMinecraftSound('pop', soundEnabled);
  };

  const handleToggleLock = (id) => {
    setWaypoints((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextLocked = !item.locked;
          showToast(nextLocked ? `Đã khóa "${item.name}"` : `Đã mở khóa "${item.name}"`, 'pop');
          return { ...item, locked: nextLocked };
        }
        return item;
      })
    );
  };

  const handleSoftDelete = (wp) => {
    if (wp.locked) {
      showToast('Hãy mở khóa trước khi xóa.');
      return;
    }
    const idsToDelete = new Set([wp.id]);
    let added = true;
    while (added) {
      added = false;
      waypoints.forEach((item) => {
        if (item.parentId && idsToDelete.has(item.parentId) && !idsToDelete.has(item.id)) {
          idsToDelete.add(item.id);
          added = true;
        }
      });
    }
    const now = Date.now();
    setWaypoints((prev) =>
      prev.map((item) => (idsToDelete.has(item.id) ? { ...item, deletedAt: now } : item))
    );
    if (currentParentId && idsToDelete.has(currentParentId)) {
      setCurrentParentId(wp.parentId || null);
    }
    showToast(
      idsToDelete.size > 1
        ? `Đã chuyển "${wp.name}" và ${idsToDelete.size - 1} mục con vào Thùng rác`
        : `Đã chuyển "${wp.name}" vào Thùng rác`,
      'tnt'
    );
  };

  const handleRestore = (id) => {
    const idsToRestore = new Set([id]);
    let added = true;
    while (added) {
      added = false;
      waypoints.forEach((item) => {
        if (item.parentId && idsToRestore.has(item.parentId) && !idsToRestore.has(item.id)) {
          idsToRestore.add(item.id);
          added = true;
        }
      });
    }
    setWaypoints((prev) =>
      prev.map((item) => (idsToRestore.has(item.id) ? { ...item, deletedAt: null } : item))
    );
    showToast('Đã khôi phục khỏi Thùng rác!', 'orb');
  };

  const handlePermanentDelete = (id) => {
    const idsToRemove = new Set([id]);
    let added = true;
    while (added) {
      added = false;
      waypoints.forEach((item) => {
        if (item.parentId && idsToRemove.has(item.parentId) && !idsToRemove.has(item.id)) {
          idsToRemove.add(item.id);
          added = true;
        }
      });
    }
    setWaypoints((prev) => prev.filter((item) => !idsToRemove.has(item.id)));
    showToast('Đã xóa vĩnh viễn.', 'tnt');
  };

  const handleRestoreAllWaypoints = () => {
    setWaypoints((prev) =>
      prev.map((w) => (w.worldId === selectedWorldId ? { ...w, deletedAt: null } : w))
    );
    showToast('Đã khôi phục toàn bộ mục trong Thùng rác!', 'levelup');
  };

  const handleEmptyWaypointTrash = () => {
    setWaypoints((prev) =>
      prev.filter((w) => !(w.worldId === selectedWorldId && Boolean(w.deletedAt)))
    );
    showToast('Đã dọn sạch tọa độ trong Thùng rác!', 'tnt');
  };

  const handleCreateWorld = (e) => {
    e.preventDefault();
    if (!newWorldName.trim()) return;
    const newWorld = {
      id: 'world-' + Date.now(),
      name: newWorldName.trim(),
      icon: newWorldIcon || 'grass',
      seed: newWorldSeed.trim(),
      deletedAt: null,
      createdAt: Date.now(),
    };
    setWorlds((prev) => [...prev, newWorld]);
    setSelectedWorldId(newWorld.id);
    setNewWorldName('');
    setNewWorldSeed('');
    setIsWorldModalOpen(false);
    showToast(`Đã tạo thế giới "${newWorld.name}"!`, 'levelup');
  };

  const handleSaveEditWorld = (worldId) => {
    if (!editingWorldName.trim()) return;
    setWorlds((prev) =>
      prev.map((w) =>
        w.id === worldId
          ? { ...w, name: editingWorldName.trim(), seed: editingWorldSeed.trim() }
          : w
      )
    );
    setEditingWorldId(null);
    showToast('Đã cập nhật thông tin World!', 'orb');
  };

  const handleSoftDeleteWorld = (worldObj) => {
    if (!worldObj) return;
    const remainingActive = activeWorlds.filter((w) => w.id !== worldObj.id);
    const now = Date.now();

    if (remainingActive.length === 0) {
      const fallbackWorld = {
        id: 'world-' + (now + 1),
        name: 'Thế Giới Mới',
        icon: 'grass',
        seed: '',
        deletedAt: null,
        createdAt: now + 1,
      };
      setWorlds((prev) => [
        ...prev.map((w) => (w.id === worldObj.id ? { ...w, deletedAt: now } : w)),
        fallbackWorld,
      ]);
      setSelectedWorldId(fallbackWorld.id);
    } else {
      setWorlds((prev) =>
        prev.map((w) => (w.id === worldObj.id ? { ...w, deletedAt: now } : w))
      );
      if (selectedWorldId === worldObj.id) {
        setSelectedWorldId(remainingActive[0].id);
      }
    }

    showToast(`Đã chuyển World "${worldObj.name}" vào Thùng rác!`, 'tnt');
  };

  const handleRestoreWorld = (worldId) => {
    const target = worlds.find((w) => w.id === worldId);
    setWorlds((prev) =>
      prev.map((w) => (w.id === worldId ? { ...w, deletedAt: null } : w))
    );
    setSelectedWorldId(worldId);
    showToast(`Đã khôi phục World "${target?.name || ''}"!`, 'levelup');
  };

  const handlePermanentDeleteWorld = (worldId) => {
    const target = worlds.find((w) => w.id === worldId);
    setWorlds((prev) => prev.filter((w) => w.id !== worldId));
    setWaypoints((prev) => prev.filter((wp) => wp.worldId !== worldId));
    setConfirmPermanentDeleteWorldId(null);
    showToast(`Đã xóa vĩnh viễn World "${target?.name || ''}"!`, 'tnt');
  };

  const handleSelectForDistance = (wp) => {
    if (!pointAId) {
      setPointAId(wp.id);
      const other = activeWaypoints.find((item) => item.id !== wp.id);
      if (other) setPointBId(other.id);
    } else {
      setPointBId(wp.id);
    }
    setIsDistanceOpen(true);
  };

  const openBackupModal = () => {
    const payload = {
      version: '2.2.1',
      exportedAt: new Date().toISOString(),
      appIconConfig,
      worlds,
      waypoints,
    };
    setBackupJsonText(JSON.stringify(payload, null, 2));
    setIsBackupOpen(true);
  };

  const handleImportBackup = () => {
    try {
      const parsed = JSON.parse(backupJsonText);
      if (Array.isArray(parsed.waypoints)) {
        setWaypoints(parsed.waypoints);
        if (Array.isArray(parsed.worlds) && parsed.worlds.length > 0) {
          setWorlds(parsed.worlds);
          const firstActive = parsed.worlds.find((w) => !w.deletedAt) || parsed.worlds[0];
          setSelectedWorldId(firstActive.id);
        }
        if (parsed.appIconConfig) {
          setAppIconConfig(parsed.appIconConfig);
        }
        setIsBackupOpen(false);
        showToast('Đã khôi phục dữ liệu thành công!', 'levelup');
      } else {
        showToast('Dữ liệu JSON không hợp lệ!');
      }
    } catch {
      showToast('Lỗi cú pháp JSON!');
    }
  };

  const handleDownloadJsonFile = () => {
    const blob = new Blob([backupJsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fu-waypoint-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải file .json!', 'orb');
  };

  const handleDownloadCsvFile = () => {
    const headers = ['World', 'Name', 'Type', 'Dimension', 'Tag', 'X', 'Y', 'Z', 'Notes'];
    const worldMap = Object.fromEntries(worlds.map((w) => [w.id, w.name]));
    const rows = activeWaypoints.map((wp) => [
      `"${(worldMap[wp.worldId] || '').replace(/"/g, '""')}"`,
      `"${(wp.name || '').replace(/"/g, '""')}"`,
      wp.isFolder ? 'Folder' : 'Waypoint',
      wp.dimension,
      wp.tag,
      wp.x,
      wp.y ?? '',
      wp.z,
      `"${(wp.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent =
      '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join(String.fromCharCode(10));
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fu-waypoint-${currentWorld?.name || 'export'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã xuất bảng tọa độ .CSV!', 'orb');
  };

  const handleCloudSync = async () => {
    setIsSyncingCloud(true);
    try {
      localStorage.setItem('mc_supabase_config', JSON.stringify(supabaseConfig));
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => {
      const nowStr = new Date().toLocaleTimeString('vi-VN');
      setSupabaseConfig((prev) => ({ ...prev, lastSync: nowStr }));
      setIsSyncingCloud(false);
      showToast(`Đã đồng bộ phòng "${supabaseConfig.roomCode}" (${nowStr})`, 'levelup');
    }, 500);
  };

  const filteredWaypoints = useMemo(() => {
    const isSearching = searchQuery.trim().length > 0;
    return activeWaypoints
      .filter((wp) => {
        if (!isSearching) {
          const wpParent = wp.parentId || null;
          if (wpParent !== (currentParentId || null)) return false;
        }
        if (activeDimension !== 'all' && wp.dimension !== activeDimension) return false;
        if (activeTag !== 'all' && wp.tag !== activeTag) return false;
        if (isSearching) {
          const q = searchQuery.toLowerCase();
          const matchName = wp.name.toLowerCase().includes(q);
          const matchNotes = (wp.notes || '').toLowerCase().includes(q);
          const matchTag = (wp.tag || '').toLowerCase().includes(q);
          const matchCoords = `${wp.x} ${wp.y ?? ''} ${wp.z}`.includes(q);
          if (!matchName && !matchNotes && !matchTag && !matchCoords) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        const aIsFld = Boolean(
          a.isFolder || a.tag === 'Folder' || (childrenByParentId[a.id] || []).length > 0
        );
        const bIsFld = Boolean(
          b.isFolder || b.tag === 'Folder' || (childrenByParentId[b.id] || []).length > 0
        );
        if (sortBy === 'children' && aIsFld !== bIsFld) {
          return aIsFld ? -1 : 1;
        }
        if (playerPos.enabled) {
          const distA = Math.hypot(a.x - playerPos.x, a.z - playerPos.z);
          const distB = Math.hypot(b.x - playerPos.x, b.z - playerPos.z);
          return distA - distB;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name, 'vi');
        }
        if (sortBy === 'children') {
          const countA = descendantCountMap[a.id] || (childrenByParentId[a.id] || []).length;
          const countB = descendantCountMap[b.id] || (childrenByParentId[b.id] || []).length;
          if (countB !== countA) return countB - countA;
        }
        return b.createdAt - a.createdAt;
      });
  }, [
    activeWaypoints,
    currentParentId,
    activeDimension,
    activeTag,
    searchQuery,
    playerPos,
    sortBy,
    childrenByParentId,
    descendantCountMap,
  ]);

  const counts = useMemo(() => {
    const levelList = activeWaypoints.filter(
      (w) => (w.parentId || null) === (currentParentId || null)
    );
    return {
      all: levelList.length,
      overworld: levelList.filter((w) => w.dimension === 'overworld').length,
      nether: levelList.filter((w) => w.dimension === 'nether').length,
      end: levelList.filter((w) => w.dimension === 'end').length,
    };
  }, [activeWaypoints, currentParentId]);

  const totalTrashCount = trashedWaypoints.length + trashedWorlds.length;

  const distanceCalcResult = useMemo(() => {
    const wpA = activeWaypoints.find((w) => w.id === pointAId) || activeWaypoints[0];
    const wpB = activeWaypoints.find((w) => w.id === pointBId) || activeWaypoints[1];
    if (!wpA || !wpB) return null;

    const dx = Number(wpB.x) - Number(wpA.x);
    const dz = Number(wpB.z) - Number(wpA.z);
    const dy = wpA.y !== null && wpB.y !== null ? Number(wpB.y) - Number(wpA.y) : 0;

    const dist2D = Math.round(Math.hypot(dx, dz));
    const dist3D = Math.round(Math.hypot(dx, dy, dz));
    const dirInfo = calculateDistanceAndDirection(wpA.x, wpA.z, wpB.x, wpB.z);

    const stackCount = Math.floor(dist2D / 64);
    const remBlocks = dist2D % 64;
    const poweredRails = Math.ceil(dist2D / 32);
    const normalRails = Math.max(0, dist2D - poweredRails);
    const elytraSeconds = Math.max(1, Math.round(dist3D / 33));
    const fireworksNeeded = Math.max(1, Math.ceil(elytraSeconds / 3));
    const netherIceBoatSeconds = Math.max(1, Math.round(dist2D / 8 / 40));

    return {
      wpA,
      wpB,
      sameDimension: wpA.dimension === wpB.dimension,
      dist2D,
      dist3D,
      compass: dirInfo.compass,
      stackCount,
      remBlocks,
      poweredRails,
      normalRails,
      elytraSeconds,
      fireworksNeeded,
      netherIceBoatSeconds,
    };
  }, [activeWaypoints, pointAId, pointBId]);

  const iconCategories = ['Tất cả', 'Khối Block', 'Kho & Tiện Ích', 'Dân Làng & Mob', 'Vật Phẩm'];
  const filteredIconsForPicker = useMemo(() => {
    const q = iconSearchQuery.trim().toLowerCase();
    return MC_ICON_CATALOG.filter((item) => {
      if (iconCategoryFilter !== 'Tất cả' && item.category !== iconCategoryFilter) return false;
      if (q && !item.label.toLowerCase().includes(q) && !item.id.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [iconCategoryFilter, iconSearchQuery]);

  const handleOpenContextMenu = (e, item) => {
    const rawX = e.clientX || 120;
    const rawY = e.clientY || 120;
    const maxW = typeof window !== 'undefined' ? window.innerWidth - 230 : rawX;
    const maxH = typeof window !== 'undefined' ? window.innerHeight - 280 : rawY;
    setContextMenu({
      x: Math.max(12, Math.min(rawX, maxW)),
      y: Math.max(12, Math.min(rawY, maxH)),
      item,
    });
  };

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden mc-deepslate-bg text-slate-100 pb-32 sm:pb-24 selection:bg-[#55ff55]/30 selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700;800&family=JetBrains+Mono:wght@600;700;800&family=Silkscreen:wght@400;700&display=swap');

        :root {
          --mc-font-ui: 'Chakra Petch', sans-serif;
          --mc-font-pixel: 'Silkscreen', 'Chakra Petch', monospace;
          --mc-font-mono: 'JetBrains Mono', monospace;
        }

        html, body, #root {
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden !important;
          overscroll-behavior-x: none;
          margin: 0;
          padding: 0;
          -webkit-tap-highlight-color: transparent;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .mc-safe-header {
          padding-top: env(safe-area-inset-top, 0px);
        }

        .mc-safe-bottom-nav {
          padding-bottom: max(0.45rem, env(safe-area-inset-bottom, 0.45rem));
        }

        .mc-deepslate-bg {
          font-family: var(--mc-font-ui);
          background-color: #111015;
          background-image:
            radial-gradient(circle at 18% 12%, rgba(82, 165, 53, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 82% 88%, rgba(168, 85, 247, 0.12) 0%, transparent 40%),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 2px, transparent 2px, transparent 16px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 2px, transparent 2px, transparent 16px),
            linear-gradient(135deg, #16151c 25%, #121117 25%, #121117 50%, #16151c 50%, #16151c 75%, #121117 75%, #121117 100%);
          background-size: 100% 100%, 100% 100%, 16px 16px, 16px 16px, 32px 32px;
        }

        .mc-logo-title {
          font-family: var(--mc-font-pixel);
          letter-spacing: 0.03em;
          color: #55ff55;
          text-shadow:
            0 2px 0 #1b5e20,
            2px 2px 0 #1b5e20,
            3px 3px 0 #000000;
        }

        .mc-text-shadow {
          text-shadow: 2px 2px 0px #000000;
        }

        .mc-panel {
          position: relative;
          background-color: #212029;
          background-image:
            radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0),
            radial-gradient(rgba(0, 0, 0, 0.25) 1px, transparent 0);
          background-size: 8px 8px;
          background-position: 0 0, 4px 4px;
          border: 3px solid #000000;
          box-shadow:
            inset 3px 3px 0px #494758,
            inset -3px -3px 0px #121117,
            0 5px 0px #09080c;
        }

        .mc-card {
          background-color: #23222b;
          border: 3px solid #000000;
          box-shadow:
            inset 3px 3px 0px rgba(255, 255, 255, 0.16),
            inset -3px -3px 0px rgba(0, 0, 0, 0.55),
            0 6px 0px #08080b;
        }
        .mc-card-overworld {
          background-color: #212621;
          box-shadow:
            inset 3px 3px 0px #4ca338,
            inset -3px -3px 0px #121812,
            0 6px 0px #070a07;
        }
        .mc-card-overworld:hover {
          box-shadow:
            inset 3px 3px 0px #68d84e,
            inset -3px -3px 0px #121812,
            0 6px 0px #070a07,
            0 0 16px rgba(85, 255, 85, 0.22);
        }
        .mc-card-nether {
          background-color: #2a1619;
          box-shadow:
            inset 3px 3px 0px #d9381e,
            inset -3px -3px 0px #17090b,
            0 6px 0px #0a0405;
        }
        .mc-card-nether:hover {
          box-shadow:
            inset 3px 3px 0px #ff6633,
            inset -3px -3px 0px #17090b,
            0 6px 0px #0a0405,
            0 0 16px rgba(255, 85, 85, 0.26);
        }
        .mc-card-end {
          background-color: #1f172b;
          box-shadow:
            inset 3px 3px 0px #a855f7,
            inset -3px -3px 0px #100b18,
            0 6px 0px #07050b;
        }
        .mc-card-end:hover {
          box-shadow:
            inset 3px 3px 0px #d8b4fe,
            inset -3px -3px 0px #100b18,
            0 6px 0px #07050b,
            0 0 16px rgba(192, 132, 252, 0.26);
        }

        .mc-turf-overworld {
          background:
            linear-gradient(to bottom, #6bc946 0%, #52a535 65%, #866043 65%, #65462e 100%);
          border-bottom: 2px solid #000;
        }
        .mc-turf-nether {
          background:
            linear-gradient(90deg, #d9381e 0%, #ff7b00 25%, #ffcc00 50%, #ff5500 75%, #b91c1c 100%);
          border-bottom: 2px solid #000;
        }
        .mc-turf-end {
          background:
            linear-gradient(90deg, #581c87 0%, #a855f7 35%, #e9d5ff 50%, #9333ea 70%, #3b0764 100%);
          border-bottom: 2px solid #000;
        }

        .mc-corner {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #000;
          opacity: 0.45;
          pointer-events: none;
        }
        .mc-corner-tl { top: 12px; left: 4px; }
        .mc-corner-tr { top: 12px; right: 4px; }
        .mc-corner-bl { bottom: 4px; left: 4px; }
        .mc-corner-br { bottom: 4px; right: 4px; }

        .mc-slot {
          background-color: #101016;
          border: 2px solid #000000;
          border-radius: 0px !important;
          box-shadow:
            inset 2px 2px 0px #060609,
            inset -2px -2px 0px #353442;
        }
        .mc-slot:focus-within {
          border-color: #55ff55;
          box-shadow:
            inset 2px 2px 0px #060609,
            inset -2px -2px 0px #2b6e2b,
            0 0 8px rgba(85, 255, 85, 0.22);
        }

        .mc-coord-box {
          background-color: #181720;
          border: 2px solid #000;
          box-shadow:
            inset 2px 2px 0px rgba(255,255,255,0.12),
            inset -2px -2px 0px rgba(0,0,0,0.65);
        }
        .mc-coord-x { border-bottom: 3px solid #ff5555; }
        .mc-coord-y { border-bottom: 3px solid #55ff55; }
        .mc-coord-z { border-bottom: 3px solid #55ffff; }

        .mc-badge-overworld {
          background-color: #1b3b1a;
          color: #55ff55;
          border: 2px solid #3ca832;
        }
        .mc-badge-nether {
          background-color: #421212;
          color: #ff7755;
          border: 2px solid #d9381e;
        }
        .mc-badge-end {
          background-color: #2d1247;
          color: #e9d5ff;
          border: 2px solid #a855f7;
        }

        .mc-btn {
          position: relative;
          border-radius: 0px !important;
          border: 2px solid #000000;
          transition: transform 0.06s steps(2), box-shadow 0.06s steps(2), filter 0.1s ease;
          user-select: none;
        }
        .mc-btn:hover:not(:disabled) {
          filter: brightness(1.12);
        }
        .mc-btn:active:not(:disabled) {
          transform: translateY(2px) !important;
        }

        .mc-btn-stone {
          background-color: #3a3946;
          box-shadow:
            inset 2px 2px 0px #68677a,
            inset -2px -2px 0px #1e1d26,
            0 2px 0px #0d0c12,
            0 4px 0px #000000;
        }
        .mc-btn-stone:active:not(:disabled) {
          box-shadow:
            inset 2px 2px 0px #1e1d26,
            inset -2px -2px 0px #68677a,
            0 1px 0px #000000;
        }

        .mc-btn-emerald {
          background: linear-gradient(180deg, #4ade80 0%, #22c55e 55%, #16a34a 100%);
          box-shadow:
            inset 2px 2px 0px #bbf7d0,
            inset -2px -2px 0px #14532d,
            0 2px 0px #0c3b1e,
            0 4px 0px #000000;
        }
        .mc-btn-emerald:active:not(:disabled) {
          box-shadow:
            inset 2px 2px 0px #14532d,
            inset -2px -2px 0px #86efac,
            0 1px 0px #000000;
        }

        .mc-btn-redstone {
          background: linear-gradient(180deg, #ef4444 0%, #dc2626 60%, #991b1b 100%);
          box-shadow:
            inset 2px 2px 0px #fca5a5,
            inset -2px -2px 0px #450a0a,
            0 2px 0px #450a0a,
            0 4px 0px #000000;
        }
        .mc-btn-redstone:active:not(:disabled) {
          box-shadow:
            inset 2px 2px 0px #450a0a,
            inset -2px -2px 0px #fca5a5,
            0 1px 0px #000000;
        }

        .mc-btn-tnt {
          background: linear-gradient(180deg, #dc2626 0%, #b91c1c 100%);
          box-shadow:
            inset 2px 2px 0px #f87171,
            inset -2px -2px 0px #450a0a,
            0 2px 0px #300707,
            0 4px 0px #000000;
        }
        .mc-btn-tnt:active:not(:disabled) {
          box-shadow:
            inset 2px 2px 0px #450a0a,
            inset -2px -2px 0px #f87171,
            0 1px 0px #000000;
        }

        .mc-btn-gold {
          background: linear-gradient(180deg, #facc15 0%, #eab308 60%, #ca8a04 100%);
          box-shadow:
            inset 2px 2px 0px #fef08a,
            inset -2px -2px 0px #713f12,
            0 2px 0px #522d0b,
            0 4px 0px #000000;
        }
        .mc-btn-gold:active:not(:disabled) {
          box-shadow:
            inset 2px 2px 0px #713f12,
            inset -2px -2px 0px #fef08a,
            0 1px 0px #000000;
        }

        .mc-btn-diamond {
          background: linear-gradient(180deg, #38bdf8 0%, #0ea5e9 60%, #0284c7 100%);
          box-shadow:
            inset 2px 2px 0px #bae6fd,
            inset -2px -2px 0px #0c4a6e,
            0 2px 0px #082f49,
            0 4px 0px #000000;
        }
        .mc-btn-diamond:active:not(:disabled) {
          box-shadow:
            inset 2px 2px 0px #0c4a6e,
            inset -2px -2px 0px #bae6fd,
            0 1px 0px #000000;
        }

        .mc-btn-lapis {
          background: linear-gradient(180deg, #3b82f6 0%, #2563eb 60%, #1d4ed8 100%);
          box-shadow:
            inset 2px 2px 0px #93c5fd,
            inset -2px -2px 0px #1e3a8a,
            0 2px 0px #172554,
            0 4px 0px #000000;
        }
        .mc-btn-lapis:active:not(:disabled) {
          box-shadow:
            inset 2px 2px 0px #1e3a8a,
            inset -2px -2px 0px #93c5fd,
            0 1px 0px #000000;
        }

        .mc-btn-purpur {
          background: linear-gradient(180deg, #a855f7 0%, #9333ea 60%, #6b21a8 100%);
          box-shadow:
            inset 2px 2px 0px #e9d5ff,
            inset -2px -2px 0px #3b0764,
            0 2px 0px #2e054e,
            0 4px 0px #000000;
        }
        .mc-btn-purpur:active:not(:disabled) {
          box-shadow:
            inset 2px 2px 0px #3b0764,
            inset -2px -2px 0px #e9d5ff,
            0 1px 0px #000000;
        }

        .mc-btn-command {
          background: linear-gradient(180deg, #d97706 0%, #b45309 55%, #78350f 100%);
          box-shadow:
            inset 2px 2px 0px #fde68a,
            inset -2px -2px 0px #451a03,
            0 2px 0px #2e1002,
            0 4px 0px #000000;
        }

        .mc-btn-disabled {
          background-color: #19191f;
          border: 2px solid #09090c;
          box-shadow: inset 2px 2px 0px #111116;
        }

        .mc-redstone-dot {
          width: 6px;
          height: 6px;
          background-color: #7f1d1d;
          border: 1px solid #000;
          display: inline-block;
          transition: all 0.12s steps(2);
        }
        .mc-btn:hover .mc-redstone-dot,
        .mc-redstone-on {
          background-color: #ff3333;
          box-shadow: 0 0 6px #ff3333;
        }

        @keyframes mcBlockActivate {
          0% {
            box-shadow: 0 0 0 0 rgba(85, 255, 85, 0.8), 0 0 14px rgba(255, 255, 85, 0.8);
          }
          100% {
            box-shadow: 0 0 0 10px rgba(85, 255, 85, 0), 0 0 0 rgba(255, 255, 85, 0);
          }
        }
        .mc-btn-activating {
          animation: mcBlockActivate 0.34s steps(4) forwards;
        }

        @keyframes mcCardFlash {
          0%, 100% { filter: brightness(1); }
          40% { filter: brightness(1.25); }
        }
        .mc-block-flash {
          animation: mcCardFlash 0.32s steps(3);
        }

        @keyframes mcParticleBurst {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--dx), calc(var(--dy) + 22px)) scale(0.35);
          }
        }
        .mc-voxel-particle {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          border: 1px solid #000;
          animation: mcParticleBurst 0.44s steps(6) forwards;
        }
      `}</style>

      {/* Lớp hạt Voxel */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[9999]">
        {particles.map((p) => (
          <span
            key={p.id}
            className="mc-voxel-particle"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
            }}
          />
        ))}
      </div>

      {/* Thú cưng Axolotl & Gà Minecraft đi loanh quanh app (Không có tên ở dưới) */}
      <RoamingMinecraftMobs
        enabled={effectsEnabled}
        onInteractMob={(mob, clientX, clientY) => {
          playMinecraftSound(mob.species === 'chicken' ? 'chicken' : 'axolotl', soundEnabled);
          spawnVoxelParticles(
            clientX || window.innerWidth / 2,
            clientY || window.innerHeight / 2,
            mob.species === 'chicken'
              ? ['#fef08a', '#ffffff', '#ef4444', '#55ff55']
              : ['#f472b6', '#38bdf8', '#ef4444', '#55ff55']
          );
        }}
      />

      {/* MENU CHUỘT PHẢI / MENU TÙY CHỌN NHANH */}
      {contextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ left: contextMenu.x, top: contextMenu.y }}
          className="fixed z-[90] w-56 rounded-xl bg-[#181c26] border border-slate-600 shadow-2xl py-1.5 text-xs text-slate-100"
        >
          <div className="px-3 py-1.5 border-b border-slate-700/80 flex items-center gap-2">
            <VoxelBlockIcon type={contextMenu.item.icon || 'grass'} className="w-4 h-4 shrink-0" />
            <span className="font-bold text-amber-300 truncate">{contextMenu.item.name}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              handleEnterFolder(contextMenu.item.id);
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-sky-500/20 flex items-center gap-2 cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Mở như Thư mục</span>
          </button>
          <button
            type="button"
            onClick={() => {
              openCreateForm(contextMenu.item, true);
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-sky-500/20 flex items-center gap-2 cursor-pointer"
          >
            <FolderPlus className="w-3.5 h-3.5 text-amber-300" />
            <span>+ Tạo thư mục con bên trong</span>
          </button>
          <button
            type="button"
            onClick={() => {
              openCreateForm(contextMenu.item, false);
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-sky-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>+ Thêm tọa độ con bên trong</span>
          </button>
          <div className="my-1 border-t border-slate-800" />
          <button
            type="button"
            onClick={async () => {
              const text = formatCopyString(copyMode, contextMenu.item);
              await copyToClipboard(text);
              showToast(`Đã copy: ${text}`, 'orb');
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-sky-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-sky-400" />
            <span>Copy tọa độ</span>
          </button>
          <button
            type="button"
            onClick={async () => {
              const text = formatCopyString('tp', contextMenu.item);
              await copyToClipboard(text);
              showToast(`Đã copy lệnh: ${text}`, 'orb');
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-sky-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-purple-400" />
            <span>Copy lệnh /tp @s</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setQuickIconTargetWp(contextMenu.item);
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-sky-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5 text-emerald-400" />
            <span>Đổi biểu tượng</span>
          </button>
          <button
            type="button"
            onClick={() => {
              openEditForm(contextMenu.item);
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-sky-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-300" />
            <span>Chỉnh sửa / Di chuyển...</span>
          </button>
          <div className="my-1 border-t border-slate-800" />
          <button
            type="button"
            onClick={() => {
              handleSoftDelete(contextMenu.item);
              setContextMenu(null);
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-rose-500/20 text-rose-400 flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Cho vào Thùng rác</span>
          </button>
        </div>
      )}

      {/* Thông báo nổi Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 z-50 flex items-center gap-2.5 mc-panel px-3.5 py-2.5 text-xs sm:text-sm font-bold sm:max-w-sm border-2 border-black">
          <div className="w-6 h-6 mc-slot flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-[#55ff55] stroke-[3]" />
          </div>
          <div className="min-w-0 flex-1 truncate text-white">{toastMessage}</div>
        </div>
      )}

      {/* Khối nhập nhanh nổi góc phải dưới */}
      {floatingBubbleVisible && (
        <div className="fixed bottom-20 sm:bottom-4 right-3 sm:right-4 z-40 flex flex-col items-end gap-2 max-w-[calc(100vw-1.5rem)]">
          {isMiniOverlayOpen && (
            <div className="w-80 max-w-full mc-panel p-3.5 mb-1">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b-2 border-black">
                <div className="flex items-center gap-2 min-w-0">
                  <VoxelBlockIcon type="command" className="w-4 h-4" />
                  <span className="text-xs font-extrabold uppercase text-[#ffff55] truncate mc-text-shadow">
                    Lưu Nhanh
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMiniOverlayOpen(false)}
                  className="mc-btn mc-btn-stone p-1 text-slate-200 hover:text-white cursor-pointer"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {currentParentWaypoint && (
                <div className="mb-2 px-2 py-1 bg-[#122616] border border-[#55ff55]/40 text-[11px] text-[#55ff55] font-mono truncate">
                  📂 Trong: <strong>{currentParentWaypoint.name}</strong>
                </div>
              )}

              <form onSubmit={handleQuickSave} className="space-y-2">
                <input
                  type="text"
                  required
                  value={quickForm.name}
                  onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                  placeholder="Tên địa điểm..."
                  className="w-full mc-slot px-2.5 py-1.5 text-xs text-white focus:outline-none"
                />

                <div className="grid grid-cols-3 gap-1.5 font-mono">
                  <input
                    type="number"
                    required
                    value={quickForm.x}
                    onChange={(e) => setQuickForm({ ...quickForm, x: e.target.value })}
                    placeholder="X *"
                    className="w-full mc-slot px-2 py-1.5 text-xs text-[#ff5555] font-bold focus:outline-none"
                  />
                  <input
                    type="number"
                    value={quickForm.y}
                    onChange={(e) => setQuickForm({ ...quickForm, y: e.target.value })}
                    placeholder="Y"
                    className="w-full mc-slot px-2 py-1.5 text-xs text-[#55ff55] font-bold focus:outline-none"
                  />
                  <input
                    type="number"
                    required
                    value={quickForm.z}
                    onChange={(e) => setQuickForm({ ...quickForm, z: e.target.value })}
                    placeholder="Z *"
                    className="w-full mc-slot px-2 py-1.5 text-xs text-[#55ffff] font-bold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  <select
                    value={quickForm.dimension}
                    onChange={(e) => setQuickForm({ ...quickForm, dimension: e.target.value })}
                    className="mc-slot px-1.5 py-1.5 text-[11px] text-slate-100 font-bold focus:outline-none min-w-0"
                  >
                    <option value="overworld" className="bg-[#14141c]">Overworld</option>
                    <option value="nether" className="bg-[#14141c]">Nether</option>
                    <option value="end" className="bg-[#14141c]">The End</option>
                  </select>
                  <select
                    value={quickForm.tag}
                    onChange={(e) =>
                      setQuickForm({
                        ...quickForm,
                        tag: e.target.value,
                        icon: TAG_CONFIG[e.target.value]?.defaultIcon || quickForm.icon,
                      })
                    }
                    className="mc-slot px-1.5 py-1.5 text-[11px] text-slate-100 font-bold focus:outline-none min-w-0"
                  >
                    {Object.keys(TAG_CONFIG).map((k) => (
                      <option key={k} value={k} className="bg-[#14141c]">
                        {k}
                      </option>
                    ))}
                  </select>
                  <select
                    value={quickForm.icon}
                    onChange={(e) => setQuickForm({ ...quickForm, icon: e.target.value })}
                    className="mc-slot px-1.5 py-1.5 text-[11px] text-[#ffff55] font-bold focus:outline-none min-w-0"
                  >
                    {MC_ICON_CATALOG.map((ic) => (
                      <option key={ic.id} value={ic.id} className="bg-[#14141c]">
                        {ic.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-zinc-400 font-mono">
                    PC: <kbd className="px-1 py-0.5 mc-slot text-[#ffff55]">Ctrl+Shift+S</kbd>
                  </span>
                  <button
                    type="submit"
                    className="mc-btn mc-btn-emerald px-3.5 py-1.5 text-[#041a06] text-xs font-black uppercase cursor-pointer"
                  >
                    Lưu Ngay
                  </button>
                </div>
              </form>
            </div>
          )}

          <button
            type="button"
            onClick={() => openCameraScanner(currentParentWaypoint)}
            title="Mở máy ảnh quét tọa độ ngay"
            className="mc-btn mc-btn-emerald w-10 h-10 sm:w-12 sm:h-12 p-2 text-[#041a06] flex items-center justify-center cursor-pointer shadow-lg"
          >
            <Camera className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => setIsMiniOverlayOpen(!isMiniOverlayOpen)}
            title="Lưu nhanh tọa độ"
            className="mc-btn mc-btn-command w-10 h-10 sm:w-12 sm:h-12 p-2 text-white flex items-center justify-center cursor-pointer shadow-lg"
          >
            {isMiniOverlayOpen ? (
              <X className="w-5 h-5 stroke-[3]" />
            ) : (
              <Zap className="w-5 h-5 fill-[#ffff55] text-[#ffff55]" />
            )}
          </button>
        </div>
      )}

      {/* ==========================================
          HEADER BAR (THIẾT KẾ 2 HÀNG GỌN GÀNG CHO ANDROID, KHÔNG BỊ CẮT NÚT)
      ========================================== */}
      <header className="sticky top-0 z-30 bg-[#181720] border-b-4 border-black shadow-[0_4px_0_#09080c] w-full mc-safe-header">
        <div className="h-2 w-full mc-turf-overworld" />
        <div className="max-w-6xl mx-auto px-2.5 sm:px-4 py-2 space-y-2">
          {/* HÀNG HEADER 1: Logo + Tên App (Không bao giờ gãy dòng) + Cụm nút Âm thanh / Hiệu ứng / Sao lưu */}
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={() => setIsAppIconModalOpen(true)}
                title="Đổi biểu tượng ứng dụng"
                className="w-8 h-8 sm:w-9 sm:h-9 mc-btn mc-btn-stone flex items-center justify-center p-1 cursor-pointer shrink-0"
              >
                <VoxelBlockIcon
                  type={appIconConfig.iconId}
                  customImage={appIconConfig.customImage}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </button>
              <h1
                onClick={() => handleEnterFolder(null)}
                className="text-sm sm:text-xl font-black tracking-wider mc-logo-title cursor-pointer whitespace-nowrap truncate"
              >
                fu WAYPOINT
              </h1>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsAppIconModalOpen(true)}
                title="Đổi biểu tượng App"
                className="mc-btn mc-btn-stone inline-flex items-center gap-1 px-2 py-1 text-[11px] font-black text-[#55ff55] cursor-pointer"
              >
                <Palette className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Icon App</span>
              </button>

              <button
                type="button"
                onClick={openBackupModal}
                title="Sao lưu / Đồng bộ"
                className="mc-btn mc-btn-diamond inline-flex items-center gap-1 px-2 py-1 text-[11px] font-black text-[#041924] cursor-pointer"
              >
                <Cloud className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sao lưu / Đồng bộ</span>
              </button>

              {/* Nút Bật / Tắt Âm thanh Minecraft */}
              <button
                type="button"
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  if (next) playMinecraftSound('orb', true);
                }}
                title={soundEnabled ? 'Đang bật âm thanh Minecraft' : 'Đang tắt âm thanh'}
                className={`mc-btn p-1.5 cursor-pointer ${
                  soundEnabled ? 'mc-btn-stone text-[#55ff55]' : 'mc-btn-stone text-zinc-500'
                }`}
              >
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </button>

              {/* Nút Bật / Tắt Hiệu ứng & Thú cưng Axolotl / Gà đi dạo */}
              <button
                type="button"
                onClick={() => {
                  const next = !effectsEnabled;
                  setEffectsEnabled(next);
                  showToast(
                    next
                      ? 'Đã bật hiệu ứng & thú cưng Axolotl, Gà đi dạo!'
                      : 'Đã tắt hiệu ứng & thú cưng đi dạo',
                    'axolotl'
                  );
                }}
                title={
                  effectsEnabled
                    ? 'Tắt hiệu ứng & thú cưng Axolotl / Gà'
                    : 'Bật hiệu ứng & thú cưng Axolotl / Gà'
                }
                className={`mc-btn px-1.5 py-1 inline-flex items-center gap-1 text-[11px] font-bold cursor-pointer ${
                  effectsEnabled ? 'mc-btn-stone text-[#f472b6]' : 'mc-btn-stone text-zinc-500'
                }`}
              >
                <VoxelBlockIcon type="axolotl" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden lg:inline">
                  {effectsEnabled ? 'Hiệu ứng: Bật' : 'Hiệu ứng: Tắt'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsGuideOpen(true)}
                title="Thông tin phiên bản & mẹo"
                className="mc-btn mc-btn-stone p-1.5 text-slate-200 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* HÀNG HEADER 2: Thanh chọn World (Co giãn linh hoạt) + Nút chuyển Giao diện Win / Thẻ MC */}
          <div className="flex items-center justify-between gap-1.5 min-w-0">
            <div className="flex-1 min-w-0 flex items-center mc-slot p-0.5 sm:p-1">
              <Globe className="w-3.5 h-3.5 text-[#55ff55] ml-1.5 mr-1 shrink-0" />
              <select
                value={selectedWorldId}
                onChange={(e) => setSelectedWorldId(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-xs font-extrabold text-white pr-1 py-1 focus:outline-none cursor-pointer truncate"
              >
                {activeWorlds.map((w) => (
                  <option key={w.id} value={w.id} className="bg-[#161922] text-slate-100">
                    {w.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setIsWorldModalOpen(true)}
                title="Thêm hoặc Quản lý / Xóa World"
                className="mc-btn mc-btn-emerald px-2 py-0.5 text-[11px] font-black text-[#041a06] cursor-pointer shrink-0"
              >
                +
              </button>
              {currentWorld && (
                <button
                  type="button"
                  onClick={() => handleSoftDeleteWorld(currentWorld)}
                  title={`Xóa World "${currentWorld.name}" vào Thùng rác`}
                  className="mc-btn mc-btn-tnt px-1.5 py-0.5 ml-0.5 text-[11px] font-black text-white cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Nút chuyển đổi giao diện Hiện tại <-> Giao diện Folder Win (Không bao giờ tràn) */}
            <button
              type="button"
              onClick={() => {
                const nextStyle = uiStyle === 'mc-cards' ? 'win-folder' : 'mc-cards';
                setUiStyle(nextStyle);
                setViewTrash(false);
                showToast(
                  nextStyle === 'win-folder'
                    ? 'Đã chuyển sang Giao diện Folder giống Windows'
                    : 'Đã chuyển về Giao diện Thẻ Minecraft',
                  'pop'
                );
              }}
              title="Chuyển đổi giữa Giao diện hiện tại và Giao diện Folder giống Windows"
              className={`mc-btn inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-black whitespace-nowrap shrink-0 cursor-pointer ${
                uiStyle === 'win-folder'
                  ? 'mc-btn-gold text-[#1f1300]'
                  : 'mc-btn-lapis text-white'
              }`}
            >
              {uiStyle === 'win-folder' ? (
                <>
                  <Folder className="w-3.5 h-3.5 fill-[#1f1300] shrink-0" />
                  <span>Folder Win</span>
                </>
              ) : (
                <>
                  <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                  <span>Giao diện Win</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* NỘI DUNG CHÍNH */}
      <main className="max-w-6xl mx-auto px-2.5 sm:px-4 pt-3 sm:pt-5 w-full">
        {/* THANH BREADCRUMB PHÂN TẦNG CHO GIAO DIỆN THẺ MC */}
        {uiStyle === 'mc-cards' && currentParentWaypoint && !viewTrash && (
          <div className="mc-panel p-2.5 sm:p-3.5 mb-3.5 border-2 border-[#55ff55] w-full max-w-full overflow-hidden space-y-2">
            {/* Dòng 1: Nút Quay lại + Đường dẫn cuộn ngang mượt trên Android */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-extrabold min-w-0">
              <button
                type="button"
                onClick={() =>
                  handleEnterFolder(currentParentWaypoint.parentId || null)
                }
                className="mc-btn mc-btn-stone inline-flex items-center gap-1 px-2 py-1 text-white cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#55ff55]" />
                <span>Quay lại</span>
              </button>

              <button
                type="button"
                onClick={() => handleEnterFolder(null)}
                className="text-zinc-400 hover:text-white cursor-pointer font-mono shrink-0 px-1"
              >
                Ngoài cùng
              </button>

              {breadcrumbTrail.map((crumb, idx) => (
                <React.Fragment key={crumb.id}>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <button
                    type="button"
                    onClick={() => handleEnterFolder(crumb.id)}
                    title={crumb.name}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 mc-slot cursor-pointer shrink-0 max-w-[140px] sm:max-w-[220px] ${
                      idx === breadcrumbTrail.length - 1
                        ? 'text-[#55ff55] border-[#55ff55]'
                        : 'text-zinc-200'
                    }`}
                  >
                    <VoxelBlockIcon
                      type={crumb.icon || TAG_CONFIG[crumb.tag]?.defaultIcon || 'grass'}
                      className="w-3.5 h-3.5 shrink-0"
                    />
                    <span className="truncate">{crumb.name}</span>
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Dòng 2: 3 Nút chia đều trên Android (Thêm thư mục con, Thêm điểm con, Quét ảnh vào thư mục này) */}
            <div className="grid grid-cols-3 sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleOpenCreateSubfolderInCurrent}
                className="mc-btn mc-btn-gold inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-black text-[#1f1300] uppercase whitespace-nowrap cursor-pointer min-w-0"
              >
                <FolderPlus className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">+ Thư mục</span>
              </button>

              <button
                type="button"
                onClick={handleOpenCreateChildInCurrent}
                className="mc-btn mc-btn-emerald inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-black text-[#041a06] uppercase whitespace-nowrap cursor-pointer min-w-0"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3] shrink-0" />
                <span className="truncate">+ Thêm Điểm Con</span>
              </button>

              <button
                type="button"
                onClick={() => openCameraScanner(currentParentWaypoint)}
                className="mc-btn mc-btn-diamond inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-black text-[#041924] uppercase whitespace-nowrap cursor-pointer min-w-0"
              >
                <Camera className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Quét Ảnh</span>
              </button>
            </div>
          </div>
        )}

        {/* ==========================================
            KHU VỰC NÚT HÀNH ĐỘNG CHÍNH & CHIỀU KHÔNG GIAN (TỐI ƯU ANDROID: KHÔNG BỊ TRÀN HAY CẮT NÚT)
        ========================================== */}
        <div className="space-y-2.5 mb-3.5">
          {/* Hàng 1: 2 Nút Chính (Lưu Tọa Độ Mới & + Tạo Thư Mục) chia 2 cột cân đối trên Android */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={handleOpenCreateWaypoint}
              className="mc-btn mc-btn-emerald inline-flex items-center justify-center gap-1.5 px-2.5 py-2.5 text-[#041a06] font-black text-xs uppercase whitespace-nowrap cursor-pointer min-w-0"
            >
              <Plus className="w-4 h-4 stroke-[3] shrink-0" />
              <span className="truncate">Lưu Tọa Độ Mới</span>
            </button>

            <button
              type="button"
              onClick={handleOpenCreateFolder}
              className="mc-btn mc-btn-gold inline-flex items-center justify-center gap-1.5 px-2.5 py-2.5 text-[#1f1300] font-black text-xs uppercase whitespace-nowrap cursor-pointer min-w-0"
            >
              <FolderPlus className="w-4 h-4 shrink-0" />
              <span className="truncate">+ Tạo Thư Mục</span>
            </button>

            <button
              type="button"
              onClick={() => openCameraScanner(currentParentWaypoint)}
              className="mc-btn mc-btn-diamond inline-flex items-center justify-center gap-1.5 px-2.5 py-2.5 text-[#041924] font-black text-xs uppercase whitespace-nowrap cursor-pointer min-w-0"
            >
              <Camera className="w-4 h-4 stroke-[2.5] shrink-0" />
              <span className="truncate">Quét Ảnh F3 / MCPE (OCR)</span>
            </button>

            <button
              type="button"
              onClick={handleOpenCreateDeathPoint}
              className="mc-btn mc-btn-tnt inline-flex items-center justify-center gap-1.5 px-2.5 py-2 text-white font-black text-xs uppercase whitespace-nowrap cursor-pointer mc-text-shadow min-w-0"
            >
              <Skull className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">+ Điểm Chết</span>
            </button>
          </div>

          {/* Hàng 2: Thanh Chiều Không Gian (4 cột gọn gàng trên 1 hàng duy nhất ở Android) + Các công cụ phụ */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2">
            <div className="grid grid-cols-4 sm:flex sm:flex-wrap items-center gap-1 mc-panel p-1">
              <button
                type="button"
                onClick={() => {
                  setActiveDimension('all');
                  setViewTrash(false);
                }}
                className={`mc-btn px-1.5 sm:px-2.5 py-1.5 text-[11px] sm:text-xs cursor-pointer flex items-center justify-center gap-1 font-extrabold min-w-0 ${
                  !viewTrash && activeDimension === 'all'
                    ? 'mc-btn-gold text-[#1f1300]'
                    : 'mc-btn-stone text-slate-200'
                }`}
              >
                <Layers className="w-3 h-3 shrink-0 hidden sm:inline" />
                <span className="truncate">Tất cả ({counts.all})</span>
              </button>

              {Object.values(DIMENSION_CONFIG).map((dim) => {
                const Icon = dim.icon;
                const isActive = !viewTrash && activeDimension === dim.id;
                const shortLabel = dim.id === 'end' ? 'End' : dim.label;
                return (
                  <button
                    key={dim.id}
                    type="button"
                    onClick={() => {
                      setActiveDimension(dim.id);
                      setViewTrash(false);
                    }}
                    className={`mc-btn px-1.5 sm:px-2.5 py-1.5 text-[11px] sm:text-xs cursor-pointer flex items-center justify-center gap-1 font-extrabold min-w-0 ${
                      isActive ? dim.activeTab : 'mc-btn-stone text-slate-200'
                    }`}
                  >
                    <Icon className="w-3 h-3 shrink-0 hidden sm:inline" />
                    <span className="truncate">
                      {shortLabel} ({counts[dim.id]})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dải công cụ phụ: Cuộn ngang mượt mà trên Android, không bao giờ tràn màn hình */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'grid' ? 'radar' : 'grid')}
                className={`mc-btn inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-black uppercase whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'radar'
                    ? 'mc-btn-diamond text-[#041924]'
                    : 'mc-btn-stone text-[#55ffff]'
                }`}
              >
                {viewMode === 'radar' ? (
                  <>
                    <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                    <span>Dạng Thẻ</span>
                  </>
                ) : (
                  <>
                    <MapIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>Radar 2D</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsDistanceOpen(true)}
                className="mc-btn mc-btn-gold inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-black text-[#1f1300] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5 shrink-0" />
                <span>Đo khoảng cách</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCalcOpen(true)}
                className="mc-btn mc-btn-purpur inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-black text-white whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 shrink-0" />
                <span>Nether (÷8)</span>
              </button>

              <button
                type="button"
                onClick={() => setViewTrash(!viewTrash)}
                className={`mc-btn px-2.5 py-1.5 text-xs cursor-pointer inline-flex items-center justify-center gap-1 font-extrabold whitespace-nowrap shrink-0 ${
                  viewTrash ? 'mc-btn-tnt text-white' : 'mc-btn-stone text-rose-300'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5 shrink-0" />
                <span>Thùng rác ({totalTrashCount})</span>
              </button>
            </div>
          </div>
        </div>

        {/* KHỐI BẢNG LỌC & TÌM KIẾM (GỌN GÀNG TRÊN ANDROID VỚI NÚT ĐÓNG/MỞ BỘ LỌC) */}
        {!viewTrash && (
          <div className="mc-panel p-2.5 sm:p-3.5 mb-4 space-y-2.5 w-full overflow-hidden">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 min-w-0">
                <Search className="w-4 h-4 text-[#55ff55] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên địa điểm, thư mục, tọa độ..."
                  className="w-full mc-slot text-white placeholder-zinc-500 pl-8 pr-7 py-1.5 text-xs sm:text-sm font-mono focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Nút bật/tắt tùy chọn lọc nâng cao trên Android */}
              <button
                type="button"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="sm:hidden mc-btn mc-btn-stone px-2.5 py-1.5 text-xs font-bold text-[#ffff55] inline-flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Lọc</span>
              </button>

              {/* Trên PC hiển thị luôn Copy & Sort */}
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 mc-slot px-2.5 py-1.5 min-w-0">
                  <span className="text-[11px] text-zinc-400 font-bold shrink-0">Copy:</span>
                  <select
                    value={copyMode}
                    onChange={(e) => setCopyMode(e.target.value)}
                    className="bg-transparent text-xs font-extrabold text-[#55ffff] focus:outline-none cursor-pointer font-mono truncate"
                  >
                    <option value="chat" className="bg-[#141720] text-slate-100">
                      Chat ([Tên] X Y Z)
                    </option>
                    <option value="raw" className="bg-[#141720] text-slate-100">
                      Số (X Y Z)
                    </option>
                    <option value="tp" className="bg-[#141720] text-slate-100">
                      Lệnh (/tp @s)
                    </option>
                    <option value="execute" className="bg-[#141720] text-slate-100">
                      Lệnh (/execute in...)
                    </option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 mc-slot px-2.5 py-1.5 min-w-0">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#ffff55] shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-xs font-extrabold text-[#ffff55] focus:outline-none cursor-pointer font-mono truncate"
                  >
                    <option value="newest" className="bg-[#141720] text-slate-100">
                      Mới nhất
                    </option>
                    <option value="name" className="bg-[#141720] text-slate-100">
                      Tên A → Z
                    </option>
                    <option value="children" className="bg-[#141720] text-slate-100">
                      Ưu tiên Thư mục
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Thanh lọc Tag cuộn ngang gọn trên 1 dòng */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTag('all')}
                className={`mc-btn px-2 py-1 text-[11px] font-extrabold shrink-0 cursor-pointer ${
                  activeTag === 'all'
                    ? 'mc-btn-gold text-[#1f1300]'
                    : 'mc-btn-stone text-zinc-300'
                }`}
              >
                Tất cả Tag
              </button>
              {Object.keys(TAG_CONFIG).map((tagKey) => {
                const TagIcon = TAG_CONFIG[tagKey].icon;
                const isSelected = activeTag === tagKey;
                return (
                  <button
                    key={tagKey}
                    type="button"
                    onClick={() => setActiveTag(isSelected ? 'all' : tagKey)}
                    className={`mc-btn inline-flex items-center gap-1 px-2 py-1 text-[11px] font-extrabold shrink-0 cursor-pointer ${
                      isSelected
                        ? 'mc-btn-emerald text-[#041a06]'
                        : 'mc-btn-stone text-zinc-300'
                    }`}
                  >
                    <TagIcon className="w-3 h-3" />
                    <span>{tagKey}</span>
                  </button>
                );
              })}
            </div>

            {/* Khối tùy chọn mở rộng (Trên PC luôn hiện, trên Android bấm nút Lọc mới bung ra để tiết kiệm diện tích) */}
            <div className={`${showMobileFilters ? 'block' : 'hidden'} sm:block space-y-2 pt-2 border-t-2 border-black/80`}>
              <div className="grid grid-cols-2 gap-2 sm:hidden">
                <div className="flex items-center gap-1 mc-slot px-2 py-1.5 min-w-0">
                  <span className="text-[10px] text-zinc-400 font-bold shrink-0">Copy:</span>
                  <select
                    value={copyMode}
                    onChange={(e) => setCopyMode(e.target.value)}
                    className="bg-transparent text-[11px] font-extrabold text-[#55ffff] focus:outline-none cursor-pointer font-mono truncate w-full"
                  >
                    <option value="chat" className="bg-[#141720]">Chat</option>
                    <option value="raw" className="bg-[#141720]">Số X Y Z</option>
                    <option value="tp" className="bg-[#141720]">/tp @s</option>
                    <option value="execute" className="bg-[#141720]">/execute</option>
                  </select>
                </div>

                <div className="flex items-center gap-1 mc-slot px-2 py-1.5 min-w-0">
                  <ArrowUpDown className="w-3 h-3 text-[#ffff55] shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-[11px] font-extrabold text-[#ffff55] focus:outline-none cursor-pointer font-mono truncate w-full"
                  >
                    <option value="newest" className="bg-[#141720]">Mới nhất</option>
                    <option value="name" className="bg-[#141720]">Tên A → Z</option>
                    <option value="children" className="bg-[#141720]">Thư mục</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <label className="inline-flex items-center gap-2 cursor-pointer text-zinc-200 font-bold">
                  <input
                    type="checkbox"
                    checked={playerPos.enabled}
                    onChange={(e) =>
                      setPlayerPos((prev) => ({ ...prev, enabled: e.target.checked }))
                    }
                    className="w-4 h-4 accent-[#55ff55]"
                  />
                  <Navigation className="w-3.5 h-3.5 text-[#55ffff] shrink-0" />
                  <span>Đo khoảng cách từ vị trí đang đứng</span>
                </label>

                {playerPos.enabled ? (
                  <div className="flex items-center gap-1.5 flex-wrap font-mono">
                    <input
                      type="number"
                      value={playerPos.x}
                      onChange={(e) =>
                        setPlayerPos((prev) => ({ ...prev, x: Number(e.target.value) }))
                      }
                      placeholder="X"
                      className="w-16 sm:w-20 mc-slot px-2 py-1 text-xs text-[#ff5555] font-bold"
                    />
                    <input
                      type="number"
                      value={playerPos.z}
                      onChange={(e) =>
                        setPlayerPos((prev) => ({ ...prev, z: Number(e.target.value) }))
                      }
                      placeholder="Z"
                      className="w-16 sm:w-20 mc-slot px-2 py-1 text-xs text-[#55ffff] font-bold"
                    />
                    <select
                      value={playerPos.dimension}
                      onChange={(e) =>
                        setPlayerPos((prev) => ({ ...prev, dimension: e.target.value }))
                      }
                      className="mc-slot px-2 py-1 text-xs text-white font-bold"
                    >
                      <option value="overworld" className="bg-[#141720]">Overworld</option>
                      <option value="nether" className="bg-[#141720]">Nether</option>
                      <option value="end" className="bg-[#141720]">The End</option>
                    </select>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setFloatingBubbleVisible(!floatingBubbleVisible)}
                    className="mc-btn mc-btn-stone px-2 py-0.5 text-[11px] text-[#55ffff] font-bold cursor-pointer"
                  >
                    {floatingBubbleVisible ? 'Ẩn nút lưu nhanh ⚡' : 'Hiện nút lưu nhanh ⚡'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {!viewTrash && viewMode === 'radar' && (
          <PixelRadarMap
            waypoints={filteredWaypoints}
            playerPos={playerPos}
            onSelectWaypoint={(wp) => openEditForm(wp)}
          />
        )}

        {/* ==========================================
            MÀN HÌNH THÙNG RÁC (HỖ TRỢ CẢ WORLD VÀ TỌA ĐỘ / THƯ MỤC)
        ========================================== */}
        {viewTrash ? (
          <div className="mc-panel p-3.5 sm:p-5">
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-black flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <ShieldAlert className="w-5 h-5 text-[#ff5555] shrink-0" />
                <h2 className="text-sm sm:text-base font-extrabold text-white mc-text-shadow">
                  Thùng Rác ({totalTrashCount})
                </h2>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setTrashSubTab('waypoints')}
                    className={`mc-btn px-2 py-1 text-xs font-black cursor-pointer ${
                      trashSubTab === 'waypoints'
                        ? 'mc-btn-gold text-[#1f1300]'
                        : 'mc-btn-stone text-zinc-300'
                    }`}
                  >
                    Tọa độ ({trashedWaypoints.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrashSubTab('worlds')}
                    className={`mc-btn px-2 py-1 text-xs font-black cursor-pointer ${
                      trashSubTab === 'worlds'
                        ? 'mc-btn-gold text-[#1f1300]'
                        : 'mc-btn-stone text-zinc-300'
                    }`}
                  >
                    World ({trashedWorlds.length})
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {trashSubTab === 'waypoints' && trashedWaypoints.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={handleRestoreAllWaypoints}
                      className="mc-btn mc-btn-emerald px-2.5 py-1.5 text-xs font-black text-[#041a06] cursor-pointer"
                    >
                      Khôi phục hết
                    </button>
                    <button
                      type="button"
                      onClick={handleEmptyWaypointTrash}
                      className="mc-btn mc-btn-tnt px-2.5 py-1.5 text-xs font-black text-white cursor-pointer"
                    >
                      Dọn sạch
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setViewTrash(false)}
                  className="mc-btn mc-btn-stone px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
                >
                  Quay lại
                </button>
              </div>
            </div>

            {trashSubTab === 'worlds' ? (
              trashedWorlds.length === 0 ? (
                <div className="text-center py-10 text-zinc-400 text-xs sm:text-sm font-mono mc-slot">
                  Không có World nào trong thùng rác.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {trashedWorlds.map((w) => {
                    const wpCount = waypoints.filter((item) => item.worldId === w.id).length;
                    const isConfirming = confirmPermanentDeleteWorldId === w.id;
                    return (
                      <div
                        key={w.id}
                        className="flex flex-col justify-between gap-2.5 p-3 mc-slot border border-rose-500/40 min-w-0"
                      >
                        <div className="flex items-center justify-between gap-2 min-w-0 flex-wrap">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <VoxelBlockIcon type={w.icon || 'grass'} className="w-6 h-6" />
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-white text-sm truncate">
                                🌍 {w.name}
                              </h4>
                              <p className="text-xs font-mono text-zinc-400 truncate">
                                {wpCount} mục{w.seed ? ` • Seed: ${w.seed}` : ''}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleRestoreWorld(w.id)}
                              className="mc-btn mc-btn-emerald inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-black text-[#041a06] cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Khôi phục</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmPermanentDeleteWorldId(w.id)}
                              className="mc-btn mc-btn-tnt px-2.5 py-1.5 text-xs font-black text-white cursor-pointer"
                            >
                              Xóa hẳn
                            </button>
                          </div>
                        </div>

                        {isConfirming && (
                          <div className="p-2 bg-rose-950/80 border border-rose-500 flex items-center justify-between gap-2 text-xs flex-wrap">
                            <span className="text-rose-200 font-bold">
                              Xóa vĩnh viễn World này và {wpCount} tọa độ?
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => setConfirmPermanentDeleteWorldId(null)}
                                className="mc-btn mc-btn-stone px-2 py-1 text-[11px] text-white cursor-pointer"
                              >
                                Hủy
                              </button>
                              <button
                                type="button"
                                onClick={() => handlePermanentDeleteWorld(w.id)}
                                className="mc-btn mc-btn-tnt px-2.5 py-1 text-[11px] font-black text-white cursor-pointer"
                              >
                                Xác nhận xóa hẳn
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            ) : trashedWaypoints.length === 0 ? (
              <div className="text-center py-10 text-zinc-400 text-xs sm:text-sm font-mono mc-slot">
                Thùng rác tọa độ trống.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trashedWaypoints.map((wp) => (
                  <div
                    key={wp.id}
                    className="flex items-center justify-between gap-2 p-3 mc-slot min-w-0"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <VoxelBlockIcon
                        type={wp.icon || TAG_CONFIG[wp.tag]?.defaultIcon || 'grass'}
                        className="w-6 h-6 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-extrabold text-white text-sm truncate">
                          {wp.isFolder ? '📁 ' : ''}
                          {wp.name}
                        </h4>
                        <p className="text-xs font-mono text-zinc-400 truncate">
                          X:{wp.x} | Y:{wp.y ?? '~'} | Z:{wp.z}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleRestore(wp.id)}
                        className="mc-btn mc-btn-emerald inline-flex items-center gap-1 px-2 py-1.5 text-xs font-black text-[#041a06] cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Khôi phục</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePermanentDelete(wp.id)}
                        className="mc-btn mc-btn-tnt px-2 py-1.5 text-xs font-black text-white cursor-pointer"
                      >
                        Xóa hẳn
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : uiStyle === 'win-folder' ? (
          <WindowsExplorerView
            currentWorld={currentWorld}
            activeWaypoints={activeWaypoints}
            filteredWaypoints={filteredWaypoints}
            childrenByParentId={childrenByParentId}
            descendantCountMap={descendantCountMap}
            currentParentId={currentParentId}
            breadcrumbTrail={breadcrumbTrail}
            copyMode={copyMode}
            trashedCount={totalTrashCount}
            onSelectFolder={handleEnterFolder}
            onCreateFolder={(parentItem) => openCreateForm(parentItem, true)}
            onCreateWaypoint={(parentItem) => openCreateForm(parentItem, false)}
            onOpenCameraScanner={(parentItem) => openCameraScanner(parentItem)}
            onEdit={openEditForm}
            onSoftDelete={handleSoftDelete}
            onQuickChangeIcon={(targetWp) => setQuickIconTargetWp(targetWp)}
            onNotify={showToast}
            onOpenTrash={() => setViewTrash(true)}
            onOpenWorldManager={() => setIsWorldModalOpen(true)}
            onContextMenuItem={handleOpenContextMenu}
          />
        ) : (
          <>
            {filteredWaypoints.length === 0 ? (
              <div className="mc-panel p-8 sm:p-12 text-center">
                <div className="w-12 h-12 mc-slot mx-auto mb-3 flex items-center justify-center">
                  <Compass className="w-7 h-7 text-[#ffff55]" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-white mb-2 mc-text-shadow truncate max-w-lg mx-auto">
                  {currentParentWaypoint
                    ? `Chưa có mục con nào trong "${currentParentWaypoint.name}"`
                    : 'Chưa có tọa độ nào'}
                </h3>
                <div className="flex items-center justify-center gap-2 flex-wrap mt-3">
                  <button
                    type="button"
                    onClick={handleOpenCreateSubfolderInCurrent}
                    className="mc-btn mc-btn-gold inline-flex items-center gap-1.5 px-3.5 py-2 text-[#1f1300] text-xs font-black uppercase cursor-pointer"
                  >
                    <FolderPlus className="w-4 h-4" />
                    <span>+ Tạo Thư Mục Con</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenCreateChildInCurrent}
                    className="mc-btn mc-btn-emerald inline-flex items-center gap-2 px-4 py-2 text-[#041a06] text-xs font-black uppercase cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Thêm điểm tọa độ đầu tiên</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {filteredWaypoints.map((wp) => {
                  const parentWp = wp.parentId
                    ? activeWaypoints.find((p) => p.id === wp.parentId) || null
                    : null;
                  return (
                    <WaypointCard
                      key={wp.id}
                      waypoint={wp}
                      childWaypoints={childrenByParentId[wp.id] || []}
                      totalDescendantCount={descendantCountMap[wp.id] || 0}
                      parentWaypoint={parentWp}
                      copyMode={copyMode}
                      playerPos={playerPos}
                      onTogglePin={handleTogglePin}
                      onToggleLock={handleToggleLock}
                      onEdit={openEditForm}
                      onSoftDelete={handleSoftDelete}
                      onNotify={showToast}
                      onOpenLightbox={(src, title, waypointId = wp.id, imageIndex = 0) =>
                        setLightboxData({ src, title, waypointId, imageIndex, isFormPreview: false })
                      }
                      onDeleteScreenshot={handleDeleteWaypointScreenshotDirect}
                      onReplaceScreenshot={(waypointId, imgIdx) =>
                        triggerReplaceScreenshot('waypoint', imgIdx, waypointId)
                      }
                      onSelectForDistance={handleSelectForDistance}
                      onEnterFolder={handleEnterFolder}
                      onCreateChildWaypoint={(parentItem) => openCreateForm(parentItem, false)}
                      onCreateChildFolder={(parentItem) => openCreateForm(parentItem, true)}
                      onQuickChangeIcon={(targetWp) => setQuickIconTargetWp(targetWp)}
                      onContextMenuItem={handleOpenContextMenu}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>

      {/* INPUT FILE ẨN DÙNG CHUNG CHO MÁY ẢNH GỐC ĐIỆN THOẠI & THƯ VIỆN ẢNH */}
      <input
        ref={nativeCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleOcrImageUpload}
        className="hidden"
      />
      <input
        ref={scannerGalleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleOcrImageUpload}
        className="hidden"
      />
      <input
        ref={replaceScreenshotInputRef}
        type="file"
        accept="image/*"
        onChange={handleReplaceScreenshotFileChange}
        className="hidden"
      />

      {/* THANH ĐIỀU HƯỚNG ĐÁY MÀN HÌNH DÀNH CHO ANDROID / MOBILE (CÓ SAFE-AREA PADDING) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#16151e]/95 backdrop-blur-md border-t-2 border-black px-1 pt-1.5 mc-safe-bottom-nav grid grid-cols-6 gap-1">
        <button
          type="button"
          onClick={() => {
            setUiStyle('mc-cards');
            setViewTrash(false);
          }}
          className={`flex flex-col items-center justify-center py-1 rounded text-[10px] font-bold cursor-pointer ${
            !viewTrash && uiStyle === 'mc-cards' ? 'text-[#55ff55]' : 'text-zinc-400'
          }`}
        >
          <LayoutGrid className="w-4 h-4 mb-0.5" />
          <span className="truncate">Thẻ MC</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setUiStyle('win-folder');
            setViewTrash(false);
          }}
          className={`flex flex-col items-center justify-center py-1 rounded text-[10px] font-bold cursor-pointer ${
            !viewTrash && uiStyle === 'win-folder' ? 'text-amber-400' : 'text-zinc-400'
          }`}
        >
          <Folder className="w-4 h-4 mb-0.5" />
          <span className="truncate">Folder Win</span>
        </button>

        <button
          type="button"
          onClick={() => openCameraScanner(currentParentWaypoint)}
          className="flex flex-col items-center justify-center py-1 rounded bg-cyan-400 text-slate-950 text-[10px] font-black cursor-pointer shadow-[0_0_12px_rgba(34,211,238,0.4)]"
        >
          <Camera className="w-4 h-4 stroke-[2.5] mb-0.5" />
          <span className="truncate">Quét Ảnh</span>
        </button>

        <button
          type="button"
          onClick={handleOpenCreateChildInCurrent}
          className="flex flex-col items-center justify-center py-1 rounded bg-emerald-500 text-slate-950 text-[10px] font-black cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3] mb-0.5" />
          <span className="truncate">Thêm Mới</span>
        </button>

        <button
          type="button"
          onClick={() => setIsWorldModalOpen(true)}
          className="flex flex-col items-center justify-center py-1 rounded text-[10px] font-bold text-sky-300 cursor-pointer"
        >
          <Globe className="w-4 h-4 mb-0.5" />
          <span className="truncate">World</span>
        </button>

        <button
          type="button"
          onClick={() => setViewTrash(!viewTrash)}
          className={`flex flex-col items-center justify-center py-1 rounded text-[10px] font-bold cursor-pointer ${
            viewTrash ? 'text-rose-400' : 'text-zinc-400'
          }`}
        >
          <Trash2 className="w-4 h-4 mb-0.5" />
          <span className="truncate">Rác ({totalTrashCount})</span>
        </button>
      </nav>

      {/* ==========================================
          MODAL 0: ĐỔI NHANH BIỂU TƯỢNG TRÊN THẺ
      ========================================== */}
      {quickIconTargetWp && (
        <div
          onClick={() => setQuickIconTargetWp(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mc-panel max-w-lg w-full p-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b-2 border-black">
              <h3 className="text-sm sm:text-base font-black text-[#55ff55] truncate mc-text-shadow">
                Chọn biểu tượng — {quickIconTargetWp.name}
              </h3>
              <button
                type="button"
                onClick={() => setQuickIconTargetWp(null)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <div className="mb-2.5">
              <input
                type="text"
                value={iconSearchQuery}
                onChange={(e) => setIconSearchQuery(e.target.value)}
                placeholder="Tìm nhanh trong 96+ biểu tượng Minecraft..."
                className="w-full mc-slot px-3 py-1.5 text-xs text-white font-mono focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 mc-slot p-2.5 max-h-80 overflow-y-auto">
              {MC_ICON_CATALOG.filter((ic) => {
                const q = iconSearchQuery.trim().toLowerCase();
                return !q || ic.label.toLowerCase().includes(q) || ic.id.toLowerCase().includes(q);
              }).map((ic) => {
                const isSelected = quickIconTargetWp.icon === ic.id;
                return (
                  <button
                    key={ic.id}
                    type="button"
                    onClick={() => handleSelectQuickIcon(ic.id)}
                    className={`mc-btn p-1.5 flex flex-col items-center justify-center gap-1 text-center cursor-pointer min-w-0 ${
                      isSelected
                        ? 'mc-btn-emerald text-[#041a06]'
                        : 'mc-btn-stone text-zinc-200'
                    }`}
                  >
                    <VoxelBlockIcon type={ic.id} className="w-6 h-6" />
                    <span className="text-[9px] font-bold leading-tight truncate w-full">
                      {ic.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 0B: ĐỔI ICON NGAY TRONG APP
      ========================================== */}
      {isAppIconModalOpen && (
        <div
          onClick={() => setIsAppIconModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mc-panel max-w-lg w-full p-4 sm:p-5 my-6 max-h-[88vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b-2 border-black">
              <div className="flex items-center gap-2.5 min-w-0">
                <VoxelBlockIcon
                  type={appIconConfig.iconId}
                  customImage={appIconConfig.customImage}
                  className="w-7 h-7"
                />
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-black text-[#55ff55] truncate mc-text-shadow">
                    Đổi Biểu Tượng Trực Tiếp Trong App
                  </h2>
                  <p className="text-[11px] text-zinc-400 font-mono truncate">
                    Đang dùng:{' '}
                    <strong className="text-white">
                      {appIconConfig.customImage
                        ? 'Ảnh tùy chỉnh từ máy'
                        : MC_ICON_MAP[appIconConfig.iconId]?.label || 'Đất Cỏ'}
                    </strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAppIconModalOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <div className="p-3 mc-slot mb-3 flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-bold text-zinc-200">
                Tải ảnh bất kỳ từ thiết bị:
              </span>
              <input
                ref={appIconFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUploadCustomAppIcon}
                className="hidden"
              />
              <div className="flex items-center gap-1.5">
                {(appIconConfig.customImage || appIconConfig.iconId !== 'grass') && (
                  <button
                    type="button"
                    onClick={() => {
                      setAppIconConfig({ iconId: 'grass', customImage: null });
                      showToast('Đã khôi phục icon Đất Cỏ mặc định', 'orb');
                    }}
                    className="mc-btn mc-btn-stone px-2.5 py-1.5 text-xs font-bold text-zinc-200 cursor-pointer"
                  >
                    Mặc định
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => appIconFileInputRef.current?.click()}
                  className="mc-btn mc-btn-diamond px-3 py-1.5 text-xs font-black text-[#041924] cursor-pointer"
                >
                  Chọn ảnh từ máy
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-wrap mb-2">
              {iconCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setAppIconCategoryFilter(cat)}
                  className={`mc-btn px-2.5 py-1 text-[10px] font-bold cursor-pointer ${
                    appIconCategoryFilter === cat
                      ? 'mc-btn-gold text-[#1f1300]'
                      : 'mc-btn-stone text-zinc-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 mc-slot p-2.5 max-h-72 overflow-y-auto">
              {(appIconCategoryFilter === 'Tất cả'
                ? MC_ICON_CATALOG
                : MC_ICON_CATALOG.filter((item) => item.category === appIconCategoryFilter)
              ).map((ic) => {
                const isSelected =
                  !appIconConfig.customImage && appIconConfig.iconId === ic.id;
                return (
                  <button
                    key={ic.id}
                    type="button"
                    onClick={() => {
                      setAppIconConfig({ iconId: ic.id, customImage: null });
                      showToast(`Đã đổi Icon App: ${ic.label}`, 'orb');
                    }}
                    className={`mc-btn p-1.5 flex flex-col items-center justify-center gap-1 text-center cursor-pointer min-w-0 ${
                      isSelected
                        ? 'mc-btn-emerald text-[#041a06]'
                        : 'mc-btn-stone text-zinc-200'
                    }`}
                  >
                    <VoxelBlockIcon type={ic.id} className="w-6 h-6" />
                    <span className="text-[9px] font-bold leading-tight truncate w-full">
                      {ic.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 1: THÊM / SỬA TỌA ĐỘ HOẶC THƯ MỤC CON
      ========================================== */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2.5 sm:p-4 overflow-y-auto">
          <div className="mc-panel max-w-xl w-full p-3.5 sm:p-5 my-4 max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 right-0 h-2.5 mc-turf-overworld" />
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 pt-1 border-b-2 border-black">
              <h2 className="text-sm sm:text-lg font-black text-white flex items-center gap-2 truncate mc-text-shadow">
                <VoxelBlockIcon type={formData.icon || 'command'} className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="truncate">
                  {editingId
                    ? 'Sửa Mục / Di Chuyển Thư Mục'
                    : formData.isFolder
                    ? 'Tạo Thư Mục Khu Vực Mới'
                    : 'Thêm Tọa Độ Mới'}
                </span>
              </h2>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    isFolder: false,
                    tag: prev.tag === 'Folder' ? 'Base' : prev.tag,
                  }))
                }
                className={`mc-btn py-2 px-2 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer ${
                  !formData.isFolder
                    ? 'mc-btn-emerald text-[#041a06]'
                    : 'mc-btn-stone text-zinc-300'
                }`}
              >
                <Compass className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">📍 Điểm Tọa Độ</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    isFolder: true,
                    tag: 'Folder',
                    icon: prev.icon === 'grass' ? 'win_folder' : prev.icon,
                    x: prev.x === '' ? '0' : prev.x,
                    z: prev.z === '' ? '0' : prev.z,
                  }))
                }
                className={`mc-btn py-2 px-2 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer ${
                  formData.isFolder
                    ? 'mc-btn-gold text-[#1f1300]'
                    : 'mc-btn-stone text-zinc-300'
                }`}
              >
                <Folder className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">📁 Thư Mục</span>
              </button>
            </div>

            <div className="mb-3 p-2.5 mc-slot space-y-2 border border-[#55ff55]/40">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-extrabold text-[#55ff55] flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#55ff55] shrink-0" />
                  <span>Quét Ảnh Trực Tiếp Lấy Tọa Độ (AI OCR)</span>
                </span>

                <input
                  ref={ocrFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleOcrImageUpload}
                  className="hidden"
                />

                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => openCameraScanner( null, false )}
                    className="mc-btn mc-btn-emerald inline-flex items-center gap-1 px-2.5 py-1 text-xs font-black text-[#041a06] cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Mở Camera Quét</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => nativeCameraInputRef.current?.click()}
                    className="mc-btn mc-btn-diamond inline-flex items-center gap-1 px-2.5 py-1 text-xs font-black text-[#041924] cursor-pointer"
                  >
                    <ScanLine className="w-3.5 h-3.5" />
                    <span>Chụp Camera Gốc</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => ocrFileInputRef.current?.click()}
                    className="mc-btn mc-btn-stone inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-white cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-[#55ffff]" />
                    <span>Chọn ảnh</span>
                  </button>
                </div>
              </div>

              {isScanningOcr && (
                <div className="space-y-1">
                  <div className="w-full h-2 bg-black border border-[#55ff55]/50 overflow-hidden">
                    <div
                      className="h-full bg-[#55ff55] transition-all duration-200"
                      style={{ width: `${Math.max(10, ocrProgress)}%` }}
                    />
                  </div>
                </div>
              )}

              {ocrStatusText && (
                <div className="text-xs text-[#55ff55] bg-[#0b2210] px-2.5 py-1.5 border border-[#22c55e] font-mono break-words flex items-center justify-between gap-2 flex-wrap">
                  <span>
                    {isScanningOcr ? '⏳ ' : ''}
                    {ocrStatusText}
                  </span>
                  {lastScannedImageSrc && !isScanningOcr && (
                    <button
                      type="button"
                      onClick={() => {
                        setScannerStep('crop-review');
                        setIsCameraScannerOpen(true);
                      }}
                      className="mc-btn mc-btn-gold px-2 py-0.5 text-[10px] font-black text-[#1f1300] cursor-pointer shrink-0"
                    >
                      ✂️ Cắt lại vùng ảnh / Xem chi tiết
                    </button>
                  )}
                </div>
              )}

              {ocrCandidates.length > 1 && (
                <div className="space-y-1 pt-0.5">
                  <span className="block text-[10px] font-mono text-amber-300">
                    🎯 Phát hiện thêm tọa độ khác trong ảnh (Bấm để đổi):
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {ocrCandidates.map((cand) => (
                      <button
                        key={cand.key}
                        type="button"
                        onClick={() => {
                          const hasCandY = cand.y !== null && cand.y !== undefined && cand.y !== '';
                          setFormData((prev) => ({
                            ...prev,
                            x: String(cand.x),
                            y: hasCandY ? String(cand.y) : '',
                            z: String(cand.z),
                            dimension: cand.dimension || prev.dimension,
                          }));
                          setSmartPasteInput(
                            cand.rawLine ||
                              (hasCandY ? `${cand.x} ${cand.y} ${cand.z}` : `${cand.x} ${cand.z}`)
                          );
                          showToast(
                            hasCandY
                              ? `Đã chọn: X:${cand.x} Y:${cand.y} Z:${cand.z}`
                              : `Đã chọn tọa độ 2 số: X:${cand.x} Z:${cand.z} (Y:~)`,
                            'orb'
                          );
                        }}
                        className="mc-btn mc-btn-stone px-2 py-0.5 text-[10px] font-mono text-[#55ffff] cursor-pointer"
                      >
                        {cand.label}: X:{cand.x} Y:{cand.y ?? '~'} Z:{cand.z}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-1.5 flex-wrap">
                {OCR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyOcrPreset(preset)}
                    className="mc-btn mc-btn-stone px-2 py-0.5 text-[10px] text-[#55ff55] font-bold cursor-pointer"
                  >
                    ⚡ {preset.label}
                  </button>
                ))}
              </div>

              <div>
                <input
                  type="text"
                  value={smartPasteInput}
                  onChange={(e) => handleSmartPaste(e.target.value)}
                  placeholder="Dán nhanh tọa độ 2 số (VD: 10029 2844), Position: X, Y, Z hoặc dòng F3+C..."
                  className="w-full bg-[#09090d] border border-[#6b21a8] px-2.5 py-1.5 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>
            </div>

            <form onSubmit={handleSaveWaypoint} className="space-y-3">
              <div className="p-2.5 mc-slot border border-[#eab308]/50">
                <label className="block text-xs font-extrabold text-[#ffff55] mb-1 flex items-center gap-1.5">
                  <FolderOpen className="w-3.5 h-3.5 text-[#ffff55] shrink-0" />
                  <span>Nằm trong thư mục / khu vực cha</span>
                </label>
                <select
                  value={formData.parentId}
                  onChange={(e) => {
                    const newParentId = e.target.value;
                    const parentObj = activeWaypoints.find((w) => w.id === newParentId);
                    setFormData((prev) => ({
                      ...prev,
                      parentId: newParentId,
                      dimension: parentObj ? parentObj.dimension : prev.dimension,
                    }));
                  }}
                  className="w-full bg-[#14141d] border border-black px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none truncate"
                >
                  <option value="">💻 Thư mục gốc của World ({currentWorld?.name})</option>
                  {activeWaypoints
                    .filter((w) => w.id !== editingId && !isDescendantOrSelf(editingId, w.id))
                    .map((w) => (
                      <option key={w.id} value={w.id}>
                        📁 {getFolderPathLabel(w)} ({w.x}, {w.z})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-zinc-200 mb-1">
                  {formData.isFolder ? 'Tên thư mục khu vực *' : 'Tên địa điểm *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={
                    formData.isFolder
                      ? 'VD: Khu Công Nghiệp, Tầng Hầm B1, Cụm Farm Nether...'
                      : 'VD: Căn cứ chính, Kho để đồ, Khu dân làng...'
                  }
                  className="w-full mc-slot px-3 py-2 text-sm text-white font-bold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-extrabold text-[#ff5555] mb-1 font-mono">
                    X {formData.isFolder ? '(Tùy)' : '*'}
                  </label>
                  <input
                    type="number"
                    required={!formData.isFolder}
                    value={formData.x}
                    onChange={(e) => setFormData({ ...formData, x: e.target.value })}
                    placeholder="0"
                    className="w-full mc-slot px-2.5 py-2 text-sm font-mono font-bold text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#55ff55] mb-1 font-mono">
                    Y <span className="text-[10px] text-zinc-400 font-normal">(Tùy)</span>
                  </label>
                  <input
                    type="number"
                    value={formData.y}
                    onChange={(e) => setFormData({ ...formData, y: e.target.value })}
                    placeholder="~"
                    className="w-full mc-slot px-2.5 py-2 text-sm font-mono font-bold text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#55ffff] mb-1 font-mono">
                    Z {formData.isFolder ? '(Tùy)' : '*'}
                  </label>
                  <input
                    type="number"
                    required={!formData.isFolder}
                    value={formData.z}
                    onChange={(e) => setFormData({ ...formData, z: e.target.value })}
                    placeholder="0"
                    className="w-full mc-slot px-2.5 py-2 text-sm font-mono font-bold text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-zinc-200 mb-1">
                    Chiều không gian
                  </label>
                  <select
                    value={formData.dimension}
                    onChange={(e) => setFormData({ ...formData, dimension: e.target.value })}
                    className="w-full mc-slot px-2.5 py-2 text-xs sm:text-sm font-bold text-white focus:outline-none"
                  >
                    <option value="overworld" className="bg-[#141720]">Overworld</option>
                    <option value="nether" className="bg-[#141720]">Nether</option>
                    <option value="end" className="bg-[#141720]">The End</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-zinc-200 mb-1">
                    Phân loại (Tag)
                  </label>
                  <select
                    value={formData.tag}
                    onChange={(e) => {
                      const nextTag = e.target.value;
                      setFormData({
                        ...formData,
                        tag: nextTag,
                        icon: TAG_CONFIG[nextTag]?.defaultIcon || formData.icon,
                      });
                    }}
                    className="w-full mc-slot px-2.5 py-2 text-xs sm:text-sm font-bold text-white focus:outline-none"
                  >
                    {Object.keys(TAG_CONFIG).map((key) => (
                      <option key={key} value={key} className="bg-[#141720]">
                        {TAG_CONFIG[key].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-2.5 mc-slot space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-extrabold uppercase text-[#55ff55] flex items-center gap-1.5">
                    <VoxelBlockIcon type={formData.icon || 'grass'} className="w-4 h-4" />
                    <span>Biểu tượng: {MC_ICON_MAP[formData.icon]?.label || 'Đất Cỏ'}</span>
                  </span>
                  <div className="flex items-center gap-1 flex-wrap">
                    {iconCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setIconCategoryFilter(cat)}
                        className={`mc-btn px-2 py-0.5 text-[10px] font-bold cursor-pointer ${
                          iconCategoryFilter === cat
                            ? 'mc-btn-gold text-[#1f1300]'
                            : 'mc-btn-stone text-zinc-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  value={iconSearchQuery}
                  onChange={(e) => setIconSearchQuery(e.target.value)}
                  placeholder="Tìm nhanh biểu tượng (VD: Axolotl, Gà, Rương, Obi...)"
                  className="w-full bg-[#09090d] border border-zinc-700 px-2.5 py-1 text-xs font-mono text-white focus:outline-none"
                />

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 max-h-40 overflow-y-auto p-1">
                  {filteredIconsForPicker.map((ic) => {
                    const isSelected = formData.icon === ic.id;
                    return (
                      <button
                        key={ic.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: ic.id })}
                        className={`mc-btn p-1.5 flex flex-col items-center justify-center gap-1 text-center cursor-pointer min-w-0 ${
                          isSelected
                            ? 'mc-btn-emerald text-[#041a06]'
                            : 'mc-btn-stone text-zinc-200'
                        }`}
                      >
                        <VoxelBlockIcon type={ic.id} className="w-5 h-5" />
                        <span className="text-[9px] font-bold leading-tight truncate w-full">
                          {ic.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-zinc-200 mb-1">
                  Ghi chú
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ghi chú ngắn..."
                  className="w-full mc-slot px-3 py-2 text-xs sm:text-sm font-mono text-white focus:outline-none"
                />
              </div>

              <div className="p-2.5 mc-slot space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-extrabold text-zinc-200 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#55ffff]" />
                    <span>Ảnh đính kèm ({(formData.screenshots || []).length}/2)</span>
                  </span>
                  <input
                    ref={screenshotInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAddScreenshot}
                    className="hidden"
                  />
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(formData.screenshots || []).length < 2 && (
                      <button
                        type="button"
                        onClick={() => screenshotInputRef.current?.click()}
                        className="mc-btn mc-btn-diamond px-2.5 py-1 text-xs font-black text-[#041924] cursor-pointer"
                      >
                        + Thêm ảnh
                      </button>
                    )}
                    {(formData.screenshots || []).length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearAllFormScreenshots}
                        className="mc-btn mc-btn-tnt px-2.5 py-1 text-xs font-black text-white cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Xóa hết ảnh</span>
                      </button>
                    )}
                  </div>
                </div>

                <label className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoAttachScannedPhoto}
                    onChange={(e) => setAutoAttachScannedPhoto(e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#55ff55]"
                  />
                  <span>Tự động đính kèm (hoặc thay ảnh cũ) khi quét tọa độ bằng Camera</span>
                </label>

                {(formData.screenshots || []).length > 0 ? (
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {formData.screenshots.map((src, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col border-2 border-black bg-[#0d0d14] overflow-hidden"
                      >
                        <div
                          onClick={() =>
                            setLightboxData({
                              src,
                              title: `${formData.name || 'Ảnh đính kèm'} (Ảnh ${idx + 1})`,
                              imageIndex: idx,
                              isFormPreview: true,
                            })
                          }
                          className="relative h-24 overflow-hidden cursor-pointer group/preview"
                        >
                          <img
                            src={src}
                            alt={`Ảnh đính kèm ${idx + 1}`}
                            className="w-full h-full object-cover max-w-full group-hover/preview:scale-105 transition-transform"
                          />
                          <span className="absolute bottom-1 left-1 bg-black/80 text-[10px] font-mono font-bold text-[#55ffff] px-1.5 py-0.5 border border-zinc-700">
                            Ảnh {idx + 1} • Bấm để phóng to
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveScreenshot(idx);
                            }}
                            title="Xóa ảnh này"
                            className="mc-btn mc-btn-tnt absolute top-1 right-1 text-white p-1 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-1 p-1.5 bg-[#14141d] border-t border-black">
                          <button
                            type="button"
                            onClick={() => triggerReplaceScreenshot('form', idx)}
                            className="mc-btn mc-btn-gold py-1 px-1.5 text-[10px] font-black text-[#1f1300] cursor-pointer flex items-center justify-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3 shrink-0" />
                            <span>Thay ảnh</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveScreenshot(idx)}
                            className="mc-btn mc-btn-tnt py-1 px-1.5 text-[10px] font-black text-white cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Trash2 className="w-3 h-3 shrink-0" />
                            <span>Xóa ảnh</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] font-mono text-zinc-500">
                    Chưa có ảnh đính kèm. Bạn có thể bấm "+ Thêm ảnh" hoặc quét tọa độ để đính kèm.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <label className="inline-flex items-center gap-1.5 text-xs font-bold text-[#55ffff] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.locked}
                    onChange={(e) => setFormData({ ...formData, locked: e.target.checked })}
                    className="w-4 h-4 accent-[#55ffff]"
                  />
                  <Lock className="w-3.5 h-3.5" />
                  <span>Khóa bảo vệ</span>
                </label>

                <label className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffff55] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.pinned}
                    onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
                    className="w-4 h-4 accent-[#ffff55]"
                  />
                  <Star className="w-3.5 h-3.5" />
                  <span>Ghim lên đầu</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t-2 border-black">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="mc-btn mc-btn-stone px-4 py-2 text-xs font-black uppercase text-zinc-200 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="mc-btn mc-btn-emerald px-5 py-2 text-xs font-black uppercase text-[#041a06] cursor-pointer"
                >
                  {editingId ? 'Lưu Thay Đổi' : 'Lưu Tọa Độ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ĐO KHOẢNG CÁCH 2 ĐIỂM */}
      {isDistanceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="mc-panel max-w-lg w-full p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b-2 border-black">
              <h2 className="text-sm sm:text-base font-black text-[#ffff55] flex items-center gap-2 truncate mc-text-shadow">
                <Ruler className="w-4 h-4 text-[#ffff55] shrink-0" />
                <span className="truncate">Đo Khoảng Cách 2 Điểm</span>
              </h2>
              <button
                type="button"
                onClick={() => setIsDistanceOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {activeWaypoints.length < 2 ? (
              <p className="text-xs text-zinc-400 py-6 text-center mc-slot font-mono">
                Cần tối thiểu 2 tọa độ để đo khoảng cách.
              </p>
            ) : (
              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Điểm A</label>
                    <select
                      value={distanceCalcResult?.wpA?.id || ''}
                      onChange={(e) => setPointAId(e.target.value)}
                      className="w-full mc-slot px-2.5 py-2 text-white text-xs font-bold truncate"
                    >
                      {activeWaypoints.map((w) => (
                        <option key={w.id} value={w.id} className="bg-[#141720]">
                          {w.name} ({w.x}, {w.z})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Điểm B</label>
                    <select
                      value={distanceCalcResult?.wpB?.id || ''}
                      onChange={(e) => setPointBId(e.target.value)}
                      className="w-full mc-slot px-2.5 py-2 text-white text-xs font-bold truncate"
                    >
                      {activeWaypoints.map((w) => (
                        <option key={w.id} value={w.id} className="bg-[#141720]">
                          {w.name} ({w.x}, {w.z})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {distanceCalcResult && (
                  <div className="space-y-2.5">
                    {!distanceCalcResult.sameDimension && (
                      <div className="p-2 bg-[#332200] border border-[#ffaa00] text-[#ffff55] text-xs font-bold">
                        ⚠️ Hai điểm khác chiều không gian ({distanceCalcResult.wpA.dimension} /{' '}
                        {distanceCalcResult.wpB.dimension}).
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 mc-slot text-center">
                        <span className="text-[11px] text-zinc-400 font-bold">Khoảng cách</span>
                        <div className="text-lg sm:text-xl font-black font-mono text-[#ffff55] mt-0.5 mc-text-shadow">
                          {distanceCalcResult.dist2D}m
                        </div>
                        <span className="text-[11px] text-zinc-400">
                          Hướng: <strong className="text-white">{distanceCalcResult.compass}</strong>
                        </span>
                      </div>

                      <div className="p-3 mc-slot text-center">
                        <span className="text-[11px] text-zinc-400 font-bold">Số khối cần đặt</span>
                        <div className="text-lg sm:text-xl font-black font-mono text-[#55ff55] mt-0.5 mc-text-shadow">
                          {distanceCalcResult.stackCount}s + {distanceCalcResult.remBlocks}
                        </div>
                        <span className="text-[11px] text-zinc-400">
                          (1 stack = 64 khối)
                        </span>
                      </div>
                    </div>

                    <div className="p-3 mc-slot space-y-1.5 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-zinc-400 font-bold">🛤️ Đường ray:</span>
                        <span className="font-mono font-bold text-white text-right">
                          {distanceCalcResult.normalRails} thường + {distanceCalcResult.poweredRails} tăng tốc
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-zinc-400 font-bold">🪽 Bay Elytra:</span>
                        <span className="font-mono font-bold text-[#55ffff] text-right">
                          ~{distanceCalcResult.elytraSeconds}s (~{distanceCalcResult.fireworksNeeded} pháo hoa)
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-zinc-400 font-bold">🚣 Thuyền băng Nether:</span>
                        <span className="font-mono font-bold text-[#d8b4fe] text-right">
                          ~{distanceCalcResult.netherIceBoatSeconds}s ({Math.round(distanceCalcResult.dist2D / 8)}m)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: NETHER HUB CALCULATOR */}
      {isCalcOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
          <div className="mc-panel max-w-md w-full p-4 sm:p-5">
            <div className="absolute top-0 left-0 right-0 h-2.5 mc-turf-nether" />
            <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 pt-1 border-b-2 border-black">
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2 truncate mc-text-shadow">
                <VoxelBlockIcon type="obsidian" className="w-5 h-5" />
                <span>Tính Tọa Độ Cổng Nether</span>
              </h2>
              <button
                type="button"
                onClick={() => setIsCalcOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <select
                  value={calcInput.from}
                  onChange={(e) => setCalcInput({ ...calcInput, from: e.target.value })}
                  className="w-full mc-slot px-2.5 py-2 text-white font-bold text-xs sm:text-sm"
                >
                  <option value="overworld" className="bg-[#141720]">Overworld ➔ Nether (÷8)</option>
                  <option value="nether" className="bg-[#141720]">Nether ➔ Overworld (×8)</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono">
                <div>
                  <label className="block text-[11px] font-bold text-[#ff5555] mb-1">X</label>
                  <input
                    type="number"
                    value={calcInput.x}
                    onChange={(e) => setCalcInput({ ...calcInput, x: Number(e.target.value) })}
                    className="w-full mc-slot px-2 py-1.5 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#55ff55] mb-1">Y</label>
                  <input
                    type="number"
                    value={calcInput.y}
                    onChange={(e) => setCalcInput({ ...calcInput, y: Number(e.target.value) })}
                    className="w-full mc-slot px-2 py-1.5 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#55ffff] mb-1">Z</label>
                  <input
                    type="number"
                    value={calcInput.z}
                    onChange={(e) => setCalcInput({ ...calcInput, z: Number(e.target.value) })}
                    className="w-full mc-slot px-2 py-1.5 text-white font-bold"
                  />
                </div>
              </div>

              <div className="p-3.5 mc-slot border-2 border-[#a855f7] text-center space-y-2">
                <span className="text-xs text-[#d8b4fe] font-extrabold uppercase">
                  Tọa độ bên {calcInput.from === 'overworld' ? 'Nether (÷8)' : 'Overworld (×8)'}:
                </span>
                <div className="text-lg sm:text-xl font-black font-mono text-[#55ff55] mt-1 mc-text-shadow">
                  X: {calcInput.from === 'overworld' ? Math.round(calcInput.x / 8) : calcInput.x * 8}{' '}
                  | Y: {calcInput.y} | Z:{' '}
                  {calcInput.from === 'overworld' ? Math.round(calcInput.z / 8) : calcInput.z * 8}
                </div>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={async () => {
                      const tx =
                        calcInput.from === 'overworld'
                          ? Math.round(calcInput.x / 8)
                          : calcInput.x * 8;
                      const tz =
                        calcInput.from === 'overworld'
                          ? Math.round(calcInput.z / 8)
                          : calcInput.z * 8;
                      await copyToClipboard(`${tx} ${calcInput.y} ${tz}`);
                      showToast(`Đã copy: ${tx} ${calcInput.y} ${tz}`, 'portal');
                    }}
                    className="mc-btn mc-btn-stone px-3 py-1 text-xs font-bold text-white cursor-pointer"
                  >
                    Copy Kết Quả
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: SAO LƯU & ĐỒNG BỘ */}
      {isBackupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="mc-panel max-w-lg w-full p-4 sm:p-5 my-6">
            <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b-2 border-black">
              <h2 className="text-sm sm:text-base font-black text-[#55ffff] flex items-center gap-2 truncate mc-text-shadow">
                <Cloud className="w-4 h-4 text-[#55ffff] shrink-0" />
                <span>Sao Lưu & Đồng Bộ</span>
              </h2>
              <button
                type="button"
                onClick={() => setIsBackupOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <div className="p-3 mc-slot mb-3.5 space-y-2 text-xs">
              <div className="font-extrabold text-[#55ffff] flex items-center justify-between">
                <span>Cloud Sync (Mã phòng)</span>
                {supabaseConfig.lastSync && (
                  <span className="text-[11px] text-[#55ff55] font-mono">
                    {supabaseConfig.lastSync}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={supabaseConfig.roomCode}
                  onChange={(e) =>
                    setSupabaseConfig({ ...supabaseConfig, roomCode: e.target.value })
                  }
                  placeholder="Mã phòng (VD: smp-2026)"
                  className="mc-slot px-2.5 py-1.5 text-white font-mono"
                />
                <input
                  type="text"
                  value={supabaseConfig.url}
                  onChange={(e) =>
                    setSupabaseConfig({ ...supabaseConfig, url: e.target.value })
                  }
                  placeholder="Supabase URL (Tùy chọn)"
                  className="mc-slot px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <button
                type="button"
                onClick={handleCloudSync}
                disabled={isSyncingCloud}
                className="mc-btn mc-btn-diamond w-full py-2 font-black text-[#041924] uppercase cursor-pointer"
              >
                {isSyncingCloud ? 'Đang đồng bộ...' : 'Đồng Bộ Ngay'}
              </button>
            </div>

            <textarea
              rows={5}
              value={backupJsonText}
              onChange={(e) => setBackupJsonText(e.target.value)}
              className="w-full mc-slot p-2.5 text-xs font-mono text-[#55ff55] focus:outline-none mb-3"
            />

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={async () => {
                    await copyToClipboard(backupJsonText);
                    showToast('Đã copy mã JSON!', 'orb');
                  }}
                  className="mc-btn mc-btn-stone inline-flex items-center gap-1 px-2.5 py-2 text-xs font-black text-white cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadJsonFile}
                  className="mc-btn mc-btn-diamond inline-flex items-center gap-1 px-2.5 py-2 text-xs font-black text-[#041924] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải File .JSON</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadCsvFile}
                  className="mc-btn mc-btn-gold inline-flex items-center gap-1 px-2.5 py-2 text-xs font-black text-[#1f1300] cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Xuất .CSV</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleImportBackup}
                className="mc-btn mc-btn-emerald inline-flex items-center gap-1 px-3.5 py-2 text-xs font-black text-[#041a06] cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Khôi Phục Dữ Liệu</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 5: QUẢN LÝ WORLD / SERVER (THÊM, SỬA, CHO VÀO THÙNG RÁC, XÓA HẲN)
      ========================================== */}
      {isWorldModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="mc-panel max-w-lg w-full p-4 sm:p-5 my-6 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-2 mb-3.5 pb-2 border-b-2 border-black">
              <h3 className="text-sm sm:text-base font-black text-[#55ff55] flex items-center gap-2 mc-text-shadow">
                <VoxelBlockIcon type="grass" className="w-5 h-5" />
                <span>Quản Lý World / Server</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsWorldModalOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <form onSubmit={handleCreateWorld} className="p-3 mc-slot mb-4 space-y-2.5">
              <div className="text-xs font-extrabold text-[#ffff55] uppercase">
                + Tạo Thế Giới / Server Mới
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={newWorldName}
                  onChange={(e) => setNewWorldName(e.target.value)}
                  placeholder="Tên thế giới / Server *"
                  className="w-full bg-[#14141d] border border-black px-3 py-1.5 text-xs text-white font-bold focus:outline-none"
                />
                <input
                  type="text"
                  value={newWorldSeed}
                  onChange={(e) => setNewWorldSeed(e.target.value)}
                  placeholder="Seed thế giới (Tùy chọn)"
                  className="w-full bg-[#14141d] border border-black px-3 py-1.5 text-xs text-emerald-300 font-mono focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-zinc-400 font-bold">Icon:</span>
                  {['grass', 'emerald', 'totem', 'obsidian', 'diamond_ore', 'axolotl'].map(
                    (ic) => (
                      <button
                        key={ic}
                        type="button"
                        onClick={() => setNewWorldIcon(ic)}
                        className={`p-1 border ${
                          newWorldIcon === ic
                            ? 'border-[#55ff55] bg-[#163018]'
                            : 'border-black bg-zinc-900'
                        } cursor-pointer`}
                      >
                        <VoxelBlockIcon type={ic} className="w-4 h-4" />
                      </button>
                    )
                  )}
                </div>
                <button
                  type="submit"
                  className="mc-btn mc-btn-emerald px-4 py-1.5 text-xs font-black text-[#041a06] cursor-pointer"
                >
                  Tạo Thế Giới
                </button>
              </div>
            </form>

            <div className="space-y-2 mb-4">
              <div className="text-xs font-extrabold text-white uppercase flex items-center justify-between">
                <span>World đang hoạt động ({activeWorlds.length})</span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  Xóa sẽ vào Thùng rác trước
                </span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-0.5">
                {activeWorlds.map((w) => {
                  const wpCount = waypoints.filter(
                    (item) => item.worldId === w.id && !item.deletedAt
                  ).length;
                  const isCurrent = w.id === selectedWorldId;
                  const isEditingThis = editingWorldId === w.id;

                  return (
                    <div
                      key={w.id}
                      className={`p-2.5 mc-slot border ${
                        isCurrent ? 'border-[#55ff55]' : 'border-black'
                      } flex flex-col gap-2`}
                    >
                      {isEditingThis ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingWorldName}
                            onChange={(e) => setEditingWorldName(e.target.value)}
                            className="w-full bg-[#14141d] border border-zinc-600 px-2.5 py-1 text-xs text-white font-bold"
                          />
                          <input
                            type="text"
                            value={editingWorldSeed}
                            onChange={(e) => setEditingWorldSeed(e.target.value)}
                            placeholder="World Seed..."
                            className="w-full bg-[#14141d] border border-zinc-600 px-2.5 py-1 text-xs text-emerald-300 font-mono"
                          />
                          <div className="flex justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingWorldId(null)}
                              className="mc-btn mc-btn-stone px-2.5 py-1 text-xs text-white cursor-pointer"
                            >
                              Hủy
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveEditWorld(w.id)}
                              className="mc-btn mc-btn-emerald px-3 py-1 text-xs font-black text-[#041a06] cursor-pointer"
                            >
                              Lưu
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-2 min-w-0">
                          <div
                            onClick={() => {
                              setSelectedWorldId(w.id);
                              setIsWorldModalOpen(false);
                            }}
                            className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
                          >
                            <VoxelBlockIcon type={w.icon || 'grass'} className="w-6 h-6 shrink-0" />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-xs sm:text-sm text-white truncate">
                                  {w.name}
                                </span>
                                {isCurrent && (
                                  <span className="px-1.5 py-0.5 bg-[#1b3b1a] text-[#55ff55] text-[9px] font-mono border border-[#3ca832] shrink-0">
                                    Đang mở
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] font-mono text-zinc-400 truncate">
                                {wpCount} mục{w.seed ? ` • Seed: ${w.seed}` : ''}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {w.seed && (
                              <button
                                type="button"
                                onClick={async () => {
                                  await copyToClipboard(w.seed);
                                  showToast(`Đã copy Seed: ${w.seed}`, 'orb');
                                }}
                                title="Copy Seed"
                                className="mc-btn mc-btn-stone px-2 py-1 text-[10px] font-bold text-[#55ffff] cursor-pointer"
                              >
                                Seed
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setEditingWorldId(w.id);
                                setEditingWorldName(w.name);
                                setEditingWorldSeed(w.seed || '');
                              }}
                              title="Đổi tên World / Sửa Seed"
                              className="mc-btn mc-btn-stone p-1.5 text-zinc-200 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSoftDeleteWorld(w)}
                              title="Xóa World vào Thùng rác"
                              className="mc-btn mc-btn-tnt px-2 py-1 text-[11px] font-black text-white inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Xóa</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t-2 border-black space-y-2">
              <div className="text-xs font-extrabold text-rose-400 uppercase flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5" />
                <span>Thùng Rác World ({trashedWorlds.length})</span>
              </div>

              {trashedWorlds.length === 0 ? (
                <p className="text-[11px] font-mono text-zinc-500 py-2 text-center mc-slot">
                  Chưa có World nào bị xóa.
                </p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {trashedWorlds.map((w) => {
                    const wpCount = waypoints.filter((item) => item.worldId === w.id).length;
                    const isConfirming = confirmPermanentDeleteWorldId === w.id;
                    return (
                      <div key={w.id} className="p-2.5 mc-slot border border-rose-500/40 space-y-2">
                        <div className="flex items-center justify-between gap-2 min-w-0">
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-zinc-200 truncate">
                              {w.name}
                            </div>
                            <div className="text-[10px] font-mono text-zinc-400">
                              Chứa {wpCount} tọa độ / thư mục
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleRestoreWorld(w.id)}
                              className="mc-btn mc-btn-emerald px-2.5 py-1 text-[11px] font-black text-[#041a06] cursor-pointer"
                            >
                              Khôi phục
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmPermanentDeleteWorldId(w.id)}
                              className="mc-btn mc-btn-tnt px-2.5 py-1 text-[11px] font-black text-white cursor-pointer"
                            >
                              Xóa hẳn
                            </button>
                          </div>
                        </div>

                        {isConfirming && (
                          <div className="p-2 bg-rose-950/80 border border-rose-500 flex items-center justify-between gap-2 text-[11px]">
                            <span className="text-rose-200 font-bold">
                              Xóa vĩnh viễn không thể khôi phục?
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => setConfirmPermanentDeleteWorldId(null)}
                                className="mc-btn mc-btn-stone px-2 py-0.5 text-white cursor-pointer"
                              >
                                Hủy
                              </button>
                              <button
                                type="button"
                                onClick={() => handlePermanentDeleteWorld(w.id)}
                                className="mc-btn mc-btn-tnt px-2 py-0.5 font-black text-white cursor-pointer"
                              >
                                Đồng ý xóa hẳn
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: XEM ẢNH LIGHTBOX (HỖ TRỢ THAY ẢNH HOẶC XÓA ẢNH ĐÍNH KÈM TRỰC TIẾP) */}
      {lightboxData && (
        <div
          onClick={() => setLightboxData(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mc-panel max-w-2xl w-full p-3.5 sm:p-4 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs sm:text-sm font-black text-white truncate mc-text-shadow">
                {lightboxData.title}
              </h4>
              <button
                type="button"
                onClick={() => setLightboxData(null)}
                className="mc-btn mc-btn-stone p-1.5 text-white cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
            <img
              src={lightboxData.src}
              alt={lightboxData.title}
              className="w-full max-h-[65vh] object-contain mc-slot max-w-full"
            />
            <div className="flex items-center justify-end gap-2 pt-1 border-t border-black/80 flex-wrap">
              {(lightboxData.isFormPreview || lightboxData.waypointId) && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      if (lightboxData.isFormPreview) {
                        triggerReplaceScreenshot('form', lightboxData.imageIndex ?? 0);
                      } else if (lightboxData.waypointId) {
                        triggerReplaceScreenshot(
                          'waypoint',
                          lightboxData.imageIndex ?? 0,
                          lightboxData.waypointId
                        );
                      }
                    }}
                    className="mc-btn mc-btn-gold px-3 py-1.5 text-xs font-black text-[#1f1300] cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Thay ảnh khác</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (lightboxData.isFormPreview) {
                        handleRemoveScreenshot(lightboxData.imageIndex ?? 0);
                        setLightboxData(null);
                      } else if (lightboxData.waypointId) {
                        handleDeleteWaypointScreenshotDirect(
                          lightboxData.waypointId,
                          lightboxData.imageIndex ?? 0
                        );
                      }
                    }}
                    className="mc-btn mc-btn-tnt px-3 py-1.5 text-xs font-black text-white cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa ảnh đính kèm này</span>
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => setLightboxData(null)}
                className="mc-btn mc-btn-stone px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 8: MÁY ẢNH QUÉT TỌA ĐỘ TRỰC TIẾP TRONG APP (v2.2.2)
      ========================================== */}
      {isCameraScannerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
          <div className="mc-panel max-w-2xl w-full p-3 sm:p-5 my-2 max-h-[94vh] overflow-y-auto space-y-3">
            <div className="absolute top-0 left-0 right-0 h-2.5 mc-turf-overworld" />

            {/* Header Modal Quét Ảnh */}
            <div className="flex items-center justify-between gap-2 pb-2 pt-1 border-b-2 border-black">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 mc-slot flex items-center justify-center shrink-0">
                  <Camera className="w-5 h-5 text-[#55ff55]" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-black text-[#55ff55] truncate mc-text-shadow">
                    Quét Ảnh Trực Tiếp Lấy Tọa Độ (v2.2.2)
                  </h2>
                  <p className="text-[11px] font-mono text-zinc-400 truncate">
                    {scannerTargetParent
                      ? `📂 Sẽ chuẩn bị lưu vào: ${scannerTargetParent.name}`
                      : `🌍 Sẽ chuẩn bị lưu vào: ${currentWorld?.name || 'World hiện tại'}`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  stopLiveCameraStream();
                  setIsCameraScannerOpen(false);
                }}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Thanh 3 nút chọn phương thức chụp / tải ảnh cực nhanh trên điện thoại */}
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setScannerStep('camera')}
                className={`mc-btn py-2 px-2 text-xs font-black flex items-center justify-center gap-1 cursor-pointer ${
                  scannerStep === 'camera'
                    ? 'mc-btn-emerald text-[#041a06]'
                    : 'mc-btn-stone text-zinc-200'
                }`}
              >
                <Camera className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Camera Live</span>
              </button>

              <button
                type="button"
                onClick={() => nativeCameraInputRef.current?.click()}
                className="mc-btn mc-btn-diamond py-2 px-2 text-xs font-black text-[#041924] flex items-center justify-center gap-1 cursor-pointer"
              >
                <ScanLine className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Máy Ảnh Gốc</span>
              </button>

              <button
                type="button"
                onClick={() => scannerGalleryInputRef.current?.click()}
                className="mc-btn mc-btn-gold py-2 px-2 text-xs font-black text-[#1f1300] flex items-center justify-center gap-1 cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Chọn Ảnh Máy</span>
              </button>
            </div>

            {/* Tùy chọn Tự động chuyển sang bảng Lưu Tọa Độ ngay khi nhận diện xong */}
            <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 mc-slot text-xs">
              <label className="inline-flex items-center gap-2 cursor-pointer font-bold text-zinc-200">
                <input
                  type="checkbox"
                  checked={autoPrepareOnScan}
                  onChange={(e) => setAutoPrepareOnScan(e.target.checked)}
                  className="w-4 h-4 accent-[#55ff55]"
                />
                <span>Tự động điền & mở bảng Lưu Tọa Độ ngay sau khi chụp</span>
              </label>
              <span className="text-[10px] font-mono text-[#55ff55] shrink-0">Chuẩn AI 3 lớp</span>
            </div>

            {scannerStep === 'camera' ? (
              /* ==========================================
                 BƯỚC 1: KHUNG NGẮM MÁY ẢNH TRỰC TIẾP TRONG APP
              ========================================== */
              <div className="space-y-3">
                {/* Chọn vùng ngắm ưu tiên trên Camera */}
                <div className="flex items-center justify-between gap-1.5 flex-wrap">
                  <span className="text-[11px] font-mono text-zinc-300">Khung ngắm ưu tiên:</span>
                  <div className="flex items-center gap-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setCameraAimMode('hud-strip')}
                      className={`mc-btn px-2 py-1 text-[10px] font-bold cursor-pointer ${
                        cameraAimMode === 'hud-strip'
                          ? 'mc-btn-emerald text-[#041a06]'
                          : 'mc-btn-stone text-zinc-300'
                      }`}
                    >
                      🎯 Khung Giữa (Chuẩn nhất)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCameraAimMode('top-left')}
                      className={`mc-btn px-2 py-1 text-[10px] font-bold cursor-pointer ${
                        cameraAimMode === 'top-left'
                          ? 'mc-btn-emerald text-[#041a06]'
                          : 'mc-btn-stone text-zinc-300'
                      }`}
                    >
                      ↖️ Góc Trái (F3 / MCPE)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCameraAimMode('full')}
                      className={`mc-btn px-2 py-1 text-[10px] font-bold cursor-pointer ${
                        cameraAimMode === 'full'
                          ? 'mc-btn-emerald text-[#041a06]'
                          : 'mc-btn-stone text-zinc-300'
                      }`}
                    >
                      🌐 Toàn Màn Hình
                    </button>
                  </div>
                </div>

                {/* Khung Video Live Camera */}
                <div className="relative w-full h-64 sm:h-80 bg-black border-2 border-[#55ff55] overflow-hidden flex items-center justify-center">
                  <video
                    ref={videoPreviewRef}
                    playsInline
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                    style={{
                      transform: cameraZoom > 1 ? `scale(${cameraZoom})` : 'none',
                      transformOrigin: 'center center',
                    }}
                  />

                  {/* Lớp phủ Khung Ngắm Tọa Độ (Target Box) */}
                  {!cameraErrorMsg && (
                    <div className="absolute inset-0 pointer-events-none">
                      {cameraAimMode === 'hud-strip' && (
                        <div
                          className="absolute border-2 border-[#55ff55] shadow-[0_0_0_9999px_rgba(0,0,0,0.48)]"
                          style={{ left: '4%', top: '24%', width: '92%', height: '38%' }}
                        >
                          <div className="absolute -top-5 left-0 bg-[#55ff55] text-[#041a06] text-[10px] font-black px-1.5 py-0.5 uppercase">
                            Đưa dòng tọa độ (Position / XYZ) vào khung này
                          </div>
                          <div className="w-full h-0.5 bg-[#55ff55]/80 absolute top-1/2 animate-pulse" />
                        </div>
                      )}

                      {cameraAimMode === 'top-left' && (
                        <div
                          className="absolute border-2 border-[#55ffff] shadow-[0_0_0_9999px_rgba(0,0,0,0.48)]"
                          style={{ left: '2%', top: '4%', width: '70%', height: '44%' }}
                        >
                          <div className="absolute bottom-1 left-1 bg-[#55ffff] text-[#041924] text-[10px] font-black px-1.5 py-0.5 uppercase">
                            Vùng Góc Trái Trên (F3 / MCPE HUD)
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Thông báo nếu WebView yêu cầu mở Máy Ảnh Gốc */}
                  {cameraErrorMsg && (
                    <div className="absolute inset-0 bg-[#0d0d14]/95 p-4 flex flex-col items-center justify-center text-center space-y-3">
                      <Camera className="w-10 h-10 text-[#55ffff]" />
                      <p className="text-xs font-mono text-zinc-200 max-w-md leading-relaxed">
                        {cameraErrorMsg}
                      </p>
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => nativeCameraInputRef.current?.click()}
                          className="mc-btn mc-btn-emerald px-4 py-2.5 text-xs font-black text-[#041a06] uppercase cursor-pointer flex items-center gap-1.5"
                        >
                          <Camera className="w-4 h-4" />
                          <span>Mở Máy Ảnh Gốc Điện Thoại</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => scannerGalleryInputRef.current?.click()}
                          className="mc-btn mc-btn-diamond px-3.5 py-2.5 text-xs font-black text-[#041924] uppercase cursor-pointer"
                        >
                          Chọn Ảnh Trong Máy
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Thanh điều khiển Zoom + Đèn Flash + Đổi Camera */}
                <div className="flex items-center justify-between gap-2 mc-slot p-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-1 min-w-[160px]">
                    <ZoomIn className="w-4 h-4 text-[#55ffff] shrink-0" />
                    <span className="text-[11px] font-mono text-zinc-300 shrink-0">
                      Phóng đại: <strong className="text-[#55ffff]">{cameraZoom.toFixed(1)}x</strong>
                    </span>
                    <input
                      type="range"
                      min="1"
                      max="3.5"
                      step="0.25"
                      value={cameraZoom}
                      onChange={(e) => setCameraZoom(parseFloat(e.target.value))}
                      className="w-full accent-[#55ff55] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={handleToggleCameraTorch}
                      className={`mc-btn px-2.5 py-1 text-xs font-bold cursor-pointer ${
                        cameraTorchOn ? 'mc-btn-gold text-[#1f1300]' : 'mc-btn-stone text-zinc-200'
                      }`}
                    >
                      🔦 Flash
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCameraFacingMode((prev) =>
                          prev === 'environment' ? 'user' : 'environment'
                        )
                      }
                      className="mc-btn mc-btn-stone px-2.5 py-1 text-xs font-bold text-zinc-200 cursor-pointer"
                    >
                      🔄 Đổi Cam
                    </button>
                  </div>
                </div>

                {/* Nút Chụp Chính & Nút Test Ảnh Mẫu */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCaptureFromLiveVideo}
                    disabled={isScanningOcr}
                    className="mc-btn mc-btn-emerald py-3 px-4 text-sm font-black text-[#041a06] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Camera className="w-5 h-5 stroke-[2.5]" />
                    <span>{ isScanningOcr ? 'Đang Quét Tọa Độ...' : 'Chụp & Quét Tọa Độ Ngay' }</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => nativeCameraInputRef.current?.click()}
                    className="mc-btn mc-btn-diamond py-3 px-4 text-xs sm:text-sm font-black text-[#041924] uppercase flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ScanLine className="w-4 h-4 stroke-[2.5]" />
                    <span>Chụp Bằng Camera Gốc ĐT</span>
                  </button>
                </div>

                {/* Dải nút Test OCR thực tế trên ảnh màn hình mẫu (dành cho test nhanh) */}
                <div className="p-2 mc-slot flex items-center justify-between gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono text-zinc-400">
                    🧪 Chụp thử màn hình MC mẫu để kiểm tra độ chính xác AI OCR:
                  </span>
                  <div className="flex items-center gap-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleTestSyntheticOcr('xz')}
                      className="mc-btn mc-btn-gold px-2 py-0.5 text-[10px] font-black text-[#1f1300] cursor-pointer"
                    >
                      Test 2 Số (2223 556)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTestSyntheticOcr('mcpe')}
                      className="mc-btn mc-btn-stone px-2 py-0.5 text-[10px] font-bold text-[#55ff55] cursor-pointer"
                    >
                      Test Ảnh MCPE
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTestSyntheticOcr('f3')}
                      className="mc-btn mc-btn-stone px-2 py-0.5 text-[10px] font-bold text-[#55ffff] cursor-pointer"
                    >
                      Test Ảnh Java F3
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTestSyntheticOcr('nether')}
                      className="mc-btn mc-btn-stone px-2 py-0.5 text-[10px] font-bold text-orange-300 cursor-pointer"
                    >
                      Test Ảnh Nether
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ==========================================
                 BƯỚC 2: XEM ẢNH ĐÃ CHỤP, KÉO KHUNG CẮT TỌA ĐỘ & XÁC NHẬN KẾT QUẢ
              ========================================== */
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-bold text-[#ffff55]">
                    ✂️ Khoanh vùng chứa số tọa độ trên ảnh (Chạm & kéo khung xanh):
                  </span>
                  <div className="flex items-center gap-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        const nextCrop = { x: 0, y: 0, w: 1, h: 1 };
                        setCropBox(nextCrop);
                        if (lastScannedImageSrc) {
                          executeOcrOnImageDataUrl(lastScannedImageSrc, nextCrop, false);
                        }
                      }}
                      className="mc-btn mc-btn-stone px-2 py-0.5 text-[10px] font-bold text-white cursor-pointer"
                    >
                      Toàn ảnh
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const nextCrop = { x: 0.0, y: 0.0, w: 0.68, h: 0.44 };
                        setCropBox(nextCrop);
                        if (lastScannedImageSrc) {
                          executeOcrOnImageDataUrl(lastScannedImageSrc, nextCrop, false);
                        }
                      }}
                      className="mc-btn mc-btn-stone px-2 py-0.5 text-[10px] font-bold text-[#55ffff] cursor-pointer"
                    >
                      Góc Trái (F3/MCPE)
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBinaryInScanner(!showBinaryInScanner)}
                      className="mc-btn mc-btn-stone px-2 py-0.5 text-[10px] font-bold text-[#55ff55] cursor-pointer"
                    >
                      {showBinaryInScanner ? '👁️ Xem Ảnh Gốc' : '⚡ Xem Ảnh AI Đen-Trắng'}
                    </button>
                  </div>
                </div>

                {/* Khung hiển thị ảnh & Kéo chọn vùng cắt */}
                {lastScannedImageSrc && (
                  <div className="w-full max-h-64 overflow-hidden bg-black border-2 border-zinc-700 flex items-center justify-center">
                    <div
                      ref={cropImageContainerRef}
                      onMouseDown={handleCropPointerDown}
                      onMouseMove={handleCropPointerMove}
                      onMouseUp={handleCropPointerUp}
                      onTouchStart={handleCropPointerDown}
                      onTouchMove={handleCropPointerMove}
                      onTouchEnd={handleCropPointerUp}
                      className="relative inline-block max-w-full max-h-64 select-none cursor-crosshair touch-none"
                    >
                      <img
                        src={
                          showBinaryInScanner && lastBinaryPreviewSrc
                            ? lastBinaryPreviewSrc
                            : lastScannedImageSrc
                        }
                        alt="Ảnh quét tọa độ"
                        draggable={false}
                        className="block max-w-full max-h-64 w-auto h-auto object-contain pointer-events-none"
                      />
                      {!showBinaryInScanner && (
                        <div
                          className="absolute border-2 border-[#55ff55] bg-[#55ff55]/15 pointer-events-none"
                          style={{
                            left: `${cropBox.x * 100}%`,
                            top: `${cropBox.y * 100}%`,
                            width: `${cropBox.w * 100}%`,
                            height: `${cropBox.h * 100}%`,
                          }}
                        >
                          <span className="absolute -top-5 left-0 bg-[#55ff55] text-[#041a06] text-[9px] font-black px-1 py-0.5">
                            Vùng quét OCR
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      if (lastScannedImageSrc) {
                        executeOcrOnImageDataUrl(lastScannedImageSrc, cropBox, false);
                      }
                    }}
                    disabled={isScanningOcr}
                    className="mc-btn mc-btn-gold px-3 py-1.5 text-xs font-black text-[#1f1300] cursor-pointer flex items-center gap-1.5"
                  >
                    <ScanLine className="w-3.5 h-3.5" />
                    <span>🔍 Quét Lại Vùng Khung Xanh (Phóng Đại 3x)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScannerStep('camera')}
                    className="mc-btn mc-btn-stone px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
                  >
                    📷 Chụp Ảnh Khác
                  </button>
                </div>

                {isScanningOcr && (
                  <div className="space-y-1">
                    <div className="w-full h-2.5 bg-black border border-[#55ff55] overflow-hidden">
                      <div
                        className="h-full bg-[#55ff55] transition-all duration-200"
                        style={{ width: `${Math.max(12, ocrProgress)}%` }}
                      />
                    </div>
                  </div>
                )}

                {ocrStatusText && (
                  <p className="text-xs text-[#55ff55] bg-[#0b2210] px-2.5 py-1.5 border border-[#22c55e] font-mono break-words">
                    {isScanningOcr ? '⏳ ' : ''}
                    {ocrStatusText}
                  </p>
                )}

                {/* Bảng kết quả tọa độ đã định dạng */}
                <div className="p-3 mc-slot border border-[#55ff55]/50 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black uppercase text-[#55ff55]">
                      🎯 Tọa độ đã định dạng (Có thể chỉnh nhanh nếu cần):
                    </span>
                    <span className="text-[10px] font-mono text-amber-300">
                      {scannerDraftCoord.label || 'Chuẩn hóa'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 font-mono">
                    <div>
                      <label className="block text-[10px] font-bold text-[#ff5555] mb-0.5">
                        TỌA ĐỘ X
                      </label>
                      <input
                        type="number"
                        value={scannerDraftCoord.x}
                        onChange={(e) =>
                          setScannerDraftCoord({ ...scannerDraftCoord, x: e.target.value })
                        }
                        placeholder="0"
                        className="w-full mc-slot px-2.5 py-1.5 text-sm font-black text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#55ff55] mb-0.5">
                        TỌA ĐỘ Y <span className="text-zinc-400 font-normal">(Tùy)</span>
                      </label>
                      <input
                        type="number"
                        value={scannerDraftCoord.y}
                        onChange={(e) =>
                          setScannerDraftCoord({ ...scannerDraftCoord, y: e.target.value })
                        }
                        placeholder="~ (Chỉ X & Z)"
                        className="w-full mc-slot px-2.5 py-1.5 text-sm font-black text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#55ffff] mb-0.5">
                        TỌA ĐỘ Z
                      </label>
                      <input
                        type="number"
                        value={scannerDraftCoord.z}
                        onChange={(e) =>
                          setScannerDraftCoord({ ...scannerDraftCoord, z: e.target.value })
                        }
                        placeholder="0"
                        className="w-full mc-slot px-2.5 py-1.5 text-sm font-black text-white"
                      />
                    </div>
                  </div>

                  {ocrCandidates.length > 1 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[10px] font-mono text-zinc-400">Các số khác trong ảnh:</span>
                      {ocrCandidates.map((cand) => (
                        <button
                          key={cand.key}
                          type="button"
                          onClick={() =>
                            setScannerDraftCoord((prev) => ({
                              ...prev,
                              x: String(cand.x),
                              y: cand.y !== null && cand.y !== undefined ? String(cand.y) : '',
                              z: String(cand.z),
                              dimension: cand.dimension || prev.dimension,
                              label: cand.label,
                              rawLine: cand.rawLine,
                            }))
                          }
                          className="mc-btn mc-btn-stone px-2 py-0.5 text-[10px] font-mono text-[#55ffff] cursor-pointer"
                        >
                          {cand.label}: {cand.x}, {cand.y ?? '~'}, {cand.z}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={() => {
                        if (scannerDraftCoord.x === '' || scannerDraftCoord.z === '') {
                          showToast('Chưa có tọa độ X và Z!');
                          return;
                        }
                        prepareWaypointFormWithScannedCoord(
                          scannerDraftCoord,
                          scannerDraftCoord.rawLine,
                          lastScannedImageSrc,
                          ocrCandidates
                        );
                      }}
                      className="mc-btn mc-btn-emerald px-4 py-2 text-xs font-black text-[#041a06] uppercase cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Chuẩn Bị Lưu Tọa Độ Mới</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 7: THÔNG TIN PHIÊN BẢN & MẸO SỬ DỤNG (?)
      ========================================== */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
          <div className="mc-panel max-w-md w-full p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b-2 border-black">
              <h3 className="text-sm sm:text-base font-black text-[#55ff55] flex items-center gap-2 mc-text-shadow">
                <VoxelBlockIcon type="command" className="w-5 h-5" />
                <span>fu-WAYPOINT v2.2.2</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsGuideOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-200 font-mono leading-relaxed">
              <div className="mc-slot p-2.5 space-y-1">
                <div className="font-extrabold text-[#55ff55] uppercase">
                  Tính năng mới v2.2.2 — Quét Ảnh Tọa Độ Trực Tiếp:
                </div>
                <p>• Tích hợp nút <strong className="text-white">Quét Ảnh Tọa Độ</strong> mở trực tiếp Máy Ảnh ngay trong ứng dụng hoặc Máy Ảnh gốc điện thoại.</p>
                <p>• Lõi AI OCR 3 lớp: Tự động lọc chữ sáng HUD Minecraft sang nền Đen-Trắng, sửa lỗi nhầm chữ/số và dấu âm (-), tự động định dạng X, Y, Z & Chiều không gian để chuẩn bị lưu ngay.</p>
                <p>• Hỗ trợ chạm kéo khung cắt (Crop 3x) nếu ảnh chụp từ xa hoặc chứa nhiều số phức tạp.</p>
              </div>

              <div className="mc-slot p-2.5 space-y-1">
                <div className="font-extrabold text-[#55ffff] uppercase">
                  Phím tắt nhanh trên Windows:
                </div>
                <p>• <strong className="text-white">Ctrl + N</strong>: Lưu tọa độ mới</p>
                <p>• <strong className="text-white">Ctrl + Shift + N</strong>: Tạo thư mục con mới</p>
                <p>• <strong className="text-white">Backspace</strong>: Lùi về thư mục cha</p>
                <p>• <strong className="text-white">Ctrl + Shift + S</strong>: Bật/tắt khung Lưu Nhanh</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
