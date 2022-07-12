import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import {BASE_URL} from "../../utils/Constants";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/Loading";
import CartContext from "../../contexts/CartContext";

function Checkout() {
    const {isAuth, user} = useContext(AuthContext)
    const {getCart, setCount, setCarts} = useContext(CartContext)
    const [city, setCity] = useState([]);
    const [order, setOrder] = useState([])
    const [address, setAddress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(0)
    const [promoMsg, setPromoMsg] = useState('')
    const [promo, setPromo] = useState('')
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()
    const {register, handleSubmit, formState: errors} = useForm();
    const getOrder = () => {
        axios.get(`${BASE_URL}/order`, {headers: {"Authorization": `${user.token_type} ${user.access_token}`}})
            .then((res) => {
                // setLoading(true)
                setOrder(res.data)
                order[0] && setTotal(order[0]?.order_total)
                setLoading(false)
            }).catch(function (error) {
            if (error.response) {
                setStatus(error.response.status)
            }
        })
    }
    const onSubmit = data => {
        axios.put(`${BASE_URL}/address/${address[0].id}`, data, {headers: {"Authorization": `${user.token_type} ${user.access_token}`}}).then(() => {
            getOrder()
        })
    }
    useEffect(() => {
        !isAuth ? navigate('/login') : getOrder()
        axios.get(`${BASE_URL}/address/city/all`, {headers: {"Authorization": `${user.token_type} ${user.access_token}`}}).then((res) => {
            // setLoading(true)
            setCity(res.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)

        })
        axios.get(`${BASE_URL}/address/address`, {headers: {"Authorization": `${user.token_type} ${user.access_token}`}}).then((res) => {
            // setLoading(true)
            setAddress(res.data)
            setLoading(false)
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.status);
                setStatus(error.response.status)
            }
        })
    }, [isAuth, user, promoMsg])


    const checkout = (() => {
        if (order && address) {
            axios.post(`${BASE_URL}/order/${address[0].id}/update_address`, null, {
                params: {order_pk: order[0].id, address_pk: address[0].id},
                headers: {"Authorization": `${user.token_type} ${user.access_token}`}
            }).then(() => {
                axios.post(`${BASE_URL}/order/checkout`, null, {headers: {"Authorization": `${user.token_type} ${user.access_token}`}}).then(() => {
                    setCarts([])
                    getCart()
                    navigate("/")
                })
            })
        }

    })

    const addPromo = () => {
        axios.post(`${BASE_URL}/order/promo`, {
            promo_code: promo, order_id: order[0].id
        }, {headers: {"Authorization": `${user.token_type} ${user.access_token}`}}).then((res) => {
            setPromoMsg('Promo Code Applied Successfully')
        }).catch(function (error) {
            if (error.response) {
                setPromoMsg('Invalid Promo Code')
            }
        })
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addPromo()
        }
    }

    if (status === 404) {
        navigate("/address")
    }

    if (!order.length) {
        return <Loading/>
    }


    return (<div className='mt-32 font-[Poppins]'>
        <div className='max-w-7xl mx-auto grid lg:grid-cols-5 '>
            <div className='col-span-3'>
                <h1 className='text-justify m-4 text-2xl font-[Poppins] ml-7 font-medium'>Shipping Info</h1>
                <div className="min-h flex flex-col">
                    <div
                        className="container max-w-full mx-auto flex flex-col items-center justify-center ">
                        <form className="bg-white px-6 rounded-xl text-black w-full">
                            {address.map((address) => {
                                return <div key={address.id}>
                                    <div
                                        className={`${errors.last_name?.type === 'required' ? 'block' : 'hidden'}
                                             bg-red-100 border
                                                border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                                        role="alert">
                                        <span className="block sm:inline">Address Is Required</span>
                                    </div>
                                    <h1 className='text-justify font-semibold p-1'>Address 1</h1>
                                    <input
                                        className='block border active:border-black w-full p-3  rounded-xl mb-4'
                                        type="text" placeholder="Address 1"
                                        defaultValue={address.address1}
                                        {...register("address1", {max: 20, maxLength: 80})} />
                                    <h1 className='text-justify font-semibold p-1'>Address 2</h1>
                                    <input
                                        className='block border active:border-black w-full p-3  rounded-xl mb-4'
                                        type="text" placeholder="Address 2"
                                        defaultValue={address.address2}
                                        {...register("address2", {required: true, maxLength: 100})} />
                                    <div
                                        className={`${errors.phone?.type === 'required' ? 'block' : 'hidden'} 
                                            bg-red-100 border border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                                        role="alert">
                                                        <span
                                                            className="block sm:inline">Phone Number Is Required</span>
                                    </div>
                                    <div
                                        className={`${errors.phone?.type === 'pattern' ? 'block' : 'hidden'} 
                                            bg-red-100 border border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                                        role="alert">
                                        <span className="block sm:inline">Invalid Phone Number</span>
                                    </div>
                                    <h1 className='text-justify font-semibold p-1'>Phone Number</h1>
                                    <input
                                        className='block border active:border-black w-full p-3 rounded-xl mb-4'
                                        type="text" placeholder="Phone number"
                                        defaultValue={address.phone}
                                        {...register("phone", {
                                            required: true, pattern: /^(((?:\+|00)964)|(0)*)7\d{9}$/gm
                                        })} />
                                </div>
                            })}
                            <div className='flex flex-col'>
                                <div className={`${errors.city_id?.type === 'required' ? 'block' : 'hidden'} 
                                            bg-red-100 border border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                                     role="alert">
                                    <span className="block sm:inline">City Is Required</span>
                                </div>
                                <select id='city'
                                        className='float-left border p-2 font-medium bg-gray-100  rounded-xl mb-5'
                                        {...register("city_id", {required: true})}>
                                    <option className='py-12 rounded-xl'
                                            hidden>{order[0]?.address.city.name}</option>
                                    {city.map((city) => {
                                        return <option className='py-12 rounded-xl' key={city.id}
                                                       value={city.id}>{city.name}</option>
                                    })}
                                </select>
                                <div className='flex items-center mb-6'>
                                    <label className='font-medium'> Work Address</label>
                                    <input className='w-12 h-4'
                                           type="checkbox" {...register('work_address', {required: false})} />
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                                className="bg-[#39818d] rounded-xl px-6 border border-white font-[Poppins] hover:bg-white
                         hover:text-[#39818d] py-3 w-full text-white hover:border-[#39818d]"
                            >Confirm Address
                            </button>
                        </form>
                    </div>
                </div>
            </div>


            <div className='lg:col-span-2 col-span-3  mt-8 lg:mt-0 max-w-7xl bg-gray-100 rounded-xl'>
                <p className={`${promoMsg === '' ? 'hidden' : 'block'} ${promoMsg === 'Invalid Promo Code' ? 'bg-red-600' : 'bg-green-500'}
                     rounded-2xl p-2 text-xl text-white`}>{promoMsg}</p>
                <div
                    className='text-left m-4 text-2xl flex justify-between border-b border-gray-400 uppercase pb-3'>
                    <input value={promo} type={"text"} placeholder={"Discount Code"}
                           onKeyDown={handleKeyDown}
                           onChange={(e) => setPromo(e.target.value)}
                           className={'p-3 lg:w-full w-60 focus:outline-none focus:ring focus:ring-cyan-300 border w-full p-3 rounded-2xl'}/>
                    <button onClick={() => addPromo()} className='bg-[#39818d] rounded-xl px-6 border border-white font-[Poppins] hover:bg-white
                         hover:text-[#39818d]  w-28 lg:ml-4 text-white hover:border-[#39818d]'>Apply
                    </button>
                </div>
                <div
                    className='text-justify m-4 text-xl space-y-4 border-b border-gray-400 text-gray-800 uppercase pb-3'>
                    <div className='flex justify-between'>
                        <h1>Subtotal</h1>
                        <h1>${order[0]?.order_total}</h1>
                    </div>
                    <div className='flex justify-between'>
                        <h1>Shipping To
                            <a href='#city' className='text-black font-semibold ml-2'>
                                {order[0]?.address.city.name}
                            </a>
                        </h1>
                        <h1>+ ${order[0]?.order_shipment}</h1>
                    </div>
                    <div className='flex justify-between'>
                        <h1>Total</h1>
                        <h1>${order[0]?.order_shipment + order[0]?.order_total}</h1>
                    </div>
                    <div className='py-2'>
                        <button onClick={() => checkout()} className='bg-[#39818d] rounded-xl px-6 border border-white font-[Poppins] hover:bg-white
                         hover:text-[#39818d] py-3 w-full text-white hover:border-[#39818d]'>Checkout
                        </button>
                    </div>

                </div>
                <div
                    className='flex justify-between border-b border-gray-400 uppercase pb-3 text-justify m-4 text-2xl'>

                    <h1 className=''>
                        Your Cart</h1><h1>
                    <Link className='hover:underline hover:opacity-70' to='/cart'>Go To Cart</Link>
                </h1>
                </div>
                <div>
                    {order?.map((product) => {
                        return <div key={product.id}>
                            {product.items.map((item) => {
                                return <div key={item.id}
                                            className='mx-6 flex justify-between items-center'>
                                    <div className='relative my-4'>
                                        <img src={item.product.images[0].image}
                                             className=' lg:h-28 lg:w-36 h-24 w-28 object-contain bg-white object-center rounded-xl'/>
                                        <span
                                            className='absolute -top-1 -right-2 bg-gray-900 text-white px-2 py-1 rounded-full'>{item.item_qty}</span>
                                    </div>
                                    <div className='w-60 ml-4 text-lg text-left'>
                                        <h1>
                                            {item.product.name}
                                        </h1>
                                    </div>
                                    <div className='w-10'>
                                        <h1 className='text-xl'>
                                            ${item.product.lowest}
                                        </h1>
                                    </div>
                                </div>
                            })}
                        </div>
                    })}
                </div>
            </div>


        </div>
        <div className='my-12'/>
        <Footer/>
    </div>);
}

export default Checkout;