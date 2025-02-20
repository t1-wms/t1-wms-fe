import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import styles from "./BaseTable.module.css";
import { PageResponse } from "@/shared/model";
import { AxiosError } from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router";

interface BaseTableErrorProps<TData> {
  error: Error | null;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<PageResponse<TData>>>;
}

export const BaseTableError = <TData extends unknown>({
  error,
  refetch,
}: BaseTableErrorProps<TData>) => {
  const navigate = useNavigate();

  const handleRefetch = useCallback(() => {
    if (refetch) refetch();
    else {
      navigate(0);
    }
  }, [refetch, navigate]);

  return (
    <div className={styles["error-container"]}>
      <div className={`${styles["error-status"]} font-h1`}>
        {error ? `${(error as AxiosError).status}` : "ERROR"}
      </div>
      <p>데이터를 불러오는 데 실패했습니다</p>
      <button onClick={handleRefetch}>새로고침</button>
    </div>
  );
};
