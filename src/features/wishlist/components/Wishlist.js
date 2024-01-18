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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import { discountedPrice } from "../../../app/constants";
import { selectProductListStatus } from "../../product/productSlice";
import NavBar from "../../navbar/Navbar";
import Footer from "../../common/Footer";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const status = useSelector(selectProductListStatus);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.error('Product removed from wishlist!');

  };

  useEffect(() => {
    dispatch(getWishlistThunk());
  }, [dispatch]);

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
              wishlist.products &&
              wishlist.products.map((product) => (
                <div
                  className="bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500"
                  key={product.id} // Add a key prop
                >
                  <Link to={`/product-detail/${product.id}`}>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-80 w-72 object-cover border border-1"
                    />
                  </Link>
                  <div className="px-4 py-3">
                    <span className="rating_icons flex items-center text-gray-400 mr-3 uppercase text-xs">
                      {product.rating}
                    </span>
                    <p className="text-lg font-bold text-black truncate block capitalize">
                      {product.title}
                    </p>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black cursor-auto my-3">
                        ${discountedPrice(product)}
                      </p>
                      <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">
                          ${product.price}
                        </p>
                      </del>
                      <button
                        onClick={() => handleRemoveFromWishlist(product.id)}
                      >
                        Remove from Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <ToastContainer />

        </div>
      </NavBar>
      <Footer />
    </>
  );
};

export default Wishlist;
