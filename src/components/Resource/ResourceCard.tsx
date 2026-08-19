import { IResource } from '../../types/store';
import { FaEdit, FaTrash, FaEye, FaRegClock, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ResourceCardProps {
  resource: IResource;
  onEdit?: (resource: IResource) => void;
  onDelete?: (id: string) => void;
  isEditable?: boolean;
  showViewButton?: boolean;
  viewLink?: string;
}

const statusClass = (status?: string) => {
  switch (status) {
    case 'published':
      return 'bg-white text-primary border-primary/20';
    case 'draft':
      return 'bg-white text-amber-600 border-amber-200';
    default:
      return 'bg-white text-slate-500 border-slate-200';
  }
};

const formatDate = (date?: Date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const ResourceCard = ({
  resource,
  onEdit,
  onDelete,
  isEditable = false,
  showViewButton = false,
  viewLink,
}: ResourceCardProps) => {
  return (
    <div className="group flex flex-col h-full rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-slate-300 transition-colors">
      <div className="relative h-36 bg-slate-100 overflow-hidden">
        {resource.coverImage ? (
          <img
            src={resource.coverImage}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaBook className="w-7 h-7 text-slate-300" />
          </div>
        )}
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-medium border capitalize ${statusClass(
            resource.status
          )}`}
        >
          {resource.status || 'draft'}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        {resource.category && (
          <p className="text-xs text-slate-500 mb-1.5 truncate">
            {resource.category}
          </p>
        )}

        <h3 className="text-base font-semibold text-slate-900 leading-snug line-clamp-2">
          {resource.title}
        </h3>

        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
          {resource.description}
        </p>

        {resource.tags && resource.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {resource.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full border border-slate-200 text-[11px] text-slate-500"
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="px-2 py-0.5 text-[11px] text-slate-400">
                +{resource.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <FaRegClock className="w-3 h-3 text-slate-400" />
            {formatDate(resource.createdAt)}
          </span>
          {resource.contents && (
            <span>
              {resource.contents.length}{' '}
              {resource.contents.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>

        {(showViewButton || isEditable) && (
          <div className="mt-4 flex gap-2">
            {showViewButton && viewLink && (
              <Link
                to={viewLink}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              >
                <FaEye className="w-3.5 h-3.5" />
                View
              </Link>
            )}

            {isEditable && (
              <>
                <button
                  type="button"
                  onClick={() => onEdit?.(resource)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <FaEdit className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this resource?'
                      )
                    ) {
                      onDelete?.(resource._id || '');
                    }
                  }}
                  aria-label="Delete resource"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                >
                  <FaTrash className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
