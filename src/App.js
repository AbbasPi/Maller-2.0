import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import SnackbarProvider from "react-simple-snackbar";
import axios from "axios";
import { BASE_URL } from "./utils/Constants";
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
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import EditAddress from "./address/EditAddress";
import AddAddress from "./address/AddAddress";
import Checkout from "./pages/checkout/Checkout";
import Wishlist from "./pages/Wishlist";
import WishlistShare from "./pages/WishlistShare";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/home/Home"));
const Products = lazy(() => import("./pages/products/Products"));

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [topStores, setTopStores] = useState([]);
  const [query, setQuery] = useState("");
  const getQuery = (inputValue) => {
    setQuery(inputValue);
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/category/all`).then((res) => {
      setCategories(res.data.slice(0, 5));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/vendor/all`).then((res) => {
      setTopStores(res.data);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL}/product/all`).then((res) => {
      setProducts(res.data.data);
      setLoading(false);
    });
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <SnackbarProvider>
            <CartProvider>
              <Suspense fallback={<Loading />}>
                <Navbar loading={loading} query={getQuery} />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home
                        products={products.slice(0, 4)}
                        topStores={topStores.slice(0, 5)}
                        categories={categories.slice(0, 5)}
                      />
                    }
                  />
                  <Route
                    path="/products"
                    element={<Products query={query} />}
                  />
                  <Route
                    path="/product/:productId"
                    element={<ProductDetail />}
                  />
                  <Route
                    path="/stores"
                    element={<Stores stores={topStores} loading={loading} />}
                  />
                  <Route path="/store/:storeId" element={<StoreDetail />} />
                  <Route
                    path="/category/:categoryId"
                    element={<Categories />}
                  />
                  <Route
                    path="/category"
                    element={<CategoriesPage categories={categories} />}
                  />
                  <Route
                    path="/wishlist/:WishlistId"
                    element={<WishlistShare />}
                  />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<SignIn />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/edit-address" element={<EditAddress />} />
                  <Route path="/address" element={<AddAddress />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                </Routes>
              </Suspense>
            </CartProvider>
          </SnackbarProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
