import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetail from '../features/product/components/ProductDetail'
import Footer from "../features/common/Footer";

const ProductDetailPage = () => {
  return (
    <div>
        <Navbar>
            <ProductDetail></ProductDetail>
        </Navbar>
        <Footer className="no-top-margin"></Footer>
    </div>
  )
}

export default ProductDetailPage