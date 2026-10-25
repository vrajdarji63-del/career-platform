export default function ProgressBar({ value = 0, color = 'indigo', size = 'md', showLabel = false, admin = false }) {
  const clamp = Math.min(100, Math.max(0, value));

  // Admin uses teal gradient
  const fill = admin
    ? 'linear-gradient(90deg,#14b8a6,#06b6d4)'
    : color === 'emerald'
      ? 'linear-gradient(90deg,#10b981,#34d399)'
      : color === 'amber'
        ? 'linear-gradient(90deg,#f59e0b,#fbbf24)'
        : color === 'red'
          ? 'linear-gradient(90deg,#ef4444,#f87171)'
          : 'linear-gradient(90deg,#6366f1,#8b5cf6)';

  const heights = { sm: 4, md: 6, lg: 8 };
  const h = heights[size] || 6;

  return (
    <div>
      <div style={{
        height: h, borderRadius: 99, overflow: 'hidden',
        background: admin ? 'rgba(20,184,166,0.1)' : 'rgba(99,102,241,0.1)',
      }}>
        <div style={{
          width: `${clamp}%`, height: '100%', borderRadius: 99,
          background: fill,
          transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
      {showLabel && (
        <p style={{ fontSize: '0.75rem', color: admin ? '#64748b' : '#6b7280', marginTop: 4, textAlign: 'right' }}>
          {clamp}%
        </p>
      )}
    </div>
  );
}
