export const skills = [
  { id: 1, name: 'HTML', category: 'Frontend', difficulty: 'Beginner', proficiency: 90, status: 'strong', studentsLearning: 892, color: '#f97316', icon: '🌐' },
  { id: 2, name: 'CSS', category: 'Frontend', difficulty: 'Beginner', proficiency: 80, status: 'strong', studentsLearning: 845, color: '#3b82f6', icon: '🎨' },
  { id: 3, name: 'JavaScript', category: 'Frontend', difficulty: 'Intermediate', proficiency: 70, status: 'medium', studentsLearning: 967, color: '#f59e0b', icon: '⚡' },
  { id: 4, name: 'React', category: 'Frontend', difficulty: 'Intermediate', proficiency: 45, status: 'high-priority', studentsLearning: 743, color: '#06b6d4', icon: '⚛️' },
  { id: 5, name: 'TypeScript', category: 'Frontend', difficulty: 'Intermediate', proficiency: 35, status: 'medium', studentsLearning: 521, color: '#3b82f6', icon: '📘' },
  { id: 6, name: 'Node.js', category: 'Backend', difficulty: 'Intermediate', proficiency: 25, status: 'high-priority', studentsLearning: 634, color: '#10b981', icon: '🟢' },
  { id: 7, name: 'Python', category: 'Backend', difficulty: 'Intermediate', proficiency: 40, status: 'medium', studentsLearning: 812, color: '#8b5cf6', icon: '🐍' },
  { id: 8, name: 'SQL', category: 'Database', difficulty: 'Intermediate', proficiency: 55, status: 'medium', studentsLearning: 678, color: '#ec4899', icon: '🗄️' },
  { id: 9, name: 'Git', category: 'Tools', difficulty: 'Beginner', proficiency: 75, status: 'strong', studentsLearning: 891, color: '#ef4444', icon: '🔀' },
  { id: 10, name: 'REST APIs', category: 'Backend', difficulty: 'Intermediate', proficiency: 30, status: 'high-priority', studentsLearning: 598, color: '#84cc16', icon: '🔌' },
  { id: 11, name: 'PostgreSQL', category: 'Database', difficulty: 'Intermediate', proficiency: 20, status: 'medium', studentsLearning: 412, color: '#6366f1', icon: '🐘' },
  { id: 12, name: 'Docker', category: 'DevOps', difficulty: 'Advanced', proficiency: 15, status: 'not-started', studentsLearning: 356, color: '#06b6d4', icon: '🐳' },
  { id: 13, name: 'AWS', category: 'Cloud', difficulty: 'Advanced', proficiency: 10, status: 'not-started', studentsLearning: 287, color: '#f59e0b', icon: '☁️' },
  { id: 14, name: 'Tailwind CSS', category: 'Frontend', difficulty: 'Beginner', proficiency: 65, status: 'medium', studentsLearning: 567, color: '#06b6d4', icon: '💨' },
  { id: 15, name: 'Next.js', category: 'Frontend', difficulty: 'Intermediate', proficiency: 20, status: 'not-started', studentsLearning: 432, color: '#0f172a', icon: '▲' },
];

export const skillCategories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Cloud', 'Tools'];

export const skillGapData = {
  overall: 61,
  highPriority: [
    { name: 'React', current: 45, required: 90, gap: 45 },
    { name: 'Node.js', current: 25, required: 80, gap: 55 },
    { name: 'REST APIs', current: 30, required: 85, gap: 55 },
  ],
  medium: [
    { name: 'TypeScript', current: 35, required: 70, gap: 35 },
    { name: 'PostgreSQL', current: 20, required: 65, gap: 45 },
    { name: 'SQL', current: 55, required: 80, gap: 25 },
  ],
  strong: [
    { name: 'HTML', current: 90, required: 85, gap: -5 },
    { name: 'CSS', current: 80, required: 75, gap: -5 },
    { name: 'Git', current: 75, required: 70, gap: -5 },
    { name: 'JavaScript', current: 70, required: 85, gap: 15 },
  ],
};
