import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig/db";
import { Alert } from "@/models/adminmodels/Alert";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    await Alert.findByIdAndDelete(params.id);
    return NextResponse.json(
      { message: "Alert dismissed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
