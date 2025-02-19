import { PageContentBox, Spinner } from "@/shared";
import styles from "./OutboundPackingPage.module.css";
import {
  OutboundPackingDrawer,
  OutboundPackingResponseDto,
  OutboundPackingTableWrapper,
  OutboundControlPanel,
  OutboundPickingListDrawer,
} from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

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

  const handleChangeSelectedRow = useCallback(
    (row: OutboundPackingResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

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
        <Suspense fallback={<Spinner message="출고패킹 품목을 세는 중" />}>
          <OutboundPackingTableWrapper
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            onChangeSelectedRow={handleChangeSelectedRow}
          />
        </Suspense>
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
