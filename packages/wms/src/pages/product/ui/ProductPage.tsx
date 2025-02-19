import { PageContentBox, Spinner } from "@/shared";
import styles from "./ProductPage.module.css";
import { ProductTableWrapper, ProductControlPanel } from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export default function ProductPage() {
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
        <ProductControlPanel onSearch={handleSearch} />
      </PageContentBox>
      <PageContentBox>
        <Suspense fallback={<Spinner message="품목을 세는 중" />}>
          <ProductTableWrapper
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </Suspense>
      </PageContentBox>
    </div>
  );
}
