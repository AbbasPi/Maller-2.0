import React from 'react';
import {Link} from "react-router-dom";

function WishlistEmpty(props) {
    return (<div>
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="px-4 lg:py-12">
                <div className="lg:gap-4 lg:flex">
                    <div
                        className="flex flex-col items-center justify-center md:py-24 lg:py-32"
                    >
                        <h1 className="font-bold text-cyan-600 text-9xl">404</h1>
                        <p
                            className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"
                        >
                            Your wishlist empty
                        </p>
                        <p className="mb-8 text-center text-gray-500 md:text-lg">
                            Hit the heart button to start saving your favorite products.
                        </p>
                        <Link to="/products" className="px-8 py-2 text-sm font-semibold text-cyan-800 hover:bg-cyan-500 mt-4
                                                    rounded-xl bg-cyan-200">
                            ADD NOW
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    </div>);
}

export default WishlistEmpty;