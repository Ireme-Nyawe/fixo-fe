import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Toaster } from 'sonner';
import { FaArrowLeft, FaBook, FaRegClock, FaLayerGroup } from 'react-icons/fa';
import { IResource } from '../types/store';
import Header from '../components/clients/Header';
import Footer from '../components/clients/Footer';
import SEO from '../components/SEO';
import ResourceContentViewer, {
  getContentIcon,
} from '../components/Resource/ResourceContentViewer';
import { getResourceFull } from '../state/features/resource/resourceService';

const PublicResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<IResource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const lang = localStorage.getItem('lang') || 'en';
  const t = (en: string, rw: string) => (lang === 'en' ? en : rw);

  useEffect(() => {
    if (!id) return;

    const fetchResource = async () => {
      setIsLoading(true);
      setNotFound(false);
      try {
        const response = await getResourceFull(id);
        if (response?.data) {
          setResource(response.data);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResource();
    window.scrollTo(0, 0);
  }, [id]);

  const sortedContents = useMemo(
    () =>
      [...(resource?.contents || [])].sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      ),
    [resource]
  );

  const backLink = (
    <Link
      to="/resources"
      className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
    >
      <FaArrowLeft className="w-3 h-3" />
      {t('All resources', 'Amasomo yose')}
    </Link>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEO
        title={resource?.title || 'Resource'}
        description={
          resource?.description?.slice(0, 160) ||
          'Learning resources from Fixo.'
        }
        ogImage={resource?.coverImage || '/logo.png'}
        ogType="article"
      />
      <Toaster richColors position="top-center" />
      <Header />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-6">{backLink}</div>

          {isLoading ? (
            <div className="space-y-5">
              <div className="h-56 rounded-xl bg-slate-100 animate-pulse" />
              <div className="h-5 w-2/3 rounded bg-slate-100 animate-pulse" />
              <div className="h-3 w-full rounded bg-slate-100 animate-pulse" />
              <div className="h-64 rounded-xl bg-slate-100 animate-pulse" />
            </div>
          ) : notFound || !resource ? (
            <div className="text-center py-16 rounded-xl border border-dashed border-slate-300">
              <FaBook className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-medium text-slate-800">
                {t('Resource not found', 'Isomo ntiryabonetse')}
              </p>
              <Link
                to="/resources"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              >
                <FaArrowLeft className="w-3 h-3" />
                {t('Back to resources', 'Subira ku masomo')}
              </Link>
            </div>
          ) : (
            <article>
              {resource.coverImage && (
                <img
                  src={resource.coverImage}
                  alt=""
                  className="w-full h-56 sm:h-72 object-cover rounded-xl border border-slate-200"
                />
              )}

              <header className={resource.coverImage ? 'mt-6' : ''}>
                {resource.category && (
                  <p className="text-xs text-slate-500 mb-1.5">
                    {resource.category}
                  </p>
                )}
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 leading-tight">
                  {resource.title}
                </h1>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {resource.description}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
                  {resource.createdAt && (
                    <span className="flex items-center gap-1.5">
                      <FaRegClock className="w-3 h-3 text-slate-400" />
                      {new Date(resource.createdAt).toLocaleDateString(
                        undefined,
                        { year: 'numeric', month: 'short', day: 'numeric' }
                      )}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <FaLayerGroup className="w-3 h-3 text-slate-400" />
                    {sortedContents.length}{' '}
                    {t('content items', 'ibice by’isomo')}
                  </span>
                  {resource.tags && resource.tags.length > 0 && (
                    <span className="flex flex-wrap gap-1.5">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full border border-slate-200 text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
              </header>

              {sortedContents.length > 0 ? (
                <div className="mt-8 space-y-8">
                  {sortedContents.map((content, index) => (
                    <section
                      key={content._id}
                      id={`content-${index + 1}`}
                      className="min-w-0 scroll-mt-24"
                    >
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-primary [&>svg]:w-3.5 [&>svg]:h-3.5">
                          {getContentIcon(content.type)}
                        </span>
                        <h2 className="text-base font-semibold text-slate-900">
                          {content.title || `${content.type} ${index + 1}`}
                        </h2>
                        <span className="text-xs text-slate-400 capitalize">
                          {content.type}
                        </span>
                      </div>

                      <div className="min-w-0 overflow-x-auto rounded-xl border border-slate-200 p-6">
                        <ResourceContentViewer content={content} />
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                  {t(
                    'No content available for this resource yet.',
                    'Nta bice by’isomo birahaboneka.'
                  )}
                </div>
              )}

              <div className="mt-10 pt-6 border-t border-slate-100">
                {backLink}
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default PublicResourceDetail;
