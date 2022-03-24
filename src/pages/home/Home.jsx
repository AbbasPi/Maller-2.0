import React, {useEffect, useState} from 'react';
import './home.css'
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import axios from "axios";
import {BASE_URL} from "../../utils/Constants";
import Hero from "../../components/Hero";
import Loading from "../../components/Loading";
import Category from "../../components/Category";
function Home(props) {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(()=>{
        axios.get(`${BASE_URL}/product/all`).then((res)=>{
            console.log(res.data)
            setProducts(res.data.data.slice(0,4))
            setLoading(false)
        })
    }, [])

    if (loading === true)
    {return (
     <Loading/>
    )    }
     return (
        <div>
            <Navbar/>
            <Hero/>
            <Card products={products}/>
            <Category categories={categories}/>
        </div>
    );
}

export default Home;