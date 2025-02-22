import {
  InboundCheckDrawer,
  InboundCheckTable,
  InboundControlPanel,
  InboundScheduleListDrawer,
  useInboundCheckTable,
} from "@/features";
import { PageContentBox } from "@/shared";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import styles from "./InboundCheckPage.module.css";

export const InboundCheckPage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = useCallback(
    (number: string, startDate: string, endDate: string) => {
      setColumnFilters([
        { id: "checkDate", value: `${startDate},${endDate}` },
        { id: "checkNumber", value: number },
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
  } = useInboundCheckTable(columnFilters);

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
          label="입하검사"
          onSearch={handleSearch}
          onClickCreate={handleClickCreate}
          isLoading={isLoading}
          isError={isError}
        />
      </PageContentBox>
      <PageContentBox>
        <InboundCheckTable
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
        <InboundScheduleListDrawer onClose={() => setDrawerOpen(false)} />
      )}
      {isFetched && selectedRow && (
        <InboundCheckDrawer
          data={selectedRow}
          onClose={() => setRowSelection({})}
        />
      )}
    </div>
  );
};
