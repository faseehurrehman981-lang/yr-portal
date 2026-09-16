import { NextResponse } from "next/server";
import { db } from "@/db";
import { rides } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status, driverId } = body;

    if (!status) {
      return NextResponse.json({ error: "Missing status" }, { status: 400 });
    }

    const updateData: any = { status };
    if (driverId && status === "ACCEPTED") {
      updateData.driverId = driverId;
    }
    if (status === "COMPLETED") {
      updateData.completedAt = new Date();
    }

    const updatedRide = await db
      .update(rides)
      .set(updateData)
      .where(eq(rides.id, id))
      .returning();

    if (updatedRide.length === 0) {
      return NextResponse.json({ error: "Ride not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Ride status updated", ride: updatedRide[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update ride status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
