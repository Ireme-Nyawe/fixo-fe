import { useState } from 'react';
import { IResourceContent } from '../../../types/store';
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaImage,
  FaVideo,
  FaMusic,
  FaFilePdf,
  FaFileAlt,
} from 'react-icons/fa';
import RichTextEditor from '../../../components/Admin/Trainings/RichTextEditor';
import { toast } from 'sonner';
import { uploadToCloudinary } from '../../../helpers/clouadinary';

interface ContentManagerProps {
  resourceId: string;
  contents: IResourceContent[];
  onAddContent: (content: IResourceContent) => Promise<void>;
  onUpdateContent: (contentId: string, content: Partial<IResourceContent>) => Promise<void>;
  onDeleteContent: (contentId: string) => Promise<void>;
  isLoading?: boolean;
}

const ContentManager = ({
  resourceId,
  contents,
  onAddContent,
  onUpdateContent,
  onDeleteContent,
  isLoading = false,
}: ContentManagerProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<IResourceContent>>({
    type: 'article',
    order: contents.length,
  });
  const [isUploading, setIsUploading] = useState(false);

  const contentTypes = [
    { value: 'article', label: 'Article', icon: FaFileAlt },
    { value: 'video', label: 'Video', icon: FaVideo },
    { value: 'audio', label: 'Audio', icon: FaMusic },
    { value: 'image', label: 'Image', icon: FaImage },
    { value: 'pdf', label: 'PDF', icon: FaFilePdf },
  ];

  const resetForm = () => {
    setFormData({
      type: 'article',
      order: contents.length,
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      toast.error('File size must be less than 100MB');
      return;
    }

    setIsUploading(true);
    try {
      const resourceType = formData.type === 'pdf' ? 'raw' : formData.type;
      const url = await uploadToCloudinary(file, {
        folder: `resources/${resourceId}`,
        resourceType: resourceType as string,
      });

      if (url) {
        setFormData((prev) => ({
          ...prev,
          url,
          mimeType: file.type,
          fileSize: file.size,
        }));
        toast.success('File uploaded successfully');
      }
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to upload file';
      toast.error(errorMessage);
      console.error('File upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.type) {
      toast.error('Please select content type');
      return;
    }

    if (formData.type === 'article' && !formData.htmlContent?.trim()) {
      toast.error('Please enter HTML content for article');
      return;
    }

    if (
      ['video', 'audio', 'image', 'pdf'].includes(formData.type as string) &&
      !formData.url?.trim()
    ) {
      toast.error(`Please upload a file or provide an external URL for ${formData.type}`);
      return;
    }

    if (formData.type === 'image' && !formData.altText?.trim()) {
      toast.error('Please provide alt text for image accessibility');
      return;
    }

    if (!formData.title?.trim()) {
      toast.error('Please provide a title for the content');
      return;
    }

    try {
      if (editingId) {
        await onUpdateContent(editingId, formData);
      } else {
        await onAddContent(formData as IResourceContent);
      }
      resetForm();
    } catch (error: any) {
      const errorMessage =
        error?.message ||
        error?.response?.data?.message ||
        'Failed to save content';
      toast.error(errorMessage);
      console.error('Content submission error:', error);
    }
  };

  const getContentIcon = (type: string) => {
    const contentType = contentTypes.find((ct) => ct.value === type);
    const IconComponent = contentType?.icon || FaFileAlt;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Content Items</h3>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            Add Content
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Content Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {contentTypes.map((ct) => (
                  <button
                    key={ct.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, type: ct.value as any }))
                    }
                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                      formData.type === ct.value
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {ct.icon && <ct.icon className="w-5 h-5" />}
                    <span className="text-xs font-medium text-center">
                      {ct.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title (Optional)
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="Sub-title for this content"
              />
            </div>

            {/* Article Content */}
            {formData.type === 'article' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HTML Content <span className="text-red-500">*</span>
                </label>
                <RichTextEditor
                  value={formData.htmlContent || ''}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, htmlContent: value }))
                  }
                  placeholder="Enter HTML content..."
                />
              </div>
            )}

            {/* File Upload or URL for non-article types */}
            {formData.type !== 'article' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File or URL <span className="text-gray-500 text-xs">(upload a file or paste an external URL)</span>
                </label>

                <input
                  type="text"
                  value={formData.url || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, url: e.target.value }))
                  }
                  placeholder="https://... (optional if you upload a file)"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all mb-3"
                />

                <input
                  type="file"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                  id={`file-upload-${editingId || 'new'}`}
                  accept={
                    formData.type === 'video'
                      ? 'video/*'
                      : formData.type === 'audio'
                        ? 'audio/*'
                        : formData.type === 'image'
                          ? 'image/*'
                          : 'application/pdf'
                  }
                />
                <label
                  htmlFor={`file-upload-${editingId || 'new'}`}
                  className={`flex items-center justify-center px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                    isUploading
                      ? 'opacity-50 cursor-not-allowed'
                      : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                  }`}
                >
                  {isUploading
                    ? 'Uploading...'
                    : formData.url && formData.mimeType
                      ? 'File uploaded - Click to change'
                      : 'Click to upload file'}
                </label>

                {formData.url && (
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-green-600">✓ URL set</p>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          url: undefined,
                          mimeType: undefined,
                          fileSize: undefined,
                        }))
                      }
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Duration (for video/audio) */}
            {['video', 'audio'].includes(formData.type || '') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  value={formData.duration || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      duration: parseInt(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="e.g., 120"
                />
              </div>
            )}

            {/* Alt Text (for image) */}
            {formData.type === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text (for accessibility)
                </label>
                <input
                  type="text"
                  value={formData.altText || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, altText: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Describe the image"
                />
              </div>
            )}

            {/* Caption (for video/audio/image) */}
            {['video', 'audio', 'image'].includes(formData.type || '') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption
                </label>
                <input
                  type="text"
                  value={formData.caption || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, caption: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Add caption for this content"
                />
              </div>
            )}

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order
              </label>
              <input
                type="number"
                value={formData.order || 0}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    order: parseInt(e.target.value),
                  }))
                }
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="0"
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || isUploading}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : editingId ? 'Update' : 'Add'} Content
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content List */}
      <div className="space-y-3">
        {contents && contents.length > 0 ? (
          contents
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((content) => (
              <div
                key={content._id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-primary">
                    {getContentIcon(content.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {content.title || `${content.type} Content`}
                    </p>
                    <p className="text-sm text-gray-600">
                      Order: {content.order}
                      {content.duration && ` • Duration: ${content.duration}s`}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(content._id || null);
                      setFormData(content);
                      setShowAddForm(true);
                    }}
                    className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this content?')) {
                        onDeleteContent(content._id || '');
                      }
                    }}
                    className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            No content added yet. Click "Add Content" to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContentManager;
