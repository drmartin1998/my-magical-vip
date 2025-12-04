import { getStoreInfo } from "@/lib/shopify";
import type { NextRequest } from "next/server";

export async function GET(_req: NextRequest): Promise<Response> {
  try {
    const storeInfo = await getStoreInfo();
    return Response.json(storeInfo);
  } catch (error) {
    console.error("Error fetching store info:", error);
    return Response.json({ error: "Failed to fetch store info" }, { status: 500 });
  }
}
