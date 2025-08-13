import { db } from "@/db/index";
import { combinedProducts } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { ilike, and, or, isNull, eq } from "drizzle-orm/pg-core/expressions";
import { sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Pagination
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "12", 10);
    const offset = (page - 1) * pageSize;

    // Filters
    const status = searchParams.get("status"); 
    const search = searchParams.get("search") || "";
    const ingredientParam = searchParams.get("ingredient"); 

    // Build where clause
    const whereClauses = [];

    // Status filter
    if (status === "approved") {
      whereClauses.push(
        or(
          isNull(combinedProducts.substance_detected),
          eq(combinedProducts.substance_detected, "")
        )
      );
    } else if (status === "cancelled") {
      whereClauses.push(ilike(combinedProducts.substance_detected, "%"));
    }

    // Search filter
    if (search) {
      whereClauses.push(
        or(
          ilike(combinedProducts.product, `%${search}%`),
          ilike(combinedProducts.notif_no, `%${search}%`)
        )
      );
    }

    // Multi-ingredient filter (match ANY)
    if (ingredientParam) {
      const ingredientsArr = ingredientParam.split(",").map((s) => s.trim()).filter(Boolean);
      if (ingredientsArr.length > 0) {
        whereClauses.push(
          or(...ingredientsArr.map((ing) =>
            ilike(combinedProducts.substance_detected, `%${ing}%`)
          ))
        );
      }
    }

    // Count total for pagination
    const totalQuery = db
      .select({ count: sql<number>`count(*)` })
      .from(combinedProducts)
      .where(whereClauses.length ? and(...whereClauses) : undefined);

    const [{ count: total }] = await totalQuery;

    // Main query
    const products = await db
      .select()
      .from(combinedProducts)
      .where(whereClauses.length ? and(...whereClauses) : undefined)
      .limit(pageSize)
      .offset(offset);

    return NextResponse.json({ products, total: Number(total) });
  } catch (error) {
    console.error("Error fetching combined products:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}