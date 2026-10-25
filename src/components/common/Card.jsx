export default function Card({ children, className = '', hover = false, padding = true, admin = false }) {
  const base = admin ? 'a-card' : 's-card';
  const hoverClass = hover ? (admin ? 'a-card-hover' : 's-card-hover') : '';
  const paddingStyle = padding ? {} : { padding: 0 };
  return (
    <div className={`${base} ${hoverClass} ${className}`} style={paddingStyle}>
      {children}
    </div>
  );
}
