import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import { SupplierResponseDto, useSupplierCount } from "../../model";
import { SupplierTable } from "./SupplierTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { minCountForServerSide, Spinner } from "@/shared";

interface SupplierTableWrapperProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  onChangeSelectedRow: (row: SupplierResponseDto | null) => void;
}

export const SupplierTableWrapper = ({
  columnFilters,
  setColumnFilters,
  onChangeSelectedRow,
}: SupplierTableWrapperProps) => {
  const { data: countResult } = useSupplierCount();

  const isServerSide = useMemo(() => {
    return countResult.count >= minCountForServerSide;
  }, [countResult]);

  return (
    <>
      <Suspense fallback={<Spinner message="납품업체 데이터를 가져오는 중" />}>
        <SupplierTable
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          isServerSide={isServerSide}
          onChangeSelectedRow={onChangeSelectedRow}
        />
      </Suspense>
    </>
  );
};
