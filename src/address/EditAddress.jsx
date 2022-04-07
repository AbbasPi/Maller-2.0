import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL, TOKEN_STR } from '../utils/Constants';
import {Link, useNavigate} from 'react-router-dom';
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

function AddressEdit() {
    const [city, setCity] = useState([]);
    const [info, setInfo] = useState([]);
    const [address, setAddress] = useState([]);
    const [status, setStatus] = useState(0)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: errors } = useForm();
    const onSubmit = data => {
        axios.put(`${BASE_URL}/address/${address[0].id}`, data, { headers: {"Authorization" : `${TOKEN_STR.token.token_type} ${TOKEN_STR.token.access_token}`} })
    }
    useEffect(()=>{
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
    }, [])


    if(status === 404){
        navigate("/address")
    }
    return (

        <div>
            <div className="bg-grey-lighter mt-6 min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <form className="bg-white px-6 py-8  rounded-xl shadow-md text-black w-full">

                        <h1 className="mb-8 text-3xl text-center">Edit Address</h1>
                        {
                            address.map((address)=>{
                                return <div>
                                    <div className={`${errors.last_name?.type === 'required' ? 'block' : 'hidden'} bg-red-100 border
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
                        <div className={`${errors.phone?.type === 'required' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                             role="alert">
                            <span className="block sm:inline">Phone Number Is Required</span>
                        </div>
                        <div className={`${errors.phone?.type === 'pattern' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                             role="alert">
                            <span className="block sm:inline">Invalid Phone Number</span>
                        </div>
                                    <h1 className='text-justify font-semibold p-1'>Phone Number</h1>
                                    <input className='block border active:border-black w-full p-3 rounded-xl mb-4'
                                           type="text" placeholder="Phone number" defaultValue={address.phone}
                                           {...register("phone", {required: true, pattern: /^(((?:\+|00)964)|(0)*)7\d{9}$/gm})} />
                                </div>
                            })
                        }
                        <div className='flex flex-col'>
                            <select className='float-left border p-2 font-medium bg-gray-100  rounded-xl mb-5'  {...register("city_id", { required: true })}>
                            <option className='py-12 rounded-xl' hidden >City</option>
                            {
                                city.map((city)=>{
                                    return  <option className='py-12 rounded-xl' key={city.id} value={city.id}>{city.name}</option>
                                })
                            }
                        </select>
                        <div className='flex items-center mb-6'>
                            <label className='font-medium'> Work Address</label>
                            <input className='w-12 h-4' type="checkbox" {...register('work_address', {required: false})} />
                        </div>
                        </div>

                        <button
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            className="w-full text-center py-3  rounded-xl bg-cyan-500 text-white hover:bg-cyan-300 my-1"
                        >Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddressEdit;