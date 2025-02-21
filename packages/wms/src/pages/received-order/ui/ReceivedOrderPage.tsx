import {
  ReceivedOrderControlPanel,
  ReceivedOrderDrawer,
  ReceivedOrderTable,
  useReceivedOrderTable,
} from "@/features";
import { PageContentBox } from "@/shared";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import styles from "./ReceivedOrderPage.module.css";

export default function ReceivedOrderPage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleSearch = useCallback(
    (number: string, startDate: string, endDate: string) => {
      setColumnFilters([
        { id: "orderDate", value: `${startDate},${endDate}` },
        { id: "orderNumber", value: number },
      ]);
    },
    [setColumnFilters]
  );

  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
    isFetched,
    isPending,
    isError,
    error,
    refetch,
  } = useReceivedOrderTable(columnFilters);

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
        <ReceivedOrderControlPanel onSearch={handleSearch} />
      </PageContentBox>
      <PageContentBox>
        <ReceivedOrderTable
          tableParams={{
            pagination,
            setPagination,
            sorting,
            setSorting,
            rowSelection,
            setRowSelection,
            data,
            isPending,
            isError,
            error,
            refetch,
          }}
        />
      </PageContentBox>
      {isFetched && selectedRow && (
        <ReceivedOrderDrawer
          data={selectedRow}
          onClose={() => setRowSelection({})}
        />
      )}
    </div>
  );
}
