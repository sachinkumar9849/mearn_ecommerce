import React from "react";
import Navbar from '../features/navbar/Navbar'

const Contact = () => {
  return (
    <>
     <Navbar>
     <div class="container mx-auto p-4">
        <nav class="text-sm font-semibold">
          <ol class="list-none p-0 inline-flex">
            <li class="flex items-center">
              <a href="#" class="text-blue-500 hover:text-blue-700">
                Home
              </a>
              <span class="mx-2">/</span>
            </li>
            <li class="flex items-center">
              <a href="#" class="text-blue-500 hover:text-blue-700">
                Category
              </a>
              <span class="mx-2">/</span>
            </li>
            <li class="flex items-center">
              <span class="text-gray-500">Current Page</span>
            </li>
          </ol>
        </nav>
      </div>
      <section className="py-6 dark:bg-gray-800 dark:text-gray-50">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <h1 className="text-4xl font-bold">Get in touch</h1>
            <p className="pt-2 pb-4">
              Fill in the form to start a conversation
            </p>
            <div className="space-y-4">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Fake address, 9999 City</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>123456789</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>contact@business.com</span>
              </p>
            </div>
          </div>
          <form
            novalidate=""
            className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
          >
            <label className="block">
              <span className="mb-1">Full name</span>
              <input
                type="text"
                placeholder="Leroy Jenkins"
                className="block w-full rounded-md shadow-sm focus:ring focus:ri focus:ri dark:bg-gray-800"
              />
            </label>
            <label className="block">
              <span className="mb-1">Email address</span>
              <input
                type="email"
                placeholder="leroy@jenkins.com"
                className="block w-full rounded-md shadow-sm focus:ring focus:ri focus:ri dark:bg-gray-800"
              />
            </label>
            <label className="block">
              <span className="mb-1">Message</span>
              <textarea
                rows="3"
                className="block w-full rounded-md focus:ring focus:ri focus:ri dark:bg-gray-800"
              ></textarea>
            </label>
            <button
              type="button"
              className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ri dark:bg-violet-400 dark:text-gray-900 focus:ri hover:ri"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

     </Navbar>
    
    </>
  );
};

export default Contact;




// import React, { useState, Fragment, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchBrandsAsync,
//   fetchCategoriesAsync,
//   fetchProductsByFiltersAsync,
//   selectAllProducts,
//   selectBrands,
//   selectCategories,
//   selectProductListStatus,
//   selectTotalItems,
// } from "../productSlice";
// import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   StarIcon,
// } from "@heroicons/react/20/solid";
// import { Link } from "react-router-dom";
// import {
//   ChevronDownIcon,
//   FunnelIcon,
//   MinusIcon,
//   PlusIcon,
//   Squares2X2Icon,
// } from "@heroicons/react/20/solid";
// import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
// import Pagination from "../../common/Pagination";
// import { Grid } from "react-loader-spinner";

// const sortOptions = [
//   { name: "Best Rating", sort: "rating", order: "desc", current: false },
//   { name: "Price: Low to High", sort: "price", order: "asc", current: false },
//   { name: "Price: High to Low", sort: "price", order: "desc", current: false },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductList() {
//   const dispatch = useDispatch();
//   const products = useSelector(selectAllProducts);
//   const brands = useSelector(selectBrands);
//   const categories = useSelector(selectCategories);
//   const totalItems = useSelector(selectTotalItems);
//   const status = useSelector(selectProductListStatus);
//   const filters = [
//     {
//       id: "category",
//       name: "Category",
//       options: categories,
//     },
//     {
//       id: "brand",
//       name: "Brands",
//       options: brands,
//     },
//   ];

//   const [filter, setFilter] = useState({});
//   const [sort, setSort] = useState({});
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const [page, setPage] = useState(1);

//   const handleFilter = (e, section, option) => {
//     console.log(e.target.checked);
//     const newFilter = { ...filter };
//     // TODO : on server it will support multiple categories
//     if (e.target.checked) {
//       if (newFilter[section.id]) {
//         newFilter[section.id].push(option.value);
//       } else {
//         newFilter[section.id] = [option.value];
//       }
//     } else {
//       const index = newFilter[section.id].findIndex(
//         (el) => el === option.value
//       );
//       newFilter[section.id].splice(index, 1);
//     }
//     console.log({ newFilter });

//     setFilter(newFilter);
//   };

//   const handleSort = (e, option) => {
//     const sort = { _sort: option.sort, _order: option.order };
//     console.log({ sort });
//     setSort(sort);
//   };

//   const handlePage = (page) => {
//     console.log({ page });
//     setPage(page);
//   };

//   useEffect(() => {
//     const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
//     dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
//     // TODO : Server will filter deleted products
//   }, [dispatch, filter, sort, page]);

//   useEffect(() => {
//     setPage(1);
//   }, [totalItems, sort]);

//   useEffect(() => {
//     dispatch(fetchBrandsAsync());
//     dispatch(fetchCategoriesAsync());
//   }, []);

//   return (
//     <div className="bg-white">
//       <div>
//         <MobileFilter
//           handleFilter={handleFilter}
//           mobileFiltersOpen={mobileFiltersOpen}
//           setMobileFiltersOpen={setMobileFiltersOpen}
//           filters={filters}
//         ></MobileFilter>

//         <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900">
//               All Products
//             </h1>

//             <div className="flex items-center">
//               <Menu as="div" className="relative inline-block text-left">
//                 <div>
//                   <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
//                     Sort
//                     <ChevronDownIcon
//                       className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                       aria-hidden="true"
//                     />
//                   </Menu.Button>
//                 </div>

//                 <Transition
//                   as={Fragment}
//                   enter="transition ease-out duration-100"
//                   enterFrom="transform opacity-0 scale-95"
//                   enterTo="transform opacity-100 scale-100"
//                   leave="transition ease-in duration-75"
//                   leaveFrom="transform opacity-100 scale-100"
//                   leaveTo="transform opacity-0 scale-95"
//                 >
//                   <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     <div className="py-1">
//                       {sortOptions.map((option) => (
//                         <Menu.Item key={option.name}>
//                           {({ active }) => (
//                             <p
//                               onClick={(e) => handleSort(e, option)}
//                               className={classNames(
//                                 option.current
//                                   ? "font-medium text-gray-900"
//                                   : "text-gray-500",
//                                 active ? "bg-gray-100" : "",
//                                 "block px-4 py-2 text-sm"
//                               )}
//                             >
//                               {option.name}
//                             </p>
//                           )}
//                         </Menu.Item>
//                       ))}
//                     </div>
//                   </Menu.Items>
//                 </Transition>
//               </Menu>

//               <button
//                 type="button"
//                 className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
//               >
//                 <span className="sr-only">View grid</span>
//                 <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
//               </button>
//               <button
//                 type="button"
//                 className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
//                 onClick={() => setMobileFiltersOpen(true)}
//               >
//                 <span className="sr-only">Filters</span>
//                 <FunnelIcon className="h-5 w-5" aria-hidden="true" />
//               </button>
//             </div>
//           </div>

//           <section aria-labelledby="products-heading" className="pb-24 pt-6">
//             <h2 id="products-heading" className="sr-only">
//               Products
//             </h2>

//             <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
//               <DesktopFilter
//                 handleFilter={handleFilter}
//                 filters={filters}
//               ></DesktopFilter>
//               {/* Product grid */}
//               <div className="lg:col-span-3">
//                 <ProductGrid products={products} status={status}></ProductGrid>
//               </div>
//               {/* Product grid end */}
//             </div>
//           </section>

//           {/* section of product and filters ends */}
//           <Pagination
//             page={page}
//             setPage={setPage}
//             handlePage={handlePage}
//             totalItems={totalItems}
//           ></Pagination>
//         </main>
//       </div>
//     </div>
//   );
// }

// function MobileFilter({
//   mobileFiltersOpen,
//   setMobileFiltersOpen,
//   handleFilter,
//   filters,
// }) {
//   return (
//     <Transition.Root show={mobileFiltersOpen} as={Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-40 lg:hidden"
//         onClose={setMobileFiltersOpen}
//       >
//         <Transition.Child
//           as={Fragment}
//           enter="transition-opacity ease-linear duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="transition-opacity ease-linear duration-300"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black bg-opacity-25" />
//         </Transition.Child>

//         <div className="fixed inset-0 z-40 flex">
//           <Transition.Child
//             as={Fragment}
//             enter="transition ease-in-out duration-300 transform"
//             enterFrom="translate-x-full"
//             enterTo="translate-x-0"
//             leave="transition ease-in-out duration-300 transform"
//             leaveFrom="translate-x-0"
//             leaveTo="translate-x-full"
//           >
//             <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
//               <div className="flex items-center justify-between px-4">
//                 <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//                 <button
//                   type="button"
//                   className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
//                   onClick={() => setMobileFiltersOpen(false)}
//                 >
//                   <span className="sr-only">Close menu</span>
//                   <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                 </button>
//               </div>

//               {/* Filters */}
//               <form className="mt-4 border-t border-gray-200">
//                 {filters.map((section) => (
//                   <Disclosure
//                     as="div"
//                     key={section.id}
//                     className="border-t border-gray-200 px-4 py-6"
//                   >
//                     {({ open }) => (
//                       <>
//                         <h3 className="-mx-2 -my-3 flow-root">
//                           <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
//                             <span className="font-medium text-gray-900">
//                               {section.name}
//                             </span>
//                             <span className="ml-6 flex items-center">
//                               {open ? (
//                                 <MinusIcon
//                                   className="h-5 w-5"
//                                   aria-hidden="true"
//                                 />
//                               ) : (
//                                 <PlusIcon
//                                   className="h-5 w-5"
//                                   aria-hidden="true"
//                                 />
//                               )}
//                             </span>
//                           </Disclosure.Button>
//                         </h3>
//                         <Disclosure.Panel className="pt-6">
//                           <div className="space-y-6">
//                             {section.options.map((option, optionIdx) => (
//                               <div
//                                 key={option.value}
//                                 className="flex items-center"
//                               >
//                                 <input
//                                   id={`filter-mobile-${section.id}-${optionIdx}`}
//                                   name={`${section.id}[]`}
//                                   defaultValue={option.value}
//                                   type="checkbox"
//                                   defaultChecked={option.checked}
//                                   onChange={(e) =>
//                                     handleFilter(e, section, option)
//                                   }
//                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                 />
//                                 <label
//                                   htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
//                                   className="ml-3 min-w-0 flex-1 text-gray-500"
//                                 >
//                                   {option.label}
//                                 </label>
//                               </div>
//                             ))}
//                           </div>
//                         </Disclosure.Panel>
//                       </>
//                     )}
//                   </Disclosure>
//                 ))}
//               </form>
//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// }

// function DesktopFilter({ handleFilter, filters }) {
//   return (
//     <form className="hidden lg:block">
//       {filters.map((section) => (
//         <Disclosure
//           as="div"
//           key={section.id}
//           className="border-b border-gray-200 py-6"
//         >
//           {({ open }) => (
//             <>
//               <h3 className="-my-3 flow-root">
//                 <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
//                   <span className="font-medium text-gray-900">
//                     {section.name}
//                   </span>
//                   <span className="ml-6 flex items-center">
//                     {open ? (
//                       <MinusIcon className="h-5 w-5" aria-hidden="true" />
//                     ) : (
//                       <PlusIcon className="h-5 w-5" aria-hidden="true" />
//                     )}
//                   </span>
//                 </Disclosure.Button>
//               </h3>
//               <Disclosure.Panel className="pt-6">
//                 <div className="space-y-4">
//                   {section.options.map((option, optionIdx) => (
//                     <div key={option.value} className="flex items-center">
//                       <input
//                         id={`filter-${section.id}-${optionIdx}`}
//                         name={`${section.id}[]`}
//                         defaultValue={option.value}
//                         type="checkbox"
//                         defaultChecked={option.checked}
//                         onChange={(e) => handleFilter(e, section, option)}
//                         className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                       />
//                       <label
//                         htmlFor={`filter-${section.id}-${optionIdx}`}
//                         className="ml-3 text-sm text-gray-600"
//                       >
//                         {option.label}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </Disclosure.Panel>
//             </>
//           )}
//         </Disclosure>
//       ))}
//     </form>
//   );
// }

// function ProductGrid({ products, status }) {
//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
//         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
//           {status === "loading" ? (
//             <Grid
//               height="80"
//               width="80"
//               color="rgb(79, 70, 229) "
//               ariaLabel="grid-loading"
//               radius="12.5"
//               wrapperStyle={{}}
//               wrapperClass=""
//               visible={true}
//             />
//           ) : null}
//           {products.map((product) => (
//             <div className="bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500">
//               <Link to={`/product-detail/${product.id}`} key={product.id}>
//                 {" "}
//                 <img
//                   src={product.thumbnail}
//                   alt={product.title}
//                   className="h-80 w-72 object-cover border border-1"
//                 />
//               </Link>
//               <div className="px-4 py-3">
//                 <span className="rating_icons flex items-center text-gray-400 mr-3 uppercase text-xs">
//                   <StarIcon className="w-6 h-6 inline"></StarIcon>
//                   {product.rating}
//                 </span>
//                 <p className="text-lg font-bold text-black truncate block capitalize">
//                   {product.title}
//                 </p>
//                 <div className="flex items-center">
//                   <p className="text-lg font-semibold text-black cursor-auto my-3">
//                     ${discountedPrice(product)}
//                   </p>
//                   <del>
//                     <p className="text-sm text-gray-600 cursor-auto ml-2">
//                       ${product.price}
//                     </p>
//                   </del>
//                   <div className="ml-auto">
//                     <a href="#">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={20}
//                         height={20}
//                         fill="currentColor"
//                         className="bi bi-bag-plus"
//                         viewBox="0 0 16 16"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
//                         />
//                         <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
//                       </svg>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
