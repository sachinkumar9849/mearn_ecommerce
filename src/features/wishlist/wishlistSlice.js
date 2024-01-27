import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToWishlistApi,
  removeFromWishlistApi,
  getWishlistApi,
} from "./wishlistAPI";

export const getWishlistThunk = createAsyncThunk(
  "wishlist/getWishlist",
  async () => {
    try {
      const response = await getWishlistApi();
     
      return response.products; // Assuming the array of products is in a 'products' property
    } catch (error) {
      
      throw error;
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId) => {
    const response = await addToWishlistApi(productId);
    return response.data;
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId) => {
    const response = await removeFromWishlistApi(productId);
    return { productId, data: response.data }; // Ensure productId is included
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: { products: [] },
    status: "idle",
  },

  extraReducers: (builder) => {
    builder
      .addCase(getWishlistThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWishlistThunk.fulfilled, (state, action) => {
        state.status = "idle";

        state.wishlist = { products: action.payload };
      })

      .addCase(addToWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.status = "idle";
        state.wishlist = action.payload;
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.status = "idle";
        const updatedWishlist = state.wishlist.products.filter(
          (product) => product.id !== action.payload.productId
        );
        state.wishlist = { products: updatedWishlist };
      });
  },
});

export default wishlistSlice.reducer;
