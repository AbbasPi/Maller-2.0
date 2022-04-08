import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import {BASE_URL, TOKEN_STR} from "../../utils/Constants";
import products from "../products/Products";
import Footer from "../../components/footer/Footer";

function Checkout() {
    const {isAuth, user} = useContext(AuthContext)
    const [city, setCity] = useState([]);
    const [order, setOrder] = useState([])
    const [address, setAddress] = useState([]);
    const [status, setStatus] = useState(0)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: errors } = useForm();
    const onSubmit = data => {
        axios.put(`${BASE_URL}/address/${address[0].id}`, data, { headers: {"Authorization" : `${TOKEN_STR.token.token_type} ${TOKEN_STR.token.access_token}`} })
    }
    useEffect(()=>{
        !isAuth  ? navigate('/login')
            :
            axios.get(`${BASE_URL}/address/city/all`, { headers: {"Authorization" : `${TOKEN_STR.token.token_type} ${TOKEN_STR.token.access_token}`} }).then((res)=>{
                setCity(res.data)
            }).catch((err)=>{
                console.log(err)
            })
        axios.get(`${BASE_URL}/address/address`, { headers: {"Authorization" : `${TOKEN_STR.token.token_type} ${TOKEN_STR.token.access_token}`} } ).then((res)=>{
            setAddress(res.data)
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.status);
                setStatus(error.response.status)
            }
        })
        axios.get(`${BASE_URL}/order`, { headers: {"Authorization" : `${TOKEN_STR.token.token_type} ${TOKEN_STR.token.access_token}`} })
            .then((res)=>{
                setOrder(res.data)
            }).catch((err)=>{
            console.log(err);
        })
    }, [])

    const checkout = (()=>{
        axios.post(`${BASE_URL}/order/checkout`, null, { headers: {"Authorization" : `${TOKEN_STR.token.token_type} ${TOKEN_STR.token.access_token}`} })
        setOrder(null)
        navigate("/")

    })

    if(status === 404){
        navigate("/address")
    }
    return (
        <div className='mt-32'>
            <div className='max-w-7xl mx-auto grid lg:grid-cols-5 '>
                <div className='col-span-3'>
                    <h1 className='text-justify m-4 text-2xl font-[Poppins] font-medium'>Shipping Info</h1>
                    <div className="min-h flex flex-col">
                        <div className="container max-w-full mx-auto flex flex-col items-center justify-center px-2">
                            <form className="bg-white px-6 py-8 rounded-xl text-black w-full">

                                {
                                    address.map((address)=>{
                                        return <div>
                                            <div className={`${errors.last_name?.type === 'required' ? 'block' : 'hidden'}
                                             bg-red-100 border
                                                border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                                                 role="alert">
                                                <span className="block sm:inline">Address Is Required</span>
                                            </div>
                                            <h1 className='text-justify font-semibold p-1'>Address 1</h1>
                                            <input className='block border active:border-black w-full p-3  rounded-xl mb-4'
                                                   type="text" placeholder="Address 1" defaultValue={address.address1}
                                                   {...register("address1", {max: 20, maxLength: 80})} />
                                            <h1 className='text-justify font-semibold p-1'>Address 2</h1>
                                            <input className='block border active:border-black w-full p-3  rounded-xl mb-4'
                                                   type="text" placeholder="Address 2" defaultValue={address.address2}
                                                   {...register("address2", {required: true, maxLength: 100})} />
                                            <div className={`${errors.phone?.type === 'required' ? 'block' : 'hidden'} 
                                            bg-red-100 border border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                                                 role="alert">
                                                <span className="block sm:inline">Phone Number Is Required</span>
                                            </div>
                                            <div className={`${errors.phone?.type === 'pattern' ? 'block' : 'hidden'} 
                                            bg-red-100 border border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                                                 role="alert">
                                                <span className="block sm:inline">Invalid Phone Number</span>
                                            </div>
                                            <h1 className='text-justify font-semibold p-1'>Phone Number</h1>
                                            <input className='block border active:border-black w-full p-3 rounded-xl mb-4'
                                                   type="text" placeholder="Phone number" defaultValue={address.phone}
                                                   {...register("phone", {required: true, pattern:
                                                           /^(((?:\+|00)964)|(0)*)7\d{9}$/gm})} />
                                        </div>
                                    })
                                }
                                <div className='flex flex-col'>
                                    <select className='float-left border p-2 font-medium bg-gray-100  rounded-xl mb-5'
                                            {...register("city_id", { required: true })}>
                                        <option className='py-12 rounded-xl' hidden >City</option>
                                        {
                                            city.map((city)=>{
                                                return  <option className='py-12 rounded-xl' key={city.id}
                                                                value={city.id}>{city.name}</option>
                                            })
                                        }
                                    </select>
                                    <div className='flex items-center mb-6'>
                                        <label className='font-medium'> Work Address</label>
                                        <input className='w-12 h-4' type="checkbox" {...register('work_address',
                                            {required: false})} />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    onClick={handleSubmit(onSubmit)}
                                    className="w-full text-center py-3  rounded-xl bg-cyan-500 text-white hover:bg-cyan-300 my-1"
                                >Confirm</button>
                            </form>
                        </div>
                    </div>
                </div>






                <div className='col-span-2 bg-gray-100 rounded-xl'>
                    <div className='text-left m-4 text-2xl flex justify-between border-b border-gray-400 uppercase pb-3'>
                    <input type={"text"} placeholder={"Discount Code"} className={'p-3 rounded-xl border-2 border-gray-200'}/>
                        <button className='bg-[#39818d] rounded-xl px-6 border border-white font-[Poppins] hover:bg-white
                         hover:text-[#39818d] ml-4 text-white hover:border-[#39818d]'>Apply</button>
                    </div>
                    <div className='text-justify m-4 text-xl space-y-4 border-b border-gray-400 uppercase pb-3'>
                        <div className='flex justify-between'>
                        <h1>Subtotal</h1>
                        <h1>${order[0]?.order_total}</h1>
                        </div>
                        <div className='flex justify-between'>
                        <h1>Shipping</h1>
                        <h1>${order[0]?.order_shipment}</h1>
                        </div>
                        <div className='flex justify-between'>
                        <h1>Total</h1>
                        <h1>${order[0]?.order_shipment + order[0]?.order_total}</h1>
                        </div>

                    </div>
                        <h1 className='text-justify m-4 text-2xl font-[Poppins] font- border-b border-gray-400 uppercase pb-3'>
                        Your Cart</h1>
                            <div>
                                {
                                    order?.map((product)=>{
                                        return <div key={product.id}>
                                            {
                                                product.items.map((item)=>{
                                                   return <div key={item.id} className='mx-6 flex justify-between items-center'>
                                                       <div className='my-6'>
                                                       <img src={item.product.images.map((img)=>(
                                                           img.image
                                                       ))} className='h-28 w-36 object-contain bg-white object-center rounded-xl'/>
                                                       </div>
                                                        <div className='w-60 text-lg text-left'>
                                                            <h1>
                                                                {
                                                                    item.product.name
                                                                }
                                                            </h1>
                                                        </div>
                                                       <div className='w-10'>
                                                            <h1 className='font-[Poppins] text-xl'>
                                                                ${
                                                                   item.product.lowest
                                                                }
                                                            </h1>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    })
                                }
                            </div>
                </div>


            </div>
            <div className='my-12'/>
            <Footer/>
        </div>
    );
}

export default Checkout;