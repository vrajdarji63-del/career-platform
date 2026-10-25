import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Clock, BarChart2, CheckCircle2, Circle,
  BookOpen, Lightbulb, Target, ExternalLink, Play,
  ChevronDown, ChevronUp, Sparkles, Trophy, GitBranch,
  Code2, Package, Rocket, Globe, Star
} from 'lucide-react';

// ─── Rich project data keyed by id ────────────────────────────────────────────
const PROJECT_DATA = {
  1: {
    id: 1, title: 'Personal Portfolio Website', icon: '💼',
    category: 'Web Development', difficulty: 'Beginner', time: '8–12 h',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    careers: ['Frontend Developer', 'UI/UX Designer'],
    tagline: 'Your first impression to every recruiter — make it count.',
    overview: `A personal portfolio is the single most important project you can build as a frontend developer. It serves as your live resume, showcasing your work, your style, and your technical abilities to recruiters and hiring managers. This project will teach you page structure, responsive design, and deployment — foundational skills used in every professional role.`,
    whatYoullLearn: [
      'Structuring semantic HTML pages from scratch',
      'Building fully responsive layouts with CSS Flexbox & Grid',
      'Animating elements with CSS transitions and keyframes',
      'Adding interactivity with vanilla JavaScript',
      'Deploying a live website using Netlify or GitHub Pages',
    ],
    steps: [
      { title: 'Plan your sections', desc: 'Decide what sections you need: Hero, About, Skills, Projects, Contact. Sketch a rough wireframe on paper or in Figma before writing code.', icon: Target },
      { title: 'Set up your HTML structure', desc: 'Create index.html with semantic HTML5 tags (<header>, <main>, <section>, <footer>). Build each section\'s skeleton first.', icon: Code2 },
      { title: 'Style with CSS (Mobile First)', desc: 'Start with mobile styles, then use media queries for desktop. Use CSS custom properties for your color theme.', icon: Package },
      { title: 'Add JavaScript interactions', desc: 'Implement smooth scroll, a dark mode toggle, a mobile hamburger menu, and scroll-triggered animations.', icon: Sparkles },
      { title: 'Add your real content', desc: 'Write your bio, list your skills, add project screenshots, and include real contact links. Avoid placeholder text.', icon: BookOpen },
      { title: 'Deploy live', desc: 'Push to GitHub and connect to Netlify. Share the live URL in your resume and LinkedIn. A live URL is 10× better than a repo link.', icon: Rocket },
    ],
    resources: [
      { label: 'MDN: HTML Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', type: 'docs' },
      { label: 'CSS Tricks: Flexbox Guide', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', type: 'docs' },
      { label: 'Kevin Powell: Responsive CSS', url: 'https://www.youtube.com/@KevinPowell', type: 'video' },
      { label: 'Netlify Deploy Guide', url: 'https://docs.netlify.com/get-started/', type: 'docs' },
      { label: 'Inspiration: Brittany Chiang', url: 'https://brittanychiang.com/', type: 'inspiration' },
    ],
    tips: [
      'Keep it simple — a clean minimal design beats a cluttered fancy one.',
      'Use real projects in your portfolio, not tutorial clones.',
      'Make sure it\'s mobile-responsive. Recruiters view on phones too.',
      'Include your GitHub, LinkedIn and email prominently.',
      'Use Google Fonts for professional typography.',
    ],
    deliverables: ['Live URL (Netlify / GitHub Pages)', 'Clean GitHub repository', 'Fully responsive on mobile'],
    starterCode: `<!-- index.html skeleton -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Name | Developer</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header><!-- Navigation --></header>
  <main>
    <section id="hero"><!-- Hero --></section>
    <section id="about"><!-- About --></section>
    <section id="projects"><!-- Projects --></section>
    <section id="contact"><!-- Contact --></section>
  </main>
  <footer><!-- Footer --></footer>
  <script src="script.js"></script>
</body>
</html>`,
  },
  2: {
    id: 2, title: 'React To-Do App', icon: '✅',
    category: 'Web Development', difficulty: 'Beginner', time: '5–8 h',
    skills: ['React', 'JavaScript', 'CSS'],
    careers: ['Frontend Developer', 'Full Stack Developer'],
    tagline: 'Master React fundamentals by building a fully functional task manager.',
    overview: `The To-Do app is the perfect first React project because it touches every core concept: components, state, props, events, and effects. More importantly, when you add persistence (localStorage), filtering, and priority levels, it becomes a genuinely useful app — and a strong portfolio piece that shows you understand React's data flow.`,
    whatYoullLearn: [
      'React component composition and the component tree',
      'useState and useEffect hooks in real-world usage',
      'Lifting state up and passing props between components',
      'Persisting state with localStorage',
      'Filtering and sorting lists with array methods',
    ],
    steps: [
      { title: 'Set up with Vite', desc: 'Run `npm create vite@latest todo-app -- --template react` and install dependencies. Clean up the default boilerplate.', icon: Package },
      { title: 'Build the AddTask component', desc: 'Create a controlled input form with useState. Handle form submission to add new tasks to an array state in the parent.', icon: Code2 },
      { title: 'Render the task list', desc: 'Map over the tasks array and render a TaskItem component for each. Handle delete and toggle-complete actions.', icon: Target },
      { title: 'Add filtering tabs', desc: 'Add "All / Active / Completed" filter buttons. Derive the filtered list from the full list without duplicating state.', icon: Sparkles },
      { title: 'Persist with localStorage', desc: 'Use useEffect to save tasks to localStorage on every change, and load them on mount. Wrap with JSON.parse/stringify.', icon: BookOpen },
      { title: 'Polish the UI', desc: 'Add smooth transitions, a task counter, keyboard shortcuts (Enter to add), and an empty state message.', icon: Rocket },
    ],
    resources: [
      { label: 'React Docs: Thinking in React', url: 'https://react.dev/learn/thinking-in-react', type: 'docs' },
      { label: 'Vite Getting Started', url: 'https://vitejs.dev/guide/', type: 'docs' },
      { label: 'Scrimba: Learn React', url: 'https://scrimba.com/learn/learnreact', type: 'course' },
      { label: 'React useState Hook', url: 'https://react.dev/reference/react/useState', type: 'docs' },
    ],
    tips: [
      'Start with one big component, then break it into smaller pieces.',
      'Never mutate state directly — always use the setter function.',
      'Use unique IDs for tasks (crypto.randomUUID() or Date.now()).',
      'Add optimistic UI updates before the localStorage write.',
    ],
    deliverables: ['Live demo on Netlify', 'GitHub repo with clear README', 'localStorage persistence working'],
    starterCode: `// App.jsx — starter structure
import { useState, useEffect } from 'react';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks(prev => [...prev, {
      id: crypto.randomUUID(), text, done: false
    }]);
  };

  const toggleTask = (id) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const deleteTask = (id) =>
    setTasks(prev => prev.filter(t => t.id !== id));

  return (
    <div>
      {/* Add TaskForm, TaskList here */}
    </div>
  );
}`,
  },
  3: {
    id: 3, title: 'Weather Dashboard', icon: '🌤️',
    category: 'Web Development', difficulty: 'Beginner', time: '6–10 h',
    skills: ['JavaScript', 'API', 'CSS'],
    careers: ['Frontend Developer', 'Full Stack Developer'],
    tagline: 'Learn to work with real-world APIs and display live data beautifully.',
    overview: `Fetching and displaying API data is one of the most essential skills in modern web development. This project teaches you async JavaScript, REST API consumption, error handling, and data-driven UI — all while building something visual and impressive. The OpenWeatherMap API is free and well-documented, making it perfect for this project.`,
    whatYoullLearn: [
      'Async/await and the Fetch API',
      'Consuming REST APIs with query parameters and API keys',
      'Handling loading, error, and success states in the UI',
      'Displaying dynamic data in a structured layout',
      'Storing user preferences (last searched city) in localStorage',
    ],
    steps: [
      { title: 'Get your free API key', desc: 'Sign up at openweathermap.org and get your free API key. Read the "Current Weather Data" API docs to understand the response shape.', icon: Target },
      { title: 'Build the search form', desc: 'Create an input + button. On submit, call the API with the city name. Show a spinner while loading.', icon: Code2 },
      { title: 'Fetch and display weather', desc: 'Parse the API response and display: city name, temperature (°C/°F toggle), weather condition, humidity, and wind speed.', icon: Package },
      { title: 'Add a 5-day forecast', desc: 'Use the /forecast endpoint to show the next 5 days. Group results by day and display min/max temperatures.', icon: Sparkles },
      { title: 'Handle errors gracefully', desc: 'Show user-friendly messages for "city not found", network errors, or empty searches. Never show raw error objects.', icon: BookOpen },
      { title: 'Polish with icons & CSS', desc: 'Use weather icons (openweathermap icons or a library). Add gradient backgrounds that match weather conditions.', icon: Rocket },
    ],
    resources: [
      { label: 'OpenWeatherMap API Docs', url: 'https://openweathermap.org/api', type: 'docs' },
      { label: 'MDN: Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API', type: 'docs' },
      { label: 'JavaScript Promises & Async/Await', url: 'https://javascript.info/async-await', type: 'docs' },
    ],
    tips: [
      'Never expose your API key in public repos — use environment variables.',
      'Debounce the search input if you fetch on every keystroke.',
      'Always show a loading state before the data arrives.',
      'Add geolocation API support to auto-detect the user\'s city.',
    ],
    deliverables: ['Live working app with real weather data', 'GitHub repo', 'Mobile responsive layout'],
    starterCode: `const API_KEY = import.meta.env.VITE_WEATHER_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function getWeather(city) {
  const res = await fetch(
    \`\${BASE_URL}/weather?q=\${city}&appid=\${API_KEY}&units=metric\`
  );
  if (!res.ok) throw new Error('City not found');
  return res.json();
}

async function getForecast(city) {
  const res = await fetch(
    \`\${BASE_URL}/forecast?q=\${city}&appid=\${API_KEY}&units=metric\`
  );
  return res.json();
}`,
  },
  4: {
    id: 4, title: 'REST API with Node.js', icon: '🔌',
    category: 'Backend', difficulty: 'Intermediate', time: '12–16 h',
    skills: ['Node.js', 'MongoDB', 'REST', 'JWT'],
    careers: ['Backend Developer', 'Full Stack Developer'],
    tagline: 'Build a production-style API with auth, database, and full CRUD.',
    overview: `This project teaches you how real backends are built. You'll create a RESTful API with Express, connect to a MongoDB database, implement JWT-based authentication, and follow REST conventions used at every tech company. This is the backbone skill for every backend and full-stack developer role.`,
    whatYoullLearn: [
      'Setting up an Express.js server from scratch',
      'Designing a MongoDB schema with Mongoose',
      'Implementing register/login with JWT tokens',
      'Building CRUD routes with proper HTTP methods',
      'Middleware: auth guards, validation, error handling',
      'Using environment variables and dotenv',
    ],
    steps: [
      { title: 'Initialize the project', desc: 'Create a Node.js project, install express, mongoose, jsonwebtoken, bcryptjs, dotenv, cors. Set up folder structure: routes/, models/, middleware/, controllers/.', icon: Package },
      { title: 'Connect to MongoDB', desc: 'Use MongoDB Atlas (free tier). Set up Mongoose, create your first schema (e.g., User model with name, email, hashed password).', icon: Target },
      { title: 'Build auth routes', desc: 'POST /auth/register — hash password with bcrypt, save user. POST /auth/login — verify password, return JWT. GET /auth/me — protected route returning the current user.', icon: Code2 },
      { title: 'Create a resource CRUD', desc: 'Choose a resource (e.g., Posts, Tasks). Build: GET /posts, POST /posts, PUT /posts/:id, DELETE /posts/:id. Apply auth middleware to protected routes.', icon: Sparkles },
      { title: 'Add validation & error handling', desc: 'Validate request bodies with express-validator or Zod. Create a global error handler middleware. Always return consistent JSON error shapes.', icon: BookOpen },
      { title: 'Test with Postman and document', desc: 'Use Postman to test every endpoint. Write a README with endpoint documentation and sample request/response bodies.', icon: Rocket },
    ],
    resources: [
      { label: 'Express.js Official Docs', url: 'https://expressjs.com/', type: 'docs' },
      { label: 'Mongoose Docs', url: 'https://mongoosejs.com/docs/', type: 'docs' },
      { label: 'JWT Introduction', url: 'https://jwt.io/introduction', type: 'docs' },
      { label: 'MongoDB Atlas Free Tier', url: 'https://www.mongodb.com/atlas', type: 'tool' },
      { label: 'Postman (API Testing)', url: 'https://www.postman.com/', type: 'tool' },
    ],
    tips: [
      'Never store plain text passwords — always hash with bcrypt.',
      'Keep your JWT secret in .env and add .env to .gitignore.',
      'Use HTTP status codes correctly: 200, 201, 400, 401, 404, 500.',
      'Separate route handlers into controller functions for clean code.',
    ],
    deliverables: ['Deployed API on Render or Railway', 'Postman collection exported', 'GitHub repo with README'],
    starterCode: `// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log('Server running'));`,
  },
  9: {
    id: 9, title: 'ML Sentiment Classifier', icon: '🤖',
    category: 'AI/ML', difficulty: 'Advanced', time: '20–25 h',
    skills: ['Python', 'scikit-learn', 'NLP'],
    careers: ['AI/ML Engineer', 'Data Scientist'],
    tagline: 'Train a real NLP model on product reviews and deploy it as an API.',
    overview: `This project takes you through the complete machine learning lifecycle: data cleaning, feature engineering, model training, evaluation, and deployment. Using real-world text data, you'll build a classifier that can predict sentiment (positive/negative/neutral) from product reviews — a skill used extensively in industry.`,
    whatYoullLearn: [
      'Text preprocessing: tokenization, stopword removal, stemming',
      'Feature extraction: TF-IDF and Bag of Words',
      'Training and evaluating Naive Bayes and Logistic Regression models',
      'Model selection using cross-validation and confusion matrices',
      'Saving models with joblib and serving them via Flask/FastAPI',
    ],
    steps: [
      { title: 'Get your dataset', desc: 'Download the Amazon Product Reviews or IMDB dataset from Kaggle. Load with Pandas, explore class distribution, check for nulls.', icon: Target },
      { title: 'Clean and preprocess text', desc: 'Lowercase, remove punctuation/URLs/numbers, remove stopwords (NLTK), apply stemming or lemmatization (spaCy).', icon: Code2 },
      { title: 'Feature engineering', desc: 'Use TfidfVectorizer from scikit-learn. Experiment with different n-gram ranges (unigrams, bigrams). Split into train/test sets.', icon: Package },
      { title: 'Train and compare models', desc: 'Train MultinomialNB, LogisticRegression, and LinearSVC. Compare accuracy, F1-score, and confusion matrices using classification_report.', icon: Sparkles },
      { title: 'Build a prediction pipeline', desc: 'Create a sklearn Pipeline combining TfidfVectorizer + best model. Save with joblib. Test on custom sentences.', icon: BookOpen },
      { title: 'Deploy as an API', desc: 'Build a FastAPI endpoint that accepts text and returns sentiment + confidence score. Deploy to Render or HuggingFace Spaces.', icon: Rocket },
    ],
    resources: [
      { label: 'scikit-learn: Text Feature Extraction', url: 'https://scikit-learn.org/stable/modules/feature_extraction.html', type: 'docs' },
      { label: 'Kaggle: Amazon Reviews Dataset', url: 'https://www.kaggle.com/datasets/bittlingmayer/amazonreviews', type: 'dataset' },
      { label: 'NLTK Book (free)', url: 'https://www.nltk.org/book/', type: 'docs' },
      { label: 'FastAPI Docs', url: 'https://fastapi.tiangolo.com/', type: 'docs' },
      { label: 'HuggingFace Spaces (free deploy)', url: 'https://huggingface.co/spaces', type: 'tool' },
    ],
    tips: [
      'Always check class balance before training — imbalanced data leads to misleading accuracy.',
      'Use Pipeline to prevent data leakage from training set into test set.',
      'F1-score is more meaningful than accuracy for imbalanced classes.',
      'Start simple (Naive Bayes) before jumping to complex models.',
    ],
    deliverables: ['Trained model saved as .pkl', 'Jupyter notebook with EDA & training', 'Live API endpoint', 'GitHub repo'],
    starterCode: `import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

df = pd.read_csv('reviews.csv')
X, y = df['text'], df['label']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(ngram_range=(1, 2), max_features=50000)),
    ('clf', LogisticRegression(max_iter=500)),
])

pipeline.fit(X_train, y_train)
print(classification_report(y_test, pipeline.predict(X_test)))
joblib.dump(pipeline, 'sentiment_model.pkl')`,
  },
  10: {
    id: 10, title: 'Full-Stack Blog Platform', icon: '📝',
    category: 'Full Stack', difficulty: 'Advanced', time: '25–35 h',
    skills: ['React', 'Node.js', 'PostgreSQL'],
    careers: ['Full Stack Developer', 'Backend Developer'],
    tagline: 'Build a production-grade blog from database schema to deployed live app.',
    overview: `This is your capstone full-stack project. You'll architect a complete blog platform with user authentication, post creation/editing, categories, comments, and a rich text editor. Every part of the stack is real: a React frontend, an Express API, and a PostgreSQL database with proper relational schema design.`,
    whatYoullLearn: [
      'Relational database design with PostgreSQL and foreign keys',
      'Writing raw SQL queries and using an ORM (Prisma)',
      'Building a React frontend that consumes a REST API',
      'Implementing JWT auth with protected routes on both frontend and backend',
      'File uploads (author avatar, post cover image)',
      'Deploying frontend + backend to separate hosting services',
    ],
    steps: [
      { title: 'Design the database schema', desc: 'Design tables: users, posts (title, body, slug, cover_url, author_id), categories, comments. Draw an ER diagram first.', icon: Target },
      { title: 'Set up backend with Prisma', desc: 'Initialize Prisma, define schema.prisma, run migrations. Set up Express routes for auth and CRUD posts/comments.', icon: Code2 },
      { title: 'Build auth system', desc: 'Register/login with bcrypt + JWT. Protect post creation/editing to authenticated authors only. Add refresh token logic.', icon: Package },
      { title: 'Build React frontend', desc: 'Create pages: Home (post list), Post Detail, Write Post (rich text editor), Profile. Use React Query or SWR for data fetching.', icon: Sparkles },
      { title: 'Add rich text editor', desc: 'Integrate TipTap or Quill editor for post content. Support headings, bold, code blocks, and image embedding.', icon: BookOpen },
      { title: 'Deploy full stack', desc: 'Deploy backend to Render, database to Supabase (free PostgreSQL), frontend to Vercel. Configure CORS and environment variables correctly.', icon: Rocket },
    ],
    resources: [
      { label: 'Prisma Docs', url: 'https://www.prisma.io/docs', type: 'docs' },
      { label: 'Supabase (free PostgreSQL)', url: 'https://supabase.com/', type: 'tool' },
      { label: 'TipTap Editor', url: 'https://tiptap.dev/', type: 'tool' },
      { label: 'React Query Docs', url: 'https://tanstack.com/query/latest', type: 'docs' },
    ],
    tips: [
      'Design your database schema before writing a single line of code.',
      'Use slugs (not numeric IDs) for post URLs for better SEO.',
      'Store images on Cloudinary or Supabase Storage — never on the server filesystem.',
      'Add pagination from day 1 — it\'s much harder to add later.',
    ],
    deliverables: ['Live app with real URL', 'GitHub monorepo (frontend + backend)', 'README with setup instructions'],
    starterCode: `// prisma/schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id         Int      @id @default(autoincrement())
  title      String
  slug       String   @unique
  content    String
  published  Boolean  @default(false)
  author     User     @relation(fields: [authorId], references: [id])
  authorId   Int
  createdAt  DateTime @default(now())
}`,
  },
};

// Fallback for projects not in detailed data
function buildFallback(project) {
  return {
    ...project,
    tagline: `Build your ${project.title} and level up your skills.`,
    overview: project.desc,
    whatYoullLearn: project.skills.map(s => `Work confidently with ${s}`),
    steps: [
      { title: 'Research & plan', desc: 'Study the core concepts and technologies. Sketch what you want to build before writing code.', icon: Target },
      { title: 'Set up your project', desc: 'Initialize your project structure, install dependencies, and configure your development environment.', icon: Package },
      { title: 'Build core features', desc: 'Implement the primary functionality step by step. Test each feature before moving to the next.', icon: Code2 },
      { title: 'Polish & improve', desc: 'Improve the UI, handle edge cases, and add error handling.', icon: Sparkles },
      { title: 'Deploy & share', desc: 'Deploy your project live and add it to your portfolio with a description and screenshot.', icon: Rocket },
    ],
    resources: [],
    tips: [
      'Break the project into small tasks and tackle them one at a time.',
      'Search for solutions, but make sure you understand what you copy.',
      'Commit to Git regularly with meaningful commit messages.',
    ],
    deliverables: ['Working project', 'GitHub repo with README'],
    starterCode: `// Start your project here\nconsole.log('Let\\'s build ${project.title}!');`,
  };
}

// All project templates (same as ProjectsPage)
const PROJECT_TEMPLATES = [
  { id: 1,  title: 'Personal Portfolio Website',   desc: 'Showcase your skills and projects with a beautiful portfolio site.',           skills: ['HTML','CSS','JavaScript','React'], difficulty: 'Beginner',     time: '8–12 h',  icon: '💼', category: 'Web Development' },
  { id: 2,  title: 'React To-Do App',              desc: 'Build a functional task manager with CRUD and local storage.',                  skills: ['React','JavaScript','CSS'],        difficulty: 'Beginner',     time: '5–8 h',   icon: '✅', category: 'Web Development' },
  { id: 3,  title: 'Weather Dashboard',            desc: 'Fetch real-time weather data and display beautiful visualizations.',           skills: ['JavaScript','API','CSS'],          difficulty: 'Beginner',     time: '6–10 h',  icon: '🌤️', category: 'Web Development' },
  { id: 4,  title: 'REST API with Node.js',        desc: 'Build a full CRUD API with Express, MongoDB, and JWT authentication.',        skills: ['Node.js','MongoDB','REST','JWT'],   difficulty: 'Intermediate', time: '12–16 h', icon: '🔌', category: 'Backend' },
  { id: 5,  title: 'E-Commerce Product Page',      desc: 'Build a responsive product listing page with cart functionality.',            skills: ['React','CSS','JavaScript'],        difficulty: 'Intermediate', time: '10–14 h', icon: '🛍️', category: 'Web Development' },
  { id: 6,  title: 'SQL Analytics Dashboard',      desc: 'Query a database and display insights with charts using Python.',              skills: ['SQL','Python','Pandas'],           difficulty: 'Intermediate', time: '10–15 h', icon: '📊', category: 'Data' },
  { id: 7,  title: 'Data Cleaning Pipeline',       desc: 'Build an automated pipeline to clean and transform messy datasets.',          skills: ['Python','Pandas','NumPy'],         difficulty: 'Beginner',     time: '8–12 h',  icon: '🧹', category: 'Data' },
  { id: 8,  title: 'Figma UI Design System',       desc: 'Create a reusable component library and design system in Figma.',             skills: ['Figma','UI Design','Typography'],  difficulty: 'Beginner',     time: '6–10 h',  icon: '🎨', category: 'Design' },
  { id: 9,  title: 'ML Sentiment Classifier',      desc: 'Train a text classification model on real-world review data.',                skills: ['Python','scikit-learn','NLP'],     difficulty: 'Advanced',     time: '20–25 h', icon: '🤖', category: 'AI/ML' },
  { id: 10, title: 'Full-Stack Blog Platform',     desc: 'End-to-end blog with React frontend, Express backend, and PostgreSQL.',       skills: ['React','Node.js','PostgreSQL'],    difficulty: 'Advanced',     time: '25–35 h', icon: '📝', category: 'Full Stack' },
  { id: 11, title: 'Docker + CI/CD Pipeline',      desc: 'Containerize an app and set up automated deployment pipelines.',              skills: ['Docker','Git','Linux'],            difficulty: 'Intermediate', time: '12–18 h', icon: '🐳', category: 'DevOps' },
  { id: 12, title: 'Vulnerability Scanner Script', desc: 'Build a script to scan a web app for common security vulnerabilities.',       skills: ['Python','Linux','Security'],       difficulty: 'Intermediate', time: '14–20 h', icon: '🔒', category: 'Security' },
];

const DIFF_COLORS = {
  Beginner:     { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)' },
  Intermediate: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
  Advanced:     { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.2)'  },
};

const RESOURCE_COLORS = {
  docs:        { color: '#6366f1', bg: 'rgba(99,102,241,0.08)',  label: 'Docs' },
  video:       { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   label: 'Video' },
  course:      { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', label: 'Course' },
  tool:        { color: '#10b981', bg: 'rgba(16,185,129,0.08)', label: 'Tool' },
  dataset:     { color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', label: 'Dataset' },
  inspiration: { color: '#06b6d4', bg: 'rgba(6,182,212,0.08)',  label: 'Inspiration' },
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const template = PROJECT_TEMPLATES.find((p) => p.id === Number(id));
  if (!template) {
    return (
      <div className="s-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', color: '#1e1b4b', marginBottom: 8 }}>Project not found</h2>
        <button onClick={() => navigate('/projects')} style={{ padding: '10px 20px', borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#7c3aed)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
          Back to Projects
        </button>
      </div>
    );
  }

  const project = PROJECT_DATA[template.id] || buildFallback(template);
  const diff = DIFF_COLORS[project.difficulty] || {};

  const [checklist, setChecklist] = useState(
    project.steps.map((_, i) => ({ done: false, id: i }))
  );
  const [codeOpen, setCodeOpen] = useState(false);

  const doneCount = checklist.filter((c) => c.done).length;
  const progress = Math.round((doneCount / checklist.length) * 100);

  const toggleStep = (i) =>
    setChecklist((prev) => prev.map((c, idx) => idx === i ? { ...c, done: !c.done } : c));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* ── Back button ───────────────────────────────────────── */}
      <button
        onClick={() => navigate('/projects')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(99,102,241,0.15)', background: '#fff', color: '#6366f1', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', width: 'fit-content', transition: 'all 0.18s' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.06)'; e.currentTarget.style.transform = 'translateX(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = ''; }}
      >
        <ArrowLeft size={15} /> Back to Projects
      </button>

      {/* ── Hero Card ─────────────────────────────────────────── */}
      <div className="s-card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Gradient header */}
        <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', bottom: -30, left: '40%', width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, position: 'relative' }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0, border: '1px solid rgba(255,255,255,0.2)' }}>
              {project.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}>{project.difficulty}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Clock size={11} />{project.time}
                </span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}>{project.category}</span>
              </div>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: '#fff', margin: '0 0 8px', letterSpacing: '-0.3px' }}>
                {project.title}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                {project.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid rgba(99,102,241,0.07)', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#4b5563' }}>Progress</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6366f1' }}>{doneCount}/{checklist.length} steps — {progress}%</span>
            </div>
            <div style={{ height: 8, borderRadius: 99, background: 'rgba(99,102,241,0.1)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', borderRadius: 99, transition: 'width 0.4s ease' }} />
            </div>
          </div>
          {progress === 100 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 99, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#059669', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
              <Trophy size={14} /> Completed!
            </div>
          )}
        </div>

        {/* Skills row */}
        <div style={{ padding: '1rem 2rem', display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9ca3af', marginRight: 4 }}>SKILLS:</span>
          {project.skills.map((sk) => (
            <span key={sk} style={{ fontSize: '0.78rem', fontWeight: 600, padding: '4px 12px', borderRadius: 99, background: 'rgba(99,102,241,0.07)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.15)' }}>{sk}</span>
          ))}
        </div>
      </div>

      {/* ── Main 2-col layout ─────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }} className="grid-responsive-2">

        {/* LEFT column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Overview */}
          <div className="s-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={17} color="#6366f1" />
              </div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1e1b4b', fontSize: '1rem', margin: 0 }}>Project Overview</h2>
            </div>
            <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '0.9rem', margin: 0 }}>{project.overview}</p>
          </div>

          {/* What you'll learn */}
          <div className="s-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star size={17} color="#10b981" />
              </div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1e1b4b', fontSize: '1rem', margin: 0 }}>What You'll Learn</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {project.whatYoullLearn.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10b981' }}>{i + 1}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-step guide with interactive checklist */}
          <div className="s-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GitBranch size={17} color="#6366f1" />
              </div>
              <div>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1e1b4b', fontSize: '1rem', margin: 0 }}>Step-by-Step Guide</h2>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '2px 0 0' }}>Check each step as you complete it</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {project.steps.map((step, i) => {
                const Icon = step.icon;
                const done = checklist[i]?.done;
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex', gap: 14, padding: '1.125rem 1.25rem', borderRadius: 14,
                      background: done ? 'rgba(16,185,129,0.05)' : 'rgba(99,102,241,0.03)',
                      border: `1px solid ${done ? 'rgba(16,185,129,0.2)' : 'rgba(99,102,241,0.08)'}`,
                      transition: 'all 0.2s', cursor: 'pointer',
                    }}
                    onClick={() => toggleStep(i)}
                    onMouseEnter={e => { if (!done) e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'; }}
                    onMouseLeave={e => { if (!done) e.currentTarget.style.borderColor = 'rgba(99,102,241,0.08)'; }}
                  >
                    {/* Checkbox */}
                    <div style={{ flexShrink: 0, marginTop: 2 }}>
                      {done
                        ? <CheckCircle2 size={22} color="#10b981" fill="rgba(16,185,129,0.15)" />
                        : <Circle size={22} color="#d1d5db" />
                      }
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                        <div style={{ width: 24, height: 24, borderRadius: 8, background: done ? 'rgba(16,185,129,0.1)' : 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={13} color={done ? '#10b981' : '#6366f1'} />
                        </div>
                        <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: done ? '#10b981' : '#1e1b4b', margin: 0, fontFamily: 'Syne, sans-serif', textDecoration: done ? 'line-through' : 'none', textDecorationColor: 'rgba(16,185,129,0.5)' }}>
                          <span style={{ color: done ? '#10b981' : 'rgba(99,102,241,0.4)', fontWeight: 800, marginRight: 6 }}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {step.title}
                        </h3>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: done ? '#6b7280' : '#4b5563', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Starter Code */}
          {project.starterCode && (
            <div className="s-card" style={{ padding: 0, overflow: 'hidden' }}>
              <button
                onClick={() => setCodeOpen(!codeOpen)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.125rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(30,27,75,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Code2 size={17} color="#1e1b4b" />
                  </div>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1e1b4b', fontSize: '1rem' }}>Starter Code / Template</span>
                </div>
                {codeOpen ? <ChevronUp size={18} color="#9ca3af" /> : <ChevronDown size={18} color="#9ca3af" />}
              </button>
              {codeOpen && (
                <div style={{ borderTop: '1px solid rgba(99,102,241,0.08)' }}>
                  <pre style={{ margin: 0, padding: '1.5rem', background: '#1e1b4b', color: '#a5b4fc', fontSize: '0.8rem', lineHeight: 1.7, overflowX: 'auto', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
                    <code>{project.starterCode}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Quick Stats */}
          <div className="s-card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1e1b4b', fontSize: '0.9rem', margin: '0 0 1rem' }}>At a Glance</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Difficulty', value: project.difficulty, color: diff.color },
                { label: 'Estimated Time', value: project.time, color: '#6366f1' },
                { label: 'Category', value: project.category, color: '#8b5cf6' },
                { label: 'Steps', value: `${project.steps.length} guided steps`, color: '#06b6d4' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(99,102,241,0.06)' }}>
                  <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="s-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '1rem' }}>
              <Trophy size={16} color="#f59e0b" />
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1e1b4b', fontSize: '0.9rem', margin: 0 }}>Deliverables</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {project.deliverables.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.5 }}>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="s-card" style={{ padding: '1.25rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.04), rgba(251,191,36,0.06))', border: '1px solid rgba(245,158,11,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '1rem' }}>
              <Lightbulb size={16} color="#f59e0b" />
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1e1b4b', fontSize: '0.9rem', margin: 0 }}>Pro Tips</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {project.tips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 10px', borderRadius: 10, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.1)' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f59e0b', flexShrink: 0, marginTop: 2 }}>💡</span>
                  <span style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.55 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          {project.resources?.length > 0 && (
            <div className="s-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '1rem' }}>
                <Globe size={16} color="#6366f1" />
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1e1b4b', fontSize: '0.9rem', margin: 0 }}>Resources</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {project.resources.map((r, i) => {
                  const rc = RESOURCE_COLORS[r.type] || RESOURCE_COLORS.docs;
                  return (
                    <a
                      key={i}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '9px 12px', borderRadius: 10,
                        background: rc.bg, border: `1px solid ${rc.color}20`,
                        textDecoration: 'none', transition: 'all 0.18s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(3px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e1b4b', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.label}</p>
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: rc.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{rc.label}</span>
                      </div>
                      <ExternalLink size={13} color={rc.color} style={{ flexShrink: 0, marginLeft: 8 }} />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related careers */}
          {project.careers?.length > 0 && (
            <div className="s-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '1rem' }}>
                <Target size={16} color="#8b5cf6" />
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1e1b4b', fontSize: '0.9rem', margin: 0 }}>Relevant Careers</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {project.careers.map((c) => (
                  <div key={c} style={{ padding: '7px 12px', borderRadius: 10, background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.12)', fontSize: '0.82rem', fontWeight: 600, color: '#7c3aed' }}>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
