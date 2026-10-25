import { Link } from 'react-router-dom';
import {
  Zap, Target, Users, BookOpen, TrendingUp, Sparkles,
  ArrowRight, CheckCircle2, Shield, Lightbulb, Heart
} from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Student First',
    desc: 'Every feature is designed around student success — not engagement metrics or ad revenue.',
    color: '#6366f1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.14)',
  },
  {
    icon: Lightbulb,
    title: 'Clarity Over Complexity',
    desc: 'We distill overwhelming career data into clear, actionable next steps you can follow today.',
    color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.14)',
  },
  {
    icon: Shield,
    title: 'No Fluff, Only Facts',
    desc: 'Our recommendations are backed by real job market data — no vague advice, ever.',
    color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.14)',
  },
  {
    icon: Heart,
    title: 'Built with Care',
    desc: 'We believe everyone deserves access to quality career guidance, not just the privileged few.',
    color: '#f43f5e', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.14)',
  },
];

const pillars = [
  { icon: Target, title: 'Our Mission', desc: 'To give every student a clear, actionable path — from learning to landing their dream tech career.', color: '#6366f1' },
  { icon: Users, title: 'Who We Help', desc: 'Students, bootcamp graduates, and career switchers who want to break into tech with confidence.', color: '#8b5cf6' },
  { icon: BookOpen, title: 'How We Work', desc: 'Through AI-powered assessments, skill gap analysis, and personalized roadmaps — no generic advice.', color: '#06b6d4' },
  { icon: TrendingUp, title: 'The Results', desc: 'Students using CareerPath AI report 85% faster career alignment and much more focused learning.', color: '#10b981' },
];

const stats = [
  { value: '1,200+', label: 'Active Students', color: '#6366f1' },
  { value: '85%', label: 'Placement Rate', color: '#10b981' },
  { value: '10+', label: 'Career Paths', color: '#f59e0b' },
  { value: '4.9★', label: 'Avg. Rating', color: '#f43f5e' },
];

const timeline = [
  { year: '2024', event: 'CareerPath AI concept born from a student frustration.', color: '#6366f1' },
  { year: 'Early 2025', event: 'First AI assessment engine built and tested with 50 students.', color: '#8b5cf6' },
  { year: 'Mid 2025', event: 'Skill gap analysis and roadmap generator launched.', color: '#06b6d4' },
  { year: '2026', event: '1,200+ students. 85% placement rate. Growing fast.', color: '#10b981' },
];

export default function AboutPage() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff' }}>

      {/* Hero */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #fafbff 0%, #f3f4ff 50%, #f8f5ff 100%)',
        borderBottom: '1px solid rgba(99,102,241,0.08)',
        padding: '5rem 1.5rem 6rem',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div className="fade-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)',
            color: '#6366f1', fontSize: '0.82rem', fontWeight: 600,
            padding: '6px 14px 6px 10px', borderRadius: 99, marginBottom: '1.75rem',
          }}>
            <div style={{ width: 22, height: 22, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={12} color="#fff" />
            </div>
            About CareerPath AI
          </div>

          <h1 className="fade-up stagger-1" style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', fontWeight: 800, lineHeight: 1.15,
            color: '#0f0d2e', letterSpacing: '-1px', fontFamily: 'Syne, sans-serif', marginBottom: '1.25rem',
          }}>
            Built for students.{' '}
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Powered by AI.
            </span>
          </h1>

          <p className="fade-up stagger-2" style={{ fontSize: '1.125rem', color: '#6b7280', lineHeight: 1.75, maxWidth: 620, margin: '0 auto 2.5rem' }}>
            CareerPath AI was built to help students navigate the complex tech landscape — understanding what career fits them, what skills they need, and exactly how to get there.
          </p>

          <div className="fade-up stagger-3" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register">
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 26px', borderRadius: 12,
                background: 'linear-gradient(135deg, #6366f1, #7c3aed)', color: '#fff',
                fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
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
                padding: '13px 26px', borderRadius: 12,
                background: '#fff', color: '#374151', fontWeight: 600, fontSize: '0.95rem',
                border: '1px solid rgba(0,0,0,0.1)', cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; }}
              >
                Explore Careers
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: '#fff', borderBottom: '1px solid rgba(99,102,241,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }} className="grid-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`fade-up stagger-${i + 1}`} style={{
                textAlign: 'center', padding: '1.5rem 1rem', borderRadius: 16, transition: 'all 0.2s', border: '1px solid transparent',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.03)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.1)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = ''; }}
              >
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: s.color, fontFamily: 'Syne, sans-serif', letterSpacing: '-1px', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: 6, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ padding: '6rem 1.5rem', background: 'linear-gradient(180deg, #fafbff 0%, #f5f0ff 100%)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.08)', padding: '4px 14px', borderRadius: 99, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem', border: '1px solid rgba(139,92,246,0.15)' }}>
              What drives us
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0f0d2e', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', marginBottom: '0.75rem' }}>
              Purpose-built for your career
            </h2>
            <p style={{ color: '#9ca3af', maxWidth: 500, margin: '0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
              Four core principles that guide everything we build.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }} className="grid-responsive-2">
            {pillars.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`fade-up stagger-${i + 1}`} style={{
                  background: '#fff', borderRadius: 20, padding: '2rem',
                  border: '1px solid rgba(99,102,241,0.08)',
                  boxShadow: '0 4px 20px rgba(99,102,241,0.06)',
                  display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.14)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.06)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.08)'; }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${item.color}14`, border: `1px solid ${item.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={22} color={item.color} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, color: '#1e1b4b', marginBottom: 8, fontSize: '1rem', fontFamily: 'Syne, sans-serif' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '6rem 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 700, color: '#6366f1', background: 'rgba(99,102,241,0.08)', padding: '4px 14px', borderRadius: 99, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem', border: '1px solid rgba(99,102,241,0.15)' }}>
              Our values
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0f0d2e', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', marginBottom: '0.75rem' }}>
              The principles behind CareerPath AI
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }} className="grid-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className={`fade-up stagger-${i + 1}`} style={{
                  background: '#fff', borderRadius: 20, padding: '1.75rem',
                  border: `1px solid ${v.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s', textAlign: 'center',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${v.bg}`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: v.bg, border: `1px solid ${v.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <Icon size={22} color={v.color} />
                  </div>
                  <h3 style={{ fontWeight: 700, color: '#1e1b4b', marginBottom: 8, fontSize: '0.95rem', fontFamily: 'Syne, sans-serif' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: 1.65 }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story + Timeline */}
      <section style={{ padding: '6rem 1.5rem', background: 'linear-gradient(135deg, #fafbff, #f5f0ff)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="grid-responsive-2">
            <div className="fade-up">
              <div style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.08)', padding: '4px 14px', borderRadius: 99, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.25rem', border: '1px solid rgba(16,185,129,0.15)' }}>
                Our Story
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0f0d2e', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', marginBottom: '1rem' }}>
                Why we built CareerPath AI
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '1rem', lineHeight: 1.8, fontSize: '1rem' }}>
                We saw students pouring hundreds of hours into tutorials — only to realize they were learning the wrong things for the career they actually wanted.
              </p>
              <p style={{ color: '#6b7280', marginBottom: '1.75rem', lineHeight: 1.8, fontSize: '1rem' }}>
                CareerPath AI was born from a simple idea: <strong style={{ color: '#374151' }}>what if every student had a personal career counselor?</strong> One that knows the job market, understands your skills, and gives you a precise, personalized roadmap.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'AI-powered career matching based on your real skills',
                  'Real job market data — updated regularly',
                  'Step-by-step roadmaps, not vague advice',
                  'Free for every student, always',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ marginTop: 3, flexShrink: 0 }}><CheckCircle2 size={17} color="#10b981" /></div>
                    <span style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-up stagger-2">
              <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.08))', borderRadius: 24, padding: '2.5rem', border: '1px solid rgba(99,102,241,0.1)', boxShadow: '0 8px 40px rgba(99,102,241,0.1)' }}>
                {timeline.map((item, i) => (
                  <div key={item.year} style={{ display: 'flex', gap: '1rem', paddingBottom: i < timeline.length - 1 ? '1.5rem' : 0, position: 'relative' }}>
                    {i < timeline.length - 1 && (
                      <div style={{ position: 'absolute', left: 11, top: 28, width: 2, height: 'calc(100% - 12px)', background: `linear-gradient(180deg, ${item.color}60, transparent)` }} />
                    )}
                    <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: 2, background: item.color, boxShadow: `0 0 0 4px ${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.78rem', fontWeight: 700, color: item.color, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.year}</p>
                      <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.6 }}>{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -40, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚀</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', marginBottom: '1rem' }}>
            Start your career journey today
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Take the assessment, discover your path, and start building toward your dream career.
          </p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register">
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 12, background: '#fff', color: '#4f46e5', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 24px rgba(0,0,0,0.2)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.2)'; }}
              >
                Get Started Free <ArrowRight size={18} />
              </button>
            </Link>
            <Link to="/careers">
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = ''; }}
              >
                Explore Careers
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
