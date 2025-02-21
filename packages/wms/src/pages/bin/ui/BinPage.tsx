import WarehouseVisualization from "@/shared/visualization/ui/Visualization";
import { Suspense } from "react";
import styles from "./BinPage.module.css";

export const BinPage = () => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<>LOADING</>}>
        <WarehouseVisualization />
      </Suspense>
    </div>
  );
};
