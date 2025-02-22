import { ChartData, PieChart } from "@/shared";
import { useMemo } from "react";
import { useOrderChart } from "../../model";

export const OrderPieChart = () => {
  const { data } = useOrderChart();

  const chartData: ChartData[] = useMemo(() => {
    return [
      {
        id: "발주 요청",
        label: "발주 요청",
        value: data.notApproved,
        color: "#ff0000",
      },
      {
        id: "발주 승인",
        label: "발주 승인",
        value: data.approved,
        color: "#00ff00",
      },
    ];
  }, [data]);

  return (
    <div style={{ width: "100%", aspectRatio: 1 }}>
      <PieChart
        title="입고현황"
        labels={["입하예정", "입하검사", "입고적치"]}
        dataLabel="입고현황"
        data={chartData}
      />
    </div>
  );
};
