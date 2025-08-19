import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_DB_URL;
if (!uri) {
  throw new Error("MONGO_DB_URL not set");
}

let client: MongoClient | null = null;
let db: Db | null = null;

declare global {
  var _mongoClient: MongoClient | undefined;
}

export async function getMongoDb() {
  try {
    if (db) return db;
    if (!client) {
      client = global._mongoClient ?? new MongoClient(uri!);
      if (process.env.NODE_ENV === "development") {
        global._mongoClient = client;
      }
      await client.connect();
    }
    db = client.db("FinancialData");
    return db;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
