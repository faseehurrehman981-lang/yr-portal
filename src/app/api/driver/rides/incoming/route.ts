import { NextResponse } from "next/server";
import { db } from "@/db";
import { rides, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    // In a real app, we would verify the driver's JWT and get their vehicle type
    // and location to match rides. For MVP, we'll return all REQUESTED rides.
    
    const incomingRides = await db
      .select({
        id: rides.id,
        pickupLocation: rides.pickupLocation,
        destination: rides.destination,
        fare: rides.fare,
        rideType: rides.rideType,
        customerName: users.firstName,
      })
      .from(rides)
      .leftJoin(users, eq(rides.customerId, users.id))
      .where(eq(rides.status, "REQUESTED"));

    return NextResponse.json(
      { rides: incomingRides },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch incoming rides error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
