import {
  useCompletedInboundToday,
  useCompletedOutboundToday,
  useReceivedInboundToday,
  useReceivedOutboundToday,
} from "@/features";
import InboundPieChart from "@/features/inbound/ui/inbound-pie-chart";
import ProductThresholdBarChart from "@/features/inventory/ui/product-threshold-bar-chart";
import OrderPieChart from "@/features/order/ui/order-pie-chart";
import OutboundPieChart from "@/features/outbound/ui/outbound-pie-chart";
import {
  DataDisplay,
  ErrorBoundary,
  ErrorFallback,
  Spinner,
  useSSE,
} from "@/shared";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense, useCallback } from "react";
import styles from "./DashboardPage.module.css";

// const InboundPieChart = lazy(
//   () => import("@features/inbound/ui/inbound-pie-chart")
// );
// const OrderPieChart = lazy(() => import("@/features/order/ui/order-pie-chart"));
// const OutboundPieChart = lazy(
//   () => import("@features/outbound/ui/outbound-pie-chart")
// );
// const ProductThresholdBarChart = lazy(
//   () => import("@features/inventory/ui/product-threshold-bar-chart")
// );

export default function DashBoardPage() {
  const queryClient = useQueryClient();

  const handleRetry = useCallback(
    async (queryKey: string[], onReset: () => void) => {
      await queryClient.resetQueries({
        queryKey: queryKey,
      });
      onReset();
    },
    [queryClient]
  );

  const handleOutboundChange = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["outbound", "today"],
    });
  }, [queryClient]);

  useSSE(handleOutboundChange);

  return (
    <div className={styles.container}>
      <div className={styles.line}>
        <div className={`${styles.box} shadow-md`}>
          <h4 className="font-h4">금일 입고 예정</h4>
          <ErrorBoundary
            fallbackRender={(onReset) => (
              <ErrorFallback
                onRetry={() => {
                  handleRetry(["inbound", "today", "received"], onReset);
                }}
              />
            )}
          >
            <Suspense
              fallback={<Spinner message="금일 입고 예정을 가져오는 중" />}
            >
              <DataDisplay useData={useReceivedInboundToday} />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className={`${styles.box} shadow-md`}>
          <h4 className="font-h4">금일 출고 예정</h4>
          <ErrorBoundary
            fallbackRender={(onReset) => (
              <ErrorFallback
                onRetry={() => {
                  handleRetry(["outbound", "today", "received"], onReset);
                }}
              />
            )}
          >
            <Suspense
              fallback={<Spinner message="금일 출고 예정을 가져오는 중" />}
            >
              <DataDisplay useData={useReceivedOutboundToday} />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className={`${styles.box} shadow-md`}>
          <h4 className="font-h4">금일 입고 완료</h4>
          <ErrorBoundary
            fallbackRender={(onReset) => (
              <ErrorFallback
                onRetry={() => {
                  handleRetry(["inbound", "today", "completed"], onReset);
                }}
              />
            )}
          >
            <Suspense
              fallback={<Spinner message="금일 입고 완료를 가져오는 중" />}
            >
              <DataDisplay useData={useCompletedInboundToday} />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className={`${styles.box} shadow-md`}>
          <h4 className="font-h4">금일 출고 완료</h4>
          <ErrorBoundary
            fallbackRender={(onReset) => (
              <ErrorFallback
                onRetry={() => {
                  handleRetry(["outbound", "today", "completed"], onReset);
                }}
              />
            )}
          >
            <Suspense
              fallback={<Spinner message="금일 출고 예정을 가져오는 중" />}
            >
              <DataDisplay useData={useCompletedOutboundToday} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      <div className={styles.line}>
        <div className={`${styles.box} shadow-md`}>
          <h3 className="font-h4">입고현황</h3>
          <ErrorBoundary
            fallbackRender={(onReset) => (
              <ErrorFallback
                onRetry={() => {
                  handleRetry(["inboundChart"], onReset);
                }}
              />
            )}
          >
            <Suspense fallback={<Spinner message="입고현황을 가져오는 중" />}>
              <InboundPieChart />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className={`${styles.box} shadow-md`}>
          <h3 className="font-h4">출고현황</h3>
          <ErrorBoundary
            fallbackRender={(onReset) => (
              <ErrorFallback
                onRetry={() => {
                  handleRetry(["outboundChart"], onReset);
                }}
              />
            )}
          >
            <Suspense fallback={<Spinner message="출고현황을 가져오는 중" />}>
              <OutboundPieChart />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className={`${styles.box} shadow-md`}>
          <h3 className="font-h4">발주현황</h3>
          <ErrorBoundary
            fallbackRender={(onReset) => (
              <ErrorFallback
                onRetry={() => {
                  handleRetry(["orderChart"], onReset);
                }}
              />
            )}
          >
            <Suspense fallback={<Spinner message="발주현황을 가져오는 중" />}>
              <OrderPieChart />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      <div className={styles.line}>
        <div className={`${styles["flex-2"]}`}>
          <div className={`${styles.box} shadow-md`}>
            <h3 className="font-h4">재고현황</h3>
            <ErrorBoundary
              fallbackRender={(onReset) => (
                <ErrorFallback
                  onRetry={() => {
                    handleRetry(["productThresholdChart"], onReset);
                  }}
                />
              )}
            >
              <Suspense fallback={<Spinner message="재고현황을 가져오는 중" />}>
                <ProductThresholdBarChart />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
        <div className={`${styles.box} shadow-md`}>
          <ErrorBoundary
            fallbackRender={(onReset) => (
              <ErrorFallback
                onRetry={() => {
                  handleRetry(["productThresholdChart"], onReset);
                }}
              />
            )}
          >
            <Suspense fallback={<Spinner message="재고현황을 가져오는 중" />}>
              <ProductThresholdBarChart />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      <div className={styles.line}></div>
    </div>
  );
}
