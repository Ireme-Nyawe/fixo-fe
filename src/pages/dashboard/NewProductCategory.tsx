import { useState } from 'react';
import ProductsNavBar from '../../components/dashboard/ProductsNavBar';
import { FaSave, FaCheck, FaTimes } from 'react-icons/fa';
import { createProductCategory } from '../../state/features/product/productService';
import { toast, Toaster } from 'sonner';
import { Link } from 'react-router-dom';

const NewProductCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {}
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newErrors: typeof errors = {};
    if (!categoryName.trim()) {
      newErrors.name = 'Category name is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Category description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await createProductCategory({
        name: categoryName,
        description,
      });

      if (response.status === 201) {
        setIsSuccess(true);
        toast.success('Category created successfully');
        resetForm();
      } else {
        toast.error(response.message || 'Failed to create category');
      }
    } catch (error: any) {
      console.error('Error creating product category', error);
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCategoryName('');
    setDescription('');
    setErrors({});
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <Toaster richColors position="top-center" />
      <ProductsNavBar />

      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Category
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Define a new product category with name and descriptions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                    setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                  placeholder="e.g., Electronics"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors({ ...errors, description: undefined });
                  }}
                  rows={3}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                  placeholder="Add a brief description..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2.5 bg-red-500 text-white hover:bg-red-400 rounded-lg transition-colors flex items-center"
            >
              <FaTimes className="w-5 h-5" />
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              {loading ? (
                <div className="w-5 h-5 border-t-2 border-b-2 border-secondary rounded-full animate-spin" />
              ) : (
                <>
                  <FaSave className="w-5 h-5" />
                  <span>Create Category</span>
                </>
              )}
            </button>
          </div>
        </form>

        {isSuccess && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/90 rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Category Created!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your new category has been successfully created
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      resetForm();
                      setIsSuccess(false);
                    }}
                    className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                  >
                    Add Another
                  </button>
                  <Link
                    to="/dashboard/categories"
                    className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    View List
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProductCategory;
