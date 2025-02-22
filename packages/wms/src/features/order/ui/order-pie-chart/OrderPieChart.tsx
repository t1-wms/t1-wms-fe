import { ChartData } from "@/shared";
import { lazy, useMemo } from "react";
import { useOrderChart } from "../../model";

const PieChart = lazy(() => import("@shared/pie-chart/ui/PieChart"));

export const OrderPieChart = () => {
  const { data } = useOrderChart();

  const chartData: ChartData[] = useMemo(() => {
    return [
      {
        id: "발주 요청",
        label: "발주 요청",
        value: data.notApproved,
      },
      {
        id: "발주 승인",
        label: "발주 승인",
        value: data.approved,
      },
    ];
  }, [data]);

  return (
    <div style={{ width: "100%", aspectRatio: 1 }}>
      <PieChart data={chartData} />
    </div>
  );
};
