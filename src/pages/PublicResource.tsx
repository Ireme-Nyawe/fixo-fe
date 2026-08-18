
import { useEffect, useState } from 'react';
import { IResource, IResourceContent } from '../types/store';
import Header from '../components/clients/Header';
import Footer from '../components/clients/Footer';
import ResourceContentViewer from '../components/Resource/ResourceContentViewer';
import {
  getAllResources,
  getResourceFull,
  searchResources,
} from '../state/features/resource/resourceService';
import { FaSearch, FaTag, FaCalendar, FaSpinner } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';

const PublicResource = () => {
  const [resources, setResources] = useState<IResource[]>([]);
  const [selectedResource, setSelectedResource] = useState<IResource | null>(
    null
  );
  const [selectedContent, setSelectedContent] = useState<IResourceContent | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResources, setFilteredResources] = useState<IResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch all published resources
  const fetchResources = async () => {
    setIsLoading(true);
    try {
      const response = await getAllResources();
      if (response.data) {
        const published = response.data.filter(
          (r: IResource) => r.status === 'published'
        );
        setResources(published);
        setFilteredResources(published);
        if (published.length > 0) {
          loadResourceFull(published[0]._id || '');
        }
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load resources');
    } finally {
      setIsLoading(false);
    }
  };

  // Load full resource with content
  const loadResourceFull = async (id: string) => {
    try {
      const response = await getResourceFull(id);
      if (response.data) {
        setSelectedResource(response.data);
        const contents = response.data.contents || [];
        if (contents.length > 0) {
          setSelectedContent(contents[0]);
        } else {
          setSelectedContent(null);
        }
      }
    } catch (error) {
      console.error('Error loading resource:', error);
      toast.error('Failed to load resource details');
    }
  };

  // Handle search
  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredResources(resources);
      setSelectedCategory(null);
      return;
    }

    setIsSearching(true);
    try {
      const response = await searchResources(query);
      if (response.data) {
        const published = response.data.filter(
          (r: IResource) => r.status === 'published'
        );
        setFilteredResources(published);
      }
    } catch (error) {
      console.error('Error searching:', error);
      toast.error('Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle category filter
  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    setSearchQuery('');

    if (!category) {
      setFilteredResources(resources);
    } else {
      setFilteredResources(
        resources.filter((r) => r.category === category)
      );
    }
  };

  // Get unique categories
  const categories = Array.from(
    new Set(
      resources
        .map((r) => r.category)
        .filter((c): c is string => typeof c === 'string' && c.length > 0)
    )
  );

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Toaster richColors position="top-center" />
      <Header />

      <main className="flex-1 pt-8 pb-16">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <FaSpinner className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading resources...</p>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Learning Resources
              </h1>
              <p className="text-lg text-gray-600">
                Explore our collection of learning resources to skill up in various technologies
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 sticky top-0 z-20 bg-gray-50 pb-3 pt-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white"
                />
                {isSearching && (
                  <FaSpinner className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary animate-spin w-5 h-5" />
                )}
              </div>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="mb-8 sticky top-16 z-10 bg-gray-50 pb-3">
                <div className="overflow-x-auto pb-2">
                  <div className="flex gap-2 min-w-max md:min-w-0 md:flex-wrap">
                    <button
                      onClick={() => handleCategoryFilter(null)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                        selectedCategory === null
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryFilter(category)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                          selectedCategory === category
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-6">
              {/* Left Sidebar - Resources List */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="p-4 border-b border-gray-200 sticky top-0 z-10 bg-white">
                    <h2 className="font-bold text-gray-800">
                      Resources ({filteredResources.length})
                    </h2>
                  </div>

                  <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
                    {filteredResources.length > 0 ? (
                      filteredResources.map((resource) => (
                        <button
                          key={resource._id}
                          onClick={() => loadResourceFull(resource._id || '')}
                          className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                            selectedResource?._id === resource._id
                              ? 'bg-primary/5 border-l-4 border-l-primary'
                              : ''
                          }`}
                        >
                          <div className="flex gap-2">
                            {resource.coverImage && (
                              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={resource.coverImage}
                                  alt={resource.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 text-sm line-clamp-2">
                                {resource.title}
                              </p>
                              <p className="text-xs text-gray-600 line-clamp-1">
                                {resource.category}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-500">No resources found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Center & Right - Resource Details and Content */}
              {selectedResource ? (
                <div className="lg:sticky lg:top-24 lg:self-start w-full">
                  <div className="space-y-6 pr-1">
                    {/* Resource Header Card */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                      {selectedResource.coverImage && (
                        <div className="h-48 bg-gray-200 overflow-hidden">
                          <img
                            src={selectedResource.coverImage}
                            alt={selectedResource.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="p-6 md:p-8">
                        <div className="mb-4">
                          {selectedResource.category && (
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                              {selectedResource.category}
                            </span>
                          )}
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                          {selectedResource.title}
                        </h1>

                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                          {selectedResource.description}
                        </p>

                        {/* Metadata */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                          {selectedResource.tags && selectedResource.tags.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                                <FaTag className="w-4 h-4" />
                                <span className="font-medium">Tags</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {selectedResource.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {selectedResource.contents && (
                            <div>
                              <div className="text-gray-600 text-sm mb-2 font-medium">
                                Content Items
                              </div>
                              <p className="text-2xl font-bold text-primary">
                                {selectedResource.contents.length}
                              </p>
                            </div>
                          )}

                          {selectedResource.createdAt && (
                            <div>
                              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                                <FaCalendar className="w-4 h-4" />
                                <span className="font-medium">Published</span>
                              </div>
                              <p className="text-gray-800 text-sm">
                                {new Date(selectedResource.createdAt).toLocaleDateString(
                                  'en-US',
                                  {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  }
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content Navigation Tabs */}
                    {selectedResource.contents &&
                      selectedResource.contents.length > 0 && (
                        <>
                          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                              <div className="flex p-4 border-b border-gray-200 gap-2 min-w-min md:min-w-0">
                                {selectedResource.contents
                                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                                  .map((content, index) => (
                                    <button
                                      key={content._id}
                                      onClick={() => setSelectedContent(content)}
                                      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm font-medium ${
                                        selectedContent?._id === content._id
                                          ? 'bg-primary text-white'
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                      }`}
                                    >
                                      {content.title ||
                                        `${content.type} ${index + 1}`}
                                    </button>
                                  ))}
                              </div>
                            </div>
                          </div>

                          {/* Content Viewer */}
                          {selectedContent && (
                            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
                              <ResourceContentViewer content={selectedContent} />
                            </div>
                          )}
                        </>
                      )}

                    {(!selectedResource.contents ||
                      selectedResource.contents.length === 0) && (
                      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center">
                        <p className="text-gray-600">
                          No content available for this resource yet.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="lg:col-span-3 bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center">
                  <p className="text-gray-600">
                    Select a resource from the list to view its content
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer lang="en" />
    </div>
  );
};

export default PublicResource;