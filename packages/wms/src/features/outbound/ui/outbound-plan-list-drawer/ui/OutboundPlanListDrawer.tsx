import { BaseDrawer, Spinner, useModalStore } from "@/shared";
import { Suspense, useCallback, useEffect, useState } from "react";
import { OutboundPlanTableWrapper } from "../../outbound-plan-table";
import {
  CreateOutboundAssignModalInfo,
  OutboundPlanResponseDto,
} from "@/features/outbound/model";

interface OutboundPlanListDrawerProps {
  onClose: () => void;
}

export const OutboundPlanListDrawer = ({
  onClose,
}: OutboundPlanListDrawerProps) => {
  const [selectedRow, setSelectedRow] =
    useState<OutboundPlanResponseDto | null>(null);

  const { openModal } = useModalStore();

  useEffect(() => {
    if (selectedRow) {
      const modalInfo: CreateOutboundAssignModalInfo = {
        key: "createOutboundAssign",
      };

      openModal(modalInfo);
    }
  }, [selectedRow, openModal]);

  const handleChangeSelectedRow = useCallback(
    (row: OutboundPlanResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

  return (
    <BaseDrawer title="출고예정 선택" onClose={onClose}>
      <Suspense fallback={<Spinner message="출고예정 개수를 가져오는 중" />}>
        <OutboundPlanTableWrapper
          onChangeSelectedRow={handleChangeSelectedRow}
        />
      </Suspense>
    </BaseDrawer>
  );
};
