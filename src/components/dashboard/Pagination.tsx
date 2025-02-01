interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / perPage);
  return (
    <div className="flex justify-end mt-4 pb-1">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`px-4 py-2 mx-1 rounded-lg ${
            currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
