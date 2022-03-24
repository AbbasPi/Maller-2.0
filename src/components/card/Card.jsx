import './card.css'
import {Link} from "react-router-dom";
function Card({products}) {
    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className={'flex justify-between'}>

                <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                <Link to={'/'} className="text-2xl text-gray-900">Browse ></Link>
                </div>
                <div className="mt-6 grid  gap-y-10 gap-x-6 grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="">
                            <div className="w-full min-h-80 bg-gray-100 aspect-w-1 aspect-h-1 rounded-md
                             overflow-hidden group-hover:cursor-cell lg:h-80 lg:aspect-none">
                                <img
                                    src={product.images.map((img)=>{
                                       return img.image
                                    })}
                                    alt={product.name}
                                    className="w-full  h-full object-center object-contain lg:w-full lg:h-full"
                                />
                            </div>
                            <div className="mt-4">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </a>
                                    </h3>
                                </div>
                                <p className="mt-2 font-medium text-gray-900">${product.lowest}</p>
                            </div>
                                <button className='border-2 border-cyan-700 mt-4 bg p-2 rounded-xl'>Add To Cart</button>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Card;