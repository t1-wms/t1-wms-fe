import styles from "./UserPage.module.css";
import { UserControlPanel, UserTableWrapper } from "@/features";
import { PageContentBox } from "@/shared";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export default function UserPage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleSearch = useCallback(
    (staffNumber: string) => {
      setColumnFilters([{ id: "staffNumber", value: staffNumber }]);
    },
    [setColumnFilters]
  );

  return (
    <div className={styles.container}>
      <PageContentBox>
        <UserControlPanel onSearch={handleSearch} />
      </PageContentBox>
      <PageContentBox stretch>
        <Suspense fallback={<>LOADING</>}>
          <UserTableWrapper
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </Suspense>
      </PageContentBox>
    </div>
  );
}
