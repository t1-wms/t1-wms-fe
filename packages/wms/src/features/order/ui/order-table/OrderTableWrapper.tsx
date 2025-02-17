import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import { OrderResponseDto, useOrderCount } from "../../model";
import { OrderTable } from "./OrderTable";
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
  const {
    data: { totalElements },
  } = useOrderCount();

  const isServerSide = useMemo(() => {
    return totalElements >= minCountForServerSide;
  }, [totalElements]);

  return (
    <>
      <Suspense fallback={<Spinner message="발주 데이터를 가져오는 중" />}>
        <OrderTable
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
