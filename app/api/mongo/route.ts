// app/api/tesla/route.ts
import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/db/mongodb";

export async function GET() {
  const db = await getMongoDb();

  // choose your collection
  const tesla = await db.collection("Tesla").find({}).toArray();

  return NextResponse.json(tesla);
}
