import React, {useContext, useEffect, useState} from 'react';
import './navbar.css'
import logo from '../assets/media/logo.png'
import account from '../assets/media/account.png'
import search from '../assets/svg/icons8-search.svg'
import {Link, useLocation, useNavigate} from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import AuthContext from "../../contexts/AuthContext";

const Navbar = ({loading, query}) => {
    const navigate = useNavigate()
    const [open,setOpen]=useState(false);
    const {count, carts, getCart, empty, setCount} = useContext(CartContext);
    const {logout, isAuth, user} = useContext(AuthContext)
    const location = useLocation()

    useEffect(()=>{
        getCart()
        setCount(carts.length)
    }, [isAuth, empty, user])

        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                navigate('/products')
            }
        }

        return (

        <div className=' w-full z-50 bg-white fixed h-20 top-0 left-0'>
            {
                loading ? null
                    :
        <div className='w-full z-50 bg-[#DFEBEC] shadow fixed h-20 top-0 left-0'>

            <div className='font-[Poppins] lg:flex items-center justify-between py-2 lg:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
                    <Link to='/' className={'w-24 m-auto lg:block'}>
                    <img src={logo} alt={'logo'}/>
                        {/*<h3>MALLER</h3>*/}
                    </Link>

                </div>
                 <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer lg:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </div>

                <ul className={`lg:flex lg:items-center lg:pb-0 pb-12 absolute lg:static bg-[#DFEBEC] lg:z-auto z-[-1]
                 left-0 w-full lg:w-auto lg:pl-0 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-300px]'}`}>
                    <div className='relative lg:hidden mt-2' >

                        <input placeholder='SEARCH' className='w-80  rounded-2xl pl-3 py-2
                                          focus:outline-none focus:ring focus:ring-cyan-500 border'
                               type="text" onChange={(e)=>query(e.target.value)}
                               onKeyDown={handleKeyDown}/>
                        <Link to='/products'>
                            <img src={search} className={`${open ? 'top-1 ':'top-[-300px]'} absolute  lg:hidden right-14
                             w-8 hover:cursor-pointer`}/>
                        </Link>
                    </div>
                    <li onClick={()=>setOpen(!open)} className='lg:ml-8 text-xl lg:my-0 my-7'>
                        <Link to={'/'} className={`text--800 hover:text-cyan-700 duration-100 
                                ${location.pathname === '/' && 'text-cyan-700 border-b-2 border-b-cyan-700'}  `}>Home</Link>
                    </li>
                    <li onClick={()=>setOpen(!open)} className='lg:ml-8 text-xl lg:my-0 my-7'>
                        <Link to={'/products'} className={`text--800 hover:text-cyan-700 duration-100 
                                ${location.pathname === '/products' && 'text-cyan-700 border-b-2 border-b-cyan-700'}  `}>Products</Link>
                    </li>
                    <li onClick={()=>setOpen(!open)} className='lg:ml-8 text-xl lg:my-0 my-7'>
                        <Link to={'/stores'} className={`text--800 hover:text-cyan-700 duration-100 
                                ${location.pathname === '/stores' && 'text-cyan-700 border-b-2 border-b-cyan-700'}  `}>Stores</Link>
                    </li>
                </ul>
                <div className='relative hidden lg:block'>
                <input placeholder='SEARCH' className='w-96 rounded-2xl pl-3 py-2 hidden lg:block
                                          focus:outline-none focus:ring focus:ring-cyan-500 border'
                       type="text" onChange={(e)=>query(e.target.value)}
                onKeyDown={handleKeyDown}/>
                    <Link to='/products'>
                <img src={search} className={` absolute transition-all top-2 right-2 w-7 hover:cursor-pointer`}/>
                    </Link>
                </div>
                    <div className='flex -mt-14 lg:mt-0 lg:block'>
                            <div className="dropdown1 hover:cursor-pointer">
                                <img className={'w-8 mr-6 inline-block'} alt='' src={account}/>
                                {
                                    isAuth ?
                                <div className="dropdown-content1">
                                    <Link to="/profile">Profile</Link>
                                    <Link to ='/login'>
                                    <button onClick={logout}>Log Out</button>
                                    </Link>
                                </div>
                                        :
                                <div className="dropdown-content1">
                                    <Link to="/signup">Sign Up</Link>
                                    <Link to="/login">Login</Link>
                                </div>
                                }
                            </div>
                        <Link  to='/cart' className={'w-8 -mb-2 mr-6 inline-block relative'} >
                            <span className='absolute bg-red-500 rounded-full px-1 text-white font-semibold ml-1'>
                                {count}
                            </span>
                        <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.36495 24.4577L0.0583607 24.3481L1.36495 24.4577ZM28.6351 24.4577L29.9417
                            24.3481L28.6351 24.4577ZM27.3018 12.1243L25.9951 12.234L27.3018 12.1243ZM2.69827 12.1243L4.00486 12.234L2.69827 12.1243ZM6.6875 13.9583C6.6875 14.5969 7.27513 15.1146 8 15.1146C8.72489 15.1146 9.3125 14.5969 9.3125 13.9583H6.6875ZM20.6875 13.9583C20.6875 14.5969 21.2752 15.1146 22 15.1146C22.7249 15.1146 23.3125 14.5969 23.3125 13.9583H20.6875ZM6.1825 10.4896H23.8176V8.17708H6.1825V10.4896ZM25.9951 12.234L27.3284 24.5673L29.9417 24.3481L28.6084 12.0147L25.9951 12.234ZM25.1509 26.6771H4.84918V28.9896H25.1509V26.6771ZM2.67153 24.5673L4.00486 12.234L1.39169 12.0147L0.0583607 24.3481L2.67153 24.5673ZM4.84918 26.6771C3.55911 26.6771 2.54922 25.6986 2.67153 24.5673L0.0583607 24.3481C-0.210719 26.8371 2.01105 28.9896 4.84918 28.9896V26.6771ZM27.3284 24.5673C27.4507 25.6986 26.4408 26.6771 25.1509 26.6771V28.9896C27.989 28.9896 30.2107 26.8371 29.9417 24.3481L27.3284 24.5673ZM23.8176 10.4896C24.9453 10.4896 25.8882 11.2449 25.9951 12.234L28.6084 12.0147C28.3732 9.83881 26.2985 8.17708 23.8176 8.17708V10.4896ZM6.1825 8.17708C3.70139 8.17708 1.62692 9.83881 1.39169 12.0147L4.00486 12.234C4.11178 11.2449 5.05473 10.4896 6.1825 10.4896V8.17708ZM9.3125 7.79167C9.3125 5.02448 11.8589 2.78125 15 2.78125V0.46875C10.4091 0.46875 6.6875 3.74734 6.6875 7.79167H9.3125ZM15 2.78125C18.1411 2.78125 20.6875 5.02448 20.6875 7.79167H23.3125C23.3125 3.74734 19.5908 0.46875 15 0.46875V2.78125ZM6.6875 7.79167V13.9583H9.3125V7.79167H6.6875ZM20.6875 7.79167V13.9583H23.3125V7.79167H20.6875Z" fill="#3B828B"/>
                        </svg>
                        </Link>
                    </div>
            </div>
        </div>
            }
            </div>
    )

}

export default Navbar;
