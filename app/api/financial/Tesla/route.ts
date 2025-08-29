// app/api/tesla/route.ts
import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/db/mongodb";

export async function GET() {
  const db = await getMongoDb();

  // pull just one Tesla doc (10-Q)
  const doc = await db.collection("Tesla").findOne({});

  if (!doc) {
    return NextResponse.json({ error: "No data" }, { status: 404 });
  }

  const usGaap = doc.facts?.["us-gaap"] || {};

  function extractVal(field: any) {
    if (!field) return 0;
    const usd = field.units?.USD;
    if (Array.isArray(usd) && usd.length > 0) {
      return usd[usd.length - 1].val || 0; // take the latest
    }
    return 0;
  }

  const summary = {
    company: doc.entityName || "Tesla, Inc.",
    revenues: extractVal(usGaap.Revenues),
    salesGoods: extractVal(usGaap.SalesRevenueGoodsNet),
    salesServices: extractVal(usGaap.SalesRevenueServicesNet),
    salesEnergy: extractVal(usGaap.SalesRevenueEnergyServices),
    costOfRevenue: extractVal(usGaap.CostOfRevenue),
    grossProfit: extractVal(usGaap.GrossProfit),
    netIncome: extractVal(usGaap.NetIncomeLoss),
  };

  return NextResponse.json(summary);
}
