import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK for server-side operations
const initializeFirebaseAdmin = () => {
  try {
    // Check if Firebase is already initialized
    if (getApps().length === 0) {
      // Get environment variables
      const projectId = process.env.FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKey = process.env.FIREBASE_PRIVATE_KEY;
      
      // Validate environment variables
      if (!projectId || !clientEmail || !privateKey) {
        console.error('Missing Firebase credentials. Make sure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set in environment variables.');
        // Return a mock DB for development or when credentials are missing
        return {
          collection: () => ({
            doc: () => ({
              get: async () => ({ exists: false, data: () => ({}) }),
              set: async () => ({}),
            }),
          }),
        };
      }
      
      // Initialize with environment variables
      const serviceAccount = {
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      };

      initializeApp({
        credential: cert(serviceAccount as any),
      });
    }

    return getFirestore();
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    
    // Return a mock DB in case of error
    return {
      collection: () => ({
        doc: () => ({
          get: async () => ({ exists: false, data: () => ({}) }),
          set: async () => ({}),
        }),
      }),
    };
  }
};

export const db = initializeFirebaseAdmin();
