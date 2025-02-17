import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import { InboundPutAwayResponseDto, useInboundPutAwayCount } from "../../model";
import { InboundPutAwayTable } from "./InboundPutAwayTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { minCountForServerSide, Spinner } from "@/shared";

interface InboundPutAwayTableWrapperProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  onChangeSelectedRow: (row: InboundPutAwayResponseDto | null) => void;
}

export const InboundPutAwayTableWrapper = ({
  columnFilters,
  setColumnFilters,
  onChangeSelectedRow,
}: InboundPutAwayTableWrapperProps) => {
  const {
    data: { totalElements },
  } = useInboundPutAwayCount();

  const isServerSide = useMemo(() => {
    return totalElements >= minCountForServerSide;
  }, [totalElements]);

  return (
    <>
      <Suspense fallback={<Spinner message="입고적치 데이터를 가져오는 중" />}>
        <InboundPutAwayTable
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
