import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { discountedPrice } from "../../app/constants";
import { Grid } from "react-loader-spinner";
import Modal from "../common/Modal";

export default function Cart() {
  const dispatch = useDispatch();
  const cartLoaded = useSelector(selectCartLoaded);
  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const [openModal, setOpenModal] = useState(null);

  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {!items.length && cartLoaded && (
        <Navigate to="/" replace={true}></Navigate>
      )}

      <div>
        <div className="cart_table mx-auto mt-12 bg-white max-w-7xl">
          <div className="p-10">
            <div className="flow-root">
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
              <ul className="divide-y divide-gray-200">
                <h2 className="mb-8 text-4xl font-bold ">Your Cart</h2>
                <div className="flex-wrap items-center hidden mb-6 md:flex md:mb-8 border-0">
                  <div className="mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                    <h2 className="font-bold">Product name</h2>
                  </div>
                  <div className="hidden lg:block lg:w-2/12">
                    <h2 className="font-bold">Price</h2>
                  </div>
                  <div className="w-auto md:w-1/6 lg:w-2/12 ">
                    <h2 className="font-bold">Quantity</h2>
                  </div>
                  <div className="w-auto  md:w-1/6 lg:w-2/12 ">
                    <h2 className="font-bold">Remove</h2>
                  </div>
                </div>
                {items.map((item) => (
                  <div key={item.id} className="py-4 ">
                    <div className="flex flex-wrap items-center">
                      <div className="w-full md:w-4/6 lg:w-6/12 ">
                        <div className="flex flex-wrap items-center">
                          <div className="w-full md:w-1/3">
                            <div className="w-full h-96 md:h-24 md:w-24">
                              <img
                                src={item.product.thumbnail}
                                alt=""
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="w-2/3">
                            <h2 className="mb-2 text-xl font-bold">
                              {item.product.title}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 ">
                              {item.product.brand}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="hidden  lg:block lg:w-2/12">
                        <p className="ml-4">${discountedPrice(item.product)}</p>
                      </div>
                      <div className="w-auto  md:w-1/6 lg:w-2/12 ">
                        <div className="text-gray-500">
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                      </div>
                      <div className="w-auto text-right md:w-1/6 lg:w-2/12 ">
                        <div className="flex">
                          <Modal
                            title={`Delete ${item.product.title}`}
                            message="Are you sure you want to delete this Cart item ?"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            dangerAction={(e) => handleRemove(e, item.id)}
                            cancelAction={() => setOpenModal(null)}
                            showModal={openModal === item.id}
                          ></Modal>
                          <button
                            onClick={(e) => {
                              setOpenModal(item.id);
                            }}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            <DeleteOutlineIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="py-6  w-2/5">
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p className="font-bold">Subtotal</p>
                    <p>$ {totalAmount}</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Total Items in Cart</p>
                    <p>{totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      className="text-center btn bg-orange w-full py-3 px-7 text-white block transition  hover:bg-blue-900"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className=" mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <Link to="/">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
