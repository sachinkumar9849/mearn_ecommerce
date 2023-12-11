import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetail from '../features/product/components/ProductDetail'
import AdminProductDetail from '../features/admin/component/AdminProductDetail'

const AdminProductDetailPage = () => {
  return (
    <div>
        <Navbar>
            {/* <ProductDetail></ProductDetail> */}
            <AdminProductDetail></AdminProductDetail>
        </Navbar>
    </div>
  )
}

export default AdminProductDetailPage