import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, User, ClipboardList, Compass, BarChart2,
  Map, FolderOpen, TrendingUp, MessageSquare, Settings, LogOut, Zap, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const navSections = [
  {
    section: 'Main',
    items: [
      { label: 'Dashboard',    to: '/dashboard',         icon: LayoutDashboard },
      { label: 'Profile',      to: '/profile',           icon: User },
    ],
  },
  {
    section: 'Career',
    items: [
      { label: 'Assessment',        to: '/assessment',        icon: ClipboardList },
      { label: 'Career Matches',    to: '/assessment-result', icon: Compass },
      { label: 'Skill Gap',         to: '/skill-gap',         icon: BarChart2 },
      { label: 'Roadmap',           to: '/roadmap',           icon: Map },
    ],
  },
  {
    section: 'Growth',
    items: [
      { label: 'Projects',      to: '/projects',    icon: FolderOpen },
      { label: 'Progress',      to: '/progress',    icon: TrendingUp },
      { label: 'AI Advisor',    to: '/ai-advisor',  icon: MessageSquare },
    ],
  },
  {
    section: 'Account',
    items: [
      { label: 'Settings', to: '/settings', icon: Settings },
    ],
  },
];

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';
}

export default function StudentSidebar({ mobileOpen, onClose }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  const Content = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div className="s-logo-wrap">
        <div className="s-logo-icon"><Zap size={17} color="#fff" /></div>
        <span className="s-logo-text">Career<span>Path</span></span>
        {onClose && (
          <button onClick={onClose} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', padding: '4px' }} className="lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="s-nav" style={{ overflowY: 'auto' }}>
        {navSections.map(({ section, items }) => (
          <div key={section}>
            <p className="s-nav-section">{section}</p>
            {items.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) => `s-nav-item${isActive ? ' active' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={17} color={isActive ? '#a5b4fc' : 'rgba(255,255,255,0.35)'} />
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="s-footer">
        <div className="s-user-card">
          <div className="s-user-avatar">{getInitials(currentUser?.name)}</div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser?.name || 'Student'}
            </p>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser?.email}
            </p>
          </div>
        </div>
        <button className="s-logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="s-sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
        <Content />
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
          />
          <aside style={{
            position: 'fixed', inset: '0 auto 0 0', zIndex: 50,
            width: 260, display: 'flex', flexDirection: 'column',
            background: 'linear-gradient(180deg,#1e1b4b,#312e81 60%,#3730a3)',
            boxShadow: '4px 0 40px rgba(0,0,0,0.5)',
          }}>
            <Content />
          </aside>
        </>
      )}
    </>
  );
}
