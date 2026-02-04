// Firestore Database Operations
// Blockchain integration – demo mode
// Real blockchain would store trust scores immutably on-chain

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc,
  setDoc, 
  query, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

// Collections
const PROJECTS_COLLECTION = 'projects';
const FEEDBACK_COLLECTION = 'feedback';
const USERS_COLLECTION = 'users';

// Projects
export const getProjects = async () => {
  const projectsRef = collection(db, PROJECTS_COLLECTION);
  const snapshot = await getDocs(projectsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProject = async (projectId) => {
  const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
  const snapshot = await getDoc(projectRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  return null;
};

export const updateProjectTrustScore = async (projectId, newScore) => {
  const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
  await updateDoc(projectRef, {
    trustScore: Math.max(0, Math.min(100, newScore)), // Clamp between 0-100
    lastUpdated: serverTimestamp()
  });
};

export const markProjectDelayed = async (projectId) => {
  const project = await getProject(projectId);
  if (project) {
    const newScore = project.trustScore - 10;
    await updateProjectTrustScore(projectId, newScore);
    await updateDoc(doc(db, PROJECTS_COLLECTION, projectId), {
      status: 'Delayed',
      lastStatusChange: serverTimestamp()
    });
  }
};

export const markMilestoneComplete = async (projectId) => {
  const project = await getProject(projectId);
  if (project) {
    const newScore = project.trustScore + 5;
    await updateProjectTrustScore(projectId, newScore);
    await updateDoc(doc(db, PROJECTS_COLLECTION, projectId), {
      status: 'On-time',
      lastStatusChange: serverTimestamp()
    });
  }
};

// Feedback
export const submitFeedback = async (feedbackData) => {
  const feedbackRef = collection(db, FEEDBACK_COLLECTION);
  const docRef = await addDoc(feedbackRef, {
    ...feedbackData,
    createdAt: serverTimestamp(),
    verified: false
  });
  
  // Simulate trust score increase after verified feedback
  // In real blockchain, this would be an on-chain transaction
  if (feedbackData.projectId) {
    const project = await getProject(feedbackData.projectId);
    if (project) {
      const newScore = project.trustScore + 5;
      await updateProjectTrustScore(feedbackData.projectId, newScore);
    }
  }
  
  return docRef.id;
};

export const getUserFeedback = async (userId) => {
  const feedbackRef = collection(db, FEEDBACK_COLLECTION);
  const q = query(feedbackRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Users
export const createUserProfile = async (userId, userData) => {
  const userRef = doc(db, USERS_COLLECTION, userId);
  await setDoc(userRef, {
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }, { merge: true });
};

export const getUserProfile = async (userId) => {
  const userRef = doc(db, USERS_COLLECTION, userId);
  const snapshot = await getDoc(userRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  return null;
};
