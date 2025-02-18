import { Dispatch, SetStateAction, Suspense, useMemo } from "react";
import { ProductResponseDto, useProductCount } from "../../model";
import { ProductTable } from "./ProductTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { minCountForServerSide, Spinner } from "@/shared";

interface ProductTableWrapperProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  onChangeSelectedRow?: (row: ProductResponseDto | null) => void;
}

export const ProductTableWrapper = ({
  columnFilters,
  setColumnFilters,
  onChangeSelectedRow,
}: ProductTableWrapperProps) => {
  const {
    data: { totalElements },
  } = useProductCount();

  const isServerSide = useMemo(() => {
    return totalElements >= minCountForServerSide;
  }, [totalElements]);

  return (
    <>
      <Suspense fallback={<Spinner message="품목 데이터를 가져오는 중" />}>
        <ProductTable
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
