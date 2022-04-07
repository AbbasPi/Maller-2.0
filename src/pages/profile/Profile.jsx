import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import {BASE_URL, TOKEN_KEY, TOKEN_STR} from "../../utils/Constants";
import AuthContext from "../../contexts/AuthContext";

function Profile() {
    const navigate = useNavigate()
    const [info, setInfo] = useState([]);
    const { register, handleSubmit, formState : {errors} } = useForm();
    const {isAuth, user} = useContext(AuthContext)
    const onSubmit = data => {
        axios.put(`${BASE_URL}/auth/me`, data, { headers: {"Authorization" : `${user.token_type} ${user.access_token}`} })
    }
    useEffect(()=>{
    !isAuth  ? navigate('/login')
        :
        (axios.get(`${BASE_URL}/auth/me`,   { headers: {"Authorization" : `${user.token_type} ${user.access_token}`}}).then((res)=>{
            setInfo(res.data)
        }).catch((err)=>{
            console.log(err)
        })
)
    }, [isAuth, user])


    return (
        <div>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <form className="bg-white px-6 py-8  rounded-xl shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Profile</h1>
                        <div className={`${errors.first_name?.type === 'required' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                             role="alert">
                            <span className="block sm:inline">First Name Is Required</span>
                        </div>
                        <input
                            type="text"
                            className="block focus:outline-none focus:ring focus:ring-cyan-300 border active:border-black w-full p-3  rounded-xl mb-4"
                            placeholder="First Name" defaultValue={info.first_name} {...register("first_name",
                            {required: true, max: 20, maxLength: 80})}

                        />
                        <div className={`${errors.last_name?.type === 'required' ? 'block' : 'hidden'} bg-red-100 border
                         border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                             role="alert">
                            <span className="block sm:inline">Last Name Is Required</span>
                        </div>
                        <input
                            type="text"
                            className="block focus:outline-none focus:ring focus:ring-cyan-300 border active:border-black w-full p-3  rounded-xl mb-4"
                            placeholder="Last Name" defaultValue={info.last_name} {...register("last_name",
                            {required: true, maxLength: 100})}
                        />
                        <div className={`${errors.email?.type === 'required' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                             role="alert">
                            <span className="block sm:inline">Email Is Required</span>
                        </div>
                        <div className={`${errors.email?.type === 'pattern' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                             role="alert">
                            <span className="block sm:inline">Invalid Email</span>
                        </div>
                        <input
                            type="email"
                            className="block border focus:outline-none focus:ring focus:ring-cyan-300 active:border-black w-full p-3  rounded-xl mb-4"
                            placeholder="Email" defaultValue={info.email} {...register("email",
                            {required: true, maxLength: 100})}

                        />
                        <div className={`${errors.phone_number?.type === 'required' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                             role="alert">
                            <span className="block sm:inline">Phone Number Is Required</span>
                        </div>
                        <div className={`${errors.phone_number?.type === 'pattern' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3  rounded-xl relative`}
                             role="alert">
                            <span className="block sm:inline">Invalid Phone Number</span>
                        </div>
                        <input
                            type="text"
                            className="block focus:outline-none focus:ring focus:ring-cyan-300 border active:border-black w-full p-3  rounded-xl mb-4"
                            placeholder="Phone number" defaultValue={info.phone_number} {...register("phone_number",
                            {required: true, pattern: /^(((?:\+|00)964)|(0)*)7\d{9}$/gm})}/>
                        <button
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            className="w-full text-center py-3  rounded-xl bg-cyan-500 text-white hover:bg-cyan-300 my-1"
                        >Save Changes</button>
                    </form>

                    <div className="text-grey-dark mt-6">
                        <Link to='/edit-address' className="no-underline border-b border-blue text-blue">
                        Edit Address &nbsp;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;