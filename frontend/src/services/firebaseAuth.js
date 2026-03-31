import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

// Helper to get or create a user profile in Firestore
const getOrCreateUserProfile = async (user, role = null) => {
  if (!user) return null;
  
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data();
  } else if (role) {
    // If user doesn't exist and a role is provided, create the profile
    const profile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
      role: role,
      createdAt: new Date().toISOString(),
    };
    await setDoc(userRef, profile);
    return profile;
  }
  return null;
};

export const signUp = async (email, password, role, fullName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create profile in Firestore — mark as online immediately
    const profile = {
      uid: user.uid,
      email: user.email,
      displayName: fullName,
      role: role,
      isOnline: true,
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, "users", user.uid), profile);
    
    return { user: profile };
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Fetch profile from Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      throw new Error("User profile not found in database.");
    }
    
    // Mark user as online immediately
    await updateDoc(userRef, { isOnline: true, lastActive: new Date().toISOString() });
    
    return { user: userSnap.data() };
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => signOut(auth);

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const profile = await getOrCreateUserProfile(user);
      callback(profile);
    } else {
      callback(null);
    }
  });
};
