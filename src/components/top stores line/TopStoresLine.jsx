import React from 'react';
import '../stores/stores.css'
import {Link} from "react-router-dom";
function TopStoresLine({topStores}) {
    return (
        <div>
            <div className='hidden lg:flex bg-gray-100 flex text-3xl space-x-12 p-6 '>
                <h1 className='text-[#39818d] border-gray-600 border-r-2 pr-6 ml-32'>Top Stores</h1>
                {
                    topStores.map((store)=>{
                        return <Link to={`/store/${store.id}`} className='hover:text-[#39818d] text-gray-800' >{store.name}</Link>
                    })
                }
            </div>
        </div>
    );
}

export default TopStoresLine;