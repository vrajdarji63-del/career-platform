export const adminStats = {
  totalStudents: 1248,
  activeStudents: 984,
  careerAssessments: 2846,
  completedAssessments: 2154,
  projects: 86,
  careerPaths: 24,
};

export const adminStudents = [
  { id: 1, name: 'Aarav Patel', email: 'aarav@example.com', careerGoal: 'Frontend Developer', skillScore: 78, assessment: 'Completed', status: 'active', avatar: null, joined: '2026-01-15' },
  { id: 2, name: 'Priya Sharma', email: 'priya@example.com', careerGoal: 'Data Scientist', skillScore: 85, assessment: 'Completed', status: 'active', avatar: null, joined: '2026-02-03' },
  { id: 3, name: 'Rohan Mehta', email: 'rohan@example.com', careerGoal: 'Full Stack Developer', skillScore: 62, assessment: 'In Progress', status: 'active', avatar: null, joined: '2026-02-18' },
  { id: 4, name: 'Ananya Singh', email: 'ananya@example.com', careerGoal: 'UI/UX Designer', skillScore: 71, assessment: 'Completed', status: 'inactive', avatar: null, joined: '2026-03-05' },
  { id: 5, name: 'Vikram Nair', email: 'vikram@example.com', careerGoal: 'Backend Developer', skillScore: 58, assessment: 'Not Started', status: 'active', avatar: null, joined: '2026-03-12' },
  { id: 6, name: 'Sneha Joshi', email: 'sneha@example.com', careerGoal: 'Data Analyst', skillScore: 82, assessment: 'Completed', status: 'active', avatar: null, joined: '2026-03-28' },
  { id: 7, name: 'Arjun Kumar', email: 'arjun@example.com', careerGoal: 'DevOps Engineer', skillScore: 67, assessment: 'Completed', status: 'active', avatar: null, joined: '2026-04-10' },
  { id: 8, name: 'Meera Reddy', email: 'meera@example.com', careerGoal: 'AI/ML Engineer', skillScore: 91, assessment: 'Completed', status: 'active', avatar: null, joined: '2026-04-22' },
  { id: 9, name: 'Dev Patel', email: 'dev@example.com', careerGoal: 'Frontend Developer', skillScore: 54, assessment: 'In Progress', status: 'inactive', avatar: null, joined: '2026-05-08' },
  { id: 10, name: 'Kavya Iyer', email: 'kavya@example.com', careerGoal: 'Cloud Engineer', skillScore: 73, assessment: 'Completed', status: 'active', avatar: null, joined: '2026-05-20' },
];

export const studentGrowthData = [
  { month: 'Jan', students: 120 },
  { month: 'Feb', students: 245 },
  { month: 'Mar', students: 412 },
  { month: 'Apr', students: 589 },
  { month: 'May', students: 734 },
  { month: 'Jun', students: 856 },
  { month: 'Jul', students: 1012 },
  { month: 'Aug', students: 1248 },
];

export const careerInterestData = [
  { name: 'Frontend Dev', value: 287, fill: '#6366f1' },
  { name: 'Full Stack', value: 234, fill: '#3b82f6' },
  { name: 'Data Science', value: 189, fill: '#f59e0b' },
  { name: 'AI/ML', value: 156, fill: '#8b5cf6' },
  { name: 'Backend Dev', value: 143, fill: '#10b981' },
  { name: 'UI/UX Design', value: 128, fill: '#f97316' },
  { name: 'DevOps', value: 98, fill: '#84cc16' },
  { name: 'Other', value: 13, fill: '#94a3b8' },
];

export const skillDemandData = [
  { skill: 'React', demand: 89 },
  { skill: 'Python', demand: 84 },
  { skill: 'JavaScript', demand: 82 },
  { skill: 'Node.js', demand: 76 },
  { skill: 'SQL', demand: 71 },
  { skill: 'TypeScript', demand: 68 },
  { skill: 'Docker', demand: 61 },
  { skill: 'AWS', demand: 58 },
];

export const assessmentCompletionData = [
  { month: 'Mar', completed: 156, attempted: 210 },
  { month: 'Apr', completed: 289, attempted: 358 },
  { month: 'May', completed: 412, attempted: 498 },
  { month: 'Jun', completed: 534, attempted: 621 },
  { month: 'Jul', completed: 678, attempted: 754 },
  { month: 'Aug', completed: 2154, attempted: 2846 },
];

export const adminAssessments = [
  { id: 1, title: 'JavaScript Fundamentals', questions: 25, attempts: 847, completionRate: 82, status: 'active' },
  { id: 2, title: 'HTML & CSS Basics', questions: 20, attempts: 1023, completionRate: 91, status: 'active' },
  { id: 3, title: 'React Framework', questions: 30, attempts: 634, completionRate: 74, status: 'active' },
  { id: 4, title: 'Python Basics', questions: 22, attempts: 712, completionRate: 79, status: 'active' },
  { id: 5, title: 'SQL & Databases', questions: 18, attempts: 423, completionRate: 68, status: 'active' },
  { id: 6, title: 'Node.js Fundamentals', questions: 28, attempts: 356, completionRate: 65, status: 'draft' },
  { id: 7, title: 'Data Science Basics', questions: 35, attempts: 289, completionRate: 71, status: 'active' },
];
