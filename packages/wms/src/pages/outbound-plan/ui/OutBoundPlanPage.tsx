import { PageContentBox, Spinner, useModalStore } from "@/shared";
import styles from "./OutBoundPlanPage.module.css";
import {
  CreateOutboundPlanModalInfo,
  OutboundControlPanel,
  OutboundPlanTableWrapper,
} from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export const OutBoundPlanPage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { openModal } = useModalStore();

  const handleSearch = useCallback(
    (number: string, startDate: string, endDate: string) => {
      setColumnFilters([
        { id: "outboundScheduleDate", value: `${startDate},${endDate}` },
        { id: "outboundScheduleNumber", value: number },
      ]);
    },
    [setColumnFilters]
  );

  const handleClickCreate = useCallback(() => {
    const modalInfo: CreateOutboundPlanModalInfo = {
      key: "createOutboundPlan",
    };

    openModal(modalInfo);
  }, [openModal]);

  return (
    <div className={styles.container}>
      <PageContentBox>
        <OutboundControlPanel
          label="출고예정"
          onSearch={handleSearch}
          onClickCreate={handleClickCreate}
        />
      </PageContentBox>
      <PageContentBox>
        <Suspense fallback={<Spinner message="출고예정 품목을 세는 중" />}>
          <OutboundPlanTableWrapper
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </Suspense>
      </PageContentBox>
    </div>
  );
};
