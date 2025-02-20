import { PageContentBox, useModalStore } from "@/shared";
import styles from "./OutBoundPlanPage.module.css";
import {
  CreateOutboundPlanModalInfo,
  OutboundControlPanel,
  OutboundPlanDrawer,
  OutboundPlanResponseDto,
  OutboundPlanTable,
} from "@/features";
import { useCallback, useEffect, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useOutboundPlanTable } from "@/features/outbound/model/useOutboundPlanTable";

export const OutBoundPlanPage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] =
    useState<OutboundPlanResponseDto | null>(null);

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
    isPending,
  } = useOutboundPlanTable(columnFilters);

  useEffect(() => {
    if (isFetched) {
      const rowId =
        Object.keys(rowSelection).length > 0
          ? parseInt(Object.keys(rowSelection)[0])
          : null;

      setSelectedRow(rowId || rowId === 0 ? data!.content[rowId] : null);
    }
  }, [isFetched, rowSelection, data]);

  return (
    <div className={styles.container}>
      <PageContentBox>
        <OutboundControlPanel
          label="출고예정"
          onSearch={handleSearch}
          onClickCreate={handleClickCreate}
        />
      </PageContentBox>
      <PageContentBox>
        <OutboundPlanTable
          tableParams={{
            data: data,
            columnFilters: columnFilters,
            setColumnFilters: setColumnFilters,
            pagination: pagination,
            setPagination: setPagination,
            sorting: sorting,
            setSorting: setSorting,
            rowSelection: rowSelection,
            setRowSelection: setRowSelection,
            isPending: isPending,
          }}
        />
      </PageContentBox>
      {selectedRow && (
        <OutboundPlanDrawer
          data={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
};
