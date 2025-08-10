import { db } from "@/db/index";
import { productCancelledCsv } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cancelledProducts = await db
      .select()
      .from(productCancelledCsv);

    return NextResponse.json(cancelledProducts);
  } catch (error) {
    console.error("Error fetching cancelled products:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}