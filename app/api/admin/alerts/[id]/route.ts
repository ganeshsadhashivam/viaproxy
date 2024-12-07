import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/dbConnect";
import { Alert } from "@/models/admin/Alert";

export async function DELETE(
  request: NextRequest,
  context: { params: Record<string, string> } // Use Record to allow dynamic keys
) {
  const { id } = context.params; // Extract `id` directly from `context.params`
  await connectToDatabase();

  try {
    const deletedAlert = await Alert.findByIdAndDelete(id);
    if (!deletedAlert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Alert dismissed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
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
