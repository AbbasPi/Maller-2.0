import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../utils/Constants";
import Card from "../../components/card/Card";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import fb from '../../components/assets/svg/facebook.svg'
import ig from '../../components/assets/svg/icons8instagram.svg'
import tw from '../../components/assets/svg/icons8-twitter.svg'
import Loading from "../../components/Loading";
function StoreDetail() {
    const {storeId} = useParams()
    const [store, setStore] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        if(storeId != null){
            axios.get(`${BASE_URL}/vendor/${storeId}`).then((res)=>{
                setStore(res.data)
                setLoading(false)
            }).catch((err)=>{
                console.log(err)
            })
        }
    }, [storeId])

    if (loading === true)
    {return (
        <Loading/>
    )    }

    return (
        <div>
            <Navbar/>
            {
                store &&
        <section className="text-gray-600 body-font mt-12">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full">
                    <img className='w-56 mb-8 mx-auto' src={store.image}/>
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">{store.name}</h1>
                    <p className="lg:w-2/3 mx-auto text-2xl" dangerouslySetInnerHTML={{__html: store.description }}/>
                    <div className='flex mx-auto mt-2 space-x-4'>
                            {
                                store.facebook &&
                        <img className='hover:cursor-pointer' src={fb}>

                                <a href={store.facebook}></a>
                        </img>
                            }

                            {
                                store.instagram &&
                        <img className='hover:cursor-pointer' src={ig}>
                                <a href={store.instagram}></a>
                        </img>
                            }
                            {
                                store.twitter &&
                        <img className='hover:cursor-pointer' src={tw}>
                            <a href={store.twitter}></a>
                        </img>
                            }
                    </div>
                </div>
                <Card productsPage={true} store_id={store.id} />
            </div>
        </section>
            }
            <Footer/>
        </div>
    );
}

export default StoreDetail;