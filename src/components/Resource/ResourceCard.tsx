import { IResource } from '../../../types/store';
import { FaEdit, FaTrash, FaEye, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ResourceCardProps {
  resource: IResource;
  onEdit?: (resource: IResource) => void;
  onDelete?: (id: string) => void;
  isEditable?: boolean;
  showViewButton?: boolean;
  viewLink?: string;
}

const ResourceCard = ({
  resource,
  onEdit,
  onDelete,
  isEditable = false,
  showViewButton = false,
  viewLink,
}: ResourceCardProps) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Cover Image */}
      {resource.coverImage && (
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <img
            src={resource.coverImage}
            alt={resource.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                resource.status
              )}`}
            >
              {resource.status || 'draft'}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {resource.title}
          </h3>
        </div>

        {/* Category & Tags */}
        <div className="flex flex-wrap gap-2">
          {resource.category && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
              {resource.category}
            </span>
          )}
          {resource.tags && resource.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
            >
              #{tag}
            </span>
          ))}
          {resource.tags && resource.tags.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              +{resource.tags.length - 2} more
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {resource.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between pt-3 text-xs text-gray-500 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <FaClock className="w-3 h-3" />
            {formatDate(resource.createdAt)}
          </div>
          {resource.contents && (
            <span>{resource.contents.length} content items</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          {showViewButton && viewLink && (
            <Link
              to={viewLink}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary hover:bg-primary/90 text-white text-sm rounded-lg transition-colors"
            >
              <FaEye className="w-4 h-4" />
              View
            </Link>
          )}

          {isEditable && (
            <>
              <button
                onClick={() => onEdit?.(resource)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm rounded-lg transition-colors"
              >
                <FaEdit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this resource?'
                    )
                  ) {
                    onDelete?.(resource._id || '');
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm rounded-lg transition-colors"
              >
                <FaTrash className="w-4 h-4" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
