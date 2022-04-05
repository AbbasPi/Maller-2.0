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
import ReactPaginate from "react-paginate";
function StoreDetail({l, logout}) {
    const {storeId} = useParams()
    const [store, setStore] = useState()
    const [pageCount, setpageCount] = useState(0);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(false)
    let limit = 12;
    useEffect(() => {
        const getProducts= () => {
            setLoading(true)
            axios.get(`${BASE_URL}/product/all`, {params : {per_page: limit, page: 1 , vendor_id: storeId}}).then((res)=>{
                const data = res.data.data
                setpageCount(res.data.page_count);
                setItems(data);
                setLoading(false)
            }).catch((err)=>{
                console.log(err);
            })
        }
        getProducts();
    },[limit])

    const fetchProducts= (currentPage) => {
        setLoading2(true)
        axios.get(`${BASE_URL}/product/all`, {params : {per_page: limit, page: currentPage}}).then((res)=>{
            const data = res.data.data
            setItems(data)
            setpageCount(res.data.page_count);
            setLoading2(false)
        }).catch((err)=>{
            console.log(err);
        })
    };

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        fetchProducts(currentPage);
        // scroll to the top
        // window.scrollTo(10, 0)
    };
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
            {/*<Navbar l={l} logout={logout}/>*/}
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
                {
                    loading2 ?
                        <Loading/>
                    :
                <Card products={items} productsPage={true} l={l}/>
                }
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination ml-96"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>
        </section>
            }
            <Footer/>
        </div>
    );
}

export default StoreDetail;