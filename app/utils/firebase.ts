import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK for server-side operations
const initializeFirebaseAdmin = () => {
  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    // Initialize with environment variables
    // These will be set in Netlify environment variables
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    initializeApp({
      credential: cert(serviceAccount as any),
    });
  }

  return getFirestore();
};

export const db = initializeFirebaseAdmin();
