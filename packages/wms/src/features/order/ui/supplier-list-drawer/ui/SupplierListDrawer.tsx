import { BaseDrawer, Spinner, useModalStore } from "@/shared";
import { Suspense, useCallback, useEffect, useState } from "react";
import {
  CreateOrderModalInfo,
  SupplierResponseDto,
  SupplierTableWrapper,
} from "@/features";

interface SupplierListDrawerProps {
  onClose: () => void;
}

export const SupplierListDrawer = ({ onClose }: SupplierListDrawerProps) => {
  const [selectedRow, setSelectedRow] = useState<SupplierResponseDto | null>(
    null
  );

  const { openModal } = useModalStore();

  useEffect(() => {
    if (selectedRow) {
      const modalInfo: CreateOrderModalInfo = {
        key: "createOrder",
        supplier: selectedRow,
      };

      openModal(modalInfo);
      onClose();
    }
  }, [onClose, selectedRow, openModal]);

  const handleChangeSelectedRow = useCallback(
    (row: SupplierResponseDto | null) => {
      setSelectedRow(row);
    },
    [setSelectedRow]
  );

  return (
    <BaseDrawer title="납품업체 선택" onClose={onClose}>
      <Suspense fallback={<Spinner message="납품업체 개수를 가져오는 중" />}>
        <SupplierTableWrapper onChangeSelectedRow={handleChangeSelectedRow} />
      </Suspense>
    </BaseDrawer>
  );
};
