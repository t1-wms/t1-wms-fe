import {
  InboundCheckListDrawer,
  InboundControlPanel,
  InboundPutAwayDrawer,
  InboundPutAwayTable,
} from "@/features";
import { useInboundPutAwayTable } from "@/features/inbound/model/useInboundPutAwayTable";
import { PageContentBox } from "@/shared";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import styles from "./InboundPutAwayPage.module.css";

export const InboundPutAwayPage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = useCallback(
    (number: string, startDate: string, endDate: string) => {
      setColumnFilters([
        { id: "putAwayDate", value: `${startDate},${endDate}` },
        { id: "putAwayNumber", value: number },
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
  } = useInboundPutAwayTable(columnFilters);

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
          label="입고적치"
          onSearch={handleSearch}
          onClickCreate={handleClickCreate}
        />
      </PageContentBox>
      <PageContentBox>
        <InboundPutAwayTable
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
      {isDrawerOpen && (
        <InboundCheckListDrawer onClose={() => setDrawerOpen(false)} />
      )}
      {isFetched && selectedRow && (
        <InboundPutAwayDrawer
          data={selectedRow}
          onClose={() => setRowSelection({})}
        />
      )}
    </div>
  );
};
