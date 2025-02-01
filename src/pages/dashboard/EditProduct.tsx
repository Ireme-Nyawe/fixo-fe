import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ProductsNavBar from '../../components/dashboard/ProductsNavBar';
import {
  FaImage,
  FaSave,
  FaCheck,
  FaTimes,
  FaGripVertical,
} from 'react-icons/fa';
import axios from 'axios';
import {
  getProductCategories,
  getSingleProduct,
  updateProduct,
} from '../../state/features/product/productService';
import { IProductCategory } from '../../types/store';
import { toast, Toaster } from 'sonner';
import { Link, useParams } from 'react-router-dom';

const EditProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImages, setProductImages] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [productCategories, setProductCategories] = useState<
    IProductCategory[]
  >([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [fetchingProduct, setFetchingProduct] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const fetchProduct = async () => {
    setIsLoading(true);
    setFetchingProduct(!fetchProduct);
    try {
      const response = await getSingleProduct(id!);
      const productData = response.data;
      setProductName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price.toString());
      setStock(productData.stock.toString());
      setProductCategory(productData.category._id.toString());
      setProductImages(productData.images.map((img: any) => img.url || img));
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product data');
    } finally {
      setIsLoading(false);
      setFetchingProduct(!fetchProduct);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getProductCategories();
      setProductCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
    fetchCategories();
  }, [id]);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'gishoma.rw');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dcwchdco1/image/upload',
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    const uploadPromises = Array.from(files)
      .slice(0, 8 - productImages.length)
      .map(async (file) => {
        if (!file.type.startsWith('image/')) {
          toast.error('Only image files are allowed');
          return null;
        }
        return await uploadToCloudinary(file);
      });

    try {
      const newImages = (await Promise.all(uploadPromises)).filter(
        Boolean
      ) as string[];
      setProductImages((prev) => [...prev, ...newImages]);
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload some images');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(productImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setProductImages(items);
  };

  const handleRemoveImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!productName.trim()) newErrors.name = 'Product name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!price.trim()) newErrors.price = 'Price is required';
    if (!stock.trim()) newErrors.stock = 'Stock is required';
    if (!productCategory.trim())
      newErrors.productCategory = 'Category is required';
    if (productImages.length < 3 || productImages.length > 8) {
      newErrors.images = 'Please upload between 3 and 8 images';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const productData = {
        name: productName.trim(),
        description: description.trim(),
        price: parseFloat(price),
        category: productCategory,
        stock: parseInt(stock),
        images: productImages,
      };

      const response = await updateProduct(id, productData);

      if (response.status === 200) {
        toast.success(`Product ${id ? 'updated' : 'created'} successfully`);
        setIsSuccess(true);

        if (!id) {
          resetForm();
        }
      } else {
        toast.error(response.message || 'Operation failed');
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to save product');
    }
  };

  const resetForm = () => {
    fetchProduct();
    setIsSuccess(!isSuccess);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <Toaster richColors position="top-center" />
      <ProductsNavBar />

      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Edit a product with at least 3 images and other properties.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {fetchingProduct || isLoading ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>

                  <div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                    <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>

                  <div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                      <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                      <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                    <div className="h-40 bg-gray-200 rounded-xl border-2 border-dashed animate-pulse"></div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((_, index) => (
                      <div
                        key={index}
                        className="relative aspect-square bg-gray-200 rounded-lg animate-pulse"
                      >
                        <div className="absolute top-1 right-1 bg-white/90 p-1 rounded-full">
                          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="absolute bottom-1 left-1 bg-white/90 p-1 rounded-full">
                          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 flex justify-end gap-4">
                <div className="h-10 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                      placeholder="e.g., Premium Headphones"
                      disabled={isLoading}
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
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.description
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                      placeholder="Add a detailed description..."
                      disabled={isLoading}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.productCategory
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                      disabled={isLoading}
                    >
                      <option value="">Select Category</option>
                      {productCategories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.productCategory && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.productCategory}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (RWF) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          errors.price ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                        placeholder="Enter price"
                        disabled={isLoading}
                      />
                      {errors.price && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.price}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          errors.stock ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                        placeholder="Enter quantity"
                        disabled={isLoading}
                      />
                      {errors.stock && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.stock}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Images <span className="text-red-500">*</span>
                      <span className="text-gray-500 ml-2">
                        ({productImages.length}/8)
                      </span>
                    </label>

                    {productImages.length < 8 && (
                      <div className="relative group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                          multiple
                          disabled={isUploading || isLoading}
                        />
                        <label
                          htmlFor="image-upload"
                          className={`w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                            errors.images
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                          } ${
                            isUploading || isLoading
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          }`}
                        >
                          {isUploading ? (
                            <div className="animate-pulse text-gray-500">
                              Uploading...
                            </div>
                          ) : (
                            <>
                              <FaImage className="w-8 h-8 text-gray-400 mb-3 group-hover:text-primary transition-colors" />
                              <p className="text-gray-500 text-center text-sm">
                                <span className="text-primary font-medium">
                                  Click to upload
                                </span>{' '}
                                or drag and drop
                                <br />
                                JPG, PNG (max. 5MB each)
                              </p>
                            </>
                          )}
                        </label>
                      </div>
                    )}

                    {errors.images && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.images}
                      </p>
                    )}

                    {productImages.length > 0 && (
                      <div className="mt-4">
                        <DragDropContext onDragEnd={handleDragEnd}>
                          <Droppable
                            droppableId="images"
                            direction="horizontal"
                          >
                            {(provided) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="grid grid-cols-3 gap-3"
                              >
                                {productImages.map((img, index) => (
                                  <Draggable
                                    key={img}
                                    draggableId={img}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className="relative group aspect-square"
                                      >
                                        <img
                                          src={img}
                                          alt={`Product preview ${index + 1}`}
                                          className="w-full h-full object-cover rounded-lg border border-gray-200"
                                        />
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleRemoveImage(index)
                                          }
                                          className="absolute top-1 right-1 bg-white/90 p-1 rounded-full hover:bg-white transition-colors shadow-sm"
                                        >
                                          <FaTimes className="w-4 h-4 text-red-500" />
                                        </button>
                                        <div
                                          {...provided.dragHandleProps}
                                          className="absolute bottom-1 left-1 bg-white/90 p-1 rounded-full hover:bg-white transition-colors shadow-sm cursor-move"
                                        >
                                          <FaGripVertical className="w-4 h-4 text-gray-600" />
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                        <p className="text-gray-500 text-sm mt-3">
                          Drag to reorder images. First image will be featured.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center gap-2 transition-colors"
                  disabled={isLoading || isUploading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <FaSave className="w-5 h-5" />
                      <span>{id ? 'Update' : 'Create'} Product</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </form>

        {isSuccess && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/90 rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Product Updated!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your product has been successfully updated
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                  >
                    Continue Editing
                  </button>
                  <Link
                    to="/dashboard/products"
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    View Products
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

export default EditProduct;
