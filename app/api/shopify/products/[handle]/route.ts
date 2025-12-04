import { getProductByHandle } from "@/lib/shopify";
import type { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ handle: string }> }
): Promise<Response> {
  try {
    const { handle } = await context.params;
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
