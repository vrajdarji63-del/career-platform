import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { careers } from '../../data/careers.js';
import { studentData } from '../../data/student.js';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import ProgressBar from '../../components/common/ProgressBar.jsx';

const difficultyVariant = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' };

export default function CareerDetailPage() {
  const { id } = useParams();
  const career = careers.find((c) => c.id === id);

  if (!career) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 mb-4">Career not found.</p>
        <Link to="/assessment-result"><Button>← Back to Recommendations</Button></Link>
      </div>
    );
  }

  const studentSkillMap = Object.fromEntries(studentData.skills.map((s) => [s.name, s.proficiency]));

  return (
    <div className="max-w-4xl space-y-6">
      <Link to="/assessment-result" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800">
        <ArrowLeft size={16} /> Back to Recommendations
      </Link>

      {/* Header */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ backgroundColor: `${career.color}20` }}
          >
            {career.icon}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{career.title}</h1>
              <Badge variant={difficultyVariant[career.difficulty]}>{career.difficulty}</Badge>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">{career.description_long}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-gray-600">
                <DollarSign size={14} className="text-emerald-500" /> {career.avgSalary}
              </span>
              <span className="flex items-center gap-1.5 text-gray-600">
                <TrendingUp size={14} className="text-blue-500" /> {career.jobGrowth} job growth
              </span>
              <span className="text-gray-500">{career.category}</span>
            </div>
          </div>
          <div className="flex-shrink-0 text-center">
            <div className="text-4xl font-extrabold text-emerald-600">{career.matchPercentage}%</div>
            <p className="text-xs text-gray-400">Your Match</p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Required Skills vs Your Skills */}
        <Card>
          <h2 className="font-semibold text-gray-900 mb-5">Skills Comparison</h2>
          <div className="space-y-4">
            {career.requiredSkills.map((skill) => {
              const yourLevel = studentSkillMap[skill] || 0;
              const isGap = yourLevel < 70;
              return (
                <div key={skill}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">{skill}</span>
                    <div className="flex items-center gap-2">
                      {isGap && yourLevel > 0 && <AlertCircle size={13} className="text-amber-500" />}
                      <span className={`text-xs ${isGap ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {yourLevel > 0 ? `${yourLevel}%` : 'Not Started'}
                      </span>
                    </div>
                  </div>
                  <ProgressBar
                    value={yourLevel}
                    color={yourLevel >= 70 ? 'emerald' : yourLevel >= 40 ? 'amber' : 'red'}
                    size="sm"
                  />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Career Roadmap */}
        <Card>
          <h2 className="font-semibold text-gray-900 mb-5">Learning Roadmap</h2>
          <div className="space-y-2">
            {career.roadmap.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm text-gray-700">{step}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-50">
            <Link to="/roadmap">
              <Button variant="outline" size="sm" className="w-full justify-center">View Full Roadmap</Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Recommended Projects */}
      <Card>
        <h2 className="font-semibold text-gray-900 mb-4">Recommended Projects</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {career.projects.map((project) => (
            <div key={project} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-sm">📁</div>
              <span className="text-sm font-medium text-gray-800">{project}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Link to="/roadmap"><Button size="lg">Start This Roadmap</Button></Link>
        <Link to="/assessment"><Button variant="secondary" size="lg">Retake Assessment</Button></Link>
        <Link to="/skill-gap"><Button variant="secondary" size="lg">View Skill Gap</Button></Link>
      </div>
    </div>
  );
}
