import './home.css'
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import Hero from "../../components/Hero";
import Loading from "../../components/Loading";
import Category from "../../components/category/Category";
import TopStoresCards from "../../components/top stores cards/TopStoresCards";
import TopStoresLine from "../../components/top stores line/TopStoresLine";
import Discount from "../../components/discount/Discount";
import Footer from "../../components/footer/Footer";
function Home({products, categories, topStores, loading, isLog, l}) {
    if (loading === true)
    {return (
     <Loading/>
    )    }
     return (
        <div >
            <Navbar loc={'home'} isLog={isLog} l={l}/>
            <Hero/>
            <TopStoresLine topStores={topStores}/>
            <Card products={products}/>
            <Category categories={categories}/>
            <TopStoresCards stores={topStores}/>
            <Discount/>
            <Footer/>
        </div>
    );
}

export default Home;