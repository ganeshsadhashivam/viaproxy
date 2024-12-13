import { NextResponse } from "next/server";

import ProductForProductExchange from "@/models/student/ProductForProductExchangeModel";
import dbConnect from "@/utils/dbConnect";
import { NextRequest } from "next/server";
import { getUserIdFromToken } from "@/utils/auth";

// Connect to database
await dbConnect();

// Fetch all exchanges (GET)
export async function GET() {
  try {
    const exchanges = await ProductForProductExchange.find().populate(
      "createdBy"
    );
    return NextResponse.json(exchanges, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching exchanges", error },
      { status: 500 }
    );
  }
}

// Create a new exchange (POST)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { submitExchangeDetails, expectedRequirements, status } = body;
    console.log("submitExchangeDetails", submitExchangeDetails);
    console.log("expectedRequirements", expectedRequirements);
    console.log("status", status);

    // Get user ID from token
    const createdBy = getUserIdFromToken(req);
    console.log(createdBy);
    if (!createdBy) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid or missing token" },
        { status: 401 }
      );
    }

    // Create a new exchange
    const newExchange = new ProductForProductExchange({
      submitExchangeDetails,
      expectedRequirements,
      status,
      createdBy,
    });

    const savedExchange = await newExchange.save();
    return NextResponse.json(savedExchange, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating exchange", error },
      { status: 500 }
    );
  }
}
