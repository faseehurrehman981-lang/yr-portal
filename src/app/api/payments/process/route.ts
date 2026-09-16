import { NextResponse } from "next/server";
import { db } from "@/db";
import { payments, rides } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rideId, amount, method } = body;

    if (!rideId || !amount || !method) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let newPayment;
    
    // Process transaction atomically
    await db.transaction(async (tx) => {
      // 1. Create Payment Record
      const paymentResult = await tx
        .insert(payments)
        .values({
          rideId,
          amount: amount.toString(), // DB takes decimal/numeric string
          method,
          status: "COMPLETED",
        })
        .returning();
        
      newPayment = paymentResult[0];

      // 2. Update Ride Payment Status
      await tx
        .update(rides)
        .set({ paymentStatus: "COMPLETED" })
        .where(eq(rides.id, rideId));
    });

    return NextResponse.json(
      { message: "Payment processed successfully", payment: newPayment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
