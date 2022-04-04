import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../utils/Constants";
import Loading from "../../components/Loading";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";

function Categories({isLog, l}) {
    const {categoryId} = useParams()
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        if(categoryId != null){
            axios.get(`${BASE_URL}/product/all`, {params : {category_id: categoryId}}).then((res)=>{
                setProducts(res.data.data)
                setLoading(false)
            }).catch((err)=>{
                console.log(err)
            })
        }
    }, [categoryId])

    if (loading === true)
    {return (
        <Loading/>
    )    }
    return (
        <div>
            <Navbar isLog={isLog} l={l}/>
            <div className='my-12'/>
            <h1 className='text-3xl mt-24'>Top {products[0].category.name} Products</h1>
            <Card productsPage={true} products={products}/>
            <div className='my-12'/>
            <Footer/>

        </div>
    );
}

export default Categories;