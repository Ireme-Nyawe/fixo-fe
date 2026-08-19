import { ITraining } from '../../../types/store';
import {
  buildDirectionsUrl,
  formatStartTime,
  isUpcoming,
  stripHtml,
} from '../../../helpers/training';
import {
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaRegClock,
  FaChalkboardTeacher,
} from 'react-icons/fa';

interface TrainingsTableProps {
  trainings: ITraining[];
  onEdit: (training: ITraining) => void;
  onDelete: (training: ITraining) => void;
  deletingId?: string | null;
}

const TrainingsTable = ({
  trainings,
  onEdit,
  onDelete,
  deletingId,
}: TrainingsTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Training
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Starts
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {trainings.map((training) => (
              <tr key={training._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    {training.coverImage ? (
                      <img
                        src={training.coverImage}
                        alt={training.title}
                        className="w-16 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                      />
                    ) : (
                      <span className="w-16 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <FaChalkboardTeacher />
                      </span>
                    )}
                    <div>
                      <p className="font-medium text-gray-800">
                        {training.title}
                      </p>
                      {training.description && (
                        <p className="text-sm text-gray-500 line-clamp-2 max-w-md">
                          {stripHtml(training.description)}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                    {training.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                  <span className="flex items-center gap-2">
                    <FaRegClock className="text-gray-400" />
                    {formatStartTime(training.startTime)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <a
                    href={buildDirectionsUrl(
                      training.location,
                      training.directions
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open directions"
                    className="flex items-start gap-2 hover:text-primary transition-colors"
                  >
                    <FaMapMarkerAlt className="text-gray-400 mt-0.5" />
                    <span>
                      <span className="underline underline-offset-2 decoration-gray-300">
                        {training.location}
                      </span>
                      {training.directions && (
                        <span className="block text-xs text-gray-400 line-clamp-1 max-w-xs">
                          {training.directions}
                        </span>
                      )}
                    </span>
                  </a>
                </td>
                <td className="px-6 py-4">
                  {isUpcoming(training.startTime) ? (
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                      Upcoming
                    </span>
                  ) : (
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                      Past
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(training)}
                      title="Edit training"
                      className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(training)}
                      disabled={deletingId === training._id}
                      title="Delete training"
                      className="p-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingsTable;
