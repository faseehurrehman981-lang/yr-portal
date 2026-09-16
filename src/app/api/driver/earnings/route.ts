import { NextResponse } from "next/server";
import { db } from "@/db";
import { rides, payments } from "@/db/schema";
import { eq, sum, count } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    // In production, driverId would come from the auth token
    const driverId = new URL(req.url).searchParams.get("driverId");
    
    if (!driverId) {
      return NextResponse.json({ error: "Driver ID required" }, { status: 400 });
    }

    // This is a simplified aggregated query for MVP
    // We would typically filter by Date ranges (today, this week) 
    const result = await db
      .select({
        totalRides: count(rides.id),
        grossEarnings: sum(payments.amount),
      })
      .from(rides)
      .leftJoin(payments, eq(rides.id, payments.rideId))
      .where(eq(rides.driverId, driverId));

    const gross = parseFloat(result[0]?.grossEarnings || "0");
    const totalRides = result[0]?.totalRides || 0;
    
    // YR Commission is 15%
    const yrCommission = gross * 0.15;
    const netEarnings = gross - yrCommission;

    return NextResponse.json(
      { 
        totalRides,
        grossEarnings: gross,
        yrCommission,
        netEarnings 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch earnings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
