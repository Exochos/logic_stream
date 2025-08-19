// lib/mongo.ts
import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_DB_URL) {
  throw new Error("MONGO_DB_URL not set");
}

const client = new MongoClient(process.env.MONGO_DB_URL);

let cachedDb: Db | null = null;

export async function getMongoDb() {
  if (!cachedDb) {
    await client.connect(); 
    cachedDb = client.db("FinancialData");
  }
  return cachedDb;
}
export async function closeMongoConnection() {
  if (cachedDb) {
    await client.close();
    cachedDb = null;
  }
}
