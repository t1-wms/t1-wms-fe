import { BaseDrawer, Spinner, useModalStore } from "@/shared";
import { Suspense, useCallback, useEffect, useState } from "react";
import { OutboundPickingTableWrapper } from "../../outbound-picking-table";
import {
  CreateOutboundPackingModalInfo,
  OutboundPickingResponseDto,
} from "@/features";

interface OutboundPickingListDrawerProps {
  onClose: () => void;
}

export const OutboundPickingListDrawer = ({
  onClose,
}: OutboundPickingListDrawerProps) => {
  const [selectedRow, setSelectedRow] =
    useState<OutboundPickingResponseDto | null>(null);

  const { openModal } = useModalStore();

  useEffect(() => {
    if (selectedRow) {
      const modalInfo: CreateOutboundPackingModalInfo = {
        key: "createOutboundPacking",
        outbound: selectedRow,
      };

      openModal(modalInfo);
      onClose();
    }
  }, [onClose, selectedRow, openModal]);

  const handleChangeSelectedRow = useCallback(
    (row: OutboundPickingResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

  return (
    <BaseDrawer title="출고피킹 선택" onClose={onClose}>
      <Suspense fallback={<Spinner message="출고피킹 개수를 가져오는 중" />}>
        <OutboundPickingTableWrapper
          onChangeSelectedRow={handleChangeSelectedRow}
        />
      </Suspense>
    </BaseDrawer>
  );
};
