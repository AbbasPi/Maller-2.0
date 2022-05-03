import React, {useEffect, useState} from 'react';
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/Loading";
import ReactPaginate from "react-paginate";
import './products.css'
import {BASE_URL} from "../../utils/Constants";
import axios from "axios";
import NotFound from "../../components/NotFound";

function Products({query}) {
    const [pageCount, setpageCount] = useState(0);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false)
    const [labels, setLabels] = useState([])
    const [labelId, setLabelId] = useState(null)
    const [status, setStatus] = useState(0)
    let limit = 12;
    useEffect(() => {
        const getProducts= () => {
                    axios.get(`${BASE_URL}/product/all`, {params : {per_page: limit, page: 1, search: query, label_id: labelId}}).then((res)=>{
                        const data = res.data.data
                        setpageCount(res.data.page_count);
                        setItems(data);
                        setStatus(0)
                    }).catch(function (error) {
                        if (error.response) {
                            console.log(error.response.status);
                            setStatus(error.response.status)
                        }
                    })
            }
       const getLabels = () =>{
            axios.get(`${BASE_URL}/label/all`).then(res=>{
                setLabels(res.data)
            }).catch(err=>{
                console.log(err)
            })
       }
        getLabels();
        getProducts();
    },[limit, query, labelId])

    const fetchProducts= (currentPage) => {
        setLoading(true)
        axios.get(`${BASE_URL}/product/all`, {params : {per_page: limit, page: currentPage, search: query}}).then((res)=>{
            const data = res.data.data
            setItems(data)
            setpageCount(res.data.page_count)
        setLoading(false)
        }).catch((err)=>{
            console.log(err);
        })
    };

    const getLabelId = (id) => {
    if(labelId === id){
        setLabelId(null)
    }
    else {
        setLabelId(id)
    }
    }

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        fetchProducts(currentPage);
        // scroll to the top
        window.scrollTo(10, 0)
    };

    if(status === 404){
        return <NotFound/>
    }
    if (items.length === 0)
    {return (
        <Loading/>
    )}
    if(status !== 404)
    return (
        <div className='font-[Poppins]'>
            <div className='mb-20'>
                <div className='flex mx-5 justify-between max-w-xl mt-36 lg:mx-auto'>
                    {
                        labels.map((label)=>{
                    return <button onClick={()=>getLabelId(label.id)} className={`lg:text-xl text-sm  hover:text-cyan-500
                     hover:cursor-pointer transition duration-300 ${label.id === labelId && 'text-cyan-600'}`}>
                        {label.name}
                    </button>
                        })
                    }
                </div>
                {
                    loading ? <Loading/>
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