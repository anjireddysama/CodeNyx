import { useState } from 'react';

// Simplified hook without context for mock ease
let globalUser = null; 
export const useAuth = () => {
  const [user, setUser] = useState(globalUser);

  const login = (userData) => {
    globalUser = userData;
    setUser(userData);
  };
  
  const logout = () => {
    globalUser = null;
    setUser(null);
  };

  return { user, login, logout, isAuthenticated: !!user, role: user?.role };
};
