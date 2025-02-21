import {
  InboundPieChart,
  OrderPieChart,
  OutboundPieChart,
  ProductThresholdBarChart,
} from "@/features";
import { ErrorBoundary, Spinner } from "@/shared";
import { Suspense } from "react";
import styles from "./DashboardPage.module.css";

export default function DashBoardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.line}>
        <div className={`${styles.box} shadow-md`}>
          <h3 className="font-h3">입고현황</h3>
          <Suspense fallback={<Spinner message="입고현황을 가져오는 중" />}>
            <InboundPieChart />
          </Suspense>
        </div>
        <div className={`${styles.box} shadow-md`}>
          <h3 className="font-h3">출고현황</h3>
          <Suspense fallback={<Spinner message="출고현황을 가져오는 중" />}>
            <OutboundPieChart />
          </Suspense>
        </div>
        <div className={`${styles.box} shadow-md`}>
          <h3 className="font-h3">발주현황</h3>
          <Suspense fallback={<Spinner message="발주현황을 가져오는 중" />}>
            <OrderPieChart />
          </Suspense>
        </div>
      </div>
      <div className={styles.line}>
        <div className={`${styles["flex-2"]}`}>
          <div className={`${styles.box} shadow-md`}>
            <ErrorBoundary fallback={<>에러야~!</>}>
              <Suspense fallback={<Spinner message="재고현황을 가져오는 중" />}>
                <ProductThresholdBarChart />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
        <div className={`${styles.box} shadow-md`}>
          <Suspense fallback={<Spinner message="재고현황을 가져오는 중" />}>
            <ProductThresholdBarChart />
          </Suspense>
        </div>
      </div>
      <div className={styles.line}></div>
    </div>
  );
}
