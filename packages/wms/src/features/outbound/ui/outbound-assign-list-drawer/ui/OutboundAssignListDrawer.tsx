import { BaseDrawer, Spinner, useModalStore } from "@/shared";
import { Suspense, useCallback, useEffect, useState } from "react";
import { OutboundAssignTableWrapper } from "../../outbound-assign-table";
import {
  CreateOutboundPickingModalInfo,
  OutboundAssignResponseDto,
} from "@/features";

interface OutboundAssignListDrawerProps {
  onClose: () => void;
}

export const OutboundAssignListDrawer = ({
  onClose,
}: OutboundAssignListDrawerProps) => {
  const [selectedRow, setSelectedRow] =
    useState<OutboundAssignResponseDto | null>(null);

  const { openModal } = useModalStore();

  useEffect(() => {
    if (selectedRow) {
      const modalInfo: CreateOutboundPickingModalInfo = {
        key: "createOutboundPicking",
        outbound: selectedRow,
      };

      openModal(modalInfo);
    }
  }, [selectedRow, openModal]);

  const handleChangeSelectedRow = useCallback(
    (row: OutboundAssignResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

  return (
    <BaseDrawer title="출고예정 선택" onClose={onClose}>
      <Suspense fallback={<Spinner message="출고예정 개수를 가져오는 중" />}>
        <OutboundAssignTableWrapper
          onChangeSelectedRow={handleChangeSelectedRow}
        />
      </Suspense>
    </BaseDrawer>
  );
};
