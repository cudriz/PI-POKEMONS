import React from "react";
import styles from "./Pagination.module.css"; 

const Pagination = ({ cardsPerPage, totalCards, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {currentPage !== 1 && (
          <li className={styles.pageItem}>
            <button
              onClick={() => paginate(currentPage - 1)}
              className={styles.pageLink}
            >
              Anterior
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className={`${styles.pageItem} ${currentPage === number ? styles.active : ""}`}>
            <button
              onClick={() => paginate(number)}
              className={styles.pageLink}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage !== Math.ceil(totalCards / cardsPerPage) && (
          <li className={`${styles.pageItem} ${currentPage === Math.ceil(totalCards / cardsPerPage) ? styles.disabled : ""}`}>
            <button
              onClick={() => paginate(currentPage + 1)}
              className={styles.pageLink}
            >
              Siguiente
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
