import React from 'react';
import './footer.css'
import {Link} from "react-router-dom";
    function Footer() {

        let whoarewe =[
            'About us',
            'Contact us',
            'For sale through us',
        ]
        let cus_service = [
            'Follow up with the order',
            'Return Policy',
            'Privacy policy',
        ]
        return (
            <footer className="p-4 bg-[#39818d] sm:p-6 shadow-2xl shadow-zinc-400">
                <div className="md:flex md:justify-around space-y-10 lg:space-y-0">
                    <div className="flex justify-center items-center">
                        <Link to={'/'} className="flex items-center">
                            <h1 className='text-6xl text-white'>MALLER</h1>
                        </Link>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center items-center space-y- lg:space-y-0 lg:space-x-20">
                        <div>
                            <h2 className="text-left mb-6 text-sm font-semibold text-white uppercase">
                                who are we
                            </h2>
                            <ul className="flex flex-col items-start justify-start text-gray-300">
                                {whoarewe.map((item, index)=>{
                                   return <li key={index}>
                                        <Link to="/" className="hover:underline">
                                            {item}
                                        </Link>
                                    </li>
                                })}
                            </ul>
                        </div>

                        <div>
                            <h2 className=" text-left mb-6 text-sm font-semibold text-white uppercase">
                                Customers service
                            </h2>
                            <ul className="flex flex-col items-start justify-start text-gray-300">
                                {cus_service.map((item, index)=>{
                                    return <li key={index}>
                                        <Link to="/" className="hover:underline">
                                            {item}
                                        </Link>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
    );
}

export default Footer;