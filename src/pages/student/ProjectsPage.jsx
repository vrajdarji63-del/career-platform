import { useState } from 'react';
import { Search, Briefcase, Clock, Star, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// All project templates tagged by relevant careers/interests/skills
const PROJECT_TEMPLATES = [
  { id: 1,  title: 'Personal Portfolio Website',       desc: 'Showcase your skills and projects with a beautiful portfolio site.',           skills: ['HTML','CSS','JavaScript','React'], difficulty: 'Beginner',     time: '8–12 h',  careers: ['Frontend Developer','UI/UX Designer'],                        icon: '💼', category: 'Web Development' },
  { id: 2,  title: 'React To-Do App',                  desc: 'Build a functional task manager with CRUD and local storage.',                  skills: ['React','JavaScript','CSS'],        difficulty: 'Beginner',     time: '5–8 h',   careers: ['Frontend Developer','Full Stack Developer'],                  icon: '✅', category: 'Web Development' },
  { id: 3,  title: 'Weather Dashboard',                desc: 'Fetch real-time weather data and display beautiful visualizations.',           skills: ['JavaScript','API','CSS'],          difficulty: 'Beginner',     time: '6–10 h',  careers: ['Frontend Developer','Full Stack Developer'],                  icon: '🌤️', category: 'Web Development' },
  { id: 4,  title: 'REST API with Node.js',            desc: 'Build a full CRUD API with Express, MongoDB, and JWT authentication.',        skills: ['Node.js','MongoDB','REST','JWT'],   difficulty: 'Intermediate', time: '12–16 h', careers: ['Backend Developer','Full Stack Developer'],                   icon: '🔌', category: 'Backend' },
  { id: 5,  title: 'E-Commerce Product Page',          desc: 'Build a responsive product listing page with cart functionality.',            skills: ['React','CSS','JavaScript'],        difficulty: 'Intermediate', time: '10–14 h', careers: ['Frontend Developer','UI/UX Designer'],                        icon: '🛍️', category: 'Web Development' },
  { id: 6,  title: 'SQL Analytics Dashboard',          desc: 'Query a database and display insights with charts using Python.',              skills: ['SQL','Python','Pandas'],           difficulty: 'Intermediate', time: '10–15 h', careers: ['Data Analyst','Data Scientist'],                               icon: '📊', category: 'Data' },
  { id: 7,  title: 'Data Cleaning Pipeline',           desc: 'Build an automated pipeline to clean and transform messy datasets.',          skills: ['Python','Pandas','NumPy'],         difficulty: 'Beginner',     time: '8–12 h',  careers: ['Data Analyst','Data Scientist'],                               icon: '🧹', category: 'Data' },
  { id: 8,  title: 'Figma UI Design System',           desc: 'Create a reusable component library and design system in Figma.',             skills: ['Figma','UI Design','Typography'],  difficulty: 'Beginner',     time: '6–10 h',  careers: ['UI/UX Designer','Frontend Developer'],                        icon: '🎨', category: 'Design' },
  { id: 9,  title: 'ML Sentiment Classifier',          desc: 'Train a text classification model on real-world review data.',                skills: ['Python','scikit-learn','NLP'],     difficulty: 'Advanced',     time: '20–25 h', careers: ['AI/ML Engineer','Data Scientist'],                            icon: '🤖', category: 'AI/ML' },
  { id: 10, title: 'Full-Stack Blog Platform',         desc: 'End-to-end blog with React frontend, Express backend, and PostgreSQL.',       skills: ['React','Node.js','PostgreSQL'],    difficulty: 'Advanced',     time: '25–35 h', careers: ['Full Stack Developer','Backend Developer'],                   icon: '📝', category: 'Full Stack' },
  { id: 11, title: 'Docker + CI/CD Pipeline',          desc: 'Containerize an app and set up automated deployment pipelines.',              skills: ['Docker','Git','Linux'],            difficulty: 'Intermediate', time: '12–18 h', careers: ['DevOps Engineer','Cloud Engineer'],                           icon: '🐳', category: 'DevOps' },
  { id: 12, title: 'Vulnerability Scanner Script',     desc: 'Build a script to scan a web app for common security vulnerabilities.',       skills: ['Python','Linux','Security'],       difficulty: 'Intermediate', time: '14–20 h', careers: ['Cybersecurity Analyst'],                                      icon: '🔒', category: 'Security' },
];

const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const DIFF_COLORS = {
  Beginner:     { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)' },
  Intermediate: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
  Advanced:     { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.2)'  },
};

function ProjectCard({ project, isRecommended, onStart }) {
  const dc = DIFF_COLORS[project.difficulty] || {};
  return (
    <div
      className="s-card"
      style={{ display: 'flex', flexDirection: 'column', gap: 0, padding: '1.25rem', border: isRecommended ? '1.5px solid rgba(99,102,241,0.25)' : undefined, position: 'relative', cursor: 'default', transition: 'all 0.22s', height: '100%' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(99,102,241,0.13)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
    >
      {isRecommended && (
        <div style={{ position: 'absolute', top: -1, right: 14, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: '0 0 8px 8px', letterSpacing: '0.04em' }}>
          ⭐ RECOMMENDED
        </div>
      )}

      {/* Icon + title row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
        <div style={{ fontSize: '1.75rem', lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{project.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e1b4b', margin: '0 0 5px', fontFamily: 'Syne, sans-serif', lineHeight: 1.3 }}>{project.title}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: dc.color, background: dc.bg, border: `1px solid ${dc.border}`, padding: '2px 8px', borderRadius: 99 }}>{project.difficulty}</span>
            <span style={{ fontSize: '0.7rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={10} />{project.time}</span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.55, margin: '0 0 12px', flex: 1 }}>{project.desc}</p>

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
        {project.skills.map((sk) => (
          <span key={sk} style={{ fontSize: '0.7rem', fontWeight: 500, padding: '2px 8px', borderRadius: 99, background: 'rgba(99,102,241,0.07)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.12)' }}>{sk}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{ paddingTop: 10, borderTop: '1px solid rgba(99,102,241,0.07)' }}>
        <button
          onClick={onStart}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            padding: '10px 16px', borderRadius: 11,
            background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
            color: '#fff', fontWeight: 700, fontSize: '0.85rem',
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
            transition: 'all 0.18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(99,102,241,0.55)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.35)'; e.currentTarget.style.transform = ''; }}
        >
          <Play size={13} /> Start Project
        </button>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [search,     setSearch]     = useState('');
  const [difficulty, setDifficulty] = useState('All');

  const careerGoal = currentUser?.careerGoal || currentUser?.recommendedCareer?.title || currentUser?.recommendedCareer || null;
  const userSkills = (currentUser?.skills || []).map((s) => (typeof s === 'string' ? s : s.name));
  const interests  = currentUser?.interests || [];

  // Determine recommended projects: match by career goal
  const recommendedIds = new Set(
    PROJECT_TEMPLATES
      .filter((p) => careerGoal && p.careers.includes(careerGoal))
      .map((p) => p.id)
  );

  // Filter
  const filtered = PROJECT_TEMPLATES.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    const matchDiff   = difficulty === 'All' || p.difficulty === difficulty;
    return matchSearch && matchDiff;
  });

  // Sort: recommended first
  const sorted = [...filtered].sort((a, b) => {
    if (recommendedIds.has(a.id) && !recommendedIds.has(b.id)) return -1;
    if (!recommendedIds.has(a.id) && recommendedIds.has(b.id)) return 1;
    return 0;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(99,102,241,0.45)', flexShrink: 0 }}>
            <Briefcase size={19} color="#fff" />
          </div>
          <div>
            <h1 className="s-page-title" style={{ margin: 0 }}>Projects</h1>
            <p className="s-page-sub">
              {careerGoal
                ? <>Curated projects to help you become a <strong style={{ color: '#6366f1' }}>{careerGoal}</strong>.</>
                : 'Build real-world projects to grow your skills and portfolio.'
              }
            </p>
          </div>
        </div>
        {recommendedIds.size > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <Star size={13} color="#6366f1" />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#6366f1' }}>{recommendedIds.size} recommended for you</span>
          </div>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: 200, maxWidth: 320 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: 36, paddingRight: 14, paddingTop: 10, paddingBottom: 10, borderRadius: 12, border: '1.5px solid rgba(99,102,241,0.15)', outline: 'none', fontSize: '0.875rem', color: '#374151', fontFamily: 'Inter, sans-serif', background: '#fff', boxSizing: 'border-box' }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#6366f1'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'}
          />
        </div>
        {/* Difficulty pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              style={{
                padding: '8px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontSize: '0.82rem', fontWeight: 600, fontFamily: 'inherit',
                background: difficulty === d ? 'linear-gradient(135deg,#6366f1,#7c3aed)' : '#fff',
                color: difficulty === d ? '#fff' : '#6b7280',
                boxShadow: difficulty === d ? '0 4px 14px rgba(99,102,241,0.4)' : '0 1px 3px rgba(0,0,0,0.06)',
                transition: 'all 0.18s',
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {sorted.length === 0 ? (
        <div className="s-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>No projects match your search.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {sorted.map((p) => (
            <ProjectCard key={p.id} project={p} isRecommended={recommendedIds.has(p.id)} onStart={() => navigate(`/projects/${p.id}`)} />
          ))}
        </div>
      )}
    </div>
  );
}
