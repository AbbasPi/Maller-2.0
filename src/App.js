import './App.css';
import {BrowserRouter,Routes, Route, useNavigate} from 'react-router-dom';
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, TOKEN_KEY} from "./utils/Constants";
import ProductDetail from "./pages/product detail/ProductDetail";
import Stores from "./pages/stores/Stores";
import StoreDetail from "./pages/store detail/StoreDetail";
import Categories from "./pages/categories/Categories";
import CategoriesPage from "./pages/categories page/CategoriesPage";
import SignUp from "./pages/sign up/SignUp";
import SignIn from "./pages/signin/SignIn";
import Cart from "./pages/cart/Cart";
import Navbar from "./components/navbar/Navbar";


function App() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [isLog, setIsLog] = useState(false)
    const [categories, setCategories] = useState([])
    const [topStores, setTopStores] = useState([])
    const [isLogged, setIsLogged] = useState(true)
    const [t, setT] = useState(false)
    // const navigate = useNavigate()
    useEffect(()=>{
        let token;
        try {
            token = JSON.parse(localStorage.getItem('token'))
            if(!token) {
                setIsLog(false)
            }
            else {
                setIsLog(true)
            }

        } catch (error) {
            console.log(error)
            setIsLog(false)
        }

    },[t])
    const logout = () =>{
        localStorage.removeItem(TOKEN_KEY);
        setT(!t)
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
    const submitButton = data => {
        axios.post(`${BASE_URL}/auth/signin`, data).then((res) => {
            const data = res.data;
            localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
            setT(!t)
            // navigate('/')
        }).catch((error) => {
            console.log(error)
        });
    }
  return (
    <div className="App">
        <BrowserRouter>
                <Navbar logout={logout} l={isLog}/>
            <Routes>
                <Route  path="/" element={<Home products={products.slice(0,4)} l={isLog} logout={logout}
                 topStores={topStores.slice(0,5)} categories={categories.slice(0,5)}  loading={loading}/>}/>
                <Route  path='/products' element={<Products loading={loading} l={isLog} logout={logout}/>}/>
                <Route path="/product/:productId" element={<ProductDetail l={isLog} logout={logout}/>} />
                <Route path="/stores" element={<Stores stores={topStores} l={isLog} logout={logout}/>} />
                <Route path="/store/:storeId" element={<StoreDetail l={isLog} logout={logout}/>}/>
                <Route path="/category/:categoryId" element={<Categories l={isLog} logout={logout}/> }/>
                <Route path="/category" element={<CategoriesPage categories={categories} l={isLog} logout={logout}/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/login" element={<SignIn l={isLog} submitButton={submitButton} logout={logout}/>} />
                <Route path="/cart" element={<Cart l={isLog} logout={logout}/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
