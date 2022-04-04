import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import TopStoresCards from "../../components/top stores cards/TopStoresCards";
import Footer from "../../components/footer/Footer";
import Categories from "../categories/Categories";
import categories from "../categories/Categories";
import Category from "../../components/category/Category";

function CategoriesPage({categories, l}) {
    return (
        <div>
            <Navbar l={l}/>
            <div className='my-32'>
                <Category categoriesPage={true} categories={categories}/>
            </div>
            <Footer/>
        </div>
    );
}

export default CategoriesPage;