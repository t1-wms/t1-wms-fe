import { PageContentBox } from "@/shared";
import styles from "./SupplierPage.module.css";
import {
  SupplierControlPanel,
  SupplierDrawer,
  useSupplierTable,
  SupplierTable,
} from "@/features";
import { useCallback, useMemo, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export default function SupplierPage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleSearch = useCallback(
    (businessNumber: string) => {
      setColumnFilters([{ id: "businessNumber", value: businessNumber }]);
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
    isFetched,
    isPending,
    isError,
    error,
    refetch,
  } = useSupplierTable(columnFilters);

  const selectedRow = useMemo(() => {
    const rowId =
      Object.keys(rowSelection).length > 0
        ? parseInt(Object.keys(rowSelection)[0])
        : null;

    return rowId || rowId === 0 ? data!.content[rowId] : null;
  }, [rowSelection, data]);

  return (
    <div className={styles.container}>
      <PageContentBox>
        <SupplierControlPanel onSearch={handleSearch} />
      </PageContentBox>
      <PageContentBox>
        <SupplierTable
          tableParams={{
            pagination,
            setPagination,
            sorting,
            setSorting,
            rowSelection,
            setRowSelection,
            data,
            isPending,
            isError,
            error,
            refetch,
          }}
        />
      </PageContentBox>
      {isFetched && selectedRow && (
        <SupplierDrawer
          data={selectedRow}
          onClose={() => setRowSelection({})}
        />
      )}
    </div>
  );
}
