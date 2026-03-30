import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCCbFgZ3D8ereuhPLBmJwJJDZzZ3bCJnUA",
  authDomain: "traceed-4224d.firebaseapp.com",
  projectId: "traceed-4224d",
  storageBucket: "traceed-4224d.firebasestorage.app",
  messagingSenderId: "1030070883910",
  appId: "1:1030070883910:web:51b31c256287f712521c47",
  measurementId: "G-D8E7LXH98G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, auth, db, analytics };
