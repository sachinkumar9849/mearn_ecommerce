import React from 'react';
import NavBar from "../features/navbar/Navbar";

import AdminProductList from '../features/admin/component/AdminProductList';


const AdminHome = () => {
  return (
    <div>
        <NavBar>
          <AdminProductList></AdminProductList>
        </NavBar>
    </div>
  )
}

export default AdminHome