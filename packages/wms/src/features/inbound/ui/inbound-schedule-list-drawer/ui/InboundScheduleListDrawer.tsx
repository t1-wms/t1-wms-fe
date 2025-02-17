import { BaseDrawer, Spinner, useModalStore } from "@/shared";
import { Suspense, useCallback, useEffect, useState } from "react";
import { InboundScheduleTableWrapper } from "../../inbound-schedule-table";
import {
  CreateInboundCheckModalInfo,
  InboundScheduleResponseDto,
} from "@/features";

interface InboundScheduleListDrawerProps {
  onClose: () => void;
}

export const InboundScheduleListDrawer = ({
  onClose,
}: InboundScheduleListDrawerProps) => {
  const [selectedRow, setSelectedRow] =
    useState<InboundScheduleResponseDto | null>(null);

  const { openModal } = useModalStore();

  useEffect(() => {
    if (selectedRow) {
      const modalInfo: CreateInboundCheckModalInfo = {
        key: "createInboundCheck",
        inboundSchedule: selectedRow,
      };

      openModal(modalInfo);
    }
  }, [selectedRow, openModal]);

  const handleChangeSelectedRow = useCallback(
    (row: InboundScheduleResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

  return (
    <BaseDrawer title="입하예정 선택" onClose={onClose}>
      <Suspense fallback={<Spinner message="입하예정 개수를 가져오는 중" />}>
        <InboundScheduleTableWrapper
          onChangeSelectedRow={handleChangeSelectedRow}
        />
      </Suspense>
    </BaseDrawer>
  );
};
