import { PageContentBox, Spinner } from "@/shared";
import styles from "./InboundCheckPage.module.css";
import {
  InboundControlPanel,
  InboundCheckDrawer,
  InboundCheckResponseDto,
  InboundCheckTableWrapper,
} from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export const InboundCheckPage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] =
    useState<InboundCheckResponseDto | null>(null);

  const handleSearch = useCallback(
    (number: string, startDate: string, endDate: string) => {
      setColumnFilters([
        { id: "inboundCheckDate", value: `${startDate},${endDate}` },
        { id: "inboundCheckNumber", value: number },
      ]);
    },
    [setColumnFilters]
  );

  const handleChangeSelectedRow = useCallback(
    (row: InboundCheckResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

  return (
    <div className={styles.container}>
      <PageContentBox>
        <InboundControlPanel
          label="입하검사"
          onSearch={handleSearch}
          onClickCreate={() => {}}
        />
      </PageContentBox>
      <PageContentBox>
        <Suspense fallback={<Spinner message="입하검사 품목을 세는 중" />}>
          <InboundCheckTableWrapper
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            onChangeSelectedRow={handleChangeSelectedRow}
          />
        </Suspense>
      </PageContentBox>
      {selectedRow && (
        <InboundCheckDrawer
          data={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
};
