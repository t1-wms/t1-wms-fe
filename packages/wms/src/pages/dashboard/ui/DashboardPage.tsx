import { Spinner } from "@/shared";
import styles from "./DashboardPage.module.css";
import {
  InboundPieChart,
  OrderBarChart,
  ProductThresholdBarChart,
} from "@/features";
import { Suspense } from "react";
import { OutboundPieChart } from "@/features/outbound/ui/outbound-pie-chart";

export default function DashBoardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.line}>
        <div className={`${styles.box} shadow-md`}>
          <Suspense fallback={<Spinner message="입고현황을 가져오는 중" />}>
            <InboundPieChart />
          </Suspense>
        </div>
        <div className={`${styles.box} shadow-md`}>
          <Suspense fallback={<Spinner message="출고현황을 가져오는 중" />}>
            <OutboundPieChart />
          </Suspense>
        </div>
      </div>
      <div className={styles.line}>
        <div className={`${styles.box} shadow-md`}>
          <Suspense fallback={<Spinner message="발주현황을 가져오는 중" />}>
            <OrderBarChart />
          </Suspense>
        </div>
      </div>
      <div className={styles.line}>
        <div className={`${styles.box} shadow-md`}>
          <Suspense fallback={<Spinner message="재고현황을 가져오는 중" />}>
            <ProductThresholdBarChart />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
