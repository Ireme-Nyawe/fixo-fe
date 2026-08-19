import { IResourceContent } from '../../types/store';
import {
  FaImage,
  FaVideo,
  FaMusic,
  FaFilePdf,
  FaFileAlt,
} from 'react-icons/fa';

interface ResourceContentViewerProps {
  content: IResourceContent;
}

const ResourceContentViewer = ({ content }: ResourceContentViewerProps) => {
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
          <div className="relative w-full bg-black rounded-xl overflow-hidden"
            style={{ paddingBottom: '56.25%' }}>
            <video
              src={content.url}
              controls
              className="absolute top-0 left-0 w-full h-full"
              controlsList="nodownload"
            />
          </div>
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
          <div className="rounded-xl border border-slate-200 p-4">
            <audio
              src={content.url}
              controls
              className="w-full"
              controlsList="nodownload"
            />
          </div>
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
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
            <img
              src={content.url}
              alt={content.altText || content.title || 'Content image'}
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>
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
          <div className="rounded-xl border border-slate-200 p-6 flex flex-col items-center gap-3">
            <FaFilePdf className="w-8 h-8 text-slate-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-slate-900">PDF Document</p>
              <p className="text-xs text-slate-500 mt-1">
                {content.fileSize &&
                  `${(content.fileSize / 1024 / 1024).toFixed(2)} MB`}
              </p>
            </div>
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              Open PDF
            </a>
          </div>
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
