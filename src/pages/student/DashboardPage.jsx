import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, TrendingUp, BookOpen, Map, Zap, Target, Activity, Rocket, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { projects } from '../../data/projects.js';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const quickActions = [
  { label: 'Take Assessment', to: '/assessment',        icon: BookOpen,  color: '#6366f1', bg: 'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(99,102,241,0.06))' },
  { label: 'View Roadmap',    to: '/roadmap',           icon: Map,       color: '#8b5cf6', bg: 'linear-gradient(135deg,rgba(139,92,246,0.12),rgba(139,92,246,0.06))' },
  { label: 'AI Advisor',      to: '/ai-advisor',        icon: Zap,       color: '#06b6d4', bg: 'linear-gradient(135deg,rgba(6,182,212,0.12),rgba(6,182,212,0.06))'  },
  { label: 'Career Matches',  to: '/assessment-result', icon: Target,    color: '#10b981', bg: 'linear-gradient(135deg,rgba(16,185,129,0.12),rgba(16,185,129,0.06))' },
];

export default function DashboardPage() {
  const { currentUser } = useAuth();

  const firstName       = currentUser?.firstName || currentUser?.name?.split(' ')[0] || 'Student';
  const careerReadiness = currentUser?.careerReadiness ?? 0;
  const recommended     = currentUser?.recommendedCareer;
  const skills          = currentUser?.skills || [];
  const aiTip           = currentUser?.aiRecommendation || 'Complete your career assessment to get personalized AI recommendations tailored to your profile.';
  const roadmap         = currentUser?.currentRoadmap;

  const recommendedProjects = projects.slice(0, 2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="s-page-title">{getGreeting()}, {firstName} 👋</h1>
          <p className="s-page-sub">Here's your career progress at a glance.</p>
        </div>
        <Link
          to="/assessment"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '10px 18px', borderRadius: 11,
            background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
            color: '#fff', fontWeight: 600, fontSize: '0.875rem',
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(99,102,241,0.55)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.4)'; }}
        >
          <Rocket size={15} />
          Take Assessment
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid-4">
        {/* Career Readiness */}
        <div className="s-stat-card fade-up stagger-1">
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Career Readiness
          </p>
          <div style={{ fontSize: '2.75rem', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>
            {careerReadiness}%
          </div>
          <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.15)', overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ width: `${careerReadiness}%`, height: '100%', background: 'rgba(255,255,255,0.9)', borderRadius: 99 }} />
          </div>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>
            {careerReadiness > 0 ? 'Keep improving your skills!' : 'Complete onboarding to start'}
          </p>
        </div>

        {/* Recommended Career */}
        <div className="s-card fade-up stagger-2" style={{ borderLeft: '3px solid rgba(16,185,129,0.5)' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Recommended Career</p>
          {recommended?.title ? (
            <>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: '#1e1b4b', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>{recommended.title}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <TrendingUp size={14} color="#10b981" />
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981', fontFamily: 'Syne, sans-serif' }}>{recommended.match}%</span>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>match</span>
              </div>
              <div style={{ height: 5, borderRadius: 99, background: 'rgba(16,185,129,0.1)', overflow: 'hidden' }}>
                <div style={{ width: `${recommended.match}%`, height: '100%', background: 'linear-gradient(90deg,#10b981,#34d399)', borderRadius: 99 }} />
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                <Target size={20} color="#6366f1" />
              </div>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginBottom: 10 }}>Complete your profile to get a recommendation</p>
              <Link to="/assessment" style={{ fontSize: '0.8rem', color: '#6366f1', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                Take Assessment <ChevronRight size={13} />
              </Link>
            </div>
          )}
        </div>

        {/* Current Roadmap */}
        <div className="s-card fade-up stagger-3" style={{ borderLeft: '3px solid rgba(99,102,241,0.4)' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Current Roadmap</p>
          <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e1b4b', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>
            {roadmap?.title || 'No roadmap yet'}
          </p>
          <div style={{ height: 5, borderRadius: 99, background: 'rgba(99,102,241,0.08)', overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ width: `${roadmap?.progress || 0}%`, height: '100%', background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', borderRadius: 99 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Progress</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1' }}>{roadmap?.progress || 0}%</span>
          </div>
        </div>

        {/* Skills Count */}
        <div className="s-card fade-up stagger-4" style={{ borderLeft: '3px solid rgba(6,182,212,0.4)' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Skills Tracked</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 8 }}>
            <p style={{ fontSize: '2.75rem', fontWeight: 800, color: '#1e1b4b', lineHeight: 1, fontFamily: 'Syne, sans-serif' }}>{skills.length}</p>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(6,182,212,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
              <Activity size={14} color="#06b6d4" />
            </div>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: 10 }}>
            {skills.length > 0 ? `Avg. proficiency: ${Math.round(skills.reduce((s, sk) => s + sk.proficiency, 0) / skills.length)}%` : 'No skills added yet'}
          </p>
          <Link to="/skill-gap" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', color: '#06b6d4', fontWeight: 700, textDecoration: 'none' }}>
            View Skill Gap <ChevronRight size={13} />
          </Link>
        </div>
      </div>

      {/* Skills + AI Tip row */}
      <div className="grid-responsive-2">
        {/* Skill Progress */}
        <div className="s-card fade-up">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={15} color="#6366f1" />
              </div>
              <h3 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem' }}>Skill Progress</h3>
            </div>
            <Link to="/skill-gap" style={{ fontSize: '0.8rem', color: '#6366f1', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
              View All <ChevronRight size={12} />
            </Link>
          </div>
          {skills.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📊</div>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: 14 }}>No skills tracked yet</p>
              <Link to="/assessment" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: '0.85rem', background: 'linear-gradient(135deg,#6366f1,#7c3aed)',
                color: '#fff', padding: '9px 16px', borderRadius: 9, textDecoration: 'none', fontWeight: 600,
                boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
              }}>
                <BookOpen size={14} />
                Take Assessment
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {skills.slice(0, 5).map((skill) => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>{skill.name}</span>
                    <span style={{
                      fontSize: '0.75rem', fontWeight: 700, color: '#6366f1',
                      background: 'rgba(99,102,241,0.08)', padding: '2px 8px', borderRadius: 99,
                    }}>{skill.proficiency}%</span>
                  </div>
                  <div className="s-progress-track">
                    <div className="s-progress-fill" style={{ width: `${skill.proficiency}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Recommendation */}
        <div className="s-card fade-up stagger-2" style={{
          background: 'linear-gradient(135deg, #faf8ff, #f5f0ff)',
          border: '1px solid rgba(99,102,241,0.12)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative gradient */}
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(99,102,241,0.06)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
            }}>
              <Lightbulb size={20} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', margin: 0 }}>AI Career Tip</h3>
              <p style={{ fontSize: '0.72rem', color: '#a78bfa', margin: 0, fontWeight: 600 }}>Personalized just for you</p>
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.6)', borderRadius: 12, padding: '1rem',
            border: '1px solid rgba(99,102,241,0.08)', marginBottom: '1.25rem',
          }}>
            <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>{aiTip}</p>
          </div>
          <Link to="/ai-advisor" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '9px 16px', borderRadius: 9,
            background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
            color: '#fff', fontWeight: 600, fontSize: '0.82rem', textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
          >
            Chat with AI Advisor <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Recommended Projects */}
      <div className="s-card fade-up">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(139,92,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={15} color="#8b5cf6" />
            </div>
            <h3 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem' }}>Recommended Projects</h3>
          </div>
          <Link to="/projects" style={{ fontSize: '0.8rem', color: '#6366f1', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
            View All <ChevronRight size={12} />
          </Link>
        </div>
        <div className="grid-responsive-2">
          {recommendedProjects.map((p, i) => (
            <div key={p.id} style={{
              background: 'linear-gradient(135deg, #fafbff, #f5f0ff)',
              borderRadius: 14, padding: '1.25rem',
              border: '1px solid rgba(99,102,241,0.08)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.12)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.08)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{p.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.875rem', marginBottom: 4 }}>{p.title}</p>
                  <span style={{
                    fontSize: '0.72rem', background: 'rgba(99,102,241,0.1)', color: '#6366f1',
                    padding: '2px 8px', borderRadius: 99, fontWeight: 700,
                  }}>{p.difficulty}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.55 }}>{p.description.slice(0, 80)}…</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="s-card fade-up">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(6,182,212,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={15} color="#06b6d4" />
          </div>
          <h3 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem' }}>Quick Actions</h3>
        </div>
        <div className="grid-4">
          {quickActions.map(({ label, to, icon: Icon, color, bg }) => (
            <Link
              key={label}
              to={to}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                padding: '1.5rem 1rem',
                background: bg, borderRadius: 14, textDecoration: 'none',
                transition: 'all 0.2s',
                border: `1px solid ${color}18`,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${color}25`; e.currentTarget.style.borderColor = `${color}35`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = `${color}18`; }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 4px 16px ${color}20, 0 1px 4px rgba(0,0,0,0.06)`,
              }}>
                <Icon size={22} color={color} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color, textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
