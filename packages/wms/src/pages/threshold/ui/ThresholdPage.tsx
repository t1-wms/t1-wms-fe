import { PageContentBox, Spinner } from "@/shared";
import styles from "./ThresholdPage.module.css";
import { ThresholdTableWrapper, ThresholdControlPanel } from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export function ThresholdPage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleSearch = useCallback(
    (productCode: string) => {
      setColumnFilters([{ id: "productCode", value: productCode }]);
    },
    [setColumnFilters]
  );

  return (
    <div className={styles.container}>
      <PageContentBox>
        <ThresholdControlPanel onSearch={handleSearch} />
      </PageContentBox>
      <PageContentBox>
        <Suspense fallback={<Spinner message="품목을 세는 중" />}>
          <ThresholdTableWrapper
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </Suspense>
      </PageContentBox>
    </div>
  );
}
