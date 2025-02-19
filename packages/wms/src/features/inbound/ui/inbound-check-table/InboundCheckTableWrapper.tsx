import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import { InboundCheckResponseDto, useInboundCheckCount } from "../../model";
import { InboundCheckTable } from "./InboundCheckTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { minCountForServerSide, Spinner } from "@/shared";

interface InboundCheckTableWrapperProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  onChangeSelectedRow: (row: InboundCheckResponseDto | null) => void;
}

export const InboundCheckTableWrapper = ({
  columnFilters,
  setColumnFilters,
  onChangeSelectedRow,
}: InboundCheckTableWrapperProps) => {
  const {
    data: { totalElements },
  } = useInboundCheckCount();

  const isServerSide = useMemo(() => {
    return totalElements >= minCountForServerSide;
  }, [totalElements]);

  return (
    <>
      <Suspense fallback={<Spinner message="입하검사 데이터를 가져오는 중" />}>
        <InboundCheckTable
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
