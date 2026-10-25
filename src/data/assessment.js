export const assessmentQuestions = [
  {
    id: 1,
    question: 'What type of work do you enjoy most?',
    options: [
      { id: 'a', label: 'Solving logical problems', value: 'logic', careers: ['backend-developer', 'data-analyst', 'data-scientist'] },
      { id: 'b', label: 'Creating visual experiences', value: 'visual', careers: ['frontend-developer', 'ui-ux-designer', 'fullstack-developer'] },
      { id: 'c', label: 'Working with data & numbers', value: 'data', careers: ['data-analyst', 'data-scientist', 'ai-ml-engineer'] },
      { id: 'd', label: 'Building software systems', value: 'systems', careers: ['fullstack-developer', 'backend-developer', 'devops-engineer'] },
      { id: 'e', label: 'Working with people & design', value: 'people', careers: ['ui-ux-designer', 'frontend-developer'] },
    ],
  },
  {
    id: 2,
    question: 'Which subject did you enjoy most in school?',
    options: [
      { id: 'a', label: 'Mathematics & Statistics', value: 'math', careers: ['data-scientist', 'ai-ml-engineer', 'data-analyst'] },
      { id: 'b', label: 'Art & Design', value: 'design', careers: ['ui-ux-designer', 'frontend-developer'] },
      { id: 'c', label: 'Computer Science', value: 'cs', careers: ['fullstack-developer', 'backend-developer', 'devops-engineer'] },
      { id: 'd', label: 'Physics & Engineering', value: 'physics', careers: ['cloud-engineer', 'devops-engineer', 'cybersecurity-analyst'] },
      { id: 'e', label: 'Business & Economics', value: 'business', careers: ['data-analyst', 'ui-ux-designer'] },
    ],
  },
  {
    id: 3,
    question: 'How do you prefer to work?',
    options: [
      { id: 'a', label: 'Independently, deep-focused work', value: 'independent', careers: ['data-scientist', 'ai-ml-engineer', 'backend-developer'] },
      { id: 'b', label: 'Collaboratively with designers & PMs', value: 'collaborative', careers: ['frontend-developer', 'ui-ux-designer', 'fullstack-developer'] },
      { id: 'c', label: 'Cross-functional teams', value: 'cross', careers: ['devops-engineer', 'cloud-engineer', 'fullstack-developer'] },
      { id: 'd', label: 'Problem-solving with data', value: 'data', careers: ['data-analyst', 'data-scientist', 'cybersecurity-analyst'] },
      { id: 'e', label: 'Building & shipping fast', value: 'ship', careers: ['fullstack-developer', 'backend-developer', 'devops-engineer'] },
    ],
  },
  {
    id: 4,
    question: 'What is your current programming experience?',
    options: [
      { id: 'a', label: 'No experience yet', value: 'none', careers: ['frontend-developer', 'ui-ux-designer'] },
      { id: 'b', label: 'Basic HTML/CSS', value: 'basic', careers: ['frontend-developer', 'ui-ux-designer', 'fullstack-developer'] },
      { id: 'c', label: 'JavaScript or Python', value: 'intermediate', careers: ['frontend-developer', 'data-analyst', 'fullstack-developer'] },
      { id: 'd', label: 'Multiple languages', value: 'advanced', careers: ['backend-developer', 'fullstack-developer', 'ai-ml-engineer'] },
      { id: 'e', label: 'Professional experience', value: 'professional', careers: ['data-scientist', 'devops-engineer', 'cloud-engineer'] },
    ],
  },
  {
    id: 5,
    question: 'What kind of projects excite you most?',
    options: [
      { id: 'a', label: 'Building apps users can see & use', value: 'apps', careers: ['frontend-developer', 'fullstack-developer', 'ui-ux-designer'] },
      { id: 'b', label: 'Analyzing trends & patterns', value: 'analysis', careers: ['data-analyst', 'data-scientist'] },
      { id: 'c', label: 'AI & machine learning systems', value: 'ai', careers: ['ai-ml-engineer', 'data-scientist'] },
      { id: 'd', label: 'Securing & protecting systems', value: 'security', careers: ['cybersecurity-analyst', 'cloud-engineer'] },
      { id: 'e', label: 'Infrastructure & cloud systems', value: 'infra', careers: ['devops-engineer', 'cloud-engineer', 'backend-developer'] },
    ],
  },
  {
    id: 6,
    question: 'What is your primary career goal?',
    options: [
      { id: 'a', label: 'Get hired as a developer quickly', value: 'quick', careers: ['frontend-developer', 'fullstack-developer', 'backend-developer'] },
      { id: 'b', label: 'Work at a top tech company', value: 'faang', careers: ['data-scientist', 'ai-ml-engineer', 'backend-developer'] },
      { id: 'c', label: 'Start my own startup', value: 'startup', careers: ['fullstack-developer', 'ui-ux-designer', 'frontend-developer'] },
      { id: 'd', label: 'Freelance & work remotely', value: 'freelance', careers: ['frontend-developer', 'ui-ux-designer', 'fullstack-developer'] },
      { id: 'e', label: 'Specialize in a niche area', value: 'niche', careers: ['data-scientist', 'cybersecurity-analyst', 'ai-ml-engineer'] },
    ],
  },
];

export const assessmentResults = [
  { career: 'Frontend Developer', careerId: 'frontend-developer', match: 87, color: '#6366f1' },
  { career: 'Full Stack Developer', careerId: 'fullstack-developer', match: 82, color: '#3b82f6' },
  { career: 'Data Analyst', careerId: 'data-analyst', match: 67, color: '#f59e0b' },
  { career: 'UI/UX Designer', careerId: 'ui-ux-designer', match: 63, color: '#f97316' },
  { career: 'Backend Developer', careerId: 'backend-developer', match: 55, color: '#10b981' },
];

export const strengths = ['Problem solving', 'Web development', 'Logical thinking', 'Attention to detail', 'Creative design'];
export const improvements = ['React & component architecture', 'Backend development', 'REST API design', 'Database design'];
