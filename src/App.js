import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "./utils/Constants";
import ProductDetail from "./pages/product detail/ProductDetail";
import Stores from "./pages/stores/Stores";
import StoreDetail from "./pages/store detail/StoreDetail";
import Categories from "./pages/categories/Categories";
import CategoriesPage from "./pages/categories page/CategoriesPage";
import SignUp from "./pages/sign up/SignUp";
import SignIn from "./pages/signin/SignIn";
import Cart from "./pages/cart/Cart";


function App() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [isLog, setIsLog] = useState(false)
    const [categories, setCategories] = useState([])
    const [topStores, setTopStores] = useState([])
    const logStatus = (s) =>{
        setIsLog(s)
    }
    useEffect(()=>{
        axios.get(`${BASE_URL}/category/all`).then((res)=>{
            setCategories(res.data.slice(0,5))
            setLoading(false)
        })
    }, [])

    useEffect(()=>{
        axios.get(`${BASE_URL}/vendor/all`).then((res)=>{
            setTopStores(res.data)
            setLoading(false)
        })
    }, [])
    useEffect(()=>{
        axios.get(`${BASE_URL}/product/all`).then((res)=>{
            setProducts(res.data.data)
            setLoading(false)
        })
    }, [])
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<Home products={products.slice(0,4)} isLog={logStatus} l={isLog}
                 topStores={topStores.slice(0,5)}categories={categories.slice(0,5)}  loading={loading}/>}/>
                <Route  path='/products' element={<Products loading={loading} isLog={logStatus} l={isLog}/>}/>
                <Route path="/product/:productId" element={<ProductDetail isLog={logStatus} l={isLog}/>} />
                <Route path="/stores" element={<Stores stores={topStores} isLog={logStatus} l={isLog}/>} />
                <Route path="/store/:storeId" element={<StoreDetail isLog={logStatus} l={isLog}/>}/>
                <Route path="/category/:categoryId" element={<Categories isLog={logStatus} l={isLog}/> }/>
                <Route path="/category" element={<CategoriesPage categories={categories} isLog={logStatus} l={isLog}/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/login" element={<SignIn isLog={logStatus} l={isLog}/>} />
                <Route path="/cart" element={<Cart isLog={logStatus} l={isLog}/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
