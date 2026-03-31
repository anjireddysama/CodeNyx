import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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
          
          // Mark the user as online in Firestore
          try {
            await updateDoc(userRef, { 
              isOnline: true, 
              lastActive: new Date().toISOString() 
            });
          } catch (err) {
            console.error("Failed to set online status", err);
          }
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
      if (auth.currentUser) {
        try {
          // Attempt to mark user offline before signing out
          await updateDoc(doc(db, "users", auth.currentUser.uid), { isOnline: false });
        } catch (err) {
          console.error("Failed to set offline status", err);
        }
      }
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
