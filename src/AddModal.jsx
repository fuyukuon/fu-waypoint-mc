import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  MapPin,
  Globe,
  Flame,
  Sparkles,
  Home,
  Sprout,
  Skull,
  Compass,
  Landmark,
  Tag,
  Check,
  AlertCircle,
} from 'lucide-react';

const DIMENSIONS = [
  {
    id: 'Overworld',
    label: 'Overworld',
    icon: Globe,
    activeClass:
      'border-emerald-500/80 bg-emerald-500/15 text-emerald-300 shadow-[0_0_20px_-5px_rgba(16,185,129,0.35)]',
    iconClass: 'text-emerald-400',
  },
  {
    id: 'Nether',
    label: 'Nether',
    icon: Flame,
    activeClass:
      'border-orange-500/80 bg-orange-500/15 text-orange-300 shadow-[0_0_20px_-5px_rgba(249,115,22,0.35)]',
    iconClass: 'text-orange-400',
  },
  {
    id: 'The End',
    label: 'The End',
    icon: Sparkles,
    activeClass:
      'border-purple-500/80 bg-purple-500/15 text-purple-300 shadow-[0_0_20px_-5px_rgba(168,85,247,0.35)]',
    iconClass: 'text-purple-400',
  },
];

const TAGS = [
  { id: 'Base', label: 'Base', icon: Home },
  { id: 'Farm', label: 'Farm', icon: Sprout },
  { id: 'Spawner', label: 'Spawner', icon: Skull },
  { id: 'Portal', label: 'Portal', icon: Compass },
  { id: 'Village', label: 'Village', icon: Landmark },
  { id: 'Other', label: 'Khác', icon: Tag },
];

const INITIAL_FORM = {
  name: '',
  x: '',
  y: '64',
  z: '',
  dimension: 'Overworld',
  tag: 'Base',
};

export default function AddModal({
  isOpen = true,
  onClose = () => {},
  onAdd = () => {},
}) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      setError('Vui lòng nhập tên địa điểm.');
      return;
    }

    if (formData.x === '' || formData.y === '' || formData.z === '') {
      setError('Vui lòng nhập đầy đủ tọa độ X, Y, Z.');
      return;
    }

    const newCoord = {
      id: Date.now().toString(),
      name: trimmedName,
      x: Number(formData.x),
      y: Number(formData.y),
      z: Number(formData.z),
      dimension: formData.dimension,
      tag: formData.tag,
      createdAt: new Date().toISOString(),
    };

    onAdd(newCoord);
    setFormData(INITIAL_FORM);
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900 text-zinc-100 shadow-2xl"
          >
            {/* Top subtle glow bar */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h2 id="modal-title" className="text-lg font-semibold tracking-tight text-white">
                    Thêm tọa độ mới
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Lưu lại vị trí quan trọng trong thế giới Minecraft của bạn
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Đóng modal"
                className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-300"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Tên địa điểm */}
              <div className="space-y-2">
                <label
                  htmlFor="location-name"
                  className="block text-xs font-medium uppercase tracking-wider text-zinc-400"
                >
                  Tên địa điểm
                </label>
                <input
                  id="location-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="VD: Căn cứ chính, Farm Sắt, Cổng End..."
                  autoFocus
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {/* Tọa độ X, Y, Z */}
              <div className="space-y-2">
                <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Tọa độ (X / Y / Z)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {/* X */}
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-bold text-rose-400">
                      X
                    </span>
                    <input
                      type="number"
                      value={formData.x}
                      onChange={(e) => handleInputChange('x', e.target.value)}
                      placeholder="0"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/70 py-2.5 pl-8 pr-3 font-mono text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>

                  {/* Y */}
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-bold text-emerald-400">
                      Y
                    </span>
                    <input
                      type="number"
                      value={formData.y}
                      onChange={(e) => handleInputChange('y', e.target.value)}
                      placeholder="64"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/70 py-2.5 pl-8 pr-3 font-mono text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  {/* Z */}
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-bold text-sky-400">
                      Z
                    </span>
                    <input
                      type="number"
                      value={formData.z}
                      onChange={(e) => handleInputChange('z', e.target.value)}
                      placeholder="0"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/70 py-2.5 pl-8 pr-3 font-mono text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Chọn Dimension */}
              <div className="space-y-2">
                <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Dimension (Chiều không gian)
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {DIMENSIONS.map((dim) => {
                    const Icon = dim.icon;
                    const isSelected = formData.dimension === dim.id;
                    return (
                      <button
                        key={dim.id}
                        type="button"
                        onClick={() => handleInputChange('dimension', dim.id)}
                        className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition-all ${
                          isSelected
                            ? dim.activeClass
                            : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/60 hover:text-zinc-200'
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            isSelected ? dim.iconClass : 'text-zinc-500'
                          }`}
                        />
                        <span>{dim.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chọn Tag */}
              <div className="space-y-2">
                <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Phân loại (Tag)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TAGS.map((item) => {
                    const Icon = item.icon;
                    const isSelected = formData.tag === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleInputChange('tag', item.id)}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                          isSelected
                            ? 'border-emerald-500/70 bg-emerald-500/15 text-emerald-300'
                            : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/60 hover:text-zinc-200'
                        }`}
                      >
                        <Icon
                          className={`h-3.5 w-3.5 shrink-0 ${
                            isSelected ? 'text-emerald-400' : 'text-zinc-500'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-zinc-800/80 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-xl border border-zinc-700/80 bg-zinc-800/60 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                  Hủy
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-400 hover:to-teal-400"
                >
                  <Check className="h-4 w-4 stroke-[2.5]" />
                  <span>Lưu tọa độ</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}