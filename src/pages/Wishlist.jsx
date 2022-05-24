import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {BASE_URL} from "../utils/Constants";
import AuthContext from "../contexts/AuthContext";
import Footer from "../components/footer/Footer";
import {Link, useNavigate} from "react-router-dom";
import Loading from "../components/Loading";
import CartContext from "../contexts/CartContext";
import x from '../components/assets/svg/x-symbol.svg'
import cart from '../components/assets/svg/icons8-add-to-cart-32.png'
import NotFound from "../components/NotFound";
import WishlistEmpty from "../WishlistEmpty";
import plus from "../components/assets/svg/plus.png";
import minus from "../components/assets/svg/minus.png";

function Wishlist() {
        const navigate = useNavigate()
    const {isAuth, user} = useContext(AuthContext)
    const {addToCarts} = useContext(CartContext);
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [status, setStatus] = useState(0)
    const getWishList = (()=>{
        setLoading(true)
        axios.get(`${BASE_URL}/wishlist`,
            {headers: {'Authorization': `${user.token_type} ${user.access_token}`}}).then((res) => {
            setProduct(res.data.product)
        }).catch(function (error) {
            if (error.response) {
                setStatus(error.response.status)
            }
        })
        setLoading(false)
    })
    useEffect(()=>{
    !isAuth ?
        navigate('/login')
        :
        getWishList()
    }, [isAuth, user])

    const removeProduct = id =>{
        setProduct(product.filter((item) => item.id !== id));
        axios.delete(`${BASE_URL}/wishlist/remove/`,
            {headers: {"Authorization": `${user.token_type} ${user.access_token}`}, params: {id: id}}).then(()=>{
        getWishList()
        })
    }

    if(status === 404) {
        return (
            <WishlistEmpty/>
        )
    }
    if(product.length === 0 && status !== 404){
        return (
            <Loading/>
        )
    }

    return (
         <div>
        <div className='container p-8 max-w-full mx-auto mt-20 font-[Poppins]'>
            <h1 className='font-bold text-3xl'>
                Your Wishlist
            </h1>
            <div>
                {
                    product?.map((product)=>{
                        return(
                            <div key={product.id} className='bg-gray-100 rounded-xl max-w-full lg:mx-12 lg:flex justify-between
                         items-center p-6 mt-8'>
                                <div>
                                    <Link className='flex justify-center my-3' to={`/product/${product.id}`}>
                                        <img
                                            src={product.images[0].image}
                                            alt={product.name}
                                            className="object-contain w-96 h-36 lg:w-36 rounded-2xl bg-gray-100"
                                        />
                                    </Link>

                                </div>
                                <Link className='flex justify-center my-3' to={`/product/${product.id}`}>
                                    <div className=" text-xl font-semibold text-center w-96">{product?.name}</div>
                                </Link>
                                <div className=" items-center lg:justify-between space-x-6 font-semibold ">
                                <div className="lg:p-4 lg:px-6 text-3xl font-[Poppins] text-black text-center lg:whitespace-nowrap">${product.lowest}</div>
                                </div>
                                <div className="p-4 px-6 text-center lg:whitespace-nowrap">

                                    <button  onClick={()=>removeProduct(product.id)}>
                                        <img className='border p-4 block' src={x} alt=""/>
                                    </button>
                                </div>
                                   <button onClick={() => addToCarts(product.id)} className="lg:mr-12">
                                       <img src={cart} alt=""/>
                                   </button>
                            </div>)
                    })
                }

            </div>
        </div>
             <div className='mb-36'/>
            <Footer/>
    </div>
    );
}

export default Wishlist;