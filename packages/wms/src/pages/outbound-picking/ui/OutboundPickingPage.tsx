import { PageContentBox, Spinner } from "@/shared";
import styles from "./OutboundPickingPage.module.css";
import {
  OutboundPickingDrawer,
  OutboundPickingResponseDto,
  OutboundPickingTableWrapper,
  OutboundControlPanel,
  OutboundAssignListDrawer,
} from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export const OutboundPickingPage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<OutboundPickingResponseDto | null>(null);

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

  const handleChangeSelectedRow = useCallback(
    (row: OutboundPickingResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

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
        <Suspense fallback={<Spinner message="출고피킹 품목을 세는 중" />}>
          <OutboundPickingTableWrapper
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            onChangeSelectedRow={handleChangeSelectedRow}
          />
        </Suspense>
      </PageContentBox>
      {isDrawerOpen && (
        <OutboundAssignListDrawer onClose={() => setDrawerOpen(false)} />
      )}
      {selectedRow && (
        <OutboundPickingDrawer
          data={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
};
