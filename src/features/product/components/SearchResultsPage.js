import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProductsAsync } from "../productSlice";
import { selectAllProducts, selectProductListStatus } from "../productSlice";
import { discountedPrice } from "../../../app/constants";
import { StarIcon } from "@heroicons/react/24/outline";
import NavBar from "../../navbar/Navbar";
import Footer from "../../common/Footer";

function SearchResultsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  useEffect(() => {
    if (keyword) {
      dispatch(searchProductsAsync(keyword));
    }
  }, [dispatch, keyword]);

  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductListStatus);

  return (
    <>
      <NavBar>
        <div class="mx-auto max-w-7xl">
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
                  <div className="col-span-1">
                    <div className="bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500">
                      <Link
                        to={`/product-detail/${product.id}`}
                        key={product.id}
                      >
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-80 w-72 object-cover border border-1"
                        />
                      </Link>
                      <div className="px-4 py-3">
                        <span className="rating_icons flex items-center text-gray-400 mr-3 uppercase text-xs">
                          <StarIcon className="w-6 h-6 inline"></StarIcon>
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
                          <div className="ml-auto">
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                fill="currentColor"
                                className="bi bi-bag-plus"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                                />
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                              </svg>
                            </a>
                          </div>
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
