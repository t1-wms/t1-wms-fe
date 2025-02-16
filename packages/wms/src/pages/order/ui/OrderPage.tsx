import { PageContentBox, Spinner } from "@/shared";
import styles from "./OrderPage.module.css";
import {
  OrderDrawer,
  OrderResponseDto,
  OrderTableWrapper,
  OrderControlPanel,
} from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export default function OrderPage() {
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

  const handleClickCreate = useCallback(() => {}, []);

  const handleChangeSelectedRow = useCallback(
    (row: OrderResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

  return (
    <div className={styles.container}>
      <PageContentBox>
        <OrderControlPanel
          onSearch={handleSearch}
          onClickCreate={handleClickCreate}
        />
      </PageContentBox>
      <PageContentBox>
        <Suspense fallback={<Spinner message="발주 품목을 세는 중" />}>
          <OrderTableWrapper
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            onChangeSelectedRow={handleChangeSelectedRow}
          />
        </Suspense>
      </PageContentBox>
      {selectedRow && (
        <OrderDrawer data={selectedRow} onClose={() => setSelectedRow(null)} />
      )}
    </div>
  );
}
