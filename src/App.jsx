import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Copy,
  Check,
  MapPin,
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
  Smartphone,
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
} from 'lucide-react';

// ==========================================
// 0. HỆ THỐNG ÂM THANH & KHO 40 BIỂU TƯỢNG PIXEL MINECRAFT
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

// Danh mục 40 biểu tượng Pixel Minecraft (mỗi pixel rect là [x, y, w, h, hexColor])
const MC_ICON_CATALOG = [
  // --- NHÓM KHỐI BLOCK (BLOCKS) ---
  {
    id: 'grass',
    label: 'Khối Đất Cỏ',
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
    label: 'Cục Obi (Obsidian)',
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
    label: 'Obi Khóc (Crying Obi)',
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
    label: 'Đá Cuội / Thành Trì',
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
    label: 'Khối Ngọc Lục Bảo',
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
    label: 'Khối Vàng (Gold)',
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
    label: 'Khối Sắt (Farm Sắt)',
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
    id: 'redstone',
    label: 'Khối Đá Đỏ (Redstone)',
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
    label: 'Thạch Anh Tím (Geode)',
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
    label: 'Khối Slime (Slime Chunk)',
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
    id: 'nether',
    label: 'Khối Nham Thạch (Nether)',
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
    id: 'nether_brick',
    label: 'Gạch Pháo Đài Nether',
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
    label: 'Khối Đá End (Purpur)',
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

  // --- NHÓM KHO ĐỒ & CÔNG TRÌNH (BASE / STORAGE / UTILITY) ---
  {
    id: 'chest',
    label: 'Rương Đồ (Kho Đồ)',
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
    label: 'Lò Nung Tự Động',
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
    id: 'anvil',
    label: 'Cái Đe Rèn (Anvil)',
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
    label: 'Đèn Hiệu (Beacon)',
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
    label: 'Giường Ngủ (Spawn)',
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
    id: 'wheat',
    label: 'Ruộng Lúa / Nông Trại',
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
    label: 'Cổng Dịch Chuyển Nether',
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
    label: 'Khung Cổng End (Mắt End)',
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
    label: 'Đá Từ Tính (Lodestone)',
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
    label: 'Khối Thuốc Nổ (TNT)',
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
    label: 'Khối Lệnh (Command Block)',
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

  // --- NHÓM DÂN LÀNG & QUÁI VẬT (MOBS / VILLAGER / BOSS) ---
  {
    id: 'villager',
    label: 'Dân Làng (Villager)',
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
    label: 'Người Sắt (Iron Golem)',
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
    label: 'Mặt Creeper',
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
    label: 'Đầu Lâu Skeleton',
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
    label: 'Đầu Lâu Wither',
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
    label: 'Lồng Quái (Mob Spawner)',
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
    id: 'warden',
    label: 'Warden (Ancient City)',
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
    label: 'Rồng Ender (Ender Dragon)',
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
    label: 'Quái Blaze (Nether)',
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
    label: 'Piglin Đổi Vàng',
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
// 1. CẤU HÌNH MÀU SẮC & PHÂN LUỒNG MINECRAFT BLOCK
// ==========================================
const DIMENSION_CONFIG = {
  overworld: {
    id: 'overworld',
    label: 'Overworld',
    viLabel: 'Thế giới thực',
    border: 'mc-card-overworld',
    glow: '',
    badge: 'mc-badge-overworld',
    activeTab: 'mc-btn-emerald text-[#061a08] font-black',
    accentBar: 'mc-turf-overworld',
    blockType: 'grass',
    icon: Compass,
  },
  nether: {
    id: 'nether',
    label: 'Nether',
    viLabel: 'Địa ngục',
    border: 'mc-card-nether',
    glow: '',
    badge: 'mc-badge-nether',
    activeTab: 'mc-btn-redstone text-white font-black',
    accentBar: 'mc-turf-nether',
    blockType: 'nether',
    icon: Flame,
  },
  end: {
    id: 'end',
    label: 'The End',
    viLabel: 'Cổng End',
    border: 'mc-card-end',
    glow: '',
    badge: 'mc-badge-end',
    activeTab: 'mc-btn-purpur text-white font-black',
    accentBar: 'mc-turf-end',
    blockType: 'end',
    icon: Sparkles,
  },
};

const TAG_CONFIG = {
  Base: {
    label: '[Base] Căn cứ',
    color: 'bg-[#132a3e] text-[#55ffff] border-2 border-[#00aaaa]',
    defaultIcon: 'grass',
    icon: Home,
  },
  Farm: {
    label: '[Farm] Máy sản xuất',
    color: 'bg-[#332409] text-[#ffaa00] border-2 border-[#aa6600]',
    defaultIcon: 'wheat',
    icon: Wheat,
  },
  Storage: {
    label: '[Storage] Kho để đồ',
    color: 'bg-[#36200b] text-[#fde047] border-2 border-[#d97706]',
    defaultIcon: 'chest',
    icon: Layers,
  },
  Villager: {
    label: '[Villager] Khu dân làng',
    color: 'bg-[#143322] text-[#55ff55] border-2 border-[#22c55e]',
    defaultIcon: 'villager',
    icon: Home,
  },
  Spawner: {
    label: '[Spawner] Lồng quái',
    color: 'bg-[#381117] text-[#ff5555] border-2 border-[#aa0000]',
    defaultIcon: 'spawner',
    icon: Skull,
  },
  Ore: {
    label: '[Ore] Mỏ khoáng sản',
    color: 'bg-[#0e3238] text-[#55ffff] border-2 border-[#22a8b8]',
    defaultIcon: 'diamond_ore',
    icon: Gem,
  },
  Danger: {
    label: '[Danger] Nguy hiểm',
    color: 'bg-[#450d0d] text-[#ff5555] border-2 border-[#ff2222]',
    defaultIcon: 'warden',
    icon: AlertTriangle,
  },
  Mine: {
    label: '[Mine] Hầm mỏ',
    color: 'bg-[#122e28] text-[#55ff55] border-2 border-[#1f8a70]',
    defaultIcon: 'cobblestone',
    icon: Pickaxe,
  },
  Portal: {
    label: '[Portal] Cổng dịch chuyển',
    color: 'bg-[#2a123d] text-[#ff55ff] border-2 border-[#9333ea]',
    defaultIcon: 'obsidian',
    icon: ArrowRightLeft,
  },
  Structure: {
    label: '[Structure] Công trình/Làng',
    color: 'bg-[#1b1f3b] text-[#8899ff] border-2 border-[#4f5bd5]',
    defaultIcon: 'lodestone',
    icon: Castle,
  },
  Loot: {
    label: '[Loot] Kho báu',
    color: 'bg-[#382e08] text-[#ffff55] border-2 border-[#c29b0c]',
    defaultIcon: 'shulker',
    icon: Sparkles,
  },
};

const INITIAL_WORLDS = [
  { id: 'world-1', name: 'Survival Solo' },
  { id: 'world-2', name: 'Server SMP với hội bạn' },
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
    name: 'Làng Xưởng Sắt & Căn Cứ Chính',
    x: 240,
    y: 72,
    z: -480,
    dimension: 'overworld',
    tag: 'Base',
    icon: 'grass',
    notes: 'Căn cứ trung tâm! Bấm "Mở Khu Vực" bên dưới để xem 4 điểm con: Kho đồ, Khu dân làng Mending, Máy Farm Sắt & Cổng Nether.',
    screenshots: [SAMPLE_SCREENSHOT_VILLAGE],
    pinned: true,
    locked: true,
    deletedAt: null,
    createdAt: 1710000001000,
  },
  // --- CÁC TỌA ĐỘ CON BÊN TRONG CĂN CỨ CHÍNH (wp-1) ---
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
    notes: 'Tầng hầm B1 ngay dưới nhà chính — Phân loại 64 loại vật phẩm bằng Redstone.',
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
    name: 'Trại Trao Đổi Dân Làng (Sách Mending)',
    x: 268,
    y: 72,
    z: -492,
    dimension: 'overworld',
    tag: 'Villager',
    icon: 'villager',
    notes: 'Đã chữa khỏi Zombie Villager: 1 Emerald = Sách Mending, Unbreaking III, Fortune III.',
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
    name: 'Máy Farm Sắt (Iron Golem Tầng Cao)',
    x: 215,
    y: 96,
    z: -465,
    dimension: 'overworld',
    tag: 'Farm',
    icon: 'iron_block',
    notes: 'Treo trên không cách mặt đất 24 block, ống dẫn sắt chảy thẳng về kho đồ.',
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
    name: 'Cổng Hắc Diện Thạch (Nether Portal Base)',
    x: 238,
    y: 56,
    z: -488,
    dimension: 'overworld',
    tag: 'Portal',
    icon: 'obsidian',
    notes: 'Cổng Obi dẫn thẳng sang đường băng Nether Hub.',
    screenshots: [],
    pinned: false,
    locked: true,
    deletedAt: null,
    createdAt: 1710000001400,
  },
  // --- CÁC TỌA ĐỘ CẤP NGOÀI KHÁC ---
  {
    id: 'wp-2',
    worldId: 'world-1',
    parentId: null,
    name: 'Cổng Đền Sa Mạc & Mỏ Vàng Lộ Thiên',
    x: 860,
    y: null,
    z: -1120,
    dimension: 'overworld',
    tag: 'Ore',
    icon: 'gold_block',
    notes: 'Đã phá tấm áp lực TNT dưới hầm đền. Quanh đền có nhiều mỏ quặng đồng và vàng.',
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
    name: 'Lồng Spawner Bộ Xương (Farm XP)',
    x: 512,
    y: -18,
    z: -320,
    dimension: 'overworld',
    tag: 'Spawner',
    icon: 'skeleton',
    notes: 'Đào xuống từ gốc cây sồi lớn, nhớ mang theo kiếm Looting III.',
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
    name: 'Trạm Cao Tốc Băng Nether Hub (Trục Bắc)',
    x: -145,
    y: 68,
    z: 310,
    dimension: 'nether',
    tag: 'Portal',
    icon: 'crying_obsidian',
    notes: 'Đường thuyền băng xanh nối thẳng tới Pháo đài Blaze và Cổng End.',
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
    name: 'Lồng Spawner Blaze (Trong Pháo Đài)',
    x: -112,
    y: 74,
    z: 348,
    dimension: 'nether',
    tag: 'Spawner',
    icon: 'blaze',
    notes: 'Đã bao kín bằng gạch Nether chống Ghast bắn.',
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
    name: 'Thành Phố Cổ Đại Warden (Ancient City)',
    x: -920,
    y: -51,
    z: 640,
    dimension: 'overworld',
    tag: 'Danger',
    icon: 'warden',
    notes: 'Cực kỳ nguy hiểm! Nhớ mang nhiều khối Len (Wool) và Sneak liên tục.',
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
    name: 'End City Có Tàu Bay (Lấy Cánh Elytra)',
    x: 1840,
    y: 95,
    z: -1290,
    dimension: 'end',
    tag: 'Loot',
    icon: 'dragon',
    notes: 'Còn nhiều vỏ Shulker chưa lấy hết ở tòa tháp cao nhất.',
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
    name: 'Khu Chợ Trung Tâm Server SMP',
    x: 0,
    y: 80,
    z: 0,
    dimension: 'overworld',
    tag: 'Base',
    icon: 'emerald',
    notes: 'Nơi giao dịch Kim cương và Netherite của cả hội bạn.',
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
    name: 'Căn Cứ Ngầm Chống Creeper (Hardcore)',
    x: -340,
    y: 63,
    z: 190,
    dimension: 'overworld',
    tag: 'Base',
    icon: 'obsidian',
    notes: 'Thế giới Hardcore 1 mạng duy nhất — luôn cầm Totem of Undying ở tay phụ!',
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
    label: 'Ảnh chụp PC (Ấn F3)',
    desc: 'Minecraft Java 1.21 — Màn hình Debug F3',
    rawLine: 'XYZ: -428.350 / 12.00000 / 795.612 [minecraft:overworld]',
    x: -428,
    y: 12,
    z: 796,
    dimension: 'overworld',
    suggestedName: 'Mỏ Kim Cương Tầng Sâu (Quét từ F3)',
    suggestedTag: 'Ore',
    suggestedIcon: 'diamond_ore',
  },
  {
    id: 'mcpe-hud',
    label: 'Ảnh chụp Android (MCPE)',
    desc: 'Bedrock Edition — Góc trên bên trái màn hình',
    rawLine: 'Position: 120, 68, -500',
    x: 120,
    y: 68,
    z: -500,
    dimension: 'overworld',
    suggestedName: 'Làng Sa Mạc (Quét từ MCPE)',
    suggestedTag: 'Villager',
    suggestedIcon: 'villager',
  },
  {
    id: 'nether-fort',
    label: 'Ảnh chụp Pháo Đài Nether',
    desc: 'Quét dòng tọa độ trong Địa Ngục',
    rawLine: 'Block: -88 74 -215 [minecraft:the_nether]',
    x: -88,
    y: 74,
    z: -215,
    dimension: 'nether',
    suggestedName: 'Lồng Spawner Blaze (Quét OCR)',
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
      ratioText: '÷ 8 sang Nether Hub',
    };
  }
  if (dimension === 'nether') {
    return {
      targetDim: 'Overworld',
      x: Math.round(Number(x) * 8),
      z: Math.round(Number(z) * 8),
      ratioText: '× 8 ra Overworld',
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

function downloadRenderedAppIcon(iconId, customImgSrc, format = 'png', onDone = () => {}) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const triggerDownload = () => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = format === 'ico' ? 'icon.ico' : 'icon.png';
      a.click();
      URL.revokeObjectURL(url);
      onDone();
    }, 'image/png');
  };

  if (customImgSrc) {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      triggerDownload();
    };
    img.src = customImgSrc;
    return;
  }

  const item = MC_ICON_MAP[iconId] || MC_ICON_MAP.grass;
  const scale = size / 16;
  ctx.fillStyle = item.bg;
  ctx.fillRect(0, 0, size, size);
  item.pixels.forEach(([x, y, w, h, fill]) => {
    ctx.fillStyle = fill;
    ctx.fillRect(x * scale, y * scale, w * scale, h * scale);
  });
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = scale * 1.2;
  ctx.strokeRect(0, 0, size, size);
  triggerDownload();
}

// ==========================================
// 3. COMPONENT THẺ TỌA ĐỘ KHỐI BLOCK (WaypointCard - Hỗ trợ Tọa độ Con & Đổi Icon)
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
    label: `[${waypoint.tag || 'Khác'}]`,
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

  const screenshots = Array.isArray(waypoint.screenshots) ? waypoint.screenshots : [];

  return (
    <div
      className={`group relative rounded-none p-4 sm:p-5 text-slate-100 transition-transform duration-150 hover:-translate-y-1 flex flex-col justify-between mc-card ${dimStyle.border} ${
        activatedBlock ? 'mc-block-flash' : ''
      }`}
    >
      <div className={`absolute top-0 left-0 right-0 h-3 ${dimStyle.accentBar}`} />

      <span className="mc-corner mc-corner-tl" />
      <span className="mc-corner mc-corner-tr" />
      <span className="mc-corner mc-corner-bl" />
      <span className="mc-corner mc-corner-br" />

      <div className="pt-1.5">
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none text-xs font-bold uppercase tracking-wider ${dimStyle.badge}`}
            >
              <DimensionIcon className="w-3.5 h-3.5" />
              {dimStyle.label}
            </span>

            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-none text-xs font-bold ${tagStyle.color}`}
            >
              <TagIcon className="w-3 h-3" />
              [{waypoint.tag}]
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelectForDistance(waypoint)}
              title="Đo khoảng cách từ điểm này tới điểm khác"
              className="mc-btn mc-btn-stone p-1.5 text-slate-200 hover:text-[#ffff55] cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onTogglePin(waypoint.id)}
              title={waypoint.pinned ? 'Bỏ ghim ưu tiên' : 'Ghim lên đầu danh sách'}
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
              title={
                waypoint.locked
                  ? 'Đang KHÓA chống xóa nhầm (Bấm để mở khóa)'
                  : 'Bấm để KHÓA bảo vệ tọa độ này'
              }
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
              title="Chỉnh sửa tọa độ, đổi biểu tượng & ảnh đính kèm"
              className="mc-btn mc-btn-stone p-1.5 text-slate-200 hover:text-[#55ff55] cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onSoftDelete(waypoint)}
              disabled={waypoint.locked}
              title={
                waypoint.locked
                  ? 'Tọa độ đang được khóa bảo vệ! Hãy mở khóa nếu muốn xóa.'
                  : 'Chuyển vào Thùng rác (Có thể khôi phục)'
              }
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

        {parentWaypoint && parentOffset && (
          <div className="mb-2.5 px-2.5 py-1.5 bg-[#121c14] border-2 border-[#22c55e]/60 flex items-center justify-between gap-2 text-[11px] font-mono text-[#86efac]">
            <span className="truncate flex items-center gap-1 font-bold">
              <CornerDownRight className="w-3.5 h-3.5 text-[#55ff55] shrink-0" />
              Thuộc: {parentWaypoint.name}
            </span>
            <span className="shrink-0 text-[#ffff55] font-bold">
              Cách tâm {parentOffset.blocks}m
              {parentOffset.dy !== null
                ? ` • ΔY: ${parentOffset.dy > 0 ? `+${parentOffset.dy}` : parentOffset.dy}`
                : ''}
            </span>
          </div>
        )}

        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => onQuickChangeIcon(waypoint)}
                title={`Biểu tượng: ${iconMeta.label} (Bấm để đổi biểu tượng khác)`}
                className="mc-btn mc-btn-stone p-1.5 shrink-0 cursor-pointer"
              >
                <VoxelBlockIcon type={resolvedIcon} className="w-6 h-6" />
              </button>

              <div className="min-w-0 flex-1">
                <h3
                  onClick={() => childWaypoints.length > 0 && onEnterFolder(waypoint.id)}
                  className={`text-base sm:text-lg font-extrabold text-white truncate leading-snug mc-text-shadow ${
                    childWaypoints.length > 0 ? 'cursor-pointer hover:text-[#55ff55]' : ''
                  }`}
                >
                  {waypoint.name}
                </h3>
                <span className="text-[10px] text-zinc-400 font-mono block">
                  Icon: {iconMeta.label}
                </span>
              </div>
            </div>

            {waypoint.notes && (
              <p className="text-xs text-[#d7d2c8] mt-2 line-clamp-2 leading-relaxed mc-slot px-2.5 py-2 font-mono">
                📖 {waypoint.notes}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleCopy()}
              title={`Copy: ${getCopyString()}`}
              className={`mc-btn inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase tracking-wider cursor-pointer ${
                copied
                  ? 'mc-btn-emerald text-[#041a06]'
                  : 'mc-btn-stone text-white'
              }`}
            >
              <span className={`mc-redstone-dot ${copied ? 'mc-redstone-on' : ''}`} />
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Đã Copy</span>
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
              title="Copy định dạng chuẩn để dán vào Zalo / Discord cho bạn bè"
              className="mc-btn mc-btn-lapis inline-flex items-center justify-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white cursor-pointer"
            >
              <Share2 className="w-3 h-3" />
              <span>Share</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mc-slot p-2.5 font-mono">
          <div className="flex flex-col items-center justify-center mc-coord-box mc-coord-x py-1.5 px-2">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#ff5555] mc-text-shadow">
              X (Đông/Tây)
            </span>
            <span className="text-sm sm:text-base font-black text-white mt-0.5 mc-text-shadow">
              {waypoint.x}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center mc-coord-box mc-coord-y py-1.5 px-2">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#55ff55] mc-text-shadow">
              Y (Độ cao)
            </span>
            <span
              className={`text-sm sm:text-base font-black mt-0.5 mc-text-shadow ${
                hasY ? 'text-white' : 'text-zinc-500'
              }`}
              title={hasY ? `Độ cao Y = ${waypoint.y}` : 'Không bắt buộc (Chỉ cần X, Z)'}
            >
              {displayY}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center mc-coord-box mc-coord-z py-1.5 px-2">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#55ffff] mc-text-shadow">
              Z (Bắc/Nam)
            </span>
            <span className="text-sm sm:text-base font-black text-white mt-0.5 mc-text-shadow">
              {waypoint.z}
            </span>
          </div>
        </div>

        {/* KHU VỰC PHÂN TẦNG (TỌA ĐỘ CON BÊN TRONG ĐỊA ĐIỂM NÀY) */}
        <div className="mt-3 pt-2.5 border-t-2 border-black/60">
          <div className="flex items-center justify-between gap-1.5 flex-wrap">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onEnterFolder(waypoint.id)}
                title="Mở không gian riêng của địa điểm này để quản lý các tọa độ con bên trong"
                className={`mc-btn inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-black cursor-pointer ${
                  childWaypoints.length > 0
                    ? 'mc-btn-gold text-[#1f1300]'
                    : 'mc-btn-stone text-zinc-200'
                }`}
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>
                  Mở Khu Vực ({childWaypoints.length} điểm con)
                </span>
              </button>

              {childWaypoints.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowInlineChildren(!showInlineChildren)}
                  title="Xem nhanh danh sách tọa độ con ngay trên thẻ"
                  className="mc-btn mc-btn-stone px-2 py-1.5 text-xs font-bold text-[#55ffff] cursor-pointer"
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
              title={`Tạo thêm tọa độ con (Farm, Kho đồ, Dân làng...) nằm trong "${waypoint.name}"`}
              className="mc-btn mc-btn-emerald inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-black text-[#041a06] cursor-pointer"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>+ Điểm Con</span>
            </button>
          </div>

          {showInlineChildren && childWaypoints.length > 0 && (
            <div className="mt-2.5 space-y-1.5 mc-slot p-2 max-h-48 overflow-y-auto">
              {childWaypoints.map((child) => {
                const cIcon = child.icon || TAG_CONFIG[child.tag]?.defaultIcon || 'chest';
                return (
                  <div
                    key={child.id}
                    className="flex items-center justify-between gap-2 bg-[#1a1924] border border-zinc-700/80 px-2.5 py-1.5 text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <VoxelBlockIcon type={cIcon} className="w-4 h-4" />
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate">{child.name}</div>
                        <div className="text-[10px] font-mono text-zinc-400">
                          X:{child.x} {child.y !== null ? `Y:${child.y}` : ''} Z:{child.z}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(null, child)}
                        title="Copy nhanh tọa độ điểm con này"
                        className="mc-btn mc-btn-stone px-2 py-1 text-[10px] font-bold text-[#55ffff] cursor-pointer"
                      >
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(child)}
                        title="Sửa điểm con"
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
          <div className="mt-3 grid grid-cols-2 gap-2">
            {screenshots.slice(0, 2).map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onOpenLightbox(src, waypoint.name)}
                className="relative group/img overflow-hidden mc-slot h-20 cursor-pointer"
              >
                <img
                  src={src}
                  alt={`${waypoint.name} ảnh ${idx + 1}`}
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

      <div className="mt-3.5 pt-2.5 border-t-2 border-black/70 flex items-center justify-between gap-2 flex-wrap text-[11px] text-zinc-300 font-mono">
        {portalLink ? (
          <span
            title={`Tọa độ tương ứng ở ${portalLink.targetDim} (${portalLink.ratioText})`}
            className="inline-flex items-center gap-1 text-[#ff88ff] bg-[#241033] px-2 py-0.5 border-2 border-[#7e22ce] font-bold"
          >
            <ArrowRightLeft className="w-3 h-3 text-[#d8b4fe]" />
            {portalLink.targetDim}: X={portalLink.x}, Z={portalLink.z}
          </span>
        ) : (
          <span className="text-zinc-400 font-bold">
            Chunk: [{chunkX}, {chunkZ}]
          </span>
        )}

        {distanceInfo ? (
          <span className="inline-flex items-center gap-1 text-[#55ffff] bg-[#0d2833] px-2 py-0.5 border-2 border-[#00aaaa] font-bold">
            <Navigation className="w-3 h-3 text-[#55ffff]" />
            Cách {distanceInfo.blocks} blocks ({distanceInfo.compass})
          </span>
        ) : (
          <span className="text-zinc-400 font-bold">
            Chunk: [{chunkX}, {chunkZ}]
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
    return Math.min(95, Math.max(5, ((Number(val) + r) / (2 * r)) * 100));
  };

  return (
    <div className="mc-panel p-4 mb-6">
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <div className="flex items-center gap-2">
          <MapIcon className="w-5 h-5 text-[#55ff55]" />
          <h3 className="text-sm sm:text-base font-black text-white mc-text-shadow">
            Bản Đồ Radar Tọa Độ 2D (Trục X / Z • Phạm vi ±{bounds.range} blocks)
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(4, +(z + 0.5).toFixed(1)))}
            className="mc-btn mc-btn-stone px-2.5 py-1 text-xs font-bold text-white inline-flex items-center gap-1 cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#55ff55]" /> Phóng to
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.5).toFixed(1)))}
            className="mc-btn mc-btn-stone px-2.5 py-1 text-xs font-bold text-white inline-flex items-center gap-1 cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5 text-[#ffaa00]" /> Thu nhỏ
          </button>
        </div>
      </div>

      <div
        className="relative w-full h-80 sm:h-96 mc-slot overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(85,255,85,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(85,255,85,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-500/30 pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-500/30 pointer-events-none" />

        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-[#55ffff] bg-black/75 px-1.5 py-0.5 border border-zinc-700">
          BẮC (-Z)
        </span>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-[#55ffff] bg-black/75 px-1.5 py-0.5 border border-zinc-700">
          NAM (+Z)
        </span>
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-[#ff5555] bg-black/75 px-1.5 py-0.5 border border-zinc-700">
          TÂY (-X)
        </span>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-[#ff5555] bg-black/75 px-1.5 py-0.5 border border-zinc-700">
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
              className="absolute -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer focus:outline-none z-10 hover:z-30 hover:scale-125 transition-transform"
            >
              <div className="p-0.5 bg-black border-2 border-[#55ff55] shadow-lg">
                <VoxelBlockIcon type={iconId} className="w-5 h-5" />
              </div>
              <span className="mt-0.5 block bg-black/90 text-[10px] font-mono font-bold text-white px-1 border border-zinc-700 whitespace-nowrap max-w-[110px] truncate">
                {wp.name}
              </span>
            </button>
          );
        })}

        {hoveredWp && (
          <div className="absolute bottom-3 left-3 z-40 mc-panel px-3 py-2 text-xs font-mono">
            <div className="font-extrabold text-[#55ff55]">{hoveredWp.name}</div>
            <div className="text-white">
              X: {hoveredWp.x} | Y: {hoveredWp.y ?? '~'} | Z: {hoveredWp.z}
            </div>
            <div className="text-[10px] text-zinc-400">Bấm vào điểm để chỉnh sửa</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. ỨNG DỤNG CHÍNH (fu WAYPOINT)
// ==========================================
export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [particles, setParticles] = useState([]);

  // Cấu hình Biểu Tượng App (App Icon & Favicon)
  const [appIconConfig, setAppIconConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('fu_waypoint_app_icon_v3');
      return saved ? JSON.parse(saved) : { iconId: 'grass', customImage: null };
    } catch {
      return { iconId: 'grass', customImage: null };
    }
  });
  const [isAppIconModalOpen, setIsAppIconModalOpen] = useState(false);
  const appIconFileInputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('fu_waypoint_app_icon_v3', JSON.stringify(appIconConfig));
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      if (appIconConfig.customImage) {
        link.href = appIconConfig.customImage;
      } else {
        const svgStr = getIconSvgString(appIconConfig.iconId, 64);
        link.href = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgStr);
      }
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
      const originX = e.clientX || rect.left + rect.width / 2;
      const originY = e.clientY || rect.top + rect.height / 2;

      const batchId = Date.now() + Math.random();
      const newParticles = Array.from({ length: 10 }, (_, idx) => {
        const angle = (Math.PI * 2 * idx) / 10 + (Math.random() - 0.5) * 0.5;
        const dist = 22 + Math.random() * 34;
        return {
          id: `${batchId}-${idx}`,
          x: originX,
          y: originY,
          dx: Math.round(Math.cos(angle) * dist),
          dy: Math.round(Math.sin(angle) * dist - 10),
          size: 5 + Math.floor(Math.random() * 5),
          color: palette[idx % palette.length],
        };
      });

      setParticles((prev) => [...prev.slice(-30), ...newParticles]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !p.id.startsWith(`${batchId}-`)));
      }, 520);
    };

    window.addEventListener('click', handleGlobalButtonClick, true);
    return () => window.removeEventListener('click', handleGlobalButtonClick, true);
  }, [soundEnabled]);

  const [activeDimension, setActiveDimension] = useState('all');
  const [activeTag, setActiveTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copyMode, setCopyMode] = useState('chat');
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
    }, 3200);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') ||
        (e.altKey && e.key.toLowerCase() === 's')
      ) {
        e.preventDefault();
        setIsMiniOverlayOpen((prev) => !prev);
        showToast('Đã bật/tắt cửa sổ Command Block nhập nhanh (Ctrl + Shift + S)', 'orb');
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
        `Đã tự tách tọa độ: X=${parsedX}${parsedY !== '' ? `, Y=${parsedY}` : ''}, Z=${parsedZ}`,
        'orb'
      );
    }
  };

  const handleOcrImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanningOcr(true);
    setOcrStatusText('Đang phân tích ảnh chụp màn hình & quét dòng tọa độ XYZ...');

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
          name: prev.name || `Điểm quét từ ảnh (${file.name.slice(0, 15)})`,
          x: String(extracted.x),
          y: String(extracted.y),
          z: String(extracted.z),
          dimension: extracted.dim,
          screenshots: [...(prev.screenshots || []).slice(0, 1), compressedDataUrl],
        }));

        setIsScanningOcr(false);
        setOcrStatusText(
          `✅ Đã quét thành công từ ảnh: X=${extracted.x}, Y=${extracted.y}, Z=${extracted.z} và tự động đính kèm ảnh!`
        );
        showToast(`OCR thành công: X:${extracted.x} Y:${extracted.y} Z:${extracted.z}`, 'orb');
      }, 900);
    } catch {
      setIsScanningOcr(false);
      setOcrStatusText('Không thể đọc file ảnh, vui lòng thử lại.');
    }
  };

  const applyOcrPreset = (preset) => {
    setIsScanningOcr(true);
    setOcrStatusText(`Đang quét dòng "${preset.rawLine}"...`);
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
      setOcrStatusText(`✅ Đã trích xuất: ${preset.rawLine}`);
      showToast(`Đã điền tọa độ từ ${preset.label}!`, 'orb');
    }, 450);
  };

  const handleAddScreenshot = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentPhotos = formData.screenshots || [];
    if (currentPhotos.length >= 2) {
      showToast('Mỗi tọa độ chỉ đính kèm tối đa 2 bức ảnh đại diện!');
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
      showToast(`Đã đính kèm ${compressedList.length} ảnh chụp màn hình!`, 'orb');
    } catch {
      showToast('Không thể tải ảnh, hãy thử ảnh khác.');
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
      showToast('Tọa độ X và Z phải là số hợp lệ (Y có thể để trống)!');
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
      showToast('Đã cập nhật khối tọa độ!', 'orb');
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
        cleanParentId
          ? `Đã thêm điểm con "${newWp.name}" vào khu vực!`
          : 'Đã lưu tọa độ mới thành công!',
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
      notes: 'Lưu nhanh qua Command Block Widget trong lúc chơi game.',
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
    showToast(`Đã lưu nhanh "${newWp.name}"!`, 'orb');
  };

  const handleSelectQuickIcon = (iconId) => {
    if (!quickIconTargetWp) return;
    setWaypoints((prev) =>
      prev.map((item) =>
        item.id === quickIconTargetWp.id ? { ...item, icon: iconId } : item
      )
    );
    const meta = MC_ICON_MAP[iconId];
    showToast(`Đã đổi biểu tượng thành "${meta?.label || iconId}"!`, 'orb');
    setQuickIconTargetWp(null);
  };

  const handleUploadCustomAppIcon = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressImageFile(file, 128, 0.9);
      setAppIconConfig({ iconId: 'custom', customImage: dataUrl });
      showToast('Đã cập nhật Icon App tùy chỉnh!', 'orb');
    } catch {
      showToast('Không thể đọc file ảnh này.');
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
          showToast(
            nextLocked
              ? `Đã KHÓA bảo vệ "${item.name}" (Không thể xóa nhầm)`
              : `Đã mở khóa "${item.name}"`
          );
          return { ...item, locked: nextLocked };
        }
        return item;
      })
    );
  };

  const handleSoftDelete = (wp) => {
    if (wp.locked) {
      showToast('Tọa độ đang khóa bảo vệ! Hãy bấm mở khóa trước khi xóa.');
      return;
    }
    setWaypoints((prev) =>
      prev.map((item) => (item.id === wp.id ? { ...item, deletedAt: Date.now() } : item))
    );
    showToast(`Đã chuyển "${wp.name}" vào Thùng rác (Có thể khôi phục)`, 'tnt');
  };

  const handleRestore = (id) => {
    setWaypoints((prev) =>
      prev.map((item) => (item.id === id ? { ...item, deletedAt: null } : item))
    );
    showToast('Đã khôi phục tọa độ thành công!', 'orb');
  };

  const handlePermanentDelete = (id) => {
    setWaypoints((prev) => prev.filter((item) => item.id !== id));
    showToast('Đã xóa vĩnh viễn tọa độ khỏi Thùng rác.', 'tnt');
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
    showToast(`Đã tạo Profile "${newWorld.name}"!`, 'orb');
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
      version: 4,
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
        showToast('Đã đồng bộ & khôi phục toàn bộ dữ liệu thành công!', 'orb');
      } else {
        showToast('Dữ liệu JSON không đúng định dạng!');
      }
    } catch {
      showToast('Lỗi cú pháp JSON, vui lòng kiểm tra lại đoạn mã dán vào!');
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
    showToast('Đã tải file sao lưu .json về máy!', 'orb');
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
      showToast(
        `Đã lưu bản chụp đồng bộ cho mã phòng "${supabaseConfig.roomCode}" lúc ${nowStr}!`,
        'orb'
      );
    }, 600);
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
        return b.createdAt - a.createdAt;
      });
  }, [activeWaypoints, currentParentId, activeDimension, activeTag, searchQuery, playerPos]);

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

  const iconCategories = ['Tất cả', 'Khối Block', 'Kho & Tiện Ích', 'Dân Làng & Mob'];
  const filteredIconsForPicker = useMemo(() => {
    if (iconCategoryFilter === 'Tất cả') return MC_ICON_CATALOG;
    return MC_ICON_CATALOG.filter((item) => item.category === iconCategoryFilter);
  }, [iconCategoryFilter]);

  return (
    <div className="min-h-screen mc-deepslate-bg text-slate-100 pb-28 selection:bg-[#55ff55]/30 selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700;800&family=JetBrains+Mono:wght@600;700;800&family=Silkscreen:wght@400;700&display=swap');

        :root {
          --mc-font-ui: 'Chakra Petch', sans-serif;
          --mc-font-pixel: 'Silkscreen', 'Chakra Petch', monospace;
          --mc-font-mono: 'JetBrains Mono', monospace;
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
          letter-spacing: 0.06em;
          color: #55ff55;
          text-shadow:
            0 2px 0 #1b5e20,
            2px 2px 0 #1b5e20,
            3px 3px 0 #000000,
            4px 4px 0 #000000;
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
            0 6px 0px #09080c;
        }

        .mc-card {
          background-color: #23222b;
          border: 3px solid #000000;
          box-shadow:
            inset 3px 3px 0px rgba(255, 255, 255, 0.16),
            inset -3px -3px 0px rgba(0, 0, 0, 0.55),
            0 7px 0px #08080b;
        }
        .mc-card-overworld {
          background-color: #212621;
          box-shadow:
            inset 3px 3px 0px #4ca338,
            inset -3px -3px 0px #121812,
            0 7px 0px #070a07;
        }
        .mc-card-overworld:hover {
          box-shadow:
            inset 3px 3px 0px #68d84e,
            inset -3px -3px 0px #121812,
            0 7px 0px #070a07,
            0 0 18px rgba(85, 255, 85, 0.25);
        }
        .mc-card-nether {
          background-color: #2a1619;
          box-shadow:
            inset 3px 3px 0px #d9381e,
            inset -3px -3px 0px #17090b,
            0 7px 0px #0a0405;
        }
        .mc-card-nether:hover {
          box-shadow:
            inset 3px 3px 0px #ff6633,
            inset -3px -3px 0px #17090b,
            0 7px 0px #0a0405,
            0 0 18px rgba(255, 85, 85, 0.3);
        }
        .mc-card-end {
          background-color: #1f172b;
          box-shadow:
            inset 3px 3px 0px #a855f7,
            inset -3px -3px 0px #100b18,
            0 7px 0px #07050b;
        }
        .mc-card-end:hover {
          box-shadow:
            inset 3px 3px 0px #d8b4fe,
            inset -3px -3px 0px #100b18,
            0 7px 0px #07050b,
            0 0 18px rgba(192, 132, 252, 0.3);
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
          width: 5px;
          height: 5px;
          background: #000;
          opacity: 0.45;
          pointer-events: none;
        }
        .mc-corner-tl { top: 14px; left: 5px; }
        .mc-corner-tr { top: 14px; right: 5px; }
        .mc-corner-bl { bottom: 5px; left: 5px; }
        .mc-corner-br { bottom: 5px; right: 5px; }

        .mc-slot {
          background-color: #101016;
          border: 2px solid #000000;
          border-radius: 0px !important;
          box-shadow:
            inset 3px 3px 0px #060609,
            inset -3px -3px 0px #353442;
        }
        .mc-slot:focus-within {
          border-color: #55ff55;
          box-shadow:
            inset 3px 3px 0px #060609,
            inset -3px -3px 0px #2b6e2b,
            0 0 10px rgba(85, 255, 85, 0.25);
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
          box-shadow: inset 1px 1px 0 rgba(255,255,255,0.2);
        }
        .mc-badge-nether {
          background-color: #421212;
          color: #ff7755;
          border: 2px solid #d9381e;
          box-shadow: inset 1px 1px 0 rgba(255,255,255,0.2);
        }
        .mc-badge-end {
          background-color: #2d1247;
          color: #e9d5ff;
          border: 2px solid #a855f7;
          box-shadow: inset 1px 1px 0 rgba(255,255,255,0.2);
        }

        .mc-btn {
          position: relative;
          border-radius: 0px !important;
          border: 2px solid #000000;
          transition: transform 0.06s steps(2), box-shadow 0.06s steps(2), filter 0.1s ease;
          user-select: none;
        }
        .mc-btn:hover:not(:disabled) {
          filter: brightness(1.14);
        }
        .mc-btn:active:not(:disabled) {
          transform: translateY(4px) !important;
        }

        .mc-btn-stone {
          background-color: #3a3946;
          box-shadow:
            inset 2px 2px 0px #68677a,
            inset -2px -2px 0px #1e1d26,
            0 4px 0px #0d0c12,
            0 6px 0px #000000;
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
            0 4px 0px #0c3b1e,
            0 6px 0px #000000;
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
            0 4px 0px #450a0a,
            0 6px 0px #000000;
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
            0 4px 0px #300707,
            0 6px 0px #000000;
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
            0 4px 0px #522d0b,
            0 6px 0px #000000;
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
            0 4px 0px #082f49,
            0 6px 0px #000000;
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
            0 4px 0px #2e054e,
            0 6px 0px #000000;
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
            0 4px 0px #2e1002,
            0 6px 0px #000000;
        }

        .mc-btn-disabled {
          background-color: #19191f;
          border: 2px solid #09090c;
          box-shadow: inset 2px 2px 0px #111116;
        }

        .mc-redstone-dot {
          width: 7px;
          height: 7px;
          background-color: #7f1d1d;
          border: 1px solid #000;
          display: inline-block;
          transition: all 0.12s steps(2);
        }
        .mc-btn:hover .mc-redstone-dot,
        .mc-redstone-on {
          background-color: #ff3333;
          box-shadow: 0 0 8px #ff3333, 0 0 12px #ff8800;
        }

        @keyframes mcBlockActivate {
          0% {
            box-shadow: 0 0 0 0 rgba(85, 255, 85, 0.85), 0 0 18px rgba(255, 255, 85, 0.9);
          }
          100% {
            box-shadow: 0 0 0 12px rgba(85, 255, 85, 0), 0 0 0 rgba(255, 255, 85, 0);
          }
        }
        .mc-btn-activating {
          animation: mcBlockActivate 0.36s steps(4) forwards;
        }

        @keyframes mcCardFlash {
          0%, 100% { filter: brightness(1); }
          40% { filter: brightness(1.3); }
        }
        .mc-block-flash {
          animation: mcCardFlash 0.35s steps(3);
        }

        @keyframes mcParticleBurst {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--dx), calc(var(--dy) + 28px)) scale(0.35);
          }
        }
        .mc-voxel-particle {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          border: 1.5px solid #000;
          animation: mcParticleBurst 0.48s steps(6) forwards;
        }
      `}</style>

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

      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 flex items-center gap-3 mc-panel px-4 py-3 text-xs sm:text-sm font-bold max-w-md border-2 border-black">
          <div className="w-7 h-7 mc-slot flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-[#55ff55] stroke-[3]" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-[#ffff55] font-mono">
              [Block Activated!]
            </div>
            <div className="truncate text-white">{toastMessage}</div>
          </div>
        </div>
      )}

      {floatingBubbleVisible && (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
          {isMiniOverlayOpen && (
            <div className="w-80 sm:w-96 mc-panel p-4 mb-2">
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <VoxelBlockIcon type="command" className="w-5 h-5" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#ffff55] mc-text-shadow">
                    Command Block Lưu Nhanh
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMiniOverlayOpen(false)}
                  className="mc-btn mc-btn-stone p-1 text-slate-200 hover:text-white cursor-pointer"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>

              {currentParentWaypoint && (
                <div className="mb-2 px-2.5 py-1 bg-[#122616] border border-[#55ff55]/40 text-[11px] text-[#55ff55] font-mono">
                  📂 Đang lưu vào trong: <strong>{currentParentWaypoint.name}</strong>
                </div>
              )}

              <form onSubmit={handleQuickSave} className="space-y-2.5">
                <input
                  type="text"
                  required
                  value={quickForm.name}
                  onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                  placeholder="Tên nhanh (VD: Kho Đồ, Dân Làng, Farm Sắt)..."
                  className="w-full mc-slot px-3 py-2 text-xs text-white focus:outline-none"
                />

                <div className="grid grid-cols-3 gap-1.5 font-mono">
                  <input
                    type="number"
                    required
                    value={quickForm.x}
                    onChange={(e) => setQuickForm({ ...quickForm, x: e.target.value })}
                    placeholder="X *"
                    className="w-full mc-slot px-2.5 py-1.5 text-xs text-[#ff5555] font-bold focus:outline-none"
                  />
                  <input
                    type="number"
                    value={quickForm.y}
                    onChange={(e) => setQuickForm({ ...quickForm, y: e.target.value })}
                    placeholder="Y (Tùy)"
                    className="w-full mc-slot px-2.5 py-1.5 text-xs text-[#55ff55] font-bold focus:outline-none"
                  />
                  <input
                    type="number"
                    required
                    value={quickForm.z}
                    onChange={(e) => setQuickForm({ ...quickForm, z: e.target.value })}
                    placeholder="Z *"
                    className="w-full mc-slot px-2.5 py-1.5 text-xs text-[#55ffff] font-bold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  <select
                    value={quickForm.dimension}
                    onChange={(e) => setQuickForm({ ...quickForm, dimension: e.target.value })}
                    className="mc-slot px-2 py-1.5 text-xs text-slate-100 font-bold focus:outline-none"
                  >
                    <option value="overworld" className="bg-[#14141c]">🟢 Overworld</option>
                    <option value="nether" className="bg-[#14141c]">🔴 Nether</option>
                    <option value="end" className="bg-[#14141c]">🟣 The End</option>
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
                    className="mc-slot px-2 py-1.5 text-xs text-slate-100 font-bold focus:outline-none"
                  >
                    {Object.keys(TAG_CONFIG).map((k) => (
                      <option key={k} value={k} className="bg-[#14141c]">
                        [{k}]
                      </option>
                    ))}
                  </select>
                  <select
                    value={quickForm.icon}
                    onChange={(e) => setQuickForm({ ...quickForm, icon: e.target.value })}
                    className="mc-slot px-2 py-1.5 text-xs text-[#ffff55] font-bold focus:outline-none"
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
                    PC: Ấn <kbd className="px-1.5 py-0.5 mc-slot text-[#ffff55]">Ctrl+Shift+S</kbd>
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
            title="Khối nhập nhanh tọa độ (Android Floating Widget / PC Ctrl+Shift+S)"
            className="mc-btn mc-btn-command w-14 h-14 p-3 text-white flex items-center justify-center cursor-pointer"
          >
            {isMiniOverlayOpen ? (
              <X className="w-6 h-6 stroke-[3]" />
            ) : (
              <Zap className="w-6 h-6 fill-[#ffff55] text-[#ffff55]" />
            )}
          </button>
        </div>
      )}

      {/* HEADER BAR */}
      <header className="sticky top-0 z-30 bg-[#181720] border-b-4 border-black shadow-[0_4px_0_#09080c]">
        <div className="h-2 w-full mc-turf-overworld" />
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAppIconModalOpen(true)}
              title="Bấm để thay đổi Icon App & Tải file icon.ico / icon.png"
              className="w-11 h-11 mc-btn mc-btn-stone flex items-center justify-center p-1.5 cursor-pointer"
            >
              <VoxelBlockIcon
                type={appIconConfig.iconId}
                customImage={appIconConfig.customImage}
                className="w-7 h-7"
              />
            </button>
            <h1
              onClick={() => setCurrentParentId(null)}
              className="text-xl sm:text-2xl font-black tracking-wider mc-logo-title cursor-pointer"
            >
              fu WAYPOINT
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center mc-slot p-1">
              <Globe className="w-4 h-4 text-[#55ff55] ml-2 mr-1.5 shrink-0" />
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold mr-1 hidden sm:inline">
                World:
              </span>
              <select
                value={selectedWorldId}
                onChange={(e) => setSelectedWorldId(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-extrabold text-white pr-2 py-1 focus:outline-none cursor-pointer"
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
                title="Thêm Profile (World / Server) mới"
                className="mc-btn mc-btn-emerald px-2.5 py-1 text-xs font-black text-[#041a06] cursor-pointer"
              >
                + Profile
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsAppIconModalOpen(true)}
              title="Đổi biểu tượng App (App Icon) & Xuất file icon.ico / icon.png"
              className="mc-btn mc-btn-stone inline-flex items-center gap-1.5 px-3 py-2 text-xs font-black text-[#55ff55] cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Icon App</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDistanceOpen(true)}
              className="mc-btn mc-btn-gold inline-flex items-center gap-1.5 px-3 py-2 text-xs font-black text-[#1f1300] cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Đo khoảng cách 2 điểm</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCalcOpen(true)}
              className="mc-btn mc-btn-purpur inline-flex items-center gap-1.5 px-3 py-2 text-xs font-black text-white cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Nether Hub (÷8)</span>
            </button>

            <button
              type="button"
              onClick={openBackupModal}
              className="mc-btn mc-btn-diamond inline-flex items-center gap-1.5 px-3 py-2 text-xs font-black text-[#041924] cursor-pointer"
            >
              <Cloud className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sao lưu / Đồng bộ</span>
            </button>

            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Đang bật tiếng Click Block Minecraft' : 'Đang tắt tiếng Click Block'}
              className={`mc-btn p-2 cursor-pointer ${
                soundEnabled ? 'mc-btn-stone text-[#55ff55]' : 'mc-btn-stone text-zinc-500'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              title="Kiến trúc & Hướng dẫn dùng trên PC / Android"
              className="mc-btn mc-btn-stone p-2 text-slate-200 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-6">
        {currentParentWaypoint && !viewTrash && (
          <div className="mc-panel p-4 mb-5 border-2 border-[#55ff55]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm font-extrabold">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentParentId(currentParentWaypoint.parentId || null)
                  }
                  className="mc-btn mc-btn-stone inline-flex items-center gap-1.5 px-3 py-1.5 text-white cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#55ff55]" />
                  <span>Quay Ra Ngoài</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentParentId(null)}
                  className="text-zinc-400 hover:text-white cursor-pointer font-mono"
                >
                  🏠 Tất cả địa điểm
                </button>

                {breadcrumbTrail.map((crumb, idx) => (
                  <React.Fragment key={crumb.id}>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                    <button
                      type="button"
                      onClick={() => setCurrentParentId(crumb.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 mc-slot cursor-pointer ${
                        idx === breadcrumbTrail.length - 1
                          ? 'text-[#55ff55] border-[#55ff55]'
                          : 'text-zinc-200'
                      }`}
                    >
                      <VoxelBlockIcon
                        type={crumb.icon || TAG_CONFIG[crumb.tag]?.defaultIcon || 'grass'}
                        className="w-4 h-4"
                      />
                      <span>{crumb.name}</span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        (X:{crumb.x} {crumb.y !== null ? `Y:${crumb.y}` : ''} Z:{crumb.z})
                      </span>
                    </button>
                  </React.Fragment>
                ))}
              </div>

              <button
                type="button"
                onClick={openCreateForm}
                className="mc-btn mc-btn-emerald inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black text-[#041a06] uppercase cursor-pointer"
              >
                <FolderPlus className="w-4 h-4" />
                <span>+ Thêm Điểm Con Trong &quot;{currentParentWaypoint.name}&quot;</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-6">
          <div className="grid grid-cols-2 sm:flex items-center gap-2 mc-panel p-2">
            <button
              type="button"
              onClick={() => {
                setActiveDimension('all');
                setViewTrash(false);
              }}
              className={`mc-btn px-3.5 py-2 text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-1.5 font-extrabold ${
                !viewTrash && activeDimension === 'all'
                  ? 'mc-btn-gold text-[#1f1300]'
                  : 'mc-btn-stone text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Tất cả ({counts.all})</span>
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
                  className={`mc-btn px-3.5 py-2 text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-1.5 font-extrabold ${
                    isActive ? dim.activeTab : 'mc-btn-stone text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>
                    {dim.label} ({counts[dim.id]})
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setViewTrash(!viewTrash)}
              className={`mc-btn px-3 py-2 text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-1.5 font-extrabold ${
                viewTrash
                  ? 'mc-btn-tnt text-white'
                  : 'mc-btn-stone text-rose-300'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Thùng rác ({trashedWaypoints.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'grid' ? 'radar' : 'grid')}
              title="Chuyển đổi giữa Danh sách Thẻ và Bản đồ Radar Tọa Độ 2D"
              className={`mc-btn inline-flex items-center justify-center gap-1.5 px-3.5 py-3 text-xs sm:text-sm font-black uppercase cursor-pointer ${
                viewMode === 'radar'
                  ? 'mc-btn-diamond text-[#041924]'
                  : 'mc-btn-stone text-[#55ffff]'
              }`}
            >
              {viewMode === 'radar' ? (
                <>
                  <LayoutGrid className="w-4 h-4" />
                  <span>Dạng Thẻ</span>
                </>
              ) : (
                <>
                  <MapIcon className="w-4 h-4" />
                  <span>Radar 2D</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={openCreateForm}
              className="mc-btn mc-btn-command flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 text-white font-black text-xs sm:text-sm uppercase tracking-wide cursor-pointer mc-text-shadow"
            >
              <span className="mc-redstone-dot mc-redstone-on" />
              <ScanLine className="w-4 h-4" />
              <span>Quét Ảnh F3 / MCPE (OCR)</span>
            </button>

            <button
              type="button"
              onClick={openCreateForm}
              className="mc-btn mc-btn-emerald flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 text-[#041a06] font-black text-xs sm:text-sm uppercase tracking-wide cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Lưu Tọa Độ Mới</span>
            </button>
          </div>
        </div>

        {!viewTrash && (
          <div className="mc-panel p-4 mb-6 space-y-3.5">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#55ff55] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm xuyên suốt mọi địa điểm cha & điểm con (tên, ghi chú, tag, tọa độ)..."
                  className="w-full mc-slot text-white placeholder-zinc-500 pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 mc-slot px-3 py-2 shrink-0">
                <span className="text-xs text-zinc-400 font-bold uppercase">Chế độ Copy:</span>
                <select
                  value={copyMode}
                  onChange={(e) => setCopyMode(e.target.value)}
                  className="bg-transparent text-xs font-extrabold text-[#55ffff] focus:outline-none cursor-pointer font-mono"
                >
                  <option value="chat" className="bg-[#141720] text-slate-100">
                    Chia sẻ Discord/Zalo ([Tên] - Overworld: X:120 Y:12 Z:-500)
                  </option>
                  <option value="raw" className="bg-[#141720] text-slate-100">
                    Số tọa độ thuần (120 12 -500)
                  </option>
                  <option value="tp" className="bg-[#141720] text-slate-100">
                    Lệnh dịch chuyển (/tp @s 120 12 -500)
                  </option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5">
              <button
                type="button"
                onClick={() => setActiveTag('all')}
                className={`mc-btn px-3 py-1.5 text-xs font-extrabold shrink-0 cursor-pointer ${
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
                    className={`mc-btn inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold shrink-0 cursor-pointer ${
                      isSelected
                        ? 'mc-btn-emerald text-[#041a06]'
                        : 'mc-btn-stone text-zinc-300'
                    }`}
                  >
                    <TagIcon className="w-3.5 h-3.5" />
                    <span>[{tagKey}]</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2.5 border-t-2 border-black/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <label className="inline-flex items-center gap-2 cursor-pointer text-zinc-200 font-bold">
                <input
                  type="checkbox"
                  checked={playerPos.enabled}
                  onChange={(e) =>
                    setPlayerPos((prev) => ({ ...prev, enabled: e.target.checked }))
                  }
                  className="w-4 h-4 accent-[#55ff55]"
                />
                <Navigation className="w-3.5 h-3.5 text-[#55ffff]" />
                <span>Đo khoảng cách trực tiếp từ tọa độ bạn đang đứng</span>
              </label>

              {playerPos.enabled ? (
                <div className="flex items-center gap-2 flex-wrap font-mono">
                  <span className="text-zinc-300 font-bold">Vị trí bạn:</span>
                  <input
                    type="number"
                    value={playerPos.x}
                    onChange={(e) =>
                      setPlayerPos((prev) => ({ ...prev, x: Number(e.target.value) }))
                    }
                    placeholder="X"
                    className="w-20 mc-slot px-2 py-1 text-xs text-[#ff5555] font-bold"
                  />
                  <input
                    type="number"
                    value={playerPos.z}
                    onChange={(e) =>
                      setPlayerPos((prev) => ({ ...prev, z: Number(e.target.value) }))
                    }
                    placeholder="Z"
                    className="w-20 mc-slot px-2 py-1 text-xs text-[#55ffff] font-bold"
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
                <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-mono">
                  <span>
                    💡 Bấm vào <strong>Icon trên thẻ</strong> để đổi nhanh sang Cục Obi, Dân Làng, Rương...
                  </span>
                  <button
                    type="button"
                    onClick={() => setFloatingBubbleVisible(!floatingBubbleVisible)}
                    className="mc-btn mc-btn-stone px-2 py-0.5 text-[#55ffff] font-bold cursor-pointer"
                  >
                    {floatingBubbleVisible ? 'Ẩn khối nổi' : 'Hiện khối nổi Android'}
                  </button>
                </div>
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

        {viewTrash ? (
          <div className="mc-panel p-5">
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-black">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-6 h-6 text-[#ff5555]" />
                <div>
                  <h2 className="text-base font-extrabold text-white mc-text-shadow">
                    Rương Thùng Rác Bảo Vệ (Chống Xóa Nhầm)
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Mọi tọa độ bạn lỡ tay bấm xóa đều nằm an toàn ở đây. Bấm &quot;Khôi phục&quot; để lấy lại ngay lập tức.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewTrash(false)}
                className="mc-btn mc-btn-stone px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
              >
                Quay lại danh sách
              </button>
            </div>

            {trashedWaypoints.length === 0 ? (
              <div className="text-center py-12 text-zinc-400 text-sm font-mono mc-slot">
                Thùng rác đang trống. Không có tọa độ nào bị xóa gần đây.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trashedWaypoints.map((wp) => (
                  <div
                    key={wp.id}
                    className="flex items-center justify-between gap-3 p-4 mc-slot"
                  >
                    <div className="flex items-center gap-2.5">
                      <VoxelBlockIcon
                        type={wp.icon || TAG_CONFIG[wp.tag]?.defaultIcon || 'grass'}
                        className="w-6 h-6"
                      />
                      <div>
                        <span className="text-xs font-extrabold text-[#ff5555] uppercase font-mono">
                          [{wp.dimension}] • [{wp.tag}]
                        </span>
                        <h4 className="font-extrabold text-white mt-0.5">{wp.name}</h4>
                        <p className="text-xs font-mono text-zinc-400 mt-0.5">
                          X: {wp.x} | Y: {wp.y ?? '~'} | Z: {wp.z}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleRestore(wp.id)}
                        className="mc-btn mc-btn-emerald inline-flex items-center gap-1 px-3 py-1.5 text-xs font-black text-[#041a06] cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Khôi phục
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
              <div className="mc-panel p-12 text-center">
                <div className="w-12 h-12 mc-slot mx-auto mb-3 flex items-center justify-center">
                  <Compass className="w-7 h-7 text-[#ffff55]" />
                </div>
                <h3 className="text-base font-extrabold text-white mb-1 mc-text-shadow">
                  {currentParentWaypoint
                    ? `Khu vực "${currentParentWaypoint.name}" chưa có tọa độ con nào`
                    : 'Chưa có khối tọa độ nào khớp với bộ lọc'}
                </h3>
                <p className="text-xs text-zinc-400 mb-4">
                  {currentParentWaypoint
                    ? 'Hãy thêm các điểm con như Kho đồ, Khu dân làng, Máy Farm... vào trong khu vực này.'
                    : 'Hãy bấm nút "Lưu Tọa Độ Mới" hoặc quét ảnh chụp màn hình F3 / MCPE.'}
                </p>
                <button
                  type="button"
                  onClick={openCreateForm}
                  className="mc-btn mc-btn-emerald inline-flex items-center gap-2 px-4 py-2.5 text-[#041a06] text-xs font-black uppercase cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Thêm điểm tọa độ đầu tiên</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

      {/* MODAL 0: CHỌN NHANH BIỂU TƯỢNG TRÊN THẺ */}
      {quickIconTargetWp && (
        <div
          onClick={() => setQuickIconTargetWp(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mc-panel max-w-lg w-full p-5 max-h-[88vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b-2 border-black">
              <div>
                <h3 className="text-base font-black text-[#55ff55] mc-text-shadow">
                  Đổi Biểu Tượng Cho &quot;{quickIconTargetWp.name}&quot;
                </h3>
                <p className="text-xs text-zinc-400">
                  Chọn Cục Obi, Dân Làng, Rương Đồ, Quái Vật... (40 biểu tượng Pixel)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setQuickIconTargetWp(null)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mc-slot p-3 max-h-96 overflow-y-auto">
              {MC_ICON_CATALOG.map((ic) => {
                const isSelected = quickIconTargetWp.icon === ic.id;
                return (
                  <button
                    key={ic.id}
                    type="button"
                    onClick={() => handleSelectQuickIcon(ic.id)}
                    className={`mc-btn p-2 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer ${
                      isSelected
                        ? 'mc-btn-emerald text-[#041a06]'
                        : 'mc-btn-stone text-zinc-200'
                    }`}
                  >
                    <VoxelBlockIcon type={ic.id} className="w-7 h-7" />
                    <span className="text-[10px] font-bold leading-tight line-clamp-1">
                      {ic.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 0B: ĐỔI ICON CHO APP & XUẤT FILE ICON.ICO / ICON.PNG */}
      {isAppIconModalOpen && (
        <div
          onClick={() => setIsAppIconModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mc-panel max-w-xl w-full p-5 my-8 max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-3 pb-3 border-b-2 border-black">
              <div className="flex items-center gap-2.5">
                <VoxelBlockIcon
                  type={appIconConfig.iconId}
                  customImage={appIconConfig.customImage}
                  className="w-8 h-8"
                />
                <div>
                  <h2 className="text-base font-black text-[#55ff55] mc-text-shadow">
                    Thay Đổi Icon Của App (fu WAYPOINT)
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Đổi logo hiển thị trên App, cửa sổ trình duyệt và tải file icon.ico / icon.png để đóng gói .exe / .apk
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAppIconModalOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <div className="p-3.5 mc-slot mb-4 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-extrabold text-[#ffff55]">
                  1. Tải ảnh riêng từ máy tính của bạn làm Icon App:
                </span>
                <input
                  ref={appIconFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUploadCustomAppIcon}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => appIconFileInputRef.current?.click()}
                  className="mc-btn mc-btn-diamond px-3 py-1.5 text-xs font-black text-[#041924] cursor-pointer"
                >
                  + Chọn Ảnh Từ Máy (.PNG / .ICO)
                </button>
              </div>

              <div className="pt-2.5 border-t border-zinc-800 flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-extrabold text-[#55ff55]">
                  2. Xuất Icon hiện tại ra file chuẩn để build .EXE / .APK:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      downloadRenderedAppIcon(
                        appIconConfig.iconId,
                        appIconConfig.customImage,
                        'ico',
                        () => showToast('Đã tải file icon.ico (256x256)!', 'orb')
                      )
                    }
                    className="mc-btn mc-btn-gold px-3 py-1.5 text-xs font-black text-[#1f1300] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Tải file icon.ico (Windows)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      downloadRenderedAppIcon(
                        appIconConfig.iconId,
                        appIconConfig.customImage,
                        'png',
                        () => showToast('Đã tải file icon.png (256x256)!', 'orb')
                      )
                    }
                    className="mc-btn mc-btn-emerald px-3 py-1.5 text-xs font-black text-[#041a06] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Tải file icon.png (Android)
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-2 text-xs font-extrabold text-zinc-200">
              Hoặc chọn từ 40 Biểu Tượng Pixel Minecraft làm Icon App:
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mc-slot p-3 max-h-72 overflow-y-auto">
              {MC_ICON_CATALOG.map((ic) => {
                const isSelected =
                  !appIconConfig.customImage && appIconConfig.iconId === ic.id;
                return (
                  <button
                    key={ic.id}
                    type="button"
                    onClick={() => {
                      setAppIconConfig({ iconId: ic.id, customImage: null });
                      showToast(`Đã đổi Icon App thành "${ic.label}"!`, 'orb');
                    }}
                    className={`mc-btn p-2 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer ${
                      isSelected
                        ? 'mc-btn-emerald text-[#041a06]'
                        : 'mc-btn-stone text-zinc-200'
                    }`}
                  >
                    <VoxelBlockIcon type={ic.id} className="w-7 h-7" />
                    <span className="text-[10px] font-bold leading-tight line-clamp-1">
                      {ic.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: THÊM / SỬA TỌA ĐỘ */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="mc-panel max-w-2xl w-full p-5 sm:p-6 my-8 max-h-[92vh] overflow-y-auto">
            <div className="absolute top-0 left-0 right-0 h-2.5 mc-turf-overworld" />
            <div className="flex items-center justify-between mb-4 pb-3 pt-1 border-b-2 border-black">
              <h2 className="text-lg font-black text-white flex items-center gap-2.5 mc-text-shadow">
                <VoxelBlockIcon type={formData.icon || 'command'} className="w-6 h-6" />
                {editingId
                  ? 'Chỉnh Sửa Khối Tọa Độ & Biểu Tượng'
                  : 'Lưu Tọa Độ Mới (Hỗ trợ Tọa Độ Con & 40 Icon)'}
              </h2>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <div className="mb-4 p-3.5 mc-slot space-y-2.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-extrabold text-[#55ff55] flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#55ff55]" />
                  Đọc ảnh chụp màn hình F3 (PC) / Góc trái MCPE (Android) bằng AI/OCR
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
                  className="mc-btn mc-btn-emerald inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-[#041a06] cursor-pointer"
                >
                  <ScanLine className="w-3.5 h-3.5" />
                  Chọn Ảnh Để Quét Số
                </button>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-zinc-400 font-bold">Thử mẫu quét tự động:</span>
                {OCR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyOcrPreset(preset)}
                    className="mc-btn mc-btn-stone px-2.5 py-1 text-[11px] text-[#55ff55] font-bold cursor-pointer"
                  >
                    ⚡ {preset.label}
                  </button>
                ))}
              </div>

              {ocrStatusText && (
                <p className="text-xs text-[#55ff55] bg-[#0b2210] px-2.5 py-1.5 border-2 border-[#22c55e] font-mono">
                  {isScanningOcr ? '⏳ ' : ''}
                  {ocrStatusText}
                </p>
              )}

              <div className="pt-1">
                <label className="block text-[11px] text-[#d8b4fe] font-bold mb-1 flex items-center gap-1">
                  <ClipboardPaste className="w-3 h-3" />
                  Hoặc dán trực tiếp dòng F3+C / văn bản chứa số tọa độ:
                </label>
                <input
                  type="text"
                  value={smartPasteInput}
                  onChange={(e) => handleSmartPaste(e.target.value)}
                  placeholder="VD: XYZ: 120 / 64 / -500 hoặc /execute in minecraft:the_nether run tp @s -145 68 310"
                  className="w-full bg-[#09090d] border-2 border-[#6b21a8] px-3 py-1.5 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>
            </div>

            <form onSubmit={handleSaveWaypoint} className="space-y-4">
              <div className="p-3 mc-slot border-2 border-[#eab308]/50">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#ffff55] mb-1.5 flex items-center gap-1.5">
                  <FolderOpen className="w-4 h-4 text-[#ffff55]" />
                  Phân tầng: Thuộc địa điểm / Khu vực nào? (Tạo tọa độ trong tọa độ)
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
                  className="w-full bg-[#14141d] border-2 border-black px-3 py-2 text-xs sm:text-sm font-bold text-white focus:outline-none"
                >
                  <option value="">
                    🏠 Địa điểm chính bên ngoài (Không nằm trong điểm nào)
                  </option>
                  {activeWaypoints
                    .filter((w) => w.id !== editingId)
                    .map((w) => (
                      <option key={w.id} value={w.id}>
                        📂 Nằm trong: {w.name} ({w.dimension} — X:{w.x}, Z:{w.z})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-200 mb-1">
                  Tên địa điểm *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="VD: Căn cứ chính, Kho để đồ, Khu dân làng Mending, Máy Farm Sắt..."
                  className="w-full mc-slot px-3.5 py-2.5 text-sm text-white font-bold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-xs font-extrabold text-[#ff5555] mb-1 font-mono">
                    Tọa độ X *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.x}
                    onChange={(e) => setFormData({ ...formData, x: e.target.value })}
                    placeholder="VD: 120"
                    className="w-full mc-slot px-3 py-2 text-sm font-mono font-bold text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#55ff55] mb-1 font-mono">
                    Độ cao Y <span className="text-[10px] text-zinc-400 font-normal">(Tùy chọn)</span>
                  </label>
                  <input
                    type="number"
                    value={formData.y}
                    onChange={(e) => setFormData({ ...formData, y: e.target.value })}
                    placeholder="Bỏ trống được"
                    className="w-full mc-slot px-3 py-2 text-sm font-mono font-bold text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#55ffff] mb-1 font-mono">
                    Tọa độ Z *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.z}
                    onChange={(e) => setFormData({ ...formData, z: e.target.value })}
                    placeholder="VD: -500"
                    className="w-full mc-slot px-3 py-2 text-sm font-mono font-bold text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-200 mb-1">
                    Chiều không gian (Dimension)
                  </label>
                  <select
                    value={formData.dimension}
                    onChange={(e) => setFormData({ ...formData, dimension: e.target.value })}
                    className="w-full mc-slot px-3 py-2.5 text-sm font-bold text-white focus:outline-none"
                  >
                    <option value="overworld" className="bg-[#141720]">🟢 Overworld (Khối Cỏ)</option>
                    <option value="nether" className="bg-[#141720]">🔴 Nether (Khối Netherrack)</option>
                    <option value="end" className="bg-[#141720]">🟣 The End (Khối Đá End)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-200 mb-1">
                    Hệ thống Tag (Nhãn dán)
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
                    className="w-full mc-slot px-3 py-2.5 text-sm font-bold text-white focus:outline-none"
                  >
                    {Object.keys(TAG_CONFIG).map((key) => (
                      <option key={key} value={key} className="bg-[#141720]">
                        {TAG_CONFIG[key].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 mc-slot space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#55ff55] flex items-center gap-2">
                    <VoxelBlockIcon type={formData.icon || 'grass'} className="w-5 h-5" />
                    Chọn Biểu Tượng Địa Điểm ({MC_ICON_MAP[formData.icon]?.label || 'Khối Đất Cỏ'})
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

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 max-h-48 overflow-y-auto p-1">
                  {filteredIconsForPicker.map((ic) => {
                    const isSelected = formData.icon === ic.id;
                    return (
                      <button
                        key={ic.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: ic.id })}
                        className={`mc-btn p-1.5 flex flex-col items-center justify-center gap-1 text-center cursor-pointer ${
                          isSelected
                            ? 'mc-btn-emerald text-[#041a06]'
                            : 'mc-btn-stone text-zinc-200'
                        }`}
                      >
                        <VoxelBlockIcon type={ic.id} className="w-6 h-6" />
                        <span className="text-[9px] font-bold leading-tight line-clamp-1">
                          {ic.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-200 mb-1">
                  Ghi chú (Notes)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder='VD: "Dưới đáy giếng có 2 cục kim cương chưa đào"...'
                  className="w-full mc-slot px-3 py-2 text-xs sm:text-sm font-mono text-white focus:outline-none"
                />
              </div>

              <div className="p-3 mc-slot">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-zinc-200 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#55ffff]" />
                    Đính kèm ảnh chụp địa điểm ({(formData.screenshots || []).length}/2 ảnh)
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
                      + Tải ảnh lên
                    </button>
                  )}
                </div>

                {(formData.screenshots || []).length === 0 ? (
                  <p className="text-[11px] text-zinc-500 font-mono">
                    Lưu hình dáng cái hang hoặc thiết kế máy farm để nhìn là nhớ ngay.
                  </p>
                ) : (
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

              <div className="flex items-center justify-between gap-4 pt-1">
                <label className="inline-flex items-center gap-2 text-xs font-bold text-[#55ffff] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.locked}
                    onChange={(e) => setFormData({ ...formData, locked: e.target.checked })}
                    className="w-4 h-4 accent-[#55ffff]"
                  />
                  <Lock className="w-3.5 h-3.5" />
                  <span>Khóa bảo vệ (Chống bấm xóa nhầm)</span>
                </label>

                <label className="inline-flex items-center gap-2 text-xs font-bold text-[#ffff55] cursor-pointer">
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

              <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-black">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="mc-btn mc-btn-stone px-4 py-2.5 text-xs font-black uppercase text-zinc-200 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="mc-btn mc-btn-emerald px-5 py-2.5 text-xs font-black uppercase text-[#041a06] cursor-pointer"
                >
                  {editingId ? 'Lưu Thay Đổi' : 'Lưu Tọa Độ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DISTANCE CALCULATOR */}
      {isDistanceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="mc-panel max-w-lg w-full p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black">
              <h2 className="text-base font-black text-[#ffff55] flex items-center gap-2 mc-text-shadow">
                <Ruler className="w-5 h-5 text-[#ffff55]" />
                Tính Khoảng Cách Giữa 2 Điểm (Đường Ray, Xây Cầu, Elytra)
              </h2>
              <button
                type="button"
                onClick={() => setIsDistanceOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {activeWaypoints.length < 2 ? (
              <p className="text-xs text-zinc-400 py-6 text-center mc-slot font-mono">
                Cần có ít nhất 2 tọa độ trong Profile hiện tại để so sánh khoảng cách.
              </p>
            ) : (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Điểm xuất phát (A)</label>
                    <select
                      value={distanceCalcResult?.wpA?.id || ''}
                      onChange={(e) => setPointAId(e.target.value)}
                      className="w-full mc-slot px-3 py-2 text-white text-xs font-bold"
                    >
                      {activeWaypoints.map((w) => (
                        <option key={w.id} value={w.id} className="bg-[#141720]">
                          [{w.dimension}] {w.name} ({w.x}, {w.z})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Điểm đích (B)</label>
                    <select
                      value={distanceCalcResult?.wpB?.id || ''}
                      onChange={(e) => setPointBId(e.target.value)}
                      className="w-full mc-slot px-3 py-2 text-white text-xs font-bold"
                    >
                      {activeWaypoints.map((w) => (
                        <option key={w.id} value={w.id} className="bg-[#141720]">
                          [{w.dimension}] {w.name} ({w.x}, {w.z})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {distanceCalcResult && (
                  <div className="space-y-3">
                    {!distanceCalcResult.sameDimension && (
                      <div className="p-2.5 bg-[#332200] border-2 border-[#ffaa00] text-[#ffff55] text-xs font-bold">
                        ⚠️ Hai điểm đang ở 2 chiều không gian khác nhau ({distanceCalcResult.wpA.dimension} vs {distanceCalcResult.wpB.dimension}). Hãy dùng thêm máy tính Nether (÷8) nếu đi qua cổng!
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 mc-slot text-center">
                        <span className="text-[11px] text-zinc-400 font-bold">Khoảng cách đường chim bay</span>
                        <div className="text-xl font-black font-mono text-[#ffff55] mt-0.5 mc-text-shadow">
                          {distanceCalcResult.dist2D} blocks
                        </div>
                        <span className="text-[11px] text-zinc-400">
                          Hướng đi: <strong className="text-white">{distanceCalcResult.compass}</strong>
                        </span>
                      </div>

                      <div className="p-3.5 mc-slot text-center">
                        <span className="text-[11px] text-zinc-400 font-bold">Số khối xây cầu / đường đi</span>
                        <div className="text-xl font-black font-mono text-[#55ff55] mt-0.5 mc-text-shadow">
                          {distanceCalcResult.stackCount} stacks + {distanceCalcResult.remBlocks}
                        </div>
                        <span className="text-[11px] text-zinc-400">
                          (Mỗi stack = 64 blocks)
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 mc-slot space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400 font-bold">🛤️ Chuẩn bị làm đường ray xe mỏ:</span>
                        <span className="font-mono font-bold text-white">
                          {distanceCalcResult.normalRails} Ray thường + {distanceCalcResult.poweredRails} Ray tăng tốc
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400 font-bold">🪽 Thời gian bay bằng Elytra:</span>
                        <span className="font-mono font-bold text-[#55ffff]">
                          ~{distanceCalcResult.elytraSeconds} giây (Cần ~{distanceCalcResult.fireworksNeeded} pháo hoa)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400 font-bold">🚣 Cao tốc thuyền băng Nether (÷8):</span>
                        <span className="font-mono font-bold text-[#d8b4fe]">
                          Chỉ mất ~{distanceCalcResult.netherIceBoatSeconds} giây ({Math.round(distanceCalcResult.dist2D / 8)} blocks ở Nether)
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="mc-panel max-w-md w-full p-5">
            <div className="absolute top-0 left-0 right-0 h-2.5 mc-turf-nether" />
            <div className="flex items-center justify-between mb-4 pb-3 pt-1 border-b-2 border-black">
              <h2 className="text-base font-black text-white flex items-center gap-2 mc-text-shadow">
                <VoxelBlockIcon type="obsidian" className="w-5 h-5" />
                Nether Portal Calculator (Xây Nether Hub)
              </h2>
              <button
                type="button"
                onClick={() => setIsCalcOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  Chiều chuyển đổi:
                </label>
                <select
                  value={calcInput.from}
                  onChange={(e) => setCalcInput({ ...calcInput, from: e.target.value })}
                  className="w-full mc-slot px-3 py-2 text-white font-bold"
                >
                  <option value="overworld" className="bg-[#141720]">Từ Overworld (X, Z) ➔ Chia 8 ra tọa độ Nether</option>
                  <option value="nether" className="bg-[#141720]">Từ Nether (X, Z) ➔ Nhân 8 ra tọa độ Overworld</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono">
                <div>
                  <label className="block text-[11px] font-bold text-[#ff5555] mb-1">X</label>
                  <input
                    type="number"
                    value={calcInput.x}
                    onChange={(e) => setCalcInput({ ...calcInput, x: Number(e.target.value) })}
                    className="w-full mc-slot px-2.5 py-1.5 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#55ff55] mb-1">Y (Giữ nguyên)</label>
                  <input
                    type="number"
                    value={calcInput.y}
                    onChange={(e) => setCalcInput({ ...calcInput, y: Number(e.target.value) })}
                    className="w-full mc-slot px-2.5 py-1.5 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#55ffff] mb-1">Z</label>
                  <input
                    type="number"
                    value={calcInput.z}
                    onChange={(e) => setCalcInput({ ...calcInput, z: Number(e.target.value) })}
                    className="w-full mc-slot px-2.5 py-1.5 text-white font-bold"
                  />
                </div>
              </div>

              <div className="p-4 mc-slot border-2 border-[#a855f7] text-center">
                <span className="text-xs text-[#d8b4fe] font-extrabold uppercase">
                  Tọa độ đặt cổng bên {calcInput.from === 'overworld' ? 'Nether (÷8)' : 'Overworld (×8)'}:
                </span>
                <div className="text-xl font-black font-mono text-[#55ff55] mt-1 mc-text-shadow">
                  X: {calcInput.from === 'overworld' ? Math.round(calcInput.x / 8) : calcInput.x * 8}{' '}
                  | Y: {calcInput.y} | Z:{' '}
                  {calcInput.from === 'overworld' ? Math.round(calcInput.z / 8) : calcInput.z * 8}
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Giúp xây hệ thống đường cao tốc Nether Hub chuẩn xác từng block mà không cần nhẩm tính.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: BACKUP & CLOUD SYNC */}
      {isBackupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="mc-panel max-w-lg w-full p-5 my-8">
            <div className="flex items-center justify-between mb-3 pb-3 border-b-2 border-black">
              <h2 className="text-base font-black text-[#55ffff] flex items-center gap-2 mc-text-shadow">
                <Cloud className="w-5 h-5 text-[#55ffff]" />
                Đồng Bộ Đám Mây (Cloud Sync PC ↔ Android)
              </h2>
              <button
                type="button"
                onClick={() => setIsBackupOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <div className="p-3.5 mc-slot mb-4 space-y-2.5 text-xs">
              <div className="font-extrabold text-[#55ffff] flex items-center justify-between">
                <span>☁️ Cấu hình Cloud Sync (Supabase / Mã Phòng)</span>
                {supabaseConfig.lastSync && (
                  <span className="text-[11px] text-[#55ff55] font-mono">
                    Đã đồng bộ: {supabaseConfig.lastSync}
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
                  placeholder="Mã đồng bộ (VD: mochi-smp-2026)"
                  className="mc-slot px-2.5 py-1.5 text-white font-mono"
                />
                <input
                  type="text"
                  value={supabaseConfig.url}
                  onChange={(e) =>
                    setSupabaseConfig({ ...supabaseConfig, url: e.target.value })
                  }
                  placeholder="Supabase Project URL (Tùy chọn)"
                  className="mc-slot px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <button
                type="button"
                onClick={handleCloudSync}
                disabled={isSyncingCloud}
                className="mc-btn mc-btn-diamond w-full py-2 font-black text-[#041924] uppercase cursor-pointer"
              >
                {isSyncingCloud
                  ? 'Đang đồng bộ dữ liệu...'
                  : 'Đồng Bộ Ngay Lên Cloud (PC ↔ Điện Thoại)'}
              </button>
            </div>

            <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
              Hoặc sao lưu / chuyển nhanh bằng <strong>Mã JSON</strong> (dán qua Zalo / Discord để mở trên điện thoại):
            </p>

            <textarea
              rows={6}
              value={backupJsonText}
              onChange={(e) => setBackupJsonText(e.target.value)}
              className="w-full mc-slot p-3 text-xs font-mono text-[#55ff55] focus:outline-none mb-3"
            />

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    await copyToClipboard(backupJsonText);
                    showToast('Đã copy toàn bộ mã sao lưu vào Clipboard!', 'orb');
                  }}
                  className="mc-btn mc-btn-stone inline-flex items-center gap-1.5 px-3 py-2 text-xs font-black text-white cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Mã Sao Lưu
                </button>
                <button
                  type="button"
                  onClick={handleDownloadJsonFile}
                  className="mc-btn mc-btn-diamond inline-flex items-center gap-1.5 px-3 py-2 text-xs font-black text-[#041924] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Tải File .JSON
                </button>
              </div>

              <button
                type="button"
                onClick={handleImportBackup}
                className="mc-btn mc-btn-emerald inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black text-[#041a06] cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                Khôi Phục Dữ Liệu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: CREATE WORLD */}
      {isWorldModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="mc-panel max-w-sm w-full p-5">
            <h3 className="text-base font-black text-white mb-3 flex items-center gap-2 mc-text-shadow">
              <VoxelBlockIcon type="grass" className="w-5 h-5" />
              Thêm Cấp 1 - Profile (World / Server)
            </h3>
            <form onSubmit={handleCreateWorld} className="space-y-3">
              <input
                type="text"
                required
                value={newWorldName}
                onChange={(e) => setNewWorldName(e.target.value)}
                placeholder="VD: Survival Solo, Server SMP, Mochi's Hardcore..."
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

      {/* MODAL 6: LIGHTBOX */}
      {lightboxData && (
        <div
          onClick={() => setLightboxData(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mc-panel max-w-2xl w-full p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-black text-white mc-text-shadow">{lightboxData.title}</h4>
              <button
                type="button"
                onClick={() => setLightboxData(null)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer"
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

      {/* MODAL 7: HƯỚNG DẪN */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="mc-panel max-w-lg w-full p-5">
            <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-black">
              <h3 className="text-base font-black text-[#55ff55] flex items-center gap-2 mc-text-shadow">
                <Smartphone className="w-4 h-4 text-[#55ff55]" />
                Hướng Dẫn Các Tính Năng Mới (fu WAYPOINT)
              </h3>
              <button
                type="button"
                onClick={() => setIsGuideOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-200 leading-relaxed font-mono">
              <li>
                • <strong>1. Phân tầng Tọa độ trong Tọa độ (Sub-Waypoints):</strong> Trên mỗi thẻ địa điểm (VD: Base chính), bạn bấm nút <strong className="text-[#55ff55]">+ Điểm Con</strong> để thêm các vị trí bên trong (Kho đồ, Dân làng, Máy Farm...) hoặc bấm <strong className="text-[#ffff55]">Mở Khu Vực</strong> để đi vào bên trong mà không làm loạn danh sách bên ngoài.
              </li>
              <li>
                • <strong>2. Kho 40 Biểu Tượng Pixel (Cục Obi, Dân Làng, Rương, Mob...):</strong> Bấm trực tiếp vào biểu tượng trên bất kỳ thẻ tọa độ nào để đổi nhanh hình đại diện.
              </li>
              <li>
                • <strong>3. Đổi Icon App & Xuất file .ICO / .PNG:</strong> Bấm nút <strong className="text-[#55ff55]">Icon App</strong> trên thanh Header (hoặc bấm vào logo góc trái trên cùng) để đổi icon của ứng dụng hoặc tải file <code>icon.ico</code> / <code>icon.png</code> về đóng gói <code>.exe</code> và <code>.apk</code>.
              </li>
              <li>
                • <strong>4. Bản đồ Radar 2D:</strong> Bấm nút <strong className="text-[#55ffff]">Radar 2D</strong> để quan sát vị trí tương đối giữa các địa điểm trên mặt phẳng tọa độ X/Z.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
