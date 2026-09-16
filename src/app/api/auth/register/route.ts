import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phoneNumber, password } = body;

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user
    const newUser = await db
      .insert(users)
      .values({
        firstName,
        lastName,
        email,
        phoneNumber,
        passwordHash,
      })
      .returning({ id: users.id, email: users.email });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser[0] },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === "23505") { // unique_violation
      return NextResponse.json(
        { error: "User with this email or phone number already exists" },
        { status: 409 }
      );
    }
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
