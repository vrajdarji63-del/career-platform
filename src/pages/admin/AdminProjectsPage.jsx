import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, AlertCircle } from 'lucide-react';
import { projectsAPI } from '../../services/api.js';

const difficultyBadge = {
  Beginner:     'a-badge-green',
  Intermediate: 'a-badge-amber',
  Advanced:     'a-badge-red',
};

const statusBadge = {
  'in-progress':  'a-badge-blue',
  'recommended':  'a-badge-teal',
  'not-started':  'a-badge-amber',
  'completed':    'a-badge-green',
};

export default function AdminProjectsPage() {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [form, setForm] = useState({ title: '', difficulty: 'Intermediate', estimatedTime: '', description: '' });
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectsAPI.getAll();
      setProjectList(res.data.projects || []);
    } catch {
      setError('Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const openAdd = () => {
    setEditProject(null);
    setForm({ title: '', difficulty: 'Intermediate', estimatedTime: '', description: '' });
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditProject(project);
    setForm({
      title: project.title,
      difficulty: project.difficulty,
      estimatedTime: project.estimatedTime,
      description: project.description || '',
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editProject) {
        await projectsAPI.update(editProject._id || editProject.id, form);
      } else {
        await projectsAPI.create({
          ...form,
          description: form.description || form.title,
          skills: [],
          category: 'Web Development',
        });
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this project?')) return;
    try {
      await projectsAPI.delete(id);
      setProjectList((prev) => prev.filter((p) => (p._id || p.id) !== id));
    } catch {
      alert('Failed to delete project.');
    }
  };

  if (error && projectList.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <div>
          <h1 className="a-page-title">Projects</h1>
          <p className="a-page-sub">Manage student projects available on the platform.</p>
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
          <h1 className="a-page-title">Projects</h1>
          <p className="a-page-sub">Manage student projects available on the platform.</p>
        </div>
        <button className="a-btn a-btn-primary" onClick={openAdd}>
          <Plus size={15} /> Add Project
        </button>
      </div>

      <div className="a-card" style={{ padding: 0 }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="a-table">
            <thead>
              <tr>
                {['Project', 'Difficulty', 'Skills', 'Est. Time', 'Status', 'Actions'].map((h) => (
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
              ) : projectList.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                    No projects found. Add your first project.
                  </td>
                </tr>
              ) : (
                projectList.map((project) => {
                  const pid = project._id || project.id;
                  return (
                    <tr key={pid}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: '1.2rem' }}>{project.icon || '📁'}</span>
                          <div>
                            <p style={{ fontWeight: 500, color: '#e2e8f0', fontSize: '0.875rem' }}>{project.title}</p>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{project.category}</p>
                          </div>
                        </div>
                      </td>
                      <td><span className={`a-badge ${difficultyBadge[project.difficulty]}`}>{project.difficulty}</span></td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {(project.skills || []).slice(0, 2).map((s) => (
                            <span key={s} style={{ padding: '2px 8px', background: 'rgba(99,102,241,0.12)', color: '#818cf8', borderRadius: 6, fontSize: '0.72rem', fontWeight: 500 }}>{s}</span>
                          ))}
                          {(project.skills || []).length > 2 && (
                            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>+{project.skills.length - 2}</span>
                          )}
                          {(!project.skills || project.skills.length === 0) && (
                            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>None</span>
                          )}
                        </div>
                      </td>
                      <td>{project.estimatedTime || '—'}</td>
                      <td><span className={`a-badge ${statusBadge[project.status] || 'a-badge-amber'}`}>{project.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button
                            onClick={() => openEdit(project)}
                            style={{ padding: '6px', borderRadius: 8, background: 'rgba(251,191,36,0.1)', border: 'none', cursor: 'pointer', color: '#fbbf24', display: 'flex', alignItems: 'center' }}
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(pid)}
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
              {editProject ? 'Edit Project' : 'Add Project'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Project Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Portfolio Website"
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.2)', borderRadius: 10, color: '#e2e8f0', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                />
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
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Estimated Time</label>
                <input
                  value={form.estimatedTime}
                  onChange={(e) => setForm({ ...form, estimatedTime: e.target.value })}
                  placeholder="e.g. 10-15 hours"
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.2)', borderRadius: 10, color: '#e2e8f0', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', gap: 10, paddingTop: 8 }}>
                <button className="a-btn a-btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving…' : 'Save Project'}
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
