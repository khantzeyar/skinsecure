import { db } from "@/db/index";
import { productApprovedCsv} from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const acceptedProducts = await db
      .select()
      .from(productApprovedCsv);

    return NextResponse.json(acceptedProducts);
  } catch (error) {
    console.error("Error fetching approved products:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
