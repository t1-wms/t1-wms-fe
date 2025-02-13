import { PageContentBox } from "@/shared";
import styles from "./OutBoundPlanPage.module.css";
import { OutboundPlanControlPanel } from "@/features";

export const OutBoundPlanPage = () => {
  return (
    <div className={styles.container}>
      <PageContentBox>
        <OutboundPlanControlPanel />
      </PageContentBox>
    </div>
  );
};
