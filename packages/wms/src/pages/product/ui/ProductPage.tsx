import { ProductControlPanel, ProductTable, useProductTable } from "@/features";
import { PageContentBox } from "@/shared";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleSearch = useCallback(
    (productCode: string) => {
      setColumnFilters([{ id: "productCode", value: productCode }]);
    },
    [setColumnFilters]
  );

  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
    isLoading,
    isPending,
    isError,
    error,
    refetch,
  } = useProductTable(columnFilters);

  return (
    <div className={styles.container}>
      <PageContentBox>
        <ProductControlPanel onSearch={handleSearch} />
      </PageContentBox>
      <PageContentBox>
        <ProductTable
          tableParams={{
            pagination,
            setPagination,
            sorting,
            setSorting,
            rowSelection,
            setRowSelection,
            data,
            isLoading,
            isPending,
            isError,
            error,
            refetch,
          }}
        />
      </PageContentBox>
    </div>
  );
}
