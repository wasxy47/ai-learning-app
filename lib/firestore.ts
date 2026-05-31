import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './firebase';
import { UserData } from '@/types';

/**
 * Initialize a new user document in Firestore after signup
 */
export async function createUserDoc(uid: string, email: string): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    email,
    completedLessons: [],
    weakAreas: [],
    quizScores: {},
  });
}

/**
 * Fetch user data from Firestore
 */
export async function getUserData(uid: string): Promise<UserData | null> {
  const userRef = doc(db, 'users', uid);
  try {
    const snap = await getDoc(userRef);
    if (!snap.exists()) return null;
    return snap.data() as UserData;
  } catch (error: any) {
    console.error('Failed to get user data:', error);
    // Return a fallback empty user data structure if offline
    return {
      email: '',
      completedLessons: [],
      weakAreas: [],
      quizScores: {}
    } as UserData;
  }
}

/**
 * Mark a lesson as complete — adds lessonId to completedLessons array
 */
export async function markLessonComplete(uid: string, lessonId: string): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    completedLessons: arrayUnion(lessonId),
  });
}

/**
 * Save quiz score and update weakAreas if score < 60%
 */
export async function saveQuizResult(
  uid: string,
  moduleName: string,
  score: number
): Promise<void> {
  const userRef = doc(db, 'users', uid);
  const updateData: Record<string, unknown> = {
    [`quizScores.${moduleName}`]: score,
  };

  if (score < 60) {
    updateData.weakAreas = arrayUnion(moduleName);
  }

  await updateDoc(userRef, updateData);
}

/**
 * Add a module to weakAreas
 */
export async function addWeakArea(uid: string, moduleName: string): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    weakAreas: arrayUnion(moduleName),
  });
}
