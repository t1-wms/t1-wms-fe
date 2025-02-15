import { PageContentBox, Spinner } from "@/shared";
import styles from "./OutboundAssignPage.module.css";
import {
  OutboundAssignTableWrapper,
  OutboundControlPanel,
  OutboundPlanListDrawer,
} from "@/features";
import { Suspense, useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export const OutboundAssignPage = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = useCallback(
    (number: string, startDate: string, endDate: string) => {
      setColumnFilters([
        { id: "outboundAssignDate", value: `${startDate},${endDate}` },
        { id: "outboundAssignNumber", value: number },
      ]);
    },
    [setColumnFilters]
  );

  const handleClickCreate = useCallback(() => {
    setDrawerOpen(true);
  }, [setDrawerOpen]);

  return (
    <div className={styles.container}>
      <PageContentBox>
        <OutboundControlPanel
          label="출고지시"
          onSearch={handleSearch}
          onClickCreate={handleClickCreate}
        />
      </PageContentBox>
      <PageContentBox>
        <Suspense fallback={<Spinner message="출고지시 품목을 세는 중" />}>
          <OutboundAssignTableWrapper
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </Suspense>
      </PageContentBox>
      {isDrawerOpen && (
        <OutboundPlanListDrawer onClose={() => setDrawerOpen(false)} />
      )}
    </div>
  );
};
