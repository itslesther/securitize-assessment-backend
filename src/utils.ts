import * as admin from 'firebase-admin';

export function generateId() {
  return admin.firestore().collection('uniqueId').doc().id;
}
