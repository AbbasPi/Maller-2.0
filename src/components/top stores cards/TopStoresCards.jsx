import React from 'react';
import {Link} from "react-router-dom";

function TopStoresCards({stores, StoresPage}) {
    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 mb-12 lg:mb-0 lg:max-w-7xl lg:px-8">
                {
                 !StoresPage &&
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-bold text-gray-900">Stores</h2>
                    <Link to={'/stores'} className="text-2xl text-gray-900">Browse ></Link>
                </div>
                }
                <div className="mt-6 grid gap-y-10 cat gap-x-6 grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                    {stores.map((store) => (
                        <div key={store.id} className="category bg-gray-100 p-4 rounded-xl">
                            <Link to={`/store/${store.id}`} className="w-full hover:cursor-pointer h-60 bg-gray-100 aspect-w-1 aspect-h-1 rounded-xl
                             overflow-hidden lg:h-60 lg:aspect-none">
                                <img
                                    src={store.image}
                                    className="w-full h-full object-center rounded-xl object-cover lg:w-full lg:h-full"
                                />
                            </Link>
                            <div className="mt-4">
                                {
                                 StoresPage &&
                                <div>
                                    <h3 className="text-xl  text-gray-700">
                                        <Link to={`/store/${store.id}`}>
                                            {store.name}
                                        </Link>
                                    </h3>
                                </div>
                                }
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopStoresCards;