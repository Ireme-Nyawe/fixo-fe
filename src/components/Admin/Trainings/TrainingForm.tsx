import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { ITraining } from '../../../types/store';
import { uploadToCloudinary } from '../../../helpers/clouadinary';
import { isEmptyRichText } from '../../../helpers/training';
import RichTextEditor from './RichTextEditor';

interface TrainingFormProps {
  initialData?: ITraining;
  onSubmit: (data: ITraining) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  serverErrors?: string[];
}

const toDateTimeLocal = (value?: string | Date): string => {
  if (!value) return '';
  const date = new Date(value);
  if (isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const TrainingForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  serverErrors: parentServerErrors = [],
}: TrainingFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    coverImage: initialData?.coverImage || '',
    location: initialData?.location || '',
    directions: initialData?.directions || '',
    startTime: toDateTimeLocal(initialData?.startTime),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  useEffect(() => {
    setServerErrors(parentServerErrors);
  }, [parentServerErrors]);

  const clearFieldError = (name: string) => {
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverErrors.length > 0) {
      setServerErrors([]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name);
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
    clearFieldError('description');
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
        folder: 'trainings/covers',
        resourceType: 'image',
      });

      if (url) {
        setFormData((prev) => ({ ...prev, coverImage: url }));
        clearFieldError('coverImage');
        toast.success('Cover image uploaded');
      }
    } finally {
      setIsUploadingCover(false);
      e.target.value = '';
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.directions.trim())
      newErrors.directions = 'Directions are required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit({
      title: formData.title.trim(),
      description: isEmptyRichText(formData.description)
        ? ''
        : formData.description,
      category: formData.category.trim(),
      coverImage: formData.coverImage,
      location: formData.location.trim(),
      directions: formData.directions.trim(),
      startTime: new Date(formData.startTime).toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {serverErrors.length > 0 && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <ul className="list-disc list-inside space-y-1">
            {serverErrors.map((error, index) => (
              <li key={index} className="text-sm text-red-600">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            placeholder="e.g., Refrigeration Maintenance Basics"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image
          </label>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageUpload}
                disabled={isUploadingCover}
                className="hidden"
                id="training-cover-upload"
              />
              <label
                htmlFor="training-cover-upload"
                className={`flex items-center justify-center px-4 py-2.5 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                  isUploadingCover
                    ? 'opacity-50 cursor-not-allowed border-gray-300'
                    : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                }`}
              >
                {isUploadingCover
                  ? 'Uploading...'
                  : formData.coverImage
                  ? 'Click to replace cover'
                  : 'Click to upload cover'}
              </label>
            </div>
            {formData.coverImage && (
              <div className="flex items-center gap-3">
                <div className="w-28 h-20 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, coverImage: '' }))
                  }
                  className="p-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                  title="Remove cover image"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <RichTextEditor
            value={formData.description}
            onChange={handleDescriptionChange}
            placeholder="What will attendees learn in this training?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
            placeholder="e.g., Electrical, Plumbing, Electronics"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start time <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.startTime ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
          />
          {errors.startTime && (
            <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
            placeholder="e.g., Fixo Training Center, Kigali"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Directions <span className="text-red-500">*</span>
          </label>
          <textarea
            name="directions"
            value={formData.directions}
            onChange={handleChange}
            rows={3}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.directions ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
            placeholder="How attendees find the venue, or a maps link"
          />
          {errors.directions && (
            <p className="text-red-500 text-sm mt-1">{errors.directions}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <FaTimes className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || isUploadingCover}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          <FaSave className="w-4 h-4" />
          {isLoading
            ? 'Saving...'
            : initialData
            ? 'Update Training'
            : 'Create Training'}
        </button>
      </div>
    </form>
  );
};

export default TrainingForm;
