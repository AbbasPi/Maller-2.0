import React, {useEffect, useState} from 'react';
import Card from "../../components/card/Card";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/Loading";
import ReactPaginate from "react-paginate";
import './products.css'
import {BASE_URL} from "../../utils/Constants";
import axios from "axios";

function Products({isLog, l}) {

    const [pageCount, setpageCount] = useState(0);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(false)
    let limit = 12;
    useEffect(() => {
        const getProducts= () => {
                setLoading(true)
                axios.get(`${BASE_URL}/product/all`, {params : {per_page: limit, page: 1}}).then((res)=>{
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
    if (loading === true)
    {return (
        <Loading/>
    )    }
    return (
        <div>
                <Navbar loc='products' isLog={isLog} l={l}/>
            <div className='mb-20'>
                <div className='flex justify-between max-w-md mt-36 mx-8 lg:mx-auto'>
                    <p className="text-xl hover:text-cyan-500 hover:cursor-pointer transition duration-300">
                        New Arrivals
                    </p>
                    <p className="text-xl hover:text-cyan-500 hover:cursor-pointer transition duration-300">
                        Best Of
                    </p>
                    <p className="text-xl hover:text-cyan-500 hover:cursor-pointer transition duration-300">
                        Discount
                    </p>
                </div>
                {
                    loading2 ? <Loading/>
                        :
                <Card productsPage={true} products={items}/>
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
            <Footer/>
        </div>
    );
}

export default Products;