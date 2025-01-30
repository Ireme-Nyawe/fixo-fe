import { useState } from 'react';
import ProductsNavBar from '../../components/dashboard/ProductsNavBar';
import { FaPlus, FaImage, FaSave, FaTimes, FaCheck } from 'react-icons/fa';
import { Switch } from '@headlessui/react';

const NewProductCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; icon?: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, icon: 'Please upload an image file' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
        setErrors({ ...errors, icon: undefined });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!categoryName.trim()) {
      newErrors.name = 'Category name is required';
    }
    if (!iconPreview) {
      newErrors.icon = 'Category icon is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      resetForm();
    }, 1000);
  };

  const resetForm = () => {
    setCategoryName('');
    setDescription('');
    setIconPreview(null);
    setErrors({});
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <ProductsNavBar />

      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Category
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Define a new product category with icon and specifications
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
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
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Add a brief description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <Switch
                  checked={isActive}
                  onChange={setIsActive}
                  className={`${
                    isActive ? 'bg-primary' : 'bg-gray-300'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span
                    className={`${
                      isActive ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
                <span className="ml-3 text-sm text-gray-600">
                  {isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Right Column - Icon Upload */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Icon *
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="icon-upload"
                  />
                  <label
                    htmlFor="icon-upload"
                    className={`w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                      errors.icon
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                    } ${iconPreview ? 'p-2' : 'p-8'}`}
                  >
                    {iconPreview ? (
                      <img
                        src={iconPreview}
                        alt="Category icon preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <>
                        <FaImage className="w-12 h-12 text-gray-400 mb-4 group-hover:text-primary transition-colors" />
                        <p className="text-gray-500 text-center">
                          <span className="text-primary font-medium">
                            Click to upload
                          </span>{' '}
                          or drag and drop
                          <br />
                          SVG, PNG, JPG (max. 800x800px)
                        </p>
                      </>
                    )}
                  </label>
                </div>
                {errors.icon && (
                  <p className="text-red-500 text-sm mt-1">{errors.icon}</p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaSave className="w-5 h-5" />
              Create Category
            </button>
          </div>
        </form>

        {/* Success Overlay */}
        {isSuccess && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-xl">
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
                  onClick={resetForm}
                  className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                >
                  Add Another
                </button>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Continue Editing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProductCategory;
