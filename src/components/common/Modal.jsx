import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(15,23,42,0.5)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div style={{
        background: '#fff', borderRadius: 20,
        boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
        width: '100%', maxWidth: 520,
        maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
        animation: 'fadeUp 0.2s ease both',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(99,102,241,0.08)',
          flexShrink: 0,
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e1b4b', margin: 0, fontFamily: 'Syne, sans-serif' }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'rgba(0,0,0,0.04)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#9ca3af', transition: 'all 0.18s',
            }}
          >
            <X size={16} />
          </button>
        </div>
        {/* Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '1.5rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
