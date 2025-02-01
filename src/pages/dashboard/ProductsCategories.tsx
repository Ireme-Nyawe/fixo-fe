import { useEffect, useState } from 'react';
import ProductsNavBar from '../../components/dashboard/ProductsNavBar';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';
import {
  deleteProductCategory,
  getProductCategories,
} from '../../state/features/product/productService';
import { IProductCategory } from '../../types/store';
import Pagination from '../../components/dashboard/Pagination';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../../components/dashboard/SkeletonLoader';

const Categories = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [deleteCategoryId, setDeleteCategoryId] = useState<any>('');

  const handleDeleteCategory = async (id: any) => {
    try {
      const response = await deleteProductCategory(id);
      if (response.status === 200) {
        toast.success('Category deleted successfully');
        fetchProductCategories();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error('Error deleting category', error);
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setIsDeleteOpen(!isDeleteOpen);
      setDeleteCategoryId('');
    }
  };
  const fetchProductCategories = async () => {
    setLoading(true);
    try {
      const response = await getProductCategories();
      setData(response.data);
    } catch (error: any) {
      console.error('Error fetching product categories', error);
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductCategories();
  }, []);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredData = data
    .filter((item: IProductCategory) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a: IProductCategory, b: IProductCategory) =>
      sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <ProductsNavBar />
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Category Management
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Manage your product categories
            </p>
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={handleSearch}
            className="border rounded-lg px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                  onClick={handleSort}
                >
                  Category Name {sortOrder === 'asc' ? '🔼' : '🔽'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && <SkeletonLoader rows={perPage} cols={2} />}
              {!loading && paginatedData.length > 0
                ? paginatedData.map((item: IProductCategory) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                        <Link
                          className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg text-primary hover:bg-primary/10 transition-colors"
                          to={`/dashboard/categories/edit/${item._id}`}
                        >
                          <FaEdit className="w-4 h-4 mr-1.5" />
                        </Link>
                        <button
                          className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          onClick={() => {
                            setDeleteCategoryId(item._id);
                            setIsDeleteOpen(true);
                          }}
                        >
                          <FaTrash className="w-4 h-4 mr-1.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                : !loading && (
                    <tr>
                      <td
                        colSpan={2}
                        className="p-12 text-center text-gray-400"
                      >
                        📭 No categories found
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>
        <Pagination
          total={filteredData.length}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/90 rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Are you sure?
              </h3>
              <p className="text-gray-600 mb-6">
                You want to delete this category? This action is irreversible.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    handleDeleteCategory(deleteCategoryId);
                  }}
                  className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
