import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import {BASE_URL} from "../../utils/Constants";
import Loading from "../../components/Loading";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

function ProductDetail() {
    const {productId} = useParams()
    const [product, setProduct] = useState();
    useEffect(()=>{
        axios.get(`${BASE_URL}/product/${productId}`).then((res)=>{
            setProduct(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }, [])
    return (
        <div>
            {
                product ?
                    <div>
                    <Navbar/>
            <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt={product.images[0].alt_text}
                             className="lg:w-1/2 lg:h-96  w-full object-contain object-center rounded border border-gray-200"
                             src={product.images[0].image}/>
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <Link to={`/store/${product.vendor.id}`} className="text-2xl text-gray-700 tracking-widest">
                                  Store:  {product.vendor.name}</Link>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
                                <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                 strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path
    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                 strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path
    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                 strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path
    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                 strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path
    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                 className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path
    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>

                                </div>
                                <div dangerouslySetInnerHTML={{__html: product.description }}/>
                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">

                                </div>
                                <div className="flex">
                                    <span className="title-font font-medium text-2xl text-gray-900">${product.lowest}</span>
                                    <button
                                        className="flex ml-auto text-white bg-[#39818d] border-0 py-2 px-6
                                        focus:outline-none hover:bg-cyan-500 rounded-md">Add To Cart
                                    </button>
                                    <button
                                        className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex
                                        items-center justify-center text-gray-500 ml-4">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                             strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78
            1.06-1.06a5.5 5.5 0 000-7.78z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                    </div>
                </div>
            </section>
                        <Footer/>
                    </div>
                    : <Loading/>
            }
        </div>
    );
}

export default ProductDetail;
