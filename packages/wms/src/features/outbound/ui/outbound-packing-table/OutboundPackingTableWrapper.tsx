import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import {
  OutboundPackingResponseDto,
  useOutboundPackingCount,
} from "../../model";
import { OutboundPackingTable } from "./OutboundPackingTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { minCountForServerSide, Spinner } from "@/shared";

interface OutboundPackingTableWrapperProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  onChangeSelectedRow: (row: OutboundPackingResponseDto | null) => void;
}

export const OutboundPackingTableWrapper = ({
  columnFilters,
  setColumnFilters,
  onChangeSelectedRow,
}: OutboundPackingTableWrapperProps) => {
  const {
    data: { totalElements },
  } = useOutboundPackingCount();

  const isServerSide = useMemo(() => {
    return totalElements >= 0;
  }, [totalElements]);

  return (
    <>
      <Suspense fallback={<Spinner message="출고패킹 데이터를 가져오는 중" />}>
        <OutboundPackingTable
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
