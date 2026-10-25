import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, AlertCircle, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLoginPage() {
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
    if (result.success && result.user.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (result.success) {
      setError('Access denied. Admin credentials required.');
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap');
        .adm-bg {
          min-height: 100vh;
          background: linear-gradient(135deg,#020817 0%,#0a1628 50%,#071220 100%);
          display: flex; align-items: center; justify-content: center;
          padding: 2rem 1rem; font-family: 'Inter', sans-serif;
          position: relative; overflow: hidden;
        }
        .adm-bg::before {
          content: ''; position: absolute;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle,rgba(20,184,166,0.1) 0%,transparent 70%);
          top: -100px; right: -100px; pointer-events: none;
        }
        .adm-bg::after {
          content: ''; position: absolute;
          width: 350px; height: 350px; border-radius: 50%;
          background: radial-gradient(circle,rgba(6,182,212,0.07) 0%,transparent 70%);
          bottom: -80px; left: -80px; pointer-events: none;
        }
        .adm-wrap { width: 100%; max-width: 420px; position: relative; z-index: 1; }
        .adm-badge {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          margin-bottom: 1.5rem;
        }
        .adm-badge-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 14px; border-radius: 99px;
          background: rgba(20,184,166,0.12); border: 1px solid rgba(20,184,166,0.2);
          color: #2dd4bf; font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.05em; text-transform: uppercase;
        }
        .adm-logo { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 2rem; }
        .adm-logo-icon {
          width: 44px; height: 44px;
          background: linear-gradient(135deg,#14b8a6,#06b6d4);
          border-radius: 12px; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(20,184,166,0.4);
        }
        .adm-logo-text { font-size: 1.3rem; font-weight: 800; color: #e2e8f0; font-family: 'Syne', sans-serif; }
        .adm-logo-text span { color: #2dd4bf; }
        .adm-heading { text-align: center; margin-bottom: 1.75rem; }
        .adm-heading h1 { font-size: 1.7rem; font-weight: 700; color: #e2e8f0; margin: 0 0 6px; letter-spacing: -0.5px; font-family: 'Syne', sans-serif; }
        .adm-heading p { color: rgba(226,232,240,0.4); font-size: 0.9rem; margin: 0; }
        .adm-card {
          background: rgba(20,184,166,0.03); backdrop-filter: blur(20px);
          border: 1px solid rgba(20,184,166,0.15); border-radius: 20px;
          padding: 2rem; box-shadow: 0 25px 60px rgba(0,0,0,0.6);
        }
        .adm-error {
          display: flex; align-items: center; gap: 8px;
          background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2);
          color: #f87171; font-size: 0.85rem;
          padding: 10px 14px; border-radius: 10px; margin-bottom: 1.25rem;
        }
        .adm-form { display: flex; flex-direction: column; gap: 1rem; }
        .adm-label { display: block; font-size: 0.78rem; font-weight: 600; color: rgba(226,232,240,0.5); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em; }
        .adm-input-wrap { position: relative; }
        .adm-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: rgba(20,184,166,0.4); display: flex; }
        .adm-input {
          width: 100%; padding: 11px 14px 11px 38px;
          background: rgba(20,184,166,0.05); border: 1px solid rgba(20,184,166,0.12);
          border-radius: 10px; color: #e2e8f0; font-size: 0.9rem;
          font-family: 'Inter', sans-serif; outline: none; box-sizing: border-box;
          transition: border-color 0.2s, background 0.2s;
        }
        .adm-input::placeholder { color: rgba(226,232,240,0.2); }
        .adm-input:focus { border-color: #14b8a6; background: rgba(20,184,166,0.08); }
        .adm-pw-btn { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: rgba(20,184,166,0.4); display: flex; transition: color 0.2s; }
        .adm-pw-btn:hover { color: #2dd4bf; }
        .adm-submit {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg,#14b8a6,#06b6d4);
          border: none; border-radius: 12px; color: #fff;
          font-size: 0.95rem; font-weight: 600; cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(20,184,166,0.35); margin-top: 4px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .adm-submit:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(20,184,166,0.5); }
        .adm-submit:disabled { opacity: 0.55; cursor: not-allowed; }
        .adm-spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .adm-footer { text-align: center; font-size: 0.78rem; color: rgba(226,232,240,0.25); margin-top: 1.5rem; }
        .adm-footer a { color: rgba(226,232,240,0.5); text-decoration: none; }
        .adm-footer a:hover { color: #e2e8f0; }
      `}</style>

      <div className="adm-bg">
        <div className="adm-wrap">
          <div className="adm-badge">
            <span className="adm-badge-chip">
              <Shield size={11} /> Restricted Access
            </span>
          </div>

          <div className="adm-logo">
            <div className="adm-logo-icon"><Shield size={20} color="#fff" /></div>
            <span className="adm-logo-text">Admin<span>Panel</span></span>
          </div>

          <div className="adm-heading">
            <h1>Admin Sign In</h1>
            <p>Authorised personnel only</p>
          </div>

          <div className="adm-card">
            {error && (
              <div className="adm-error">
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="adm-form">
              <div>
                <label className="adm-label">Email Address</label>
                <div className="adm-input-wrap">
                  <span className="adm-icon"><Mail size={15} /></span>
                  <input
                    id="admin-email"
                    type="email"
                    className="adm-input"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="adm-label">Password</label>
                <div className="adm-input-wrap">
                  <span className="adm-icon"><Lock size={15} /></span>
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    className="adm-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    style={{ paddingRight: 40 }}
                  />
                  <button type="button" className="adm-pw-btn" onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="adm-submit" disabled={loading}>
                {loading ? <><span className="adm-spinner" /> Authenticating…</> : 'Sign In to Admin'}
              </button>
            </form>
          </div>

          <p className="adm-footer">
            Student? <Link to="/login">Go to Student Login →</Link>
          </p>
        </div>
      </div>
    </>
  );
}
