import WarehouseVisualization from "@/widgets/visualization/Visualization";
import styles from "./BinPage.module.css";

export const BinPage = () => {
  return (
    <div className={styles.container}>
      <WarehouseVisualization />
    </div>
  );
};
