import { PageContentBox } from "@/shared";
import styles from "./OutboundLoadingPage.module.css";
import {
  OutboundLoadingDrawer,
  OutboundControlPanel,
  OutboundPackingListDrawer,
  OutboundLoadingTable,
  useOutboundLoadingTable,
} from "@/features";
import { useCallback, useMemo, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export const OutboundLoadingPage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = useCallback(
    (number: string, startDate: string, endDate: string) => {
      setColumnFilters([
        { id: "outboundLoadingDate", value: `${startDate},${endDate}` },
        { id: "outboundLoadingNumber", value: number },
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
  } = useOutboundLoadingTable(columnFilters);

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
          label="출하상차"
          onSearch={handleSearch}
          onClickCreate={handleClickCreate}
        />
      </PageContentBox>
      <PageContentBox>
        <OutboundLoadingTable
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
        <OutboundPackingListDrawer onClose={() => setDrawerOpen(false)} />
      )}
      {isFetched && selectedRow && (
        <OutboundLoadingDrawer
          data={selectedRow}
          onClose={() => setRowSelection({})}
        />
      )}
    </div>
  );
};
