import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../../product/productSlice";

import { Link, Navigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const ProductForm = () => {
  const params = useParams();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const selectedProduct = useSelector(selectProductById);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="col-span-1">
          <div className="bg-white p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Product Form</h2>
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                const product = { ...data };
                product.image = [
                  product.image1,
                  product.image2,
                  product.image3,
                  product.thumbnail,
                ];

                delete product["image1"];
                delete product["image2"];
                delete product["image3"];
                product.price = +product.price;
                product.stock = +product.stock;
                product.discountPercentage = +product.discountPercentage;

                if (params.id) {
                  product.id = params.id;
                  product.rating = selectedProduct.rating || 0;
                  dispatch(updateProductAsync(product));
                  reset();
                } else {
                  dispatch(createProductAsync(product));
                }
              })}
            >
              <div className="grid grid-cols-2 gap-7">
                <div className="col-span-1">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    {...register("title", {
                      required: "email is required",
                    })}
                    className="mt-1 p-2 w-full border"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    className="mt-1 p-2 w-full border"
                    rows={3}
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 1, message: "Price must be at least 1" },
                      max: {
                        value: 1000,
                        message: "Price must be at most 1000",
                      },
                    })}
                    className={`mt-1 p-2 w-full border ${
                      errors.price ? "border-red-500" : ""
                    }`}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="discountPercentage"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Discount Percentage
                  </label>
                  <input
                    type="number"
                    id="discountPercentage"
                    {...register("discountPercentage", {
                      required: "discountPercentage is required",
                    })}
                    className="mt-1 p-2 w-full border"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    {...register("stock", {
                      required: "stock is required",
                    })}
                    className="mt-1 p-2 w-full border"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Brand
                  </label>
                  <select
                    id="brand"
                    name="brand"
                    {...register("brand", {
                      required: "brand is required",
                    })}
                    className="mt-1 p-2 w-full border"
                  >
                    <option value="" selected="">
                      --Choose Brand --
                    </option>
                    {brands.map((brand) => (
                      <option value={brand.value}>{brand.value}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    {...register("category", {
                      required: "category is required",
                    })}
                    className="mt-1 p-2 w-full border"
                  >
                    <option value="smartphones" selected="">
                      --Choose Category --
                    </option>
                    {categories.map((category) => (
                      <option value={category.value}>{category.value}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    id="thumbnail"
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                    className="mt-1 p-2 w-full border"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Image 1
                  </label>
                  <input
                    type="url"
                    id="image1"
                    {...register("image1", {
                      required: "image1 is required",
                    })}
                    className="mt-1 p-2 w-full border"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Image 2
                  </label>
                  <input
                    type="url"
                    id="image2"
                    {...register("image2", {
                      required: "image2 is required",
                    })}
                    className="mt-1 p-2 w-full border"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Image 3
                  </label>
                  <input
                    type="url"
                    id="image3"
                    {...register("image3", {
                      required: "image3 is required",
                    })}
                    className="mt-1 p-2 w-full border"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-300 text-red-700 px-4 py-2 hover:bg-red-400"
                  >
                    Delete
                  </button>
                  <button
                    type="reset"
                    className="bg-gray-300 text-gray-700 px-4 py-2 hover:bg-gray-400"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
