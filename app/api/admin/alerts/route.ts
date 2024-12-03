import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig/db";
import { Alert } from "@/models/adminmodels/Alert";

export async function GET() {
  await connectToDatabase();
  try {
    const alerts = await Alert.find();
    return NextResponse.json(alerts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
