import { PageContentBox, Spinner } from "@/shared";
import styles from "./InboundSchedulePage.module.css";
import {
  InboundControlPanel,
  InboundScheduleDrawer,
  InboundScheduleResponseDto,
  InboundScheduleTableWrapper,
} from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export const InboundSchedulePage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] =
    useState<InboundScheduleResponseDto | null>(null);

  const handleSearch = useCallback(
    (number: string, startDate: string, endDate: string) => {
      setColumnFilters([
        { id: "inboundScheduleDate", value: `${startDate},${endDate}` },
        { id: "inboundScheduleNumber", value: number },
      ]);
    },
    [setColumnFilters]
  );

  const handleChangeSelectedRow = useCallback(
    (row: InboundScheduleResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

  return (
    <div className={styles.container}>
      <PageContentBox>
        <InboundControlPanel
          label="입하예정"
          onSearch={handleSearch}
          onClickCreate={() => {}}
        />
      </PageContentBox>
      <PageContentBox>
        <Suspense fallback={<Spinner message="입하예정 품목을 세는 중" />}>
          <InboundScheduleTableWrapper
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            onChangeSelectedRow={handleChangeSelectedRow}
          />
        </Suspense>
      </PageContentBox>
      {selectedRow && (
        <InboundScheduleDrawer
          data={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
};
