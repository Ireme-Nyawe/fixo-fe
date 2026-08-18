import { useState, useEffect } from 'react';
import { IResource } from '../../../types/store';
import { FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';
import { uploadToCloudinary } from '../../../helpers/clouadinary';

interface ResourceFormProps {
  initialData?: IResource;
  onSubmit: (data: IResource) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  serverErrors?: string[];
}

// Utility function to generate slug from title
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Utility function to get user ID from localStorage profile
const getUserIdFromLocalStorage = (): string => {
  try {
    const profileString = localStorage.getItem('profile');
    if (profileString) {
      const profile = JSON.parse(profileString);
      return profile?._id || '';
    }
  } catch (error) {
    console.error('Error parsing profile from localStorage:', error);
  }
  return '';
};

const ResourceForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading = false,
  serverErrors: parentServerErrors = [] 
}: ResourceFormProps) => {
  const userId = getUserIdFromLocalStorage();

  const [formData, setFormData] = useState<IResource>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    createdBy: initialData?.createdBy || userId,
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    tags: initialData?.tags || [],
    coverImage: initialData?.coverImage || '',
    status: initialData?.status || 'draft',
    order: initialData?.order || 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [tagInput, setTagInput] = useState('');

  // Update serverErrors when parent passes them
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  useEffect(() => {
    setServerErrors(parentServerErrors);
  }, [parentServerErrors]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    
    // Auto-generate slug when title changes
    if (name === 'title') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverErrors.length > 0) {
      setServerErrors([]);
    }
  };

  const handleCoverImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file only');
      return;
    }

    setIsUploadingCover(true);
    try {
      const url = await uploadToCloudinary(file, {
        folder: 'resources/covers',
        resourceType: 'image',
      });

      if (url) {
        setFormData((prev) => ({
          ...prev,
          coverImage: url,
        }));
        toast.success('Cover image uploaded');
      }
    } catch (error) {
      toast.error('Failed to upload cover image');
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag) || [],
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim())
      newErrors.description = 'Description is required';
    if (!formData.coverImage?.trim())
      newErrors.coverImage = 'Cover image is required';
    if (!formData.slug?.trim())
      newErrors.slug = 'Slug is required (auto-generated from title)';
    if (!formData.createdBy?.trim())
      newErrors.createdBy = 'User ID is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error: any) {
      // Backend error handling is done in parent component
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Server Errors Display */}
      {serverErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-red-800 mb-2">
            Validation Errors
          </h3>
          <ul className="space-y-1">
            {serverErrors.map((error, idx) => (
              <li key={idx} className="text-sm text-red-700">
                • {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
            placeholder="Resource title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
            placeholder="Detailed description of the resource"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            placeholder="e.g., React, Python, Web Design"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Cover Image */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageUpload}
                disabled={isUploadingCover}
                className="hidden"
                id="cover-upload"
              />
              <label
                htmlFor="cover-upload"
                className={`flex items-center justify-center px-4 py-2.5 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                  isUploadingCover
                    ? 'opacity-50 cursor-not-allowed'
                    : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                } ${errors.coverImage ? 'border-red-500 bg-red-50' : ''}`}
              >
                {isUploadingCover ? 'Uploading...' : 'Click to upload cover'}
              </label>
              {errors.coverImage && (
                <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
              )}
            </div>
            {formData.coverImage && (
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              placeholder="Add tag and press Enter"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-red-500"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="border-t border-gray-100 pt-6 flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || isUploadingCover}
          className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSave className="w-5 h-5" />
          {isLoading ? 'Saving...' : initialData?._id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default ResourceForm;
