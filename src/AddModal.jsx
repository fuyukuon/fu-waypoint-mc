import React from 'react';
export default function AddModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
      <div className="bg-slate-900 p-6 rounded-xl">Add Modal</div>
    </div>
  );
}