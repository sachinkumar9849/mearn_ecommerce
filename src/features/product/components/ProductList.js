import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductByIdAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectProductListStatus,
  selectTotalItems,
} from "../productSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useParams } from "react-router-dom";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import Pagination from "../../common/Pagination";
import { Grid } from "react-loader-spinner";
import Slider from "../../common/Slider";
import { addToWishlist, getWishlistThunk } from "../../wishlist/wishlistSlice";
import StarRating from "../../common/StarRating";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const totalItems = useSelector(selectTotalItems);
  const status = useSelector(selectProductListStatus);
  const [addedProducts, setAddedProducts] = useState([]);
  const items = useSelector(selectItems);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const params = useParams();

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [page, setPage] = useState(1);

  const handleFilter = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = { ...filter };
    // TODO : on server it will support multiple categories
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log({ newFilter });

    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    console.log({ sort });
    setSort(sort);
  };

  const handlePage = (page) => {
    console.log({ page });
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
    // TODO : Server will filter deleted products
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, []);

  const handleAddToWishlist = async (productId) => {
    try {
      // Check if the product is already in the wishlist
      const isProductInWishlist = wishlist.products.some(
        (product) => product.id === productId
      );

      if (isProductInWishlist) {
        toast.warning("Product is already in the wishlist!");
      } else {
        // Dispatch the addToWishlist action
        await dispatch(addToWishlist(productId));

        // Fetch the updated wishlist data
        await dispatch(getWishlistThunk());

        // Show a toast notification
        toast.success("Product added to wishlist!");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  useEffect(() => {
    // Reset the addedProducts state when the wishlist changes
    setAddedProducts([]);
  }, [wishlist]);

  useEffect(() => {
    // Change the function name from getWishlist to getWishlistThunk
    dispatch(getWishlistThunk());
  }, [dispatch]);

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

  return (
    <div className="mt-11">
      <div className="mx-auto max-w-7xl grid grid-col-1">
        <div className="grid lg:grid-cols-7 gap-4">
          <div className="col-span-5">
            <Slider />
          </div>
          <div className="col-span-2">
            {products &&
              products.slice(-2).map((product, index) => (
                <div
                  className="border  single_product-right relative bg-white shadow-md"
                  key={index}
                >
                  <div className="overflow-hidden">
                    <Link to={`/product-detail/${product.id}`}>
                    <img
  src={product.thumbnail}
  alt={product.title}
  className="single_product w-full  object-cover border border-1 transition-transform transform-gpu hover:scale-90"
/>

                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div>
        <MobileFilter
          handleFilter={handleFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
        ></MobileFilter>

        <main className="mx-auto max-w-7xl mt-14">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 capitalize">
              All available products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="px-4 py-2 border border-width-1 border-gray-300 group inline-flex justify-center text-lg font-medium text-gray-700 hover:text-gray-900">
                    Sort By
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={(e) => handleSort(e, option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilter
                handleFilter={handleFilter}
                filters={filters}
              ></DesktopFilter>
              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductGrid
                  products={products}
                  status={status}
                  wishlist={wishlist}
                  onAddToWishlist={handleAddToWishlist}
                  handleAdd={handleAdd}
                ></ProductGrid>
              </div>
              {/* Product grid end */}
            </div>
          </section>

          {/* section of product and filters ends */}
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalItems}
          ></Pagination>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function DesktopFilter({ handleFilter, filters }) {
  const [showMore, setShowMore] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(10);

  const handleShowMoreToggle = () => {
    setShowMore(!showMore);
    // Reset to default number of items when toggling between show more and show less
    setItemsToShow(10);
  };

  const handleShowMore = () => {
    setItemsToShow(itemsToShow + 10);
    setShowMore(true);
  };

  const handleShowLess = () => {
    setShowMore(false);
    setItemsToShow(10);
  };

  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 mb-6 bg-white"
        >
          {({ open }) => (
            <>
              <div className="category_title">
                <h2 className="flex justify-between items-center">
                  {section.name}
                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                </h2>
              </div>

              {section.options
                .slice(0, showMore ? section.options.length : itemsToShow)
                .map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center py-2 px-3"
                  >
                    <input
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      defaultValue={option.value}
                      type="checkbox"
                      defaultChecked={option.checked}
                      onChange={(e) => handleFilter(e, section, option)}
                      className="h-4 w-4 rounded-0 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="capitalize ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}

              {section.options.length > itemsToShow && (
                <div className="flex mt-2 ml-3">
                  <button
                    type="button"
                    className="text-sm text-blue-500 cursor-pointer"
                    onClick={showMore ? handleShowLess : handleShowMoreToggle}
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </button>
                </div>
              )}
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}

function ProductGrid({
  products,
  status,

  onAddToWishlist,

  handleAdd,
}) {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {status === "loading" ? (
          <Grid
            height="80"
            width="80"
            color="rgb(79, 70, 229) "
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : null}

        {products &&
          products.map((product, index) => (
            <div
              className="single_product-wrap relative bg-white shadow-md"
              key={index}
            >
              <div className="cart_wrap flex flex-col">
                {product.id && (
                  <Link
                    className="mb-2"
                    to={`/product-detail/${product.id}`}
                    key={product.id}
                  >
                    <RemoveRedEyeIcon />
                  </Link>
                )}
                <button onClick={() => onAddToWishlist(product.id)}>
                  <FavoriteBorderIcon />
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
  );
}
