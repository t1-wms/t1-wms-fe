import EmptyBoxImg from "@assets/empty-box.svg?react";
import styles from "./BaseTable.module.css";

interface BaseTableErrorProps {}

export const BaseTableNoContent = ({}: BaseTableErrorProps) => {
  return (
    <div className={styles["error-container"]}>
      <div className={styles.img}>
        <EmptyBoxImg />
      </div>
      <p className="font-r-md">데이터가 없습니다</p>
    </div>
  );
};
