import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//errors
import Error404 from "../components/errors/Error404";


//partials
import Navbar from "../components/partials/NavBar";
//pages
import ProductDetail from "../pages/products/ProductDetail";
import Products from "../pages/products/Products";
import CreateProduct from "../pages/products/CreateProduct";
import EditProduct from "../pages/products/EditProduct";


export default function Rutas() {

    return (
    <Router>
        <Navbar/>
        <Routes>
            
            <Route path="/" element={<Products />} exact />
            <Route path="/products" element={<Products />} exact />
            <Route path="/products/:product_id/details" element={<ProductDetail />} exact />
            <Route path="/products/:product_id/edit" element={<EditProduct />} exact />
            <Route path="/products/create" element={<CreateProduct />} exact />
            
            <Route path="*" element={<Error404/>} />
        </Routes>
        
        
    </Router>
    );
}
