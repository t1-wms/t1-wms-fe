import { UserTable, useUserCount } from "@/features";
import { minCountForServerSide } from "@/shared";
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
  const {
    data: { totalElements },
  } = useUserCount();

  const isServerSide = useMemo(() => {
    return totalElements >= minCountForServerSide;
  }, [totalElements]);

  return (
    <>
      <Suspense fallback={<>Loading</>}>
        <UserTable
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          isServerSide={isServerSide}
          totalElements={totalElements}
        />
      </Suspense>
    </>
  );
};
