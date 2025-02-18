import { PageContentBox, Spinner } from "@/shared";
import styles from "./SupplierPage.module.css";
import {
  SupplierTableWrapper,
  SupplierControlPanel,
  SupplierResponseDto,
  SupplierDrawer,
} from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export default function SupplierPage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] = useState<SupplierResponseDto | null>(
    null
  );

  const handleSearch = useCallback(
    (businessNumber: string) => {
      setColumnFilters([{ id: "businessNumber", value: businessNumber }]);
    },
    [setColumnFilters]
  );

  const handleChangeSelectedRow = useCallback(
    (row: SupplierResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
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
            onChangeSelectedRow={handleChangeSelectedRow}
          />
        </Suspense>
      </PageContentBox>
      {selectedRow && (
        <SupplierDrawer
          data={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
}
