import { NextResponse } from "next/server";
import { db } from "@/db";
import { rides } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerId, pickupLocation, destination, rideType, fare } = body;

    if (!customerId || !pickupLocation || !destination || !rideType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert new ride request
    const newRide = await db
      .insert(rides)
      .values({
        customerId,
        pickupLocation,
        destination,
        rideType,
        fare,
        status: "REQUESTED",
      })
      .returning();

    return NextResponse.json(
      { message: "Ride requested successfully", ride: newRide[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ride request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
