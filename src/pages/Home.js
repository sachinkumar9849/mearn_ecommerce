import { Link } from "react-router-dom";
// import NavBar from "../features/navbar/Navbar";
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";
// import Footer from "../features/common/Footer";

function Home() {
    return ( 
        <div>
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
            <Footer></Footer>
            {/* <Footer></Footer> */}
        </div>
     );
}

export default Home;