import Footer from "../../components/footer/Footer";
import Category from "../../components/category/Category";

function CategoriesPage({ categories, l }) {
  return (
    <div>
      <div className="my-32">
        <Category categoriesPage={true} categories={categories} />
      </div>
      <Footer />
    </div>
  );
}

export default CategoriesPage;
