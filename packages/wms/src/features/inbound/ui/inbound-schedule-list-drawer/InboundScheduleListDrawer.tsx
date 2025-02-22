import {
  CreateInboundCheckModalInfo,
  InboundScheduleTable,
  useInboundScheduleTable,
} from "@/features";
import { BaseDrawer, useModalStore } from "@/shared";
import { useEffect } from "react";

interface InboundScheduleListDrawerProps {
  onClose: () => void;
}

export const InboundScheduleListDrawer = ({
  onClose,
}: InboundScheduleListDrawerProps) => {
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
  } = useInboundScheduleTable();

  useEffect(() => {
    if (isFetched) {
      const rowId =
        Object.keys(rowSelection).length > 0
          ? parseInt(Object.keys(rowSelection)[0])
          : null;

      if (rowId || rowId === 0) {
        const row = data!.content[rowId];

        const modalInfo: CreateInboundCheckModalInfo = {
          key: "createInboundCheck",
          inboundSchedule: row,
        };

        openModal(modalInfo);
        onClose();
      }
    }
  }, [isFetched, rowSelection, data, onClose, openModal]);

  return (
    <BaseDrawer title="입하예정 선택" onClose={onClose}>
      <InboundScheduleTable
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
