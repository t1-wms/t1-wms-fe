import {
  CreateOutboundPlanModalInfo,
  OutboundControlPanel,
  OutboundPlanDrawer,
  OutboundPlanTable,
  useOutboundPlanTable,
} from "@/features";
import { PageContentBox, useModalStore } from "@/shared";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import styles from "./OutBoundPlanPage.module.css";

export const OutBoundPlanPage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { openModal } = useModalStore();

  const handleSearch = useCallback(
    (number: string, startDate: string, endDate: string) => {
      setColumnFilters([
        { id: "outboundScheduleDate", value: `${startDate},${endDate}` },
        { id: "outboundScheduleNumber", value: number },
      ]);
    },
    [setColumnFilters]
  );

  const handleClickCreate = useCallback(() => {
    const modalInfo: CreateOutboundPlanModalInfo = {
      key: "createOutboundPlan",
    };

    openModal(modalInfo);
  }, [openModal]);

  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
    isFetched,
    isLoading,
    isPending,
    isError,
    error,
    refetch,
  } = useOutboundPlanTable(columnFilters);

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
        <OutboundControlPanel
          label="출고예정"
          onSearch={handleSearch}
          onClickCreate={handleClickCreate}
          isLoading={isLoading}
          isError={isError}
        />
      </PageContentBox>
      <PageContentBox>
        <OutboundPlanTable
          tableParams={{
            data,
            columnFilters,
            setColumnFilters,
            pagination,
            setPagination,
            sorting,
            setSorting,
            rowSelection,
            setRowSelection,
            isLoading,
            isPending,
            isError,
            error,
            refetch,
          }}
        />
      </PageContentBox>
      {isFetched && selectedRow && (
        <OutboundPlanDrawer
          data={selectedRow}
          onClose={() => setRowSelection({})}
        />
      )}
    </div>
  );
};
