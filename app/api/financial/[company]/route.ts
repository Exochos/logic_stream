// app/api/financial/[company]/route.ts
import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/db/mongodb";

export async function GET(req: Request, context: { params: { company: string } }) {
  const { company } = await context.params; // 👈 await here

  const db = await getMongoDb();
  const doc = await db.collection(company).findOne({});

  if (!doc) {
    return NextResponse.json({ error: "No data" }, { status: 404 });
  }

  const usGaap = doc["us-gaap"] || {};

  const summary = {
    company,
    revenues: usGaap.Revenues?.value,
    revenueFromContracts: usGaap.RevenueFromContractWithCustomerExcludingAssessedTax?.value,
    salesGoods: usGaap.SalesRevenueGoodsNet?.value,
    salesServices: usGaap.SalesRevenueServicesNet?.value,
    salesEnergy: usGaap.SalesRevenueEnergyServices?.value,
    costOfRevenue: usGaap.CostOfRevenue?.value,
    grossProfit: usGaap.GrossProfit?.value,
    operatingIncome: usGaap.OperatingIncomeLoss?.value,
    netIncome: usGaap.NetIncomeLoss?.value,
  };

  return NextResponse.json(summary);
}
