import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'sonner';
import { FaSearch, FaTimes, FaBook, FaRegClock } from 'react-icons/fa';
import { IResource } from '../types/store';
import Header from '../components/clients/Header';
import Footer from '../components/clients/Footer';
import SEO from '../components/SEO';
import { getAllResources } from '../state/features/resource/resourceService';

const PublicResource = () => {
  const [resources, setResources] = useState<IResource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const lang = localStorage.getItem('lang') || 'en';
  const t = (en: string, rw: string) => (lang === 'en' ? en : rw);

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      try {
        const response = await getAllResources();
        const list = Array.isArray(response?.data) ? response.data : [];
        setResources(
          list.filter((item: IResource) => item.status === 'published')
        );
      } catch {
        setResources([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          resources
            .map((item) => item.category)
            .filter((value): value is string => !!value)
        )
      ),
    [resources]
  );

  const visibleResources = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    return resources
      .filter((item) => (category ? item.category === category : true))
      .filter((item) =>
        keyword
          ? [item.title, item.description, item.category, ...(item.tags || [])]
            .filter(Boolean)
            .some((field) => String(field).toLowerCase().includes(keyword))
          : true
      );
  }, [resources, searchQuery, category]);

  const hasFilters = !!searchQuery.trim() || !!category;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEO
        title="Resources"
        description="Learning resources from Fixo — articles, videos and guides to build your digital skills."
      />
      <Toaster richColors position="top-center" />
      <Header />

      <main className="flex-1">
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
              {t('Learn at your pace', 'Wiga uko ubishaka')}
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              {t('Resources', 'Amasomo')}
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
              {t(
                'Articles, videos and guides put together by our technicians to help you build digital skills.',
                'Inyandiko, amashusho n’amabwiriza byateguwe n’abatekinisiye bacu ngo bigufashe kwiga ikoranabuhanga.'
              )}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="relative mb-5">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={t(
                'Search by title, category or tag',
                'Shakisha ku mutwe, icyiciro cyangwa tagi'
              )}
              className="w-full pl-9 pr-9 py-2.5 text-sm rounded-lg border border-slate-300 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            )}
          </div>

          {categories.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
              <button
                type="button"
                onClick={() => setCategory(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${category === null
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
              >
                {t('All categories', 'Ibyiciro byose')}
              </button>
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${category === item
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 mb-4 text-xs text-slate-500">
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setCategory(null);
                }}
                className="text-slate-500 hover:text-slate-800 underline underline-offset-2"
              >
                {t('Clear filters', 'Siba ibyahiswemo')}
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 overflow-hidden animate-pulse"
                >
                  <div className="h-40 bg-slate-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-20 bg-slate-100 rounded" />
                    <div className="h-4 w-3/4 bg-slate-100 rounded" />
                    <div className="h-3 w-full bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : visibleResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleResources.map((resource) => (
                <Link
                  key={resource._id}
                  to={`/resources/${resource._id}`}
                  className="group flex flex-col rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors"
                >
                  <div className="h-40 bg-slate-100 overflow-hidden">
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
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    {resource.category && (
                      <p className="text-xs text-slate-500 mb-1.5 truncate">
                        {resource.category}
                      </p>
                    )}
                    <h2 className="text-base font-semibold text-slate-900 leading-snug line-clamp-2">
                      {resource.title}
                    </h2>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      {resource.createdAt ? (
                        <span className="flex items-center gap-1.5">
                          <FaRegClock className="w-3 h-3 text-slate-400" />
                          {new Date(resource.createdAt).toLocaleDateString(
                            undefined,
                            { year: 'numeric', month: 'short', day: 'numeric' }
                          )}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="font-medium text-primary group-hover:underline">
                        {t('Read', 'Soma')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-xl border border-dashed border-slate-300">
              <FaBook className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-medium text-slate-800">
                {hasFilters
                  ? t('No resources match your filters', 'Nta somo ribonetse')
                  : t('No resources published yet', 'Nta masomo arasohoka')}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {hasFilters
                  ? t('Try another search or filter', 'Gerageza ubundi bushakashatsi')
                  : t('Check back soon', 'Garuka vuba')}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default PublicResource;
