import './App.css';
import {BrowserRouter,Routes, Route, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import SnackbarProvider from 'react-simple-snackbar'
import axios from "axios";
import {BASE_URL, TOKEN_KEY, TOKEN_STR} from "./utils/Constants";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import ProductDetail from "./pages/product detail/ProductDetail";
import Stores from "./pages/stores/Stores";
import StoreDetail from "./pages/store detail/StoreDetail";
import Categories from "./pages/categories/Categories";
import CategoriesPage from "./pages/categories page/CategoriesPage";
import SignUp from "./pages/sign up/SignUp";
import SignIn from "./pages/signin/SignIn";
import Cart from "./pages/cart/Cart";
import Profile from "./pages/profile/Profile";
import Navbar from "./components/navbar/Navbar";
import {CartProvider} from "./contexts/CartContext";
import {AuthProvider} from "./contexts/AuthContext";
import EditAddress from "./address/EditAddress";
import AddAddress from "./address/AddAddress";


function App() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [topStores, setTopStores] = useState([])

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
                <AuthProvider>
                    <SnackbarProvider>
                        <CartProvider>
                <Navbar loading={loading}/>
            <Routes>
                <Route  path="/" element={<Home products={products.slice(0,4)}
                 topStores={topStores.slice(0,5)} categories={categories.slice(0,5)}  loading={loading}/>}/>
                <Route  path='/products' element={<Products loading={loading}  />}/>
                <Route path="/product/:productId" element={<ProductDetail  />} />
                <Route path="/stores" element={<Stores stores={topStores}  />} />
                <Route path="/store/:storeId" element={<StoreDetail  />}/>
                <Route path="/category/:categoryId" element={<Categories  /> }/>
                <Route path="/category" element={<CategoriesPage categories={categories}  />} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/login" element={<SignIn/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-address" element={<EditAddress />} />
                <Route path="/address" element={<AddAddress />} />
            </Routes>
                </CartProvider>
        </SnackbarProvider>
                </AuthProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
