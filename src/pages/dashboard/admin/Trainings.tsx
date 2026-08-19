import { useEffect, useMemo, useState } from 'react';
import { toast, Toaster } from 'sonner';
import {
  FaPlus,
  FaArrowLeft,
  FaChalkboardTeacher,
  FaSearch,
} from 'react-icons/fa';
import { ITraining } from '../../../types/store';
import TrainingForm from '../../../components/Admin/Trainings/TrainingForm';
import TrainingsTable from '../../../components/Admin/Trainings/TrainingsTable';
import {
  isUpcoming,
  parseTrainingError,
  stripHtml,
} from '../../../helpers/training';
import {
  getAllTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
} from '../../../state/features/training/trainingService';

type ViewMode = 'list' | 'create' | 'edit';
type TimeFilter = 'all' | 'upcoming' | 'past';

const showErrorToasts = (errors: string[]) => {
  errors.forEach((error) => toast.error(error));
};

const Trainings = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [trainings, setTrainings] = useState<ITraining[]>([]);
  const [selectedTraining, setSelectedTraining] = useState<ITraining | null>(
    null
  );
  const [trainingToDelete, setTrainingToDelete] = useState<ITraining | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formServerErrors, setFormServerErrors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');

  const fetchTrainings = async () => {
    setIsFetching(true);
    try {
      const response = await getAllTrainings();
      const list = Array.isArray(response) ? response : response?.data || [];
      setTrainings(Array.isArray(list) ? list : []);
    } catch (error) {
      showErrorToasts(parseTrainingError(error));
      console.error('Error fetching trainings:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const visibleTrainings = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return trainings
      .filter((training) => {
        if (timeFilter === 'upcoming') return isUpcoming(training.startTime);
        if (timeFilter === 'past') return !isUpcoming(training.startTime);
        return true;
      })
      .filter((training) => {
        if (!keyword) return true;
        return [
          training.title,
          stripHtml(training.description),
          training.category,
          training.location,
        ]
          .filter(Boolean)
          .some((field) => String(field).toLowerCase().includes(keyword));
      })
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
  }, [trainings, searchTerm, timeFilter]);

  const handleCreateTraining = async (data: ITraining) => {
    setFormServerErrors([]);
    setIsLoading(true);
    try {
      const response = await createTraining(data);
      const created = response?.data || response;

      if (!created?._id) {
        throw new Error(response?.message || 'Failed to create training');
      }

      toast.success(response?.message || 'Training created successfully!');
      setTrainings((prev) => [...prev, created]);
      setViewMode('list');
    } catch (error) {
      const backendErrors = parseTrainingError(error);
      setFormServerErrors(backendErrors);
      showErrorToasts(backendErrors);
      console.error('Error creating training:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTraining = async (data: ITraining) => {
    if (!selectedTraining?._id) return;

    setFormServerErrors([]);
    setIsLoading(true);
    try {
      const response = await updateTraining(selectedTraining._id, data);
      const updated = response?.data || response;

      if (!updated?._id) {
        throw new Error(response?.message || 'Failed to update training');
      }

      toast.success(response?.message || 'Training updated successfully!');
      setTrainings((prev) =>
        prev.map((t) => (t._id === selectedTraining._id ? updated : t))
      );
      setViewMode('list');
      setSelectedTraining(null);
    } catch (error) {
      const backendErrors = parseTrainingError(error);
      setFormServerErrors(backendErrors);
      showErrorToasts(backendErrors);
      console.error('Error updating training:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTraining = async () => {
    const id = trainingToDelete?._id;
    if (!id) return;

    setDeletingId(id);
    try {
      const response = await deleteTraining(id);

      if (response?.status && Number(response.status) >= 400) {
        throw new Error(response.message || 'Failed to delete training');
      }

      toast.success(response?.message || 'Training deleted successfully!');
      setTrainings((prev) => prev.filter((t) => t._id !== id));
      setTrainingToDelete(null);
    } catch (error) {
      showErrorToasts(parseTrainingError(error));
      console.error('Error deleting training:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const backToList = () => {
    setViewMode('list');
    setSelectedTraining(null);
    setFormServerErrors([]);
  };

  if (viewMode === 'create' || viewMode === 'edit') {
    const isEdit = viewMode === 'edit';

    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster richColors position="top-center" />

        <main className="p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <button
                onClick={backToList}
                className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
                Back to Trainings
              </button>
              <h1 className="text-3xl font-bold text-gray-800">
                {isEdit ? 'Edit Training' : 'Schedule Training'}
              </h1>
              <p className="text-gray-600 mt-2">
                {isEdit
                  ? 'Update the details of this training session'
                  : 'Add a new training session for technicians and clients'}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8">
              <TrainingForm
                initialData={isEdit ? selectedTraining || undefined : undefined}
                onSubmit={isEdit ? handleUpdateTraining : handleCreateTraining}
                onCancel={backToList}
                isLoading={isLoading}
                serverErrors={formServerErrors}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster richColors position="top-center" />

      <main className="p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Trainings</h1>
              <p className="text-gray-600 mt-2">
                Schedule and manage training sessions offered to the community
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedTraining(null);
                setFormServerErrors([]);
                setViewMode('create');
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <FaPlus className="w-5 h-5" />
              Schedule Training
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, category or location"
                className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'upcoming', 'past'] as TimeFilter[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors ${timeFilter === filter
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {isFetching ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading trainings...</p>
              </div>
            </div>
          ) : visibleTrainings.length > 0 ? (
            <TrainingsTable
              trainings={visibleTrainings}
              deletingId={deletingId}
              onEdit={(training) => {
                setSelectedTraining(training);
                setFormServerErrors([]);
                setViewMode('edit');
              }}
              onDelete={(training) => setTrainingToDelete(training)}
            />
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <FaChalkboardTeacher className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">
                {trainings.length === 0
                  ? 'No trainings yet'
                  : 'No trainings match your filters'}
              </p>
              <p className="text-gray-500 mb-6">
                {trainings.length === 0
                  ? 'Schedule your first training session to get started'
                  : 'Try a different search term or filter'}
              </p>
              {trainings.length === 0 && (
                <button
                  onClick={() => setViewMode('create')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                >
                  <FaPlus className="w-5 h-5" />
                  Schedule Training
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {trainingToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-800">Delete training</h2>
            <p className="text-gray-600 mt-3">
              Are you sure you want to delete{' '}
              <span className="font-semibold">{trainingToDelete.title}</span>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setTrainingToDelete(null)}
                disabled={!!deletingId}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTraining}
                disabled={!!deletingId}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {deletingId ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainings;
