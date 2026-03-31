import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  onSnapshot
} from "firebase/firestore";
import { db } from "../lib/firebase";

// --- Students Service ---

export const getStudents = async (ngoId) => {
  try {
    const q = query(collection(db, "students"), where("ngoId", "==", ngoId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const addStudent = async (studentData) => {
  try {
    const docRef = await addDoc(collection(db, "students"), studentData);
    return { id: docRef.id, ...studentData };
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

// --- Volunteers Service ---

export const getVolunteers = async (ngoId) => {
  try {
    const q = query(collection(db, "volunteers"), where("ngoId", "==", ngoId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    throw error;
  }
};

export const addVolunteer = async (volunteerData) => {
  try {
    const docRef = await addDoc(collection(db, "volunteers"), volunteerData);
    return { id: docRef.id, ...volunteerData };
  } catch (error) {
    console.error("Error adding volunteer:", error);
    throw error;
  }
};

// --- Sessions Service ---

export const getSessions = async (ngoId) => {
  try {
    const q = query(collection(db, "sessions"), where("ngoId", "==", ngoId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      startTime: doc.data().startTime?.toDate?.() || doc.data().startTime 
    }));
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
};

// --- Users Service ---

export const updateUser = async (uid, data) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};



export const subscribeToOnlineUsers = (role, callback) => {
  const q = query(collection(db, "users"), where("role", "==", role));
  
  return onSnapshot(q, (snapshot) => {
    const totalCount = snapshot.size;
    const onlineCount = snapshot.docs.filter(d => d.data().isOnline === true).length;
    callback(onlineCount, totalCount);
  }, (error) => {
    console.error(`Error in subscribeToOnlineUsers for ${role}:`, error);
    callback(0, 0);
  });
};
