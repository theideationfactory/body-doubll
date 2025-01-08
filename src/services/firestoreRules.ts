import { adminDb } from '../lib/firebase-admin';

export const deployFirestoreRules = async () => {
  try {
    // Create a new collection for rules deployment tracking
    const rulesRef = adminDb.collection('_firestore_rules');
    
    // Deploy the rules by creating a new document
    await rulesRef.add({
      rules: `
        rules_version = '2';
        service cloud.firestore {
          match /databases/{database}/documents {
            // Helper functions
            function isAuthenticated() {
              return request.auth != null;
            }

            function isOwner(userId) {
              return request.auth.uid == userId;
            }

            // Users collection
            match /users/{userId} {
              allow read: if isAuthenticated();
              allow write: if isOwner(userId);
            }

            // Matching criteria collection
            match /matching_criteria/{criteriaId} {
              allow read: if isAuthenticated();
              allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
              allow update, delete: if isAuthenticated() && resource.data.userId == request.auth.uid;
            }

            // Matches collection
            match /matches/{matchId} {
              allow read: if isAuthenticated() && (
                resource.data.clientId == request.auth.uid ||
                resource.data.doubllId == request.auth.uid
              );
              allow create: if isAuthenticated();
              allow update: if isAuthenticated() && (
                resource.data.clientId == request.auth.uid ||
                resource.data.doubllId == request.auth.uid
              );
            }
          }
        }
      `,
      deployedAt: new Date(),
      version: '1.0.0'
    });

    console.log('Firestore rules deployed successfully');
  } catch (error) {
    console.error('Error deploying Firestore rules:', error);
    throw error;
  }
};