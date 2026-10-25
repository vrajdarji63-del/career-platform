import { useState, useEffect } from 'react';
import { Search, Sparkles, TrendingUp, Users, Map } from 'lucide-react';
import CareerCard from '../../components/career/CareerCard.jsx';
import { careersAPI } from '../../services/api.js';
import { careers as fallbackCareers, careerCategories } from '../../data/careers.js';

const heroStats = [
  { icon: Map, value: '10+', label: 'Career Paths', color: '#6366f1' },
  { icon: Users, value: '1,200+', label: 'Students', color: '#10b981' },
  { icon: TrendingUp, value: '85%', label: 'Placement Rate', color: '#f59e0b' },
];

export default function CareersPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const params = {};
        if (activeCategory !== 'All') params.category = activeCategory;
        if (search) params.search = search;
        const res = await careersAPI.getAll(params);
        setCareers(res.data.careers);
      } catch {
        setCareers(fallbackCareers);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(fetchCareers, 300);
    return () => clearTimeout(debounce);
  }, [search, activeCategory]);

  // Strip invalid / placeholder entries coming from API
  const validCareers = careers.filter(
    (c) => c.title && c.title.toLowerCase() !== 'nothing' && c.description && c.description.toLowerCase() !== 'nothing' && c.difficulty
  );

  const filtered = validCareers.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || c.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff' }}>

      {/* Hero */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #fafbff 0%, #f3f4ff 50%, #f8f5ff 100%)',
        borderBottom: '1px solid rgba(99,102,241,0.08)',
        padding: '4.5rem 1.5rem 5rem',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div className="fade-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)',
            color: '#6366f1', fontSize: '0.82rem', fontWeight: 600,
            padding: '6px 14px 6px 10px', borderRadius: 99, marginBottom: '1.75rem',
          }}>
            <div style={{ width: 22, height: 22, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={12} color="#fff" />
            </div>
            Explore Career Paths
          </div>

          <h1 className="fade-up stagger-1" style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', fontWeight: 800, lineHeight: 1.15,
            color: '#0f0d2e', letterSpacing: '-1px', fontFamily: 'Syne, sans-serif', marginBottom: '1.25rem',
          }}>
            Find the career that{' '}
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              fits you best
            </span>
          </h1>

          <p className="fade-up stagger-2" style={{ fontSize: '1.1rem', color: '#6b7280', lineHeight: 1.75, maxWidth: 600, margin: '0 auto 2.5rem' }}>
            Discover in-demand tech careers, explore required skills, and get personalized match scores based on your profile.
          </p>

          {/* Stats strip */}
          <div className="fade-up stagger-3" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {heroStats.map(({ icon: Icon, value, label, color }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: '#fff', borderRadius: 12, padding: '10px 18px',
                border: '1px solid rgba(99,102,241,0.1)',
                boxShadow: '0 2px 12px rgba(99,102,241,0.06)',
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={15} color={color} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1e1b4b', fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section style={{ padding: '3rem 1.5rem 5rem', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Search + Category Filters */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '1rem',
            alignItems: 'center', marginBottom: '2.5rem',
            background: 'linear-gradient(135deg, #fafbff, #f5f0ff)',
            padding: '1.25rem 1.5rem',
            borderRadius: 20, border: '1px solid rgba(99,102,241,0.1)',
            boxShadow: '0 4px 20px rgba(99,102,241,0.06)',
          }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: 360 }}>
              <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                <Search size={15} color="#9ca3af" />
              </div>
              <input
                type="text"
                placeholder="Search careers, skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%', paddingLeft: 38, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                  border: '1px solid rgba(99,102,241,0.15)', borderRadius: 12,
                  fontSize: '0.875rem', fontFamily: 'inherit', color: '#1e1b4b',
                  background: '#fff', outline: 'none', transition: 'all 0.2s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; }}
              />
            </div>

            {/* Category pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {careerCategories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '8px 16px', borderRadius: 99, fontSize: '0.82rem', fontWeight: 600,
                      cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.18s',
                      background: active ? 'linear-gradient(135deg, #6366f1, #7c3aed)' : '#fff',
                      color: active ? '#fff' : '#6b7280',
                      border: active ? 'none' : '1px solid rgba(99,102,241,0.15)',
                      boxShadow: active ? '0 4px 16px rgba(99,102,241,0.35)' : '0 1px 3px rgba(0,0,0,0.04)',
                      transform: active ? 'translateY(-1px)' : '',
                    }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'; e.currentTarget.style.color = '#6366f1'; e.currentTarget.style.background = 'rgba(99,102,241,0.05)'; } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'; e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = '#fff'; } }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count */}
          {!loading && (
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                Showing <strong style={{ color: '#374151' }}>{filtered.length}</strong> career{filtered.length !== 1 ? 's' : ''}
                {activeCategory !== 'All' && <> in <strong style={{ color: '#6366f1' }}>{activeCategory}</strong></>}
                {search && <> matching "<strong style={{ color: '#6366f1' }}>{search}</strong>"</>}
              </p>
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', gridAutoRows: '1fr' }} className="grid-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(99,102,241,0.08)', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', minHeight: 240 }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: '1.25rem' }}>
                    <div style={{ width: 46, height: 46, background: 'rgba(99,102,241,0.08)', borderRadius: 14, flexShrink: 0, animation: 'pulse-dot 1.8s ease infinite' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ height: 14, background: 'rgba(99,102,241,0.08)', borderRadius: 6, width: '70%', marginBottom: 8, animation: 'pulse-dot 1.8s ease infinite' }} />
                      <div style={{ height: 11, background: 'rgba(99,102,241,0.06)', borderRadius: 6, width: '45%', animation: 'pulse-dot 1.8s ease infinite' }} />
                    </div>
                  </div>
                  <div style={{ height: 11, background: 'rgba(99,102,241,0.06)', borderRadius: 6, marginBottom: 8, animation: 'pulse-dot 1.8s ease infinite' }} />
                  <div style={{ height: 11, background: 'rgba(99,102,241,0.06)', borderRadius: 6, width: '80%', marginBottom: '1.25rem', animation: 'pulse-dot 1.8s ease infinite' }} />
                  <div style={{ display: 'flex', gap: 8, marginBottom: '1.25rem' }}>
                    {[60, 45, 55].map((w, j) => <div key={j} style={{ height: 24, width: w, background: 'rgba(99,102,241,0.06)', borderRadius: 99, animation: 'pulse-dot 1.8s ease infinite' }} />)}
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '5rem 1.5rem',
              background: 'rgba(99,102,241,0.03)', borderRadius: 24,
              border: '1px dashed rgba(99,102,241,0.15)',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ fontWeight: 700, color: '#1e1b4b', fontFamily: 'Syne, sans-serif', fontSize: '1.25rem', marginBottom: 8 }}>No careers found</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Try a different search term or category.
              </p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                style={{
                  padding: '10px 22px', borderRadius: 10, border: '1px solid rgba(99,102,241,0.2)',
                  background: 'rgba(99,102,241,0.08)', color: '#6366f1',
                  fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.14)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', gridAutoRows: '1fr' }} className="grid-3">
              {filtered.map((career, i) => (
                <div key={career.id || career._id} className={`fade-up stagger-${(i % 6) + 1}`} style={{ display: 'flex', flexDirection: 'column' }}>
                  <CareerCard career={career} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section style={{ padding: '4rem 1.5rem', background: 'linear-gradient(135deg, #fafbff, #f5f0ff)', borderTop: '1px solid rgba(99,102,241,0.08)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎯</div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#0f0d2e', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px', marginBottom: '0.75rem' }}>
            Not sure which career fits you?
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.6 }}>
            Take our free AI-powered assessment to get personalized career matches based on your skills and interests.
          </p>
          <a href="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #7c3aed)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 8px 32px rgba(99,102,241,0.4)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.55)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.4)'; }}
          >
            Take the Free Assessment <Sparkles size={16} />
          </a>
        </div>
      </section>

    </div>
  );
}
