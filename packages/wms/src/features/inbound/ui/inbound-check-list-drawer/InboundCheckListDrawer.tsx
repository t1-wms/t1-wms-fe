import {
  CreateInboundPutAwayModalInfo,
  InboundCheckTable,
  useInboundCheckTable,
} from "@/features";
import { BaseDrawer, useModalStore } from "@/shared";
import { useEffect } from "react";

interface InboundCheckListDrawerProps {
  onClose: () => void;
}

export const InboundCheckListDrawer = ({
  onClose,
}: InboundCheckListDrawerProps) => {
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
    isLoading,
    isPending,
    isError,
    error,
    refetch,
  } = useInboundCheckTable();

  useEffect(() => {
    if (isFetched) {
      const rowId =
        Object.keys(rowSelection).length > 0
          ? parseInt(Object.keys(rowSelection)[0])
          : null;

      if (rowId || rowId === 0) {
        const row = data!.content[rowId];

        const modalInfo: CreateInboundPutAwayModalInfo = {
          key: "createInboundPutAway",
          inboundCheck: row,
        };

        openModal(modalInfo);
        onClose();
      }
    }
  }, [isFetched, rowSelection, data, onClose, openModal]);

  return (
    <BaseDrawer title="입하검사 선택" onClose={onClose}>
      <InboundCheckTable
        tableParams={{
          pagination,
          setPagination,
          sorting,
          setSorting,
          rowSelection,
          setRowSelection,
          data,
          isLoading,
          isPending,
          isError,
          error,
          refetch,
        }}
      />
    </BaseDrawer>
  );
};
