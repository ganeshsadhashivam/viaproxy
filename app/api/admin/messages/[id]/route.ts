import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig/db";
import { Message } from "@/models/adminmodels/Message";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    await Message.findByIdAndDelete(params.id);
    return NextResponse.json(
      { message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
