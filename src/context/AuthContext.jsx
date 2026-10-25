import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api.js';

const AuthContext = createContext(null);

// ─── Separate storage keys for admin vs student sessions ────────────────────
const STORAGE_KEYS = {
  admin: {
    token: 'career_platform_admin_token',
    user:  'career_platform_admin_user',
  },
  student: {
    token: 'career_platform_student_token',
    user:  'career_platform_student_user',
  },
};

// Legacy keys (for migration / cleanup)
const LEGACY_TOKEN_KEY = 'career_platform_token';
const LEGACY_USER_KEY  = 'career_platform_user';

/**
 * Determine which session type to use based on the current URL path.
 * Admin routes (/admin/*) use admin keys; everything else uses student keys.
 */
function getSessionType() {
  return window.location.pathname.startsWith('/admin') ? 'admin' : 'student';
}

function getKeys(sessionType) {
  return STORAGE_KEYS[sessionType] || STORAGE_KEYS.student;
}

/**
 * Get the active token for the current route context.
 * Exported so api.js can call it from the request interceptor.
 */
export function getActiveToken() {
  const type = getSessionType();
  const keys = getKeys(type);
  return localStorage.getItem(keys.token);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading]         = useState(true);

  const mapUser = (u) => {
    const firstName = u.firstName || u.name?.split(' ')[0] || '';
    const lastName  = u.lastName  || u.name?.split(' ').slice(1).join(' ') || '';
    return {
      id:                   u._id || u.id,
      name:                 u.name || [firstName, lastName].filter(Boolean).join(' ') || u.email,
      firstName,
      lastName,
      email:                u.email,
      mobile:               u.mobile,
      role:                 u.role,
      onboardingCompleted:  u.onboardingCompleted ?? false,
      careerGoal:           u.careerGoal,
      careerReadiness:      u.careerReadiness,
      recommendedCareer:    u.recommendedCareer,
      interests:            u.interests || [],
      skills:               u.skills || [],
      passportPhoto:        u.passportPhoto || { url: '', publicId: '' },
    };
  };

  // ─── Migrate any legacy single-key data, then remove old keys ─────────────
  useEffect(() => {
    const legacyToken = localStorage.getItem(LEGACY_TOKEN_KEY);
    const legacyUser  = localStorage.getItem(LEGACY_USER_KEY);
    if (legacyToken && legacyUser) {
      try {
        const parsed = JSON.parse(legacyUser);
        const role   = parsed.role === 'admin' ? 'admin' : 'student';
        const keys   = getKeys(role);
        // Only migrate if the new key slot is empty
        if (!localStorage.getItem(keys.token)) {
          localStorage.setItem(keys.token, legacyToken);
          localStorage.setItem(keys.user, legacyUser);
        }
      } catch { /* ignore malformed data */ }
      // Always clean up legacy keys
      localStorage.removeItem(LEGACY_TOKEN_KEY);
      localStorage.removeItem(LEGACY_USER_KEY);
    }
  }, []);

  // ─── Bootstrap: load session for the current route context ────────────────
  useEffect(() => {
    const init = async () => {
      const type   = getSessionType();
      const keys   = getKeys(type);
      const token  = localStorage.getItem(keys.token);
      const stored = localStorage.getItem(keys.user);

      if (token && stored) {
        try {
          setCurrentUser(JSON.parse(stored));
          const res  = await authAPI.getMe();
          const u    = res.data.user;
          const user = mapUser(u);
          setCurrentUser(user);
          localStorage.setItem(keys.user, JSON.stringify(user));
        } catch {
          localStorage.removeItem(keys.token);
          localStorage.removeItem(keys.user);
          setCurrentUser(null);
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  // ─── Cross-tab sync: react when another tab changes localStorage ──────────
  useEffect(() => {
    const handleStorage = (e) => {
      const allTokenKeys = [STORAGE_KEYS.admin.token, STORAGE_KEYS.student.token];
      if (allTokenKeys.includes(e.key)) {
        const type = getSessionType();
        const keys = getKeys(type);
        // Only react if the change is for our session type
        if (e.key === keys.token) {
          if (!e.newValue) {
            // Token was removed (logout in another tab)
            setCurrentUser(null);
          } else {
            // Token was set (login in another tab) — reload user
            const stored = localStorage.getItem(keys.user);
            if (stored) {
              try { setCurrentUser(JSON.parse(stored)); } catch { /* ignore */ }
            }
          }
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const persist = (token, user) => {
    const role = user.role === 'admin' ? 'admin' : 'student';
    const keys = getKeys(role);
    localStorage.setItem(keys.token, token);
    localStorage.setItem(keys.user, JSON.stringify(user));
    setCurrentUser(user);
  };

  const login = async (email, password) => {
    try {
      const res  = await authAPI.login(email, password);
      const user = mapUser(res.data.user);
      persist(res.data.token, user);
      return { success: true, user };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Login failed. Please try again.' };
    }
  };

  const register = async (formData) => {
    try {
      // Build FormData so the passport photo (File) can be sent as multipart
      const fd = new FormData();
      fd.append('firstName', formData.firstName);
      fd.append('lastName',  formData.lastName);
      fd.append('email',     formData.email);
      fd.append('mobile',    formData.mobile);
      fd.append('password',  formData.password);
      if (formData.passportPhoto instanceof File) {
        fd.append('passportPhoto', formData.passportPhoto);
      }

      const res  = await authAPI.register(fd);
      const user = mapUser(res.data.user);
      persist(res.data.token, user);
      return { success: true, user };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Registration failed.' };
    }
  };

  const completeOnboarding = (updatedUser) => {
    const user = mapUser(updatedUser);
    const keys = getKeys('student');
    localStorage.setItem(keys.user, JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = useCallback(() => {
    // Clear the session for the current route context
    const type = getSessionType();
    const keys = getKeys(type);
    localStorage.removeItem(keys.token);
    localStorage.removeItem(keys.user);
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      currentUser, loading,
      login, register, logout, completeOnboarding,
      isAuthenticated:  !!currentUser,
      isStudent:        currentUser?.role === 'student',
      isAdmin:          currentUser?.role === 'admin',
      needsOnboarding:  !!currentUser && currentUser.role === 'student' && !currentUser.onboardingCompleted,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
