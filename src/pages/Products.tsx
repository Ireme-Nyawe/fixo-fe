import Footer from '../components/clients/Footer';
import Header from '../components/clients/Header';
import ProductsContent from '../components/clients/ProductsContent';
import SEO from '../components/SEO'; 
const Products = () => {
  const lang = localStorage.getItem('lang');

  return (
    <div>
      <SEO
        title="Fixo Products | Buy and Access On-Demand Tech Support Tools in Rwanda"
        description="Explore Fixo's range of tech support products and digital services. Buy essential tools to fix your phone, PC, or access e-government platforms with ease."
        keywords="tech support products Rwanda, fixo products, buy tech tools Rwanda, PC repair tools, phone repair kits, fixo digital services, online services Rwanda"
        ogTitle="Shop Fixo's Tech Support Products"
        ogDescription="Discover and buy tools and services that help Rwandans fix their tech issues and navigate e-services easily. Powered by Fixo."
        ogImage="https://fixo.rw/og/support.jpg"
        ogUrl="https://fixo.rw/products"
        ogType="product.group"
        twitterCard="summary_large_image"
        twitterCreator="@inonotechgroup"
        canonicalUrl="https://fixo.rw/products"
      />
      <Header />
      <ProductsContent lang={lang} />
      <Footer />
    </div>
  );
};

export default Products;
