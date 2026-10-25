import { useState, useEffect } from 'react';
import { studentsAPI, assessmentsAPI } from '../services/api';

/**
 * Hook to fetch comprehensive student data from the backend.
 * Returns profile, stats, assessmentHistory, skillGap, progress, and loading/error states.
 */
export default function useStudentData() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [assessmentHistory, setAssessmentHistory] = useState([]);
  const [skillGap, setSkillGap] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [{ data: profileData }, { data: statsData }] = await Promise.all([
          studentsAPI.getMyProfile(),
          studentsAPI.getStats(),
        ]);
        setProfile(profileData);
        setStats(statsData);
        const { data: assessments } = await assessmentsAPI.getAll();
        setAssessmentHistory(assessments);
        if (profileData.skillGap) setSkillGap(profileData.skillGap);
        if (profileData.progress) setProgress(profileData.progress);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return { profile, stats, assessmentHistory, skillGap, progress, loading, error };
}
