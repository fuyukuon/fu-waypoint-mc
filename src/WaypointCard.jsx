import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
} from 'lucide-react';

const DIMENSION_STYLES = {
  overworld: {
    label: 'Overworld',
    border: 'border-emerald-500/80 hover:border-emerald-400',
    glow: 'hover:shadow-[0_0_20px_-4px_rgba(16,185,129,0.35)]',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
    accentBar: 'bg-emerald-500',
    icon: Compass,
  },
  nether: {
    label: 'Nether',
    border: 'border-red-500/80 hover:border-red-400',
    glow: 'hover:shadow-[0_0_20px_-4px_rgba(239,68,68,0.35)]',
    badge: 'bg-red-500/15 text-red-400 border-red-500/40',
    accentBar: 'bg-red-500',
    icon: Flame,
  },
  end: {
    label: 'The End',
    border: 'border-purple-500/80 hover:border-purple-400',
    glow: 'hover:shadow-[0_0_20px_-4px_rgba(168,85,247,0.4)]',
    badge: 'bg-purple-500/15 text-purple-400 border-purple-500/40',
    accentBar: 'bg-purple-500',
    icon: Sparkles,
  },
};

const TAG_STYLES = {
  base: {
    color: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    icon: Home,
  },
  farm: {
    color: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    icon: Wheat,
  },
  spawner: {
    color: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    icon: Skull,
  },
  mine: {
    color: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
    icon: Pickaxe,
  },
  default: {
    color: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    icon: Tag,
  },
};

export default function WaypointCard({
  waypoint,
  name = 'Căn Cứ Hắc Diện Thạch',
  x = 1240,
  y = 64,
  z = -850,
  dimension = 'Overworld',
  tag = 'Base',
  useTpCommand = false,
}) {
  const [copied, setCopied] = useState(false);

  // Hỗ trợ truyền qua prop `waypoint={{ ... }}` hoặc truyền từng prop rời
  const item = waypoint || { name, x, y, z, dimension, tag };
  const coordX = item.coordinates?.x ?? item.x ?? 0;
  const coordY = item.coordinates?.y ?? item.y ?? 64;
  const coordZ = item.coordinates?.z ?? item.z ?? 0;
  const locationName = item.name || 'Địa điểm chưa đặt tên';
  const rawDimension = String(item.dimension || 'overworld').toLowerCase();
  const rawTag = String(item.tag || 'Base');

  // Xác định theme màu viền theo Chiều không gian (Overworld / Nether / End)
  const dimensionKey = rawDimension.includes('nether')
    ? 'nether'
    : rawDimension.includes('end')
    ? 'end'
    : 'overworld';

  const dimStyle = DIMENSION_STYLES[dimensionKey];
  const DimensionIcon = dimStyle.icon;

  // Xác định màu và icon cho Tag (Base, Farm, Spawner...)
  const tagKey = rawTag.toLowerCase();
  const tagStyle = TAG_STYLES[tagKey] || TAG_STYLES.default;
  const TagIcon = tagStyle.icon;

  // Chuỗi tọa độ khi copy vào clipboard để dán vào khung chat trong game
  const copyText = useTpCommand
    ? `/tp @s ${coordX} ${coordY} ${coordZ}`
    : `${coordX} ${coordY} ${coordZ}`;

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(copyText);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = copyText;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Không thể copy tọa độ:', err);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.025, y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={`relative overflow-hidden rounded-xl bg-[#161920]/95 backdrop-blur-md border-2 p-5 text-slate-100 shadow-lg transition-colors duration-200 ${dimStyle.border} ${dimStyle.glow}`}
    >
      {/* Thanh điểm nhấn màu theo chiều không gian ở cạnh trên */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${dimStyle.accentBar} opacity-80`} />

      {/* Phần Header: Tên địa điểm + Huy hiệu Chiều không gian & Tag */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {/* Badge Chiều không gian */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${dimStyle.badge}`}
            >
              <DimensionIcon className="w-3.5 h-3.5" />
              {dimStyle.label}
            </span>

            {/* Badge Tag (Base, Farm, Spawner...) */}
            {rawTag && (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${tagStyle.color}`}
              >
                <TagIcon className="w-3 h-3" />
                {rawTag}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-50 truncate flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{locationName}</span>
          </h3>
        </div>

        {/* Nút Copy tọa độ */}
        <button
          type="button"
          onClick={handleCopy}
          title={`Copy tọa độ: ${copyText}`}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 shrink-0 cursor-pointer ${
            copied
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
              : 'bg-[#0f1117] hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:border-slate-500'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Đã lưu</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Khu vực hiển thị bộ tọa độ X, Y, Z */}
      <div className="grid grid-cols-3 gap-2.5 bg-[#0c0e13]/90 border border-slate-800/90 rounded-lg p-2.5 font-mono">
        <div className="flex flex-col items-center justify-center bg-[#141720] rounded-md py-1.5 px-2 border border-slate-800/60">
          <span className="text-[10px] uppercase tracking-wider font-bold text-rose-400">
            X (Đông/Tây)
          </span>
          <span className="text-sm sm:text-base font-bold text-slate-100 mt-0.5">
            {coordX}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#141720] rounded-md py-1.5 px-2 border border-slate-800/60">
          <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400">
            Y (Độ cao)
          </span>
          <span className="text-sm sm:text-base font-bold text-slate-100 mt-0.5">
            {coordY}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#141720] rounded-md py-1.5 px-2 border border-slate-800/60">
          <span className="text-[10px] uppercase tracking-wider font-bold text-sky-400">
            Z (Bắc/Nam)
          </span>
          <span className="text-sm sm:text-base font-bold text-slate-100 mt-0.5">
            {coordZ}
          </span>
        </div>
      </div>
    </motion.div>
  );
}