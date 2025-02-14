import { UserTable, useUserCount } from "@/features";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Dispatch, SetStateAction, Suspense, useMemo } from "react";

interface UserTableWrapperProps {
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
}

export const UserTableWrapper = ({
  columnFilters,
  setColumnFilters,
}: UserTableWrapperProps) => {
  const { data: countResult } = useUserCount();

  const isServerSide = useMemo(() => {
    return countResult.count > 10000;
  }, [countResult]);

  return (
    <>
      <Suspense fallback={<>Loading</>}>
        <UserTable
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          isServerSide={isServerSide}
        />
      </Suspense>
    </>
  );
};
