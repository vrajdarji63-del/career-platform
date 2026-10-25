import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, AlertCircle } from 'lucide-react';
import { skillsAPI } from '../../services/api.js';

const difficultyBadge = {
  Beginner:     'a-badge-green',
  Intermediate: 'a-badge-amber',
  Advanced:     'a-badge-red',
};

const statusBadge = {
  'strong':         'a-badge-teal',
  'high-priority':  'a-badge-red',
  'medium':         'a-badge-blue',
  'not-started':    'a-badge-amber',
};

export default function AdminSkillsPage() {
  const [skillList, setSkillList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editSkill, setEditSkill] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'Frontend', difficulty: 'Intermediate' });
  const [saving, setSaving] = useState(false);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await skillsAPI.getAll();
      setSkillList(res.data.skills || []);
    } catch {
      setError('Failed to load skills.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const openAdd = () => {
    setEditSkill(null);
    setForm({ name: '', category: 'Frontend', difficulty: 'Intermediate' });
    setModalOpen(true);
  };

  const openEdit = (skill) => {
    setEditSkill(skill);
    setForm({ name: skill.name, category: skill.category, difficulty: skill.difficulty });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editSkill) {
        await skillsAPI.update(editSkill._id || editSkill.id, form);
      } else {
        await skillsAPI.create(form);
      }
      setModalOpen(false);
      fetchSkills();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save skill.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this skill?')) return;
    try {
      await skillsAPI.delete(id);
      setSkillList((prev) => prev.filter((s) => (s._id || s.id) !== id));
    } catch {
      alert('Failed to delete skill.');
    }
  };

  if (error && skillList.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <div>
          <h1 className="a-page-title">Skills</h1>
          <p className="a-page-sub">Manage the skills tracked on the platform.</p>
        </div>
        <div className="a-card" style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#f87171' }}>
          <AlertCircle size={18} /> {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 className="a-page-title">Skills</h1>
          <p className="a-page-sub">Manage the skills tracked on the platform.</p>
        </div>
        <button className="a-btn a-btn-primary" onClick={openAdd}>
          <Plus size={15} /> Add Skill
        </button>
      </div>

      <div className="a-card" style={{ padding: 0 }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="a-table">
            <thead>
              <tr>
                {['Skill', 'Category', 'Difficulty', 'Students Learning', 'Status', 'Actions'].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(6)].map((_, j) => (
                      <td key={j}>
                        <div style={{ height: 14, background: 'rgba(20,184,166,0.08)', borderRadius: 6, animation: 'pulse 1.5s ease infinite' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : skillList.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                    No skills found. Add your first skill.
                  </td>
                </tr>
              ) : (
                skillList.map((skill) => {
                  const sid = skill._id || skill.id;
                  return (
                    <tr key={sid}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: '1.1rem' }}>{skill.icon || '📚'}</span>
                          <span style={{ fontWeight: 500, color: '#e2e8f0' }}>{skill.name}</span>
                        </div>
                      </td>
                      <td>{skill.category}</td>
                      <td><span className={`a-badge ${difficultyBadge[skill.difficulty]}`}>{skill.difficulty}</span></td>
                      <td>
                        <span style={{ color: '#2dd4bf', fontWeight: 600 }}>{(skill.studentsLearning || 0).toLocaleString()}</span>
                      </td>
                      <td>
                        <span className={`a-badge ${statusBadge[skill.status] || 'a-badge-amber'}`}>{skill.status}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button
                            onClick={() => openEdit(skill)}
                            style={{ padding: '6px', borderRadius: 8, background: 'rgba(251,191,36,0.1)', border: 'none', cursor: 'pointer', color: '#fbbf24', display: 'flex', alignItems: 'center' }}
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(sid)}
                            style={{ padding: '6px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: 'none', cursor: 'pointer', color: '#f87171', display: 'flex', alignItems: 'center' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
          <div className="a-card" style={{ width: '100%', maxWidth: 460, padding: '2rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '1.5rem', fontFamily: 'Syne, sans-serif' }}>
              {editSkill ? 'Edit Skill' : 'Add Skill'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Skill Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. React"
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.2)', borderRadius: 10, color: '#e2e8f0', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.2)', borderRadius: 10, color: '#e2e8f0', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                >
                  {['Frontend', 'Backend', 'Database', 'DevOps', 'Cloud', 'Tools'].map((c) => <option key={c} style={{ background: '#161b2e' }}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Difficulty</label>
                <select
                  value={form.difficulty}
                  onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.2)', borderRadius: 10, color: '#e2e8f0', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                >
                  {['Beginner', 'Intermediate', 'Advanced'].map((d) => <option key={d} style={{ background: '#161b2e' }}>{d}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: 10, paddingTop: 8 }}>
                <button className="a-btn a-btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving…' : 'Save Skill'}
                </button>
                <button className="a-btn a-btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setModalOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
