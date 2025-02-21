import {
  InboundControlPanel,
  InboundScheduleDrawer,
  InboundScheduleTable,
  useInboundScheduleTable,
} from "@/features";
import { PageContentBox } from "@/shared";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import styles from "./InboundSchedulePage.module.css";

export const InboundSchedulePage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleSearch = useCallback(
    (number: string, startDate: string, endDate: string) => {
      setColumnFilters([
        { id: "scheduleDate", value: `${startDate},${endDate}` },
        { id: "scheduleNumber", value: number },
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
  } = useInboundScheduleTable(columnFilters);

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
        <InboundControlPanel
          label="입하예정"
          onSearch={handleSearch}
          onClickCreate={() => {}}
        />
      </PageContentBox>
      <PageContentBox>
        <InboundScheduleTable
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
        <InboundScheduleDrawer
          data={selectedRow}
          onClose={() => setRowSelection({})}
        />
      )}
    </div>
  );
};
