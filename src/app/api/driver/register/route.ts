import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, vehicles } from "@/db/schema";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phoneNumber, password, vehicleType, make, model, year, licensePlate } = body;

    if (!firstName || !lastName || !email || !phoneNumber || !password || !vehicleType || !make || !model || !year || !licensePlate) {
      return NextResponse.json(
        { error: "Missing required fields for driver registration" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let newUser, newVehicle;

    // Transaction to insert user and vehicle atomically
    await db.transaction(async (tx) => {
      // 1. Insert Driver User
      const userResult = await tx
        .insert(users)
        .values({
          firstName,
          lastName,
          email,
          phoneNumber,
          passwordHash,
          role: "DRIVER",
        })
        .returning({ id: users.id, email: users.email });

      newUser = userResult[0];

      // 2. Insert Vehicle for that Driver
      const vehicleResult = await tx
        .insert(vehicles)
        .values({
          driverId: newUser.id,
          type: vehicleType,
          make,
          model,
          year,
          licensePlate,
          status: "ACTIVE", // Active immediately based on user confirmation
        })
        .returning();

      newVehicle = vehicleResult[0];
    });

    return NextResponse.json(
      { message: "Driver registered successfully", user: newUser, vehicle: newVehicle },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === "23505") { // unique_violation
      return NextResponse.json(
        { error: "Email, Phone Number, or License Plate is already in use" },
        { status: 409 }
      );
    }
    console.error("Driver Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
