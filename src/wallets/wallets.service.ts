import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ethers } from 'ethers';
import * as admin from 'firebase-admin';

@Injectable()
export class WalletsService {
  async newWallet(prop: { address: string }) {
    const db = admin.firestore();

    const walletExists = (
      await db.doc(`wallets/${prop.address.toLowerCase()}`).get()
    ).exists;

    if (walletExists) throw 'Wallet Exists';

    await db.doc(`wallets/${prop.address.toLowerCase()}`).set({
      address: prop.address.toLowerCase(),
      creationTS: Date.now(),
      isFavorite: false,
    });
  }

  async getWallets(prop: { orderBy: 'creationTS' | 'isFavorite' }) {
    const db = admin.firestore();

    const wallets = (
      await db.collection('wallets').orderBy(prop.orderBy, 'desc').get()
    ).docs.map((doc) => doc.data());

    return wallets;
  }

  async getWallet(prop: { address: string }) {
    const db = admin.firestore();

    const wallet = (
      await db.doc(`wallets/${prop.address.toLowerCase()}`).get()
    ).data();

    const [{ data: balance }, { data: txs }] = await Promise.all([
      axios.get(
        `https://api.etherscan.io/api?module=account&action=balance&address=${prop.address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`,
        { headers: { 'Content-Type': 'application/json' } },
      ),
      axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${prop.address}&page=1&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`,
        { headers: { 'Content-Type': 'application/json' } },
      ),
    ]);

    wallet['balance'] = ethers.utils.formatEther(balance.result);

    if (txs.result.length)
      wallet['firstTxTS'] = +txs.result[0].timeStamp * 1000;

    return wallet;
  }

  async setFavorite(prop: { address: string; isFavorite: boolean }) {
    const db = admin.firestore();

    await db.doc(`wallets/${prop.address.toLowerCase()}`).update({
      isFavorite: prop.isFavorite,
    });
  }
}
