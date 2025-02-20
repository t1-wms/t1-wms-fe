import { PageContentBox } from "@/shared";
import styles from "./OutboundPickingPage.module.css";
import {
  OutboundPickingDrawer,
  OutboundControlPanel,
  OutboundAssignListDrawer,
  OutboundPickingTable,
} from "@/features";
import { useCallback, useMemo, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useOutboundPickingTable } from "@/features/outbound/model/useOutboundPickingTable";

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
    isPending,
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
            data: data,
            columnFilters: columnFilters,
            setColumnFilters: setColumnFilters,
            pagination: pagination,
            setPagination: setPagination,
            sorting: sorting,
            setSorting: setSorting,
            rowSelection: rowSelection,
            setRowSelection: setRowSelection,
            isPending: isPending,
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
