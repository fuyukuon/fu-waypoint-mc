import React from 'react';
export default function WaypointCard({ waypoint }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
      <h4 className="font-bold text-white">{waypoint.name}</h4>
      <p className="text-xs text-emerald-400 font-mono">X: {waypoint.x}, Y: {waypoint.y}, Z: {waypoint.z}</p>
    </div>
  );
}