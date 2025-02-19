import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import {
  OutboundLoadingResponseDto,
  useOutboundLoadingCount,
} from "../../model";
import { ColumnFiltersState } from "@tanstack/react-table";
import { minCountForServerSide, Spinner } from "@/shared";
import { OutboundLoadingTable } from "./OutboundLoadingTable";

interface OutboundLoadingTableWrapperProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  onChangeSelectedRow: (row: OutboundLoadingResponseDto | null) => void;
}

export const OutboundLoadingTableWrapper = ({
  columnFilters,
  setColumnFilters,
  onChangeSelectedRow,
}: OutboundLoadingTableWrapperProps) => {
  const {
    data: { totalElements },
  } = useOutboundLoadingCount();

  const isServerSide = useMemo(() => {
    return totalElements >= minCountForServerSide;
  }, [totalElements]);

  return (
    <>
      <Suspense fallback={<Spinner message="출하상차 데이터를 가져오는 중" />}>
        <OutboundLoadingTable
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
