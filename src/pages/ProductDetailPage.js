import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetail from '../features/product/components/ProductDetail'
import Footer from "../features/common/Footer";
import Breadcrumb from '../features/common/Breadcrumb';

const ProductDetailPage = () => {

  const pages = [
    { label: "Home", link: "/" },
    { label: "Product Detail", linkClass: "text-blue-500" },
  ];
  return (
    <div>
        <Navbar>
        <Breadcrumb pages={pages} />
            <ProductDetail></ProductDetail>
        </Navbar>
        <Footer className="no-top-margin"></Footer>
    </div>
  )
}

export default ProductDetailPage