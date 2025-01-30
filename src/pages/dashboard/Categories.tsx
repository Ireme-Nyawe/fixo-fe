import ProductsNavBar from '../../components/dashboard/ProductsNavBar';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Categories = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <ProductsNavBar />

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h1 className="text-2xl font-semibold text-gray-800">
            Category Management
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage your product categories and subcategories
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Category Name
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2].map((item) => (
                <tr key={item} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    Category {item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg text-primary hover:bg-primary/10 transition-colors">
                      <FaEdit className="w-4 h-4 mr-1.5" />
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                      <FaTrash className="w-4 h-4 mr-1.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {/* <div className="p-12 text-center text-gray-400">
          <div className="mb-4 text-4xl">📭</div>
          <p className="text-sm">No categories found</p>
        </div> */}
      </div>
    </div>
  );
};

export default Categories;
