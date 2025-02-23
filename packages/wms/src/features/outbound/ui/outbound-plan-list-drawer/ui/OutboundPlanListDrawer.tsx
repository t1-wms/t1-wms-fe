import { CreateOutboundAssignModalInfo } from "@/features/outbound/model";
import { useOutboundPlanTable } from "@/features/outbound/model/useOutboundPlanTable";
import { BaseDrawer, useModalStore } from "@/shared";
import { useEffect } from "react";
import { OutboundPlanTable } from "../../outbound-plan-table";

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
    isLoading,
    isPending,
    isError,
    error,
    refetch,
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
        onClose();
      }
    }
  }, [isFetched, rowSelection, data, onClose, openModal]);

  return (
    <BaseDrawer title="출고예정 선택" onClose={onClose}>
      <OutboundPlanTable
        tableParams={{
          data,
          pagination,
          setPagination,
          sorting,
          setSorting,
          rowSelection,
          setRowSelection,
          isPending,
          isLoading,
          isError,
          error,
          refetch,
        }}
      />
    </BaseDrawer>
  );
};
