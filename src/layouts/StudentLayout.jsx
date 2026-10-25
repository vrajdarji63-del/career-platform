import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Menu, Zap } from 'lucide-react';
import StudentSidebar from '../components/navigation/StudentSidebar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function StudentLayout() {
  const { isAuthenticated, isStudent, needsOnboarding, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2ff' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto' }} />
          <p style={{ color: '#6366f1', fontSize: '0.85rem', marginTop: 12, fontWeight: 500 }}>Loading…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isStudent) return <Navigate to="/admin/dashboard" replace />;
  if (needsOnboarding) return <Navigate to="/onboarding" replace />;

  return (
    <div className="s-layout">
      <StudentSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
        {/* Mobile Header */}
        <header className="s-mobile-header">
          <button
            onClick={() => setMobileOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 6, borderRadius: 8, color: '#6366f1' }}
          >
            <Menu size={22} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 30, height: 30, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={15} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, color: '#1e1b4b', fontFamily: 'Syne, sans-serif' }}>Career<span style={{ color: '#6366f1' }}>Path</span></span>
          </div>
        </header>

        {/* Page Content */}
        <main className="s-main">
          <div className="s-content fade-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
