import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig/db";
import { Mediation } from "@/models/adminmodels/Mediation";

export async function GET() {
  await connectToDatabase();
  try {
    const mediations = await Mediation.find();
    return NextResponse.json(mediations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
