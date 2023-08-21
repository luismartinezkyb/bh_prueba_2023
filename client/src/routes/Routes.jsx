import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//errors
import Error404 from "../components/errors/Error404";


//partials
import Navbar from "../components/partials/NavBar";
//pages
import Dashboard from "../pages/Dashboard";
import ProductDetail from "../pages/products/ProductDetail";
import Products from "../pages/products/Products";


export default function Rutas() {

    return (
    <Router>
        <Navbar/>
        <Routes>
            
            <Route path="/" element={<Products />} exact />
            <Route path="/products" element={<Products />} exact />
            <Route path="/products/:id" element={<ProductDetail />} exact />
            
            <Route path="*" element={<Error404/>} />
        </Routes>
        
        
    </Router>
    );
}
