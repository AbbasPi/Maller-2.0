import React from 'react';
import TopStoresCards from "../../components/top stores cards/TopStoresCards";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/Loading";

function Stores({stores, loading}) {
    if (loading === true)
    return (
        <Loading/>
    )
    else
    return (
        <div>
                <div className='my-40'>
                    <TopStoresCards StoresPage={true} stores={stores}/>
                </div>
            <Footer/>
        </div>
    );
}

export default Stores;