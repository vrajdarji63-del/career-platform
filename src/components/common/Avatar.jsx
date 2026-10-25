export default function Avatar({ name, size = 'md', className = '' }) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  const sizes = {
    xs: 'w-7 h-7 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  return (
    <div
      className={`${sizes[size]} rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center flex-shrink-0 ${className}`}
    >
      {initials}
    </div>
  );
}
