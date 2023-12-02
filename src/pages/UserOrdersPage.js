import React from "react";
import UserOrders from "../features/user/component/UserOrders";
import Navbar from "../features/navbar/Navbar";
const UserOrdersPage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="font-bold">My Orders</h1>
        <UserOrders></UserOrders>
      </Navbar>
    </div>
  );
};

export default UserOrdersPage;
