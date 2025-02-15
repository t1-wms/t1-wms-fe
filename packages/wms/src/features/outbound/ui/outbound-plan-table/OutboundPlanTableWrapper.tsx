import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import { useOutboundPlanCount } from "../../model";
import { OutboundPlanTable } from "./OutboundPlanTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { minCountForServerSide, Spinner } from "@/shared";

interface OutboundPlanTableWrapperProps {
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
}

export const OutboundPlanTableWrapper = ({
  columnFilters,
  setColumnFilters,
}: OutboundPlanTableWrapperProps) => {
  const { data: countResult } = useOutboundPlanCount();

  const isServerSide = useMemo(() => {
    return countResult.count >= minCountForServerSide;
  }, [countResult]);

  return (
    <>
      <Suspense fallback={<Spinner message="출고예정 데이터를 가져오는 중" />}>
        <OutboundPlanTable
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          isServerSide={isServerSide}
        />
      </Suspense>
    </>
  );
};
