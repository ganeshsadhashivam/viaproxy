import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig/db";
import { Donation } from "@/models/adminmodels/Donation";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    const { status } = await request.json();
    const donation = await Donation.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );
    return NextResponse.json(donation, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
