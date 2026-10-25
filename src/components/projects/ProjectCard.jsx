import { Clock, BarChart2 } from 'lucide-react';
import Badge from '../common/Badge.jsx';
import Button from '../common/Button.jsx';

const difficultyVariant = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' };

export default function ProjectCard({ project, onStart }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
          {project.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug">{project.title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{project.category}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.skills.map((skill) => (
          <span key={skill} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-md font-medium">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <BarChart2 size={12} />
          <Badge variant={difficultyVariant[project.difficulty] || 'gray'}>{project.difficulty}</Badge>
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} /> {project.estimatedTime}
        </span>
      </div>

      <div className="pt-1 border-t border-gray-50">
        <Button
          variant="primary"
          size="sm"
          className="w-full justify-center"
          onClick={() => onStart && onStart(project)}
        >
          Start Project
        </Button>
      </div>
    </div>
  );
}
