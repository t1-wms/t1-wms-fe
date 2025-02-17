import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import { OrderResponseDto, useReceivedOrderCount } from "../../model";
import { ReceivedOrderTable } from "./ReceivedOrderTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { minCountForServerSide, Spinner } from "@/shared";

interface OrderTableWrapperProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  onChangeSelectedRow: (row: OrderResponseDto | null) => void;
}

export const OrderTableWrapper = ({
  columnFilters,
  setColumnFilters,
  onChangeSelectedRow,
}: OrderTableWrapperProps) => {
  const { data: countResult } = useOrderCount();

  const isServerSide = useMemo(() => {
    return countResult.count >= minCountForServerSide;
  }, [countResult]);

  return (
    <>
      <Suspense fallback={<Spinner message="발주 데이터를 가져오는 중" />}>
        <OrderTable
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          isServerSide={isServerSide}
          onChangeSelectedRow={onChangeSelectedRow}
        />
      </Suspense>
    </>
  );
};
