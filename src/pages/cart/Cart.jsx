import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import { QuantityPicker } from 'react-qty-picker';
import {Link, useNavigate} from 'react-router-dom';
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import './cart.css'
import { BASE_URL, TOKEN_STR } from '../../../src/utils/Constants';
import products from "../products/Products";
import Loading from "../../components/Loading";
import x from '../../components/assets/svg/x-symbol.svg'
import CartContext from "../../contexts/CartContext";
import AuthContext from "../../contexts/AuthContext";

function Cart() {
    // const [total, setTotal] = useState([])
    const [status, setStatus] = useState(404)
    const {carts, removeCart, count, addQty, getCart, empty, loading, setCount, total} = useContext(CartContext)
    const {isAuth, user} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
    if(!isAuth){
        navigate('/login')
    }
        getCart()
        setCount(carts.length)
        setStatus(empty)
    }, [isAuth, count, empty, user])

    console.log(carts)
    const checkout = (()=>{
        const item = []
        carts.map((i)=>{
            item.push(i.id)
        })
        axios.post(`${BASE_URL}/order`, {items :item}, { headers: {"Authorization":
                    `${TOKEN_STR.token.token_type} ${TOKEN_STR.token.access_token}`} })
            .catch((err)=>{
                console.log(err)
            })
    })
    if(status === 404)
    {
        return (
                <div>
                <Navbar/>
                    <div className='my-64'>

                    <h3 className='ech3'>Your Cart Is Empty</h3>
                    <p className='ecp'>Add Some Products</p>
                    <button className='bg-cyan-500 p-2 my-2 hover:bg-cyan-700 rounded-md'>
                        <Link style={{ textDecoration: 'none', color: 'white'}} to='/products' >Go To Products</Link>
                    </button>
                    <p className='ecp'>Have an Active Order? </p>
                    <button className='bg-white border p-2 my-2 rounded-md hover:bg-gray-200'>
                        <Link style={{ textDecoration: 'none', color: 'black'}} to='/checkout-info' >My Order</Link>
                    </button>
                    </div>
                    <Footer/>
                </div>
        )
    }

    return (
        <div>
            {
                loading ?
                    <Loading/>
                    :
        <div>
    <Navbar/>
        <div className="container p-8 mx-auto mt-12">
            <div className="w-full overflow-x-auto">
                <div className="w-full">
                    <div>
                    <div className="border-b flex justify-between mx-16">
                        <div className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap text-2xl ">Product Image</div>
                        <div className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap text-2xl ">Product Description</div>
                        <div className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap text-2xl ml-24">Quantity</div>
                        <div className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap text-2xl">Remove</div>
                        <div className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap text-2xl">Price</div>
                    </div>
                    </div>
                    <div>
               {
                carts?.map((product)=>{

                    return(
                        <div key={product?.id} className='bg-gray-200 rounded-xl max-w-full mx-16 flex justify-between
                         items-center p-6 mt-8'>
                            <div>

                                <Link className='flex justify-center my-3' to={`/product/${product.product.id}`}>

                                    <img
                                        src={product?.product.images.map((img)=>{
                                            return img.image
                                        })}
                                        alt={product?.product.name}
                                        className="object-contain h-36 w-36 rounded-2xl bg-gray-100"
                                    />
                                </Link>

                        </div>
            <Link className='flex justify-center my-3' to={`/product/${product.product.id}`}>
                        <div className=" text-xl font-semibold text-center w-96">{product?.product.name}</div>
            </Link>
                        <div className=" text-center font-semibold whitespace-nowrap">
                            <QuantityPicker  width='5rem' min={1} defaultValue={1} value={product?.item_qty} onChange={(value)=>addQty(product.id, value, product.product.lowest)}/>
                        </div>
                        <div className="p-4 px-6 text-center whitespace-nowrap">

                            <button  onClick={()=>removeCart(product.id)}>
                                <img className='border p-4' src={x} alt=""/>
                            </button>
                        </div>
                        <div className="p-4 px-6 text-2xl font-[Poppins] text-black text-center whitespace-nowrap">${product?.product.lowest}</div>
                  </div>)
                        })
                    }

                    </div>
                </div>

                <div className="mt-4 mx-auto max-w-7xl border-t-2 flex items-center">
                    <div className="py-4">
                        <div className="flex space-x-4 items-center px-4 py-2">
                            <span className="text-xl text-gray-600 font-bold border-2 border-gray-300 p-3 py-4 uppercase">Total: ${total}</span>
                    <button onClick={()=>checkout()}
                        className="p-2 py-5 h- items-center text-center text-white bg-cyan-500 rounded-md shadow hover:bg-cyan-600">
                       <Link to={'/checkout'}>
                        Proceed to Checkout
                       </Link>
                    </button>
                        </div>
                    </div>
                </div>
            </div>
                </div>
            <div className='mb-40'/>
            <Footer/>
                </div>
            }
        </div>

    )
}

export default Cart;
