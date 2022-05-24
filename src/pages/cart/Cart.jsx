import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import plus from '../../components/assets/svg/plus.png'
import minus from '../../components/assets/svg/minus.png'
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import './cart.css'
import { BASE_URL } from '../../utils/Constants';
import Loading from "../../components/Loading";
import x from '../../components/assets/svg/x-symbol.svg'
import CartContext from "../../contexts/CartContext";
import AuthContext from "../../contexts/AuthContext";

function Cart() {
    const {carts, removeCart, increaseQty, reduceQty, getCart, empty, setCount, total, count, setEmpty, main} = useContext(CartContext)
    const {isAuth, user} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
    if(!isAuth){
        navigate('/login')
    }
        getCart()
        setCount(carts.length)
        if(count === 0){
            setEmpty(404)
        }
    }, [isAuth, empty, user])

    const checkout = (()=>{
        const item = []
        carts.map((i)=>{
            item.push(i.id)
        })
        axios.post(`${BASE_URL}/order`, {items :item}, { headers: {"Authorization":
                    `${user.token_type} ${user.access_token}`} })
            .catch((err)=>{
                console.log(err)
            })
    })


    if(empty === 404)
    {
        return (
                <div className='font-[Poppins]'>
                <Navbar/>
                    <div className='my-64'>
                    <h3 className='font-bold text-4xl'>Your Cart Is Empty</h3>
                    <p className='text-xl mt-6 '>Add Some Products</p>
                    <button className='bg-cyan-500 p-2 my-2 hover:bg-cyan-700 rounded-md'>
                        <Link style={{ textDecoration: 'none', color: 'white'}} to='/products' >Go To Products</Link>
                    </button>
                    <p className='ecp'> </p>
                    <button className='bg-white border p-2 my-2 rounded-md hover:bg-gray-200'>
                        <Link style={{ textDecoration: 'none', color: 'black'}} to='/checkout' >Checkout</Link>
                    </button>
                    </div>
                    <Footer/>
                </div>
        )
    }

    return (
        <div>
            {
                !carts.length ?
                    <Loading/>
                    :
        <div>
    <Navbar/>
        <div className="container p-8 max-w-full mx-auto mt-20">
            <div className="w-full ">
                <div className="w-full">
                    <div className='hidden lg:block'>
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
                        <div key={product?.id} className='bg-gray-100 rounded-xl max-w-full lg:mx-16 lg:flex justify-between
                         items-center p-6 mt-8'>
                            <div>
                                <Link className='flex justify-center my-3' to={`/product/${product.product.id}`}>
                                    <img
                                        src={product?.product.images[0].image}
                                        alt={product?.product.name}
                                        className="object-contain w-96 h-36 lg:w-36 rounded-2xl bg-gray-100"
                                    />
                                </Link>

                        </div>
            <Link className='flex justify-center my-3' to={`/product/${product.product.id}`}>
                        <div className=" text-xl font-semibold text-center w-96">{product?.product.name}</div>
            </Link>
                        <div className="flex items-center justify-between space-x-6 font-semibold ">
                            <img onClick={()=>increaseQty(product.id)} src={plus} className='w-8 hover:cursor-pointer' />
                            <span className='text-3xl font-[Poppins] text-black text-center lg:whitespace-nowrap'>{product.item_qty}</span>
                            <img onClick={()=>reduceQty(product.id)} src={minus} className='w-8 hover:cursor-pointer' />
                        </div>
                        <div className="p-4 px-6 text-center lg:whitespace-nowrap">

                            <button  onClick={()=>removeCart(product.id)}>
                                <img className='border p-4' src={x} alt=""/>
                            </button>
                        </div>
                        <div className="lg:p-4 lg:px-6 text-3xl font-[Poppins] text-black text-center lg:whitespace-nowrap">${product?.product.lowest}</div>
                  </div>)
                        })
                    }

                    </div>
                </div>

                <div className="mt-4 mx-auto max-w-sm lg:max-w-7xl border-t-2 flex items-center">
                    <div className="py-4">
                        <div className="flex space-x-4 items-center px-4 py-2">
                            <span className="text-xl text-gray-600 font-bold border-2 border-gray-300 p-3 py-4 uppercase">Total: ${total}</span>
                    <button onClick={()=>checkout()}
                        className="p-2 border border-cyan-500 py-4 text-xl items-center text-center text-white bg-cyan-500 rounded-md shadow hover:bg-cyan-600">
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
