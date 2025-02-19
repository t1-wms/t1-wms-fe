import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import { OutboundPlanResponseDto, useOutboundPlanCount } from "../../model";
import { OutboundPlanTable } from "./OutboundPlanTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { minCountForServerSide, Spinner } from "@/shared";

interface OutboundPlanTableWrapperProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  onChangeSelectedRow: (row: OutboundPlanResponseDto | null) => void;
}

export const OutboundPlanTableWrapper = ({
  columnFilters,
  setColumnFilters,
  onChangeSelectedRow,
}: OutboundPlanTableWrapperProps) => {
  const {
    data: { totalElements },
  } = useOutboundPlanCount();

  const isServerSide = useMemo(() => {
    return totalElements >= minCountForServerSide;
  }, [totalElements]);

  console.log("TableWrapper Render");
  console.log(totalElements);

  return (
    <>
      <Suspense fallback={<Spinner message="출고예정 데이터를 가져오는 중" />}>
        <OutboundPlanTable
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
