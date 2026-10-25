import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap, AlertCircle, CheckCircle2, Mail, ArrowLeft, RefreshCw, ShieldCheck, Camera, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { authAPI } from '../../services/api.js';

function getStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColor = ['', '#ef4444', '#f97316', '#eab308', '#22c55e'];

// ─── Step 1: Registration Form ────────────────────────────────────────────────
function RegistrationForm({ onOTPSent }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', mobile: '', password: '', confirmPassword: '' });
  const [showPw, setShowPw]   = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [errors, setErrors]   = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  // Passport photo state
  const [photoFile, setPhotoFile]       = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoDragging, setPhotoDragging] = useState(false);
  const photoInputRef = useRef(null);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((err) => { const c = { ...err }; delete c[k]; return c; });
    setServerError('');
  };

  // ── Photo handlers ───────────────────────────────────────────────────────────
  const applyPhoto = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors((e) => ({ ...e, photo: 'Please select an image file (JPG, PNG, WEBP).' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((e) => ({ ...e, photo: 'Photo must be smaller than 5 MB.' }));
      return;
    }
    setErrors((e) => { const c = { ...e }; delete c.photo; return c; });
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handlePhotoDrop = (e) => {
    e.preventDefault();
    setPhotoDragging(false);
    const file = e.dataTransfer.files?.[0];
    applyPhoto(file);
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (photoInputRef.current) photoInputRef.current.value = '';
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    else if (form.firstName.trim().length < 2) e.firstName = 'Minimum 2 characters.';
    if (!form.lastName.trim()) e.lastName = 'Last name is required.';
    else if (form.lastName.trim().length < 2) e.lastName = 'Minimum 2 characters.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.mobile.trim()) e.mobile = 'Mobile number is required.';
    else if (!/^[0-9]{10}$/.test(form.mobile)) e.mobile = 'Enter a valid 10-digit number.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters.';
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm password.';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.';
    if (!photoFile) e.photo = 'Passport photo is required.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await authAPI.sendOTP(form.email.trim(), form.firstName.trim());
      onOTPSent({ ...form, passportPhoto: photoFile });
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to send verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const strength = getStrength(form.password);

  const inputStyle = (hasErr) => ({
    width: '100%', padding: '11px 14px', borderRadius: 10, boxSizing: 'border-box',
    border: `1.5px solid ${hasErr ? '#f87171' : 'rgba(99,102,241,0.18)'}`,
    background: hasErr ? '#fef2f2' : '#fafbff', outline: 'none',
    fontSize: '0.9rem', color: '#1f2937', fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.18s, box-shadow 0.18s',
  });

  const labelStyle = { display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: 6 };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {serverError && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: '#fef2f2', color: '#dc2626', fontSize: '0.84rem', padding: '12px 14px', borderRadius: 10, border: '1px solid #fecaca' }}>
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />{serverError}
        </div>
      )}

      {/* ── Passport Photo Upload ─────────────────────────────────────────── */}
      <div>
        <label style={labelStyle}>
          Passport Size Photo <span style={{ color: '#ef4444' }}>*</span>
        </label>

        {/* Drop zone / preview */}
        <div
          onClick={() => !photoPreview && photoInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setPhotoDragging(true); }}
          onDragLeave={() => setPhotoDragging(false)}
          onDrop={handlePhotoDrop}
          style={{
            position: 'relative',
            width: '100%',
            minHeight: 160,
            borderRadius: 14,
            border: `2px dashed ${errors.photo ? '#f87171' : photoDragging ? '#6366f1' : photoPreview ? '#10b981' : 'rgba(99,102,241,0.3)'}`,
            background: photoDragging
              ? 'rgba(99,102,241,0.04)'
              : photoPreview
                ? 'rgba(16,185,129,0.03)'
                : errors.photo ? '#fef2f2' : '#fafbff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            cursor: photoPreview ? 'default' : 'pointer',
            transition: 'all 0.2s',
            overflow: 'hidden',
          }}
        >
          {photoPreview ? (
            /* Preview mode */
            <>
              {/* 3:4 passport ratio container */}
              <div style={{ position: 'relative', width: 108, height: 144 }}>
                <img
                  src={photoPreview}
                  alt="Passport preview"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center top',
                    borderRadius: 8,
                    border: '3px solid #10b981',
                    boxShadow: '0 4px 18px rgba(16,185,129,0.25)',
                  }}
                />
                {/* Success badge */}
                <div style={{
                  position: 'absolute', top: -8, right: -8,
                  width: 24, height: 24, borderRadius: '50%',
                  background: '#10b981',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(16,185,129,0.4)',
                }}>
                  <CheckCircle2 size={14} color="#fff" />
                </div>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600, margin: 0 }}>
                ✓ Photo looks great!
              </p>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); photoInputRef.current?.click(); }}
                  style={{
                    padding: '5px 14px', borderRadius: 8, border: '1.5px solid rgba(99,102,241,0.3)',
                    background: '#fff', color: '#6366f1', fontSize: '0.76rem', fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removePhoto(); }}
                  style={{
                    padding: '5px 14px', borderRadius: 8, border: '1.5px solid rgba(239,68,68,0.25)',
                    background: '#fef2f2', color: '#ef4444', fontSize: '0.76rem', fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Remove
                </button>
              </div>
            </>
          ) : (
            /* Upload prompt */
            <>
              {/* Camera icon */}
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: photoDragging ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid rgba(99,102,241,0.2)',
                transition: 'all 0.2s',
              }}>
                <Camera size={24} color="#6366f1" />
              </div>

              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 700, color: '#4b5563' }}>
                  {photoDragging ? 'Drop photo here' : 'Upload passport photo'}
                </p>
                <p style={{ margin: '4px 0 0', fontSize: '0.76rem', color: '#9ca3af' }}>
                  Drag & drop or click to browse · JPG, PNG, WEBP · Max 5 MB
                </p>
              </div>

              {/* Passport size guide */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(99,102,241,0.06)', borderRadius: 8,
                padding: '6px 12px',
              }}>
                <Info size={12} color="#6366f1" />
                <span style={{ fontSize: '0.72rem', color: '#6366f1', fontWeight: 500 }}>
                  Face should be centered · Passport / ID size (3×4 cm)
                </span>
              </div>

              {/* Camera capture button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (photoInputRef.current) {
                    photoInputRef.current.setAttribute('capture', 'user');
                    photoInputRef.current.click();
                  }
                }}
                style={{
                  padding: '6px 16px', borderRadius: 8,
                  border: '1.5px solid rgba(99,102,241,0.25)',
                  background: 'rgba(99,102,241,0.06)', color: '#6366f1',
                  fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5,
                }}
              >
                <Camera size={13} /> Use Camera
              </button>
            </>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={photoInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: 'none' }}
          onChange={(e) => {
            // Remove capture attr after use so clicking "Browse" works normally again
            e.target.removeAttribute('capture');
            applyPhoto(e.target.files?.[0]);
          }}
        />

        {errors.photo && (
          <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: 5, display: 'flex', alignItems: 'center', gap: 4 }}>
            <AlertCircle size={11} />{errors.photo}
          </p>
        )}
      </div>

      {/* Name row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={labelStyle}>First Name</label>
          <input type="text" value={form.firstName} onChange={set('firstName')} placeholder="Aarav"
            style={inputStyle(!!errors.firstName)}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = errors.firstName ? '#f87171' : 'rgba(99,102,241,0.18)'}
          />
          {errors.firstName && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={11} />{errors.firstName}</p>}
        </div>
        <div>
          <label style={labelStyle}>Last Name</label>
          <input type="text" value={form.lastName} onChange={set('lastName')} placeholder="Patel"
            style={inputStyle(!!errors.lastName)}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = errors.lastName ? '#f87171' : 'rgba(99,102,241,0.18)'}
          />
          {errors.lastName && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={11} />{errors.lastName}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label style={labelStyle}>Email Address</label>
        <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com"
          style={inputStyle(!!errors.email)}
          onFocus={e => e.target.style.borderColor = '#6366f1'}
          onBlur={e => e.target.style.borderColor = errors.email ? '#f87171' : 'rgba(99,102,241,0.18)'}
        />
        {errors.email && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={11} />{errors.email}</p>}
      </div>

      {/* Mobile */}
      <div>
        <label style={labelStyle}>Mobile Number</label>
        <div style={{ display: 'flex' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0 12px', border: '1.5px solid rgba(99,102,241,0.18)', borderRight: 'none', borderRadius: '10px 0 0 10px', background: '#f3f4ff', color: '#6b7280', fontSize: '0.875rem', fontWeight: 600 }}>+91</span>
          <input type="tel" value={form.mobile} onChange={set('mobile')} placeholder="9876543210" maxLength={10}
            style={{ ...inputStyle(!!errors.mobile), borderRadius: '0 10px 10px 0', flex: 1 }}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = errors.mobile ? '#f87171' : 'rgba(99,102,241,0.18)'}
          />
        </div>
        {errors.mobile && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={11} />{errors.mobile}</p>}
      </div>

      {/* Password */}
      <div>
        <label style={labelStyle}>Password</label>
        <div style={{ position: 'relative' }}>
          <input type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="Min. 6 characters"
            style={{ ...inputStyle(!!errors.password), paddingRight: 40 }}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = errors.password ? '#f87171' : 'rgba(99,102,241,0.18)'}
          />
          <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}>
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {form.password && (
          <div style={{ marginTop: 8 }}>
            <div style={{ height: 5, borderRadius: 99, background: 'rgba(99,102,241,0.1)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(strength / 4) * 100}%`, background: strengthColor[strength], borderRadius: 99, transition: 'all 0.3s' }} />
            </div>
            <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: 4 }}>Strength: <span style={{ color: strengthColor[strength], fontWeight: 700 }}>{strengthLabel[strength]}</span></p>
          </div>
        )}
        {errors.password && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={11} />{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label style={labelStyle}>Confirm Password</label>
        <div style={{ position: 'relative' }}>
          <input type={showCpw ? 'text' : 'password'} value={form.confirmPassword} onChange={set('confirmPassword')} placeholder="Re-enter your password"
            style={{ ...inputStyle(!!errors.confirmPassword), paddingRight: 40 }}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = errors.confirmPassword ? '#f87171' : 'rgba(99,102,241,0.18)'}
          />
          <button type="button" onClick={() => setShowCpw(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}>
            {showCpw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={11} />{errors.confirmPassword}</p>}
      </div>

      <button type="submit" disabled={loading} style={{
        width: '100%', padding: '13px', borderRadius: 11, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
        background: loading ? 'rgba(99,102,241,0.6)' : 'linear-gradient(135deg,#6366f1,#7c3aed)',
        color: '#fff', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'inherit',
        boxShadow: '0 6px 24px rgba(99,102,241,0.4)', transition: 'all 0.2s',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        {loading ? (
          <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} /> Sending code…</>
        ) : 'Continue →'}
      </button>
    </form>
  );
}

// ─── Step 2: OTP Verification ─────────────────────────────────────────────────
function OTPVerification({ formData, onVerified, onBack }) {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [otp, setOtp]             = useState(['', '', '', '', '', '']);
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [registering, setRegistering] = useState(false);
  const inputRefs = useRef([]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleOtpChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    setError('');
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && i > 0) inputRefs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const otpValue = otp.join('');

  const handleVerify = async () => {
    if (otpValue.length < 6) { setError('Please enter the 6-digit code.'); return; }
    setLoading(true);
    setError('');
    try {
      await authAPI.verifyOTP(formData.email, otpValue);
      // OTP verified — now register the account
      setRegistering(true);
      const result = await register(formData);
      if (result.success) {
        onVerified();
        setTimeout(() => navigate('/onboarding'), 1600);
      } else {
        setError(result.error || 'Registration failed. Please try again.');
        setRegistering(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Incorrect code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || resending) return;
    setResending(true);
    setError('');
    setOtp(['', '', '', '', '', '']);
    try {
      await authAPI.sendOTP(formData.email, formData.firstName);
      setCountdown(60);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend code.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      {/* Icon */}
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.15))', border: '2px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Mail size={30} color="#6366f1" />
      </div>

      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#1e1b4b', fontSize: '1.4rem', margin: '0 0 6px' }}>Check your email</h2>
        <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
          We sent a 6-digit code to<br />
          <strong style={{ color: '#4f46e5' }}>{formData.email}</strong>
        </p>
      </div>

      {/* OTP inputs */}
      <div style={{ display: 'flex', gap: 10 }} onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={el => inputRefs.current[i] = el}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleOtpChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            autoFocus={i === 0}
            style={{
              width: 50, height: 58, textAlign: 'center',
              fontSize: '1.5rem', fontWeight: 800, color: '#1e1b4b',
              border: `2px solid ${digit ? '#6366f1' : error ? '#f87171' : 'rgba(99,102,241,0.2)'}`,
              borderRadius: 12, outline: 'none', fontFamily: 'Syne, sans-serif',
              background: digit ? 'rgba(99,102,241,0.05)' : '#fafbff',
              transition: 'all 0.15s',
              boxShadow: digit ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Error */}
      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#fef2f2', color: '#dc2626', fontSize: '0.84rem', padding: '10px 14px', borderRadius: 10, border: '1px solid #fecaca', width: '100%', boxSizing: 'border-box' }}>
          <AlertCircle size={14} />{error}
        </div>
      )}

      {/* Verify button */}
      <button
        onClick={handleVerify}
        disabled={loading || registering || otpValue.length < 6}
        style={{
          width: '100%', padding: '13px', borderRadius: 11, border: 'none',
          cursor: (loading || registering || otpValue.length < 6) ? 'not-allowed' : 'pointer',
          background: otpValue.length < 6 ? 'rgba(99,102,241,0.4)' : 'linear-gradient(135deg,#6366f1,#7c3aed)',
          color: '#fff', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'inherit',
          boxShadow: otpValue.length === 6 ? '0 6px 24px rgba(99,102,241,0.4)' : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'all 0.2s',
        }}
      >
        {loading || registering ? (
          <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
          {registering ? 'Creating account…' : 'Verifying…'}</>
        ) : <><ShieldCheck size={16} /> Verify & Create Account</>}
      </button>

      {/* Resend */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.84rem', color: '#9ca3af', marginBottom: 8 }}>
          Didn't receive the code?
        </p>
        <button
          onClick={handleResend}
          disabled={countdown > 0 || resending}
          style={{
            background: 'none', border: 'none', cursor: countdown > 0 ? 'not-allowed' : 'pointer',
            color: countdown > 0 ? '#9ca3af' : '#6366f1', fontWeight: 600, fontSize: '0.875rem',
            fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 8px',
          }}
        >
          <RefreshCw size={13} style={{ animation: resending ? 'spin 0.7s linear infinite' : 'none' }} />
          {countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
        </button>
      </div>

      {/* Back link */}
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit', padding: 0, transition: 'color 0.18s' }}
        onMouseEnter={e => e.currentTarget.style.color = '#6366f1'}
        onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
      >
        <ArrowLeft size={13} /> Use a different email
      </button>
    </div>
  );
}

// ─── Step 3: Success ──────────────────────────────────────────────────────────
function SuccessScreen() {
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <div style={{ width: 72, height: 72, background: 'rgba(16,185,129,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', border: '2px solid rgba(16,185,129,0.2)' }}>
        <CheckCircle2 size={36} color="#10b981" />
      </div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#1e1b4b', fontSize: '1.4rem', margin: '0 0 8px' }}>Account Created! 🎉</h2>
      <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>Email verified. Setting up your profile…</p>
    </div>
  );
}

// ─── Main RegisterPage ────────────────────────────────────────────────────────
export default function RegisterPage() {
  const [step, setStep]         = useState('form');   // 'form' | 'otp' | 'done'
  const [formData, setFormData] = useState(null);

  const handleOTPSent = (data) => { setFormData(data); setStep('otp'); };
  const handleVerified = () => setStep('done');
  const handleBack = () => setStep('form');

  const stepConfig = {
    form: { title: 'Create your account',     subtitle: 'Join thousands of students building their career with AI' },
    otp:  { title: 'Verify your email',        subtitle: 'Enter the 6-digit code we sent you' },
    done: { title: 'All done!',                subtitle: '' },
  };

  const cfg = stepConfig[step];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f0f2ff 0%,#f5f0ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 480 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: '1.25rem' }}>
            <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg,#6366f1,#7c3aed)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(99,102,241,0.45)' }}>
              <Zap size={18} color="#fff" />
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: '#1e1b4b' }}>
              Career<span style={{ color: '#6366f1' }}>Path AI</span>
            </span>
          </Link>
          {step !== 'done' && (
            <>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#1e1b4b', fontSize: '1.5rem', margin: '0 0 6px', letterSpacing: '-0.3px' }}>{cfg.title}</h1>
              {cfg.subtitle && <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>{cfg.subtitle}</p>}
            </>
          )}
        </div>

        {/* Progress steps */}
        {step !== 'done' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '1.75rem' }}>
            {['Details', 'Verify Email', 'Done'].map((label, i) => {
              const stepNum = i + 1;
              const currentStep = step === 'form' ? 1 : step === 'otp' ? 2 : 3;
              const isActive = stepNum === currentStep;
              const isDone = stepNum < currentStep;
              return (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isDone ? '#10b981' : isActive ? '#6366f1' : 'rgba(99,102,241,0.1)',
                      fontSize: '0.72rem', fontWeight: 800,
                      color: isDone || isActive ? '#fff' : '#9ca3af',
                    }}>
                      {isDone ? '✓' : stepNum}
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#6366f1' : isDone ? '#10b981' : '#9ca3af' }}>{label}</span>
                  </div>
                  {i < 2 && <div style={{ width: 32, height: 1.5, background: isDone ? '#10b981' : 'rgba(99,102,241,0.15)', borderRadius: 1 }} />}
                </div>
              );
            })}
          </div>
        )}

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '2rem', boxShadow: '0 8px 40px rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.08)' }}>
          {step === 'form' && <RegistrationForm onOTPSent={handleOTPSent} />}
          {step === 'otp'  && <OTPVerification formData={formData} onVerified={handleVerified} onBack={handleBack} />}
          {step === 'done' && <SuccessScreen />}

          {step === 'form' && (
            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#9ca3af', marginTop: '1.25rem', marginBottom: 0 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
