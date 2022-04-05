import './card.css'
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, TOKEN_STR} from "../../utils/Constants";
function Card({products, productsPage, store_id, l}) {
    const [pro, setPro] = useState([])
    const navigate = useNavigate()
    const addToCart = (object)=>{
        l ?
        axios.post(`${BASE_URL}/cart/my`, {  "product_id": object,"item_qty": 1},
                { headers: {"Authorization" : `${TOKEN_STR.token.token_type} ${TOKEN_STR.token.access_token}`} })
        : navigate('/login')
    }
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
            <div className="max-w-2xl  mx-auto px-4 py-14 sm:px-6 lg:max-w-7xl lg:px-8">
                {
                 !productsPage &&
                <div className='flex justify-between'>

                <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                <Link to={'/products'} className="text-2xl text-gray-900">Browse ></Link>
                </div>
                }
                <div className="mt-6 grid gap-y-24 gap-x-6 grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {pro.map((product) => (
                        <div key={product.id} className="relative">
                            <div className="w-full p- hover:cursor-pointer min-h-80 bg-gray-100 aspect-w-1 aspect-h-1
                            rounded-xl overflow-hidden group-hover:cursor-cell lg:h-80 lg:aspect-none">
                                <Link to={`/product/${product.id}`}>

                                <img
                                    src={product.images.map((img)=>{
                                       return img.image
                                    })}
                                    alt={product.name}
                                    className="w-full rounded-xl h-full object-center object-contain lg:w-full lg:h-5/6 lg:mt-7"
                                />
                                </Link>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <h3 className="text-md text-gray-700">
                                        <Link to={`/product/${product.id}`}>
                                            {product.name}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                                <p className="mt-2 font-medium text-gray-900">${product.lowest}</p>
                                <button onClick={()=>addToCart(product.id)} className='border-2 rounded-md border-cyan-700 lg:absolute -bottom-14 btn mx-auto  mt-4
                                  p-2 hover:bg-[#39818d] hover:text-white'>Add To Cart</button>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Card;