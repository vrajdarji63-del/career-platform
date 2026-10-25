import { AlertTriangle, CheckCircle2, ArrowRight, TrendingDown, TrendingUp, Target, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// Required proficiency targets per career (heuristic)
const CAREER_SKILL_TARGETS = {
  'Frontend Developer':    { React: 80, JavaScript: 85, HTML: 85, CSS: 75, Git: 70, TypeScript: 70 },
  'Backend Developer':     { 'Node.js': 80, Python: 75, SQL: 80, Git: 70, Docker: 65 },
  'Full Stack Developer':  { React: 75, 'Node.js': 75, SQL: 70, JavaScript: 80, Git: 70 },
  'Data Analyst':          { SQL: 85, Python: 70, Excel: 75 },
  'Data Scientist':        { Python: 85, SQL: 75 },
  'AI/ML Engineer':        { Python: 90, SQL: 70 },
  'UI/UX Designer':        { Figma: 80, CSS: 70 },
  'DevOps Engineer':       { Docker: 80, Linux: 75, Git: 80 },
  'Cloud Engineer':        { Docker: 75, Linux: 70 },
  'Cybersecurity Analyst': { Linux: 70, Python: 65 },
};

function SkillBar({ skill, color, showRequired = false }) {
  return (
    <div style={{ padding: '0.875rem 0', borderBottom: '1px solid rgba(99,102,241,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontWeight: 600, color: '#1e1b4b', fontSize: '0.875rem' }}>{skill.name}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {skill.gap > 0 && (
            <span style={{ fontSize: '0.72rem', fontWeight: 700, background: `${color}15`, color, padding: '2px 8px', borderRadius: 99 }}>
              −{skill.gap}% gap
            </span>
          )}
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e1b4b' }}>{skill.current}%</span>
          {skill.required && <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>/ {skill.required}%</span>}
        </div>
      </div>
      <div style={{ position: 'relative', height: 10, borderRadius: 99, background: 'rgba(0,0,0,0.06)', overflow: 'visible' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: `${skill.current}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)' }} />
        {showRequired && skill.required && (
          <div style={{ position: 'absolute', top: -3, bottom: -3, left: `${skill.required}%`, width: 2, background: '#ef4444', borderRadius: 99 }}>
            <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', fontWeight: 700, color: '#ef4444', whiteSpace: 'nowrap', background: '#fff', padding: '1px 5px', borderRadius: 4, border: '1px solid rgba(239,68,68,0.2)' }}>
              target
            </div>
          </div>
        )}
      </div>
      {showRequired && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#9ca3af', marginTop: 5 }}>
          <span>Your level</span>
          <span style={{ color: '#ef4444', fontWeight: 600 }}>↑ Required: {skill.required}%</span>
        </div>
      )}
    </div>
  );
}

export default function SkillGapPage() {
  const { currentUser } = useAuth();

  const userSkills    = currentUser?.skills   || [];
  const careerGoal    = currentUser?.careerGoal || currentUser?.recommendedCareer?.title || currentUser?.recommendedCareer || null;
  const careerReadiness = currentUser?.careerReadiness ?? 0;

  // Build a map of user skill name → proficiency
  const userSkillMap = {};
  userSkills.forEach((s) => {
    if (typeof s === 'string') userSkillMap[s] = 50; // onboarding string skill, assume basic
    else if (s.name) userSkillMap[s.name] = s.proficiency ?? 50;
  });

  // Get required targets for the user's career goal
  const targets = careerGoal ? (CAREER_SKILL_TARGETS[careerGoal] || {}) : {};

  // Compute gap data from real skills
  const allGapSkills = Object.entries(targets).map(([name, required]) => {
    const current = userSkillMap[name] ?? 0;
    const gap = Math.max(0, required - current);
    return { name, current, required, gap };
  });

  // Also include user skills not in targets (bonus skills)
  const bonusSkills = userSkills
    .filter((s) => {
      const name = typeof s === 'string' ? s : s.name;
      return !targets[name];
    })
    .map((s) => ({
      name: typeof s === 'string' ? s : s.name,
      current: typeof s === 'string' ? 50 : (s.proficiency ?? 50),
      required: null,
      gap: 0,
    }));

  const highPriority = allGapSkills.filter((s) => s.gap >= 35);
  const medium       = allGapSkills.filter((s) => s.gap > 0 && s.gap < 35);
  const strong       = [...allGapSkills.filter((s) => s.gap === 0), ...bonusSkills];
  const overall      = careerReadiness || (allGapSkills.length > 0
    ? Math.round(allGapSkills.reduce((acc, s) => acc + Math.min(100, (s.current / s.required) * 100), 0) / allGapSkills.length)
    : 0);

  // No career goal state
  if (!careerGoal) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '56rem' }}>
        <div>
          <h1 className="s-page-title">Skill Gap Analysis</h1>
          <p className="s-page-sub">Compare your current skills to what your target career requires.</p>
        </div>
        <div className="s-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <BarChart2 size={24} color="#6366f1" />
          </div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e1b4b', margin: '0 0 8px', fontFamily: 'Syne, sans-serif' }}>No career goal set</h2>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '0 0 1.5rem' }}>Complete the career assessment or onboarding to set your career goal and see a personalized skill gap analysis.</p>
          <Link to="/assessment" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 11, background: 'linear-gradient(135deg,#6366f1,#7c3aed)', color: '#fff', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(99,102,241,0.4)' }}>
            Take Assessment <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '56rem' }}>
      {/* Header */}
      <div>
        <h1 className="s-page-title">Skill Gap Analysis</h1>
        <p className="s-page-sub">
          Comparing your current skills to what's required for <strong style={{ color: '#6366f1' }}>{careerGoal}</strong>.
        </p>
      </div>

      {/* Overall Score */}
      <div style={{ background: 'linear-gradient(135deg, #faf8ff, #f5f0ff)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 20, padding: '1.75rem', boxShadow: '0 4px 24px rgba(99,102,241,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#8b5cf6', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Overall Skill Match</p>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: 'Syne, sans-serif', marginBottom: '0.875rem' }}>
              {overall}%
            </div>
            <div style={{ height: 10, borderRadius: 99, background: 'rgba(99,102,241,0.1)', overflow: 'hidden', maxWidth: 280 }}>
              <div style={{ width: `${overall}%`, height: '100%', background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', borderRadius: 99 }} />
            </div>
            <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginTop: 8 }}>
              You're <strong style={{ color: '#6366f1' }}>{100 - overall}%</strong> away from being fully ready.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.875rem' }}>
            {[
              { label: 'High Priority', count: highPriority.length, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.15)', icon: TrendingDown },
              { label: 'Medium Gap',   count: medium.length,        color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.15)', icon: Target },
              { label: 'Strong',       count: strong.length,        color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.15)', icon: TrendingUp },
            ].map(({ label, count, color, bg, border, icon: Icon }) => (
              <div key={label} style={{ background: bg, borderRadius: 14, padding: '1rem 0.875rem', textAlign: 'center', border: `1px solid ${border}` }}>
                <Icon size={16} color={color} style={{ margin: '0 auto 6px', display: 'block' }} />
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color, fontFamily: 'Syne, sans-serif' }}>{count}</div>
                <div style={{ fontSize: '0.72rem', color, fontWeight: 600, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High Priority */}
      {highPriority.length > 0 && (
        <div className="s-card" style={{ border: '1px solid rgba(239,68,68,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={16} color="#ef4444" />
            </div>
            <div>
              <h2 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', margin: 0, fontFamily: 'Syne, sans-serif' }}>High Priority Skills</h2>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>Focus on these immediately</p>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '0.72rem', fontWeight: 700, background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '3px 10px', borderRadius: 99, border: '1px solid rgba(239,68,68,0.2)' }}>Focus Now</span>
          </div>
          <div>
            {highPriority.map((skill) => <SkillBar key={skill.name} skill={skill} color="#f59e0b" showRequired />)}
          </div>
        </div>
      )}

      {/* Medium Priority */}
      {medium.length > 0 && (
        <div className="s-card" style={{ border: '1px solid rgba(245,158,11,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={16} color="#f59e0b" />
            </div>
            <div>
              <h2 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', margin: 0, fontFamily: 'Syne, sans-serif' }}>Medium Priority Skills</h2>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>Develop these soon</p>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '0.72rem', fontWeight: 700, background: 'rgba(245,158,11,0.1)', color: '#d97706', padding: '3px 10px', borderRadius: 99, border: '1px solid rgba(245,158,11,0.2)' }}>Develop Soon</span>
          </div>
          <div>
            {medium.map((skill) => <SkillBar key={skill.name} skill={skill} color="#f59e0b" showRequired />)}
          </div>
        </div>
      )}

      {/* Strong Skills */}
      {strong.length > 0 && (
        <div className="s-card" style={{ border: '1px solid rgba(16,185,129,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={16} color="#10b981" />
            </div>
            <div>
              <h2 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', margin: 0, fontFamily: 'Syne, sans-serif' }}>Strong Skills</h2>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>Keep up the great work!</p>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '0.72rem', fontWeight: 700, background: 'rgba(16,185,129,0.1)', color: '#059669', padding: '3px 10px', borderRadius: 99, border: '1px solid rgba(16,185,129,0.2)' }}>✓ On Track</span>
          </div>
          <div>
            {strong.map((skill) => <SkillBar key={skill.name} skill={skill} color="#10b981" />)}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)', borderRadius: 20, padding: '1.75rem', boxShadow: '0 8px 32px rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif', margin: '0 0 4px' }}>Ready to close the gaps?</h3>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>Follow your personalized roadmap to build the skills you need.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link to="/roadmap"><button style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 11, background: '#fff', color: '#6366f1', fontWeight: 700, fontSize: '0.875rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'} onMouseLeave={e => e.currentTarget.style.transform = ''}>View Roadmap <ArrowRight size={15} /></button></Link>
          <Link to="/ai-advisor"><button style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 11, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = ''; }}>Ask AI Advisor</button></Link>
        </div>
      </div>
    </div>
  );
}
