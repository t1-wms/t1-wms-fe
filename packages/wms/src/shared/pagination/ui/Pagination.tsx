import styles from "./Pagination.module.css";
import { memo, useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  size: number;
  maxPage: number;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickPage: (page: number) => void;
}

export const Pagination = memo(
  ({
    currentPage,
    size,
    maxPage,
    onClickNext,
    onClickPrev,
    onClickPage,
  }: PaginationProps) => {
    const hasPrev = useMemo(() => {
      return currentPage > 1;
    }, [currentPage]);

    const hasNext = useMemo(() => {
      return currentPage < maxPage;
    }, [currentPage, maxPage]);

    const pages = useMemo(() => {
      const result = [];
      for (let i = currentPage - size; i <= currentPage + size; i++) {
        if (i < 1 || i > maxPage) continue;
        result.push(i);
      }

      return result;
    }, [currentPage, size, maxPage]);

    return (
      <div className={styles.container}>
        <div className={`${styles.box} font-r-sm`}>
          {hasPrev && <button onClick={onClickPrev}>{"<"}</button>}
          {pages.map((page) => (
            <button
              className={currentPage === page ? styles.current : ""}
              key={page}
              onClick={() => onClickPage(page)}
            >
              {page}
            </button>
          ))}
          {hasNext && <button onClick={onClickNext}>{">"}</button>}
        </div>
      </div>
    );
  }
);
