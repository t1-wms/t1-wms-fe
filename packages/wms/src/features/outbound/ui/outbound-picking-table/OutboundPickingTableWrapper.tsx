import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import {
  OutboundPickingResponseDto,
  useOutboundPickingCount,
} from "../../model";
import { OutboundPickingTable } from "./OutboundPickingTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { minCountForServerSide, Spinner } from "@/shared";

interface OutboundPickingTableWrapperProps {
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  onChangeSelectedRow: (row: OutboundPickingResponseDto | null) => void;
}

export const OutboundPickingTableWrapper = ({
  columnFilters,
  setColumnFilters,
  onChangeSelectedRow,
}: OutboundPickingTableWrapperProps) => {
  const { data: countResult } = useOutboundPickingCount();

  const isServerSide = useMemo(() => {
    return countResult.count >= minCountForServerSide;
  }, [countResult]);

  return (
    <>
      <Suspense fallback={<Spinner message="출고피킹 데이터를 가져오는 중" />}>
        <OutboundPickingTable
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          isServerSide={isServerSide}
          onChangeSelectedRow={onChangeSelectedRow}
        />
      </Suspense>
    </>
  );
};
