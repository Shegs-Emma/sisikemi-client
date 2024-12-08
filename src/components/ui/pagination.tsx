// components/Pagination.js
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { FC } from "react";

interface IProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MyPagination: FC<IProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;
    const halfRange = Math.floor(maxPageNumbersToShow / 2);

    let startPage = Math.max(currentPage - halfRange, 1);
    let endPage = Math.min(currentPage + halfRange, totalPages);

    if (currentPage <= halfRange) {
      endPage = Math.min(maxPageNumbersToShow, totalPages);
    }
    if (currentPage + halfRange >= totalPages) {
      startPage = Math.max(totalPages - maxPageNumbersToShow + 1, 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === 1
              ? "bg-grocedy_primary_color text-black"
              : "bg-gray-200 text-black"
          }`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="start-ellipsis" className="px-4 py-2 mx-1">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === i
              ? "bg-grocedy_primary_color text-black"
              : "bg-gray-200 text-black"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="end-ellipsis" className="px-4 py-2 mx-1 text-black">
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === totalPages
              ? "bg-grocedy_primary_color text-black"
              : "bg-gray-200 text-black"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex flex-row px-4 py-2 bg-grocedy_primary_color text-black rounded ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-grocedy_primary_color"
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>
      {/* <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span> */}
      {renderPageNumbers()}
      <button
        className={`flex flex-row px-4 py-2 bg-grocedy_primary_color text-black rounded ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-grocedy_primary_color"
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default MyPagination;
