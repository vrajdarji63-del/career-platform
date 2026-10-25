import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Menu, Shield } from 'lucide-react';
import AdminSidebar from '../components/navigation/AdminSidebar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminLayout() {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1117' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '3px solid rgba(20,184,166,0.2)', borderTopColor: '#14b8a6', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto' }} />
          <p style={{ color: '#14b8a6', fontSize: '0.85rem', marginTop: 12, fontWeight: 500 }}>Loading…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <div className="a-layout admin-scroll">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
        {/* Mobile Header */}
        <header className="a-mobile-header">
          <button
            onClick={() => setMobileOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 6, borderRadius: 8, color: '#14b8a6' }}
          >
            <Menu size={22} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 30, height: 30, background: 'linear-gradient(135deg,#14b8a6,#06b6d4)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={15} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif' }}>Admin<span style={{ color: '#2dd4bf' }}>Panel</span></span>
          </div>
        </header>

        {/* Page Content */}
        <main className="a-main admin-scroll">
          <div className="a-content fade-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
