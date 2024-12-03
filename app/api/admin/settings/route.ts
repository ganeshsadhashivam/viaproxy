import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig/db";
import { Setting } from "@/models/adminmodels/Settings";

export async function GET() {
  await connectToDatabase();
  try {
    const settings = await Setting.find();
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  await connectToDatabase();
  try {
    const updates = await request.json();
    const updatedSettings = await Setting.updateMany({}, updates, {
      new: true,
    });
    return NextResponse.json(updatedSettings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
