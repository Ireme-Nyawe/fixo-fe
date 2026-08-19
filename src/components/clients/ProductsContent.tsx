import { useEffect, useState } from 'react';
import { ICategory, IProduct } from '../../types/store';
import productService from '../../state/features/auth/productSlice';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ProductsContentProps {
  lang: string;
}
const ProductsContent = ({ lang }: ProductsContentProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const translations = {
    en: {
      welcome: 'Welcome to Our Digital Access Hub',
      ourProducts: 'Our Access Tools',
      filterByCategory: 'Filter by Category',
      allCategories: 'All Categories',
      noProducts: 'No related Access Tool available.',
      loadAllProducts: 'Load All Access Tools',
      previous: 'Previous',
      next: 'Next',
      page: 'Page',
      of: 'of',
    },
    kin: {
      welcome: 'ikaze ku ibikoresho by\'ikoranabuhanga',
      ourProducts: 'Ibikoresho By\'ikoranabuhanga',
      filterByCategory: 'Hitamo ubwoko',
      allCategories: 'Ubwoko bwose',
      noProducts: 'Nta bikoresho bihari.',
      loadAllProducts: 'Kureba ibikoresho byose',
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
      console.error('Fetching category Access Tools failed:', error);
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

  const copy = translations[lang === 'en' ? 'en' : 'kin'];

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
            {copy.welcome}
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            {copy.ourProducts}
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
            {lang === 'en'
              ? 'Devices and tools offered at accessible prices through our partners.'
              : "Ibikoresho bitangwa ku giciro cyoroshye binyuze ku bafatanyabikorwa bacu."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <p className="text-xs text-slate-500">
            {products.length} {lang === 'en' ? 'items' : 'ibikoresho'}
          </p>

          <div className="flex items-center gap-2">
            <label
              htmlFor="category"
              className="text-xs font-medium text-slate-600 whitespace-nowrap"
            >
              {copy.filterByCategory}
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
            >
              <option value="">{copy.allCategories}</option>
              {categories.map((category) => (
                <option key={String(category._id)} value={String(category._id)}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 overflow-hidden animate-pulse"
              >
                <div className="h-40 bg-slate-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 w-3/4 bg-slate-100 rounded" />
                  <div className="h-3 w-full bg-slate-100 rounded" />
                  <div className="h-3 w-1/3 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {paginatedProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={String(product._id)}
                  className="group flex flex-col rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors"
                >
                  <div className="h-40 bg-slate-100 overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaBoxOpen className="w-7 h-7 text-slate-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900">
                        RWF {product.price?.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500">
                        {product.stock} {lang === 'en' ? 'in stock' : 'bihari'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <FaChevronLeft className="w-3 h-3" />
                  {copy.previous}
                </button>

                <span className="text-sm text-slate-500">
                  {copy.page} {currentPage} {copy.of} {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {copy.next}
                  <FaChevronRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 rounded-xl border border-dashed border-slate-300">
            <FaBoxOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-medium text-slate-800">
              {copy.noProducts}
            </p>
            {selectedCategory && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('');
                  fetchProductData();
                }}
                className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              >
                {copy.loadAllProducts}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsContent;
