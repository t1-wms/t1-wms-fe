import {
  OrderControlPanel,
  OrderDrawer,
  OrderTable,
  SupplierListDrawer,
  useOrderTable,
} from "@/features";
import { PageContentBox } from "@/shared";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import styles from "./OrderPage.module.css";

export default function OrderPage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

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

  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
    isFetched,
    isLoading,
    isPending,
    isError,
    error,
    refetch,
  } = useOrderTable(columnFilters);

  const selectedRow = useMemo(() => {
    const rowId =
      Object.keys(rowSelection).length > 0
        ? parseInt(Object.keys(rowSelection)[0])
        : null;

    return rowId || rowId === 0 ? data!.content[rowId] : null;
  }, [rowSelection, data]);

  return (
    <div className={styles.container}>
      <PageContentBox>
        <OrderControlPanel
          onSearch={handleSearch}
          onClickCreate={handleClickCreate}
          isLoading={isLoading}
          isError={isError}
        />
      </PageContentBox>
      <PageContentBox>
        <OrderTable
          tableParams={{
            pagination,
            setPagination,
            sorting,
            setSorting,
            rowSelection,
            setRowSelection,
            data,
            isLoading,
            isPending,
            isError,
            error,
            refetch,
          }}
        />
      </PageContentBox>
      {isDrawerOpen && (
        <SupplierListDrawer onClose={() => setDrawerOpen(false)} />
      )}
      {isFetched && selectedRow && (
        <OrderDrawer data={selectedRow} onClose={() => setRowSelection({})} />
      )}
    </div>
  );
}
