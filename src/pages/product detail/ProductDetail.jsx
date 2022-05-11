import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {BASE_URL, TOKEN_STR} from "../../utils/Constants";
import Rate from '../../Rate'
import Loading from "../../components/Loading";
import Footer from "../../components/footer/Footer";
import CartContext from "../../contexts/CartContext";
import AuthContext from "../../contexts/AuthContext";

function ProductDetail() {
    const {isAuth, user} = useContext(AuthContext)
    const {productId} = useParams()
    const [product, setProduct] = useState();
    const [rate, setRate] = useState(0);
    const [count, setCount] = useState(0);
    const {addToCarts} = useContext(CartContext);
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`${BASE_URL}/product/${productId}`).then((res)=>{
            setProduct(res.data);
        }).catch((err)=>{
            console.log(err);
        })
        isAuth &&
        axios.get(`${BASE_URL}/product-rating/all/${productId}`).then((res)=>{
                setRate(res.data)
                setCount(res.data.length)
        }).catch((err)=>{
            console.log(err)
        })
    }, [user, isAuth])


    return (
        <div>
            {
                product ?
                    <div>
            <section className="font-[Poppins] text-gray-700 mt-6 body-font overflow-hidden bg-white">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt={product.images[0].alt_text}
                             className="lg:w-1/2 lg:h-96  w-full object-contain object-center rounded border border-gray-200"
                             src={product.images[0].image}/>
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
                                <div className='flex justify-between'>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1
                                     1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197
                                     -1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                    <p className="ml-2 text-sm font-bold text-gray-900">{product.average_rating}</p>
                                    <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"/>
                                    <a href="#"
                                       className="text-sm font-medium text-gray-900 underline hover:no-underline">
                                        {count} reviews</a>
                                </div>
                                    {
                                     isAuth &&
                                    <Rate productId={productId}/>
                                    }
                                </div>
                                <div dangerouslySetInnerHTML={{__html: product.description }}/>
                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                <Link to={`/store/${product.vendor.id}`} className="text-2xl font-semibold hover:text-cyan-500 text-cyan-700 items-center tracking-widest">
                                    <span className={'text-black font-medium'}>Store:</span>  {product.vendor.name}</Link>
                                    <span className='bg-pink-50 rounded-md border p-1 ml-4 hover:bg-pink-100 hover:cursor-pointer -mb-2'> <Link to={`/category/${product.category.id}`}>
                                            {product.category.name}
                                        </Link></span>
                                </div>
                                <div className="flex">
                                    <span className="title-font font-medium text-2xl text-gray-900">{
                                        product.lowest_discounted < product.lowest ? <div>
                                                <p className='opacity-40 line-through'>
                                                    ${product.lowest}
                                                </p>
                                                <p>
                                                    ${product.lowest_discounted}
                                                </p>
                                            </div>
                                            : <p className=''>
                                                ${product.lowest}
                                            </p>
                                    }</span>
                                    <button onClick={()=>addToCarts(product.id)}
                                        className="flex ml-auto text-white bg-[#39818d] border-0 py-2 px-6
                                        focus:outline-none hover:bg-cyan-500 h-10 rounded-md">Add To Cart
                                    </button>
            {/*                        <button*/}
            {/*                            className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex*/}
            {/*                            items-center justify-center text-gray-500 ml-4">*/}
            {/*                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
            {/*                                 strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">*/}
            {/*                                <path*/}
            {/*d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78*/}
            {/*1.06-1.06a5.5 5.5 0 000-7.78z"/>*/}
            {/*                            </svg>*/}
            {/*                        </button>*/}
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
