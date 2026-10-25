import { useState, useEffect, useRef } from 'react';
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  Plus,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  Camera,
  Upload,
  User,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react';
import Avatar from '../../components/common/Avatar.jsx';
import { studentsAPI } from '../../services/api.js';

const assessmentBadge = {
  'Completed':   'a-badge-teal',
  'In Progress': 'a-badge-blue',
  'Not Started': 'a-badge-amber',
};
const statusBadge = {
  active:   'a-badge-green',
  inactive: 'a-badge-red',
};

// ── Reusable labeled input ────────────────────────────────────────────────────
function Field({ label, value, onChange, type = 'text', placeholder = '', required = false, readOnly = false }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
        {label}{required && <span style={{ color: '#f87171' }}> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        style={{
          width: '100%', padding: '10px 13px', borderRadius: 10,
          background: readOnly ? 'rgba(20,184,166,0.03)' : 'rgba(20,184,166,0.06)',
          border: '1px solid rgba(20,184,166,0.18)', outline: 'none',
          color: readOnly ? '#64748b' : '#e2e8f0', fontSize: '0.875rem',
          fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
          cursor: readOnly ? 'not-allowed' : 'text',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => { if (!readOnly) e.currentTarget.style.borderColor = '#14b8a6'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(20,184,166,0.18)'; }}
      />
    </div>
  );
}

// ── Add Student Modal ─────────────────────────────────────────────────────────
function AddStudentModal({ onClose, onAdded }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', mobile: '', password: '', careerGoal: '' });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const photoInputRef = useRef(null);

  const set = (field) => (val) => setForm((prev) => ({ ...prev, [field]: val }));

  const handlePhotoSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Photo must be smaller than 5 MB.');
      return;
    }
    setError('');
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('First name, last name, email, and password are required.');
      return;
    }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (form.mobile && !/^\d{10}$/.test(form.mobile)) { setError('Mobile must be 10 digits.'); return; }

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('firstName', form.firstName.trim());
      fd.append('lastName', form.lastName.trim());
      fd.append('email', form.email.trim());
      fd.append('mobile', form.mobile.trim());
      fd.append('password', form.password);
      if (form.careerGoal) fd.append('careerGoal', form.careerGoal.trim());
      if (photoFile) fd.append('passportPhoto', photoFile);

      await studentsAPI.create(fd);
      onAdded();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create student.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Overlay onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#14b8a6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(20,184,166,0.4)' }}>
          <UserPlus size={17} color="#fff" />
        </div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif', margin: 0 }}>Add New Student</h2>
        <button onClick={onClose} style={{ marginLeft: 'auto', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: 8, color: '#f87171', cursor: 'pointer', padding: '6px 10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}>
          <X size={14} /> Close
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.25rem' }}>
          {/* Photo upload field */}
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              Passport Photo (Optional)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                onClick={() => photoInputRef.current?.click()}
                style={{
                  width: 58, height: 74, borderRadius: 8,
                  border: '1.5px dashed rgba(20,184,166,0.3)',
                  background: 'rgba(20,184,166,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', overflow: 'hidden', flexShrink: 0,
                }}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                ) : (
                  <Camera size={20} color="#2dd4bf" />
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  style={{
                    padding: '5px 11px', borderRadius: 7, border: '1px solid rgba(20,184,166,0.25)',
                    background: 'rgba(20,184,166,0.08)', color: '#2dd4bf', fontSize: '0.78rem',
                    cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5,
                  }}
                >
                  <Upload size={12} /> {photoPreview ? 'Change Photo' : 'Select Photo'}
                </button>
                {photoPreview && (
                  <button
                    type="button"
                    onClick={() => { setPhotoFile(null); setPhotoPreview(null); }}
                    style={{
                      marginLeft: 8, padding: '5px 9px', borderRadius: 7, border: 'none',
                      background: 'rgba(239,68,68,0.1)', color: '#f87171', fontSize: '0.78rem',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                )}
                <p style={{ fontSize: '0.72rem', color: '#64748b', margin: '4px 0 0' }}>JPG, PNG or WEBP, max 5MB</p>
              </div>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => handlePhotoSelect(e.target.files?.[0])}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
            <Field label="First Name" value={form.firstName} onChange={set('firstName')} placeholder="John" required />
            <Field label="Last Name" value={form.lastName} onChange={set('lastName')} placeholder="Doe" required />
          </div>
          <Field label="Email" value={form.email} onChange={set('email')} type="email" placeholder="john@example.com" required />
          <Field label="Mobile" value={form.mobile} onChange={set('mobile')} type="tel" placeholder="10-digit number" />
          <Field label="Password" value={form.password} onChange={set('password')} type="password" placeholder="Min 6 characters" required />
          <Field label="Career Goal" value={form.careerGoal} onChange={set('careerGoal')} placeholder="e.g. Full Stack Developer" />
        </div>

        {error && <ErrorBox msg={error} />}

        <button
          type="submit"
          disabled={saving}
          className="a-btn a-btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
        >
          {saving ? <><Loader2 size={15} style={{ animation: 'spin 0.7s linear infinite' }} /> Creating…</> : <><Plus size={15} /> Create Student</>}
        </button>
      </form>
    </Overlay>
  );
}

// ── Edit Student Modal ────────────────────────────────────────────────────────
function EditStudentModal({ student, onClose, onSaved }) {
  const [form, setForm] = useState({
    firstName: student.firstName || student.name?.split(' ')[0] || '',
    lastName: student.lastName || student.name?.split(' ').slice(1).join(' ') || '',
    email: student.email || '',
    mobile: student.mobile || '',
    careerGoal: student.careerGoal !== 'Not set' ? student.careerGoal : '',
    careerReadiness: student.skillScore ?? 0,
  });

  // Photo state
  const currentPhotoUrl = student.passportPhoto?.url || '';
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  const set = (field) => (val) => setForm((prev) => ({ ...prev, [field]: val }));

  const handlePhotoSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Photo must be smaller than 5 MB.');
      return;
    }
    setError('');
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handlePhotoSelect(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    const id = student.id || student._id;

    try {
      // 1. If admin selected a new photo, upload it to Cloudinary via PUT /:id/photo
      if (photoFile) {
        setUploadingPhoto(true);
        await studentsAPI.updatePhoto(id, photoFile);
      }

      // 2. Update student text details
      await studentsAPI.update(id, {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        careerGoal: form.careerGoal.trim() || undefined,
        careerReadiness: Number(form.careerReadiness),
      });

      setSaved(true);
      setTimeout(() => {
        onSaved();
        onClose();
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update student.');
    } finally {
      setSaving(false);
      setUploadingPhoto(false);
    }
  };

  const displayPhoto = photoPreview || currentPhotoUrl;

  return (
    <Overlay onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#f59e0b,#f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(245,158,11,0.4)' }}>
          <Pencil size={16} color="#fff" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif', margin: 0 }}>Edit Student</h2>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>{student.email}</p>
        </div>
        <button onClick={onClose} style={{ marginLeft: 'auto', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: 8, color: '#f87171', cursor: 'pointer', padding: '6px 10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}>
          <X size={14} /> Close
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.25rem' }}>

          {/* ── Passport Photo Editor ─────────────────────────────────────── */}
          <div style={{
            background: 'rgba(20,184,166,0.04)',
            border: '1px solid rgba(20,184,166,0.15)',
            borderRadius: 12,
            padding: '12px 14px',
          }}>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              Passport Size Photo (Cloudinary)
            </label>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Photo Box (3:4 aspect ratio) */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                title="Click or drag to change photo"
                style={{
                  position: 'relative',
                  width: 72,
                  height: 96,
                  borderRadius: 10,
                  border: photoPreview ? '2px solid #10b981' : displayPhoto ? '2px solid rgba(20,184,166,0.4)' : '2px dashed rgba(20,184,166,0.3)',
                  background: 'rgba(15,23,42,0.6)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                {displayPhoto ? (
                  <img
                    src={displayPhoto}
                    alt="Passport photo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', padding: 6 }}>
                    <Camera size={22} color="#64748b" style={{ margin: '0 auto 4px' }} />
                    <span style={{ fontSize: '0.65rem', color: '#64748b', display: 'block', lineHeight: 1.1 }}>No Photo</span>
                  </div>
                )}

                {/* Hover overlay icon */}
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  <Camera size={18} color="#fff" />
                </div>
              </div>

              {/* Photo controls & info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  {photoPreview ? (
                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CheckCircle2 size={13} /> New photo selected (unsaved)
                    </span>
                  ) : displayPhoto ? (
                    <span style={{ fontSize: '0.75rem', color: '#2dd4bf', fontWeight: 600 }}>
                      Current uploaded photo
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      No photo on record
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 8,
                      border: '1px solid rgba(20,184,166,0.3)',
                      background: 'rgba(20,184,166,0.12)',
                      color: '#2dd4bf',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      fontFamily: 'inherit',
                    }}
                  >
                    <Upload size={13} /> {displayPhoto ? 'Change Photo' : 'Upload Photo'}
                  </button>

                  {photoPreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoFile(null);
                        setPhotoPreview(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      style={{
                        padding: '6px 10px',
                        borderRadius: 8,
                        border: 'none',
                        background: 'rgba(239,68,68,0.12)',
                        color: '#f87171',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      Undo
                    </button>
                  )}
                </div>

                <p style={{ fontSize: '0.7rem', color: '#64748b', margin: '6px 0 0' }}>
                  Standard passport size (3:4 ratio), JPG/PNG/WEBP up to 5MB. Auto-cropped with AI face focus on Cloudinary.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  style={{ display: 'none' }}
                  onChange={(e) => handlePhotoSelect(e.target.files?.[0])}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
            <Field label="First Name" value={form.firstName} onChange={set('firstName')} required />
            <Field label="Last Name"  value={form.lastName}  onChange={set('lastName')}  required />
          </div>
          <Field label="Email"  value={form.email}  onChange={set('email')}  type="email" required />
          <Field label="Mobile" value={form.mobile} onChange={set('mobile')} type="tel" />
          <Field label="Career Goal" value={form.careerGoal} onChange={set('careerGoal')} placeholder="e.g. Frontend Developer" />
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              Career Readiness (%)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input
                type="range" min={0} max={100} value={form.careerReadiness}
                onChange={(e) => set('careerReadiness')(e.target.value)}
                style={{ flex: 1, accentColor: '#14b8a6' }}
              />
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2dd4bf', minWidth: 36, textAlign: 'right' }}>{form.careerReadiness}%</span>
            </div>
          </div>
        </div>

        {error && <ErrorBox msg={error} />}

        <button
          type="submit"
          disabled={saving || saved}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '11px 0', borderRadius: 11, border: 'none', cursor: (saving || saved) ? 'default' : 'pointer',
            fontWeight: 700, fontSize: '0.9rem', fontFamily: 'inherit',
            background: saved
              ? 'linear-gradient(135deg,#10b981,#059669)'
              : 'linear-gradient(135deg,#f59e0b,#f97316)',
            color: '#fff',
            boxShadow: saved ? '0 4px 14px rgba(16,185,129,0.4)' : '0 4px 14px rgba(245,158,11,0.4)',
            transition: 'all 0.2s',
          }}
        >
          {saving ? (
            <><Loader2 size={15} style={{ animation: 'spin 0.7s linear infinite' }} /> {uploadingPhoto ? 'Uploading Photo to Cloudinary…' : 'Saving Changes…'}</>
          ) : saved ? (
            <><CheckCircle2 size={15} /> Saved successfully!</>
          ) : (
            <><Pencil size={15} /> Save Changes</>
          )}
        </button>
      </form>
    </Overlay>
  );
}

// ── View Modal ────────────────────────────────────────────────────────────────
function ViewStudentModal({ student, onClose, onEdit }) {
  const photoUrl = student.passportPhoto?.url;

  return (
    <Overlay onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Syne, sans-serif', margin: 0 }}>Student Details</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onEdit}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)',
              borderRadius: 8, color: '#fbbf24', cursor: 'pointer', padding: '6px 12px',
              fontSize: '0.8rem', fontFamily: 'inherit', fontWeight: 600,
            }}
          >
            <Pencil size={13} /> Edit Details / Photo
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: 8,
              color: '#f87171', cursor: 'pointer', padding: '6px 10px', fontSize: '0.8rem',
              fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <X size={14} /> Close
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* ── Passport Photo & Student Card ───────────────────────────────── */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          background: 'linear-gradient(135deg, rgba(20,184,166,0.08), rgba(6,182,212,0.04))',
          border: '1px solid rgba(20,184,166,0.2)',
          borderRadius: 14,
          padding: 16,
        }}>
          {/* Passport Photo Frame (3:4 ratio) */}
          <div style={{
            position: 'relative',
            width: 86,
            height: 114,
            borderRadius: 10,
            overflow: 'hidden',
            border: '2px solid rgba(20,184,166,0.4)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
            background: 'rgba(15,23,42,0.8)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={`${student.name}'s passport`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: 8 }}>
                <Camera size={26} color="#64748b" style={{ margin: '0 auto 4px' }} />
                <span style={{ fontSize: '0.62rem', color: '#64748b', display: 'block' }}>No Photo</span>
              </div>
            )}
          </div>

          {/* Student Header Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
              <h3 style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '1.1rem', margin: 0 }}>
                {student.name}
              </h3>
              <span className={`a-badge ${statusBadge[student.status] || 'a-badge-amber'}`}>
                {student.status}
              </span>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#94a3b8', margin: '2px 0 6px', wordBreak: 'break-all' }}>
              {student.email}
            </p>

            {student.mobile && (
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 8px' }}>
                📞 +91 {student.mobile}
              </p>
            )}

            {photoUrl ? (
              <a
                href={photoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: '0.74rem',
                  color: '#2dd4bf',
                  textDecoration: 'none',
                  background: 'rgba(20,184,166,0.12)',
                  padding: '4px 9px',
                  borderRadius: 6,
                  fontWeight: 600,
                  transition: 'background 0.2s',
                }}
              >
                <ExternalLink size={12} /> View Full Photo on Cloudinary
              </a>
            ) : (
              <button
                onClick={onEdit}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: '0.74rem',
                  color: '#fbbf24',
                  background: 'rgba(245,158,11,0.12)',
                  border: 'none',
                  padding: '4px 9px',
                  borderRadius: 6,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                <Upload size={12} /> Upload Passport Photo
              </button>
            )}
          </div>
        </div>

        {/* ── Student Metrics & Details Grid ───────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: 'Career Goal', value: student.careerGoal || 'Not set' },
            { label: 'Career Readiness', value: `${student.skillScore}%` },
            { label: 'Assessment Status', value: student.assessment },
            { label: 'Joined On', value: student.joined ? new Date(student.joined).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A' },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'rgba(20,184,166,0.06)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(20,184,166,0.1)' }}>
              <p style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
              <p style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.875rem', margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Readiness progress bar */}
        <div style={{ background: 'rgba(20,184,166,0.06)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(20,184,166,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.78rem' }}>
            <span style={{ color: '#94a3b8' }}>Overall Skill Score</span>
            <span style={{ color: '#2dd4bf', fontWeight: 700 }}>{student.skillScore}%</span>
          </div>
          <div className="a-progress-track" style={{ width: '100%', height: 6 }}>
            <div className="a-progress-fill" style={{ width: `${student.skillScore}%`, height: '100%' }} />
          </div>
        </div>
      </div>
    </Overlay>
  );
}

// ── Shared overlay wrapper ────────────────────────────────────────────────────
function Overlay({ onClose, children }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="a-card" style={{ width: '100%', maxWidth: 500, padding: '1.75rem', maxHeight: '90vh', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

function ErrorBox({ msg }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, marginBottom: 12, fontSize: '0.82rem', color: '#f87171' }}>
      <AlertCircle size={14} /> {msg}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminStudentsPage() {
  const [search,       setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [students,     setStudents]     = useState([]);
  const [total,        setTotal]        = useState(0);
  const [loading,      setLoading]      = useState(true);

  // Modals
  const [viewStudent, setViewStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [showAdd,     setShowAdd]     = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = { search, status: statusFilter !== 'All' ? statusFilter.toLowerCase() : undefined };
      const res = await studentsAPI.getAll(params);
      setStudents(res.data.students || []);
      setTotal(res.data.count || 0);

      // Keep active view/edit student updated with latest data
      if (viewStudent) {
        const updated = res.data.students?.find((s) => (s.id || s._id) === (viewStudent.id || viewStudent._id));
        if (updated) setViewStudent(updated);
      }
    } catch {
      setStudents([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchStudents, 300);
    return () => clearTimeout(t);
  }, [search, statusFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm('Deactivate this student?')) return;
    try {
      await studentsAPI.delete(id);
    } catch { /* ignore */ } finally {
      setStudents((prev) => prev.filter((s) => (s.id || s._id) !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="a-page-title">Students</h1>
          <p className="a-page-sub">Manage, view passport photos, and edit registered students.</p>
        </div>
        <button
          className="a-btn a-btn-primary"
          onClick={() => setShowAdd(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 7 }}
        >
          <Plus size={16} /> Add Student
        </button>
      </div>

      {/* Table card */}
      <div className="a-card" style={{ padding: 0 }}>
        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(20,184,166,0.1)' }}>
          <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: 320 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', paddingLeft: 36, paddingRight: 14, paddingTop: 9, paddingBottom: 9, background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.15)', borderRadius: 10, color: '#e2e8f0', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['All', 'Active', 'Inactive'].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'inherit', background: statusFilter === s ? 'linear-gradient(135deg, #14b8a6, #06b6d4)' : 'rgba(20,184,166,0.08)', color: statusFilter === s ? '#fff' : '#2dd4bf', transition: 'all 0.18s', boxShadow: statusFilter === s ? '0 2px 8px rgba(20,184,166,0.3)' : 'none' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="a-table">
            <thead>
              <tr>
                {['Student', 'Email', 'Career Goal', 'Skill Score', 'Assessment', 'Status', 'Actions'].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(7)].map((_, j) => (
                      <td key={j}><div style={{ height: 14, background: 'rgba(20,184,166,0.08)', borderRadius: 6 }} /></td>
                    ))}
                  </tr>
                ))
              ) : (
                students.map((student) => {
                  const id = student.id || student._id;
                  const photoUrl = student.passportPhoto?.url;

                  return (
                    <tr key={id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {photoUrl ? (
                            <img
                              src={photoUrl}
                              alt={student.name}
                              style={{
                                width: 34,
                                height: 34,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                objectPosition: 'center top',
                                border: '2px solid rgba(20,184,166,0.5)',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                                flexShrink: 0,
                              }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <Avatar name={student.name} size="sm" />
                          )}
                          <div>
                            <span style={{ fontWeight: 500, color: '#e2e8f0', display: 'block' }}>{student.name}</span>
                            {photoUrl && (
                              <span style={{ fontSize: '0.68rem', color: '#2dd4bf', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                                <Camera size={10} /> Photo
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>{student.email}</td>
                      <td>{student.careerGoal || 'Not set'}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#2dd4bf' }}>{student.skillScore}%</span>
                          <div className="a-progress-track" style={{ width: 56 }}>
                            <div className="a-progress-fill" style={{ width: `${student.skillScore}%` }} />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`a-badge ${assessmentBadge[student.assessment] || 'a-badge-amber'}`}>{student.assessment}</span>
                      </td>
                      <td>
                        <span className={`a-badge ${statusBadge[student.status] || 'a-badge-amber'}`}>{student.status}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button
                            onClick={() => setViewStudent(student)}
                            title="View student & passport photo"
                            style={{ padding: '6px', borderRadius: 8, background: 'rgba(20,184,166,0.1)', border: 'none', cursor: 'pointer', color: '#2dd4bf', display: 'flex', alignItems: 'center' }}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => setEditStudent(student)}
                            title="Edit details & photo"
                            style={{ padding: '6px', borderRadius: 8, background: 'rgba(251,191,36,0.1)', border: 'none', cursor: 'pointer', color: '#fbbf24', display: 'flex', alignItems: 'center' }}
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(id)}
                            title="Deactivate"
                            style={{ padding: '6px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: 'none', cursor: 'pointer', color: '#f87171', display: 'flex', alignItems: 'center' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {!loading && students.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b', fontSize: '0.875rem' }}>
              No students found.
            </div>
          )}
        </div>

        <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid rgba(20,184,166,0.1)', fontSize: '0.82rem', color: '#64748b' }}>
          Showing {students.length} of {total} students
        </div>
      </div>

      {/* Modals */}
      {showAdd && (
        <AddStudentModal
          onClose={() => setShowAdd(false)}
          onAdded={fetchStudents}
        />
      )}

      {!!viewStudent && !editStudent && (
        <ViewStudentModal
          student={viewStudent}
          onClose={() => setViewStudent(null)}
          onEdit={() => { setEditStudent(viewStudent); setViewStudent(null); }}
        />
      )}

      {!!editStudent && (
        <EditStudentModal
          student={editStudent}
          onClose={() => setEditStudent(null)}
          onSaved={fetchStudents}
        />
      )}
    </div>
  );
}
