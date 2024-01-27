import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistApi } from "../wishlistAPI";
import { getWishlistThunk, removeFromWishlist } from "../wishlistSlice";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import { discountedPrice } from "../../../app/constants";
import {
  fetchProductByIdAsync,
  selectAllProducts,
  selectProductListStatus,
} from "../../product/productSlice";
import NavBar from "../../navbar/Navbar";
import Footer from "../../common/Footer";
import StarRating from "../../common/StarRating";

// Import necessary components from 'react-tooltip'
import {
  Tooltip,
  TooltipProvider,
  TooltipWrapper,
  removeStyle,
} from "react-tooltip";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const status = useSelector(selectProductListStatus);
  const params = useParams();

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.error("Product removed from wishlist!");
  };

  useEffect(() => {
    dispatch(getWishlistThunk());
  }, [dispatch]);

  // add product function

  const handleAdd = (product) => {
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      console.log({ items, product });
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      dispatch(addToCartAsync(newItem));
      toast.success("Item Added To Cart");
    } else {
      toast.warning("Item Already Added");
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      <NavBar>
        <div className="mx-auto max-w-7xl mt-14">
          <div className="mb-7">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Wishlist
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {status === "loading" ? (
  <p>Loading wishlist...</p>
) : (
  wishlist &&
  wishlist.products && // Check if wishlist.products is defined
  wishlist.products.map((product) => (
                <div className="single_product-wrap relative bg-white shadow-md">
                  <div className="cart_wrap flex flex-col">
                    <Link
                      className="mb-2"
                      to={`/product-detail/${product.id}`}
                      key={product.id}
                    >
                      <RemoveRedEyeIcon />
                    </Link>

                    <button
                      className=""
                      onClick={() => handleRemoveFromWishlist(product.id)}
                    >
                      <DeleteOutlineIcon />
                    </button>
                  </div>

                  <div className="">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="single_product w-full object-cover border border-1"
                    />
                    <div className="mt-3 mb-3">
                      <div className="flex justify-between">
                        <div className="py-0 px-5">
                          <h4 className="text-xl font-semibold">
                            {product.title.substring(0, 11)}
                            {/* Display only the first 10 characters */}
                            {product.title.length > 10 && ".."}
                            {/* Show ellipsis if title is longer */}
                          </h4>
                        </div>

                        <div className="flex-none">
                          <div className="">
                            <span className="rating_icons flex items-center text-gray-400 mr-3 uppercase text-xs">
                              <StarRating
                                rating={product.rating}
                                style={{ width: "22" }}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-center">
                      <div className="product_price pl-5">
                        <h5 className="">
                          <del>
                            <p className="text-sm text-left text-gray-600 cursor-auto">
                              ${product.price}
                            </p>
                          </del>
                          <p className="text-lg font-semibold text-black cursor-auto">
                            ${discountedPrice(product)}
                          </p>
                        </h5>
                      </div>
                      <div className="">
                        <div className="">
                          <button
                            className="btn bg-orange w-full py-3 px-7 text-white block transition  hover:bg-blue-900"
                            onClick={() => handleAdd(product)}
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <ToastContainer />
          <Tooltip effect="solid" />
        </div>
      </NavBar>
      <Footer />
    </>
  );
};

export default Wishlist;
