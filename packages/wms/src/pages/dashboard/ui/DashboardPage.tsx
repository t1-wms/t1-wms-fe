import {
  InboundPieChart,
  OrderPieChart,
  OutboundPieChart,
  ProductThresholdBarChart,
} from "@/features";
import { ErrorBoundary, ErrorFallback, Spinner } from "@/shared";
import { SseProvider } from "@/widgets";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense, useCallback } from "react";
import styles from "./DashboardPage.module.css";

export default function DashBoardPage() {
  const queryClient = useQueryClient();

  const handleRetry = useCallback(
    async (queryKey: string, onReset: () => void) => {
      await queryClient.resetQueries({
        queryKey: [queryKey],
      });
      onReset();
    },
    [queryClient]
  );

  return (
    <SseProvider>
      <div className={styles.container}>
        <div className={styles.line}>
          <div className={`${styles.box} shadow-md`}>
            <h3 className="font-h3">입고현황</h3>
            <ErrorBoundary
              fallbackRender={(onReset) => (
                <ErrorFallback
                  onRetry={() => {
                    handleRetry("inboundChart", onReset);
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
            <h3 className="font-h3">출고현황</h3>
            <ErrorBoundary
              fallbackRender={(onReset) => (
                <ErrorFallback
                  onRetry={() => {
                    handleRetry("outboundChart", onReset);
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
            <h3 className="font-h3">발주현황</h3>
            <ErrorBoundary
              fallbackRender={(onReset) => (
                <ErrorFallback
                  onRetry={() => {
                    handleRetry("orderChart", onReset);
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
              <h3 className="font-h3">재고현황</h3>
              <ErrorBoundary
                fallbackRender={(onReset) => (
                  <ErrorFallback
                    onRetry={() => {
                      handleRetry("productThresholdChart", onReset);
                    }}
                  />
                )}
              >
                <Suspense
                  fallback={<Spinner message="재고현황을 가져오는 중" />}
                >
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
                    handleRetry("productThresholdChart", onReset);
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
    </SseProvider>
  );
}
