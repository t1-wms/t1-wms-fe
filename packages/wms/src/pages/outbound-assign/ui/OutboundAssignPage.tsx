import { PageContentBox } from "@/shared";
import styles from "./OutboundAssignPage.module.css";
import {
  OutboundAssignDrawer,
  OutboundAssignTable,
  OutboundControlPanel,
  OutboundPlanListDrawer,
  useOutboundAssignTable,
} from "@/features";
import { useCallback, useMemo, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export const OutboundAssignPage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = useCallback(
    (number: string, startDate: string, endDate: string) => {
      setColumnFilters([
        { id: "outboundAssignDate", value: `${startDate},${endDate}` },
        { id: "outboundAssignNumber", value: number },
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
    isError,
    error,
    refetch,
  } = useOutboundAssignTable(columnFilters);

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
        <OutboundControlPanel
          label="출고지시"
          onSearch={handleSearch}
          onClickCreate={handleClickCreate}
        />
      </PageContentBox>
      <PageContentBox>
        <OutboundAssignTable
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
            isPending,
            isError,
            error,
            refetch,
          }}
        />
      </PageContentBox>
      {isDrawerOpen && (
        <OutboundPlanListDrawer onClose={() => setDrawerOpen(false)} />
      )}
      {isFetched && selectedRow && (
        <OutboundAssignDrawer
          data={selectedRow}
          onClose={() => setRowSelection({})}
        />
      )}
    </div>
  );
};
