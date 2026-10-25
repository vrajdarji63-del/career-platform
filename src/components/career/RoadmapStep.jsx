import { CheckCircle2, Circle, Clock } from 'lucide-react';
import ProgressBar from '../common/ProgressBar.jsx';

const statusConfig = {
  completed: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500', label: 'Completed', barColor: 'emerald' },
  'in-progress': { icon: Clock, color: 'text-indigo-500', bg: 'bg-indigo-500', label: 'In Progress', barColor: 'indigo' },
  'not-started': { icon: Circle, color: 'text-gray-300', bg: 'bg-gray-200', label: 'Not Started', barColor: 'gray' },
};

export default function RoadmapStep({ step, isLast = false }) {
  const config = statusConfig[step.status] || statusConfig['not-started'];
  const Icon = config.icon;

  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${step.status === 'not-started' ? 'bg-gray-100' : step.status === 'completed' ? 'bg-emerald-50' : 'bg-indigo-50'}`}>
          <Icon size={18} className={config.color} />
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 mt-1 mb-1 ${step.status === 'completed' ? 'bg-emerald-300' : 'bg-gray-200'}`} style={{ minHeight: '2rem' }} />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-6 ${isLast ? '' : ''}`}>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{step.description}</p>
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
              step.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
              step.status === 'in-progress' ? 'bg-indigo-100 text-indigo-700' :
              'bg-gray-100 text-gray-500'
            }`}>
              {config.label}
            </span>
          </div>

          {step.status !== 'not-started' && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{step.progress}%</span>
              </div>
              <ProgressBar value={step.progress} color={config.barColor} size="sm" />
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mb-3">
            {step.skills.map((skill) => (
              <span key={skill} className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded border border-gray-100">
                {skill}
              </span>
            ))}
          </div>

          <p className="text-xs text-gray-400">
            ⏱ Estimated: {step.estimatedTime}
          </p>
        </div>
      </div>
    </div>
  );
}
