import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';

const difficultyConfig = {
  Beginner:     { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)'  },
  Intermediate: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)'  },
  Advanced:     { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.2)'   },
};

export default function CareerCard({ career }) {
  const navigate = useNavigate();
  const diff = difficultyConfig[career.difficulty] || { color: '#9ca3af', bg: 'rgba(156,163,175,0.1)', border: 'rgba(156,163,175,0.2)' };
  const cardColor = career.color || '#6366f1';
  const skills = Array.isArray(career.requiredSkills) ? career.requiredSkills : [];

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 20,
        border: '1px solid rgba(99,102,241,0.08)',
        boxShadow: '0 2px 12px rgba(99,102,241,0.06)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        transition: 'all 0.25s',
        cursor: 'default',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 16px 48px rgba(99,102,241,0.14), 0 2px 8px rgba(0,0,0,0.06)`;
        e.currentTarget.style.borderColor = `${cardColor}30`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(99,102,241,0.06)';
        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.08)';
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${cardColor}, ${cardColor}80)`,
        borderRadius: '20px 20px 0 0',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: '1rem', marginTop: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 14, flexShrink: 0,
            background: `${cardColor}14`,
            border: `1px solid ${cardColor}22`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem', lineHeight: 1,
          }}>
            {career.icon}
          </div>
          <div>
            <h3 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', lineHeight: 1.3, fontFamily: 'Syne, sans-serif', margin: 0 }}>
              {career.title}
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 3, fontWeight: 500 }}>
              {career.category}
            </p>
          </div>
        </div>

        {/* Match % badge */}
        {career.matchPercentage > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
            background: 'rgba(16,185,129,0.08)', color: '#059669',
            fontSize: '0.82rem', fontWeight: 700,
            padding: '4px 10px', borderRadius: 99,
            border: '1px solid rgba(16,185,129,0.15)',
          }}>
            <TrendingUp size={12} />
            {career.matchPercentage}%
          </div>
        )}
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.65,
        marginBottom: '1rem', flexGrow: 1,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {career.description}
      </p>

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.25rem', minHeight: 30 }}>
        {skills.slice(0, 4).map((skill) => (
          <span key={skill} style={{
            padding: '3px 10px', borderRadius: 99,
            background: `${cardColor}0d`,
            border: `1px solid ${cardColor}20`,
            fontSize: '0.72rem', fontWeight: 600,
            color: cardColor,
          }}>
            {skill}
          </span>
        ))}
        {skills.length > 4 && (
          <span style={{
            padding: '3px 10px', borderRadius: 99,
            background: 'rgba(107,114,128,0.08)',
            border: '1px solid rgba(107,114,128,0.15)',
            fontSize: '0.72rem', fontWeight: 600, color: '#9ca3af',
          }}>
            +{skills.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(99,102,241,0.07)',
      }}>
        {/* Difficulty badge */}
        <span style={{
          padding: '4px 12px', borderRadius: 99,
          background: diff.bg, border: `1px solid ${diff.border}`,
          fontSize: '0.75rem', fontWeight: 700, color: diff.color,
        }}>
          {career.difficulty}
        </span>

        {/* Explore button */}
        <button
          onClick={() => navigate(`/career/${career.id || career._id}`)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 99,
            background: `${cardColor}10`,
            border: `1px solid ${cardColor}20`,
            color: cardColor, fontWeight: 700, fontSize: '0.8rem',
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `${cardColor}20`; e.currentTarget.style.transform = 'translateX(2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = `${cardColor}10`; e.currentTarget.style.transform = ''; }}
        >
          Explore <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
