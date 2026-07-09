// lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
if (!DATABASE_NAME) {
  throw new Error('Please define the DATABASE_NAME environment variable inside .env.local');
}

class MongoDB {
  private static client: MongoClient | null = null;
  private static db: Db | null = null;

  static async connect(): Promise<{ client: MongoClient; db: Db }> {
    if (MongoDB.client && MongoDB.db) {
      return { client: MongoDB.client, db: MongoDB.db };
    }

    const client = new MongoClient(MONGODB_URI!);
    await client.connect();

    const db = client.db(DATABASE_NAME);
    console.log('✅ MongoDB connection established');

    MongoDB.client = client;
    MongoDB.db = db;

    return { client, db };
  }

  static async getDb(): Promise<Db> {
    const { db } = await MongoDB.connect();
    return db;
  }

  static async close(): Promise<void> {
    if (MongoDB.client) {
      await MongoDB.client.close();
      MongoDB.client = null;
      MongoDB.db = null;
      console.log('MongoDB connection closed');
    }
  }
}

export { MongoDB };
export default MongoDB;