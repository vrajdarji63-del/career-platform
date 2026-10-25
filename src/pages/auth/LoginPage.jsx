import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap, AlertCircle, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const perks = [
  'AI-powered career assessment',
  'Personalized skill gap analysis',
  'Custom learning roadmaps',
  'AI career advisor chatbot',
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate(result.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');
        .login-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'Inter', sans-serif;
        }
        @media (max-width: 900px) {
          .login-root { grid-template-columns: 1fr; }
          .login-left-panel { display: none; }
        }
        .login-left-panel {
          background: linear-gradient(145deg, #1a1060 0%, #2d2080 50%, #1a1060 100%);
          display: flex; flex-direction: column; justify-content: center;
          padding: 3rem; position: relative; overflow: hidden;
        }
        .login-left-panel::before {
          content: '';
          position: absolute; top: -100px; right: -100px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%);
        }
        .login-left-panel::after {
          content: '';
          position: absolute; bottom: -80px; left: -80px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%);
        }
        .login-right-panel {
          background: #f8f9ff;
          display: flex; flex-direction: column; justify-content: center;
          align-items: center; padding: 2rem;
        }
        .login-form-wrap { width: 100%; max-width: 400px; }
        .login-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; margin-bottom: 2rem;
        }
        .login-card {
          background: #fff;
          border-radius: 20px; padding: 2rem;
          box-shadow: 0 8px 40px rgba(99,102,241,0.12), 0 1px 4px rgba(0,0,0,0.04);
          border: 1px solid rgba(99,102,241,0.08);
        }
        .login-label {
          display: block; font-size: 0.78rem; font-weight: 700;
          color: #6b7280; margin-bottom: 6px;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .login-input-wrap { position: relative; }
        .login-icon-left {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          color: #9ca3af; display: flex; pointer-events: none;
        }
        .login-input {
          width: 100%; padding: 11px 14px 11px 40px;
          background: #f9fafb; border: 1.5px solid #e5e7eb;
          border-radius: 10px; color: #111827; font-size: 0.9rem;
          font-family: 'Inter', sans-serif; outline: none; box-sizing: border-box;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .login-input::placeholder { color: #d1d5db; }
        .login-input:focus {
          border-color: #6366f1;
          background: #fafbff;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .login-pw-btn {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; color: #9ca3af;
          display: flex; transition: color 0.2s; padding: 4px;
        }
        .login-pw-btn:hover { color: #6366f1; }
        .login-submit {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg,#6366f1,#7c3aed);
          border: none; border-radius: 12px; color: #fff;
          font-size: 0.95rem; font-weight: 700; cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(99,102,241,0.45); margin-top: 4px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .login-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(99,102,241,0.6);
        }
        .login-submit:disabled { opacity: 0.55; cursor: not-allowed; }
        .login-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .login-error {
          display: flex; align-items: center; gap: 8px;
          background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.18);
          color: #dc2626; font-size: 0.85rem;
          padding: 10px 14px; border-radius: 10px; margin-bottom: 1.25rem;
        }
        .stat-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 99px; padding: 5px 12px;
          font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.8);
        }
      `}</style>

      <div className="login-root">
        {/* Left panel */}
        <div className="login-left-panel">
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '3rem' }}>
              <div style={{
                width: 42, height: 42, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(99,102,241,0.6)',
              }}>
                <Zap size={20} color="#fff" />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.3px' }}>
                Career<span style={{ color: '#a5b4fc' }}>Path AI</span>
              </span>
            </div>

            {/* Heading */}
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: '1rem' }}>
              Your career journey<br />
              <span style={{
                background: 'linear-gradient(135deg, #a5b4fc, #c4b5fd)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>starts here.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontSize: '1rem', marginBottom: '2.5rem', maxWidth: 380 }}>
              Join 1,200+ students discovering their ideal career with AI-powered assessments and personalized roadmaps.
            </p>

            {/* Perks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2.5rem' }}>
              {perks.map((perk) => (
                <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 7,
                    background: 'rgba(99,102,241,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <CheckCircle2 size={12} color="#a5b4fc" />
                  </div>
                  {perk}
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div className="stat-pill">🚀 1,200+ Students</div>
              <div className="stat-pill">✅ Free to start</div>
              <div className="stat-pill">🎯 85% placement</div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="login-right-panel">
          <div className="login-form-wrap">
            {/* Mobile logo */}
            <Link to="/" className="login-logo">
              <div style={{
                width: 36, height: 36, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
              }}>
                <Zap size={17} color="#fff" />
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e1b4b', fontFamily: 'Syne, sans-serif' }}>
                Career<span style={{ color: '#6366f1' }}>Path AI</span>
              </span>
            </Link>

            {/* Heading */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e1b4b', fontFamily: 'Syne, sans-serif', margin: '0 0 6px', letterSpacing: '-0.4px' }}>
                Welcome back
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>Sign in to continue your career journey</p>
            </div>

            <div className="login-card">
              {error && (
                <div className="login-error">
                  <AlertCircle size={15} /> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                <div>
                  <label className="login-label">Email Address</label>
                  <div className="login-input-wrap">
                    <span className="login-icon-left"><Mail size={15} /></span>
                    <input
                      id="email"
                      type="email"
                      className="login-input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label className="login-label" style={{ margin: 0 }}>Password</label>
                    <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem', color: '#6366f1', fontWeight: 600, fontFamily: 'inherit' }}>
                      Forgot?
                    </button>
                  </div>
                  <div className="login-input-wrap">
                    <span className="login-icon-left"><Lock size={15} /></span>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className="login-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      style={{ paddingRight: 42 }}
                    />
                    <button type="button" className="login-pw-btn" onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="login-submit" disabled={loading}>
                  {loading ? (
                    <><span className="login-spinner" /> Signing in…</>
                  ) : (
                    <>Sign In <ArrowRight size={16} /></>
                  )}
                </button>
              </form>

              <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#9ca3af', marginTop: '1.25rem', margin: '1.25rem 0 0' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: '#6366f1', fontWeight: 700, textDecoration: 'none' }}>
                  Create one free
                </Link>
              </p>
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#d1d5db', marginTop: '1.75rem' }}>
              Admin?{' '}
              <Link to="/admin/login" style={{ color: '#9ca3af', textDecoration: 'none', fontWeight: 600 }}>
                Go to Admin Panel →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
