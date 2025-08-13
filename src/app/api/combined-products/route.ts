import { db } from "@/db/index";
import { combinedProducts } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db.select().from(combinedProducts);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching combined products:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}