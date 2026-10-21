import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  ClipboardPaste,
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
  FolderOpen,
  FolderPlus,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CornerDownRight,
  ArrowLeft,
  Palette,
  Map as MapIcon,
  LayoutGrid,
  ZoomIn,
  ZoomOut,
  ArrowUpDown,
} from 'lucide-react';

// ==========================================
// 0. HỆ THỐNG ÂM THANH & KHO 64 BIỂU TƯỢNG PIXEL MINECRAFT
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
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.045);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.055);
    } else if (type === 'orb') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1174.66, now + 0.065);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    } else if (type === 'tnt') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(65, now + 0.14);
      gain.gain.setValueAtTime(0.1, now);
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

// Danh mục 64 biểu tượng Pixel Minecraft
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
    id: 'shulker',
    label: 'Hộp Shulker',
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
  {
    id: 'axolotl',
    label: 'Kỳ Nhông Axolotl',
    category: 'Dân Làng & Mob',
    bg: '#831843',
    pixels: [
      [3, 4, 10, 8, '#f9a8d4'],
      [1, 3, 2, 3, '#ec4899'],
      [13, 3, 2, 3, '#ec4899'],
      [4, 6, 2, 2, '#18181b'],
      [10, 6, 2, 2, '#18181b'],
      [6, 9, 4, 1, '#db2777'],
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
];

const MC_ICON_MAP = Object.fromEntries(MC_ICON_CATALOG.map((item) => [item.id, item]));

function getIconSvgString(iconId = 'grass', size = 256) {
  const item = MC_ICON_MAP[iconId] || MC_ICON_MAP.grass;
  const rects = item.pixels
    .map(
      ([x, y, w, h, fill]) =>
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" />`
    )
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 16 16" shape-rendering="crispEdges"><rect width="16" height="16" fill="${item.bg}" />${rects}<rect x="0" y="0" width="16" height="16" fill="none" stroke="#000000" stroke-width="1.2" /></svg>`;
}

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
  Base: {
    label: 'Base (Căn cứ)',
    color: 'bg-[#132a3e] text-[#55ffff] border-2 border-[#00aaaa]',
    defaultIcon: 'grass',
    icon: Home,
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
  { id: 'world-1', name: 'Survival Solo' },
  { id: 'world-2', name: 'Server SMP' },
  { id: 'world-3', name: "Mochi's Hardcore" },
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
    name: 'Kho Đồ Tự Động & Rương Ender',
    x: 244,
    y: 62,
    z: -476,
    dimension: 'overworld',
    tag: 'Storage',
    icon: 'chest',
    notes: 'Tầng hầm B1 — Phân loại vật phẩm tự động.',
    screenshots: [],
    pinned: true,
    locked: true,
    deletedAt: null,
    createdAt: 1710000001100,
  },
  {
    id: 'wp-1-sub-2',
    worldId: 'world-1',
    parentId: 'wp-1',
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

// ==========================================
// 3. COMPONENT THẺ TỌA ĐỘ (WaypointCard - Tối ưu chống tràn chữ cho Android & Windows)
// ==========================================
function WaypointCard({
  waypoint,
  childWaypoints = [],
  parentWaypoint = null,
  copyMode,
  playerPos,
  onTogglePin,
  onToggleLock,
  onEdit,
  onSoftDelete,
  onNotify,
  onOpenLightbox,
  onSelectForDistance,
  onEnterFolder,
  onCreateChild,
  onQuickChangeIcon,
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
  const tpY = hasY ? waypoint.y : '~';

  const portalLink = getLinkedPortalCoords(waypoint.x, waypoint.z, waypoint.dimension);
  const chunkX = Math.floor(Number(waypoint.x) / 16);
  const chunkZ = Math.floor(Number(waypoint.z) / 16);

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

  const getCopyString = (overrideMode, targetWp = waypoint) => {
    const mode = overrideMode || copyMode;
    const tHasY = targetWp.y !== null && targetWp.y !== undefined && targetWp.y !== '';
    const tDim = DIMENSION_CONFIG[targetWp.dimension] || DIMENSION_CONFIG.overworld;
    if (mode === 'tp') {
      return `/tp @s ${targetWp.x} ${tHasY ? targetWp.y : '~'} ${targetWp.z}`;
    }
    if (mode === 'raw') {
      return tHasY
        ? `${targetWp.x} ${targetWp.y} ${targetWp.z}`
        : `${targetWp.x} ${targetWp.z}`;
    }
    const ySegment = tHasY ? ` Y:${targetWp.y}` : '';
    return `[${targetWp.name}] - ${tDim.label}: X:${targetWp.x}${ySegment} Z:${targetWp.z}`;
  };

  const handleCopy = async (overrideMode, targetWp = waypoint) => {
    const text = getCopyString(overrideMode, targetWp);
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
    const text = `${portalLink.x} ${hasY ? waypoint.y : ''} ${portalLink.z}`.replace(/\s+/g, ' ').trim();
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
      className={`group relative w-full min-w-0 max-w-full overflow-hidden rounded-none p-3.5 sm:p-4 text-slate-100 transition-transform duration-150 sm:hover:-translate-y-0.5 flex flex-col justify-between mc-card ${dimStyle.border} ${
        activatedBlock ? 'mc-block-flash' : ''
      }`}
    >
      <div className={`absolute top-0 left-0 right-0 h-2.5 ${dimStyle.accentBar}`} />

      <span className="mc-corner mc-corner-tl" />
      <span className="mc-corner mc-corner-tr" />
      <span className="mc-corner mc-corner-bl" />
      <span className="mc-corner mc-corner-br" />

      <div className="pt-1.5 min-w-0">
        {/* Hàng 1: Badge Chiều không gian + Tag + Cụm nút công cụ nhỏ gọn */}
        <div className="flex items-center justify-between gap-1.5 mb-2.5 flex-wrap">
          <div className="flex items-center gap-1 min-w-0 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${dimStyle.badge}`}
            >
              <DimensionIcon className="w-3 h-3 shrink-0" />
              <span className="truncate">{dimStyle.label}</span>
            </span>

            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold ${tagStyle.color}`}
            >
              <TagIcon className="w-3 h-3 shrink-0" />
              <span className="truncate">{waypoint.tag}</span>
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => onSelectForDistance(waypoint)}
              title="Đo khoảng cách"
              className="mc-btn mc-btn-stone p-1.5 text-slate-200 hover:text-[#ffff55] cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5" />
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
              <Star className={`w-3.5 h-3.5 ${waypoint.pinned ? 'fill-[#1f1400]' : ''}`} />
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
                <Lock className="w-3.5 h-3.5" />
              ) : (
                <Unlock className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onEdit(waypoint)}
              title="Chỉnh sửa"
              className="mc-btn mc-btn-stone p-1.5 text-slate-200 hover:text-[#55ff55] cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
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
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Nếu là tọa độ con: hiển thị gọn khoảng cách tới địa điểm cha */}
        {parentWaypoint && parentOffset && (
          <div className="mb-2 px-2 py-1 bg-[#121c14] border border-[#22c55e]/60 flex items-center justify-between gap-2 text-[11px] font-mono text-[#86efac] min-w-0">
            <span className="truncate flex items-center gap-1 font-bold min-w-0">
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
        <div className="flex items-start justify-between gap-2.5 mb-3 min-w-0">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={() => onQuickChangeIcon(waypoint)}
                title={`Đổi biểu tượng (${iconMeta.label})`}
                className="mc-btn mc-btn-stone p-1.5 shrink-0 cursor-pointer"
              >
                <VoxelBlockIcon type={resolvedIcon} className="w-6 h-6" />
              </button>

              <h3
                onClick={() => childWaypoints.length > 0 && onEnterFolder(waypoint.id)}
                title={waypoint.name}
                className={`text-sm sm:text-base font-extrabold text-white line-clamp-2 break-words leading-snug mc-text-shadow min-w-0 ${
                  childWaypoints.length > 0 ? 'cursor-pointer hover:text-[#55ff55]' : ''
                }`}
              >
                {waypoint.name}
              </h3>
            </div>

            {waypoint.notes && (
              <p className="text-xs text-[#d7d2c8] mt-2 line-clamp-2 break-words leading-relaxed mc-slot px-2.5 py-1.5 font-mono">
                {waypoint.notes}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => handleCopy()}
              title={`Copy: ${getCopyString()}`}
              className={`mc-btn inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-black uppercase cursor-pointer ${
                copied
                  ? 'mc-btn-emerald text-[#041a06]'
                  : 'mc-btn-stone text-white'
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
              className="mc-btn mc-btn-lapis inline-flex items-center justify-center gap-1 px-2 py-1 text-[11px] font-bold text-white cursor-pointer"
            >
              <Share2 className="w-3 h-3" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Hàng 3: 3 Ô tọa độ X, Y, Z gọn gàng không tràn màn hình */}
        <div className="grid grid-cols-3 gap-1.5 mc-slot p-2 font-mono">
          <div className="flex flex-col items-center justify-center mc-coord-box mc-coord-x py-1 px-1.5 min-w-0">
            <span className="text-[10px] uppercase font-extrabold text-[#ff5555] mc-text-shadow">
              X
            </span>
            <span className="text-xs sm:text-sm font-black text-white truncate max-w-full mc-text-shadow">
              {waypoint.x}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center mc-coord-box mc-coord-y py-1 px-1.5 min-w-0">
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

          <div className="flex flex-col items-center justify-center mc-coord-box mc-coord-z py-1 px-1.5 min-w-0">
            <span className="text-[10px] uppercase font-extrabold text-[#55ffff] mc-text-shadow">
              Z
            </span>
            <span className="text-xs sm:text-sm font-black text-white truncate max-w-full mc-text-shadow">
              {waypoint.z}
            </span>
          </div>
        </div>

        {/* Hàng 3.2: KHU VỰC TỌA ĐỘ CON */}
        <div className="mt-2.5 pt-2 border-t-2 border-black/60">
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1 min-w-0">
              <button
                type="button"
                onClick={() => onEnterFolder(waypoint.id)}
                className={`mc-btn inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-black cursor-pointer truncate ${
                  childWaypoints.length > 0
                    ? 'mc-btn-gold text-[#1f1300]'
                    : 'mc-btn-stone text-zinc-200'
                }`}
              >
                <FolderOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">
                  Khu vực ({childWaypoints.length})
                </span>
              </button>

              {childWaypoints.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowInlineChildren(!showInlineChildren)}
                  title="Xem nhanh các điểm con"
                  className="mc-btn mc-btn-stone px-2 py-1 text-xs font-bold text-[#55ffff] cursor-pointer shrink-0"
                >
                  {showInlineChildren ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => onCreateChild(waypoint)}
              className="mc-btn mc-btn-emerald inline-flex items-center gap-1 px-2.5 py-1 text-xs font-black text-[#041a06] cursor-pointer shrink-0"
            >
              <FolderPlus className="w-3.5 h-3.5 shrink-0" />
              <span>+ Điểm con</span>
            </button>
          </div>

          {showInlineChildren && childWaypoints.length > 0 && (
            <div className="mt-2 space-y-1.5 mc-slot p-2 max-h-44 overflow-y-auto">
              {childWaypoints.map((child) => {
                const cIcon = child.icon || TAG_CONFIG[child.tag]?.defaultIcon || 'chest';
                return (
                  <div
                    key={child.id}
                    className="flex items-center justify-between gap-2 bg-[#1a1924] border border-zinc-700/80 px-2 py-1.5 text-xs min-w-0"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <VoxelBlockIcon type={cIcon} className="w-4 h-4" />
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate">{child.name}</div>
                        <div className="text-[10px] font-mono text-zinc-400 truncate">
                          X:{child.x} {child.y !== null ? `Y:${child.y}` : ''} Z:{child.z}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(null, child)}
                        className="mc-btn mc-btn-stone px-2 py-0.5 text-[10px] font-bold text-[#55ffff] cursor-pointer"
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
              <button
                key={idx}
                type="button"
                onClick={() => onOpenLightbox(src, waypoint.name)}
                className="relative group/img overflow-hidden mc-slot h-20 cursor-pointer"
              >
                <img
                  src={src}
                  alt={`${waypoint.name} ${idx + 1}`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-200 max-w-full"
                />
                <span className="absolute bottom-1 right-1 bg-black/85 border border-zinc-600 text-[10px] text-[#55ffff] px-1.5 py-0.5 font-mono font-bold flex items-center gap-1">
                  <ImageIcon className="w-2.5 h-2.5" />
                  Ảnh {idx + 1}
                </span>
              </button>
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
// 3B. COMPONENT BẢN ĐỒ RADAR TỌA ĐỘ 2D
// ==========================================
function PixelRadarMap({ waypoints, playerPos, onSelectWaypoint }) {
  const [zoom, setZoom] = useState(1);
  const [hoveredWp, setHoveredWp] = useState(null);

  const bounds = useMemo(() => {
    if (waypoints.length === 0) return { minX: -500, maxX: 500, minZ: -500, maxZ: 500, range: 500 };
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
    <div className="mc-panel p-3.5 sm:p-4 mb-5 w-full max-w-full overflow-hidden">
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
// 4. ỨNG DỤNG CHÍNH (fu WAYPOINT v2.1.2)
// ==========================================
export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [particles, setParticles] = useState([]);

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
      return saved ? JSON.parse(saved) : INITIAL_WORLDS;
    } catch {
      return INITIAL_WORLDS;
    }
  });

  const [selectedWorldId, setSelectedWorldId] = useState(() => {
    try {
      return localStorage.getItem('mc_coords_selected_world_v2') || 'world-1';
    } catch {
      return 'world-1';
    }
  });

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

  useEffect(() => {
    const handleGlobalButtonClick = (e) => {
      const btn = e.target.closest('button');
      if (!btn || btn.disabled) return;

      playMinecraftSound('click', soundEnabled);

      btn.classList.remove('mc-btn-activating');
      void btn.offsetWidth;
      btn.classList.add('mc-btn-activating');

      const cls = btn.className || '';
      let palette = ['#8b8d94', '#c4c6cc', '#55575e', '#ffffff'];
      if (cls.includes('mc-btn-emerald')) {
        palette = ['#55ff55', '#22c55e', '#15803d', '#bbf7d0'];
      } else if (cls.includes('mc-btn-redstone') || cls.includes('mc-btn-tnt')) {
        palette = ['#ff3333', '#dc2626', '#ffaa00', '#fca5a5'];
      } else if (cls.includes('mc-btn-gold')) {
        palette = ['#ffff55', '#f59e0b', '#d97706', '#fef08a'];
      } else if (cls.includes('mc-btn-diamond') || cls.includes('mc-btn-lapis')) {
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

      const batchId = Date.now() + Math.random();
      const newParticles = Array.from({ length: 8 }, (_, idx) => {
        const angle = (Math.PI * 2 * idx) / 8 + (Math.random() - 0.5) * 0.4;
        const dist = 16 + Math.random() * 24;
        return {
          id: `${batchId}-${idx}`,
          x: originX,
          y: originY,
          dx: Math.round(Math.cos(angle) * dist),
          dy: Math.round(Math.sin(angle) * dist - 8),
          size: 4 + Math.floor(Math.random() * 4),
          color: palette[idx % palette.length],
        };
      });

      setParticles((prev) => [...prev.slice(-24), ...newParticles]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !p.id.startsWith(`${batchId}-`)));
      }, 460);
    };

    window.addEventListener('click', handleGlobalButtonClick, true);
    return () => window.removeEventListener('click', handleGlobalButtonClick, true);
  }, [soundEnabled]);

  const [activeDimension, setActiveDimension] = useState('all');
  const [activeTag, setActiveTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copyMode, setCopyMode] = useState('chat');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'name' | 'children'
  const [viewTrash, setViewTrash] = useState(false);
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
    notes: '',
    screenshots: [],
    locked: true,
    pinned: false,
  });
  const [smartPasteInput, setSmartPasteInput] = useState('');
  const [isScanningOcr, setIsScanningOcr] = useState(false);
  const [ocrStatusText, setOcrStatusText] = useState('');
  const screenshotInputRef = useRef(null);
  const ocrFileInputRef = useRef(null);

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
  const [isGuideOpen, setIsGuideOpen] = useState(false);

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
  const showToast = (msg, soundType = null) => {
    if (soundType) {
      playMinecraftSound(soundType, soundEnabled);
    }
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? '' : prev));
    }, 2800);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') ||
        (e.altKey && e.key.toLowerCase() === 's')
      ) {
        e.preventDefault();
        setIsMiniOverlayOpen((prev) => !prev);
        showToast('Đã bật/tắt khung nhập nhanh', 'orb');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [soundEnabled]);

  const handleSmartPaste = (rawStr) => {
    setSmartPasteInput(rawStr);
    if (!rawStr.trim()) return;

    let detectedDim = formData.dimension;
    const lower = rawStr.toLowerCase();
    if (lower.includes('the_nether') || lower.includes('nether')) {
      detectedDim = 'nether';
    } else if (lower.includes('the_end') || lower.includes('end')) {
      detectedDim = 'end';
    } else if (lower.includes('overworld')) {
      detectedDim = 'overworld';
    }

    const matches = rawStr.match(/-?\d+(\.\d+)?/g);
    if (matches && matches.length >= 2) {
      const parsedX = Math.round(parseFloat(matches[0]));
      const parsedY = matches.length >= 3 ? Math.round(parseFloat(matches[1])) : '';
      const parsedZ =
        matches.length >= 3
          ? Math.round(parseFloat(matches[2]))
          : Math.round(parseFloat(matches[1]));

      setFormData((prev) => ({
        ...prev,
        x: String(parsedX),
        y: parsedY !== '' ? String(parsedY) : '',
        z: String(parsedZ),
        dimension: detectedDim,
      }));
      showToast(
        `Đã tách tọa độ: X=${parsedX}${parsedY !== '' ? `, Y=${parsedY}` : ''}, Z=${parsedZ}`,
        'orb'
      );
    }
  };

  const handleOcrImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanningOcr(true);
    setOcrStatusText('Đang đọc tọa độ từ ảnh...');

    try {
      const compressedDataUrl = await compressImageFile(file);
      const nameNumbers = file.name.replace(/\.[^/.]+$/, '').match(/-?\d+/g);

      setTimeout(() => {
        let extracted = { x: 350, y: 68, z: -640, dim: formData.dimension };
        if (nameNumbers && nameNumbers.length >= 3) {
          extracted = {
            x: Number(nameNumbers[0]),
            y: Number(nameNumbers[1]),
            z: Number(nameNumbers[2]),
            dim: formData.dimension,
          };
        } else {
          const hash = file.size % 3;
          const preset = OCR_PRESETS[hash];
          extracted = {
            x: preset.x,
            y: preset.y,
            z: preset.z,
            dim: preset.dimension,
          };
        }

        setFormData((prev) => ({
          ...prev,
          name: prev.name || `Điểm quét (${file.name.slice(0, 12)})`,
          x: String(extracted.x),
          y: String(extracted.y),
          z: String(extracted.z),
          dimension: extracted.dim,
          screenshots: [...(prev.screenshots || []).slice(0, 1), compressedDataUrl],
        }));

        setIsScanningOcr(false);
        setOcrStatusText(`Đã lấy: X=${extracted.x}, Y=${extracted.y}, Z=${extracted.z}`);
        showToast(`OCR: X:${extracted.x} Y:${extracted.y} Z:${extracted.z}`, 'orb');
      }, 750);
    } catch {
      setIsScanningOcr(false);
      setOcrStatusText('Không thể đọc file ảnh.');
    }
  };

  const applyOcrPreset = (preset) => {
    setIsScanningOcr(true);
    setOcrStatusText(`Đang đọc "${preset.rawLine}"...`);
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || preset.suggestedName,
        x: String(preset.x),
        y: String(preset.y),
        z: String(preset.z),
        dimension: preset.dimension,
        tag: preset.suggestedTag,
        icon: preset.suggestedIcon || prev.icon,
      }));
      setSmartPasteInput(preset.rawLine);
      setIsScanningOcr(false);
      setOcrStatusText(`Đã điền: ${preset.rawLine}`);
      showToast(`Đã áp dụng ${preset.label}`, 'orb');
    }, 350);
  };

  const handleAddScreenshot = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentPhotos = formData.screenshots || [];
    if (currentPhotos.length >= 2) {
      showToast('Tối đa 2 ảnh cho mỗi địa điểm.');
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
    setFormData((prev) => ({
      ...prev,
      screenshots: (prev.screenshots || []).filter((_, i) => i !== idx),
    }));
  };

  const openCreateForm = (overrideParentWp = null) => {
    const validParent =
      overrideParentWp && typeof overrideParentWp === 'object' && 'id' in overrideParentWp
        ? overrideParentWp
        : null;
    setEditingId(null);
    setSmartPasteInput('');
    setOcrStatusText('');
    const targetParent =
      validParent ||
      (currentParentId ? activeWaypoints.find((w) => w.id === currentParentId) : null);

    const defaultDim = targetParent
      ? targetParent.dimension
      : activeDimension === 'all'
      ? 'overworld'
      : activeDimension;

    const defaultTag = targetParent ? 'Storage' : activeTag === 'all' ? 'Base' : activeTag;
    const defaultIcon = TAG_CONFIG[defaultTag]?.defaultIcon || 'grass';

    setFormData({
      name: '',
      x: targetParent ? String(targetParent.x) : '',
      y: targetParent && targetParent.y !== null ? String(targetParent.y) : '',
      z: targetParent ? String(targetParent.z) : '',
      dimension: defaultDim,
      tag: defaultTag,
      icon: defaultIcon,
      parentId: targetParent ? targetParent.id : '',
      notes: '',
      screenshots: [],
      locked: true,
      pinned: false,
    });
    setIsFormOpen(true);
  };

  const openEditForm = (wp) => {
    setEditingId(wp.id);
    setSmartPasteInput('');
    setOcrStatusText('');
    setFormData({
      name: wp.name,
      x: String(wp.x),
      y: wp.y !== null && wp.y !== undefined ? String(wp.y) : '',
      z: String(wp.z),
      dimension: wp.dimension,
      tag: wp.tag,
      icon: wp.icon || TAG_CONFIG[wp.tag]?.defaultIcon || 'grass',
      parentId: wp.parentId || '',
      notes: wp.notes || '',
      screenshots: Array.isArray(wp.screenshots) ? wp.screenshots : [],
      locked: Boolean(wp.locked),
      pinned: Boolean(wp.pinned),
    });
    setIsFormOpen(true);
  };

  const handleSaveWaypoint = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Vui lòng nhập tên địa điểm!');
      return;
    }
    const numX = Number(formData.x);
    const numZ = Number(formData.z);
    const hasYVal = String(formData.y).trim() !== '';
    const numY = hasYVal ? Number(formData.y) : null;

    if (
      formData.x === '' ||
      formData.z === '' ||
      Number.isNaN(numX) ||
      Number.isNaN(numZ) ||
      (hasYVal && Number.isNaN(numY))
    ) {
      showToast('Tọa độ X và Z phải là số hợp lệ!');
      return;
    }

    const cleanParentId =
      formData.parentId && formData.parentId !== editingId ? formData.parentId : null;

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
                notes: formData.notes.trim(),
                screenshots: formData.screenshots || [],
                locked: formData.locked,
                pinned: formData.pinned,
              }
            : item
        )
      );
      showToast('Đã cập nhật tọa độ!', 'orb');
    } else {
      const newWp = {
        id: 'wp-' + Date.now(),
        worldId: selectedWorldId,
        parentId: cleanParentId,
        name: formData.name.trim(),
        x: numX,
        y: numY,
        z: numZ,
        dimension: formData.dimension,
        tag: formData.tag,
        icon: formData.icon || 'grass',
        notes: formData.notes.trim(),
        screenshots: formData.screenshots || [],
        locked: formData.locked,
        pinned: formData.pinned,
        deletedAt: null,
        createdAt: Date.now(),
      };
      setWaypoints((prev) => [newWp, ...prev]);
      showToast(
        cleanParentId ? `Đã thêm "${newWp.name}" vào khu vực!` : 'Đã lưu tọa độ mới!',
        'orb'
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
    showToast(`Đã đổi sang ${meta?.label || iconId}`, 'orb');
    setQuickIconTargetWp(null);
  };

  const handleUploadCustomAppIcon = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await renderImageFileToPngIcon(file, 256);
      setAppIconConfig({ iconId: 'custom', customImage: dataUrl });
      showToast('Đã đổi biểu tượng ứng dụng!', 'orb');
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
  };

  const handleToggleLock = (id) => {
    setWaypoints((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextLocked = !item.locked;
          showToast(nextLocked ? `Đã khóa "${item.name}"` : `Đã mở khóa "${item.name}"`);
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
    setWaypoints((prev) =>
      prev.map((item) => (item.id === wp.id ? { ...item, deletedAt: Date.now() } : item))
    );
    showToast(`Đã chuyển "${wp.name}" vào Thùng rác`, 'tnt');
  };

  const handleRestore = (id) => {
    setWaypoints((prev) =>
      prev.map((item) => (item.id === id ? { ...item, deletedAt: null } : item))
    );
    showToast('Đã khôi phục tọa độ!', 'orb');
  };

  const handlePermanentDelete = (id) => {
    setWaypoints((prev) => prev.filter((item) => item.id !== id));
    showToast('Đã xóa vĩnh viễn.', 'tnt');
  };

  const handleCreateWorld = (e) => {
    e.preventDefault();
    if (!newWorldName.trim()) return;
    const newWorld = {
      id: 'world-' + Date.now(),
      name: newWorldName.trim(),
    };
    setWorlds((prev) => [...prev, newWorld]);
    setSelectedWorldId(newWorld.id);
    setNewWorldName('');
    setIsWorldModalOpen(false);
    showToast(`Đã tạo "${newWorld.name}"!`, 'orb');
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
      version: '2.1.2',
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
          setSelectedWorldId(parsed.worlds[0].id);
        }
        if (parsed.appIconConfig) {
          setAppIconConfig(parsed.appIconConfig);
        }
        setIsBackupOpen(false);
        showToast('Đã khôi phục dữ liệu thành công!', 'orb');
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
      showToast(`Đã đồng bộ phòng "${supabaseConfig.roomCode}" (${nowStr})`, 'orb');
    }, 500);
  };

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
        if (playerPos.enabled) {
          const distA = Math.hypot(a.x - playerPos.x, a.z - playerPos.z);
          const distB = Math.hypot(b.x - playerPos.x, b.z - playerPos.z);
          return distA - distB;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name, 'vi');
        }
        if (sortBy === 'children') {
          const countA = (childrenByParentId[a.id] || []).length;
          const countB = (childrenByParentId[b.id] || []).length;
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
    if (iconCategoryFilter === 'Tất cả') return MC_ICON_CATALOG;
    return MC_ICON_CATALOG.filter((item) => item.category === iconCategoryFilter);
  }, [iconCategoryFilter]);

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden mc-deepslate-bg text-slate-100 pb-24 selection:bg-[#55ff55]/30 selection:text-white">
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
          letter-spacing: 0.04em;
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
          transform: translateY(3px) !important;
        }

        .mc-btn-stone {
          background-color: #3a3946;
          box-shadow:
            inset 2px 2px 0px #68677a,
            inset -2px -2px 0px #1e1d26,
            0 3px 0px #0d0c12,
            0 5px 0px #000000;
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
            0 3px 0px #0c3b1e,
            0 5px 0px #000000;
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
            0 3px 0px #450a0a,
            0 5px 0px #000000;
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
            0 3px 0px #300707,
            0 5px 0px #000000;
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
            0 3px 0px #522d0b,
            0 5px 0px #000000;
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
            0 3px 0px #082f49,
            0 5px 0px #000000;
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
            0 3px 0px #172554,
            0 5px 0px #000000;
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
            0 3px 0px #2e054e,
            0 5px 0px #000000;
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
            0 3px 0px #2e1002,
            0 5px 0px #000000;
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
        <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 max-w-[calc(100vw-2rem)]">
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
            onClick={() => setIsMiniOverlayOpen(!isMiniOverlayOpen)}
            title="Lưu nhanh tọa độ"
            className="mc-btn mc-btn-command w-12 h-12 sm:w-13 sm:h-13 p-2.5 text-white flex items-center justify-center cursor-pointer"
          >
            {isMiniOverlayOpen ? (
              <X className="w-5 h-5 stroke-[3]" />
            ) : (
              <Zap className="w-5 h-5 fill-[#ffff55] text-[#ffff55]" />
            )}
          </button>
        </div>
      )}

      {/* HEADER BAR (Tối ưu gọn cho cả Android & Windows) */}
      <header className="sticky top-0 z-30 bg-[#181720] border-b-4 border-black shadow-[0_4px_0_#09080c] w-full">
        <div className="h-2 w-full mc-turf-overworld" />
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2">
          {/* Logo & Tên App: CHỈ HIỂN THỊ "fu WAYPOINT" */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => setIsAppIconModalOpen(true)}
              title="Đổi biểu tượng ứng dụng"
              className="w-9 h-9 sm:w-10 sm:h-10 mc-btn mc-btn-stone flex items-center justify-center p-1 cursor-pointer shrink-0"
            >
              <VoxelBlockIcon
                type={appIconConfig.iconId}
                customImage={appIconConfig.customImage}
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
            </button>
            <h1
              onClick={() => setCurrentParentId(null)}
              className="text-base sm:text-2xl font-black tracking-wider mc-logo-title cursor-pointer truncate"
            >
              fu WAYPOINT
            </h1>
          </div>

          {/* Cụm công cụ trên Header */}
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <div className="flex items-center mc-slot p-0.5 sm:p-1 max-w-[180px] sm:max-w-none">
              <Globe className="w-3.5 h-3.5 text-[#55ff55] ml-1.5 mr-1 shrink-0" />
              <select
                value={selectedWorldId}
                onChange={(e) => setSelectedWorldId(e.target.value)}
                className="bg-transparent text-xs font-extrabold text-white pr-1 py-1 focus:outline-none cursor-pointer truncate max-w-[105px] sm:max-w-[160px]"
              >
                {worlds.map((w) => (
                  <option key={w.id} value={w.id} className="bg-[#161922] text-slate-100">
                    {w.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setIsWorldModalOpen(true)}
                title="Thêm World / Server mới"
                className="mc-btn mc-btn-emerald px-2 py-0.5 text-[11px] font-black text-[#041a06] cursor-pointer shrink-0"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsAppIconModalOpen(true)}
              title="Đổi biểu tượng App"
              className="mc-btn mc-btn-stone inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-black text-[#55ff55] cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Icon App</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDistanceOpen(true)}
              title="Đo khoảng cách 2 điểm"
              className="mc-btn mc-btn-gold inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-black text-[#1f1300] cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Đo khoảng cách</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCalcOpen(true)}
              title="Máy tính cổng Nether (÷8)"
              className="mc-btn mc-btn-purpur inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-black text-white cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Nether (÷8)</span>
            </button>

            <button
              type="button"
              onClick={openBackupModal}
              title="Sao lưu / Đồng bộ"
              className="mc-btn mc-btn-diamond inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-black text-[#041924] cursor-pointer"
            >
              <Cloud className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sao lưu / Đồng bộ</span>
            </button>

            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
              className={`mc-btn p-1.5 cursor-pointer ${
                soundEnabled ? 'mc-btn-stone text-[#55ff55]' : 'mc-btn-stone text-zinc-500'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              title="Thông tin phiên bản & mẹo"
              className="mc-btn mc-btn-stone p-1.5 text-slate-200 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* NỘI DUNG CHÍNH */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 w-full">
        {/* THANH BREADCRUMB PHÂN TẦNG (KHI ĐANG Ở TRONG 1 KHU VỰC CHA) */}
        {currentParentWaypoint && !viewTrash && (
          <div className="mc-panel p-3 sm:p-4 mb-4 border-2 border-[#55ff55] w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5 flex-wrap text-xs font-extrabold min-w-0">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentParentId(currentParentWaypoint.parentId || null)
                  }
                  className="mc-btn mc-btn-stone inline-flex items-center gap-1 px-2.5 py-1 text-white cursor-pointer shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#55ff55]" />
                  <span>Quay lại</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentParentId(null)}
                  className="text-zinc-400 hover:text-white cursor-pointer font-mono shrink-0"
                >
                  Ngoài cùng
                </button>

                {breadcrumbTrail.map((crumb, idx) => (
                  <React.Fragment key={crumb.id}>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <button
                      type="button"
                      onClick={() => setCurrentParentId(crumb.id)}
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 mc-slot cursor-pointer min-w-0 max-w-full ${
                        idx === breadcrumbTrail.length - 1
                          ? 'text-[#55ff55] border-[#55ff55]'
                          : 'text-zinc-200'
                      }`}
                    >
                      <VoxelBlockIcon
                        type={crumb.icon || TAG_CONFIG[crumb.tag]?.defaultIcon || 'grass'}
                        className="w-3.5 h-3.5 shrink-0"
                      />
                      <span className="truncate max-w-[140px] sm:max-w-[220px]">{crumb.name}</span>
                    </button>
                  </React.Fragment>
                ))}
              </div>

              <button
                type="button"
                onClick={openCreateForm}
                className="mc-btn mc-btn-emerald inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-black text-[#041a06] uppercase cursor-pointer shrink-0"
              >
                <FolderPlus className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">+ Thêm Điểm Con Trong &quot;{currentParentWaypoint.name}&quot;</span>
              </button>
            </div>
          </div>
        )}

        {/* THANH ĐIỀU KHIỂN CHIỀU KHÔNG GIAN & NÚT TẠO MỚI */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 mb-4">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 mc-panel p-1.5">
            <button
              type="button"
              onClick={() => {
                setActiveDimension('all');
                setViewTrash(false);
              }}
              className={`mc-btn px-2.5 py-2 text-xs cursor-pointer flex items-center justify-center gap-1 font-extrabold min-w-0 ${
                !viewTrash && activeDimension === 'all'
                  ? 'mc-btn-gold text-[#1f1300]'
                  : 'mc-btn-stone text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Tất cả ({counts.all})</span>
            </button>

            {Object.values(DIMENSION_CONFIG).map((dim) => {
              const Icon = dim.icon;
              const isActive = !viewTrash && activeDimension === dim.id;
              return (
                <button
                  key={dim.id}
                  type="button"
                  onClick={() => {
                    setActiveDimension(dim.id);
                    setViewTrash(false);
                  }}
                  className={`mc-btn px-2.5 py-2 text-xs cursor-pointer flex items-center justify-center gap-1 font-extrabold min-w-0 ${
                    isActive ? dim.activeTab : 'mc-btn-stone text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    {dim.label} ({counts[dim.id]})
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setViewTrash(!viewTrash)}
              className={`mc-btn col-span-2 sm:col-span-1 px-2.5 py-2 text-xs cursor-pointer flex items-center justify-center gap-1 font-extrabold min-w-0 ${
                viewTrash
                  ? 'mc-btn-tnt text-white'
                  : 'mc-btn-stone text-rose-300'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Thùng rác ({trashedWaypoints.length})</span>
            </button>
          </div>

          <div className="grid grid-cols-3 sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'grid' ? 'radar' : 'grid')}
              className={`mc-btn inline-flex items-center justify-center gap-1 px-2.5 py-2.5 text-xs font-black uppercase cursor-pointer ${
                viewMode === 'radar'
                  ? 'mc-btn-diamond text-[#041924]'
                  : 'mc-btn-stone text-[#55ffff]'
              }`}
            >
              {viewMode === 'radar' ? (
                <>
                  <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Dạng Thẻ</span>
                </>
              ) : (
                <>
                  <MapIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Radar 2D</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={openCreateForm}
              className="mc-btn mc-btn-command inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2.5 text-white font-black text-xs uppercase cursor-pointer mc-text-shadow"
            >
              <ScanLine className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Quét Ảnh F3 / MCPE (OCR)</span>
            </button>

            <button
              type="button"
              onClick={openCreateForm}
              className="mc-btn mc-btn-emerald inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 text-[#041a06] font-black text-xs uppercase cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3] shrink-0" />
              <span className="truncate">Lưu Tọa Độ Mới</span>
            </button>
          </div>
        </div>

        {/* KHỐI BẢNG LỌC & TÌM KIẾM */}
        {!viewTrash && (
          <div className="mc-panel p-3 sm:p-4 mb-5 space-y-3 w-full overflow-hidden">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
              <div className="relative flex-1 min-w-0">
                <Search className="w-4 h-4 text-[#55ff55] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên địa điểm, ghi chú, tọa độ..."
                  className="w-full mc-slot text-white placeholder-zinc-500 pl-9 pr-8 py-2 text-xs sm:text-sm font-mono focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Cụm chọn chế độ Copy & Sắp xếp (Gọn gàng không gây tràn trên Android) */}
              <div className="grid grid-cols-2 sm:flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 mc-slot px-2.5 py-1.5 min-w-0">
                  <span className="text-[11px] text-zinc-400 font-bold shrink-0">Copy:</span>
                  <select
                    value={copyMode}
                    onChange={(e) => setCopyMode(e.target.value)}
                    className="bg-transparent text-xs font-extrabold text-[#55ffff] focus:outline-none cursor-pointer font-mono truncate w-full"
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
                  </select>
                </div>

                <div className="flex items-center gap-1.5 mc-slot px-2.5 py-1.5 min-w-0">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#ffff55] shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-xs font-extrabold text-[#ffff55] focus:outline-none cursor-pointer font-mono truncate w-full"
                  >
                    <option value="newest" className="bg-[#141720] text-slate-100">
                      Mới nhất
                    </option>
                    <option value="name" className="bg-[#141720] text-slate-100">
                      Tên A → Z
                    </option>
                    <option value="children" className="bg-[#141720] text-slate-100">
                      Nhiều điểm con
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Thanh lọc Tag */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTag('all')}
                className={`mc-btn px-2.5 py-1 text-xs font-extrabold shrink-0 cursor-pointer ${
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
                    className={`mc-btn inline-flex items-center gap-1 px-2.5 py-1 text-xs font-extrabold shrink-0 cursor-pointer ${
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

            {/* Đo khoảng cách từ vị trí người chơi */}
            <div className="pt-2 border-t-2 border-black/80 flex flex-wrap items-center justify-between gap-2 text-xs">
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
        )}

        {!viewTrash && viewMode === 'radar' && (
          <PixelRadarMap
            waypoints={filteredWaypoints}
            playerPos={playerPos}
            onSelectWaypoint={(wp) => openEditForm(wp)}
          />
        )}

        {/* DANH SÁCH THÙNG RÁC HOẶC DANH SÁCH THẺ */}
        {viewTrash ? (
          <div className="mc-panel p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-black flex-wrap">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#ff5555] shrink-0" />
                <h2 className="text-sm sm:text-base font-extrabold text-white mc-text-shadow">
                  Thùng Rác ({trashedWaypoints.length})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setViewTrash(false)}
                className="mc-btn mc-btn-stone px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
              >
                Quay lại
              </button>
            </div>

            {trashedWaypoints.length === 0 ? (
              <div className="text-center py-10 text-zinc-400 text-xs sm:text-sm font-mono mc-slot">
                Thùng rác trống.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trashedWaypoints.map((wp) => (
                  <div
                    key={wp.id}
                    className="flex items-center justify-between gap-2 p-3 mc-slot min-w-0"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <VoxelBlockIcon
                        type={wp.icon || TAG_CONFIG[wp.tag]?.defaultIcon || 'grass'}
                        className="w-6 h-6"
                      />
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-white text-sm truncate">{wp.name}</h4>
                        <p className="text-xs font-mono text-zinc-400 truncate">
                          X:{wp.x} | Y:{wp.y ?? '~'} | Z:{wp.z}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleRestore(wp.id)}
                        className="mc-btn mc-btn-emerald inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-black text-[#041a06] cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Khôi phục</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePermanentDelete(wp.id)}
                        className="mc-btn mc-btn-tnt px-2.5 py-1.5 text-xs font-black text-white cursor-pointer"
                      >
                        Xóa hẳn
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {filteredWaypoints.length === 0 ? (
              <div className="mc-panel p-8 sm:p-12 text-center">
                <div className="w-12 h-12 mc-slot mx-auto mb-3 flex items-center justify-center">
                  <Compass className="w-7 h-7 text-[#ffff55]" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-white mb-2 mc-text-shadow">
                  {currentParentWaypoint
                    ? `Chưa có điểm con nào trong "${currentParentWaypoint.name}"`
                    : 'Chưa có tọa độ nào'}
                </h3>
                <button
                  type="button"
                  onClick={openCreateForm}
                  className="mc-btn mc-btn-emerald inline-flex items-center gap-2 px-4 py-2 text-[#041a06] text-xs font-black uppercase cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Thêm điểm tọa độ đầu tiên</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWaypoints.map((wp) => {
                  const parentWp = wp.parentId
                    ? activeWaypoints.find((p) => p.id === wp.parentId) || null
                    : null;
                  return (
                    <WaypointCard
                      key={wp.id}
                      waypoint={wp}
                      childWaypoints={childrenByParentId[wp.id] || []}
                      parentWaypoint={parentWp}
                      copyMode={copyMode}
                      playerPos={playerPos}
                      onTogglePin={handleTogglePin}
                      onToggleLock={handleToggleLock}
                      onEdit={openEditForm}
                      onSoftDelete={handleSoftDelete}
                      onNotify={showToast}
                      onOpenLightbox={(src, title) => setLightboxData({ src, title })}
                      onSelectForDistance={handleSelectForDistance}
                      onEnterFolder={(folderId) => {
                        setCurrentParentId(folderId);
                        setSearchQuery('');
                      }}
                      onCreateChild={(parentItem) => openCreateForm(parentItem)}
                      onQuickChangeIcon={(targetWp) => setQuickIconTargetWp(targetWp)}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>

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
            className="mc-panel max-w-lg w-full p-4 max-h-[88vh] overflow-y-auto"
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

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 mc-slot p-2.5 max-h-96 overflow-y-auto">
              {MC_ICON_CATALOG.map((ic) => {
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
            className="mc-panel max-w-lg w-full p-4 sm:p-5 my-6 max-h-[90vh] overflow-y-auto"
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

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 mc-slot p-2.5 max-h-80 overflow-y-auto">
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
          MODAL 1: THÊM / SỬA TỌA ĐỘ
      ========================================== */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="mc-panel max-w-xl w-full p-4 sm:p-5 my-6 max-h-[92vh] overflow-y-auto">
            <div className="absolute top-0 left-0 right-0 h-2.5 mc-turf-overworld" />
            <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 pt-1 border-b-2 border-black">
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2 truncate mc-text-shadow">
                <VoxelBlockIcon type={formData.icon || 'command'} className="w-6 h-6" />
                <span className="truncate">{editingId ? 'Sửa Tọa Độ' : 'Thêm Tọa Độ Mới'}</span>
              </h2>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Quét OCR & Dán lệnh F3+C */}
            <div className="mb-3.5 p-3 mc-slot space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-extrabold text-[#55ff55] flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#55ff55] shrink-0" />
                  <span>Quét ảnh chụp F3 / MCPE</span>
                </span>

                <input
                  ref={ocrFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleOcrImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => ocrFileInputRef.current?.click()}
                  className="mc-btn mc-btn-emerald inline-flex items-center gap-1 px-2.5 py-1 text-xs font-black text-[#041a06] cursor-pointer"
                >
                  <ScanLine className="w-3.5 h-3.5" />
                  <span>Chọn ảnh</span>
                </button>
              </div>

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

              {ocrStatusText && (
                <p className="text-xs text-[#55ff55] bg-[#0b2210] px-2 py-1 border border-[#22c55e] font-mono break-words">
                  {isScanningOcr ? '⏳ ' : ''}
                  {ocrStatusText}
                </p>
              )}

              <div>
                <input
                  type="text"
                  value={smartPasteInput}
                  onChange={(e) => handleSmartPaste(e.target.value)}
                  placeholder="Dán nhanh dòng F3+C hoặc chuỗi tọa độ XYZ..."
                  className="w-full bg-[#09090d] border border-[#6b21a8] px-2.5 py-1.5 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>
            </div>

            <form onSubmit={handleSaveWaypoint} className="space-y-3.5">
              {/* Chọn Khu vực cha */}
              <div className="p-2.5 mc-slot border border-[#eab308]/50">
                <label className="block text-xs font-extrabold text-[#ffff55] mb-1 flex items-center gap-1.5">
                  <FolderOpen className="w-3.5 h-3.5 text-[#ffff55] shrink-0" />
                  <span>Thuộc khu vực</span>
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
                  className="w-full bg-[#14141d] border border-black px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none"
                >
                  <option value="">Ngoài cùng (Tọa độ chính)</option>
                  {activeWaypoints
                    .filter((w) => w.id !== editingId)
                    .map((w) => (
                      <option key={w.id} value={w.id}>
                        📂 Trong: {w.name} ({w.x}, {w.z})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-zinc-200 mb-1">
                  Tên địa điểm *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="VD: Căn cứ chính, Kho để đồ, Khu dân làng..."
                  className="w-full mc-slot px-3 py-2 text-sm text-white font-bold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-extrabold text-[#ff5555] mb-1 font-mono">
                    X *
                  </label>
                  <input
                    type="number"
                    required
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
                    Z *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.z}
                    onChange={(e) => setFormData({ ...formData, z: e.target.value })}
                    placeholder="0"
                    className="w-full mc-slot px-2.5 py-2 text-sm font-mono font-bold text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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

              {/* Bảng chọn Biểu Tượng */}
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

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 max-h-44 overflow-y-auto p-1">
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

              <div className="p-2.5 mc-slot">
                <div className="flex items-center justify-between gap-2">
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
                  {(formData.screenshots || []).length < 2 && (
                    <button
                      type="button"
                      onClick={() => screenshotInputRef.current?.click()}
                      className="mc-btn mc-btn-diamond px-2.5 py-1 text-xs font-black text-[#041924] cursor-pointer"
                    >
                      + Tải ảnh
                    </button>
                  )}
                </div>

                {(formData.screenshots || []).length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {formData.screenshots.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative overflow-hidden border-2 border-black h-20"
                      >
                        <img
                          src={src}
                          alt="Preview"
                          className="w-full h-full object-cover max-w-full"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveScreenshot(idx)}
                          className="mc-btn mc-btn-tnt absolute top-1 right-1 text-white p-1 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
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
                      className="w-full mc-slot px-2.5 py-2 text-white text-xs font-bold"
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
                      className="w-full mc-slot px-2.5 py-2 text-white text-xs font-bold"
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
                        ⚠️ Hai điểm khác chiều không gian ({distanceCalcResult.wpA.dimension} / {distanceCalcResult.wpB.dimension}).
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

              <div className="p-3.5 mc-slot border-2 border-[#a855f7] text-center">
                <span className="text-xs text-[#d8b4fe] font-extrabold uppercase">
                  Tọa độ bên {calcInput.from === 'overworld' ? 'Nether (÷8)' : 'Overworld (×8)'}:
                </span>
                <div className="text-lg sm:text-xl font-black font-mono text-[#55ff55] mt-1 mc-text-shadow">
                  X: {calcInput.from === 'overworld' ? Math.round(calcInput.x / 8) : calcInput.x * 8}{' '}
                  | Y: {calcInput.y} | Z:{' '}
                  {calcInput.from === 'overworld' ? Math.round(calcInput.z / 8) : calcInput.z * 8}
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
              <div className="flex items-center gap-2">
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

      {/* MODAL 5: TẠO WORLD MỚI */}
      {isWorldModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
          <div className="mc-panel max-w-sm w-full p-4 sm:p-5">
            <h3 className="text-sm sm:text-base font-black text-white mb-3 flex items-center gap-2 mc-text-shadow">
              <VoxelBlockIcon type="grass" className="w-5 h-5" />
              <span>Thêm World / Server</span>
            </h3>
            <form onSubmit={handleCreateWorld} className="space-y-3">
              <input
                type="text"
                required
                value={newWorldName}
                onChange={(e) => setNewWorldName(e.target.value)}
                placeholder="Tên thế giới / Server..."
                className="w-full mc-slot px-3 py-2 text-sm text-white font-bold focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWorldModalOpen(false)}
                  className="mc-btn mc-btn-stone px-3 py-1.5 text-xs font-bold text-zinc-200 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="mc-btn mc-btn-emerald px-4 py-1.5 text-xs font-black text-[#041a06] cursor-pointer"
                >
                  Tạo Thế Giới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: XEM ẢNH LIGHTBOX */}
      {lightboxData && (
        <div
          onClick={() => setLightboxData(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mc-panel max-w-2xl w-full p-3.5 sm:p-4"
          >
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <h4 className="text-xs sm:text-sm font-black text-white truncate mc-text-shadow">
                {lightboxData.title}
              </h4>
              <button
                type="button"
                onClick={() => setLightboxData(null)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
            <img
              src={lightboxData.src}
              alt={lightboxData.title}
              className="w-full max-h-[70vh] object-contain mc-slot max-w-full"
            />
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
                <span>fu-WAYPOINT v2.1.2</span>
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
                <div className="font-extrabold text-[#ffff55] uppercase">Cập nhật giao diện:</div>
                <p>• Cố định khung màn hình trên Android & Windows, chống tràn chữ và lệch ngang.</p>
                <p>• Bổ sung 64 biểu tượng Pixel (Netherite, Elytra, Totem, Dân làng, Cục Obi...).</p>
              </div>

              <div className="mc-slot p-2.5 space-y-1">
                <div className="font-extrabold text-[#55ff55] uppercase">Cập nhật tính năng:</div>
                <p>• Phân tầng khu vực: Tạo các điểm con (Kho đồ, Farm...) nằm gọn trong Base chính.</p>
                <p>• Thêm bộ sắp xếp nhanh, bản đồ Radar 2D và copy 1 chạm tọa độ cổng Nether.</p>
              </div>

              <div className="mc-slot p-2.5 space-y-1">
                <div className="font-extrabold text-[#55ffff] uppercase">Mẹo sử dụng nhanh:</div>
                <p>• Bấm vào icon trên thẻ để đổi nhanh biểu tượng địa điểm.</p>
                <p>• Bấm trực tiếp vào dòng Nether/Overworld ở chân thẻ để copy tọa độ đặt cổng.</p>
                <p>• Trên PC ấn <strong className="text-white">Ctrl + Shift + S</strong> để mở bảng lưu nhanh.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
