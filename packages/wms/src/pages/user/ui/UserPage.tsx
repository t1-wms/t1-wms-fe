import styles from "./UserPage.module.css";
import { UserControlPanel, UserTable, useUserTable } from "@/features";
import { PageContentBox } from "@/shared";
import { useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

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
