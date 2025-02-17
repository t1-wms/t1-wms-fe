import { PageContentBox, Spinner } from "@/shared";
import styles from "./InboundPutAwayPage.module.css";
import {
  InboundControlPanel,
  InboundPutAwayDrawer,
  InboundPutAwayResponseDto,
  InboundPutAwayTableWrapper,
  InboundCheckListDrawer,
} from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export const InboundPutAwayPage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<InboundPutAwayResponseDto | null>(null);

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

  const handleChangeSelectedRow = useCallback(
    (row: InboundPutAwayResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

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
        <Suspense fallback={<Spinner message="입고적치 품목을 세는 중" />}>
          <InboundPutAwayTableWrapper
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            onChangeSelectedRow={handleChangeSelectedRow}
          />
        </Suspense>
      </PageContentBox>
      {isDrawerOpen && (
        <InboundCheckListDrawer onClose={() => setDrawerOpen(false)} />
      )}
      {selectedRow && (
        <InboundPutAwayDrawer
          data={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
};
