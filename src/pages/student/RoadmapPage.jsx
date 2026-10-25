import { CheckCircle2, Circle, Clock, ChevronDown, ChevronRight, Map, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// Career-specific roadmap steps
const CAREER_ROADMAPS = {
  'Frontend Developer': [
    { id: 1, title: 'HTML & CSS Foundations', desc: 'Master structure, layout, flexbox, grid, and responsive design.', skills: ['HTML5','CSS3','Flexbox','Grid','Responsive Design'], time: '2–3 weeks' },
    { id: 2, title: 'JavaScript Fundamentals', desc: 'Variables, functions, DOM, events, fetch API, and async/await.', skills: ['ES6+','DOM','Events','Fetch API','Promises'], time: '4–6 weeks' },
    { id: 3, title: 'React Framework', desc: 'Components, props, state, hooks, and context API.', skills: ['Components','Props','State','Hooks','Context API'], time: '6–8 weeks' },
    { id: 4, title: 'TypeScript Basics', desc: 'Type system, interfaces, generics for safer code.', skills: ['Types','Interfaces','Generics'], time: '2–3 weeks' },
    { id: 5, title: 'REST APIs & HTTP', desc: 'Consume APIs, handle HTTP, and manage async data.', skills: ['HTTP','Axios','JSON','Authentication'], time: '2–3 weeks' },
    { id: 6, title: 'Build Tools & Deployment', desc: 'Vite, Git workflow, CI/CD basics, and deployment.', skills: ['Vite','Git','GitHub Actions','Vercel'], time: '2 weeks' },
  ],
  'Backend Developer': [
    { id: 1, title: 'Programming Fundamentals', desc: 'Python or Node.js core concepts.', skills: ['Python','Node.js','Functions','OOP'], time: '3–4 weeks' },
    { id: 2, title: 'Databases & SQL', desc: 'Relational databases, queries, and schema design.', skills: ['SQL','PostgreSQL','Database Design'], time: '3–4 weeks' },
    { id: 3, title: 'REST API Design', desc: 'Build scalable REST APIs with Express or FastAPI.', skills: ['REST','Express','FastAPI','JWT'], time: '4–5 weeks' },
    { id: 4, title: 'Authentication & Security', desc: 'JWT, OAuth, hashing, and secure practices.', skills: ['JWT','OAuth','bcrypt','HTTPS'], time: '2–3 weeks' },
    { id: 5, title: 'Cloud & Deployment', desc: 'Deploy with AWS, Railway, or DigitalOcean.', skills: ['AWS','Docker','CI/CD'], time: '3–4 weeks' },
  ],
  'Full Stack Developer': [
    { id: 1, title: 'HTML, CSS & JavaScript', desc: 'Web fundamentals and modern JS.', skills: ['HTML','CSS','JavaScript','ES6+'], time: '3–4 weeks' },
    { id: 2, title: 'React', desc: 'Modern UI with hooks and state management.', skills: ['React','Hooks','Context'], time: '5–6 weeks' },
    { id: 3, title: 'Node.js & Express', desc: 'Server-side JavaScript and REST APIs.', skills: ['Node.js','Express','REST'], time: '4–5 weeks' },
    { id: 4, title: 'Databases', desc: 'SQL and NoSQL storage solutions.', skills: ['PostgreSQL','MongoDB','SQL'], time: '3–4 weeks' },
    { id: 5, title: 'Full Stack Projects', desc: 'Build end-to-end apps with React + Node.', skills: ['Integration','Deployment','Git'], time: '4–6 weeks' },
  ],
  'Data Analyst': [
    { id: 1, title: 'Excel & Statistics', desc: 'Data cleaning, pivot tables, and basic stats.', skills: ['Excel','Statistics','Charts'], time: '2–3 weeks' },
    { id: 2, title: 'SQL', desc: 'Query databases, joins, aggregations.', skills: ['SQL','PostgreSQL','Queries'], time: '3–4 weeks' },
    { id: 3, title: 'Python for Data', desc: 'Pandas, NumPy, and data wrangling.', skills: ['Python','Pandas','NumPy'], time: '4–5 weeks' },
    { id: 4, title: 'Data Visualization', desc: 'Charts with Matplotlib, Seaborn, and Tableau.', skills: ['Matplotlib','Tableau','Seaborn'], time: '3 weeks' },
  ],
  'UI/UX Designer': [
    { id: 1, title: 'Design Principles', desc: 'Color theory, typography, and visual hierarchy.', skills: ['Color','Typography','Layout'], time: '2 weeks' },
    { id: 2, title: 'Figma', desc: 'Wireframing, prototyping, and design systems.', skills: ['Figma','Wireframes','Prototyping'], time: '4–5 weeks' },
    { id: 3, title: 'User Research', desc: 'User interviews, surveys, and usability testing.', skills: ['User Interviews','Surveys','Testing'], time: '3 weeks' },
    { id: 4, title: 'Design Systems', desc: 'Build reusable component libraries.', skills: ['Components','Tokens','Storybook'], time: '3–4 weeks' },
  ],
};

// Default generic roadmap
const DEFAULT_ROADMAP = [
  { id: 1, title: 'Complete Career Assessment', desc: 'Discover your ideal career path with our AI-powered assessment.', skills: ['Career Exploration','Self Assessment'], time: '30 min' },
  { id: 2, title: 'Set Your Career Goal', desc: 'Define a specific target career to get a personalized roadmap.', skills: ['Goal Setting'], time: '15 min' },
  { id: 3, title: 'Start Skill Development', desc: 'Begin learning the foundational skills for your chosen career.', skills: ['Core Skills'], time: 'Ongoing' },
];

function RoadmapStepCard({ step, index, isLast, userSkills }) {
  const [expanded, setExpanded] = useState(index === 0);

  // Determine completion: a step is "done" if user has ≥70% proficiency in all its skills
  const skillMap = {};
  userSkills.forEach((s) => {
    const name = typeof s === 'string' ? s : s.name;
    const prof = typeof s === 'string' ? 50 : (s.proficiency ?? 50);
    skillMap[name] = prof;
  });

  const stepSkillScores = step.skills.map((sk) => skillMap[sk] ?? 0);
  const avg = stepSkillScores.length > 0 ? stepSkillScores.reduce((a, b) => a + b, 0) / stepSkillScores.length : 0;
  const status = avg >= 70 ? 'completed' : avg >= 30 ? 'in-progress' : 'not-started';
  const progress = Math.round(avg);

  const statusConfig = {
    completed:   { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)',  label: 'Completed',  icon: CheckCircle2 },
    'in-progress':{ color: '#6366f1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)',  label: 'In Progress', icon: Clock },
    'not-started':{ color: '#9ca3af', bg: 'rgba(156,163,175,0.1)',border: 'rgba(156,163,175,0.2)', label: 'Not Started', icon: Circle },
  };
  const sc = statusConfig[status];
  const Icon = sc.icon;

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {/* Timeline line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: sc.bg, border: `2px solid ${sc.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: status !== 'not-started' ? `0 4px 12px ${sc.color}30` : 'none' }}>
          <Icon size={16} color={sc.color} />
        </div>
        {!isLast && <div style={{ width: 2, flex: 1, background: status === 'completed' ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.1)', marginTop: 4, minHeight: 24 }} />}
      </div>

      {/* Card */}
      <div style={{ flex: 1, marginBottom: isLast ? 0 : 16 }}>
        <div className="s-card" style={{ border: `1px solid ${sc.border}`, cursor: 'pointer', padding: '1.25rem' }} onClick={() => setExpanded(!expanded)}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em' }}>STEP {index + 1}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: sc.color, background: sc.bg, padding: '2px 8px', borderRadius: 99, border: `1px solid ${sc.border}` }}>{sc.label}</span>
              </div>
              <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: '#1e1b4b', margin: '0 0 4px', fontFamily: 'Syne, sans-serif' }}>{step.title}</h3>
              <p style={{ fontSize: '0.8rem', color: '#9ca3af', margin: 0 }}>⏱ {step.time}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: sc.color, fontFamily: 'Syne, sans-serif' }}>{progress}%</span>
              {expanded ? <ChevronDown size={16} color="#9ca3af" /> : <ChevronRight size={16} color="#9ca3af" />}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 5, borderRadius: 99, background: 'rgba(0,0,0,0.06)', overflow: 'hidden', marginTop: 12 }}>
            <div style={{ width: `${progress}%`, height: '100%', background: sc.color, borderRadius: 99, transition: 'width 0.6s ease' }} />
          </div>

          {expanded && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(99,102,241,0.07)' }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 12px', lineHeight: 1.6 }}>{step.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {step.skills.map((sk) => {
                  const prof = skillMap[sk] ?? null;
                  const hasSkill = prof !== null && prof > 0;
                  return (
                    <span key={sk} style={{ padding: '4px 10px', borderRadius: 99, fontSize: '0.75rem', fontWeight: 600, background: hasSkill ? 'rgba(16,185,129,0.08)' : 'rgba(99,102,241,0.07)', color: hasSkill ? '#059669' : '#6366f1', border: `1px solid ${hasSkill ? 'rgba(16,185,129,0.2)' : 'rgba(99,102,241,0.15)'}` }}>
                      {hasSkill ? '✓ ' : ''}{sk}{prof != null ? ` ${prof}%` : ''}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  const { currentUser } = useAuth();

  const careerGoal = currentUser?.careerGoal || currentUser?.recommendedCareer?.title || currentUser?.recommendedCareer || null;
  const userSkills = currentUser?.skills || [];
  const careerReadiness = currentUser?.careerReadiness ?? 0;

  const steps = careerGoal ? (CAREER_ROADMAPS[careerGoal] || DEFAULT_ROADMAP) : DEFAULT_ROADMAP;

  // Compute per-step completion for summary
  const skillMap = {};
  userSkills.forEach((s) => {
    const name = typeof s === 'string' ? s : s.name;
    const prof = typeof s === 'string' ? 50 : (s.proficiency ?? 50);
    skillMap[name] = prof;
  });

  const stepStatuses = steps.map((step) => {
    const scores = step.skills.map((sk) => skillMap[sk] ?? 0);
    const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    return avg >= 70 ? 'completed' : avg >= 30 ? 'in-progress' : 'not-started';
  });

  const completed   = stepStatuses.filter((s) => s === 'completed').length;
  const inProgress  = stepStatuses.filter((s) => s === 'in-progress').length;
  const notStarted  = stepStatuses.filter((s) => s === 'not-started').length;
  const totalPct    = careerReadiness || Math.round((completed / steps.length) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '42rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(99,102,241,0.45)', flexShrink: 0 }}>
          <Map size={19} color="#fff" />
        </div>
        <div>
          <h1 className="s-page-title" style={{ margin: 0 }}>Career Roadmap</h1>
          <p className="s-page-sub">
            {careerGoal
              ? <>Your step-by-step path to becoming a <strong style={{ color: '#6366f1' }}>{careerGoal}</strong>.</>
              : 'Complete the assessment to get your personalized career roadmap.'
            }
          </p>
        </div>
      </div>

      {/* Progress summary card */}
      <div className="s-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6b7280' }}>Overall Progress</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#6366f1' }}>{totalPct}%</span>
            </div>
            <div className="s-progress-track" style={{ height: 8 }}>
              <div className="s-progress-fill" style={{ width: `${totalPct}%` }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[
              { label: 'Completed',  value: completed,  color: '#10b981' },
              { label: 'In Progress',value: inProgress,  color: '#6366f1' },
              { label: 'Remaining',  value: notStarted, color: '#9ca3af' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: s.color, fontFamily: 'Syne, sans-serif' }}>{s.value}</div>
                <div style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* No career goal CTA */}
      {!careerGoal && (
        <div className="s-card" style={{ textAlign: 'center', padding: '2rem', border: '1px solid rgba(99,102,241,0.12)' }}>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '0 0 1rem' }}>Take the career assessment to get a fully personalized roadmap.</p>
          <Link to="/assessment" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 11, background: 'linear-gradient(135deg,#6366f1,#7c3aed)', color: '#fff', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(99,102,241,0.4)' }}>
            Take Assessment <ArrowRight size={15} />
          </Link>
        </div>
      )}

      {/* Roadmap steps */}
      <div>
        {steps.map((step, i) => (
          <RoadmapStepCard
            key={step.id}
            step={step}
            index={i}
            isLast={i === steps.length - 1}
            userSkills={userSkills}
          />
        ))}
      </div>
    </div>
  );
}
