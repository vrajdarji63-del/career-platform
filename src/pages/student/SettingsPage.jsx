import { useState } from 'react';
import { Settings, User, Bell, ShieldAlert, Save, Loader2, CheckCircle2, Eye, EyeOff, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { authAPI } from '../../services/api.js';

// ── Toggle Switch ────────────────────────────────────────────────────────────
function Toggle({ on, onChange }) {
  return (
    <div
      onClick={() => onChange(!on)}
      style={{
        width: 44, height: 24, borderRadius: 99, cursor: 'pointer',
        background: on ? 'linear-gradient(135deg,#6366f1,#7c3aed)' : '#e5e7eb',
        display: 'flex', alignItems: 'center',
        padding: '0 3px',
        justifyContent: on ? 'flex-end' : 'flex-start',
        transition: 'all 0.2s',
        boxShadow: on ? '0 2px 8px rgba(99,102,241,0.45)' : 'none',
        flexShrink: 0,
      }}
    >
      <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.15)', transition: 'all 0.2s' }} />
    </div>
  );
}

// ── Editable field row ───────────────────────────────────────────────────────
function FieldRow({ label, value, onChange, type = 'text', readOnly = false }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        style={{
          width: '100%', padding: '11px 14px', borderRadius: 12,
          border: `1.5px solid ${readOnly ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.18)'}`,
          outline: 'none', fontSize: '0.9rem', color: readOnly ? '#9ca3af' : '#1e1b4b',
          fontFamily: 'Inter, sans-serif', background: readOnly ? '#fafbff' : '#fff',
          cursor: readOnly ? 'not-allowed' : 'text',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => { if (!readOnly) e.currentTarget.style.borderColor = '#6366f1'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = readOnly ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.18)'; }}
      />
      {readOnly && <p style={{ fontSize: '0.72rem', color: '#9ca3af', margin: '4px 0 0' }}>This field cannot be changed.</p>}
    </div>
  );
}

// ── Section card wrapper ─────────────────────────────────────────────────────
function Section({ icon: Icon, title, accent = '#6366f1', children }) {
  return (
    <div className="s-card" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `${accent}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={16} color={accent} />
        </div>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e1b4b', margin: 0, fontFamily: 'Syne, sans-serif' }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const { currentUser, completeOnboarding, logout } = useAuth();

  // ── Profile state ──
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName,  setLastName]  = useState(currentUser?.lastName  || '');
  const [mobile,    setMobile]    = useState(currentUser?.mobile    || '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved,  setProfileSaved]  = useState(false);
  const [profileError,  setProfileError]  = useState('');

  // ── Password state ──
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd,     setNewPwd]     = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showPwd,    setShowPwd]    = useState(false);
  const [pwdSaving,  setPwdSaving]  = useState(false);
  const [pwdMsg,     setPwdMsg]     = useState('');
  const [pwdError,   setPwdError]   = useState('');

  // ── Notifications state ──
  const [notifs, setNotifs] = useState({
    weeklyReport:        true,
    careerRecommendations: true,
    projectReminders:    false,
  });

  // Save profile
  const handleProfileSave = async () => {
    setProfileError('');
    setProfileSaving(true);
    try {
      const res = await authAPI.updateProfile({ firstName, lastName, mobile });
      if (res.data?.user) completeOnboarding(res.data.user);
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } catch (err) {
      setProfileError(err.response?.data?.message || 'Failed to save profile.');
    } finally {
      setProfileSaving(false);
    }
  };

  // Change password
  const handlePasswordChange = async () => {
    setPwdError('');
    setPwdMsg('');
    if (newPwd !== confirmPwd) { setPwdError('New passwords do not match.'); return; }
    if (newPwd.length < 6)     { setPwdError('Password must be at least 6 characters.'); return; }
    setPwdSaving(true);
    try {
      await authAPI.changePassword({ currentPassword: currentPwd, newPassword: newPwd });
      setPwdMsg('Password changed successfully.');
      setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
    } catch (err) {
      setPwdError(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setPwdSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '42rem' }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(99,102,241,0.45)', flexShrink: 0 }}>
          <Settings size={19} color="#fff" />
        </div>
        <div>
          <h1 className="s-page-title" style={{ margin: 0 }}>Settings</h1>
          <p className="s-page-sub">Manage your account, security, and preferences.</p>
        </div>
      </div>

      {/* ── Account Settings ── */}
      <Section icon={User} title="Account Settings">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FieldRow label="First Name" value={firstName} onChange={setFirstName} />
            <FieldRow label="Last Name"  value={lastName}  onChange={setLastName}  />
          </div>
          <FieldRow label="Email"  value={currentUser?.email  || ''} onChange={() => {}} readOnly />
          <FieldRow label="Mobile" value={mobile} onChange={setMobile} type="tel" />
        </div>

        {profileError && (
          <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, marginBottom: 12, fontSize: '0.82rem', color: '#dc2626' }}>
            {profileError}
          </div>
        )}

        <button
          onClick={handleProfileSave}
          disabled={profileSaving}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 12, background: profileSaved ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#6366f1,#7c3aed)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: profileSaving ? 'wait' : 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(99,102,241,0.4)', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { if (!profileSaving) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.5)'; }}}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.4)'; }}
        >
          {profileSaving ? <Loader2 size={16} style={{ animation: 'spin 0.7s linear infinite' }} /> : profileSaved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          {profileSaving ? 'Saving…' : profileSaved ? 'Saved!' : 'Save Changes'}
        </button>
      </Section>

      {/* ── Change Password ── */}
      <Section icon={ShieldAlert} title="Change Password" accent="#8b5cf6">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
          {[
            { label: 'Current Password', value: currentPwd, set: setCurrentPwd },
            { label: 'New Password',     value: newPwd,     set: setNewPwd     },
            { label: 'Confirm New Password', value: confirmPwd, set: setConfirmPwd },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '11px 42px 11px 14px', borderRadius: 12, border: '1.5px solid rgba(99,102,241,0.18)', outline: 'none', fontSize: '0.9rem', color: '#1e1b4b', fontFamily: 'Inter, sans-serif', background: '#fff', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#8b5cf6'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.18)'}
                />
                <button onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0, display: 'flex', alignItems: 'center' }}>
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {pwdError && <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, marginBottom: 12, fontSize: '0.82rem', color: '#dc2626' }}>{pwdError}</div>}
        {pwdMsg   && <div style={{ padding: '10px 14px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, marginBottom: 12, fontSize: '0.82rem', color: '#059669' }}>{pwdMsg}</div>}

        <button
          onClick={handlePasswordChange}
          disabled={pwdSaving || !currentPwd || !newPwd || !confirmPwd}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 12, background: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: (pwdSaving || !currentPwd || !newPwd || !confirmPwd) ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: (!currentPwd || !newPwd || !confirmPwd) ? 0.5 : 1, boxShadow: '0 4px 16px rgba(139,92,246,0.4)', transition: 'all 0.2s' }}
        >
          {pwdSaving ? <Loader2 size={16} style={{ animation: 'spin 0.7s linear infinite' }} /> : <ShieldAlert size={16} />}
          {pwdSaving ? 'Updating…' : 'Update Password'}
        </button>
      </Section>

      {/* ── Notifications ── */}
      <Section icon={Bell} title="Notifications" accent="#f59e0b">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { key: 'weeklyReport',         label: 'Weekly Progress Report',    desc: 'Get a summary of your weekly learning progress.' },
            { key: 'careerRecommendations',label: 'Career Recommendations',     desc: 'Receive new career match updates.' },
            { key: 'projectReminders',     label: 'Project Reminders',          desc: 'Reminders to continue your projects.' },
          ].map((item, i, arr) => (
            <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(99,102,241,0.06)' : 'none' }}>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e1b4b', margin: 0 }}>{item.label}</p>
                <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: '2px 0 0' }}>{item.desc}</p>
              </div>
              <Toggle on={notifs[item.key]} onChange={(v) => setNotifs((prev) => ({ ...prev, [item.key]: v }))} />
            </div>
          ))}
        </div>
      </Section>

      {/* ── Danger Zone ── */}
      <Section icon={ShieldAlert} title="Danger Zone" accent="#ef4444">
        <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
          These actions are permanent and cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={logout}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, background: 'rgba(239,68,68,0.08)', color: '#dc2626', fontWeight: 700, fontSize: '0.875rem', border: '1.5px solid rgba(239,68,68,0.2)', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.14)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.transform = ''; }}
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </Section>
    </div>
  );
}
