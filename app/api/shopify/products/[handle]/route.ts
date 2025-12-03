import { getProductByHandle } from "@/lib/shopify";
import type { NextRequest, NextResponse } from "next";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ handle: string }> }
): Promise<NextResponse> {
  try {
    const { handle } = await params;
    const product = await getProductByHandle(handle);

    if (!product) {
      return Response.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return Response.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
