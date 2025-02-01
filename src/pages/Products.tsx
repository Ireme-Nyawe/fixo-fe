import Footer from '../components/clients/Footer';
import Header from '../components/clients/Header';
import ProductsContent from '../components/clients/ProductsContent';

const Products = () => {
  const lang = localStorage.getItem('lang');

  return (
    <div>
      <Header />
      <ProductsContent lang={lang} />
      <Footer />
    </div>
  );
};

export default Products;
