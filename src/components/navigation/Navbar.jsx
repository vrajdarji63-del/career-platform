import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (to) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: scrolled ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.72)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid rgba(99,102,241,0.1)' : '1px solid rgba(99,102,241,0.06)',
      fontFamily: 'Inter, sans-serif',
      transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      boxShadow: scrolled ? '0 4px 24px rgba(99,102,241,0.08)' : 'none',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem',
        height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex', alignItems: 'center', gap: 9,
            textDecoration: 'none', fontWeight: 800, fontSize: '1.1rem',
            color: '#1e1b4b', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.3px',
          }}
        >
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(99,102,241,0.45)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08) rotate(-5deg)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(99,102,241,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.45)'; }}
          >
            <Zap size={17} color="#fff" />
          </div>
          <span>Career<span style={{ color: '#6366f1' }}>Path AI</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="navbar-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: '7px 16px', borderRadius: 9, textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: isActive(link.to) ? 600 : 500,
                color: isActive(link.to) ? '#6366f1' : '#4b5563',
                background: isActive(link.to) ? 'rgba(99,102,241,0.08)' : 'transparent',
                transition: 'all 0.18s',
                position: 'relative',
              }}
              onMouseEnter={e => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.color = '#1e1b4b';
                  e.currentTarget.style.background = 'rgba(99,102,241,0.05)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.color = '#4b5563';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {link.label}
              {isActive(link.to) && (
                <span style={{
                  position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50%)',
                  width: '20px', height: '2px',
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  borderRadius: '99px',
                }} />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="navbar-desktop">
          <Link
            to="/login"
            style={{
              textDecoration: 'none', padding: '8px 18px', borderRadius: 9,
              fontSize: '0.875rem', fontWeight: 600, color: '#6366f1',
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.15)',
              cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.14)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; e.currentTarget.style.transform = ''; }}
          >
            Sign In
          </Link>
          <Link
            to="/register"
            style={{
              textDecoration: 'none', padding: '8px 20px', borderRadius: 9,
              fontSize: '0.875rem', fontWeight: 600, color: '#fff',
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(99,102,241,0.55)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.4)'; e.currentTarget.style.transform = ''; }}
          >
            Get Started →
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: open ? 'rgba(99,102,241,0.08)' : 'none', border: 'none', cursor: 'pointer',
            padding: '8px', borderRadius: 9, color: '#6366f1',
            display: 'flex', alignItems: 'center', transition: 'all 0.18s',
          }}
          className="navbar-mobile-toggle"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(99,102,241,0.08)',
          padding: '0.75rem 1.25rem 1.25rem',
          animation: 'fadeUp 0.2s ease both',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', padding: '11px 14px',
                borderRadius: 10, textDecoration: 'none',
                fontSize: '0.9rem', fontWeight: isActive(link.to) ? 600 : 500, marginBottom: 4,
                color: isActive(link.to) ? '#6366f1' : '#374151',
                background: isActive(link.to) ? 'rgba(99,102,241,0.08)' : 'transparent',
                transition: 'all 0.15s',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid rgba(99,102,241,0.08)', marginTop: 8 }}>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              style={{
                flex: 1, textAlign: 'center', textDecoration: 'none', padding: '11px',
                borderRadius: 10, fontSize: '0.9rem', fontWeight: 600, color: '#6366f1',
                background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)',
              }}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              style={{
                flex: 1, textAlign: 'center', textDecoration: 'none', padding: '11px',
                borderRadius: 10, fontSize: '0.9rem', fontWeight: 600, color: '#fff',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
