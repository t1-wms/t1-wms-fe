import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import {
  InboundScheduleResponseDto,
  useInboundScheduleCount,
} from "../../model";
import { InboundScheduleTable } from "./InboundScheduleTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { minCountForServerSide, Spinner } from "@/shared";

interface InboundScheduleTableWrapperProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  onChangeSelectedRow: (row: InboundScheduleResponseDto | null) => void;
}

export const InboundScheduleTableWrapper = ({
  columnFilters,
  setColumnFilters,
  onChangeSelectedRow,
}: InboundScheduleTableWrapperProps) => {
  const {
    data: { totalElements },
  } = useInboundScheduleCount();

  const isServerSide = useMemo(() => {
    return totalElements >= minCountForServerSide;
  }, [totalElements]);

  return (
    <>
      <Suspense fallback={<Spinner message="입하예정 데이터를 가져오는 중" />}>
        <InboundScheduleTable
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          isServerSide={isServerSide}
          onChangeSelectedRow={onChangeSelectedRow}
          totalElements={totalElements}
        />
      </Suspense>
    </>
  );
};
