import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import { OrderResponseDto, useReceivedOrderCount } from "../../model";
import { ReceivedOrderTable } from "./ReceivedOrderTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { minCountForServerSide, Spinner } from "@/shared";

interface ReceivedOrderTableWrapperProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  onChangeSelectedRow: (row: OrderResponseDto | null) => void;
}

export const ReceivedOrderTableWrapper = ({
  columnFilters,
  setColumnFilters,
  onChangeSelectedRow,
}: ReceivedOrderTableWrapperProps) => {
  const {
    data: { totalElements },
  } = useReceivedOrderCount();

  const isServerSide = useMemo(() => {
    return totalElements >= minCountForServerSide;
  }, [totalElements]);

  return (
    <>
      <Suspense fallback={<Spinner message="발주 데이터를 가져오는 중" />}>
        <ReceivedOrderTable
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
