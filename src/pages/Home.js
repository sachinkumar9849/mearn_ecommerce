import { Link } from "react-router-dom";
// import NavBar from "../features/navbar/Navbar";
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";
// import { ToastContainer } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Footer from "../features/common/Footer";

function Home() {
    return ( 
        <div>
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
            <Footer></Footer>
            {/* <Footer></Footer> */}
            <ToastContainer />

        </div>
     );
}

export default Home;