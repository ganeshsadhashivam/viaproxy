import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig/db";
import { Sale } from "@/models/adminmodels/Sale";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    const { status } = await request.json();
    const sale = await Sale.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );
    return NextResponse.json(sale, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
