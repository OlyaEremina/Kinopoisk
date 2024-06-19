import React from "react";
import styles from "./Pagination.module.css";
import { PaginationProps } from "./types";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { IoEllipsisHorizontal } from "react-icons/io5";

function Pagination({
  totalPages,
  handlePagination,
  currentPage,
}: PaginationProps): JSX.Element {
  const paginationNumber = [];

  if (currentPage <= 4 && currentPage !== 1) {
    for (let i = 2; i <= currentPage + 3; i += 1) {
      paginationNumber.push(i);
    }
  } else if (currentPage >= totalPages - 3 && currentPage !== totalPages) {
    for (let i = currentPage - 3; i < totalPages; i += 1) {
      paginationNumber.push(i);
    }
  } else {
    for (let i = currentPage - 3; i <= currentPage + 3; i += 1) {
      if (i > 1 && i < totalPages) {
        paginationNumber.push(i);
      }
    }
  }

  const filteredPageNumbers = paginationNumber.filter(
    (pageNumber) =>
      pageNumber >= Math.max(1, currentPage - 3) &&
      pageNumber <= Math.min(totalPages, currentPage + 3)
  );

  return (
    <div className={styles.pagination}>
      {currentPage !== 1 && (
        <button onClick={() => handlePagination(currentPage - 1)}>
          <SlArrowLeft />
        </button>
      )}
      {totalPages > 4 && (
        <button
          className={currentPage === 1 ? styles.active : ""}
          onClick={() => handlePagination(1)}
        >
          1
        </button>
      )}
      {currentPage > 5 && (
        <button disabled>
          <IoEllipsisHorizontal />
        </button>
      )}

      {filteredPageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={currentPage === pageNumber ? styles.active : ""}
          onClick={() => handlePagination(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      {currentPage < totalPages - 4 && (
        <button disabled>
          <IoEllipsisHorizontal />
        </button>
      )}
      <button
        className={currentPage === totalPages ? styles.active : ""}
        onClick={() => handlePagination(totalPages)}
      >
        {totalPages}
      </button>
      {currentPage !== totalPages && (
        <button onClick={() => handlePagination(currentPage + 1)}>
          <SlArrowRight />
        </button>
      )}
    </div>
  );
}

export default Pagination;
