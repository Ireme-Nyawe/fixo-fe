import { useEffect, useState } from 'react';
import { ICategory, IProduct } from '../../types/store';
import productService from '../../state/features/auth/productSlice';
import { Link } from 'react-router-dom';

const storeBg = '/store.jpg';

interface ProductsCOntentsProps {
  lang: any;
}
const ProductsContent = ({ lang }: ProductsCOntentsProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const translations = {
    en: {
      welcome: 'Welcome to Our Store',
      ourProducts: 'Our Products',
      filterByCategory: 'Filter by Category',
      allCategories: 'All Categories',
      noProducts: 'No related products available.',
      loadAllProducts: 'Load All Products',
      previous: 'Previous',
      next: 'Next',
      page: 'Page',
      of: 'of',
    },
    kin: {
      welcome: 'Murakaza neza mu iduka ryacu',
      ourProducts: 'Ibicuruzwa byacu',
      filterByCategory: 'Hitamo ubwoko',
      allCategories: 'Ubwoko bwose',
      noProducts: 'Nta bicuruzwa bihari.',
      loadAllProducts: 'Kureba ibicuruzwa byose',
      previous: 'Ibibanza',
      next: 'Ibikurikira',
      page: 'Ipaji',
      of: 'ya',
    },
  };

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await productService.getAlllProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error('Fetching products failed:', error);
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
      console.error('Fetching categories failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryProducts = async (categoryId: string) => {
    try {
      setLoading(true);
      setSelectedCategory(categoryId);
      setCurrentPage(1);
      const response = await productService.getProductsByCategory(categoryId);
      setProducts(response.data || []);
    } catch (error) {
      console.error('Fetching category products failed:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = event.target.value;
    if (categoryId) {
      fetchCategoryProducts(categoryId);
    } else {
      fetchProductData();
    }
  };
  useEffect(() => {
    fetchProductData();
    fetchCategoryData();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div
        className="w-full h-[40vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${storeBg})` }}
      >
        <div className="flex items-center justify-center h-full bg-black/50">
          <h1 className="text-[#1DCE5F] text-3xl font-bold">
            {translations?.[lang === 'en' ? 'en' : 'kin']?.welcome}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex w-full p-2 justify-between items-center flex-wrap gap-4">
          <h2 className="text-[#295D42] text-2xl font-bold">
            {translations?.[lang === 'en' ? 'en' : 'kin']?.ourProducts}
          </h2>

          <div className="flex flex-col text-sm">
            <label htmlFor="category" className="text-[#329964] font-medium">
              {translations?.[lang === 'en' ? 'en' : 'kin']?.filterByCategory}
            </label>
            <select
              id="category"
              className="mt-1 p-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              onChange={handleCategoryChange}
            >
              <option value="">
                {translations?.[lang === 'en' ? 'en' : 'kin']?.allCategories}
              </option>
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
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <h3 className="text-lg font-bold text-[#295D42] mt-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 truncate">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-[#329964] font-semibold">
                        RWF{product.price}
                      </p>
                      <span className="text-gray-500 text-sm">
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6 gap-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={`px-4 py-2 border rounded-md transition-colors duration-200 ${
                    currentPage === 1
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#1DCE5F] text-white hover:bg-[#329964]'
                  }`}
                >
                  {translations?.[lang === 'en' ? 'en' : 'kin']?.previous}
                </button>
                <span className="text-gray-700">
                  {translations?.[lang === 'en' ? 'en' : 'kin']?.page}{' '}
                  {currentPage}{' '}
                  {translations?.[lang === 'en' ? 'en' : 'kin']?.of}
                  {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className={`px-4 py-2 border rounded-md transition-colors duration-200 ${
                    currentPage === totalPages
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#1DCE5F] text-white hover:bg-[#329964]'
                  }`}
                >
                  {translations?.[lang === 'en' ? 'en' : 'kin']?.next}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center mt-6">
            <p className="text-gray-600 text-lg">
              {translations?.[lang === 'en' ? 'en' : 'kin']?.noProducts}
            </p>
            {selectedCategory && (
              <button
                onClick={fetchProductData}
                className="mt-4 px-4 py-2 bg-[#1DCE5F] text-white rounded-md hover:bg-[#329964] transition-colors duration-200"
              >
                {translations?.[lang === 'en' ? 'en' : 'kin']?.loadAllProducts}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsContent;
