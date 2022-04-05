import React from 'react';
import TopStoresCards from "../../components/top stores cards/TopStoresCards";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

function Stores({stores, l, logout}) {
    return (
        <div>
            {/*<Navbar loc={'stores'} l={l} logout={logout}/>*/}
                <div className='my-40'>
                    <TopStoresCards StoresPage={true} stores={stores}/>
                </div>
            <Footer/>
        </div>
    );
}

export default Stores;