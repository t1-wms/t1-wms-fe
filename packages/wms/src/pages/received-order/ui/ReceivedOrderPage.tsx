import { PageContentBox, Spinner } from "@/shared";
import styles from "./ReceivedOrderPage.module.css";
import {
  OrderDrawer,
  OrderResponseDto,
  OrderTableWrapper,
  OrderControlPanel,
} from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { SupplierListDrawer } from "@/features/order/ui/supplier-list-drawer";

export default function ReceivedOrderPage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
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

  const handleClickCreate = useCallback(() => {
    setDrawerOpen(true);
  }, [setDrawerOpen]);

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
      {isDrawerOpen && (
        <SupplierListDrawer onClose={() => setDrawerOpen(false)} />
      )}
      {selectedRow && (
        <OrderDrawer data={selectedRow} onClose={() => setSelectedRow(null)} />
      )}
    </div>
  );
}
