import { useEffect, useState } from 'react';
import { IProduct } from '../../types/store';
import productService from '../../state/features/auth/productSlice';
import { useParams, Link } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';

const SingleProductContent = () => {
  const [productData, setProductData] = useState<IProduct | null>(null);
  const [products, setProductsData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await productService.getProductById(id);
        const product = response.data;
        setProductData(product || null);
        setMainImage(product?.images?.[0] || null);
      } catch (error) {
        console.error('Fetching product failed:', error);
        setProductData(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchProductsData = async () => {
      try {
        const response = await productService.getAlllProducts();
        const products = response.data;
        setProductsData(products || []);
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
  const productImages = productData?.images?.slice(0, 8) || [];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-2 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {productImages.length >= 3 &&
            productImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 md:w-full md:h-20 rounded-md cursor-pointer border-2 ${
                  mainImage === img
                    ? 'border-secondary shadow-md'
                    : 'border-gray-300'
                } transition duration-300`}
                onClick={() => setMainImage(img)}
              />
            ))}
        </div>

        <div className="md:col-span-5 flex justify-center items-center">
          {loading ? (
            <div className="w-full max-w-md md:max-w-lg h-64 bg-gray-300 animate-pulse rounded-lg"></div>
          ) : (
            <img
              src={mainImage || ''}
              alt="Main"
              className="w-full max-w-md md:max-w-lg rounded-lg shadow-lg transition hover:scale-105 duration-300"
            />
          )}
        </div>

        <div className="md:col-span-5">
          <h1 className="text-2xl font-bold text-primary">
            {productData?.name} | {productData?.category?.name}
          </h1>
          <div className="flex mt-5">
            <div className="flex-1">
              <p className="text-lg font-semibold text-white bg-superior p-1 rounded-lg inline cursor-pointer">
                RWF{productData?.price.toFixed(2)}
              </p>
            </div>
            <p className="text-secondary font-medium">
              {productData?.stock} In Stock
            </p>
          </div>

          <hr className="my-4" />
          <h2 className="text-lg font-semibold text-primary">
            Product Description
          </h2>
          <p className="text-gray-600 my-2">{productData?.description}</p>

          <div className="flex gap-4 mt-4">
            <button className="flex items-center p-2 bg-superior text-white rounded-lg w-full sm:w-auto transition hover:bg-opacity-80">
              Call <PhoneCall className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-primary mb-4">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="block bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition transform hover:scale-105 duration-300"
            >
              <img
                src={product.images[0] || ''}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-primary">
                {product.name}
              </h3>
              <p className="text-gray-600 flex justify-between">
                RWF{product.price.toFixed(2)}
                <span className="text-sm text-secondary">
                  {product.stock} In Stock
                </span>
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/products"
            className="bg-superior text-white px-6 py-2 rounded-lg inline-block hover:bg-secondary transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProductContent;
