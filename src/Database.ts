import * as admin from 'firebase-admin';
import { environment } from './environment';

export class Database {
  public init() {
    admin.initializeApp({
      credential: environment.firebaseConfig.credential,
      databaseURL: environment.firebaseConfig.databaseURL,
    });
  }
}
