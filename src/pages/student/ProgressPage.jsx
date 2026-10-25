import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import Card from '../../components/common/Card.jsx';
import ProgressBar from '../../components/common/ProgressBar.jsx';
import Badge from '../../components/common/Badge.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { TrendingUp, Target, BookOpen, Award } from 'lucide-react';

export default function ProgressPage() {
  const { currentUser } = useAuth();

  const careerReadiness  = currentUser?.careerReadiness ?? 0;
  const skills           = currentUser?.skills  || [];
  const interests        = currentUser?.interests || [];
  const careerGoal       = currentUser?.careerGoal || currentUser?.recommendedCareer?.title || currentUser?.recommendedCareer || '—';
  const recommendedMatch = currentUser?.recommendedCareer?.match;

  // Build skill list (handle both string[] and {name, proficiency}[])
  const skillList = skills.map((s) =>
    typeof s === 'string' ? { name: s, proficiency: 50 } : s
  );

  // Radar chart data from skills
  const radarData = skillList.slice(0, 6).map((s) => ({
    subject: s.name,
    score: s.proficiency,
    fullMark: 100,
  }));

  // Progress history: use real data if available or generate from careerReadiness
  const progressHistory = currentUser?.progressHistory?.length > 0
    ? currentUser.progressHistory
    : [
        { month: 'Start', score: 0 },
        { month: 'Now',   score: careerReadiness },
      ];

  const topSkill    = skillList.reduce((best, s) => s.proficiency > (best?.proficiency ?? 0) ? s : best, null);
  const topScore    = topSkill ? topSkill.proficiency : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 className="s-page-title">My Progress</h1>
        <p className="s-page-sub">Track your learning journey and skill development over time.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid-4">
        {[
          { label: 'Career Readiness',  value: `${careerReadiness}%`,    color: '#6366f1', bg: 'rgba(99,102,241,0.08)',  icon: TrendingUp },
          { label: 'Career Goal',        value: careerGoal,               color: '#10b981', bg: 'rgba(16,185,129,0.08)',  icon: Target,     small: true },
          { label: 'Skills Tracked',     value: skillList.length,         color: '#3b82f6', bg: 'rgba(59,130,246,0.08)',  icon: BookOpen },
          { label: 'Top Skill Score',    value: topScore ? `${topScore}%` : '—', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', icon: Award },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="s-card" style={{ background: stat.bg, border: `1px solid ${stat.bg}` }}>
              <Icon size={16} color={stat.color} style={{ marginBottom: 8 }} />
              <div style={{ fontSize: stat.small ? '1rem' : '1.75rem', fontWeight: 800, color: stat.color, fontFamily: 'Syne, sans-serif', lineHeight: 1.2, marginBottom: 6 }}>{stat.value}</div>
              <div style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 500 }}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Career Readiness Chart */}
      <Card>
        <h2 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', marginBottom: '1.25rem', fontFamily: 'Syne, sans-serif' }}>Career Readiness Over Time</h2>
        {progressHistory.length >= 2 ? (
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={progressHistory}>
              <defs>
                <linearGradient id="readinessGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: 13 }} formatter={(v) => [`${v}%`, 'Readiness']} />
              <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2.5} fill="url(#readinessGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', flexDirection: 'column', gap: 8 }}>
            <TrendingUp size={28} style={{ opacity: 0.3 }} />
            <p style={{ fontSize: '0.875rem', margin: 0 }}>Progress history will appear as you learn</p>
          </div>
        )}
      </Card>

      {/* Skill Radar + Skill Progress */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="grid-responsive-2">
        <Card>
          <h2 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', marginBottom: '1rem' }}>Skill Radar</h2>
          {radarData.length >= 3 ? (
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Radar name="Skills" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '0.875rem', textAlign: 'center' }}>
              Add more skills to see the radar chart
            </div>
          )}
        </Card>

        <Card>
          <h2 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', marginBottom: '1rem' }}>Skill Progress</h2>
          {skillList.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {skillList.slice(0, 8).map((skill) => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: 5 }}>
                    <span style={{ fontWeight: 500, color: '#374151' }}>{skill.name}</span>
                    <span style={{ color: '#6b7280' }}>{skill.proficiency}%</span>
                  </div>
                  <ProgressBar
                    value={skill.proficiency}
                    color={skill.proficiency >= 80 ? 'emerald' : skill.proficiency >= 60 ? 'indigo' : 'amber'}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
              No skills yet — complete onboarding
            </div>
          )}
        </Card>
      </div>

      {/* Interests */}
      {interests.length > 0 && (
        <Card>
          <h2 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', marginBottom: '1rem', fontFamily: 'Syne, sans-serif' }}>Your Interests</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {interests.map((interest) => (
              <span key={interest} style={{ padding: '6px 14px', borderRadius: 99, fontSize: '0.82rem', fontWeight: 600, background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.15)' }}>
                {interest}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Career Goal */}
      {(currentUser?.recommendedCareer || currentUser?.careerGoal) && (
        <Card>
          <h2 style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem', marginBottom: '1rem', fontFamily: 'Syne, sans-serif' }}>Career Goal</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>🎯</div>
              <div>
                <p style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '1rem', margin: 0, fontFamily: 'Syne, sans-serif' }}>{careerGoal}</p>
                {recommendedMatch && <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: '2px 0 0' }}>AI Match Score: <strong style={{ color: '#6366f1' }}>{recommendedMatch}%</strong></p>}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6366f1', fontFamily: 'Syne, sans-serif' }}>{careerReadiness}%</div>
              <p style={{ fontSize: '0.72rem', color: '#9ca3af', margin: 0 }}>Career Readiness</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
