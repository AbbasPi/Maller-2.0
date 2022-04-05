import React from 'react';
import {Link} from "react-router-dom";
import './category.css'

function Category({categories, categoriesPage}) {
    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto px-4 py-32 sm:px-6 lg:max-w-7xl lg:px-8">
                {
                    !categoriesPage &&
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
                    <Link to={'/category'} className="text-2xl text-gray-900">Browse ></Link>
                </div>
                }
                <div className="mt-6 grid gap-y-10 gap-x-6 grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                    {categories.map((category) => (
                        <div key={category.id} className="">
                            <div  className="w-full category hover:cursor-pointer h-60 bg-gray-100 aspect-w-1 aspect-h-1 rounded-xl
                             overflow-hidden group-hover:cursor-cell lg:h-60 lg:aspect-none">
                                <Link to={`category/${category.id}`}>

                                <img
                                    src={category.image}
                                    className="w-full  h-full object-center object-contain lg:w-full lg:h-full"
                                />
                                </Link>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <h3 className="text-xl text-gray-700">
                                        <Link to={`/category/${category.id}`}>
                                            {category.name}
                                        </Link>
                                    </h3>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Category;