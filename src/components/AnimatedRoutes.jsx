import React from 'react';
import {AnimatePresence} from "framer-motion";
import {useLocation, Route, Routes} from "react-router-dom";
import ProductDetail from "../pages/product detail/ProductDetail";

function AnimatedRoutes(props) {
    const location = useLocation()
    return (
        <AnimatePresence>
            <Routes  location={location} key={location.pathname}>
                <Route path="/product/:productId" element={<ProductDetail  />} />
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;