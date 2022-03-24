import React, {useState} from 'react';
import './navbar.css'
import logo from '../assets/media/logo.png'
import account from '../assets/media/account.png'
import {Link} from "react-router-dom";
import Button from "../Button";

const Navbar = () => {
    let Links =[
        {name:"HOME",link:"/"},
        {name:"PRODUCTS",link:"/"},
        {name:"STORES",link:"/"},
    ];
    let [open,setOpen]=useState(false);
    return (
        <div className=' w-full z-50 bg-white fixed h-20 top-0 left-0'>
            <div className='md:flex items-center justify-between py-2 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
                    <span className={'w-24 m-auto md:block'}>
                    <img src={logo} alt=""/>
                    </span>
                </div>
                 <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-300px]'}`}>
                    {
                        Links.map((link)=>(
                            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                                <Link to={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</Link>
                            </li>
                        ))

                    }
                </ul>

                <input placeholder={'SEARCH'} className={'border-cyan-700  border-2 w-72 rounded-2xl p-1 hidden md:block'} type="text"/>
                    <div className='flex -mt-14 md:mt-0 md:block'>
                        <img className={'w-8 mr-6 inline-block'} src={account} alt=""/>
                        <img className={'w-8 inline-block'} src={account} alt=""/>
                    </div>
            </div>
        </div>
    )
}

export default Navbar;
