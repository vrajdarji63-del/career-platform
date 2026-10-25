import { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { AlertCircle } from 'lucide-react';
import { studentsAPI } from '../../services/api.js';

const tooltipStyle = {
  contentStyle: { borderRadius: '10px', border: '1px solid rgba(20,184,166,0.2)', background: '#161b2e', fontSize: 12, color: '#e2e8f0' },
};

export default function AdminReportsPage() {
  const [studentGrowthData, setStudentGrowthData] = useState([]);
  const [careerInterestData, setCareerInterestData] = useState([]);
  const [skillDemandData, setSkillDemandData] = useState([]);
  const [assessmentCompletionData, setAssessmentCompletionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await studentsAPI.getStats();
        const data = res.data;
        setStudentGrowthData(data.studentGrowthData || []);
        setCareerInterestData(data.careerInterestData || []);
        setSkillDemandData(data.skillDemandData || []);
        setAssessmentCompletionData(data.assessmentCompletionData || []);
      } catch {
        setError('Failed to load reports data. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <div>
          <h1 className="a-page-title">Reports</h1>
          <p className="a-page-sub">Analytics and insights about the platform performance.</p>
        </div>
        <div className="a-card" style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#f87171' }}>
          <AlertCircle size={18} /> {error}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <div>
          <h1 className="a-page-title">Reports</h1>
          <p className="a-page-sub">Analytics and insights about the platform performance.</p>
        </div>
        <div className="grid-2" style={{ gap: '1.25rem' }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="a-card" style={{ minHeight: 280 }}>
              <div style={{ height: 16, width: '40%', background: 'rgba(20,184,166,0.08)', borderRadius: 6, marginBottom: 8, animation: 'pulse 1.5s ease infinite' }} />
              <div style={{ height: 12, width: '60%', background: 'rgba(20,184,166,0.05)', borderRadius: 6, marginBottom: 16, animation: 'pulse 1.5s ease infinite' }} />
              <div style={{ height: 200, background: 'rgba(20,184,166,0.03)', borderRadius: 10, animation: 'pulse 1.5s ease infinite' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const noDataMessage = (text) => (
    <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b', fontSize: '0.85rem' }}>
      {text}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h1 className="a-page-title">Reports</h1>
        <p className="a-page-sub">Analytics and insights about the platform performance.</p>
      </div>

      <div className="grid-2" style={{ gap: '1.25rem' }}>
        {/* Student Growth */}
        <div className="a-card">
          <h2 style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.95rem', marginBottom: 4 }}>Student Growth</h2>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>Total registered students by month</p>
          {studentGrowthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={studentGrowthData}>
                <defs>
                  <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#14b8a6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(20,184,166,0.08)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="students" stroke="#14b8a6" strokeWidth={2} fill="url(#growthGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : noDataMessage('No student growth data yet.')}
        </div>

        {/* Career Interest */}
        <div className="a-card">
          <h2 style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.95rem', marginBottom: 4 }}>Career Interest Distribution</h2>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>Number of students per career path</p>
          {careerInterestData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={careerInterestData} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={2}>
                  {careerInterestData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : noDataMessage('No career interest data yet.')}
        </div>

        {/* Skill Demand */}
        <div className="a-card">
          <h2 style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.95rem', marginBottom: 4 }}>Skill Demand</h2>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>Most in-demand skills across career paths</p>
          {skillDemandData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={skillDemandData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(20,184,166,0.08)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="skill" type="category" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip {...tooltipStyle} formatter={(v) => [`${v}%`, 'Demand']} />
                <Bar dataKey="demand" fill="#14b8a6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : noDataMessage('No skill demand data yet. Add careers with required skills.')}
        </div>

        {/* Assessment Completion */}
        <div className="a-card">
          <h2 style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.95rem', marginBottom: 4 }}>Assessment Completion</h2>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>Attempted vs. Completed assessments</p>
          {assessmentCompletionData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={assessmentCompletionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(20,184,166,0.08)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
                <Bar dataKey="attempted" fill="rgba(20,184,166,0.2)" radius={[3, 3, 0, 0]} name="Attempted" />
                <Bar dataKey="completed"  fill="#14b8a6"              radius={[3, 3, 0, 0]} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          ) : noDataMessage('No assessment data yet.')}
        </div>
      </div>
    </div>
  );
}
