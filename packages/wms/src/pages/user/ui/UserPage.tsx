import { UserControlPanel, UserTable, useUserTable } from "@/features";
import { PageContentBox } from "@/shared";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import styles from "./UserPage.module.css";

export default function UserPage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleSearch = useCallback(
    (staffNumber: string) => {
      setColumnFilters([{ id: "staffNumber", value: staffNumber }]);
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
    filter,
    sort,
  } = useUserTable(columnFilters);

  return (
    <div className={styles.container}>
      <PageContentBox>
        <UserControlPanel onSearch={handleSearch} />
      </PageContentBox>
      <PageContentBox stretch>
        <UserTable
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
            filter,
            sort,
          }}
        />
      </PageContentBox>
    </div>
  );
}
