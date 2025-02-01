import { useEffect, useState } from "react";
import { IProduct } from "../../types/store";
import productService from "../../state/features/auth/productSlice";
import { useParams, Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa";

const SingleProductContent = () => {
  const [productData, setProductData] = useState<IProduct | null>(null);
  const [products, setProductsData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  const fetchProductData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await productService.getProductById(id);
      const product = response.data;
      setProductData(product || null);
      setMainImage(product?.images?.[0] || null);
    } catch (error) {
      console.error("Fetching product failed:", error);
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
      console.error("Fetching products failed:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchProductsData();
  }, [id]);

  if (!productData && !loading) {
    return <p className="text-center text-red-500">Product not found.</p>;
  }

  const filteredProducts = products.filter((p) => p._id !== id).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-2 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {loading
            ? Array(3)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="w-20 h-20 md:w-full md:h-20 bg-gray-300 animate-pulse rounded-md"></div>
                ))
            : productData?.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`w-20 h-20 md:w-full md:h-20 rounded-md cursor-pointer border-2 ${
                    mainImage === img ? "border-secondary" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
        </div>

        <div className="md:col-span-5 flex justify-center items-center">
          {loading ? (
            <div className="w-full max-w-md md:max-w-lg h-64 bg-gray-300 animate-pulse rounded-lg"></div>
          ) : (
            <img
              src={mainImage || ""}
              alt="Main"
              className="w-full max-w-md md:max-w-lg rounded-lg shadow-lg"
            />
          )}
        </div>
        <div className="md:col-span-5">
          {loading ? (
            <>
              <div className="h-6 bg-gray-300 animate-pulse w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-300 animate-pulse w-1/2 mb-4"></div>
              <div className="h-6 bg-gray-300 animate-pulse w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 animate-pulse w-full mb-4"></div>
              <div className="h-4 bg-gray-300 animate-pulse w-5/6 mb-4"></div>
              <div className="h-10 bg-gray-300 animate-pulse w-full mb-4"></div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-primary">
                {productData?.name} || {productData?.category.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 my-2">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="text-gray-500">(150 Reviews)</span>
                <span className="text-secondary">
                  {productData?.stock} <span>In Stock</span>
                </span>
              </div>
              <p className="text-xl font-semibold text-superior">
                ${productData?.price.toFixed(2)}
              </p>
              <p className="text-gray-600 my-2">{productData?.description}</p>
              <hr className="my-4" />

              <h2 className="text-lg font-semibold text-primary">Contact-Details</h2>
              <p>
                <strong>Owner:</strong> akakakakaak
              </p>
              <p>
                <strong>Location:</strong> Kigali-Nyarugenge
              </p>
              <p>
                <strong>Telephone:</strong> + (250) 788888888
              </p>

              <div className="flex gap-4 mt-4">
                <button className="p-2 bg-secondary text-white rounded-lg w-full sm:w-auto">
                  Chat &nbsp;💬
                </button>
                <button className="flex items-center p-2 bg-superior text-white rounded-lg w-full sm:w-auto">
                  Call &nbsp; <FaPhone />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-primary mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array(3)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="h-60 bg-gray-300 animate-pulse rounded-lg"></div>
                ))
            : filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="block bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                >
                  <img
                    src={product.images[0] || ""}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold text-primary">{product.name}</h3>
                  <p className="text-gray-600 flex justify-between">${product.price.toFixed(2)}
                  <span className="text-sm text-secondary">{product.stock} In Stock</span></p>
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
