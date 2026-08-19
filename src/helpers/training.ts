export const formatStartTime = (value?: string | Date) => {
  if (!value) return '—';
  const date = new Date(value);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

export const isUpcoming = (value?: string | Date) => {
  if (!value) return false;
  const date = new Date(value);
  return !isNaN(date.getTime()) && date.getTime() >= Date.now();
};

export const stripHtml = (html?: string) => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
};

export const isEmptyRichText = (html?: string) => stripHtml(html).length === 0;

export const parseTrainingError = (error: unknown): string[] => {
  if (!error) return ['An unexpected error occurred'];

  let message: unknown;

  if (typeof error === 'string') {
    message = error;
  } else if (typeof error === 'object') {
    const candidate = error as {
      message?: unknown;
      response?: { data?: { message?: unknown } };
    };
    message = candidate.message ?? candidate.response?.data?.message;
  }

  if (typeof message === 'string' && message.trim()) {
    return message.includes(',')
      ? message
          .split(',')
          .map((part) => part.trim())
          .filter(Boolean)
      : [message];
  }

  return ['An unexpected error occurred'];
};

export const buildDirectionsUrl = (
  location?: string,
  directions?: string
): string => {
  const raw = (directions || '').trim();

  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^www\./i.test(raw)) return `https://${raw}`;

  const query = [location, raw].filter(Boolean).join(', ').trim();
  if (!query) return '';

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
};
