import { PageContentBox } from "@/shared";
import styles from "./OutboundPackingPage.module.css";
import {
  OutboundPackingDrawer,
  OutboundPackingResponseDto,
  OutboundControlPanel,
  OutboundPickingListDrawer,
  OutboundPackingTable,
} from "@/features";
import { useCallback, useEffect, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useOutboundPackingTable } from "@/features/outbound/model/useOutboundPackingTable";

export const OutboundPackingPage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<OutboundPackingResponseDto | null>(null);

  const handleSearch = useCallback(
    (number: string, startDate: string, endDate: string) => {
      console.log("asdf");
      setColumnFilters([
        { id: "outboundPackingDate", value: `${startDate},${endDate}` },
        { id: "outboundPackingNumber", value: number },
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
  } = useOutboundPackingTable(columnFilters);

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
          label="출고패킹"
          onSearch={handleSearch}
          onClickCreate={handleClickCreate}
        />
      </PageContentBox>
      <PageContentBox>
        <OutboundPackingTable
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
        <OutboundPickingListDrawer onClose={() => setDrawerOpen(false)} />
      )}
      {selectedRow && (
        <OutboundPackingDrawer
          data={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
};
