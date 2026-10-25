import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, CheckCircle2, ArrowRight, ChevronRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { authAPI } from '../../services/api.js';

const INTERESTS = [
  { label: 'Web Development',         icon: '🌐', desc: 'Build websites & web apps' },
  { label: 'Data & Analytics',        icon: '📊', desc: 'Analyze data & insights' },
  { label: 'Artificial Intelligence', icon: '🤖', desc: 'AI, ML & deep learning' },
  { label: 'Infrastructure & DevOps', icon: '☁️', desc: 'Cloud, servers & pipelines' },
  { label: 'Cybersecurity',           icon: '🔒', desc: 'Security & ethical hacking' },
  { label: 'UI/UX Design',            icon: '🎨', desc: 'Design beautiful interfaces' },
];

const SKILLS = [
  'HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C++',
  'React', 'Node.js', 'SQL', 'Git', 'TypeScript', 'PHP',
  'Figma', 'Excel', 'Linux', 'Docker',
];

const leftPanelContent = [
  { step: '01', title: 'Pick your interests', desc: 'Tell us what excites you most in tech.' },
  { step: '02', title: 'Share your skills',   desc: 'Let us know what you already know.' },
  { step: '03', title: 'Get your matches',    desc: 'AI finds your perfect career paths.' },
];

export default function OnboardingPage() {
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const [step, setStep]                   = useState(1);
  const [selectedInterests, setInterests] = useState([]);
  const [selectedSkills, setSkills]       = useState([]);
  const [loading, setLoading]             = useState(false);
  const [result, setResult]               = useState(null);
  const [error, setError]                 = useState('');

  const toggleInterest = (label) =>
    setInterests((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );

  const toggleSkill = (skill) =>
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );

  const handleSubmit = async () => {
    if (!selectedInterests.length) return;
    setLoading(true);
    setError('');
    try {
      const res = await authAPI.completeOnboarding({
        interests: selectedInterests,
        selectedSkills,
      });
      setResult(res.data);
      completeOnboarding(res.data.user);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Scoped styles matching LoginPage exactly ──────────────────────────────────
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');
    .ob-root {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      font-family: 'Inter', sans-serif;
    }
    @media (max-width: 900px) {
      .ob-root { grid-template-columns: 1fr; }
      .ob-left  { display: none; }
    }
    .ob-left {
      background: linear-gradient(145deg, #1a1060 0%, #2d2080 50%, #1a1060 100%);
      display: flex; flex-direction: column; justify-content: center;
      padding: 3rem; position: relative; overflow: hidden;
    }
    .ob-left::before {
      content: '';
      position: absolute; top: -100px; right: -100px;
      width: 500px; height: 500px; border-radius: 50%;
      background: radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%);
    }
    .ob-left::after {
      content: '';
      position: absolute; bottom: -80px; left: -80px;
      width: 400px; height: 400px; border-radius: 50%;
      background: radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%);
    }
    .ob-right {
      background: #f8f9ff;
      display: flex; flex-direction: column; justify-content: center;
      align-items: center; padding: 2rem; overflow-y: auto;
    }
    .ob-form-wrap { width: 100%; max-width: 440px; }
    .ob-logo {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none; margin-bottom: 1.75rem;
    }
    .ob-card {
      background: #fff;
      border-radius: 20px; padding: 1.75rem;
      box-shadow: 0 8px 40px rgba(99,102,241,0.12), 0 1px 4px rgba(0,0,0,0.04);
      border: 1px solid rgba(99,102,241,0.08);
    }
    .ob-submit {
      width: 100%; padding: 13px;
      background: linear-gradient(135deg,#6366f1,#7c3aed);
      border: none; border-radius: 12px; color: #fff;
      font-size: 0.95rem; font-weight: 700; cursor: pointer;
      font-family: 'Inter', sans-serif;
      transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
      box-shadow: 0 4px 20px rgba(99,102,241,0.45);
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .ob-submit:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 8px 32px rgba(99,102,241,0.6);
    }
    .ob-submit:disabled { opacity: 0.55; cursor: not-allowed; }
    .ob-back-btn {
      background: none; border: none; cursor: pointer;
      font-size: 0.875rem; color: #9ca3af; font-family: 'Inter', sans-serif;
      padding: 0; display: flex; align-items: center; gap: 4px;
      transition: color 0.2s;
    }
    .ob-back-btn:hover { color: #6366f1; }
    .ob-interest-btn {
      text-align: left; padding: 1rem; border-radius: 14px;
      border: 1.5px solid #e5e7eb; background: #f9fafb;
      cursor: pointer; transition: all 0.18s; width: 100%;
      font-family: 'Inter', sans-serif;
    }
    .ob-interest-btn:hover {
      border-color: #a5b4fc;
      background: #fafbff;
      box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
    }
    .ob-interest-btn.active {
      border-color: #6366f1;
      background: rgba(99,102,241,0.06);
      box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
    }
    .ob-skill-btn {
      padding: 7px 16px; border-radius: 99px;
      border: 1.5px solid #e5e7eb; background: #f9fafb;
      font-size: 0.875rem; font-weight: 500; cursor: pointer;
      font-family: 'Inter', sans-serif; color: #374151;
      transition: all 0.18s;
    }
    .ob-skill-btn:hover { border-color: #a5b4fc; background: #fafbff; }
    .ob-skill-btn.active {
      background: linear-gradient(135deg,#6366f1,#7c3aed);
      color: #fff; border-color: transparent;
      box-shadow: 0 2px 10px rgba(99,102,241,0.35);
    }
    .ob-step-dot {
      width: 32px; height: 32px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.8rem; font-weight: 700; transition: all 0.25s;
      flex-shrink: 0;
    }
    .ob-step-dot.done   { background: linear-gradient(135deg,#6366f1,#7c3aed); color: #fff; box-shadow: 0 2px 10px rgba(99,102,241,0.4); }
    .ob-step-dot.active { background: rgba(99,102,241,0.15); color: #6366f1; border: 2px solid #6366f1; }
    .ob-step-dot.idle   { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.3); border: 2px solid rgba(255,255,255,0.1); }
    .ob-step-line { flex: 1; height: 1px; background: rgba(255,255,255,0.12); margin: 0 6px; }
    .ob-step-line.done  { background: rgba(99,102,241,0.6); }
    .ob-error {
      display: flex; align-items: center; gap: 8px;
      background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.18);
      color: #dc2626; font-size: 0.85rem;
      padding: 10px 14px; border-radius: 10px; margin-bottom: 1.25rem;
    }
    .ob-spinner {
      width: 18px; height: 18px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff; border-radius: 50%;
      animation: ob-spin 0.7s linear infinite;
    }
    @keyframes ob-spin { to { transform: rotate(360deg); } }
    .ob-result-card {
      background: linear-gradient(135deg,#6366f1,#7c3aed);
      border-radius: 18px; padding: 1.5rem; color: #fff;
      margin-bottom: 1rem; position: relative; overflow: hidden;
    }
    .ob-result-card::after {
      content: '';
      position: absolute; top: -60px; right: -60px;
      width: 180px; height: 180px; border-radius: 50%;
      background: rgba(255,255,255,0.07);
    }
    .stat-pill {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
      border-radius: 99px; padding: 5px 12px;
      font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.8);
    }
  `;

  // ── Step 3: Career Result ─────────────────────────────────────────────────────
  if (step === 3 && result) {
    const top     = result.topCareer;
    const matches = result.careerMatches?.slice(0, 4) || [];
    return (
      <>
        <style>{styles}</style>
        <div className="ob-root">
          {/* Left panel */}
          <div className="ob-left">
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '3rem' }}>
                <div style={{
                  width: 42, height: 42, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(99,102,241,0.6)',
                }}>
                  <Zap size={20} color="#fff" />
                </div>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.3px' }}>
                  Career<span style={{ color: '#a5b4fc' }}>Path AI</span>
                </span>
              </div>

              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: '1rem' }}>
                You're all set!<br />
                <span style={{ background: 'linear-gradient(135deg,#a5b4fc,#c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Your journey begins.
                </span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontSize: '1rem', marginBottom: '2.5rem', maxWidth: 340 }}>
                We've analyzed your profile and matched you with the best career paths for your interests and skills.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: '🎯', text: 'Personalized career matches' },
                  { icon: '📚', text: 'Custom learning roadmaps' },
                  { icon: '⚡', text: 'AI advisor ready for you' },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 7, background: 'rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle2 size={12} color="#a5b4fc" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="ob-right">
            <div className="ob-form-wrap">
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ width: 56, height: 56, background: 'rgba(99,102,241,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <CheckCircle2 size={28} color="#6366f1" />
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e1b4b', fontFamily: 'Syne, sans-serif', margin: '0 0 6px', letterSpacing: '-0.4px' }}>
                  Your Career Matches
                </h2>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>
                  Based on your interests and skills — here are your best fits
                </p>
              </div>

              <div className="ob-card">
                {/* Top match */}
                <div className="ob-result-card">
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>
                    🏆 Best Match
                  </p>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'Syne, sans-serif', margin: '0 0 8px', position: 'relative', zIndex: 1 }}>
                    {top?.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12, position: 'relative', zIndex: 1 }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>{top?.match}%</span>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>match score</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 99, height: 6, position: 'relative', zIndex: 1 }}>
                    <div style={{ height: 6, borderRadius: 99, background: '#fff', width: `${top?.match}%`, transition: 'width 0.6s ease' }} />
                  </div>
                </div>

                {/* Other matches */}
                {matches.length > 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1.25rem' }}>
                    {matches.slice(1).map((c) => (
                      <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#f9fafb', borderRadius: 12, border: '1px solid #f0f0f0' }}>
                        <div>
                          <p style={{ fontWeight: 600, color: '#1e1b4b', fontSize: '0.875rem', margin: '0 0 2px' }}>{c.title}</p>
                          <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: 0 }}>{c.match}% match</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 80, background: '#e5e7eb', borderRadius: 99, height: 5 }}>
                            <div style={{ height: 5, borderRadius: 99, background: '#6366f1', width: `${c.match}%` }} />
                          </div>
                          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6366f1', minWidth: 36, textAlign: 'right' }}>{c.match}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button className="ob-submit" onClick={() => navigate('/dashboard')}>
                  Go to My Dashboard <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Steps 1 & 2 ──────────────────────────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>
      <div className="ob-root">

        {/* ── Left panel ── */}
        <div className="ob-left">
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '3rem' }}>
              <div style={{
                width: 42, height: 42, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(99,102,241,0.6)',
              }}>
                <Zap size={20} color="#fff" />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.3px' }}>
                Career<span style={{ color: '#a5b4fc' }}>Path AI</span>
              </span>
            </div>

            {/* Heading */}
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: '1rem' }}>
              Let's personalize<br />
              <span style={{ background: 'linear-gradient(135deg,#a5b4fc,#c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                your career path.
              </span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontSize: '1rem', marginBottom: '2.5rem', maxWidth: 340 }}>
              Just 2 quick steps and our AI will match you with the perfect career paths.
            </p>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {leftPanelContent.map(({ step: s, title, desc }, i) => {
                const stepNum = i + 1;
                const isDone   = step > stepNum;
                const isActive = step === stepNum;
                return (
                  <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div className={`ob-step-dot ${isDone ? 'done' : isActive ? 'active' : 'idle'}`}>
                      {isDone ? <CheckCircle2 size={15} /> : s}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: isActive ? '#fff' : isDone ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)', margin: '0 0 2px', transition: 'color 0.2s' }}>
                        {title}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stat pills */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div className="stat-pill">🎯 AI-powered</div>
              <div className="stat-pill">✅ Free to use</div>
              <div className="stat-pill">⚡ 2 minutes</div>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="ob-right">
          <div className="ob-form-wrap">
            {/* Mobile logo */}
            <Link to="/" className="ob-logo">
              <div style={{
                width: 36, height: 36, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
              }}>
                <Zap size={17} color="#fff" />
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e1b4b', fontFamily: 'Syne, sans-serif' }}>
                Career<span style={{ color: '#6366f1' }}>Path AI</span>
              </span>
            </Link>

            {/* Heading */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e1b4b', fontFamily: 'Syne, sans-serif', margin: '0 0 6px', letterSpacing: '-0.4px' }}>
                {step === 1 ? 'What are you interested in?' : 'What skills do you have?'}
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>
                {step === 1
                  ? "Select all that apply — we'll find your best career matches"
                  : 'Select skills you already know (optional — skip if unsure)'}
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
              {[1, 2].map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', flex: s < 2 ? 'none' : 1, gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.78rem', fontWeight: 700, transition: 'all 0.25s',
                    background: step > s
                      ? 'linear-gradient(135deg,#6366f1,#7c3aed)'
                      : step === s
                        ? 'rgba(99,102,241,0.12)'
                        : '#f3f4f6',
                    color: step > s ? '#fff' : step === s ? '#6366f1' : '#9ca3af',
                    border: step === s ? '2px solid #6366f1' : '2px solid transparent',
                    boxShadow: step > s ? '0 2px 8px rgba(99,102,241,0.35)' : 'none',
                  }}>
                    {step > s ? <CheckCircle2 size={13} /> : s}
                  </div>
                  {s < 2 && (
                    <div style={{ flex: 1, height: 3, borderRadius: 99, background: step > s ? '#6366f1' : '#e5e7eb', transition: 'background 0.3s', minWidth: 40 }} />
                  )}
                </div>
              ))}
              <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600, whiteSpace: 'nowrap' }}>
                Step {step} of 2
              </span>
            </div>

            {/* Card */}
            <div className="ob-card">
              {error && (
                <div className="ob-error">
                  <AlertCircle size={15} /> {error}
                </div>
              )}

              {step === 1 ? (
                /* ── Interests grid ── */
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {INTERESTS.map(({ label, icon, desc }) => {
                    const active = selectedInterests.includes(label);
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => toggleInterest(label)}
                        className={`ob-interest-btn${active ? ' active' : ''}`}
                      >
                        <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: 6 }}>{icon}</span>
                        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: active ? '#6366f1' : '#1e1b4b', margin: '0 0 2px' }}>{label}</p>
                        <p style={{ fontSize: '0.72rem', color: '#9ca3af', margin: 0 }}>{desc}</p>
                        {active && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                            <CheckCircle2 size={11} color="#6366f1" />
                            <span style={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: 600 }}>Selected</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* ── Skills pills ── */
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {SKILLS.map((skill) => {
                    const active = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`ob-skill-btn${active ? ' active' : ''}`}
                      >
                        {active && '✓ '}{skill}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #f0f0f0' }}>
                {step === 2 ? (
                  <button type="button" className="ob-back-btn" onClick={() => setStep(1)}>
                    ← Back
                  </button>
                ) : <div />}

                {step === 1 ? (
                  <button
                    type="button"
                    disabled={!selectedInterests.length}
                    onClick={() => setStep(2)}
                    className="ob-submit"
                    style={{ width: 'auto', padding: '11px 24px' }}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="ob-submit"
                    style={{ width: 'auto', padding: '11px 24px' }}
                  >
                    {loading ? (
                      <><span className="ob-spinner" /> Finding matches…</>
                    ) : (
                      <>Find My Careers <ArrowRight size={16} /></>
                    )}
                  </button>
                )}
              </div>
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#d1d5db', marginTop: '1.25rem' }}>
              {step === 1
                ? 'Select at least 1 interest to continue'
                : 'You can skip by clicking "Find My Careers" without selecting any skills'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
