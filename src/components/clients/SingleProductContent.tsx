import { useEffect, useState } from 'react';
import { IProduct } from '../../types/store';
import productService from '../../state/features/auth/productSlice';
import { useParams, Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../SEO';

const SingleProductContent = () => {
  const [productData, setProductData] = useState<IProduct | null>(null);
  const [products, setProductsData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  const lang = localStorage.getItem('lang');

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await productService.getProductById(id);
        setProductData(response.data || null);
        setMainImage(response.data?.images?.[0] || null);
      } catch (error) {
        console.error('Fetching product failed:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProductsData = async () => {
      try {
        const response = await productService.getAlllProducts();
        setProductsData(response.data || []);
      } catch (error) {
        console.error('Fetching products failed:', error);
      }
    };

    fetchProductData();
    fetchProductsData();
  }, [id]);

  if (!productData && !loading) {
    return (
      <p className="text-center text-red-500 text-lg">Product not found.</p>
    );
  }

  const filteredProducts = products.filter((p) => p._id !== id).slice(0, 3);
  const productImages = productData?.images?.slice(0, 5) || [];

  return (
    <>
      <SEO
        title={`${productData?.name} | KicksideShop`}
        description={`Buy ${productData?.name} on KicksideShop. ${
          productData?.description?.slice(0, 160) ||
          'Explore high-quality products at affordable prices in Rwanda.'
        }`}
        keywords={`${productData?.name}, buy ${productData?.name} in Rwanda, KicksideShop, online shopping Rwanda, affordable products Rwanda, ${productData?.category}, e-commerce Rwanda`}
        ogTitle={`${productData?.name} | KicksideShop`}
        ogDescription={`Shop ${productData?.name} with fast delivery and mobile payments. Available now on KicksideShop.`}
        ogImage={mainImage || 'https://kicksideshop.rw/og/default-product.jpg'}
        ogUrl={`https://kicksideshop.rw/product/${productData?._id}`}
        ogType="product"
        twitterCard="summary_large_image"
        twitterCreator="@kicksidetech"
        canonicalUrl={`https://kicksideshop.rw/product/${productData?._id}`}
      />

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-2 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
            {productImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 md:w-full md:h-24 rounded-lg cursor-pointer border-2 transition duration-300 ${
                  mainImage === img
                    ? 'border-blue-500 shadow-md'
                    : 'border-gray-300'
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          <div className="md:col-span-5 flex justify-center items-center">
            {loading ? (
              <div className="w-full max-w-lg h-64 bg-gray-300 animate-pulse rounded-lg"></div>
            ) : (
              <img
                src={mainImage || ''}
                alt="Main Product"
                className="w-full max-w-lg rounded-lg shadow-lg transition hover:scale-105 duration-300"
              />
            )}
          </div>

          <div className="md:col-span-5">
            <h1 className="text-3xl font-bold text-gray-800">
              {productData?.name}
            </h1>
            <p className="text-xl font-semibold text-gray-600 mt-3">
              RWF {productData?.price.toFixed(2)}
            </p>
            <p className="text-sm text-white bg-secondary inline p-1 rounded">
              {productData?.category?.name}
            </p>
            <hr className="my-4" />
            <p className="text-gray-700 text-lg">{productData?.description}</p>

            <div className="flex gap-4 mt-6">
              <Link
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg transition hover:bg-green-500"
                to={'tel: +250782986810'}
              >
                <FaWhatsapp className="mr-2" /> Chat Now
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {lang === 'en' ? 'Related products' : 'Ibindi bijyanye'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="block bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition transform hover:scale-105 duration-300"
              >
                <img
                  src={product.images[0] || ''}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 flex justify-between text-sm">
                  RWF {product.price.toFixed(2)}
                  <span className="text-xs text-gray-500">
                    {product.stock} In Stock
                  </span>
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              to="/products"
              className="bg-primary text-white px-6 py-2 rounded-lg inline-block hover:bg-secondary transition"
            >
              {lang === 'en' ? 'View All Products' : 'Reba ibicuruzwa byose'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductContent;
