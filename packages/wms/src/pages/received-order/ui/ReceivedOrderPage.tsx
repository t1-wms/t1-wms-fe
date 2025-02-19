import { PageContentBox, Spinner } from "@/shared";
import styles from "./ReceivedOrderPage.module.css";
import {
  ReceivedOrderDrawer,
  OrderResponseDto,
  ReceivedOrderControlPanel,
  ReceivedOrderTableWrapper,
} from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export default function ReceivedOrderPage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] = useState<OrderResponseDto | null>(null);

  const handleSearch = useCallback(
    (number: string, startDate: string, endDate: string) => {
      setColumnFilters([
        { id: "orderDate", value: `${startDate},${endDate}` },
        { id: "orderNumber", value: number },
      ]);
    },
    [setColumnFilters]
  );

  const handleChangeSelectedRow = useCallback(
    (row: OrderResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

  return (
    <div className={styles.container}>
      <PageContentBox>
        <ReceivedOrderControlPanel onSearch={handleSearch} />
      </PageContentBox>
      <PageContentBox>
        <Suspense fallback={<Spinner message="발주 품목을 세는 중" />}>
          <ReceivedOrderTableWrapper
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            onChangeSelectedRow={handleChangeSelectedRow}
          />
        </Suspense>
      </PageContentBox>
      {selectedRow && (
        <ReceivedOrderDrawer
          data={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
}
