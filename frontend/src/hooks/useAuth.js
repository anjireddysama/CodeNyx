import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

// Global user state tracker
let globalUser = null;
let initialized = false;

export const useAuth = () => {
  const [user, setUser] = useState(globalUser);
  const [loading, setLoading] = useState(!initialized);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch profile from Firestore
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const profile = userSnap.data();
          globalUser = profile;
          setUser(profile);
        } else {
          // No profile found (maybe admin created user)
          globalUser = null;
          setUser(null);
        }
      } else {
        globalUser = null;
        setUser(null);
      }
      
      initialized = true;
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    globalUser = userData;
    setUser(userData);
  };
  
  const logout = async () => {
    try {
      await signOut(auth);
      globalUser = null;
      setUser(null);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return { 
    user, 
    login, 
    logout, 
    loading,
    isAuthenticated: !!user, 
    role: user?.role 
  };
};
