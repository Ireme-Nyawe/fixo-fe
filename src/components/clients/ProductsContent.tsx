import { useEffect, useState } from "react";
import { ICategory, IProduct } from "../../types/store";
import productService from "../../state/features/auth/productSlice";
import { Link } from "react-router-dom";

const storeBg = "/store.jpg";

const ProductsContent = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await productService.getAlllProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error("Fetching products failed:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Fetching categories failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryProducts = async (categoryId: string) => {
    try {
      setLoading(true);
      setSelectedCategory(categoryId);
      const response = await productService.getProductsByCategory(categoryId);
      setProducts(response.data || []);
    } catch (error) {
      console.error("Fetching category products failed:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event: any) => {
    const categoryId = event.target.value;
    if (categoryId) {
      fetchCategoryProducts(categoryId);
    } else {
      fetchProductData();
    }
  };
  console.log(products);
  

  useEffect(() => {
    fetchProductData();
    fetchCategoryData();
  }, []);

  return (
    <div>
      <div
        className="w-full h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${storeBg})` }}
      >
        <div className="flex items-center justify-center h-full bg-black/50">
          <h1 className="text-[#1DCE5F] text-3xl font-bold">
            Welcome to Our Store
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex w-full p-2 justify-between items-center">
          <h2 className="text-[#295D42] text-2xl font-bold mb-4 sm:mb-0">
            Our Products
          </h2>

          <div className="flex flex-col text-sm">
            <label htmlFor="category" className="text-[#329964] font-medium">
              Filter by Category
            </label>
            <select
              id="category"
              className="mt-1 p-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 animate-pulse rounded-lg p-4 border border-gray-300"
              >
                <div className="w-full h-48 bg-gray-300 rounded-md"></div>
                <div className="h-5 bg-gray-400 rounded w-3/4 mt-4"></div>
                <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
                <div className="h-4 bg-gray-400 rounded w-1/3 mt-2"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link to={`/product/${product._id}`}>
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold text-[#295D42] mt-2">
                  {product.name}
                </h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-[#329964] font-semibold mt-1">
                  ${product.price}
                </p>
              </div>
            </Link>
            ))}
          </div>
        ) : (
          <div className="text-center mt-6">
            <p className="text-gray-600 text-lg">No related products available.</p>
            {selectedCategory && (
              <button
                onClick={fetchProductData}
                className="mt-4 px-4 py-2 bg-[#1DCE5F] text-white rounded-md hover:bg-[#329964]"
              >
                Load All Products
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsContent;
