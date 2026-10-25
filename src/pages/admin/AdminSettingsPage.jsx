import { useState } from 'react';

const fields = [
  { label: 'Platform Name', key: 'platformName', value: 'CareerPath AI' },
  { label: 'Support Email', key: 'email', value: 'support@careerpathai.com' },
  { label: 'Max Students per Cohort', key: 'maxStudents', value: '500' },
];

const features = [
  { label: 'AI Career Advisor', key: 'aiAdvisor', enabled: true },
  { label: 'Student Registration', key: 'registration', enabled: true },
  { label: 'Assessment Module', key: 'assessment', enabled: true },
  { label: 'Project Tracking', key: 'projects', enabled: false },
];

export default function AdminSettingsPage() {
  const [formValues, setFormValues] = useState(
    Object.fromEntries(fields.map((f) => [f.key, f.value]))
  );
  const [flags, setFlags] = useState(
    Object.fromEntries(features.map((f) => [f.key, f.enabled]))
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h1 className="a-page-title">Admin Settings</h1>
        <p className="a-page-sub">Configure platform-wide settings and feature flags.</p>
      </div>

      {/* Platform Settings */}
      <div className="a-card">
        <h2 style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '1rem', marginBottom: '1.25rem', fontFamily: 'Syne, sans-serif' }}>
          Platform Settings
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {fields.map((field) => (
            <div key={field.key}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                {field.label}
              </label>
              <input
                value={formValues[field.key]}
                onChange={(e) => setFormValues({ ...formValues, [field.key]: e.target.value })}
                style={{
                  width: '100%', padding: '10px 14px',
                  background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.15)',
                  borderRadius: 10, color: '#e2e8f0', fontSize: '0.875rem',
                  fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>
          ))}
          <button
            className="a-btn a-btn-primary"
            onClick={handleSave}
            style={{ alignSelf: 'flex-start', marginTop: 4 }}
          >
            {saved ? '✓ Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Feature Flags */}
      <div className="a-card">
        <h2 style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '1rem', marginBottom: '1.25rem', fontFamily: 'Syne, sans-serif' }}>
          Feature Flags
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {features.map((item) => (
            <div
              key={item.key}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'rgba(20,184,166,0.04)', borderRadius: 10, border: '1px solid rgba(20,184,166,0.08)' }}
            >
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#e2e8f0' }}>{item.label}</p>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>
                  {flags[item.key] ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <button
                onClick={() => setFlags({ ...flags, [item.key]: !flags[item.key] })}
                style={{
                  width: 44, height: 24,
                  background: flags[item.key] ? 'linear-gradient(135deg, #14b8a6, #06b6d4)' : 'rgba(100,116,139,0.3)',
                  borderRadius: 99, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center',
                  padding: '2px',
                  justifyContent: flags[item.key] ? 'flex-end' : 'flex-start',
                  transition: 'all 0.25s',
                  boxShadow: flags[item.key] ? '0 2px 8px rgba(20,184,166,0.4)' : 'none',
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  transition: 'all 0.25s',
                }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
