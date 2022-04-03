import React from 'react';
import Card from "../../components/card/Card";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/Loading";

function Products({data, loading}) {

    if (loading === true)
    {return (
        <Loading/>
    )    }
    return (
        <div>
                <Navbar loc='products'/>
            <div className='mb-20'>
                <div className='flex justify-between max-w-md mt-36 mx-8 lg:mx-auto'>
                    <p className="text-xl hover:text-cyan-500 hover:cursor-pointer transition duration-300">
                        New Arrivals
                    </p>
                    <p className="text-xl hover:text-cyan-500 hover:cursor-pointer transition duration-300">
                        Best Of
                    </p>
                    <p className="text-xl hover:text-cyan-500 hover:cursor-pointer transition duration-300">
                        Discount
                    </p>
                </div>
                <Card productsPage={true} products={data}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Products;