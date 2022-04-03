import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import {BASE_URL, TOKEN_KEY} from "../../utils/Constants";

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [passwordAlert, setPasswordAlert] = useState(false)
    const submitButton = data => {
        if (data.password1 !== data.password2) {
            setPasswordAlert(true)
            return 0
        } else setPasswordAlert(false)
        axios.post(`${BASE_URL}/auth/signup`, data).then((res) => {
            const data = res.data;
            localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
            navigate('/')
        }).catch((error) => {
            console.log(error)
        });
    }


    return (
        <div>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <form onSubmit={submitButton} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <div className={`${errors.first_name?.type === 'required' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}
                             role="alert">
                            <span className="block sm:inline">First Name Is Required</span>
                        </div>
                        <input
                            type="text"
                            className="block border active:border-black w-full p-3 rounded mb-4"
                            name="first_name"
                            placeholder="First Name"
                            {...register("first_name", {required: true, maxLength: 80})}

                        />
                        <div className={`${errors.last_name?.type === 'required' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}
                             role="alert">
                            <span className="block sm:inline">Last Name Is Required</span>
                        </div>
                        <input
                            type="text"
                            className="block border active:border-black w-full p-3 rounded mb-4"
                            name="last_name"
                            placeholder="Last Name"
                            {...register("last_name", {required: true, maxLength: 80})}
                            />
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
                            {...register("email", {required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/})}

                        />
                        <div className={`${errors.phone?.type === 'required' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}
                             role="alert">
                            <span className="block sm:inline">Phone Number Is Required</span>
                        </div>
                        <div className={`${errors.phone?.type === 'pattern' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}
                             role="alert">
                            <span className="block sm:inline">Invalid Phone Number</span>
                        </div>
                        <input
                            type="text"
                            className="block border active:border-black w-full p-3 rounded mb-4"
                            name="phone"
                            placeholder="Phone Number"
                            {...register("phone", {required: true, pattern: /^(((?:\+|00)964)|(0)*)7\d{9}$/gm})}/>
                        <div className={`${passwordAlert ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}
                             role="alert">
                            <strong className="font-bold">Passwords &nbsp;</strong>
                            <span className="block sm:inline">Didn't Match</span>
                        </div>
                        <div className={`${errors.password1?.type === 'required' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}
                             role="alert">
                            <span className="block sm:inline">Please Set A Password</span>
                        </div>
                        <div className={`${errors.password1?.type === 'minLength' ? 'block' : 'hidden'} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}
                             role="alert">
                            <span className="block sm:inline">Your Password Should Be More Than 8 Characters</span>
                        </div>
                        <input
                            type="password"
                            className="block border active:border-black w-full p-3 rounded mb-4"
                            name="password1"
                            placeholder="Password"
                            {...register("password1", {required: true, min: 8, minLength: 8})}
                            />

                        <input
                            type="password"
                            className="block border active:border-black w-full p-3 rounded mb-4"
                            name="password2"
                            placeholder="Confirm Password"
                            {...register("password2", {required: true, min: 8, minLength: 8})}
                            />

                        <button
                            type="submit"
                            onClick={handleSubmit(submitButton)}
                            className="w-full text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-300 my-1"
                        >Create Account</button>

                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the &nbsp;
                            <Link to='/' className="no-underline border-b border-grey-dark text-grey-dark">
                                Terms of Service
                            </Link> and &nbsp;
                            <Link to='/' className="no-underline border-b border-grey-dark text-grey-dark">
                                Privacy Policy
                            </Link>
                        </div>
                    </form>

                    <div className="text-grey-dark mt-6">
                        Already have an account? &nbsp;
                        <Link to='/login' className="no-underline border-b border-blue text-blue">
                            Log in
                        </Link>.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;