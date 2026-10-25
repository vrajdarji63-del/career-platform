import axios from 'axios';
import { getActiveToken } from '../context/AuthContext.jsx';

// Base API URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Role-specific storage keys (must match AuthContext) ─────────────────────
const STORAGE_KEYS = {
  admin:   { token: 'career_platform_admin_token',   user: 'career_platform_admin_user' },
  student: { token: 'career_platform_student_token', user: 'career_platform_student_user' },
};

function getSessionType() {
  return window.location.pathname.startsWith('/admin') ? 'admin' : 'student';
}

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// ─── Request Interceptor: attach JWT token based on current route context ────
api.interceptors.request.use(
  (config) => {
    const token = getActiveToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor: handle 401 globally ───────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isOnAuthPage = window.location.pathname.includes('/login');
      if (!isOnAuthPage) {
        const type = getSessionType();
        const keys = STORAGE_KEYS[type];
        localStorage.removeItem(keys.token);
        localStorage.removeItem(keys.user);
        window.location.href = type === 'admin' ? '/admin/login' : '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth API ─────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  // Register accepts FormData (includes optional passportPhoto file)
  register: (data) => api.post('/auth/register', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  sendOTP: (email, firstName) => api.post('/auth/send-otp', { email, firstName }),
  verifyOTP: (email, otp) => api.post('/auth/verify-otp', { email, otp }),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/update-profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  completeOnboarding: (data) => api.post('/auth/onboarding', data),
};

// ─── Careers API ──────────────────────────────────────────────────────────────
export const careersAPI = {
  getAll: (params) => api.get('/careers', { params }),
  getById: (id) => api.get(`/careers/${id}`),
  create: (data) => api.post('/careers', data),
  update: (id, data) => api.put(`/careers/${id}`, data),
  delete: (id) => api.delete(`/careers/${id}`),
};

// ─── Skills API ───────────────────────────────────────────────────────────────
export const skillsAPI = {
  getAll: (params) => api.get('/skills', { params }),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
};

// ─── Projects API ─────────────────────────────────────────────────────────────
export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

// ─── Assessments API ──────────────────────────────────────────────────────────
export const assessmentsAPI = {
  getAll: () => api.get('/assessments'),
  getById: (id) => api.get(`/assessments/${id}`),
  submit: (id, data) => api.post(`/assessments/${id}/submit`, data),
  create: (data) => api.post('/assessments', data),
  update: (id, data) => api.put(`/assessments/${id}`, data),
  delete: (id) => api.delete(`/assessments/${id}`),
};

// ─── Students API ─────────────────────────────────────────────────────────────
export const studentsAPI = {
  getAll: (params) => api.get('/students', { params }),
  getStats: () => api.get('/students/stats'),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => {
    if (data instanceof FormData) {
      return api.post('/students', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return api.post('/students', data);
  },
  update: (id, data) => api.put(`/students/${id}`, data),
  updatePhoto: (id, file) => {
    const fd = new FormData();
    fd.append('passportPhoto', file);
    return api.put(`/students/${id}/photo`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  delete: (id) => api.delete(`/students/${id}`),
  getMyProfile: () => api.get('/students/me/profile'),
  updateSkills: (skills) => api.put('/students/me/skills', { skills }),
  updateProgress: (data) => api.put('/students/me/progress', data),
};

export default api;
