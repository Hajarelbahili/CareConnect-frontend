import { ChevronLeft, ChevronRight } from "lucide-react";

import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages
    ];
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="pagination__arrow"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={15} />
      </button>

      <div className="pagination__pages">
        {getPages().map((page, index) => {
          if (page === "...") {
            return (
              <span key={`dots-${index}`} className="pagination__dots">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              className={`pagination__page ${
                currentPage === page ? "pagination__page--active" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className="pagination__arrow"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={15} />
      </button>
    </nav>
  );
};

export default Pagination;
