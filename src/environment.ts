import * as admin from 'firebase-admin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../serviceAccountKey.json');

export const environment = {
  firebaseConfig: {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: serviceAccount['project_id'],
  },
};
