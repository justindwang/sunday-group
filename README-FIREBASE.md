# Fixing Multiple Master Sessions with Firebase Firestore

This document explains the changes made to fix the issue with multiple "master" sessions in the Sunday Group application when deployed to Netlify.

## The Problem

The application was using in-memory storage (`roomsData` variable in `app/api/room/data.ts`) to store room state. In a serverless environment like Netlify:

1. Each function invocation runs in an isolated container with its own memory
2. Different API requests might be handled by different function instances
3. State doesn't persist between function calls
4. Containers can be recycled at any time

This was causing multiple "master" sessions - each serverless function instance had its own separate copy of the `roomsData` variable. When Netlify spun up a new instance to handle a request, it started with a fresh state.

## The Solution

The solution is to use Firebase Firestore to persist data across function invocations. Firestore is a NoSQL document database that is:

- Free to use with generous limits (1GB storage, 50K reads/day, 20K writes/day)
- Easy to set up with Netlify
- Scalable and reliable

The following changes were made:

1. Added Firebase dependencies to `package.json`
2. Created a Firebase configuration file in `app/utils/firebase.ts`
3. Updated `app/api/room/data.ts` to use Firestore instead of in-memory storage
4. Updated `netlify.toml` to include Firebase environment variables

## Setting Up Firebase with Netlify

### Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the steps to create a new project
3. Once the project is created, click on the gear icon (⚙️) next to "Project Overview" and select "Project settings"
4. Go to the "Service accounts" tab
5. Click "Generate new private key" to download a JSON file with your Firebase credentials

### Step 2: Set Up Firestore Database

1. In the Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode" and select a location close to your users
4. Click "Enable"
5. Go to the "Rules" tab and update the rules to allow read/write access:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // For development only! Restrict this in production
    }
  }
}
```

### Step 3: Add Firebase Credentials to Netlify

1. Go to your Netlify dashboard and select your site
2. Go to "Site settings" > "Environment variables"
3. Add the following environment variables from the JSON file you downloaded:
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `FIREBASE_CLIENT_EMAIL`: Your Firebase client email
   - `FIREBASE_PRIVATE_KEY`: Your Firebase private key (make sure to include all characters, including newlines)

**Important Note About Netlify Secrets Scanning:**

Netlify has a secrets scanning feature that may detect your Firebase credentials during the build process. To avoid this issue:

1. Make sure you're adding the environment variables through the Netlify dashboard UI, not in the netlify.toml file
2. If you're still encountering secrets scanning issues, you can:
   - Go to "Site settings" > "Build & deploy" > "Environment" > "Environment variables"
   - Toggle "Sensitive variable policy" to "Ignore"
   - Or add specific variables to the ignore list

Alternatively, you can use Netlify's dedicated "Environment variable" UI section which automatically handles secrets properly.

### Step 4: Deploy Your Site

1. Commit and push your changes to your repository
2. Netlify will automatically deploy your site with the Firebase integration

## Testing the Fix

After deploying, test the application by:

1. Opening the application in multiple browser tabs
2. Adding participants in one tab
3. Verifying that the participants appear in the other tabs
4. Forming groups in one tab
5. Verifying that the groups appear in the other tabs

The issue with multiple "master" sessions should be resolved, and all clients should see the same state.

## Troubleshooting

If you encounter issues:

1. Check the Netlify function logs in the Netlify dashboard
2. Verify that the Firebase environment variables are set correctly
3. Check for any errors in the browser console
4. Make sure your Firebase project has Firestore enabled
5. Verify that your Firebase rules allow read/write access

## Additional Notes

- A local cache is used to minimize reads from Firestore
- The cache has a TTL of 5 seconds
- Firestore has a free tier with generous limits, but you should monitor usage if your application gets heavy traffic
