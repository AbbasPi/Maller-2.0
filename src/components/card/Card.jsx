import './card.css'
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, TOKEN_STR} from "../../utils/Constants";
import CartContext from "../../contexts/CartContext";
function Card({products, productsPage, store_id}) {
    const options = {
        position: 'bottom-right',
        style: {
            backgroundColor: '#39818d',
            border: '1px',
            color: 'white',
            fontFamily: 'Poppins',
            fontSize: '17px',
            textAlign: 'center',
        },
        closeStyle: {
            color: 'red',
            fontSize: '15px',
        },
    }
    const [pro, setPro] = useState([])
    const {addToCarts} = useContext(CartContext)

    useEffect(()=>{
        const getProducts = () =>{
    if (store_id !== undefined && store_id !== null ){
        axios.get(`${BASE_URL}/vendor/vendor/products/${store_id}`).then((res)=>{
            setPro(res.data.data);
        }).catch((err)=>{
            console.log(err);
        })}
    else {
        setPro(products)
    }
        }
        getProducts()
    }, [products, store_id])
    return (
        <div className="bg-white">
            <div className="max-w-2xl  mx-auto px-4 pt-12 pb-6 sm:px-6 lg:max-w-7xl lg:px-8">
                {
                 !productsPage &&
                <div className='flex justify-between'>

                <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                <Link to={'/products'} className="text-2xl text-gray-900">Browse ></Link>
                </div>
                }
                <div className="mt-6 grid gap-y-24  gap-x-6 grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {pro.map((product) => (
                        <div key={product.id} className="relative">
                            <div className="w-full p-4 hover:cursor-pointer min-h-80 bg-gray-100 aspect-w-1 aspect-h-1
                            rounded-xl overflow-hidden lg:h-80 lg:aspect-none">
                                <Link to={`/product/${product.id}`}>

                                <img
                                    src={product.images.map((img)=>{
                                       return img.image
                                    })}
                                    alt={product.name}
                                    className="w-full h-48 overflow-hidden rounded-xl object-center object-contain
                                     lg:w-full lg:h-5/6 lg:mt-7"
                                />
                                </Link>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <h3 className="text-md font-medium text-gray-700 text-left">
                                        <Link to={`/product/${product.id}`}>
                                            {product.name}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <p className="mt-2 font-medium lg:text-2xl font-[Poppins] text-gray-900">${product.lowest}</p>
                            </div>
                                <button onClick={() => { addToCarts(product.id)}} className='border-2 rounded-xl
                                    border-gray-300 uppercase text-[#39818d]  absolute -bottom-14 btn mx-auto mt-4
                                  p-2 hover:bg-[#39818d] hover:text-white hover:border-[#39818d]'>Add To Cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Card;