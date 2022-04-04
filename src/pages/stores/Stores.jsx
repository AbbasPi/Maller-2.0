import React from 'react';
import TopStoresCards from "../../components/top stores cards/TopStoresCards";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

function Stores({stores, isLog, l}) {
    return (
        <div>
            <Navbar loc={'stores'} isLog={isLog} l={l}/>
                <div className='my-40'>
                    <TopStoresCards StoresPage={true} stores={stores}/>
                </div>
            <Footer/>
        </div>
    );
}

export default Stores;