import { PageContentBox, Spinner } from "@/shared";
import styles from "./ProductPage.module.css";
import { SupplierTableWrapper, SupplierControlPanel } from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export default function SupplierPage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleSearch = useCallback(
    (businessNumber: string) => {
      setColumnFilters([{ id: "businessNumber", value: businessNumber }]);
    },
    [setColumnFilters]
  );

  return (
    <div className={styles.container}>
      <PageContentBox>
        <SupplierControlPanel onSearch={handleSearch} />
      </PageContentBox>
      <PageContentBox>
        <Suspense fallback={<Spinner message="납품업체를 세는 중" />}>
          <SupplierTableWrapper
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </Suspense>
      </PageContentBox>
    </div>
  );
}
