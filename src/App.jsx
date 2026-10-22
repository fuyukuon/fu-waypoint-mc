import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, Plus, Trash2, Folder, FolderPlus, FileText, Settings, 
  Volume2, VolumeX, Copy, Check, ChevronRight, ChevronDown, 
  Search, Skull, RefreshCw, AlertTriangle, Home, Sparkles, 
  Maximize2, Minimize2, ArrowUpRight, Shield, Heart, Eye, Edit2, X, Play
} from 'lucide-react';

// Web Audio API Sound Synthesizer (Minecraft style sounds)
const playSound = (type, enabled) => {
  if (!enabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'pop') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'chicken') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(250, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (e) {}
};

const ICONS = [
  { id: '🌍', name: 'Thế giới' }, { id: '🏠', name: 'Nhà chính' }, { id: '🏰', name: 'Lâu đài' },
  { id: '⛏️', name: 'Khu mỏ' }, { id: '🌾', name: 'Nông trại' }, { id: '🚪', name: 'Cổng Nether' },
  { id: '🐉', name: 'End Portal' }, { id: '📦', name: 'Kho đồ' }, { id: '🧪', name: 'Phòng thí nghiệm' },
  { id: '⚔️', name: 'Khu chiến đấu' }, { id: '💎', name: 'Quặng hiếm' }, { id: '🌲', name: 'Khu rừng' },
  { id: '🌊', name: 'Đại dương' }, { id: '🌋', name: 'Núi lửa' }, { id: '🐓', name: 'Chuồng gà' },
  { id: 'axolotl', name: 'Axolotl' }, { id: 'chicken_pixel', name: 'Gà Pixel' }
];

export default function App() {
  const [worlds, setWorlds] = useState([
    {
      id: 'w1',
      name: 'Survival Solo',
      trash: [],
      folders: [
        {
          id: 'f1',
          name: 'Nhà & Căn cứ chính',
          parentId: null,
          waypoints: [
            { id: 'wp1', name: 'Nhà chính chính giữa thung lũng hoa anh đào', x: 120, y: 64, z: -450, dim: 'Overworld', status: '✅ Đã xong', icon: '🏠', desc: 'Có kho chứa đồ tự động và lò nung siêu tốc' }
          ]
        }
      ]
    }
  ]);

  const [activeWorldId, setActiveWorldId] = useState('w1');
  const [uiMode, setUiMode] = useState('minecraft'); // 'minecraft' | 'win'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [petsEnabled, setPetsEnabled] = useState(true);
  
  // Modals & drawers
  const [activeFolderId, setActiveFolderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isWorldManagerOpen, setIsWorldManagerOpen] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Death point timer state (5:00 minutes = 300 seconds)
  const [deathTimer, setDeathTimer] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(300);

  // Pets & Scenery animation state
  const [animals, setAnimals] = useState([
    { id: 1, type: 'mother', x: 150, y: 50, dir: 1, action: 'walk', eggs: 0 },
    { id: 2, type: 'baby', x: 130, y: 55, dir: 1, action: 'follow' },
    { id: 3, type: 'axolotl', x: 300, y: 80, dir: -1, action: 'swim' }
  ]);

  // Timer effect for death point
  useEffect(() => {
    let interval = null;
    if (deathTimer && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => {
          if (s <= 1) {
            setDeathTimer(null);
            return 300;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [deathTimer, timerSeconds]);

  // Animal movement simulation & laying eggs
  useEffect(() => {
    if (!petsEnabled) return;
    const interval = setInterval(() => {
      setAnimals(prev => prev.map(anim => {
        let newX = anim.x + (anim.dir * 2);
        let newDir = anim.dir;
        if (newX > window.innerWidth - 100 || newX < 50) {
          newDir *= -1;
        }
        return {
          ...anim,
          x: newX,
          dir: newDir
        };
      }));
    }, 100);
    return () => clearInterval(interval);
  }, [petsEnabled]);

  const activeWorld = worlds.find(w => w.id === activeWorldId) || worlds[0];

  const handleAddWaypoint = (wpData) => {
    playSound('pop', soundEnabled);
    setWorlds(worlds.map(w => {
      if (w.id !== activeWorldId) return w;
      return {
        ...w,
        folders: w.folders.map(f => {
          if (f.id !== (activeFolderId || w.folders[0]?.id)) return f;
          return {
            ...f,
            waypoints: [...f.waypoints, { id: 'wp_' + Date.now(), ...wpData }]
          };
        })
      };
    }));
    setIsAddModalOpen(false);
  };

  const handleCreateFolder = (name, parentId = null) => {
    playSound('click', soundEnabled);
    setWorlds(worlds.map(w => {
      if (w.id !== activeWorldId) return w;
      return {
        ...w,
        folders: [...w.folders, { id: 'f_' + Date.now(), name, parentId, waypoints: [] }]
      };
    }));
  };

  const recordDeathPoint = () => {
    playSound('pop', soundEnabled);
    const coords = { x: Math.floor(Math.random() * 1000), y: 68, z: Math.floor(Math.random() * 1000) };
    setDeathTimer(coords);
    setTimerSeconds(300);
    // Auto add to death folder if exists or root folder
    setWorlds(worlds.map(w => {
      if (w.id !== activeWorldId) return w;
      let targetFolder = w.folders.find(f => f.name.includes('Điểm Chết')) || w.folders[0];
      return {
        ...w,
        folders: w.folders.map(f => f.id === targetFolder.id ? {
          ...f,
          waypoints: [...f.waypoints, { id: 'death_' + Date.now(), name: '💀 Điểm Tử Vong Gần Nhất', x: coords.x, y: coords.y, z: coords.z, dim: 'Overworld', status: '📌 Cần đi', icon: '💀', desc: 'Tự động lưu khi bấm nút Điểm Chết' }]
        } : f)
      };
    }));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-600 p-2 rounded-xl shadow-inner flex items-center space-x-2">
            <Compass className="w-6 h-6 text-white animate-spin-slow" />
            <span className="font-bold text-lg tracking-wider text-white">fu-WAYPOINT</span>
          </div>

          {/* World Selector */}
          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-xs text-emerald-400 font-semibold uppercase">World:</span>
            <select 
              value={activeWorldId} 
              onChange={(e) => setActiveWorldId(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-sm"
            >
              {worlds.map(w => (
                <option key={w.id} value={w.id} className="bg-slate-900 text-white">{w.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Toolbar Actions */}
        <div className="flex items-center space-x-2">
          {/* Death Timer Shortcut */}
          <button 
            onClick={recordDeathPoint}
            className="flex items-center space-x-1.5 bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-700/60 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow"
            title="Lưu vị trí tử vong và đếm ngược 5 phút nhặt đồ"
          >
            <Skull className="w-4 h-4 text-red-400 animate-pulse" />
            <span>{deathTimer ? `⏱️ ${formatTime(timerSeconds)}` : 'Điểm Chết'}</span>
          </button>

          {/* UI Mode Toggle */}
          <button 
            onClick={() => {
              playSound('click', soundEnabled);
              setUiMode(m => m === 'minecraft' ? 'win' : 'minecraft');
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              uiMode === 'win' 
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Folder className="w-4 h-4" />
            <span>{uiMode === 'win' ? 'Giao diện Win Explorer' : 'Giao diện Minecraft'}</span>
          </button>

          {/* Sound Toggle */}
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 border border-slate-700 transition"
            title="Bật/Tắt âm thanh"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Pets & FX Toggle */}
          <button 
            onClick={() => setPetsEnabled(!petsEnabled)}
            className={`p-2 rounded-lg border transition ${petsEnabled ? 'bg-emerald-900/50 border-emerald-600 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
            title="Bật/Tắt Gà & Axolotl đi dạo"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {uiMode === 'win' ? (
          /* Windows Explorer UI Mode */
          <div className="flex-1 flex bg-slate-900/80">
            {/* Left Tree Sidebar */}
            <div className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col p-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2 flex justify-between items-center">
                <span>Cây thư mục World</span>
                <button 
                  onClick={() => {
                    const name = prompt('Nhập tên thư mục mới:');
                    if (name) handleCreateFolder(name);
                  }}
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-bold"
                >
                  +
                </button>
              </div>
              <div className="space-y-1 overflow-y-auto flex-1">
                {activeWorld.folders.map(f => (
                  <button
                    key={f.id}
                    onClick={() => {
                      playSound('click', soundEnabled);
                      setActiveFolderId(f.id);
                    }}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition truncate ${
                      (activeFolderId || activeWorld.folders[0]?.id) === f.id 
                        ? 'bg-blue-600 text-white font-medium shadow' 
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <Folder className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Explorer Pane */}
            <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
              {/* Breadcrumb path bar */}
              <div className="bg-slate-950 border-b border-slate-800 px-4 py-2 flex items-center space-x-2 text-xs text-slate-400">
                <Home className="w-3.5 h-3.5 text-blue-400" />
                <span>This PC</span>
                <span>\</span>
                <span className="text-white font-medium">{activeWorld.name}</span>
                <span>\</span>
                <span className="text-emerald-400 font-semibold truncate">
                  {activeWorld.folders.find(f => f.id === (activeFolderId || activeWorld.folders[0]?.id))?.name || 'Thư mục'}
                </span>
              </div>

              {/* Toolbar for Win mode */}
              <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm Tọa Độ</span>
                  </button>
                  <button 
                    onClick={() => {
                      const name = prompt('Nhập tên thư mục con:');
                      if (name) handleCreateFolder(name, activeFolderId);
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 border border-slate-700"
                  >
                    <FolderPlus className="w-4 h-4 text-amber-400" />
                    <span>Thư mục con</span>
                  </button>
                </div>
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input 
                    type="text"
                    placeholder="Tìm tọa độ nhanh..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 truncate"
                  />
                </div>
              </div>

              {/* Table list view with fixed table to prevent overflow */}
              <div className="flex-1 overflow-auto p-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                  <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">Icon</th>
                        <th className="py-3 px-4 w-1/3">Tên Tọa Độ</th>
                        <th className="py-3 px-4 w-44">Tọa độ (X, Y, Z)</th>
                        <th className="py-3 px-4 w-32">Trạng thái</th>
                        <th className="py-3 px-4">Ghi chú</th>
                        <th className="py-3 px-4 w-24 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-sm">
                      {activeWorld.folders
                        .find(f => f.id === (activeFolderId || activeWorld.folders[0]?.id))
                        ?.waypoints
                        .filter(wp => wp.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(wp => (
                          <tr key={wp.id} className="hover:bg-slate-900/60 transition group">
                            <td className="py-3 px-4 text-center text-xl">{wp.icon || '📍'}</td>
                            <td className="py-3 px-4 font-medium text-white truncate">{wp.name}</td>
                            <td className="py-3 px-4 font-mono text-emerald-400 text-xs">
                              X: {wp.x}, Y: {wp.y}, Z: {wp.z}
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                                {wp.status || '✅ Đã xong'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-400 text-xs truncate">{wp.desc || 'Không có ghi chú'}</td>
                            <td className="py-3 px-4 text-right">
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(`/execute in minecraft:${wp.dim.toLowerCase()} run tp @s ${wp.x} ${wp.y} ${wp.z}`);
                                  setCopiedId(wp.id);
                                  setTimeout(() => setCopiedId(null), 2000);
                                  playSound('pop', soundEnabled);
                                }}
                                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded text-xs font-medium border border-slate-700 transition"
                              >
                                {copiedId === wp.id ? '✓ Đã chép' : 'Copy TP'}
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Minecraft Classic Theme Mode */
          <div className="flex-1 flex flex-col bg-slate-950 p-6 overflow-y-auto">
            <div className="max-w-5xl mx-auto w-full space-y-6">
              {/* Header banner */}
              <div className="bg-gradient-to-r from-emerald-900/40 via-slate-900 to-slate-900 border border-emerald-800/60 p-6 rounded-2xl shadow-2xl flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black text-white flex items-center space-x-2">
                    <span>{activeWorld.name}</span>
                    <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-md font-mono">Minecraft UI</span>
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">Quản lý waypoint siêu tốc phong cách khối hộp chuẩn Minecraft</p>
                </div>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg transition transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  <span>Thêm Waypoint Mới</span>
                </button>
              </div>

              {/* Waypoints Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeWorld.folders[0]?.waypoints.map(wp => (
                  <div key={wp.id} className="bg-slate-900 border border-slate-800 hover:border-emerald-600/50 p-5 rounded-xl shadow-lg transition flex flex-col justify-between space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl bg-slate-950 p-2.5 rounded-lg border border-slate-800">{wp.icon || '📍'}</span>
                        <div>
                          <h3 className="font-bold text-white text-base line-clamp-1">{wp.name}</h3>
                          <span className="text-xs text-emerald-400 font-mono font-semibold">{wp.dim}</span>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">{wp.status}</span>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 font-mono text-emerald-400 text-sm flex justify-between items-center">
                      <span>X: {wp.x} | Y: {wp.y} | Z: {wp.z}</span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(`/execute in minecraft:${wp.dim.toLowerCase()} run tp @s ${wp.x} ${wp.y} ${wp.z}`);
                          playSound('pop', soundEnabled);
                        }}
                        className="text-slate-400 hover:text-white p-1"
                        title="Copy lệnh TP"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2">{wp.desc || 'Không có mô tả chi tiết'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scenery & Pets Footer Bar (Minecraft Chickens & Axolotl animation) */}
      {petsEnabled && (
        <div className="h-20 bg-slate-900 border-t border-slate-800 relative overflow-hidden flex items-center px-4">
          {/* Environment scenery background elements */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-emerald-900/40 border-t border-emerald-700/40 flex items-center justify-around px-8">
            <span className="text-xs text-emerald-300">🌲 Cây Sồi</span>
            <span className="text-xs text-cyan-300">🌊 Hồ Nước Axolotl</span>
            <span className="text-xs text-pink-300">🌸 Khóm Hoa</span>
            <span className="text-xs text-emerald-300">🌲 Cây Anh Đào</span>
          </div>

          {/* Animated Animals (No name tag as requested) */}
          {animals.map(anim => (
            <div 
              key={anim.id}
              className="absolute bottom-3 cursor-pointer transition-transform duration-100 hover:scale-125"
              style={{ left: `${anim.x}px` }}
              onClick={() => {
                playSound('chicken', soundEnabled);
                if (anim.type === 'mother') {
                  // Lay egg & hatch baby chick
                  setAnimals(list => [
                    ...list,
                    { id: Date.now(), type: 'baby', x: anim.x + 20, y: 55, dir: anim.dir, action: 'follow' }
                  ]);
                }
              }}
            >
              <span className="text-3xl filter drop-shadow">
                {anim.type === 'mother' ? '🐓' : anim.type === 'baby' ? '🐥' : '🦎'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Add Waypoint Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                <span>Thêm Tọa Độ Mới</span>
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              handleAddWaypoint({
                name: form.wpName.value,
                x: Number(form.wpX.value),
                y: Number(form.wpY.value),
                z: Number(form.wpZ.value),
                dim: form.wpDim.value,
                status: form.wpStatus.value,
                icon: form.wpIcon.value,
                desc: form.wpDesc.value
              });
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Tên Tọa Độ</label>
                <input name="wpName" required placeholder="Ví dụ: Đền Thờ Sa Mạc" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">X</label>
                  <input name="wpX" type="number" required defaultValue="0" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Y</label>
                  <input name="wpY" type="number" required defaultValue="64" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Z</label>
                  <input name="wpZ" type="number" required defaultValue="0" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Chiều không gian</label>
                  <select name="wpDim" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white">
                    <option value="Overworld">Overworld</option>
                    <option value="Nether">Nether</option>
                    <option value="End">The End</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Trạng thái</label>
                  <select name="wpStatus" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white">
                    <option value="✅ Đã xong">✅ Đã xong</option>
                    <option value="🔨 Đang xây">🔨 Đang xây</option>
                    <option value="📌 Cần đi">📌 Cần đi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Icon Biểu Tượng</label>
                <select name="wpIcon" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white">
                  {ICONS.map(i => (
                    <option key={i.id} value={i.id}>{i.id} {i.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Ghi chú chi tiết</label>
                <textarea name="wpDesc" rows="2" placeholder="Ghi chú về công trình hoặc vật phẩm..." className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white resize-none" />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium text-slate-300">Hủy</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold text-white shadow">Lưu Waypoint</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}