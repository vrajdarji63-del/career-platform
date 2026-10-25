import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, CheckCircle2, AlertCircle, Sparkles, ChevronRight, BarChart2, Map, Bot } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

// Career color palette for match bars
const CAREER_COLORS = ['#6366f1','#3b82f6','#f59e0b','#f97316','#10b981','#8b5cf6','#06b6d4','#ef4444'];

export default function AssessmentResultPage() {
  const { currentUser } = useAuth();

  // Pull real data from currentUser
  const recommendedCareer = currentUser?.recommendedCareer;
  const careerMatches     = currentUser?.careerMatches || [];
  const skills            = currentUser?.skills || [];
  const interests         = currentUser?.interests || [];

  // Build top result from recommendedCareer
  const topResult = recommendedCareer
    ? { career: recommendedCareer.title || recommendedCareer, careerId: recommendedCareer.id || '', match: recommendedCareer.match || 0 }
    : null;

  // Build match list — use careerMatches if available, else just top
  const matchList = careerMatches.length > 0
    ? careerMatches.map((c, i) => ({ career: c.title || c, careerId: c.id || '', match: c.match || 0, color: CAREER_COLORS[i % CAREER_COLORS.length] }))
    : topResult
      ? [{ ...topResult, color: CAREER_COLORS[0] }]
      : [];

  // Derive strengths from skills the user already has (>= 60 proficiency or just the skill names)
  const strongSkills  = skills.filter(s => typeof s === 'object' ? s.proficiency >= 60 : true).map(s => typeof s === 'string' ? s : s.name);
  const gapSkills     = skills.filter(s => typeof s === 'object' && s.proficiency < 60).map(s => s.name);

  // Fallback strengths from interests
  const strengthList  = strongSkills.length  > 0 ? strongSkills.slice(0, 5)  : interests.slice(0, 4);
  const improvList    = gapSkills.length > 0 ? gapSkills.slice(0, 4) : ['Complete your assessment for personalized gaps'];

  if (!topResult) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '48rem', margin: '0 auto' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(99,102,241,0.4)', flexShrink: 0 }}>
              <Sparkles size={17} color="#fff" />
            </div>
            <h1 className="s-page-title" style={{ margin: 0 }}>Career Assessment Results</h1>
          </div>
          <p className="s-page-sub">Complete your onboarding or assessment to see your personalized career matches.</p>
        </div>
        <div className="s-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <BarChart2 size={24} color="#6366f1" />
          </div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e1b4b', margin: '0 0 8px', fontFamily: 'Syne, sans-serif' }}>No results yet</h2>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '0 0 1.5rem' }}>Take the career assessment or complete onboarding to get your personalized career matches.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/assessment" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 11, background: 'linear-gradient(135deg,#6366f1,#7c3aed)', color: '#fff', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(99,102,241,0.4)' }}>
              Take Assessment <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '48rem', margin: '0 auto' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(99,102,241,0.4)', flexShrink: 0 }}>
            <Sparkles size={17} color="#fff" />
          </div>
          <h1 className="s-page-title" style={{ margin: 0 }}>Career Assessment Results</h1>
        </div>
        <p className="s-page-sub">Based on your interests and skills, here are your top career matches.</p>
      </div>

      {/* Top Match Highlight */}
      <div style={{ background: 'linear-gradient(135deg, #5558ea 0%, #7c3aed 100%)', borderRadius: 20, padding: '1.75rem', boxShadow: '0 8px 32px rgba(99,102,241,0.45)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: 12 }}>
              🎯 Best Career Match
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif', margin: '0 0 6px', letterSpacing: '-0.4px' }}>{topResult.career}</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', margin: 0 }}>This career aligns strongly with your skills and interests.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>{topResult.match}%</div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginTop: 4 }}>Match Score</p>
          </div>
        </div>
        <div style={{ position: 'relative', marginTop: '1.25rem', height: 8, borderRadius: 99, background: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
          <div style={{ width: `${topResult.match}%`, height: '100%', background: 'rgba(255,255,255,0.85)', borderRadius: 99 }} />
        </div>
        <div style={{ position: 'relative', display: 'flex', gap: 10, marginTop: '1.5rem', flexWrap: 'wrap' }}>
          {topResult.careerId && (
            <Link to={`/career/${topResult.careerId}`}>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 11, background: '#fff', color: '#6366f1', fontWeight: 700, fontSize: '0.875rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'} onMouseLeave={e => e.currentTarget.style.transform = ''}>
                Explore This Career <ArrowRight size={15} />
              </button>
            </Link>
          )}
          <Link to="/roadmap">
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 11, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = ''; }}>
              View Roadmap
            </button>
          </Link>
        </div>
      </div>

      {/* All Career Matches */}
      {matchList.length > 0 && (
        <div className="s-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart2 size={15} color="#6366f1" />
            </div>
            <h3 style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '1rem', fontFamily: 'Syne, sans-serif', margin: 0 }}>All Career Matches</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {matchList.map((result, i) => (
              <div key={result.career} style={{ padding: i > 0 ? '0.875rem 0 0' : '0', borderTop: i > 0 ? '1px solid rgba(99,102,241,0.06)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {i === 0 && <span style={{ fontSize: '0.72rem', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', padding: '2px 10px', borderRadius: 99, fontWeight: 700 }}>🏆 Top Match</span>}
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e1b4b' }}>{result.career}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: result.color, fontFamily: 'Syne, sans-serif' }}>{result.match}%</span>
                    {result.careerId && (
                      <Link to={`/career/${result.careerId}`} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.78rem', color: '#6366f1', textDecoration: 'none', fontWeight: 600, padding: '4px 10px', borderRadius: 8, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', transition: 'all 0.18s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.14)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.08)'}>
                        View <ChevronRight size={11} />
                      </Link>
                    )}
                  </div>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                  <div style={{ width: `${result.match}%`, height: '100%', background: result.color, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths & Improvements derived from user's real skills/interests */}
      <div className="grid-responsive-2">
        <div className="s-card" style={{ border: '1px solid rgba(16,185,129,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={15} color="#10b981" />
            </div>
            <h3 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', fontFamily: 'Syne, sans-serif', margin: 0 }}>Your Strengths</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {(strengthList.length > 0 ? strengthList : ['Complete assessment for details']).map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: '#374151' }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle2 size={12} color="#10b981" />
                </div>
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="s-card" style={{ border: '1px solid rgba(245,158,11,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={15} color="#f59e0b" />
            </div>
            <h3 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', fontFamily: 'Syne, sans-serif', margin: 0 }}>Areas to Improve</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {improvList.map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: '#374151' }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <TrendingUp size={12} color="#f59e0b" />
                </div>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="s-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(6,182,212,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowRight size={15} color="#06b6d4" />
          </div>
          <h3 style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '0.95rem', fontFamily: 'Syne, sans-serif', margin: 0 }}>Recommended Next Steps</h3>
        </div>
        <div className="grid-responsive-3">
          {[
            { label: 'View Skill Gap', to: '/skill-gap', icon: BarChart2, desc: 'See exactly which skills you need.', color: '#6366f1', bg: 'rgba(99,102,241,0.06)', border: 'rgba(99,102,241,0.1)' },
            { label: 'Start Roadmap',  to: '/roadmap',   icon: Map,       desc: 'Follow your personalized path.', color: '#10b981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.1)' },
            { label: 'Ask AI Advisor', to: '/ai-advisor', icon: Bot,      desc: 'Get tailored career advice.',    color: '#8b5cf6', bg: 'rgba(139,92,246,0.06)', border: 'rgba(139,92,246,0.1)' },
          ].map((step) => {
            const Icon = step.icon;
            return (
              <Link key={step.label} to={step.to} style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', background: step.bg, borderRadius: 14, padding: '1.25rem', border: `1px solid ${step.border}`, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${step.bg}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 11, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, boxShadow: `0 2px 8px ${step.color}20` }}>
                  <Icon size={18} color={step.color} />
                </div>
                <p style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.875rem', marginBottom: 4, fontFamily: 'Syne, sans-serif' }}>{step.label}</p>
                <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
