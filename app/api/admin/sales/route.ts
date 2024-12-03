import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig/db";
import { Sale } from "@/models/adminmodels/Sale";

export async function GET() {
  await connectToDatabase();
  try {
    const sales = await Sale.find();
    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
