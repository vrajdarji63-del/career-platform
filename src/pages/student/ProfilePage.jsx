import { useState } from 'react';
import {
  Mail, Phone, Target, Star, GraduationCap, User,
  Edit3, Check, X, AlertCircle, Loader2, Briefcase,
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Avatar from '../../components/common/Avatar.jsx';
import Badge from '../../components/common/Badge.jsx';
import ProgressBar from '../../components/common/ProgressBar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { authAPI, studentsAPI } from '../../services/api.js';

// ── Inline edit field ────────────────────────────────────────────────────────
function EditableField({ label, value, onSave, type = 'text', disabled }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState(value || '');
  const [saving, setSaving]   = useState(false);

  const save = async () => {
    if (draft === value) { setEditing(false); return; }
    setSaving(true);
    await onSave(draft);
    setSaving(false);
    setEditing(false);
  };

  const cancel = () => { setDraft(value || ''); setEditing(false); };

  if (editing) {
    return (
      <div>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</p>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <input
            type={type}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
            style={{
              flex: 1, padding: '7px 10px', borderRadius: 8,
              border: '1.5px solid #6366f1', outline: 'none',
              fontSize: '0.875rem', color: '#1e1b4b', background: '#fafbff',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          <button onClick={save} disabled={saving} style={{ background: '#6366f1', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#fff' }}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          </button>
          <button onClick={cancel} style={{ background: '#f3f4f6', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#6b7280' }}>
            <X size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, group: true }}>
      <div>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</p>
        <p style={{ fontSize: '0.875rem', color: value ? '#374151' : '#d1d5db', margin: 0, fontStyle: value ? 'normal' : 'italic' }}>{value || 'Not set'}</p>
      </div>
      {!disabled && (
        <button
          onClick={() => { setDraft(value || ''); setEditing(true); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d1d5db', padding: 4, borderRadius: 6, flexShrink: 0, transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#6366f1'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
        >
          <Edit3 size={13} />
        </button>
      )}
    </div>
  );
}

// ── Main ProfilePage ─────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { currentUser, completeOnboarding } = useAuth();

  // Profile save handlers
  const saveField = async (field, value) => {
    try {
      const res = await authAPI.updateProfile({ [field]: value });
      if (res.data?.user) completeOnboarding(res.data.user);
    } catch {
      // silent fail — field reverts
    }
  };

  // Derive display data from the real currentUser
  const u = currentUser || {};

  const skills     = u.skills     || [];
  const interests  = u.interests  || [];

  const infoRows = [
    { icon: Mail,  label: 'Email',   value: u.email,  field: 'email',  disabled: true },
    { icon: Phone, label: 'Mobile',  value: u.mobile ? `+91 ${u.mobile}` : null, field: 'mobile' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '56rem' }}>
      <h1 className="s-page-title">My Profile</h1>

      {/* ── Hero card ── */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Avatar name={u.name} size="xl" />
          <div style={{ flex: 1, minWidth: 200 }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e1b4b', margin: '0 0 4px', fontFamily: 'Syne, sans-serif' }}>
              {u.name || 'Student'}
            </h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 14px' }}>
              {u.role === 'student' ? 'Student' : u.role}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px' }}>
              {infoRows.map(({ icon: Icon, label, value }) => (
                <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#6b7280' }}>
                  <Icon size={13} /> {value || `No ${label.toLowerCase()}`}
                </span>
              ))}
              {u.careerGoal && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#6b7280' }}>
                  <Target size={13} />
                  Goal: <strong style={{ color: '#374151' }}>{u.careerGoal}</strong>
                </span>
              )}
            </div>
          </div>

          {/* Career readiness score */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6366f1', fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>
              {u.careerReadiness ?? 0}%
            </div>
            <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: 4 }}>Career Readiness</p>
            {u.careerReadiness > 0 && (
              <div style={{ width: 80, background: '#e5e7eb', borderRadius: 99, height: 4, marginTop: 8, marginLeft: 'auto' }}>
                <div style={{ height: 4, borderRadius: 99, background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', width: `${u.careerReadiness}%` }} />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* ── Account Info + Interests ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="grid-responsive-2">

        {/* Account Info */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
            <User size={18} color="#6366f1" />
            <h3 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', margin: 0 }}>Account Info</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <EditableField
              label="First Name"
              value={u.firstName}
              onSave={(v) => saveField('firstName', v)}
            />
            <EditableField
              label="Last Name"
              value={u.lastName}
              onSave={(v) => saveField('lastName', v)}
            />
            <EditableField
              label="Email"
              value={u.email}
              onSave={(v) => saveField('email', v)}
              disabled
            />
            <EditableField
              label="Mobile"
              value={u.mobile}
              onSave={(v) => saveField('mobile', v)}
              type="tel"
            />
          </div>
        </Card>

        {/* Career & Interests */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
            <Star size={18} color="#f59e0b" />
            <h3 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', margin: 0 }}>Career & Interests</h3>
          </div>

          {/* Career Goal */}
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Career Goal</p>
            {u.careerGoal ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, background: 'rgba(99,102,241,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Briefcase size={16} color="#6366f1" />
                </div>
                <span style={{ fontWeight: 600, color: '#1e1b4b', fontSize: '0.9rem' }}>{u.careerGoal}</span>
              </div>
            ) : (
              <p style={{ fontSize: '0.875rem', color: '#d1d5db', fontStyle: 'italic', margin: 0 }}>Not set — complete the assessment</p>
            )}
          </div>

          {/* Recommended Career */}
          {u.recommendedCareer && (
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>AI Recommended</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(99,102,241,0.05)', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(99,102,241,0.1)' }}>
                <span style={{ fontWeight: 600, color: '#1e1b4b', fontSize: '0.875rem' }}>{u.recommendedCareer?.title || u.recommendedCareer}</span>
                {u.recommendedCareer?.match && (
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6366f1' }}>{u.recommendedCareer.match}% match</span>
                )}
              </div>
            </div>
          )}

          {/* Interests */}
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Interests</p>
            {interests.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {interests.map((interest) => (
                  <Badge key={interest} variant="primary">{interest}</Badge>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.875rem', color: '#d1d5db', fontStyle: 'italic', margin: 0 }}>
                No interests yet — complete onboarding
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* ── Skills ── */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', margin: 0, fontFamily: 'Syne, sans-serif' }}>Skills</h3>
          {skills.length > 0 && (
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{skills.length} skill{skills.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {skills.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-responsive-2">
            {skills.map((skill) => {
              // skill can be a string (from onboarding) or { name, proficiency }
              const name        = typeof skill === 'string' ? skill : skill.name;
              const proficiency = typeof skill === 'string' ? null  : skill.proficiency;
              return (
                <div key={name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: 6 }}>
                    <span style={{ fontWeight: 500, color: '#374151' }}>{name}</span>
                    {proficiency != null && (
                      <span style={{ color: '#6b7280' }}>{proficiency}%</span>
                    )}
                  </div>
                  {proficiency != null ? (
                    <ProgressBar
                      value={proficiency}
                      color={proficiency >= 80 ? 'emerald' : proficiency >= 60 ? 'indigo' : 'amber'}
                      size="sm"
                    />
                  ) : (
                    <div style={{ height: 6, background: 'rgba(99,102,241,0.15)', borderRadius: 99 }} />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
            <AlertCircle size={28} style={{ margin: '0 auto 8px', opacity: 0.4 }} />
            <p style={{ fontSize: '0.875rem', margin: 0 }}>No skills added yet</p>
            <p style={{ fontSize: '0.78rem', margin: '4px 0 0' }}>Complete onboarding or assessment to populate skills</p>
          </div>
        )}
      </Card>

      {/* ── Account created note ── */}
      <div style={{ padding: '12px 16px', background: 'rgba(99,102,241,0.05)', borderRadius: 12, border: '1px solid rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <GraduationCap size={16} color="#6366f1" style={{ flexShrink: 0 }} />
        <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>
          Profile data is synced from your account.{' '}
          <strong style={{ color: '#6366f1' }}>Onboarding</strong> and{' '}
          <strong style={{ color: '#6366f1' }}>assessments</strong> will enrich your career profile over time.
        </p>
      </div>
    </div>
  );
}
