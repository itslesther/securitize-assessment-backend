import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class RatesService {
  async updateRate(prop: { fiat: 'USD' | 'EUR'; value: number }) {
    const db = admin.firestore();

    await db.doc(`rates/${prop.fiat}`).set({
      fiat: prop.fiat,
      value: prop.value,
    });
  }

  async getRates() {
    const db = admin.firestore();

    const rates = (await db.collection('rates').get()).docs.map((doc) =>
      doc.data(),
    );

    return rates;
  }
}
