interface SkeletonLoaderProps {
  rows: number;
  cols: number;
}

const SkeletonLoader = ({ rows, cols }: SkeletonLoaderProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse">
          {Array.from({ length: cols - 1 }).map((__, colIndex) => (
            <td key={colIndex} className="px-6 py-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </td>
          ))}
          <td className="px-6 py-4 text-right">
            <div className="h-4 bg-gray-200 rounded w-16 inline-block mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-16 inline-block"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default SkeletonLoader;
