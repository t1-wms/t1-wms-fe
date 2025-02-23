import { Skeleton } from "@/shared/skeleton/ui/Skeleton";
import styles from "./SideBarItemSkeleton.module.css";

export const SideBarItemSkeleton = () => {
  return (
    <div className={`${styles.container}`}>
      <Skeleton />
    </div>
  );
};
