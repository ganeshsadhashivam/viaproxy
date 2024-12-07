import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/dbConnect";
import { Alert } from "@/models/admin/Alert";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // Ensure the database connection is established
    await connectToDatabase();

    const alertId = params?.id;
    if (!alertId) {
      return NextResponse.json(
        { error: "Missing or invalid alert ID" },
        { status: 400 }
      );
    }

    const deletedAlert = await Alert.findByIdAndDelete(alertId);

    if (!deletedAlert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Alert dismissed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting alert:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import connectToDatabase from "@/utils/dbConnect";
// import { Alert } from "@/models/admin/Alert";

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   await connectToDatabase();
//   try {
//     await Alert.findByIdAndDelete(params.id);
//     return NextResponse.json(
//       { message: "Alert dismissed successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 500 });
//   }
// }
