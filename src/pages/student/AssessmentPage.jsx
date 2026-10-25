import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, ClipboardList, Sparkles } from 'lucide-react';
import { assessmentQuestions } from '../../data/assessment.js';

// ── Option button ─────────────────────────────────────────────────────────────
function OptionBtn({ option, selected, onClick }) {
  const isSelected = selected === option.id;
  return (
    <button
      type="button"
      onClick={() => onClick(option.id)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 18px',
        borderRadius: 14,
        border: `2px solid ${isSelected ? '#6366f1' : 'rgba(99,102,241,0.1)'}`,
        background: isSelected
          ? 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))'
          : '#fafbff',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.18s ease',
        fontFamily: 'Inter, sans-serif',
        boxShadow: isSelected ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)';
          e.currentTarget.style.background = 'rgba(99,102,241,0.04)';
          e.currentTarget.style.transform = 'translateX(3px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'rgba(99,102,241,0.1)';
          e.currentTarget.style.background = '#fafbff';
          e.currentTarget.style.transform = '';
        }
      }}
    >
      {/* Radio circle */}
      <div style={{
        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
        border: `2px solid ${isSelected ? '#6366f1' : '#d1d5db'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isSelected ? '#6366f1' : 'transparent',
        transition: 'all 0.18s',
        boxShadow: isSelected ? '0 2px 8px rgba(99,102,241,0.4)' : 'none',
      }}>
        {isSelected && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />}
      </div>

      {/* Label */}
      <span style={{
        fontSize: '0.9rem',
        fontWeight: isSelected ? 600 : 500,
        color: isSelected ? '#4338ca' : '#374151',
        flex: 1,
        transition: 'color 0.18s',
      }}>
        {option.label}
      </span>

      {/* Check icon */}
      {isSelected && (
        <CheckCircle2 size={17} style={{ color: '#6366f1', flexShrink: 0 }} />
      )}
    </button>
  );
}

// ── Main AssessmentPage ───────────────────────────────────────────────────────
export default function AssessmentPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers]   = useState({});
  const navigate                 = useNavigate();

  const question   = assessmentQuestions[currentQ];
  const total      = assessmentQuestions.length;
  const progress   = ((currentQ + 1) / total) * 100;
  const selected   = answers[question.id];
  const answered   = Object.keys(answers).length;
  const allAnswered = answered === total;

  const handleSelect = (optionId) =>
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));

  const handleNext  = () => { if (currentQ < total - 1) setCurrentQ((q) => q + 1); };
  const handlePrev  = () => { if (currentQ > 0)         setCurrentQ((q) => q - 1); };
  const handleSubmit = () => navigate('/assessment-result');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '42rem', margin: '0 auto' }}>

      {/* ── Page Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(99,102,241,0.45)',
          flexShrink: 0,
        }}>
          <ClipboardList size={19} color="#fff" />
        </div>
        <div>
          <h1 className="s-page-title" style={{ margin: 0 }}>Career Assessment</h1>
          <p className="s-page-sub">Answer all questions to get your personalized career recommendations.</p>
        </div>
      </div>

      {/* ── Progress section ── */}
      <div className="s-card" style={{ padding: '1.25rem 1.5rem' }}>
        {/* Top row: question counter + percentage */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6b7280' }}>
            Question <span style={{ color: '#6366f1', fontWeight: 700 }}>{currentQ + 1}</span> of {total}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontSize: '0.72rem', fontWeight: 700, color: '#6366f1',
              background: 'rgba(99,102,241,0.1)', padding: '3px 10px',
              borderRadius: 99, letterSpacing: '0.03em',
            }}>
              {Math.round(progress)}% complete
            </span>
            <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
              {answered}/{total} answered
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="s-progress-track" style={{ height: 8, marginBottom: 12 }}>
          <div
            className="s-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step dot indicators */}
        <div style={{ display: 'flex', gap: 5 }}>
          {assessmentQuestions.map((q, i) => {
            const isAnswered  = !!answers[q.id];
            const isCurrent   = i === currentQ;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentQ(i)}
                title={`Question ${i + 1}`}
                style={{
                  flex: 1, height: 5, borderRadius: 99,
                  border: 'none', cursor: 'pointer', padding: 0,
                  background: isAnswered
                    ? '#6366f1'
                    : isCurrent
                      ? 'rgba(99,102,241,0.4)'
                      : 'rgba(99,102,241,0.1)',
                  transition: 'background 0.2s, transform 0.15s',
                  transform: isCurrent ? 'scaleY(1.6)' : 'scaleY(1)',
                }}
                onMouseEnter={(e) => { if (!isCurrent) e.currentTarget.style.background = 'rgba(99,102,241,0.3)'; }}
                onMouseLeave={(e) => {
                  if (!isCurrent) e.currentTarget.style.background = isAnswered ? '#6366f1' : 'rgba(99,102,241,0.1)';
                }}
              />
            );
          })}
        </div>
      </div>

      {/* ── Question Card ── */}
      <div className="s-card" style={{ padding: '2rem' }}>
        {/* Question number badge */}
        <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))',
            border: '1px solid rgba(99,102,241,0.18)',
            padding: '5px 12px', borderRadius: 99,
          }}>
            <Sparkles size={12} style={{ color: '#6366f1' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Question {currentQ + 1}
            </span>
          </div>
          {selected && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(16,185,129,0.09)', border: '1px solid rgba(16,185,129,0.2)',
              padding: '4px 10px', borderRadius: 99,
            }}>
              <CheckCircle2 size={11} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10b981' }}>Answered</span>
            </div>
          )}
        </div>

        {/* Question text */}
        <h2 style={{
          fontSize: '1.2rem', fontWeight: 700, color: '#1e1b4b',
          fontFamily: 'Syne, sans-serif', marginBottom: '1.5rem',
          lineHeight: 1.4, letterSpacing: '-0.2px',
        }}>
          {question.question}
        </h2>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {question.options.map((option) => (
            <OptionBtn
              key={option.id}
              option={option}
              selected={selected}
              onClick={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* ── Navigation ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        {/* Previous */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentQ === 0}
          className="s-btn s-btn-ghost"
          style={{
            opacity: currentQ === 0 ? 0.4 : 1,
            cursor: currentQ === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          <ChevronLeft size={17} /> Previous
        </button>

        {/* Center: answered counter */}
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#6366f1', fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>
            {answered}<span style={{ color: '#d1d5db', fontWeight: 400, fontSize: '0.9rem' }}>/{total}</span>
          </div>
          <p style={{ fontSize: '0.68rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>
            answered
          </p>
        </div>

        {/* Next / Submit */}
        {currentQ < total - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!selected}
            className="s-btn s-btn-primary"
            style={{
              opacity: !selected ? 0.45 : 1,
              cursor: !selected ? 'not-allowed' : 'pointer',
            }}
          >
            Next <ChevronRight size={17} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 22px', borderRadius: 12,
              background: allAnswered
                ? 'linear-gradient(135deg,#10b981,#059669)'
                : 'rgba(16,185,129,0.3)',
              color: '#fff', fontWeight: 700, fontSize: '0.95rem',
              border: 'none', cursor: allAnswered ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit',
              boxShadow: allAnswered ? '0 4px 16px rgba(16,185,129,0.45)' : 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (allAnswered) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(16,185,129,0.55)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = allAnswered ? '0 4px 16px rgba(16,185,129,0.45)' : 'none';
            }}
          >
            <CheckCircle2 size={17} /> Submit Assessment
          </button>
        )}
      </div>

      {/* ── Hint text ── */}
      <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#9ca3af' }}>
        {!selected
          ? 'Select an option to continue to the next question'
          : currentQ < total - 1
            ? `${total - answered} question${total - answered !== 1 ? 's' : ''} remaining`
            : allAnswered
              ? '✅ All questions answered — you\'re ready to submit!'
              : `Answer all questions before submitting`}
      </p>
    </div>
  );
}
