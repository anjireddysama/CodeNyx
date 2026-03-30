import { mockFetch } from './api';

const MOCK_SESSIONS = [
  { id: 101, title: 'Math Tutoring', date: '2026-03-31T10:00:00Z', status: 'upcoming', student: 'Alex S.' },
  { id: 102, title: 'Science Lab', date: '2026-03-29T14:00:00Z', status: 'completed', student: 'Alex S.' }
];

export const getSessions = async (role) => {
  return await mockFetch(MOCK_SESSIONS);
};
