import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, AlertCircle } from 'lucide-react';
import { careersAPI } from '../../services/api.js';

const difficultyBadge = {
  Beginner:     'a-badge-green',
  Intermediate: 'a-badge-amber',
  Advanced:     'a-badge-red',
};

export default function AdminCareersPage() {
  const [careerList, setCareerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editCareer, setEditCareer] = useState(null);
  const [form, setForm] = useState({ title: '', category: '', difficulty: 'Intermediate' });
  const [saving, setSaving] = useState(false);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const res = await careersAPI.getAll();
      setCareerList(res.data.careers || []);
    } catch {
      setError('Failed to load careers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCareers(); }, []);

  const openAdd = () => {
    setEditCareer(null);
    setForm({ title: '', category: '', difficulty: 'Intermediate' });
    setModalOpen(true);
  };

  const openEdit = (career) => {
    setEditCareer(career);
    setForm({ title: career.title, category: career.category, difficulty: career.difficulty });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editCareer) {
        await careersAPI.update(editCareer.id, form);
      } else {
        const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        await careersAPI.create({
          ...form,
          id: slug,
          description: form.title,
          requiredSkills: [],
        });
      }
      setModalOpen(false);
      fetchCareers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save career.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this career?')) return;
    try {
      await careersAPI.delete(id);
      setCareerList((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert('Failed to delete career.');
    }
  };

  if (error && careerList.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <div>
          <h1 className="a-page-title">Careers</h1>
          <p className="a-page-sub">Manage career paths available on the platform.</p>
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
          <h1 className="a-page-title">Careers</h1>
          <p className="a-page-sub">Manage career paths available on the platform.</p>
        </div>
        <button className="a-btn a-btn-primary" onClick={openAdd}>
          <Plus size={15} /> Add Career
        </button>
      </div>

      <div className="a-card" style={{ padding: 0 }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="a-table">
            <thead>
              <tr>
                {['Career', 'Category', 'Required Skills', 'Difficulty', 'Actions'].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(5)].map((_, j) => (
                      <td key={j}>
                        <div style={{ height: 14, background: 'rgba(20,184,166,0.08)', borderRadius: 6, animation: 'pulse 1.5s ease infinite' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : careerList.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                    No careers found. Add your first career path.
                  </td>
                </tr>
              ) : (
                careerList.map((career) => (
                  <tr key={career.id || career._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: '1.2rem' }}>{career.icon || '💼'}</span>
                        <span style={{ fontWeight: 500, color: '#e2e8f0' }}>{career.title}</span>
                      </div>
                    </td>
                    <td>{career.category}</td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {(career.requiredSkills || []).slice(0, 3).map((s) => (
                          <span key={s} style={{ padding: '2px 8px', background: 'rgba(20,184,166,0.1)', color: '#2dd4bf', borderRadius: 6, fontSize: '0.72rem', fontWeight: 500 }}>{s}</span>
                        ))}
                        {(career.requiredSkills || []).length > 3 && (
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>+{career.requiredSkills.length - 3}</span>
                        )}
                        {(!career.requiredSkills || career.requiredSkills.length === 0) && (
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>None</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`a-badge ${difficultyBadge[career.difficulty]}`}>{career.difficulty}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button
                          onClick={() => openEdit(career)}
                          style={{ padding: '6px', borderRadius: 8, background: 'rgba(251,191,36,0.1)', border: 'none', cursor: 'pointer', color: '#fbbf24', display: 'flex', alignItems: 'center', transition: 'background 0.18s' }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(career.id)}
                          style={{ padding: '6px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: 'none', cursor: 'pointer', color: '#f87171', display: 'flex', alignItems: 'center', transition: 'background 0.18s' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
          <div className="a-card" style={{ width: '100%', maxWidth: 460, padding: '2rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '1.5rem', fontFamily: 'Syne, sans-serif' }}>
              {editCareer ? 'Edit Career' : 'Add Career'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Career Title', key: 'title', placeholder: 'e.g. Frontend Developer' },
                { label: 'Category', key: 'category', placeholder: 'e.g. Web Development' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>{label}</label>
                  <input
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    style={{ width: '100%', padding: '10px 14px', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.2)', borderRadius: 10, color: '#e2e8f0', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
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
                  {saving ? 'Saving…' : 'Save Career'}
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
