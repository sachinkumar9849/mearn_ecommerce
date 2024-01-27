export const getWishlistApi = async () => {
  const response = await fetch("http://localhost:8080/wishlist", {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  const data = await response.json();
 
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

    
    return response.json();
  } catch (error) {
   
    throw error;
  }
};
