import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig/db";
import { Message } from "@/models/adminmodels/Message";

export async function GET() {
  await connectToDatabase();
  try {
    const messages = await Message.find();
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
