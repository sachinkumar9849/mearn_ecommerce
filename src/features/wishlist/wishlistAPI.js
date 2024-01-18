export const getWishlistApi = async () => {
  const response = await fetch("http://localhost:8080/wishlist", {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  const data = await response.json();
  console.log("API Response - Wishlist:", data);
  return data;
};

export const addToWishlistApi = async (productId) => {
  // Implement API call to add a product to the wishlist
  const response = await fetch("http://localhost:8080/wishlist", {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const removeFromWishlistApi = async (productId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/wishlist/${productId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log("removeFromWishlistApi - API Response:", response);
    return response.json();
  } catch (error) {
    console.error("removeFromWishlistApi - API Error:", error);
    throw error;
  }
};
