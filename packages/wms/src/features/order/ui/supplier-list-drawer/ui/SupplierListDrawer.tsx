import {
  CreateOrderModalInfo,
  SupplierTable,
  useSupplierTable,
} from "@/features";
import { BaseDrawer, useModalStore } from "@/shared";
import { useEffect } from "react";

interface SupplierListDrawerProps {
  onClose: () => void;
}

export const SupplierListDrawer = ({ onClose }: SupplierListDrawerProps) => {
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
  } = useSupplierTable();

  useEffect(() => {
    if (isFetched) {
      const rowId =
        Object.keys(rowSelection).length > 0
          ? parseInt(Object.keys(rowSelection)[0])
          : null;

      if (rowId || rowId === 0) {
        const row = data!.content[rowId];

        const modalInfo: CreateOrderModalInfo = {
          key: "createOrder",
          supplier: row,
        };

        openModal(modalInfo);
        onClose();
      }
    }
  }, [isFetched, rowSelection, data, onClose, openModal]);

  return (
    <BaseDrawer title="납품업체 선택" onClose={onClose}>
      <SupplierTable
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
