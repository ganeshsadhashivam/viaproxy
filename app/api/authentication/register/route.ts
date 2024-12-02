import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import User from "@/models/User";
import sendEmail from "@/utils/sendEmail";
import { NextRequest } from "next/server";
import connect from "@/utils/dbConnect";

export async function POST(req: NextRequest) {
  await connect();
  try {
    const { username, email, password } = await req.json();
    console.log(username, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    console.log(verificationToken);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
    });

    await newUser.save();

    const verificationLink = `${process.env.BASE_URL}/authentication/verify?token=${verificationToken}`;
    console.log("ver Link", verificationLink);
    await sendEmail(
      email,
      "Verify Your Email",
      `
            <p>Click <a href="${verificationLink}">here</a> to verify your email.</p>
        `
    );

    return new Response(
      JSON.stringify({ message: "User created. Verification email sent." }),
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as any).message
        : "An unknown error occurred";

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
    });
  }
}
