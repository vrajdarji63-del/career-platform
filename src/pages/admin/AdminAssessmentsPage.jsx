import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { studentsAPI } from '../../services/api.js';

export default function AdminAssessmentsPage() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await studentsAPI.getStats();
        setAssessments(res.data.adminAssessments || []);
      } catch {
        setError('Failed to load assessments. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalAttempts = assessments.reduce((a, b) => a + b.attempts, 0);
  const avgCompletion = assessments.length > 0
    ? Math.round(assessments.reduce((a, b) => a + b.completionRate, 0) / assessments.length)
    : 0;

  const statCards = [
    { label: 'Total Assessments', value: assessments.length, color: '#14b8a6', bg: 'rgba(20,184,166,0.15)' },
    { label: 'Total Attempts',    value: totalAttempts.toLocaleString(), color: '#06b6d4', bg: 'rgba(6,182,212,0.15)' },
    { label: 'Avg Completion',    value: `${avgCompletion}%`, color: '#818cf8', bg: 'rgba(129,140,248,0.15)' },
  ];

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <div>
          <h1 className="a-page-title">Assessments</h1>
          <p className="a-page-sub">Overview of all career assessments on the platform.</p>
        </div>
        <div className="a-card" style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#f87171' }}>
          <AlertCircle size={18} /> {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h1 className="a-page-title">Assessments</h1>
        <p className="a-page-sub">Overview of all career assessments on the platform.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid-3" style={{ gap: '1rem' }}>
        {statCards.map(({ label, value, color, bg }) => (
          <div key={label} className="a-card a-card-hover" style={{ padding: '1.25rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{label}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#e2e8f0', fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>{loading ? '—' : value}</p>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>📋</div>
            </div>
          </div>
        ))}
      </div>

      <div className="a-card" style={{ padding: 0 }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="a-table">
            <thead>
              <tr>
                {['Assessment', 'Questions', 'Attempts', 'Completion Rate', 'Status'].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(5)].map((_, j) => (
                      <td key={j}>
                        <div style={{ height: 14, background: 'rgba(20,184,166,0.08)', borderRadius: 6, animation: 'pulse 1.5s ease infinite' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : assessments.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                    No assessments found. Create one to get started.
                  </td>
                </tr>
              ) : (
                assessments.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, background: 'rgba(20,184,166,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>📋</div>
                        <span style={{ fontWeight: 500, color: '#e2e8f0' }}>{a.title}</span>
                      </div>
                    </td>
                    <td>{a.questions}</td>
                    <td>{a.attempts.toLocaleString()}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{a.completionRate}%</span>
                        <div className="a-progress-track" style={{ flex: 1, minWidth: 60 }}>
                          <div className="a-progress-fill" style={{ width: `${a.completionRate}%` }} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`a-badge ${a.status === 'active' ? 'a-badge-teal' : 'a-badge-amber'}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
