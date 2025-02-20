import { BaseDrawer, useModalStore } from "@/shared";
import { useEffect } from "react";
import { CreateOutboundAssignModalInfo } from "@/features/outbound/model";
import { OutboundPlanTable } from "../../outbound-plan-table";
import { useOutboundPlanTable } from "@/features/outbound/model/useOutboundPlanTable";

interface OutboundPlanListDrawerProps {
  onClose: () => void;
}

export const OutboundPlanListDrawer = ({
  onClose,
}: OutboundPlanListDrawerProps) => {
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
  } = useOutboundPlanTable();

  const { openModal } = useModalStore();

  useEffect(() => {
    if (isFetched) {
      const rowId =
        Object.keys(rowSelection).length > 0
          ? parseInt(Object.keys(rowSelection)[0])
          : null;

      if (rowId || rowId === 0) {
        const row = data!.content[rowId];

        const modalInfo: CreateOutboundAssignModalInfo = {
          key: "createOutboundAssign",
          outbound: row,
        };

        openModal(modalInfo);
      }
    }
  }, [isFetched, rowSelection, data]);

  return (
    <BaseDrawer title="출고예정 선택" onClose={onClose}>
      <OutboundPlanTable
        tableParams={{
          data: data,
          pagination: pagination,
          setPagination: setPagination,
          sorting: sorting,
          setSorting: setSorting,
          rowSelection: rowSelection,
          setRowSelection: setRowSelection,
          isPending: isPending,
        }}
      />
    </BaseDrawer>
  );
};
