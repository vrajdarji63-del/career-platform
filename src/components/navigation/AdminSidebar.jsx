import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Briefcase, BookOpen, ClipboardList,
  FolderOpen, BarChart2, Settings, LogOut, Shield, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const navSections = [
  {
    section: 'Overview',
    items: [
      { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
      { label: 'Students',  to: '/admin/students',  icon: Users },
    ],
  },
  {
    section: 'Content',
    items: [
      { label: 'Careers',     to: '/admin/careers',     icon: Briefcase },
      { label: 'Skills',      to: '/admin/skills',      icon: BookOpen },
      { label: 'Assessments', to: '/admin/assessments', icon: ClipboardList },
      { label: 'Projects',    to: '/admin/projects',    icon: FolderOpen },
    ],
  },
  {
    section: 'Analytics',
    items: [
      { label: 'Reports',  to: '/admin/reports',  icon: BarChart2 },
      { label: 'Settings', to: '/admin/settings', icon: Settings },
    ],
  },
];

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';
}

export default function AdminSidebar({ mobileOpen, onClose }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const Content = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div className="a-logo-wrap">
        <div className="a-logo-icon"><Shield size={17} color="#fff" /></div>
        <span className="a-logo-text">Admin<span>Panel</span></span>
        {onClose && (
          <button onClick={onClose} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(226,232,240,0.35)', display: 'flex', padding: '4px' }} className="lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="a-nav" style={{ overflowY: 'auto' }}>
        {navSections.map(({ section, items }) => (
          <div key={section}>
            <p className="a-nav-section">{section}</p>
            {items.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) => `a-nav-item${isActive ? ' active' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={17} color={isActive ? '#2dd4bf' : 'rgba(226,232,240,0.3)'} />
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="a-footer">
        <div className="a-user-card">
          <div className="a-user-avatar">{getInitials(currentUser?.name)}</div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser?.name || 'Admin'}
            </p>
            <p style={{ fontSize: '0.72rem', color: 'rgba(226,232,240,0.35)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser?.email}
            </p>
          </div>
        </div>
        <button className="a-logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="a-sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
        <Content />
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
          />
          <aside style={{
            position: 'fixed', inset: '0 auto 0 0', zIndex: 50,
            width: 260, display: 'flex', flexDirection: 'column',
            background: 'linear-gradient(180deg,#0a0e1a,#0f1628)',
            boxShadow: '4px 0 40px rgba(0,0,0,0.7)',
            borderRight: '1px solid rgba(20,184,166,0.1)',
          }}>
            <Content />
          </aside>
        </>
      )}
    </>
  );
}
