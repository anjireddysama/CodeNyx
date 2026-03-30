import { mockFetch } from './api';

const mockUserMapping = {
  'student': { id: 1, role: 'student', name: 'Alex Student', email: 'alex@example.com' },
  'volunteer': { id: 2, role: 'volunteer', name: 'Sarah Volunteer', email: 'sarah@example.com' },
  'ngo': { id: 3, role: 'ngo', name: 'NGO Admin', email: 'admin@ngo.org' }
};

export const loginMock = async (username, password) => {
  const role = username.toLowerCase();
  const user = mockUserMapping[role];
  if (!user) {
    throw new Error("Invalid mock credentials. Use 'student', 'volunteer', or 'ngo'.");
  }
  return await mockFetch({ user, token: `mock-jwt-${role}` });
};
