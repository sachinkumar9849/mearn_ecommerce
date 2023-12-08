import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from "./features/cart/Cart";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import PageNotFound from "./pages/404";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPages from "./pages/ForgotPasswordPages";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
// import UserOrders from "./features/user/component/UserOrders";
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  timeout: 3000,
  position: positions.TOP_CENTER
};
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <Protected>
        <AdminHome></AdminHome>
      </Protected>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <Protected>
        <AdminProductFormPage></AdminProductFormPage>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>,
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>
      </Protected>
    ),
  },

  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <Protected>
        <AdminProductDetailPage></AdminProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <Protected>
        <AdminProductFormPage></AdminProductFormPage>
      </Protected>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <Protected>
        <AdminOrdersPage></AdminOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: <UserOrdersPage></UserOrdersPage>,
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPages></ForgotPasswordPages>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserAsync(user.id));
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <AlertProvider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </AlertProvider>
    </div>
  );
}

export default App;
