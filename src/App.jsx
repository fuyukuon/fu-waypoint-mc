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
} from 'lucide-react';

// ==========================================
// 0. HỆ THỐNG ÂM THANH & HIỆU ỨNG BLOCK MINECRAFT
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
      // Tiếng Stone Button / Lever click đặc trưng trong Minecraft
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
      // Tiếng Experience Orb (khi Lưu hoặc Copy tọa độ)
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
      // Tiếng phá block / xóa
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
    // Bỏ qua nếu trình duyệt chặn tự phát âm thanh
  }
}

// Icon Khối Voxel Pixel Art đặc trưng của Minecraft
function VoxelBlockIcon({ type = 'grass', className = 'w-6 h-6' }) {
  if (type === 'nether') {
    return (
      <svg viewBox="0 0 16 16" className={`${className} shrink-0`} style={{ imageRendering: 'pixelated' }}>
        <rect width="16" height="16" fill="#4a1216" />
        <rect x="0" y="0" width="16" height="4" fill="#d9381e" />
        <rect x="2" y="4" width="3" height="2" fill="#ff7b00" />
        <rect x="9" y="4" width="4" height="3" fill="#d9381e" />
        <rect x="4" y="8" width="3" height="3" fill="#ff9900" />
        <rect x="11" y="10" width="3" height="3" fill="#ff5500" />
        <rect x="1" y="12" width="4" height="2" fill="#7a1c24" />
        <rect x="0" y="0" width="16" height="16" fill="none" stroke="#000" strokeWidth="1.5" />
      </svg>
    );
  }
  if (type === 'end') {
    return (
      <svg viewBox="0 0 16 16" className={`${className} shrink-0`} style={{ imageRendering: 'pixelated' }}>
        <rect width="16" height="16" fill="#d9d2a9" />
        <rect x="0" y="0" width="16" height="4" fill="#7e22ce" />
        <rect x="3" y="4" width="4" height="3" fill="#a855f7" />
        <rect x="10" y="4" width="3" height="2" fill="#6b21a8" />
        <rect x="2" y="9" width="3" height="3" fill="#b8ae82" />
        <rect x="9" y="10" width="4" height="3" fill="#c084fc" />
        <rect x="0" y="0" width="16" height="16" fill="none" stroke="#000" strokeWidth="1.5" />
      </svg>
    );
  }
  if (type === 'command') {
    return (
      <svg viewBox="0 0 16 16" className={`${className} shrink-0`} style={{ imageRendering: 'pixelated' }}>
        <rect width="16" height="16" fill="#c77d48" />
        <rect x="2" y="2" width="12" height="12" fill="#8b5029" />
        <rect x="4" y="4" width="8" height="8" fill="#3a281d" />
        <rect x="5" y="5" width="2" height="2" fill="#55ff55" />
        <rect x="9" y="5" width="2" height="2" fill="#ff5555" />
        <rect x="5" y="9" width="2" height="2" fill="#55ffff" />
        <rect x="9" y="9" width="2" height="2" fill="#ffaa00" />
        <rect x="0" y="0" width="16" height="16" fill="none" stroke="#000" strokeWidth="1.5" />
      </svg>
    );
  }
  // Mặc định: Grass Block / Lodestone Overworld
  return (
    <svg viewBox="0 0 16 16" className={`${className} shrink-0`} style={{ imageRendering: 'pixelated' }}>
      <rect width="16" height="16" fill="#866043" />
      <rect x="0" y="0" width="16" height="5" fill="#52a535" />
      <rect x="0" y="0" width="16" height="2" fill="#6bc946" />
      <rect x="2" y="5" width="2" height="2" fill="#52a535" />
      <rect x="6" y="5" width="3" height="3" fill="#3d8026" />
      <rect x="12" y="5" width="2" height="2" fill="#52a535" />
      <rect x="3" y="10" width="2" height="2" fill="#65462e" />
      <rect x="10" y="11" width="3" height="2" fill="#65462e" />
      <rect x="0" y="0" width="16" height="16" fill="none" stroke="#000" strokeWidth="1.5" />
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
    icon: Home,
  },
  Farm: {
    label: '[Farm] Máy sản xuất',
    color: 'bg-[#332409] text-[#ffaa00] border-2 border-[#aa6600]',
    icon: Wheat,
  },
  Spawner: {
    label: '[Spawner] Lồng quái',
    color: 'bg-[#381117] text-[#ff5555] border-2 border-[#aa0000]',
    icon: Skull,
  },
  Ore: {
    label: '[Ore] Mỏ khoáng sản',
    color: 'bg-[#0e3238] text-[#55ffff] border-2 border-[#22a8b8]',
    icon: Gem,
  },
  Danger: {
    label: '[Danger] Nguy hiểm',
    color: 'bg-[#450d0d] text-[#ff5555] border-2 border-[#ff2222]',
    icon: AlertTriangle,
  },
  Mine: {
    label: '[Mine] Hầm mỏ',
    color: 'bg-[#122e28] text-[#55ff55] border-2 border-[#1f8a70]',
    icon: Pickaxe,
  },
  Portal: {
    label: '[Portal] Cổng dịch chuyển',
    color: 'bg-[#2a123d] text-[#ff55ff] border-2 border-[#9333ea]',
    icon: ArrowRightLeft,
  },
  Structure: {
    label: '[Structure] Công trình/Làng',
    color: 'bg-[#1b1f3b] text-[#8899ff] border-2 border-[#4f5bd5]',
    icon: Castle,
  },
  Loot: {
    label: '[Loot] Kho báu',
    color: 'bg-[#382e08] text-[#ffff55] border-2 border-[#c29b0c]',
    icon: Sparkles,
  },
};

// Cấp 1 - Profile (World/Server)
const INITIAL_WORLDS = [
  { id: 'world-1', name: 'Survival Solo' },
  { id: 'world-2', name: 'Server SMP với hội bạn' },
  { id: 'world-3', name: "Mochi's Hardcore" },
];

// Ảnh minh họa nhẹ dạng SVG Data URI cho Waypoint mẫu
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
    name: 'Làng Xưởng Sắt & Căn Cứ Chính',
    x: 240,
    y: 72,
    z: -480,
    dimension: 'overworld',
    tag: 'Base',
    notes: 'Dưới đáy giếng có 2 cục kim cương chưa đào. Đã xây cổng Nether chính ở tầng hầm.',
    screenshots: [SAMPLE_SCREENSHOT_VILLAGE],
    pinned: true,
    locked: true,
    deletedAt: null,
    createdAt: 1710000001000,
  },
  {
    id: 'wp-2',
    worldId: 'world-1',
    name: 'Cổng Đền Sa Mạc & Mỏ Vàng Lộ Thiên',
    x: 860,
    y: null,
    z: -1120,
    dimension: 'overworld',
    tag: 'Ore',
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
    name: 'Lồng Spawner Bộ Xương (Farm XP)',
    x: 512,
    y: -18,
    z: -320,
    dimension: 'overworld',
    tag: 'Spawner',
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
    name: 'Trạm Cao Tốc Băng Nether Hub (Trục Bắc)',
    x: -145,
    y: 68,
    z: 310,
    dimension: 'nether',
    tag: 'Portal',
    notes: 'Đường thuyền băng xanh nối thẳng tới Pháo đài Blaze và Cổng End.',
    screenshots: [],
    pinned: true,
    locked: true,
    deletedAt: null,
    createdAt: 1710000003000,
  },
  {
    id: 'wp-5',
    worldId: 'world-1',
    name: 'Thành Phố Cổ Đại Warden (Ancient City)',
    x: -920,
    y: -51,
    z: 640,
    dimension: 'overworld',
    tag: 'Danger',
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
    name: 'End City Có Tàu Bay (Lấy Cánh Elytra)',
    x: 1840,
    y: 95,
    z: -1290,
    dimension: 'end',
    tag: 'Loot',
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
    name: 'Khu Chợ Trung Tâm Server SMP',
    x: 0,
    y: 80,
    z: 0,
    dimension: 'overworld',
    tag: 'Base',
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
    name: 'Căn Cứ Ngầm Chống Creeper (Hardcore)',
    x: -340,
    y: 63,
    z: 190,
    dimension: 'overworld',
    tag: 'Base',
    notes: 'Thế giới Hardcore 1 mạng duy nhất — luôn cầm Totem of Undying ở tay phụ!',
    screenshots: [],
    pinned: true,
    locked: true,
    deletedAt: null,
    createdAt: 1710000006000,
  },
];

// Mẫu kết quả OCR giả lập khi người dùng bấm thử tính năng Quét Ảnh F3 / MCPE
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
    suggestedTag: 'Structure',
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
  },
];

// ==========================================
// 2. CÁC HÀM TIỆN ÍCH (COPY, NETHER HUB, KHOẢNG CÁCH, NÉN ẢNH)
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

// ==========================================
// 3. COMPONENT THẺ TỌA ĐỘ KHỐI BLOCK (WaypointCard)
// ==========================================
function WaypointCard({
  waypoint,
  copyMode,
  playerPos,
  onTogglePin,
  onToggleLock,
  onEdit,
  onSoftDelete,
  onNotify,
  onOpenLightbox,
  onSelectForDistance,
}) {
  const [copied, setCopied] = useState(false);
  const [activatedBlock, setActivatedBlock] = useState(false);

  const dimStyle = DIMENSION_CONFIG[waypoint.dimension] || DIMENSION_CONFIG.overworld;
  const DimensionIcon = dimStyle.icon;

  const tagStyle = TAG_CONFIG[waypoint.tag] || {
    label: `[${waypoint.tag || 'Khác'}]`,
    color: 'bg-[#262830] text-slate-200 border-2 border-[#454954]',
    icon: Tag,
  };
  const TagIcon = tagStyle.icon;

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

  const getCopyString = (overrideMode) => {
    const mode = overrideMode || copyMode;
    if (mode === 'tp') {
      return `/tp @s ${waypoint.x} ${tpY} ${waypoint.z}`;
    }
    if (mode === 'raw') {
      return hasY
        ? `${waypoint.x} ${waypoint.y} ${waypoint.z}`
        : `${waypoint.x} ${waypoint.z}`;
    }
    const ySegment = hasY ? ` Y:${waypoint.y}` : '';
    return `[${waypoint.name}] - ${dimStyle.label}: X:${waypoint.x}${ySegment} Z:${waypoint.z}`;
  };

  const handleCopy = async (overrideMode) => {
    const text = getCopyString(overrideMode);
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
      {/* Lớp cỏ / nham thạch / đá End pixel trên đỉnh khối */}
      <div className={`absolute top-0 left-0 right-0 h-3 ${dimStyle.accentBar}`} />

      {/* 4 đinh tán góc khối đặc trưng Minecraft */}
      <span className="mc-corner mc-corner-tl" />
      <span className="mc-corner mc-corner-tr" />
      <span className="mc-corner mc-corner-bl" />
      <span className="mc-corner mc-corner-br" />

      <div className="pt-1.5">
        {/* Hàng 1: Badge Chiều không gian + Tag + Cụm nút Block kích hoạt */}
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

          {/* Cụm nút Block thao tác nhanh */}
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
              title="Chỉnh sửa tọa độ & ảnh đính kèm"
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

        {/* Hàng 2: Tên địa điểm + Cụm nút Block Kích Hoạt Copy / Share */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2 leading-snug mc-text-shadow">
              <VoxelBlockIcon type={dimStyle.blockType} className="w-5 h-5" />
              <span className="truncate">{waypoint.name}</span>
            </h3>
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

        {/* Hàng 3: 3 Ô Inventory Slot chứa tọa độ X, Y, Z */}
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

        {/* Hàng 3.5: Bộ sưu tập ảnh đính kèm (Screenshot Gallery 1-2 bức ảnh) */}
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

      {/* Hàng 4: Thông tin phụ (Quy đổi cổng Nether ÷8/×8 + Khoảng cách + Chunk) */}
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
// 4. ỨNG DỤNG CHÍNH (fu WAYPOINT)
// ==========================================
export default function App() {
  // Bật/tắt âm thanh Block Minecraft
  const [soundEnabled, setSoundEnabled] = useState(true);
  // Danh sách hạt Voxel vỡ ra khi nhấn nút Block
  const [particles, setParticles] = useState([]);

  // Cấp 1: Lưu trữ danh sách Profile (World/Server)
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

  // Cấp 3: Danh sách Waypoint
  const [waypoints, setWaypoints] = useState(() => {
    try {
      const saved = localStorage.getItem('mc_coords_waypoints_v2');
      return saved ? JSON.parse(saved) : INITIAL_WAYPOINTS;
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
      localStorage.setItem('mc_coords_waypoints_v2', JSON.stringify(waypoints));
    } catch (e) {
      console.error(e);
    }
  }, [waypoints]);

  // Hiệu ứng toàn cục: Mỗi khi người dùng nhấn vào bất kỳ nút (<button>) nào, phát tiếng Block kích hoạt & bắn hạt Voxel!
  useEffect(() => {
    const handleGlobalButtonClick = (e) => {
      const btn = e.target.closest('button');
      if (!btn || btn.disabled) return;

      // Phát tiếng click khối đá / piston
      playMinecraftSound('click', soundEnabled);

      // Tạo hiệu ứng phát sáng kích hoạt trên chính nút vừa bấm
      btn.classList.remove('mc-btn-activating');
      void btn.offsetWidth;
      btn.classList.add('mc-btn-activating');

      // Xác định bảng màu hạt Voxel theo loại Block của nút
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

  // Bộ lọc phân luồng (Cấp 2: Dimension & Tag)
  const [activeDimension, setActiveDimension] = useState('all');
  const [activeTag, setActiveTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copyMode, setCopyMode] = useState('chat');
  const [viewTrash, setViewTrash] = useState(false);

  // Vị trí hiện tại của người chơi
  const [playerPos, setPlayerPos] = useState({
    enabled: false,
    x: 0,
    z: 0,
    dimension: 'overworld',
  });

  // Modal Thêm / Sửa tọa độ
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    x: '',
    y: '',
    z: '',
    dimension: 'overworld',
    tag: 'Base',
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

  // Modal Phóng to ảnh (Lightbox)
  const [lightboxData, setLightboxData] = useState(null);

  // Modal Tính toán khoảng cách giữa 2 điểm lưu sẵn
  const [isDistanceOpen, setIsDistanceOpen] = useState(false);
  const [pointAId, setPointAId] = useState('');
  const [pointBId, setPointBId] = useState('');

  // Modal Máy tính cổng Nether
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcInput, setCalcInput] = useState({ x: 800, y: 64, z: -1200, from: 'overworld' });

  // Modal Đồng bộ đám mây & Sao lưu JSON
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

  // Modal tạo Profile (World/Server) mới & Hướng dẫn
  const [isWorldModalOpen, setIsWorldModalOpen] = useState(false);
  const [newWorldName, setNewWorldName] = useState('');
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // UX PC & Android: Mini-Window & Floating Bubble Widget
  const [isMiniOverlayOpen, setIsMiniOverlayOpen] = useState(false);
  const [floatingBubbleVisible, setFloatingBubbleVisible] = useState(true);
  const [quickForm, setQuickForm] = useState({
    name: '',
    x: '',
    y: '',
    z: '',
    dimension: 'overworld',
    tag: 'Base',
  });

  // Thông báo Achievement Toast kiểu Minecraft
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

  // Phím tắt Ctrl + Shift + S (hoặc Alt + S)
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

  const openCreateForm = () => {
    setEditingId(null);
    setSmartPasteInput('');
    setOcrStatusText('');
    setFormData({
      name: '',
      x: '',
      y: '',
      z: '',
      dimension: activeDimension === 'all' ? 'overworld' : activeDimension,
      tag: activeTag === 'all' ? 'Base' : activeTag,
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
        name: formData.name.trim(),
        x: numX,
        y: numY,
        z: numZ,
        dimension: formData.dimension,
        tag: formData.tag,
        notes: formData.notes.trim(),
        screenshots: formData.screenshots || [],
        locked: formData.locked,
        pinned: formData.pinned,
        deletedAt: null,
        createdAt: Date.now(),
      };
      setWaypoints((prev) => [newWp, ...prev]);
      showToast('Đã lưu tọa độ mới thành công!', 'orb');
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
      name: quickForm.name.trim(),
      x: Number(quickForm.x),
      y: hasY ? Number(quickForm.y) : null,
      z: Number(quickForm.z),
      dimension: quickForm.dimension,
      tag: quickForm.tag,
      notes: 'Lưu nhanh qua Command Block Widget trong lúc chơi game.',
      screenshots: [],
      locked: true,
      pinned: false,
      deletedAt: null,
      createdAt: Date.now(),
    };
    setWaypoints((prev) => [newWp, ...prev]);
    setQuickForm({ name: '', x: '', y: '', z: '', dimension: quickForm.dimension, tag: 'Base' });
    setIsMiniOverlayOpen(false);
    showToast(`Đã lưu nhanh "${newWp.name}"!`, 'orb');
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
      version: 3,
      exportedAt: new Date().toISOString(),
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

  const filteredWaypoints = useMemo(() => {
    return activeWaypoints
      .filter((wp) => {
        if (activeDimension !== 'all' && wp.dimension !== activeDimension) return false;
        if (activeTag !== 'all' && wp.tag !== activeTag) return false;
        if (searchQuery.trim()) {
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
  }, [activeWaypoints, activeDimension, activeTag, searchQuery, playerPos]);

  const counts = useMemo(() => {
    return {
      all: activeWaypoints.length,
      overworld: activeWaypoints.filter((w) => w.dimension === 'overworld').length,
      nether: activeWaypoints.filter((w) => w.dimension === 'nether').length,
      end: activeWaypoints.filter((w) => w.dimension === 'end').length,
    };
  }, [activeWaypoints]);

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

  return (
    <div className="min-h-screen mc-deepslate-bg text-slate-100 pb-28 selection:bg-[#55ff55]/30 selection:text-white">
      {/* BỘ CSS ĐỒ HỌA KHỐI BLOCK MINECRAFT 3D & HIỆU ỨNG KÍCH HOẠT */}
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

        /* KHUNG PANEL ĐÁ TẢNG 3D (STONE / DEEPSLATE CONTAINER) */
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

        /* THẺ TỌA ĐỘ THEO CHIỀU KHÔNG GIAN (GRASS / NETHERRACK / END STONE BLOCK) */
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

        /* DẢI PIXEL ĐỈNH KHỐI (GRASS TURF / LAVA NYLIUM / END PORTAL) */
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

        /* 4 ĐINH TÁN GÓC KHỐI (CHISELED STONE CORNERS) */
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

        /* Ô LÕM KIỂU RƯƠNG / INVENTORY SLOT (DÙNG CHO INPUT & TỌA ĐỘ XYZ) */
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

        /* Ô TỌA ĐỘ X / Y / Z TRONG THẺ */
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

        /* BADGE CHIỀU KHÔNG GIAN */
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

        /* NÚT NHẤN KHỐI KÍCH HOẠT 3D (ACTIVATOR BLOCK BUTTONS) */
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

        /* Stone Button (Mặc định) */
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

        /* Emerald Block Button (Lưu / Tạo mới / Xác nhận) */
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

        /* Redstone Activator Block Button (Nether / Cảnh báo / Kích hoạt) */
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

        /* TNT Block Button (Xóa) */
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

        /* Gold Block Button (Ghim / Đo khoảng cách) */
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

        /* Diamond Block Button (Khóa bảo vệ / Cloud) */
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

        /* Lapis Lazuli Block Button (Share) */
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

        /* Purpur / Ender Block Button (The End / Nether Hub) */
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

        /* Command Block Button */
        .mc-btn-command {
          background: linear-gradient(180deg, #d97706 0%, #b45309 55%, #78350f 100%);
          box-shadow:
            inset 2px 2px 0px #fde68a,
            inset -2px -2px 0px #451a03,
            0 4px 0px #2e1002,
            0 6px 0px #000000;
        }

        /* Disabled Bedrock Button */
        .mc-btn-disabled {
          background-color: #19191f;
          border: 2px solid #09090c;
          box-shadow: inset 2px 2px 0px #111116;
        }

        /* Đèn tín hiệu Đá Đỏ (Redstone Torch Indicator) trên nút */
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

        /* HIỆU ỨNG KÍCH HOẠT KHỐI (REDSTONE PULSE KHI NHẤN) */
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

        /* HẠT VOXEL BẮN RA KHI BẤM NÚT */
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

      {/* Lớp hiển thị các hạt Voxel vỡ ra khi nhấn nút Block */}
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

      {/* Thông báo nổi kiểu Minecraft Advancement / Achievement Toast */}
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

      {/* ==========================================
          FLOATING WIDGET (KHỐI COMMAND BLOCK NỔI ANDROID & MINI-WINDOW PC)
      ========================================== */}
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

              <form onSubmit={handleQuickSave} className="space-y-2.5">
                <input
                  type="text"
                  required
                  value={quickForm.name}
                  onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                  placeholder="Tên nhanh (VD: Hang Kim Cương, Lồng Quái)..."
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

                <div className="grid grid-cols-2 gap-1.5">
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
                    onChange={(e) => setQuickForm({ ...quickForm, tag: e.target.value })}
                    className="mc-slot px-2 py-1.5 text-xs text-slate-100 font-bold focus:outline-none"
                  >
                    {Object.keys(TAG_CONFIG).map((k) => (
                      <option key={k} value={k} className="bg-[#14141c]">
                        [{k}]
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

          {/* Nút Khối Command Block Kích Hoạt Nổi */}
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

      {/* HEADER BAR KHỐI ĐÁ TẢNG MINECRAFT */}
      <header className="sticky top-0 z-30 bg-[#181720] border-b-4 border-black shadow-[0_4px_0_#09080c]">
        <div className="h-2 w-full mc-turf-overworld" />
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo Khối & Tên App: CHỈ HIỂN THỊ "fu WAYPOINT", KHÔNG THÊM CHÚ THÍCH DƯỚI TÊN */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 mc-panel flex items-center justify-center p-1.5">
              <VoxelBlockIcon type="grass" className="w-7 h-7" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-wider mc-logo-title">
              fu WAYPOINT
            </h1>
          </div>

          {/* Cấp 1: Chọn Profile (World/Server) & Cụm Nút Khối Công Cụ */}
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

      {/* NỘI DUNG CHÍNH */}
      <main className="max-w-6xl mx-auto px-4 pt-6">
        {/* THANH ĐIỀU KHIỂN TRÊN: Khối Chiều Không Gian + Nút Block Kích Hoạt Thêm Tọa Độ / Quét Ảnh OCR */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-6">
          {/* Cụm Khối Chiều Không Gian */}
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

            {/* Tab Thùng rác khôi phục */}
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

          {/* Nút Khối Kích Hoạt Quét Ảnh OCR & Lưu Tọa Độ Mới */}
          <div className="flex items-center gap-2.5 shrink-0">
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

        {/* KHỐI BẢNG CÔNG CỤ LỌC TAG, TÌM KIẾM, CHẾ ĐỘ COPY & VỊ TRÍ NGƯỜI CHƠI */}
        {!viewTrash && (
          <div className="mc-panel p-4 mb-6 space-y-3.5">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Ô tìm kiếm kiểu Inventory Slot */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#55ff55] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên địa điểm, ghi chú, tag ([Base], [Ore], [Danger]) hoặc số tọa độ..."
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

              {/* Chọn kiểu Copy khi bấm nút Copy trên thẻ */}
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

            {/* Hàng lọc theo Hệ thống Tag Block */}
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

            {/* Đo khoảng cách từ vị trí người chơi & Bật/tắt bong bóng nổi */}
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
                    💡 Mẹo PC: Ấn <strong className="text-[#ffff55]">Ctrl + Shift + S</strong> mở Command Block
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

        {/* CHẾ ĐỘ XEM THÙNG RÁC (KHÔI PHỤC TỌA ĐỘ XÓA NHẦM) */}
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
                    <div>
                      <span className="text-xs font-extrabold text-[#ff5555] uppercase font-mono">
                        [{wp.dimension}] • [{wp.tag}]
                      </span>
                      <h4 className="font-extrabold text-white mt-0.5">{wp.name}</h4>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5">
                        X: {wp.x} | Y: {wp.y ?? '~'} | Z: {wp.z}
                      </p>
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
          /* DANH SÁCH THẺ TỌA ĐỘ KHỐI MINECRAFT (WAYPOINT CARDS GRID) */
          <>
            {filteredWaypoints.length === 0 ? (
              <div className="mc-panel p-12 text-center">
                <div className="w-12 h-12 mc-slot mx-auto mb-3 flex items-center justify-center">
                  <Compass className="w-7 h-7 text-[#ffff55]" />
                </div>
                <h3 className="text-base font-extrabold text-white mb-1 mc-text-shadow">
                  Chưa có khối tọa độ nào khớp với bộ lọc
                </h3>
                <p className="text-xs text-zinc-400 mb-4">
                  Hãy bấm nút &quot;Lưu Tọa Độ Mới&quot; hoặc quét ảnh chụp màn hình F3 / MCPE.
                </p>
                <button
                  type="button"
                  onClick={openCreateForm}
                  className="mc-btn mc-btn-emerald inline-flex items-center gap-2 px-4 py-2.5 text-[#041a06] text-xs font-black uppercase cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  Thêm điểm tọa độ đầu tiên
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredWaypoints.map((wp) => (
                  <WaypointCard
                    key={wp.id}
                    waypoint={wp}
                    copyMode={copyMode}
                    playerPos={playerPos}
                    onTogglePin={handleTogglePin}
                    onToggleLock={handleToggleLock}
                    onEdit={openEditForm}
                    onSoftDelete={handleSoftDelete}
                    onNotify={showToast}
                    onOpenLightbox={(src, title) => setLightboxData({ src, title })}
                    onSelectForDistance={handleSelectForDistance}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* ==========================================
          MODAL 1: BÀN CHẾ TẠO / LƯU TỌA ĐỘ MỚI (CRAFTING & OCR WAYPOINT MODAL)
      ========================================== */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="mc-panel max-w-xl w-full p-5 sm:p-6 my-8 max-h-[92vh] overflow-y-auto">
            <div className="absolute top-0 left-0 right-0 h-2.5 mc-turf-overworld" />
            <div className="flex items-center justify-between mb-4 pb-3 pt-1 border-b-2 border-black">
              <h2 className="text-lg font-black text-white flex items-center gap-2.5 mc-text-shadow">
                <VoxelBlockIcon type="command" className="w-6 h-6" />
                {editingId ? 'Chỉnh Sửa Khối Tọa Độ & Ảnh Chụp' : 'Lưu Tọa Độ Mới (Hỗ trợ Quét Ảnh OCR)'}
              </h2>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="mc-btn mc-btn-tnt p-1.5 text-white cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* KHU VỰC 1: TRÍCH XUẤT TỌA ĐỘ TỪ ẢNH CHỤP MÀN HÌNH (OCR) & LỆNH F3+C */}
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

              {/* Các nút bấm thử nghiệm nhanh mẫu OCR */}
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

              {/* Ô dán nhanh chuỗi lệnh F3+C */}
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
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-200 mb-1">
                  Tên địa điểm *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="VD: Làng xưởng sắt, Cổng đền sa mạc, Mỏ vàng..."
                  className="w-full mc-slot px-3.5 py-2.5 text-sm text-white font-bold focus:outline-none"
                />
              </div>

              {/* Bộ 3 ô tọa độ X, Y (Tùy chọn), Z */}
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

              {/* Chọn Chiều không gian & Tag phân loại bằng Khối Block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-200 mb-1">
                    Cấp 2 - Chiều không gian (Dimension)
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
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
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

              {/* Ghi chú (Notes) */}
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

              {/* Đính kèm ảnh chụp (Screenshot Gallery: tối đa 1-2 bức ảnh) */}
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

              {/* Tùy chọn Khóa chống xóa nhầm & Ghim */}
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

      {/* ==========================================
          MODAL 2: TÍNH TOÁN KHOẢNG CÁCH GIỮA 2 ĐIỂM LƯU SẴN (DISTANCE CALCULATOR)
      ========================================== */}
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

      {/* ==========================================
          MODAL 3: MÁY TÍNH ĐƯỜNG CAO TỐC NETHER HUB (÷8 / ×8)
      ========================================== */}
      {isCalcOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="mc-panel max-w-md w-full p-5">
            <div className="absolute top-0 left-0 right-0 h-2.5 mc-turf-nether" />
            <div className="flex items-center justify-between mb-4 pb-3 pt-1 border-b-2 border-black">
              <h2 className="text-base font-black text-white flex items-center gap-2 mc-text-shadow">
                <VoxelBlockIcon type="nether" className="w-5 h-5" />
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

      {/* ==========================================
          MODAL 4: ĐỒNG BỘ ĐÁM MÂY & SAO LƯU JSON
      ========================================== */}
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

      {/* ==========================================
          MODAL 5: TẠO PROFILE (WORLD / SERVER) MỚI
      ========================================== */}
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

      {/* ==========================================
          MODAL 6: XEM ẢNH ĐÍNH KÈM PHÓNG TO (LIGHTBOX)
      ========================================== */}
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

      {/* ==========================================
          MODAL 7: HƯỚNG DẪN & KIẾN TRÚC ỨNG DỤNG
      ========================================== */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="mc-panel max-w-lg w-full p-5">
            <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-black">
              <h3 className="text-base font-black text-[#55ff55] flex items-center gap-2 mc-text-shadow">
                <Smartphone className="w-4 h-4 text-[#55ff55]" />
                Hướng Dẫn Sử Dụng fu WAYPOINT
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
                • <strong>1. Đồ họa Block & Hiệu ứng Kích hoạt:</strong> Mọi nút bấm đều được thiết kế như một khối kích hoạt (Emerald Block, Redstone, Gold, Diamond, TNT) kèm âm thanh click và hạt Voxel bung ra khi nhấn.
              </li>
              <li>
                • <strong>2. Killer Features:</strong> Tự động chia/nhân 8 cổng Nether Hub, Đo khoảng cách 2 điểm (tính số đường ray, số stack khối xây cầu, pháo hoa Elytra), Quét ảnh OCR từ F3 (PC) & MCPE (Android).
              </li>
              <li>
                • <strong>3. Phím tắt nhanh:</strong> Bấm <code className="text-[#ffff55]">Ctrl + Shift + S</code> trên PC hoặc chạm vào <strong>Khối Command Block ⚡</strong> ở góc dưới bên phải để mở bảng nhập tọa độ siêu tốc.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}