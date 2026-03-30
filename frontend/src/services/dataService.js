import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where 
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
