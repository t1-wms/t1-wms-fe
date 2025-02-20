import { BaseDrawer, useModalStore } from "@/shared";
import { useEffect } from "react";
import { OutboundAssignTable } from "../outbound-assign-table";
import { CreateOutboundPickingModalInfo } from "@/features";
import { useOutboundAssignTable } from "../../model/useOutboundAssignTable";

interface OutboundAssignListDrawerProps {
  onClose: () => void;
}

export const OutboundAssignListDrawer = ({
  onClose,
}: OutboundAssignListDrawerProps) => {
  const { openModal } = useModalStore();

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
  } = useOutboundAssignTable();

  useEffect(() => {
    if (isFetched) {
      const rowId =
        Object.keys(rowSelection).length > 0
          ? parseInt(Object.keys(rowSelection)[0])
          : null;

      if (rowId || rowId === 0) {
        const row = data!.content[rowId];

        const modalInfo: CreateOutboundPickingModalInfo = {
          key: "createOutboundPicking",
          outbound: row,
        };

        openModal(modalInfo);
        onClose();
      }
    }
  }, [isFetched, rowSelection, data, onClose, openModal]);

  return (
    <BaseDrawer title="출고지시 선택" onClose={onClose}>
      <OutboundAssignTable
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
