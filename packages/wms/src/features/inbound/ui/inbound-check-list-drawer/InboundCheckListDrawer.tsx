import { BaseDrawer, Spinner, useModalStore } from "@/shared";
import { Suspense, useCallback, useEffect, useState } from "react";
import {
  CreateInboundPutAwayModalInfo,
  InboundCheckTableWrapper,
  InboundCheckResponseDto,
} from "@/features";

interface InboundCheckListDrawerProps {
  onClose: () => void;
}

export const InboundCheckListDrawer = ({
  onClose,
}: InboundCheckListDrawerProps) => {
  const [selectedRow, setSelectedRow] =
    useState<InboundCheckResponseDto | null>(null);

  const { openModal } = useModalStore();

  useEffect(() => {
    if (selectedRow) {
      const modalInfo: CreateInboundPutAwayModalInfo = {
        key: "createInboundPutAway",
        inboundCheck: selectedRow,
      };

      openModal(modalInfo);
    }
  }, [selectedRow, openModal]);

  const handleChangeSelectedRow = useCallback(
    (row: InboundCheckResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

  return (
    <BaseDrawer title="입하검사 선택" onClose={onClose}>
      <Suspense fallback={<Spinner message="입하검사 개수를 가져오는 중" />}>
        <InboundCheckTableWrapper
          onChangeSelectedRow={handleChangeSelectedRow}
        />
      </Suspense>
    </BaseDrawer>
  );
};
