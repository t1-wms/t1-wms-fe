import { BaseDrawer, useModalStore } from "@/shared";
import { useEffect } from "react";
import { OutboundPackingTable } from "../../outbound-packing-table";
import { CreateOutboundLoadingModalInfo } from "@/features";
import { useOutboundPackingTable } from "@/features/outbound/model/useOutboundPackingTable";

interface OutboundPackingListDrawerProps {
  onClose: () => void;
}

export const OutboundPackingListDrawer = ({
  onClose,
}: OutboundPackingListDrawerProps) => {
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
    isError,
    error,
    refetch,
  } = useOutboundPackingTable();

  useEffect(() => {
    if (isFetched) {
      const rowId =
        Object.keys(rowSelection).length > 0
          ? parseInt(Object.keys(rowSelection)[0])
          : null;

      if (rowId || rowId === 0) {
        const row = data!.content[rowId];

        const modalInfo: CreateOutboundLoadingModalInfo = {
          key: "createOutboundLoading",
          outbound: row,
        };

        openModal(modalInfo);
        onClose();
      }
    }
  }, [isFetched, rowSelection, data, onClose, openModal]);

  return (
    <BaseDrawer title="출고패킹 선택" onClose={onClose}>
      <OutboundPackingTable
        tableParams={{
          data: data,
          pagination: pagination,
          setPagination: setPagination,
          sorting: sorting,
          setSorting: setSorting,
          rowSelection: rowSelection,
          setRowSelection: setRowSelection,
          isPending: isPending,
          isError,
          error,
          refetch,
        }}
      />
    </BaseDrawer>
  );
};
