import { useEffect, useRef, useState } from 'react';
import { IResourceContent } from '../../types/store';
import {
  FaImage,
  FaVideo,
  FaMusic,
  FaFilePdf,
  FaFileAlt,
  FaExpand,
  FaCompress,
} from 'react-icons/fa';

interface ResourceContentViewerProps {
  content: IResourceContent;
}

const getYouTubeEmbedUrl = (value?: string) => {
  if (!value) return null;

  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/^www\./, '').toLowerCase();
    let videoId = '';

    if (hostname === 'youtu.be') {
      videoId = url.pathname.slice(1).split('/')[0];
    } else if (hostname === 'youtube.com' || hostname.endsWith('.youtube.com')) {
      if (url.pathname === '/watch') {
        videoId = url.searchParams.get('v') || '';
      } else if (url.pathname.startsWith('/shorts/')) {
        videoId = url.pathname.split('/')[2] || '';
      } else if (url.pathname.startsWith('/embed/')) {
        videoId = url.pathname.split('/')[2] || '';
      }
    }

    return /^[a-zA-Z0-9_-]{11}$/.test(videoId)
      ? `https://www.youtube.com/embed/${videoId}?rel=0`
      : null;
  } catch {
    return null;
  }
};

const FullscreenButton = ({
  isFullscreen,
  onToggle,
}: {
  isFullscreen: boolean;
  onToggle: () => void;
}) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
    title={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
    className="absolute right-3 top-3 z-10 rounded-md bg-black/70 p-2 text-white transition-colors hover:bg-black/90"
  >
    {isFullscreen ? <FaCompress className="h-3.5 w-3.5" /> : <FaExpand className="h-3.5 w-3.5" />}
  </button>
);

const MediaContainer = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await containerRef.current.requestFullscreen();
      }
    } catch {
      // Fullscreen can be unavailable in embedded or restricted browsers.
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${isFullscreen ? 'bg-black p-4' : ''} ${className}`}
    >
      <FullscreenButton
        isFullscreen={isFullscreen}
        onToggle={toggleFullscreen}
      />
      {children}
    </div>
  );
};

const ResourceContentViewer = ({ content }: ResourceContentViewerProps) => {
  const youtubeEmbedUrl = content.type === 'video'
    ? getYouTubeEmbedUrl(content.url)
    : null;

  switch (content.type) {
    case 'article':
      return (
        <div className="rich-text min-w-0 max-w-none">
          <div
            className="text-sm text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.htmlContent || '' }}
          />
        </div>
      );

    case 'video':
      return (
        <div className="space-y-3">
          {content.title && (
            <h4 className="text-sm font-semibold text-slate-900">{content.title}</h4>
          )}
          <MediaContainer className="w-full overflow-hidden rounded-xl bg-black">
            <div className="relative aspect-video w-full">
              {youtubeEmbedUrl ? (
                <iframe
                  src={youtubeEmbedUrl}
                  title={content.title || 'YouTube video'}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  src={content.url}
                  controls
                  className="absolute inset-0 h-full w-full object-contain"
                  controlsList="nodownload"
                  preload="metadata"
                />
              )}
            </div>
          </MediaContainer>
          {content.caption && (
            <p className="text-xs text-slate-500">{content.caption}</p>
          )}
          {content.duration && (
            <p className="text-xs text-slate-500">
              Duration: {Math.floor(content.duration / 60)}:{String(content.duration % 60).padStart(2, '0')}
            </p>
          )}
        </div>
      );

    case 'audio':
      return (
        <div className="space-y-3">
          {content.title && (
            <h4 className="text-sm font-semibold text-slate-900">{content.title}</h4>
          )}
          <MediaContainer className="rounded-xl border border-slate-200 bg-white p-4">
            <audio
              src={content.url}
              controls
              className="w-full"
              controlsList="nodownload"
              preload="metadata"
            />
          </MediaContainer>
          {content.caption && (
            <p className="text-xs text-slate-500">{content.caption}</p>
          )}
          {content.transcript && (
            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-medium text-slate-700">
                Show Transcript
              </summary>
              <div className="mt-2 rounded-lg border border-slate-200 p-3 text-sm text-slate-600 whitespace-pre-wrap break-words">
                {content.transcript}
              </div>
            </details>
          )}
        </div>
      );

    case 'image':
      return (
        <div className="space-y-3">
          {content.title && (
            <h4 className="text-sm font-semibold text-slate-900">{content.title}</h4>
          )}
          <MediaContainer className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <img
              src={content.url}
              alt={content.altText || content.title || 'Content image'}
              className="max-h-[70vh] w-full object-contain"
            />
          </MediaContainer>
          {content.caption && (
            <p className="text-xs text-slate-500">{content.caption}</p>
          )}
        </div>
      );

    case 'pdf':
      return (
        <div className="space-y-3">
          {content.title && (
            <h4 className="text-sm font-semibold text-slate-900">{content.title}</h4>
          )}
          <MediaContainer className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <iframe
              src={content.url}
              title={content.title || 'PDF document'}
              className="h-[min(70vh,720px)] w-full"
            />
            <div className="flex items-center justify-center border-t border-slate-200 bg-white p-3">
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                Open PDF in new tab
              </a>
            </div>
          </MediaContainer>
          {content.caption && (
            <p className="text-xs text-slate-500">{content.caption}</p>
          )}
        </div>
      );

    default:
      return (
        <div className="text-center text-sm text-slate-500 py-8">
          <p>Unsupported content type: {content.type}</p>
        </div>
      );
  }
};

export const getContentIcon = (type: string) => {
  switch (type) {
    case 'article':
      return <FaFileAlt className="w-5 h-5" />;
    case 'video':
      return <FaVideo className="w-5 h-5" />;
    case 'audio':
      return <FaMusic className="w-5 h-5" />;
    case 'image':
      return <FaImage className="w-5 h-5" />;
    case 'pdf':
      return <FaFilePdf className="w-5 h-5" />;
    default:
      return <FaFileAlt className="w-5 h-5" />;
  }
};

export default ResourceContentViewer;
