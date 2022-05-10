import React from 'react';
import headphones from '../assets/media/purepng 1.png'
import makeup from '../assets/media/Chanel-Makeup-Kit.png'
import bag from '../assets/media/women-bag.png'
import {Link} from "react-router-dom";
function Discount(props) {
    return (
        <Link to='/products' className="hidden lg:grid max-w-7xl mx-auto grid-cols-2 grid-rows-2 gap-4 my-32">
            <div className="bg-gray-100 hover:bg-white hover:shadow-xl transition-shadow duration-500 hover:cursor-pointer
             ease-out row-span-2 w-6/6 grow rounded-2xl overflow-hidden object-center object-cover">
                <img className='mx-auto w-64 mt-12' src={headphones} alt=""/>
                <h1 className='text-5xl text-left capitalize mt-14 w-full font-[Poppins] mx-4'>Now you can experience the real sound
                    with new headphones</h1>
            </div>
            <div className='bg-gray-100 hover:bg-white hover:shadow-xl transition-shadow duration-500 hover:cursor-pointer
             ease-out w-66/6 h-80 rounded-2xl overflow-hidden object-center object-cover'>
                <div className='flex'>
                <img className='ml-14 w-48 mt-16' src={makeup} alt=""/>
                <h1 className='text-4xl font-[Poppins] capitalize text-left mt-32 ml-10'>20% off the new collection</h1>
                </div>
            </div>
            <div className='bg-gray-100 hover:bg-white hover:shadow-xl transition-shadow duration-500 hover:cursor-pointer
             ease-out w-66/6 h-80 rounded-2xl overflow-hidden object-center object-cover'>
                <div  className=' flex '>
                <img className='ml-14 w-48 mt-12' src={bag} alt=""/>
                <h1 className='text-4xl text-left mt-32 ml-10 font-[Poppins] capitalize'> New bags at the lowest prices</h1>
                </div>
            </div>
        </Link>
    );
}

export default Discount;