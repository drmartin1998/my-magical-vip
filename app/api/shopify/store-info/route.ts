import { getStoreInfo } from "@/lib/shopify";
import type { NextResponse } from "next";

export async function GET(): Promise<NextResponse> {
  try {
    const storeInfo = await getStoreInfo();
    return Response.json(storeInfo);
  } catch (error) {
    console.error("Error fetching store info:", error);
    return Response.json(
      { error: "Failed to fetch store information" },
      { status: 500 }
    );
  }
}
