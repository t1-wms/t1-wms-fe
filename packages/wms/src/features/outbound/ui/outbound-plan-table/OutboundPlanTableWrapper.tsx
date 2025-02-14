import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import { useOutboundPlanCount } from "../../model";
import { OutboundPlanTable } from "./OutboundPlanTable";
import { ColumnFiltersState } from "@tanstack/react-table";

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
    return countResult.count > 10000;
  }, [countResult]);

  return (
    <>
      <Suspense fallback={<>Loading</>}>
        <OutboundPlanTable
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          isServerSide={isServerSide}
        />
      </Suspense>
    </>
  );
};
