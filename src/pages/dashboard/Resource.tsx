import { useEffect, useState } from 'react';
import { IResource, IResourceContent } from '../../types/store';
import ResourcesNavBar from '../../components/dashboard/ResourcesNavBar';
import ResourceForm from '../../components/dashboard/Resource/ResourceForm';
import ContentManager from '../../components/dashboard/Resource/ContentManager';
import ResourceCard from '../../components/Resource/ResourceCard';
import {
  getUserResources,
  createResource,
  updateResource,
  deleteResource,
  addResourceContent,
  updateResourceContent,
  deleteResourceContent,
} from '../../state/features/resource/resourceService';
import { toast, Toaster } from 'sonner';
import { FaPlus, FaList, FaArrowLeft } from 'react-icons/fa';

type ViewMode = 'list' | 'create' | 'edit' | 'manage-content';

// Utility function to parse backend error messages
const parseBackendError = (error: any): string[] => {
  const errors: string[] = [];

  if (!error) return errors;

  if (typeof error === 'string') {
    errors.push(error);
    return errors;
  }

  if (error.status && error.message) {
    const message = error.message;
    if (typeof message === 'string') {
      const validationErrors = message.includes(',')
        ? message.split(',').map((m: string) => m.trim())
        : [message];
      errors.push(...validationErrors.filter(Boolean));
    }
    return errors;
  }

  if (error.response?.data?.message) {
    const message = error.response.data.message;
    if (typeof message === 'string') {
      const validationErrors = message.includes(',')
        ? message.split(',').map((m: string) => m.trim())
        : [message];
      errors.push(...validationErrors.filter(Boolean));
    }
    return errors;
  }

  if (error.response?.data) {
    const data = error.response.data;
    if (data.errors && Array.isArray(data.errors)) {
      errors.push(...data.errors.map((e: any) =>
        typeof e === 'string' ? e : e.message || JSON.stringify(e)
      ));
    }
  }

  if (error.message) {
    errors.push(error.message);
  }

  return errors.length > 0 ? errors : ['An unexpected error occurred'];
};

// Utility function to show error toast for each error
const showErrorToasts = (errors: string[]) => {
  errors.forEach((error) => {
    toast.error(error);
  });
};

const getPayloadUserId = (value: string | { _id?: string } | undefined) => {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && value._id) return value._id;
  return '';
};

const Resource = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [resources, setResources] = useState<IResource[]>([]);
  const [selectedResource, setSelectedResource] = useState<IResource | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formServerErrors, setFormServerErrors] = useState<string[]>([]);

  const fetchResources = async () => {
    setIsFetching(true);
    try {
      const response = await getUserResources();
      const resourcesList = Array.isArray(response) ? response : response?.data || [];
      if (Array.isArray(resourcesList)) {
        setResources(resourcesList);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to fetch resources');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleCreateResource = async (data: IResource) => {
    setFormServerErrors([]);
    setIsLoading(true);
    try {
      const response = await createResource(data);
      const createdResource = response?.data || response;

      if (createdResource && (createdResource._id || createdResource.title)) {
        toast.success('Resource created successfully!');
        setResources((prev) => [...prev, createdResource]);
        setViewMode('list');
        setFormServerErrors([]);
      } else if (response?.message) {
        toast.success(response.message);
      }
    } catch (error: any) {
      const backendErrors = parseBackendError(error);
      setFormServerErrors(backendErrors);
      showErrorToasts(backendErrors);
      console.error('Error creating resource:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateResource = async (data: IResource) => {
    if (!selectedResource?._id) return;

    setFormServerErrors([]);
    setIsLoading(true);
    try {
      const response = await updateResource(selectedResource._id, data);
      const updatedResource = response?.data || response;

      if (updatedResource && (updatedResource._id || updatedResource.title)) {
        toast.success('Resource updated successfully!');
        setResources((prev) =>
          prev.map((r) =>
            r._id === selectedResource._id ? updatedResource : r
          )
        );
        setViewMode('list');
        setSelectedResource(null);
        setFormServerErrors([]);
      } else if (response?.message) {
        toast.success(response.message);
      }
    } catch (error: any) {
      const backendErrors = parseBackendError(error);
      setFormServerErrors(backendErrors);
      showErrorToasts(backendErrors);
      console.error('Error updating resource:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResource = async (id: string) => {
    try {
      const response = await deleteResource(id);
      const message = response?.message || 'Resource deleted successfully!';

      if (response?.status && Number(response.status) >= 400) {
        toast.error(message);
        return;
      }

      toast.success(message);
      setResources((prev) => prev.filter((r) => r._id !== id));
    } catch (error: any) {
      const backendErrors = parseBackendError(error);
      showErrorToasts(backendErrors);
      console.error('Error deleting resource:', error);
    }
  };

  const handleAddContent = async (content: IResourceContent) => {
    if (!selectedResource?._id) return;

    const createdById = getPayloadUserId(selectedResource.createdBy);
    const payload = {
      ...content,
      resourceId: selectedResource._id,
      createdBy: createdById,
    };

    try {
      const response = await addResourceContent(selectedResource._id, payload);
      const result = response?.data || response;
      const message = result?.message || 'Content added successfully!';

      if (response?.status && Number(response.status) >= 400) {
        toast.error(message);
        return;
      }

      toast.success(message);
      const newContent = result && result._id ? result : { ...payload, _id: Date.now().toString() };
      const updatedContents = [
        ...(selectedResource.contents || []),
        newContent,
      ];
      const updated = { ...selectedResource, contents: updatedContents };
      setSelectedResource(updated);
      setResources(
        resources.map((r) =>
          r._id === selectedResource._id ? updated : r
        )
      );
    } catch (error: any) {
      const backendErrors = parseBackendError(error);
      showErrorToasts(backendErrors);
      console.error('Error adding content:', error);
    }
  };

  const handleUpdateContent = async (
    contentId: string,
    content: Partial<IResourceContent>
  ) => {
    if (!selectedResource?._id) return;

    try {
      const response = await updateResourceContent(
        selectedResource._id,
        contentId,
        content
      );
      const result = response?.data || response;

      if (response?.status && Number(response.status) >= 400) {
        toast.error(result?.message || 'Failed to update content');
        return;
      }

      if (result) {
        toast.success(result?.message || 'Content updated successfully!');
        const updatedContents = (selectedResource.contents || []).map((c) =>
          c._id === contentId ? result : c
        );
        const updated = { ...selectedResource, contents: updatedContents };
        setSelectedResource(updated);
        setResources(
          resources.map((r) =>
            r._id === selectedResource._id ? updated : r
          )
        );
      }
    } catch (error: any) {
      const backendErrors = parseBackendError(error);
      showErrorToasts(backendErrors);
      console.error('Error updating content:', error);
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    if (!selectedResource?._id) return;

    try {
      const response = await deleteResourceContent(
        selectedResource._id,
        contentId
      );
      const message = response?.message || 'Content deleted successfully!';

      if (response?.status && Number(response.status) >= 400) {
        toast.error(message);
        return;
      }

      toast.success(message);
      const updatedContents = (selectedResource.contents || []).filter(
        (c) => c._id !== contentId
      );
      const updated = { ...selectedResource, contents: updatedContents };
      setSelectedResource(updated);
      setResources(
        resources.map((r) =>
          r._id === selectedResource._id ? updated : r
        )
      );
    } catch (error: any) {
      const backendErrors = parseBackendError(error);
      showErrorToasts(backendErrors);
      console.error('Error deleting content:', error);
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster richColors position="top-center" />
        <ResourcesNavBar />

        <main className="p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Resources</h1>
                <p className="text-gray-600 mt-2">
                  Create and manage learning resources for your community
                </p>
              </div>
              <button
                onClick={() => setViewMode('create')}
                className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <FaPlus className="w-5 h-5" />
                Create Resource
              </button>
            </div>

            {isFetching ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading resources...</p>
                </div>
              </div>
            ) : resources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                  <div key={resource._id} className="flex flex-col">
                    <ResourceCard
                      resource={resource}
                      isEditable
                      onEdit={(res) => {
                        setSelectedResource(res);
                        setViewMode('edit');
                      }}
                      onDelete={handleDeleteResource}
                    />
                    <button
                      onClick={() => {
                        setSelectedResource(resource);
                        setViewMode('manage-content');
                      }}
                      className="mt-3 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium rounded-lg transition-colors"
                    >
                      Manage Content ({resource.contents?.length || 0})
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <FaList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">
                  No resources yet
                </p>
                <p className="text-gray-500 mb-6">
                  Create your first resource to get started
                </p>
                <button
                  onClick={() => setViewMode('create')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                >
                  <FaPlus className="w-5 h-5" />
                  Create Resource
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  if (viewMode === 'create') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster richColors position="top-center" />
        <ResourcesNavBar />

        <main className="p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <button
                onClick={() => setViewMode('list')}
                className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
                Back to Resources
              </button>
              <h1 className="text-3xl font-bold text-gray-800">
                Create Resource
              </h1>
              <p className="text-gray-600 mt-2">
                Create a new learning resource with content items
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8">
              <ResourceForm
                onSubmit={handleCreateResource}
                onCancel={() => {
                  setViewMode('list');
                  setFormServerErrors([]);
                }}
                isLoading={isLoading}
                serverErrors={formServerErrors}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (viewMode === 'edit' && selectedResource) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster richColors position="top-center" />
        <ResourcesNavBar />

        <main className="p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <button
                onClick={() => {
                  setViewMode('list');
                  setSelectedResource(null);
                }}
                className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
                Back to Resources
              </button>
              <h1 className="text-3xl font-bold text-gray-800">
                Edit Resource
              </h1>
              <p className="text-gray-600 mt-2">
                Update resource details and settings
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8">
              <ResourceForm
                initialData={selectedResource}
                onSubmit={handleUpdateResource}
                onCancel={() => {
                  setViewMode('list');
                  setSelectedResource(null);
                  setFormServerErrors([]);
                }}
                isLoading={isLoading}
                serverErrors={formServerErrors}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (viewMode === 'manage-content' && selectedResource) {
    console.log("selected resource",selectedResource);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster richColors position="top-center" />
        <ResourcesNavBar />

        <main className="p-6 md:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <button
                onClick={() => {
                  setViewMode('list');
                  setSelectedResource(null);
                }}
                className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
                Back to Resources
              </button>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {selectedResource.title}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Manage content items for this resource
                  </p>
                </div>
                <button
                  onClick={() => {
                    setViewMode('edit');
                  }}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                >
                  Edit Resource
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8">
              <ContentManager
                resourceId={selectedResource._id || ''}
                contents={selectedResource.contents || []}
                onAddContent={handleAddContent}
                onUpdateContent={handleUpdateContent}
                onDeleteContent={handleDeleteContent}
                isLoading={isLoading}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
};

export default Resource;
