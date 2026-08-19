import { useCallback, useEffect, useRef, useState } from 'react';
import { toast, Toaster } from 'sonner';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaRegClock,
  FaDirections,
  FaChalkboardTeacher,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from 'react-icons/fa';
import { IPagination, ITraining } from '../types/store';
import Header from '../components/clients/Header';
import Footer from '../components/clients/Footer';
import SEO from '../components/SEO';
import {
  getAllTrainings,
  getTrainingCategories,
} from '../state/features/training/trainingService';
import {
  buildDirectionsUrl,
  formatStartTime,
  isUpcoming,
  parseTrainingError,
  stripHtml,
} from '../helpers/training';

type Timeframe = 'upcoming' | 'past' | 'all';

const PAGE_SIZE = 9;

const PublicTrainings = () => {
  const [trainings, setTrainings] = useState<ITraining[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [pagination, setPagination] = useState<IPagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<Timeframe>('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<ITraining | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const lang = localStorage.getItem('lang') || 'en';
  const t = (en: string, rw: string) => (lang === 'en' ? en : rw);

  useEffect(() => {
    const handle = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(handle);
  }, [searchInput]);

  useEffect(() => {
    getTrainingCategories()
      .then((response) => {
        const list = response?.data;
        if (Array.isArray(list)) setCategories(list);
      })
      .catch(() => setCategories([]));
  }, []);

  const fetchTrainings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllTrainings({
        page,
        limit: PAGE_SIZE,
        search: search || undefined,
        category: category || undefined,
        timeframe,
        sort: timeframe === 'past' ? 'desc' : 'asc',
      });
      setTrainings(Array.isArray(response?.data) ? response.data : []);
      setPagination(response?.pagination || null);
    } catch (error) {
      parseTrainingError(error).forEach((message) => toast.error(message));
      setTrainings([]);
      setPagination(null);
    } finally {
      setIsLoading(false);
    }
  }, [page, search, category, timeframe]);

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  const goToPage = (next: number) => {
    setPage(next);
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const timeframes: { key: Timeframe; label: string }[] = [
    { key: 'all', label: t('All', 'Byose') },
    { key: 'upcoming', label: t('Upcoming', 'Bizaza') },
    { key: 'past', label: t('Past', 'Byarangiye') },
  ];

  const hasFilters = !!search || !!category || timeframe !== 'all';

  const clearFilters = () => {
    setSearchInput('');
    setSearch('');
    setCategory(null);
    setTimeframe('all');
    setPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEO
        title="Trainings"
        description="Join Fixo hands-on trainings and skill up with our technicians."
      />
      <Toaster richColors position="top-center" />
      <Header />

      <main className="flex-1">
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
              {t('Learn with us', 'Wige natwe')}
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              {t('Trainings', 'Amahugurwa')}
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
              {t(
                'Hands-on sessions run by our technicians. Pick a session, note the venue, and show up.',
                'Amahugurwa atangwa n’abatekinisiye bacu. Hitamo isomo, umenye aho ribera, uze.'
              )}
            </p>
          </div>
        </section>

        <div ref={listRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-5">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder={t(
                  'Search by title, category or location',
                  'Shakisha ku mutwe, icyiciro cyangwa aho ribera'
                )}
                className="w-full pl-9 pr-9 py-2.5 text-sm rounded-lg border border-slate-300 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5 self-start">
              {timeframes.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setTimeframe(item.key);
                    setPage(1);
                  }}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    timeframe === item.key
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {categories.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
              <button
                type="button"
                onClick={() => {
                  setCategory(null);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
                  category === null
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
                  onClick={() => {
                    setCategory(item);
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
                    category === item
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
            <p>
              {pagination
                ? t(
                    `${pagination.total} training${
                      pagination.total === 1 ? '' : 's'
                    } found`,
                    `Amahugurwa ${pagination.total} yabonetse`
                  )
                : ' '}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
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
                    <div className="h-3 w-2/3 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : trainings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {trainings.map((training) => (
                <article
                  key={training._id}
                  className="group flex flex-col rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors"
                >
                  <div className="relative h-40 bg-slate-100 overflow-hidden">
                    {training.coverImage ? (
                      <img
                        src={training.coverImage}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaChalkboardTeacher className="w-8 h-8 text-slate-300" />
                      </div>
                    )}
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                        isUpcoming(training.startTime)
                          ? 'bg-white text-primary border-primary/20'
                          : 'bg-white text-slate-500 border-slate-200'
                      }`}
                    >
                      {isUpcoming(training.startTime)
                        ? t('Upcoming', 'Bizaza')
                        : t('Past', 'Byarangiye')}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <p className="text-xs text-slate-500 mb-1.5 truncate">
                      {training.category}
                    </p>
                    <h2 className="text-base font-semibold text-slate-900 leading-snug line-clamp-2">
                      {training.title}
                    </h2>

                    {training.description && (
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {stripHtml(training.description)}
                      </p>
                    )}

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                      <p className="flex items-center gap-2">
                        <FaRegClock className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        {formatStartTime(training.startTime)}
                      </p>
                      <a
                        href={buildDirectionsUrl(
                          training.location,
                          training.directions
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={t('Open directions', 'Fungura aho ribera')}
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                      >
                        <FaMapMarkerAlt className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate underline underline-offset-2 decoration-slate-300">
                          {training.location}
                        </span>
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelected(training)}
                      className="mt-4 w-full rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {t('View details', 'Reba byinshi')}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-xl border border-dashed border-slate-300">
              <FaChalkboardTeacher className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-medium text-slate-800">
                {hasFilters
                  ? t('No trainings match your filters', 'Nta mahugurwa abonetse')
                  : t('No trainings scheduled yet', 'Nta mahugurwa ateganyijwe')}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {hasFilters
                  ? t('Try another search or filter', 'Gerageza ubundi bushakashatsi')
                  : t('Check back soon for new sessions', 'Garuka vuba urebe amasomo mashya')}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  {t('Clear filters', 'Siba ibyahiswemo')}
                </button>
              )}
            </div>
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={!pagination.hasPreviousPage}
                onClick={() => goToPage(page - 1)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <FaChevronLeft className="w-3 h-3" />
                {t('Previous', 'Ibanza')}
              </button>

              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: pagination.totalPages }, (_, index) => index + 1)
                  .filter(
                    (number) =>
                      number === 1 ||
                      number === pagination.totalPages ||
                      Math.abs(number - page) <= 1
                  )
                  .map((number, index, list) => (
                    <span key={number} className="flex items-center gap-1">
                      {index > 0 && number - list[index - 1] > 1 && (
                        <span className="px-1 text-slate-400">…</span>
                      )}
                      <button
                        type="button"
                        onClick={() => goToPage(number)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          number === page
                            ? 'bg-primary text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {number}
                      </button>
                    </span>
                  ))}
              </div>

              <span className="sm:hidden text-sm text-slate-500">
                {page} / {pagination.totalPages}
              </span>

              <button
                type="button"
                disabled={!pagination.hasNextPage}
                onClick={() => goToPage(page + 1)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {t('Next', 'Ibikurikira')}
                <FaChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </main>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/40 p-0 sm:p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {selected.coverImage && (
              <img
                src={selected.coverImage}
                alt=""
                className="w-full h-52 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">
                    {selected.category}
                  </p>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {selected.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="p-2 text-slate-400 hover:text-slate-700"
                >
                  <FaTimes />
                </button>
              </div>

              <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-200 p-3">
                  <dt className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <FaRegClock className="w-3 h-3" />
                    {t('Starts', 'Bitangira')}
                  </dt>
                  <dd className="text-sm text-slate-900">
                    {formatStartTime(selected.startTime)}
                  </dd>
                </div>
                <a
                  href={buildDirectionsUrl(
                    selected.location,
                    selected.directions
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-200 p-3 hover:border-primary transition-colors"
                >
                  <dt className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    {t('Location', 'Aho ribera')}
                  </dt>
                  <dd className="text-sm text-slate-900 underline underline-offset-2 decoration-slate-300">
                    {selected.location}
                  </dd>
                </a>
                <div className="sm:col-span-2 rounded-lg border border-slate-200 p-3">
                  <dt className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <FaDirections className="w-3 h-3" />
                    {t('Directions', 'Uko uhagera')}
                  </dt>
                  <dd className="text-sm text-slate-900">
                    {selected.directions}
                  </dd>
                  <a
                    href={buildDirectionsUrl(
                      selected.location,
                      selected.directions
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <FaDirections className="w-3 h-3" />
                    {t('Open in maps', 'Fungura muri maps')}
                  </a>
                </div>
              </dl>

              {selected.description && (
                <div
                  className="rich-text mt-5 text-sm text-slate-700"
                  dangerouslySetInnerHTML={{ __html: selected.description }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <Footer lang={lang} />
    </div>
  );
};

export default PublicTrainings;
