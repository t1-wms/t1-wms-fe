import { BaseDrawer, Spinner, useModalStore } from "@/shared";
import { Suspense, useCallback, useEffect, useState } from "react";
import { OutboundPackingTableWrapper } from "../../outbound-packing-table";
import {
  CreateOutboundLoadingModalInfo,
  OutboundPackingResponseDto,
} from "@/features";

interface OutboundPackingListDrawerProps {
  onClose: () => void;
}

export const OutboundPackingListDrawer = ({
  onClose,
}: OutboundPackingListDrawerProps) => {
  const [selectedRow, setSelectedRow] =
    useState<OutboundPackingResponseDto | null>(null);

  const { openModal } = useModalStore();

  useEffect(() => {
    if (selectedRow) {
      const modalInfo: CreateOutboundLoadingModalInfo = {
        key: "createOutboundLoading",
        outbound: selectedRow,
      };

      openModal(modalInfo);
    }
  }, [selectedRow, openModal]);

  const handleChangeSelectedRow = useCallback(
    (row: OutboundPackingResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

  return (
    <BaseDrawer title="출고패킹 선택" onClose={onClose}>
      <Suspense fallback={<Spinner message="출고패킹 개수를 가져오는 중" />}>
        <OutboundPackingTableWrapper
          onChangeSelectedRow={handleChangeSelectedRow}
        />
      </Suspense>
    </BaseDrawer>
  );
};
