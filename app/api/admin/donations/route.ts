import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig/db";
import { Donation } from "@/models/adminmodels/Donation";

export async function GET() {
  await connectToDatabase();
  try {
    const donations = await Donation.find();
    return NextResponse.json(donations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
