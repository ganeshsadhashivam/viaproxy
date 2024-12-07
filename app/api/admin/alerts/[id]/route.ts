import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/dbConnect";
import { Alert } from "@/models/admin/Alert";

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context; // Extract params from context
  await connectToDatabase();
  try {
    await Alert.findByIdAndDelete(params.id);
    return NextResponse.json(
      { message: "Alert dismissed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error || "An error occurred" },
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
