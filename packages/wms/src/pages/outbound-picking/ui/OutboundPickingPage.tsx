import {
  OutboundAssignListDrawer,
  OutboundControlPanel,
  OutboundPickingDrawer,
  OutboundPickingTable,
  useOutboundPickingTable,
} from "@/features";
import { PageContentBox } from "@/shared";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import styles from "./OutboundPickingPage.module.css";

export const OutboundPickingPage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = useCallback(
    (number: string, startDate: string, endDate: string) => {
      setColumnFilters([
        { id: "outboundPickingDate", value: `${startDate},${endDate}` },
        { id: "outboundPickingNumber", value: number },
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
  } = useOutboundPickingTable(columnFilters);

  const selectedRows = useMemo(() => {
    const rowId =
      Object.keys(rowSelection).length > 0
        ? parseInt(Object.keys(rowSelection)[0])
        : null;

    return rowId || rowId === 0 ? data!.content[rowId] : null;
  }, [rowSelection, data]);

  return (
    <div className={styles.container}>
      <PageContentBox>
        <OutboundControlPanel
          label="출고피킹"
          onSearch={handleSearch}
          onClickCreate={handleClickCreate}
        />
      </PageContentBox>
      <PageContentBox>
        <OutboundPickingTable
          tableParams={{
            data,
            columnFilters,
            setColumnFilters,
            pagination,
            setPagination,
            sorting,
            setSorting,
            rowSelection,
            setRowSelection,
            isLoading,
            isPending,
            isError,
            error,
            refetch,
          }}
        />
      </PageContentBox>
      {isDrawerOpen && (
        <OutboundAssignListDrawer onClose={() => setDrawerOpen(false)} />
      )}
      {isFetched && selectedRows && (
        <OutboundPickingDrawer
          data={selectedRows}
          onClose={() => setRowSelection({})}
        />
      )}
    </div>
  );
};
