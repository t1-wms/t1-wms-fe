import { PageContentBox, Spinner } from "@/shared";
import styles from "./ThresholdPage.module.css";
import {
  ProductThresholdDto,
  ThresholdControlPanel,
  ThresholdDrawer,
  ThresholdTable,
} from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export function ThresholdPage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] = useState<ProductThresholdDto | null>(
    null
  );

  const handleSearch = useCallback(
    (productCode: string) => {
      setColumnFilters([{ id: "productCode", value: productCode }]);
    },
    [setColumnFilters]
  );

  const handleChangeSelectedRow = useCallback(
    (row: ProductThresholdDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

  return (
    <div className={styles.container}>
      <PageContentBox>
        <ThresholdControlPanel onSearch={handleSearch} />
      </PageContentBox>
      <PageContentBox>
        <Suspense fallback={<Spinner message="품목을 가져오는 중" />}>
          <ThresholdTable
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            onChangeSelectedRow={handleChangeSelectedRow}
          />
        </Suspense>
      </PageContentBox>
      {selectedRow && (
        <ThresholdDrawer
          data={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
}
