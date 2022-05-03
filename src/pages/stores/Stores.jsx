import React, {useEffect, useState} from 'react';
import TopStoresCards from "../../components/top stores cards/TopStoresCards";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/Loading";

function Stores({stores}) {
    // const [loading, setLoading] = useState(true)
    // useEffect(()=>{
    //     if (stores.length > 0)
    //     {setTimeout(() => {
    //         setLoading(false)
    //     }, 5000)}
    // }, [stores.length])
    if (stores.length === 0 )
    return (
        <Loading/>
    )
    return (
        <div>
                <div className='my-40 space-y-20'>
                    <TopStoresCards StoresPage={true} stores={stores}/>
                </div>
            <Footer/>
        </div>
    );
}

export default Stores;