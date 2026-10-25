import { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Users, BarChart2, CheckSquare, FolderOpen, Compass, Activity, TrendingUp, ArrowUpRight, AlertCircle } from 'lucide-react';
import { studentsAPI } from '../../services/api.js';

const statCardConfig = [
  { icon: Users,       label: 'Total Students',         key: 'totalStudents',        color: '#14b8a6', bg: 'rgba(20,184,166,0.12)'  },
  { icon: Activity,    label: 'Active Students',         key: 'activeStudents',       color: '#06b6d4', bg: 'rgba(6,182,212,0.12)'   },
  { icon: CheckSquare, label: 'Career Assessments',      key: 'careerAssessments',    color: '#818cf8', bg: 'rgba(129,140,248,0.12)' },
  { icon: BarChart2,   label: 'Completed Assessments',   key: 'completedAssessments', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  { icon: FolderOpen,  label: 'Projects',                key: 'projects',             color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  { icon: Compass,     label: 'Career Paths',            key: 'careerPaths',          color: '#fbbf24', bg: 'rgba(251,191,36,0.12)'  },
];

const activityIcons = {
  registration: '🎓',
  assessment:   '✅',
  roadmap:      '🗺️',
  project:      '📂',
};
const activityColors = {
  registration: '#14b8a6',
  assessment:   '#06b6d4',
  roadmap:      '#818cf8',
  project:      '#34d399',
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [growthData, setGrowthData] = useState([]);
  const [careerData, setCareerData] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await studentsAPI.getStats();
        const data = res.data;
        setStats(data.stats);
        setGrowthData(data.studentGrowthData || []);
        setCareerData(data.careerInterestData || []);
        setActivity(data.recentActivity || []);
      } catch (err) {
        setError('Failed to load dashboard data. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Compute dynamic change labels
  const getChangeLabel = (key) => {
    if (!stats) return null;
    switch (key) {
      case 'activeStudents':
        return stats.totalStudents > 0
          ? `${Math.round((stats.activeStudents / stats.totalStudents) * 100)}% of total`
          : null;
      case 'completedAssessments':
        return stats.careerAssessments > 0
          ? `${Math.round((stats.completedAssessments / stats.careerAssessments) * 100)}% rate`
          : null;
      default:
        return null;
    }
  };

  // Calculate MoM growth
  const getMoMGrowth = () => {
    if (growthData.length < 2) return null;
    const current = growthData[growthData.length - 1]?.newStudents || 0;
    const previous = growthData[growthData.length - 2]?.newStudents || 0;
    if (previous === 0) return current > 0 ? '+100%' : '0%';
    const change = Math.round(((current - previous) / previous) * 100);
    return change >= 0 ? `+${change}%` : `${change}%`;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <div>
          <h1 className="a-page-title">Dashboard</h1>
          <p className="a-page-sub">Platform overview and key metrics.</p>
        </div>
        <div className="grid-3" style={{ gap: '1.125rem' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="a-card" style={{ padding: '1.375rem', minHeight: 110 }}>
              <div style={{ height: 14, width: '40%', background: 'rgba(20,184,166,0.08)', borderRadius: 6, marginBottom: 16, animation: 'pulse 1.5s ease infinite' }} />
              <div style={{ height: 32, width: '50%', background: 'rgba(20,184,166,0.06)', borderRadius: 8, animation: 'pulse 1.5s ease infinite' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <div>
          <h1 className="a-page-title">Dashboard</h1>
          <p className="a-page-sub">Platform overview and key metrics.</p>
        </div>
        <div className="a-card" style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#f87171' }}>
          <AlertCircle size={18} /> {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div>
        <h1 className="a-page-title">Dashboard</h1>
        <p className="a-page-sub">Platform overview and key metrics.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid-3" style={{ gap: '1.125rem' }}>
        {statCardConfig.map(({ icon: Icon, label, key, color, bg }, i) => {
          const change = getChangeLabel(key);
          return (
            <div
              key={key}
              className="a-card a-card-hover fade-up"
              style={{ padding: '1.375rem', animationDelay: `${i * 0.05}s` }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: '0.72rem', fontWeight: 700, color: '#475569',
                    textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10,
                  }}>{label}</p>
                  <div style={{
                    fontSize: '2.25rem', fontWeight: 800, color: '#e2e8f0',
                    fontFamily: 'Syne, sans-serif', lineHeight: 1, marginBottom: 6,
                  }}>
                    {(stats[key] || 0).toLocaleString()}
                  </div>
                  {change && (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      fontSize: '0.75rem', color, fontWeight: 600,
                      background: bg, padding: '3px 8px', borderRadius: 99,
                    }}>
                      <TrendingUp size={11} /> {change}
                    </div>
                  )}
                </div>
                <div style={{
                  width: 46, height: 46, borderRadius: 13, background: bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  border: `1px solid ${color}25`,
                }}>
                  <Icon size={21} color={color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.25rem' }} className="grid-responsive-2">
        {/* Student Growth */}
        <div className="a-card fade-up">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0', margin: '0 0 3px', fontFamily: 'Syne, sans-serif' }}>Student Growth</h2>
              <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0 }}>Monthly registration trend</p>
            </div>
            {getMoMGrowth() && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: 'rgba(20,184,166,0.1)', color: '#2dd4bf',
                fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: 99,
                border: '1px solid rgba(20,184,166,0.2)',
              }}>
                <TrendingUp size={11} /> {getMoMGrowth()} MoM
              </div>
            )}
          </div>
          {growthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#14b8a6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#161b2e', border: '1px solid rgba(20,184,166,0.2)',
                    borderRadius: 12, fontSize: 12, color: '#e2e8f0',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}
                  cursor={{ stroke: 'rgba(20,184,166,0.2)', strokeWidth: 1.5 }}
                />
                <Area type="monotone" dataKey="students" stroke="#14b8a6" strokeWidth={2.5} fill="url(#tealGrad)" dot={false} activeDot={{ r: 4, fill: '#14b8a6', stroke: '#0c1124', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b', fontSize: '0.85rem' }}>
              No student data yet. Students will appear here as they register.
            </div>
          )}
        </div>

        {/* Career Interest */}
        <div className="a-card fade-up stagger-2">
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0', margin: '0 0 3px', fontFamily: 'Syne, sans-serif' }}>Career Interest</h2>
            <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0 }}>Distribution by field</p>
          </div>
          {careerData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={careerData}
                  cx="50%" cy="50%"
                  innerRadius={58} outerRadius={88}
                  dataKey="value" paddingAngle={3}
                >
                  {careerData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#161b2e', border: '1px solid rgba(20,184,166,0.2)',
                    borderRadius: 12, fontSize: 12, color: '#e2e8f0',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}
                />
                <Legend
                  iconType="circle" iconSize={8}
                  wrapperStyle={{ fontSize: 11, color: '#64748b', paddingTop: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b', fontSize: '0.85rem' }}>
              No career interest data yet. Data appears when students set their career goals.
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="a-card fade-up">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0', margin: '0 0 3px', fontFamily: 'Syne, sans-serif' }}>Recent Activity</h2>
            <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0 }}>Latest student actions</p>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.15)',
            color: '#2dd4bf', fontSize: '0.78rem', fontWeight: 600,
            padding: '5px 12px', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.18s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,184,166,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(20,184,166,0.08)'}
          >
            View All <ArrowUpRight size={12} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {activity.length > 0 ? (
            activity.map((item, i) => {
              const dotColor = activityColors[item.type] || '#14b8a6';
              const icon = activityIcons[item.type] || '📋';
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 0',
                  borderBottom: i < activity.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  transition: 'all 0.18s',
                  borderRadius: 8, paddingLeft: 4, paddingRight: 4,
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(20,184,166,0.04)'; e.currentTarget.style.paddingLeft = '12px'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.paddingLeft = '4px'; }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 11,
                    background: `${dotColor}15`,
                    border: `1px solid ${dotColor}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', flexShrink: 0,
                  }}>
                    {icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.875rem', color: '#cbd5e1', margin: 0 }}>
                      <span style={{ fontWeight: 700, color: '#e2e8f0' }}>{item.name}</span>
                      <span style={{ color: '#475569' }}> — </span>
                      {item.action}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#475569', margin: '3px 0 0' }}>{item.time}</p>
                  </div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0, boxShadow: `0 0 8px ${dotColor}80` }} />
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b', fontSize: '0.85rem' }}>
              No activity yet. Activity will appear when students register and take assessments.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
