import { adminDb } from '../lib/firebase-admin';

export const deployFirestoreIndexes = async () => {
  try {
    // Create a new collection for index deployment tracking
    const indexesRef = adminDb.collection('_firestore_indexes');
    
    // Deploy the indexes by creating a new document
    await indexesRef.add({
      indexes: [
        {
          collectionGroup: 'matching_criteria',
          queryScope: 'COLLECTION',
          fields: [
            { fieldPath: 'type', order: 'ASCENDING' },
            { fieldPath: 'location.city', order: 'ASCENDING' },
            { fieldPath: 'location.state', order: 'ASCENDING' },
            { fieldPath: 'createdAt', order: 'DESCENDING' }
          ]
        }
      ],
      deployedAt: new Date(),
      version: '1.0.0'
    });

    console.log('Firestore indexes deployed successfully');
  } catch (error) {
    console.error('Error deploying Firestore indexes:', error);
    throw error;
  }
};