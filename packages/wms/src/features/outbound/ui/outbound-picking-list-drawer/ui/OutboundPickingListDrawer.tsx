import { CreateOutboundPackingModalInfo } from "@/features";
import { useOutboundPickingTable } from "@/features/outbound/model/useOutboundPickingTable";
import { BaseDrawer, useModalStore } from "@/shared";
import { useEffect } from "react";
import { OutboundPickingTable } from "../../outbound-picking-table";

interface OutboundPickingListDrawerProps {
  onClose: () => void;
}

export const OutboundPickingListDrawer = ({
  onClose,
}: OutboundPickingListDrawerProps) => {
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
    isLoading,
    isError,
    error,
    refetch,
  } = useOutboundPickingTable();

  useEffect(() => {
    if (isFetched) {
      const rowId =
        Object.keys(rowSelection).length > 0
          ? parseInt(Object.keys(rowSelection)[0])
          : null;

      if (rowId || rowId === 0) {
        const row = data!.content[rowId];

        const modalInfo: CreateOutboundPackingModalInfo = {
          key: "createOutboundPacking",
          outbound: row,
        };

        openModal(modalInfo);
        onClose();
      }
    }
  }, [isFetched, rowSelection, data, onClose, openModal]);

  return (
    <BaseDrawer title="출고피킹 선택" onClose={onClose}>
      <OutboundPickingTable
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
