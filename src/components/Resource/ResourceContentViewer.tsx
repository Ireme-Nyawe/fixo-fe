import { IResourceContent } from '../../../types/store';
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
        <div className="prose prose-sm max-w-none">
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.htmlContent || '' }}
          />
        </div>
      );

    case 'video':
      return (
        <div className="space-y-3">
          {content.title && (
            <h4 className="font-semibold text-gray-800">{content.title}</h4>
          )}
          <div className="relative w-full bg-black rounded-lg overflow-hidden"
            style={{ paddingBottom: '56.25%' }}>
            <video
              src={content.url}
              controls
              className="absolute top-0 left-0 w-full h-full"
              controlsList="nodownload"
            />
          </div>
          {content.caption && (
            <p className="text-sm text-gray-600 italic">{content.caption}</p>
          )}
          {content.duration && (
            <p className="text-xs text-gray-500">
              Duration: {Math.floor(content.duration / 60)}:{String(content.duration % 60).padStart(2, '0')}
            </p>
          )}
        </div>
      );

    case 'audio':
      return (
        <div className="space-y-3">
          {content.title && (
            <h4 className="font-semibold text-gray-800">{content.title}</h4>
          )}
          <div className="bg-gray-50 rounded-lg p-4">
            <audio
              src={content.url}
              controls
              className="w-full"
              controlsList="nodownload"
            />
          </div>
          {content.caption && (
            <p className="text-sm text-gray-600 italic">{content.caption}</p>
          )}
          {content.transcript && (
            <details className="mt-3">
              <summary className="cursor-pointer font-medium text-gray-700">
                Show Transcript
              </summary>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
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
            <h4 className="font-semibold text-gray-800">{content.title}</h4>
          )}
          <div className="rounded-lg overflow-hidden bg-gray-100">
            <img
              src={content.url}
              alt={content.altText || content.title || 'Content image'}
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
          {content.caption && (
            <p className="text-sm text-gray-600 italic">{content.caption}</p>
          )}
        </div>
      );

    case 'pdf':
      return (
        <div className="space-y-3">
          {content.title && (
            <h4 className="font-semibold text-gray-800">{content.title}</h4>
          )}
          <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center gap-4">
            <FaFilePdf className="w-12 h-12 text-red-500" />
            <div className="text-center">
              <p className="font-medium text-gray-800">PDF Document</p>
              <p className="text-sm text-gray-600 mt-1">
                {content.fileSize &&
                  `${(content.fileSize / 1024 / 1024).toFixed(2)} MB`}
              </p>
            </div>
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
            >
              Open PDF
            </a>
          </div>
          {content.caption && (
            <p className="text-sm text-gray-600 italic">{content.caption}</p>
          )}
        </div>
      );

    default:
      return (
        <div className="text-center text-gray-500 py-8">
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
