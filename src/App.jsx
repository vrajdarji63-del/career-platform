import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

// Layouts
import PublicLayout from './layouts/PublicLayout.jsx';
import StudentLayout from './layouts/StudentLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

// Public Pages
import HomePage from './pages/public/HomePage.jsx';
import AboutPage from './pages/public/AboutPage.jsx';
import CareersPage from './pages/public/CareersPage.jsx';

// Auth Pages
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import AdminLoginPage from './pages/auth/AdminLoginPage.jsx';
import OnboardingPage from './pages/auth/OnboardingPage.jsx';

// Student Pages
import DashboardPage from './pages/student/DashboardPage.jsx';
import ProfilePage from './pages/student/ProfilePage.jsx';
import AssessmentPage from './pages/student/AssessmentPage.jsx';
import AssessmentResultPage from './pages/student/AssessmentResultPage.jsx';
import SkillGapPage from './pages/student/SkillGapPage.jsx';
import RoadmapPage from './pages/student/RoadmapPage.jsx';
import ProjectsPage from './pages/student/ProjectsPage.jsx';
import ProjectDetailPage from './pages/student/ProjectDetailPage.jsx';
import ProgressPage from './pages/student/ProgressPage.jsx';
import AIAdvisorPage from './pages/student/AIAdvisorPage.jsx';
import CareerDetailPage from './pages/student/CareerDetailPage.jsx';
import SettingsPage from './pages/student/SettingsPage.jsx';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';
import AdminStudentsPage from './pages/admin/AdminStudentsPage.jsx';
import AdminCareersPage from './pages/admin/AdminCareersPage.jsx';
import AdminSkillsPage from './pages/admin/AdminSkillsPage.jsx';
import AdminAssessmentsPage from './pages/admin/AdminAssessmentsPage.jsx';
import AdminProjectsPage from './pages/admin/AdminProjectsPage.jsx';
import AdminReportsPage from './pages/admin/AdminReportsPage.jsx';
import AdminSettingsPage from './pages/admin/AdminSettingsPage.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
          </Route>

          {/* Auth Routes (no layout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Student Routes */}
          <Route element={<StudentLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/assessment-result" element={<AssessmentResultPage />} />
            <Route path="/skill-gap" element={<SkillGapPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/ai-advisor" element={<AIAdvisorPage />} />
            <Route path="/career/:id" element={<CareerDetailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="students" element={<AdminStudentsPage />} />
            <Route path="careers" element={<AdminCareersPage />} />
            <Route path="skills" element={<AdminSkillsPage />} />
            <Route path="assessments" element={<AdminAssessmentsPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
