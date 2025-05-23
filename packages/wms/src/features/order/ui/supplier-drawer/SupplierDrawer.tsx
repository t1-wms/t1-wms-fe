import styles from "./SupplierDrawer.module.css";
import { BaseDrawer, MainInput } from "@/shared";
import { SupplierResponseDto } from "../../model";
import { SupplierProductTable } from "@/features";

interface SupplierDrawerProps {
  data: SupplierResponseDto;
  onClose: () => void;
}

export const SupplierDrawer = ({ data, onClose }: SupplierDrawerProps) => {
  const { businessNumber, supplierName, productList } = data;

  return (
    <BaseDrawer title={`납품업체 조회`} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles["input-box"]}>
          <MainInput
            defaultValue={businessNumber}
            label="사업자등록번호"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={supplierName}
            label="납품업체"
            error={null}
            width="fullWidth"
            disabled
          />
        </div>
        <p className={`font-b-md ${styles.header}}`}>납품업체 취급 품목</p>
        <SupplierProductTable data={productList} />
      </div>
    </BaseDrawer>
  );
};
