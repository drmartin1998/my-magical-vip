"use client";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
}

export default function AddToCartButton({
  productId,
  productName,
}: AddToCartButtonProps) {
  const handleAddToCart = async () => {
    try {
      const response = await fetch("/api/shopify/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineItems: [
            {
              merchandiseId: productId,
              quantity: 1,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create cart");
      }

      const cart = await response.json();

      // Redirect to checkout URL
      if (cart.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-bold py-3 rounded-lg transition-all shadow-md"
    >
      Get Started
    </button>
  );
}
