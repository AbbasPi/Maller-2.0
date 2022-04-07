import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import {BASE_URL, TOKEN_KEY} from "../../utils/Constants";
import AuthContext from "../../contexts/AuthContext";

function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const {login, isAuth} = useContext(AuthContext)
    useEffect(()=>{
    if(isAuth === true){
        console.log(isAuth)
        navigate('/')
    }

    }, [isAuth])
    return (
        <div>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <form className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Login</h1>
                        <div className={`${errors.email?.type === 'required' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}
                             role="alert">
                            <span className="block sm:inline">Email Is Required</span>
                        </div>
                        <div className={`${errors.email?.type === 'pattern' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}
                             role="alert">
                            <span className="block sm:inline">Invalid Email</span>
                        </div>
                        <input
                            type="email"
                            className="block border active:border-black w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            {...register("email", {required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})}

                        />
                        <div className={`${errors.password1?.type === 'required' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}
                             role="alert">
                            <span className="block sm:inline">Please Enter Your Password</span>
                        </div>
                        <div className={`${errors.password1?.type === 'minLength' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}
                             role="alert">
                            <span className="block sm:inline">Your Password Should Be More Than 8 Characters</span>
                        </div>
                        <input
                            type="password"
                            className="block border active:border-black w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            {...register("password", {required: true, min: 8, minLength: 8})}
                        />
                        <button
                            type="submit"
                            onClick={handleSubmit(login)}
                            className="w-full text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-300 my-1"
                        >Login</button>
                    </form>
                    <div className="text-grey-dark mt-6">
                        Create New Account From Here &nbsp;
                        <Link to='/signup' className="no-underline border-b border-blue text-blue">
                            Sign Up
                        </Link>.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;