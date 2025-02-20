import { PageContentBox } from "@/shared";
import styles from "./OutboundLoadingPage.module.css";
import {
  OutboundLoadingDrawer,
  OutboundLoadingResponseDto,
  OutboundControlPanel,
  OutboundPackingListDrawer,
  OutboundLoadingTable,
} from "@/features";
import { useCallback, useEffect, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useOutboundLoadingTable } from "@/features/outbound/model/useOutboundLodingTable";

export const OutboundLoadingPage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<OutboundLoadingResponseDto | null>(null);

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
  } = useOutboundLoadingTable(columnFilters);

  useEffect(() => {
    if (isFetched) {
      const rowId =
        Object.keys(rowSelection).length > 0
          ? parseInt(Object.keys(rowSelection)[0])
          : null;

      setSelectedRow(rowId || rowId === 0 ? data!.content[rowId] : null);
    }
  }, [isFetched, rowSelection, data]);

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
        <OutboundPackingListDrawer onClose={() => setDrawerOpen(false)} />
      )}
      {selectedRow && (
        <OutboundLoadingDrawer
          data={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
};
