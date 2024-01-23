import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  //TODO: We will add payment section when we work on backend.

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
    toast.success("Address updated successfully!");
  };
  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
    toast.error("Address removed successfully!");
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
    setValue("street", address.street);
  };

  const handleAdd = (address) => {
    const newUser = {
      ...userInfo,
      addresses: [...userInfo.addresses, address],
    };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
    toast.success("Address added successfully!");
  };

  return (
    <div>
      <div className="mx-auto mt-12 bg-white max-w-7xl p-10">
        <div className="border-gray-200">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            Name: {userInfo.name ? userInfo.name : "New User"}
          </h1>
          <h3 className="text-xl font-bold tracking-tight text-red-900">
            <span className="capitalize text-black"> email address </span>:{" "}
            {userInfo.email}
          </h3>
          {userInfo.role === "admin" && (
            <h3 className="text-xl  font-bold tracking-tight text-red-900">
              role : {userInfo.role}
            </h3>
          )}
        </div>

        <div className="border-gray-200">
          <button
            onClick={(e) => {
              setShowAddAddressForm(true);
              setSelectedEditIndex(-1);
            }}
            type="submit"
            className="rounded-md text-center btn bg-orange my-5 py-3 px-7 text-white block transition  hover:bg-blue-900"
          >
            Add New Address
          </button>
          {showAddAddressForm ? (
            <form
              className="bg-white"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                handleAdd(data);
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-5 grid lg:grid-cols-2 lg:gap-6">
                    <div className="col-span-1">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                      >
                        Full name
                      </label>
                      <div className="">
                        <input
                          type="text"
                          {...register("name", {
                            required: "name is required",
                          })}
                          id="name"
                          className="w-full px-4 py-3 rounded-md bg-gray-100  border
 focus:bg-white focus:outline-none"
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-1">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-2 lg:mt-0 mt-4"
                      >
                        Email address
                      </label>
                      <div className="">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          className="w-full px-4 py-3 rounded-md bg-gray-100  border
 focus:bg-white focus:outline-none"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-2 lg:gap-6">
                    <div className="col-span-1">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-2 mt-4"
                      >
                        Phone
                      </label>
                      <div className="">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="tel"
                          className="w-full px-4 py-3 rounded-md bg-gray-100  border
                       focus:bg-white focus:outline-none"
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-2 mt-4"
                      >
                        Street address
                      </label>
                      <div className="">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          id="street"
                          className="w-full px-4 py-3 rounded-md bg-gray-100  border
                           focus:bg-white focus:outline-none"
                        />
                        {errors.street && (
                          <p className="text-red-500">
                            {errors.street.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 lg:gap-6">
                    <div className="col-span-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-2 mt-4"
                      >
                        City
                      </label>
                      <div className="">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="w-full px-4 py-3 rounded-md bg-gray-100  border
                       focus:bg-white focus:outline-none"
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-1">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-2 mt-4"
                      >
                        State / Province
                      </label>
                      <div className="">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          className="w-full px-4 py-3 rounded-md bg-gray-100  border
                        focus:bg-white focus:outline-none"
                        />
                        {errors.state && (
                          <p className="text-red-500">{errors.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-1">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-2 mt-4"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          id="pinCode"
                          className="w-full px-4 py-3 rounded-md bg-gray-100  border
                        focus:bg-white focus:outline-none"
                        />
                        {errors.pinCode && (
                          <p className="text-red-500">
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    className="text-center btn bg-orange rounded-md py-3 px-7 text-white block transition  hover:bg-blue-900"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}

          <p className="mb-3 text-lg font-bold">Your Addresses :</p>
          {userInfo.addresses.map((address, index) => (
            <div key={index}>
              {selectedEditIndex === index ? (
                <form
                  className="bg-white my-7"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                    handleEdit(data, index);
                    reset();
                  })}
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-1">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 mt-4"
                          >
                            Full name
                          </label>
                          <div className="">
                            <input
                              type="text"
                              {...register("name", {
                                required: "name is required",
                              })}
                              id="name"
                              className="w-full px-4 py-3 rounded-md bg-gray-100  border
 focus:bg-white focus:outline-none"
                            />
                            {errors.name && (
                              <p className="text-red-500">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-span-1">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 mt-4"
                          >
                            Email address
                          </label>
                          <div className="">
                            <input
                              id="email"
                              {...register("email", {
                                required: "email is required",
                              })}
                              type="email"
                              className="w-full px-4 py-3 rounded-md bg-gray-100  border
 focus:bg-white focus:outline-none"
                            />
                            {errors.email && (
                              <p className="text-red-500">
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-1">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 mt-4"
                          >
                            Phone
                          </label>
                          <div className="">
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "phone is required",
                              })}
                              type="tel"
                              className="w-full px-4 py-3 rounded-md bg-gray-100  border
                        focus:bg-white focus:outline-none"
                            />
                            {errors.phone && (
                              <p className="text-red-500">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-span-1">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 mt-4"
                          >
                            Street address
                          </label>
                          <div className="">
                            <input
                              type="text"
                              {...register("street", {
                                required: "street is required",
                              })}
                              id="street"
                              className="w-full px-4 py-3 rounded-md bg-gray-100  border
 focus:bg-white focus:outline-none"
                            />
                            {errors.street && (
                              <p className="text-red-500">
                                {errors.street.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 mt-4"
                          >
                            City
                          </label>
                          <div className="">
                            <input
                              type="text"
                              {...register("city", {
                                required: "city is required",
                              })}
                              id="city"
                              autoComplete="address-level2"
                              className="w-full px-4 py-3 rounded-md bg-gray-100  border
 focus:bg-white focus:outline-none"
                            />
                            {errors.city && (
                              <p className="text-red-500">
                                {errors.city.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-span-1">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 mt-4"
                          >
                            State / Province
                          </label>
                          <div className="">
                            <input
                              type="text"
                              {...register("state", {
                                required: "state is required",
                              })}
                              id="state"
                              className="w-full px-4 py-3 rounded-md bg-gray-100  border
                                focus:bg-white focus:outline-none"
                            />
                            {errors.state && (
                              <p className="text-red-500">
                                {errors.state.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-span-1">
                          <label
                            htmlFor="pinCode"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 mt-4"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="">
                            <input
                              type="text"
                              {...register("pinCode", {
                                required: "pinCode is required",
                              })}
                              id="pinCode"
                              className="w-full px-4 py-3 rounded-md bg-gray-100  border
                            focus:bg-white focus:outline-none"
                            />
                            {errors.pinCode && (
                              <p className="text-red-500">
                                {errors.pinCode.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-end gap-x-6">
                      <button
                        onClick={(e) => setSelectedEditIndex(-1)}
                        type="submit"
                        className="rounded-md px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md text-center btn bg-orange my-5 py-3 px-7 text-white block transition  hover:bg-blue-900"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
              <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200 mb-2">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.pinCode}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone: {address.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    {address.city}
                  </p>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <button
                    onClick={(e) => handleEditForm(index)}
                    type="button"
                    className="font-medium text-white px-4 w-full mb-2 py-1 rounded-full bg-green-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, index)}
                    type="button"
                    className="font-medium text-white px-4 py-1 rounded-full bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
