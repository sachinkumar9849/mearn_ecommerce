import React from 'react'
import Navbar from '../features/navbar/Navbar'
import Footer from "../features/common/Footer";
import AdminOrders from "../features/admin/component/AdminOrders"

const AdminOrdersPage = () => {
  return (
    <div>
        <Navbar>
            <AdminOrders></AdminOrders>
        </Navbar>
        <Footer></Footer>
    </div>
  )
}

export default AdminOrdersPage