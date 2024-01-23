import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import { selectLoggedInUser } from "../auth/authSlice";
import { selectUserInfo } from "../user/userSlice";
import { FaRegUserCircle } from "react-icons/fa";
import SearchComponent from "../product/components/SearchComponent";

import { addToWishlist, getWishlistThunk } from "../wishlist/wishlistSlice";

const navigation = [
  { name: "Home", link: "/", user: true },

  { name: "My Orders", link: "/orders", user: true },
  { name: "Cart", link: "/cart", user: true },
  { name: "Wishlist", link: "/wishlist", user: true },
  { name: "My Account", link: "/profile", user: true },

  { name: "Products", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
];
const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ children }) {
  const dispatch = useDispatch(); // Ensure you import useDispatch from react-redux

  const items = useSelector(selectItems);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const wishlistLength = wishlist?.products?.length || 0;
  const userInfo = useSelector(selectUserInfo);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Dispatch getWishlistThunk to fetch wishlist data
    dispatch(getWishlistThunk());

    const handleScroll = () => {
      const offset = window.scrollY;

      if (offset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  return (
    <>
      {userInfo && (
        <div className="min-h-full">
          <Disclosure as="nav" className="">
            {({ open }) => (
              <>
                <div
                  className={`sticky_header header_search bg-orange py-3 ${
                    isSticky ? "sticky" : ""
                  }`}
                >
                  <div className="mx-auto max-w-7xl grid grid-cols-6 header_top items-center">
                    <div className="col-span-1">
                      <div className="">
                        <Link to="/">
                          <img
                            src={`${process.env.PUBLIC_URL}/img/logo.png`}
                            className="logo_nav h-full object-cover rounded-2xl"
                            alt="page img"
                          />
                        </Link>
                      </div>
                    </div>

                    <div className="col-span-4">
                      <SearchComponent />
                    </div>
                    <div className="col-span-1 flex justify-end items-center">
                      <div className="mr-2">
                        <div className="cart_list-wrap  flex items-center">
                          <Link to="/wishlist">
                            <button
                              type="button"
                              className="rounded-full focus:outline-none"
                            >
                              <span className="sr-only">
                                View notifications
                              </span>
                              <FavoriteOutlinedIcon />
                            </button>
                          </Link>
                          {wishlistLength > 0 && (
                            <span className="cart_item inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                              {wishlistLength}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="cart_list-wrap  flex items-center">
                        <Link to="/cart">
                          <button
                            type="button"
                            className="rounded-full  focus:outline-none"
                          >
                            <span className="sr-only">View notifications</span>

                            <AddShoppingCartOutlinedIcon />
                          </button>
                        </Link>
                        {items.length > 0 && (
                          <span className="cart_item inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {items.length}
                          </span>
                        )}
                      </div>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-2">
                        <div>
                          <Menu.Button className="user_icons flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <AccountCircleOutlinedIcon />
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
                <div className="bg-orange">
                  <div className="mx-auto max-w-7xl grid grid-cols-1">
                    <div className="col-span-1">
                      <div className="py-4">
                        {navigation.map((item) =>
                          item[userInfo.role] ? (
                            <Link
                              key={item.name}
                              to={item.link}
                              className="font-medium pr-8 text-white transition-all duration-300"
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          ) : null
                        )}

                        <div className="flex md:hidden">
                          {/* Mobile menu button */}
                          <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                              <XMarkIcon
                                className="block h-6 w-6"
                                aria-hidden="true"
                              />
                            ) : (
                              <Bars3Icon
                                className="block h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </Disclosure.Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={userInfo.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {/* this should come from userInfo */}
                          {userInfo.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {userInfo.email}
                        </div>
                      </div>
                      <Link to="/cart">
                        <button
                          type="button"
                          className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {items.length > 0 && (
                        <span className="inline-flex items-center rounded-md bg-red-50 mb-7 -ml-3 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          {items.length}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <main>
            <div className="">{children}</div>
          </main>
        </div>
      )}
    </>
  );
}

export default NavBar;
