import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page: number) => {
      if (page < 1 || page > totalPages) return;
      onPageChange(page);
    };
  
    // Generate an array of page numbers for display, with ellipses if necessary
    let pages: number[] = [];
    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, 5];
      } else if (currentPage >= totalPages - 2) {
        pages = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
      }
    }
  
    return (
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
  
        {pages[0] > 1 && (
          <>
            <button onClick={() => handlePageChange(1)} className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-200">
              1
            </button>
            {pages[0] > 2 && <span className="px-4 py-2 text-gray-700">...</span>}
          </>
        )}
  
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg ${currentPage === page ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
          >
            {page}
          </button>
        ))}
  
        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && <span className="px-4 py-2 text-gray-700">...</span>}
            <button onClick={() => handlePageChange(totalPages)} className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-200">
              {totalPages}
            </button>
          </>
        )}
  
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };
  