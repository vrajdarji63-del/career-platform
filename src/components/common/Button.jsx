const variants = {
  primary:   's-btn s-btn-primary',
  secondary: 's-btn',
  outline:   's-btn s-btn-ghost',
  ghost:     's-btn s-btn-ghost',
  danger:    's-btn',
  // Admin variants
  'admin-primary': 'a-btn a-btn-primary',
  'admin-ghost':   'a-btn a-btn-ghost',
  'admin-danger':  'a-btn a-btn-danger',
};

const sizeStyles = {
  xs: { padding: '5px 12px', fontSize: '0.78rem' },
  sm: { padding: '7px 14px', fontSize: '0.82rem' },
  md: { padding: '9px 18px', fontSize: '0.875rem' },
  lg: { padding: '12px 22px', fontSize: '0.95rem' },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  style = {},
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${variants[variant] || variants.primary} ${className}`}
      style={{
        ...sizeStyles[size],
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transform: 'none',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
