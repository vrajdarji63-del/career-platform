import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, BarChart2, Map, Zap,
  Star, TrendingUp, BookOpen, Target, Sparkles, ChevronRight,
  Users, Award
} from 'lucide-react';
import CareerCard from '../../components/career/CareerCard.jsx';
import { careers } from '../../data/careers.js';

const features = [
  { icon: Target, title: 'Career Assessment', desc: 'Discover your ideal career path with our AI-powered multi-step assessment.', color: '#6366f1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.12)' },
  { icon: BarChart2, title: 'Skill Gap Analysis', desc: 'Identify exactly which skills you need to reach your career goal.', color: '#06b6d4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.12)' },
  { icon: Map, title: 'Career Roadmap', desc: 'Follow a personalized step-by-step roadmap to reach your target career.', color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.12)' },
  { icon: BookOpen, title: 'Project Portfolio', desc: 'Build real-world projects that demonstrate your skills to employers.', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.12)' },
  { icon: TrendingUp, title: 'Progress Tracking', desc: 'Track your learning progress and celebrate milestones along the way.', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.12)' },
  { icon: Zap, title: 'AI Career Advisor', desc: 'Get instant career guidance and personalized advice from our AI advisor.', color: '#f43f5e', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.12)' },
];

const steps = [
  { num: '01', title: 'Take the Assessment', desc: 'Answer questions about your interests, skills, and goals in under 10 minutes.' },
  { num: '02', title: 'Get Your Career Matches', desc: 'Receive personalized career recommendations with match percentages.' },
  { num: '03', title: 'See Your Skill Gaps', desc: 'Understand exactly which skills you need to develop for your chosen career.' },
  { num: '04', title: 'Follow Your Roadmap', desc: 'Execute a step-by-step roadmap with resources, projects, and milestones.' },
];

const stats = [
  { value: '1,200+', label: 'Active Students', icon: Users },
  { value: '10', label: 'Career Paths', icon: Map },
  { value: '2,800+', label: 'Assessments Done', icon: CheckCircle2 },
  { value: '85%', label: 'Placement Rate', icon: Award },
];

const testimonials = [
  { name: 'Aarav Patel', role: 'Frontend Developer @ Razorpay', text: 'CareerPath AI helped me identify my skill gaps and gave me a clear roadmap. Landed my dream job in 4 months!', avatar: 'AP', rating: 5, color: '#6366f1' },
  { name: 'Meera Reddy', role: 'Data Analyst @ Flipkart', text: 'The AI advisor gave me advice that was actually relevant to my profile. It felt like talking to a real career counselor.', avatar: 'MR', rating: 5, color: '#8b5cf6' },
  { name: 'Arjun Kumar', role: 'Backend Dev @ Swiggy', text: 'The skill gap analysis was eye-opening. I knew exactly what to learn instead of wasting time on random tutorials.', avatar: 'AK', rating: 5, color: '#06b6d4' },
];

// Dashboard Preview Component
function DashboardPreview() {
  return (
    <div className="float-anim" style={{ position: 'relative', width: '100%', maxWidth: 420, margin: '0 auto' }}>
      {/* Main card */}
      <div style={{
        background: '#fff', borderRadius: 20,
        boxShadow: '0 24px 80px rgba(99,102,241,0.2), 0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(99,102,241,0.08)',
        padding: '1.5rem', overflow: 'hidden', position: 'relative',
      }}>
        {/* Top gradient bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <p style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: 2 }}>Good morning 👋</p>
            <h3 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '1rem', fontFamily: 'Syne, sans-serif' }}>Aarav Patel</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(16,185,129,0.08)', color: '#059669', fontSize: '0.75rem', fontWeight: 600, padding: '5px 12px', borderRadius: 99, border: '1px solid rgba(16,185,129,0.15)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse-dot 1.8s ease infinite' }} />
            Active
          </div>
        </div>

        {/* Career Readiness */}
        <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.06))', borderRadius: 14, padding: '1rem', marginBottom: '1.25rem', border: '1px solid rgba(99,102,241,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#4b5563' }}>Career Readiness</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#6366f1', fontFamily: 'Syne, sans-serif' }}>78%</span>
          </div>
          <div style={{ height: 8, borderRadius: 99, background: 'rgba(99,102,241,0.12)', overflow: 'hidden' }}>
            <div style={{ width: '78%', height: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: 99 }} />
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>SKILL PROGRESS</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { name: 'JavaScript', val: 70, color: '#f59e0b' },
              { name: 'React', val: 45, color: '#6366f1' },
              { name: 'HTML/CSS', val: 90, color: '#10b981' },
            ].map((s) => (
              <div key={s.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 5 }}>
                  <span style={{ color: '#374151', fontWeight: 500 }}>{s.name}</span>
                  <span style={{ fontWeight: 700, color: s.color }}>{s.val}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                  <div style={{ width: `${s.val}%`, height: '100%', background: s.color, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Match */}
        <div style={{ background: 'rgba(99,102,241,0.04)', borderRadius: 12, padding: '0.875rem', border: '1px solid rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginBottom: 2 }}>Best Match</p>
            <p style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.9rem' }}>Frontend Developer</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6366f1', fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>87%</p>
            <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: 2 }}>match score</p>
          </div>
        </div>
      </div>

      {/* Floating badge 1 */}
      <div style={{
        position: 'absolute', top: -14, right: -14,
        background: '#fff', borderRadius: 14,
        boxShadow: '0 8px 32px rgba(16,185,129,0.2), 0 2px 8px rgba(0,0,0,0.08)',
        padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
        border: '1px solid rgba(16,185,129,0.12)',
      }}>
        <div style={{ width: 32, height: 32, background: 'rgba(16,185,129,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle2 size={16} color="#10b981" />
        </div>
        <div>
          <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1e1b4b', margin: 0 }}>Assessment done!</p>
          <p style={{ fontSize: '0.72rem', color: '#9ca3af', margin: 0 }}>78% readiness score</p>
        </div>
      </div>

      {/* Floating badge 2 */}
      <div style={{
        position: 'absolute', bottom: -16, left: -16,
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        borderRadius: 12, boxShadow: '0 8px 24px rgba(99,102,241,0.5)',
        padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Zap size={16} color="#fff" />
        <div>
          <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff', margin: 0 }}>AI Roadmap Ready</p>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>12 steps to your goal</p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const featuredCareers = careers.slice(0, 6);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #fafbff 0%, #f3f4ff 40%, #f8f5ff 100%)',
        borderBottom: '1px solid rgba(99,102,241,0.08)',
      }}>
        {/* Background orbs */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', left: '40%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 1.5rem 7rem', position: 'relative' }}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
            className="grid-responsive-hero"
          >
            <div className="fade-up">
              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)',
                color: '#6366f1', fontSize: '0.82rem', fontWeight: 600,
                padding: '6px 14px 6px 10px', borderRadius: 99, marginBottom: '1.75rem',
              }}>
                <div style={{ width: 22, height: 22, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={12} color="#fff" />
                </div>
                AI-Powered Career Platform
              </div>

              {/* Heading */}
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.25rem)', fontWeight: 800, lineHeight: 1.15,
                color: '#0f0d2e', letterSpacing: '-1px',
                fontFamily: 'Syne, sans-serif', marginBottom: '1.25rem',
              }}>
                Understand your skills.<br />
                <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Discover your career.
                </span><br />
                Build your path.
              </h1>

              <p style={{ fontSize: '1.1rem', color: '#6b7280', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 480 }}>
                CareerPath AI bridges the gap between where you are and where you want to be — with smart assessments, skill analysis, and personalized roadmaps.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <Link to="/register">
                  <button style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '13px 24px', borderRadius: 12,
                    background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                    color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    boxShadow: '0 8px 32px rgba(99,102,241,0.45)', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.6)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.45)'; }}
                  >
                    Start Free Assessment <ArrowRight size={16} />
                  </button>
                </Link>
                <Link to="/careers">
                  <button style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '13px 24px', borderRadius: 12,
                    background: '#fff', color: '#374151',
                    fontWeight: 600, fontSize: '0.95rem',
                    border: '1px solid rgba(0,0,0,0.1)',
                    cursor: 'pointer', fontFamily: 'inherit',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; }}
                  >
                    Explore Careers
                  </button>
                </Link>
              </div>

              {/* Trust badges */}
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                {['Free to use', '10+ Career Paths', 'Personalized Roadmaps'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.85rem', color: '#6b7280' }}>
                    <CheckCircle2 size={15} color="#10b981" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="fade-up stagger-2" style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem', paddingBottom: '2rem' }}>
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section style={{ background: '#fff', borderBottom: '1px solid rgba(99,102,241,0.07)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3.5rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2rem' }} className="grid-4">
            {stats.map(({ value, label, icon: Icon }, i) => (
              <div key={label} className={`fade-up stagger-${i + 1}`} style={{ textAlign: 'center', padding: '1.5rem', borderRadius: 16, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.04)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.transform = ''; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <Icon size={20} color="#6366f1" />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1e1b4b', fontFamily: 'Syne, sans-serif', letterSpacing: '-1px' }}>{value}</div>
                <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: 4, fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ──────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(180deg, #fafbff 0%, #f5f0ff 100%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.08)', padding: '4px 14px', borderRadius: 99, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem', border: '1px solid rgba(139,92,246,0.15)' }}>
              How it works
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0f0d2e', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', marginBottom: '0.75rem' }}>
              Four steps to your dream career
            </h2>
            <p style={{ color: '#9ca3af', maxWidth: 500, margin: '0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
              From assessment to job offer — we guide you every step of the way.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem' }} className="grid-4">
            {steps.map((step, i) => (
              <div key={step.num} className={`fade-up stagger-${i + 1}`} style={{ position: 'relative' }}>
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div style={{ position: 'absolute', top: 28, left: 'calc(50% + 28px)', right: '-50%', height: 2, background: 'linear-gradient(90deg, rgba(99,102,241,0.3), rgba(99,102,241,0.1))', zIndex: 0 }} />
                )}
                <div style={{
                  background: '#fff', borderRadius: 20, padding: '1.75rem',
                  border: '1px solid rgba(99,102,241,0.08)',
                  boxShadow: '0 4px 20px rgba(99,102,241,0.06)',
                  transition: 'all 0.25s', position: 'relative', zIndex: 1, textAlign: 'center',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.15)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.06)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.08)'; }}
                >
                  <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 14, margin: '0 auto 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(99,102,241,0.4)' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif' }}>{step.num}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, color: '#1e1b4b', marginBottom: 8, fontSize: '0.95rem', fontFamily: 'Syne, sans-serif' }}>{step.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/register">
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', borderRadius: 12,
                background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 6px 24px rgba(99,102,241,0.4)', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(99,102,241,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 24px rgba(99,102,241,0.4)'; }}
              >
                Get Started Free <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Career Cards ──────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 700, color: '#6366f1', background: 'rgba(99,102,241,0.08)', padding: '4px 14px', borderRadius: 99, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem', border: '1px solid rgba(99,102,241,0.15)' }}>
                Career Paths
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0f0d2e', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', marginBottom: 8 }}>
                Explore Career Paths
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '1rem' }}>Browse in-demand tech careers and find your match.</p>
            </div>
            <Link to="/careers" style={{
              display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none',
              padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: '0.875rem',
              color: '#6366f1', background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.15)', transition: 'all 0.18s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.14)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; e.currentTarget.style.transform = ''; }}
            >
              View All <ChevronRight size={15} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem', gridAutoRows: '1fr' }} className="grid-3">
            {featuredCareers.map((career, i) => (
              <div key={career.id} className={`fade-up stagger-${(i % 6) + 1}`} style={{ display: 'flex', flexDirection: 'column' }}>
                <CareerCard career={career} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skill Gap Preview ─────────────────────────────────── */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, #fafbff, #f5f0ff)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="grid-responsive-2">
            <div className="fade-up">
              <div style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.08)', padding: '4px 14px', borderRadius: 99, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem', border: '1px solid rgba(16,185,129,0.15)' }}>
                Skill Gap Analysis
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0f0d2e', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', marginBottom: '1rem' }}>
                Know exactly what to learn next
              </h2>
              <p style={{ color: '#9ca3af', marginBottom: '1.75rem', lineHeight: 1.7, fontSize: '1rem' }}>
                Our platform compares your current skills with what top companies expect for your target career — so you know exactly where to focus your energy.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2rem' }}>
                {[
                  { name: 'React', val: 45, color: '#f59e0b', label: 'Needs work' },
                  { name: 'Node.js', val: 25, color: '#ef4444', label: 'High priority' },
                  { name: 'HTML', val: 90, color: '#10b981', label: 'Strong' },
                  { name: 'CSS', val: 80, color: '#6366f1', label: 'Good' },
                ].map((skill) => (
                  <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', width: 72 }}>{skill.name}</span>
                    <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                      <div style={{ width: `${skill.val}%`, height: '100%', background: skill.color, borderRadius: 99 }} />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: `${skill.color}18`, color: skill.color, width: 90, textAlign: 'right' }}>{skill.label}</span>
                  </div>
                ))}
              </div>
              <Link to="/register">
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 22px', borderRadius: 11,
                  background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                  color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 6px 24px rgba(99,102,241,0.4)', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(99,102,241,0.55)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 24px rgba(99,102,241,0.4)'; }}
                >
                  Analyze My Skills <ArrowRight size={16} />
                </button>
              </Link>
            </div>

            <div className="fade-up stagger-2">
              <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.08))', borderRadius: 24, padding: '2.5rem', border: '1px solid rgba(99,102,241,0.1)', boxShadow: '0 8px 40px rgba(99,102,241,0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ fontSize: '4.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: 'Syne, sans-serif', lineHeight: 1, marginBottom: 8 }}>61%</div>
                  <p style={{ color: '#374151', fontWeight: 600, fontSize: '0.95rem' }}>Overall Skill Match</p>
                  <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>for Frontend Developer</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.875rem', textAlign: 'center' }}>
                  {[
                    { label: 'Strong', count: 4, color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.15)' },
                    { label: 'In Progress', count: 3, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.15)' },
                    { label: 'Gap', count: 3, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.15)' },
                  ].map((item) => (
                    <div key={item.label} style={{ background: item.bg, borderRadius: 14, padding: '1.25rem 0.75rem', border: `1px solid ${item.border}` }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: item.color, fontFamily: 'Syne, sans-serif' }}>{item.count}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: item.color, marginTop: 4 }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ─────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.08)', padding: '4px 14px', borderRadius: 99, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem', border: '1px solid rgba(139,92,246,0.15)' }}>
              Features
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0f0d2e', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', marginBottom: '0.75rem' }}>
              Everything you need to succeed
            </h2>
            <p style={{ color: '#9ca3af', maxWidth: 480, margin: '0 auto', fontSize: '1rem' }}>
              A complete toolkit to guide you from student to professional.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }} className="grid-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className={`fade-up stagger-${(i % 6) + 1}`} style={{
                  background: '#fff', borderRadius: 20, border: `1px solid ${f.border}`,
                  padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s', cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${f.bg}, 0 2px 8px rgba(0,0,0,0.06)`; e.currentTarget.style.borderColor = f.color + '40'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = f.border; }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: f.bg, border: `1px solid ${f.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Icon size={22} color={f.color} />
                  </div>
                  <h3 style={{ fontWeight: 700, color: '#1e1b4b', marginBottom: 8, fontSize: '0.95rem', fontFamily: 'Syne, sans-serif' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, #fafbff, #f5f0ff)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b', background: 'rgba(245,158,11,0.08)', padding: '4px 14px', borderRadius: 99, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem', border: '1px solid rgba(245,158,11,0.15)' }}>
              Success Stories
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0f0d2e', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', marginBottom: '0.75rem' }}>
              Students who made it happen
            </h2>
            <p style={{ color: '#9ca3af', maxWidth: 460, margin: '0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
              Real stories from real students who transformed their career trajectory.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }} className="grid-3">
            {testimonials.map((t, i) => (
              <div key={t.name} className={`fade-up stagger-${i + 1}`} style={{
                background: '#fff', borderRadius: 20, padding: '1.75rem',
                border: '1px solid rgba(99,102,241,0.08)',
                boxShadow: '0 4px 20px rgba(99,102,241,0.06)', transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.06)'; }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: 3, marginBottom: '1rem' }}>
                  {Array(t.rating).fill(0).map((_, si) => (
                    <Star key={si} size={14} color="#f59e0b" fill="#f59e0b" />
                  ))}
                </div>
                <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.82rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.875rem', margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -40, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: '2.75rem', marginBottom: '1rem' }}>🚀</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', marginBottom: '1rem' }}>
            Ready to discover your career path?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Join 1,200+ students who are building their future with CareerPath AI. It's free.
          </p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register">
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 12,
                background: '#fff', color: '#4f46e5',
                fontWeight: 700, fontSize: '1rem',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.2)'; }}
              >
                Start for Free <ArrowRight size={18} />
              </button>
            </Link>
            <Link to="/login">
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 12,
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#fff', fontWeight: 600, fontSize: '1rem',
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = ''; }}
              >
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer style={{ background: '#0a0d1a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3.5rem 1.5rem 2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }} className="grid-responsive-2">
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.875rem' }}>
                <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>
                  <Zap size={16} color="#fff" />
                </div>
                <span style={{ fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif', fontSize: '1.05rem' }}>
                  Career<span style={{ color: '#a5b4fc' }}>Path AI</span>
                </span>
              </div>
              <p style={{ color: '#4b5563', fontSize: '0.875rem', maxWidth: 340, lineHeight: 1.6 }}>
                AI-powered career guidance for the next generation of tech professionals. Free for every student.
              </p>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about' },
                { label: 'Careers', to: '/careers' },
                { label: 'Sign In', to: '/login' },
                { label: 'Get Started', to: '/register' },
              ].map(link => (
                <Link key={link.to} to={link.to} style={{
                  fontSize: '0.875rem', color: '#6b7280', textDecoration: 'none', transition: 'color 0.18s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: '#374151', fontSize: '0.82rem' }}>
              © 2026 CareerPath AI · Built for students, by developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
