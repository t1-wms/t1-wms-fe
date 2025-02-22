import ErrorImg from "@assets/error.svg?react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import styles from "./BaseTable.module.css";

interface BaseTableErrorProps<QueryResult> {
  error: Error | null;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<QueryResult>>;
}

export const BaseTableError = <QueryResult extends unknown>({
  refetch,
}: BaseTableErrorProps<QueryResult>) => {
  const navigate = useNavigate();

  const handleRefetch = useCallback(() => {
    if (refetch) refetch();
    else {
      navigate(0);
    }
  }, [refetch, navigate]);

  return (
    <div className={styles["error-container"]}>
      <div className={styles.img}>
        <ErrorImg />
      </div>
      <p className="font-r-md">데이터를 불러오는 데 실패했습니다</p>
      <button onClick={handleRefetch} className="font-b-md shadow-md">
        재시도
      </button>
    </div>
  );
};
