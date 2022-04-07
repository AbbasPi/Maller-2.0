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
    const [total, setTotal] = useState([])
    const [status, setStatus] = useState(404)
    const {carts, removeCart, count, addQty, getCart, empty, loading} = useContext(CartContext)
    const {isAuth, user} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
    if(!isAuth){
        navigate('/login')
    }
        getCart()
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
                <table className="w-full ">
                    <thead>
                    <tr className="border-b">
                        <th className="px-6 py-3 font-bold whitespace-nowrap"/>
                        <th className="px-6 py-3 font-bold whitespace-nowrap text-2xl">Product Description</th>
                        <th className="px-6 py-3 font-bold whitespace-nowrap text-2xl">Quantity</th>
                        <th className="px-6 py-3 font-bold whitespace-nowrap text-2xl">Remove</th>
                        <th className="px-6 py-3 font-bold whitespace-nowrap text-2xl">Price</th>
                    </tr>
                    </thead>
                    <tbody>
               {
                carts?.map((product)=>{

                    return(<tr key={product?.id}>
                            <td>

                                {/*<Link className='flex justify-center my-3' to={`/product/${product.product.id}`}>*/}

                                    <img
                                        src={product?.product.images.map((img)=>{
                                            return img.image
                                        })}
                                        alt={product?.product.name}
                                        className="object-contain h-28 w-32 rounded-2xl"
                                    />
                                {/*</Link>*/}

                        </td>
            {/*<Link className='flex justify-center my-3' to={`/product/${product.product.id}`}>*/}
                        <td className="p-6 px6 text-xl font-semibold text-center w-96">{product?.product.name}</td>
            {/*</Link>*/}
                        <td className="p-4 px-6 text-center font-semibold whitespace-nowrap">
                            <QuantityPicker  width='8rem' min={1} defaultValue={1} value={product?.item_qty} onChange={(value)=>addQty(product.id, value, product.product.lowest)}/>
                        </td>
                        <td className="p-4 px-6 text-center whitespace-nowrap">

                            <button  onClick={()=>removeCart(product.id)}>
                                <img className='border p-4' src={x} alt=""/>
                            </button>
                        </td>
                        <td className="p-4 px-6 text-2xl font-semibold text-center whitespace-nowrap">${product?.product.lowest}</td>
                  </tr>)
                        })
                    }

                    </tbody>
                </table>

                <div className="mt-4">
                    <div className="py-4 rounded-md shadow">
                        <div
                            className="
                flex
                items-center
                justify-between
                px-4
                py-2
                mt-3
                border-t-2
              "
                        >
                            <span className="text-xl font-bold">Total</span>
                            <span className="text-2xl font-bold">${total}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <button onClick={()=>checkout()}
                        className="
              w-full
              py-2
              text-center text-white
              bg-blue-500
              rounded-md
              shadow
              hover:bg-blue-600
            "
                    >
                       <Link to={'/checkout'}>
                        Proceed to Checkout
                       </Link>
                    </button>
                </div>
            </div>
                </div>
            <Footer/>
                </div>
            }
        </div>

    )
}

export default Cart;
