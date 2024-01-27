import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdAsync, searchProductsAsync } from "../productSlice";
import { selectAllProducts, selectProductListStatus } from "../productSlice";
import { discountedPrice } from "../../../app/constants";
import { StarIcon } from "@heroicons/react/24/outline";
import NavBar from "../../navbar/Navbar";
import Footer from "../../common/Footer";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarRating from "../../common/StarRating";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";

function SearchResultsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");
  const items = useSelector(selectItems);
  const params = useParams();

  useEffect(() => {
    if (keyword) {
      dispatch(searchProductsAsync(keyword));
    }
  }, [dispatch, keyword]);

  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductListStatus);

  // add to cart
  const handleAdd = (product) => {
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      console.log({ items, product });
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      dispatch(addToCartAsync(newItem));
      // toast.success("Item Added To Cart");
      toast.success({ message: "Item Added To Cart" });
    } else {
      toast.warning("Item Already Added");
    }
  };


  return (
    <>
      <NavBar>
        <div className="mx-auto max-w-7xl">
          {status === "loading" && <p>Loading...</p>}
          {status === "error" && <p>Error fetching search results.</p>}
          {status === "idle" && (
            <div>
              <div className="my-10">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                  <span className="text-green-600 capitalize">
                    {products.length > 0
                      ? `${keyword} :Total Items- ${products.length}`
                      : "No results found"}
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-4 gap-8">
                {products.map((product) => (
                  <div className="single_product-wrap relative bg-white shadow-md">
                    <div className="cart_wrap flex flex-col">
                      <Link
                        className="mb-2"
                        to={`/product-detail/${product.id}`}
                        key={product.id}
                      >
                        <RemoveRedEyeIcon />
                      </Link>
                      {/* <button onClick={() => onAddToWishlist(product.id)}>
                               <FavoriteBorderIcon />
                             </button> */}
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
                ))}
              </div>
            </div>
          )}
        </div>
      </NavBar>
      <Footer />
    </>
  );
}

export default SearchResultsPage;
