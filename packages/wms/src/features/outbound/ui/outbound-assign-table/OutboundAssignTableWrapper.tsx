import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import { OutboundAssignResponseDto, useOutboundAssignCount } from "../../model";
import { OutboundAssignTable } from "./OutboundAssignTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { minCountForServerSide, Spinner } from "@/shared";

interface OutboundAssignTableWrapperProps {
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  onChangeSelectedRow: (row: OutboundAssignResponseDto | null) => void;
}

export const OutboundAssignTableWrapper = ({
  columnFilters,
  setColumnFilters,
  onChangeSelectedRow,
}: OutboundAssignTableWrapperProps) => {
  const { data: countResult } = useOutboundAssignCount();

  const isServerSide = useMemo(() => {
    return countResult.count >= minCountForServerSide;
  }, [countResult]);

  return (
    <>
      <Suspense fallback={<Spinner message="출고지시 데이터를 가져오는 중" />}>
        <OutboundAssignTable
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          isServerSide={isServerSide}
          onChangeSelectedRow={onChangeSelectedRow}
        />
      </Suspense>
    </>
  );
};
