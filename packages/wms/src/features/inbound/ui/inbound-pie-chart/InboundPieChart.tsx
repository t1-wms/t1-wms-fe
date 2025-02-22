import { ChartData, PieChart } from "@/shared";
import { useMemo } from "react";
import { useInboundChart } from "../../model";

export const InboundPieChart = () => {
  const { data } = useInboundChart();

  const chartData: ChartData[] = useMemo(() => {
    return [
      {
        id: "입하예정",
        label: "입하예정",
        value: data.inboundSchedule,
      },
      {
        id: "입하검사",
        label: "입하검사",
        value: data.inboundCheck,
      },
      {
        id: "입고적치",
        label: "입고적치",
        value: data.inboundPutAway,
      },
    ];
  }, [data]);

  return (
    <div style={{ width: "100%", aspectRatio: 1 }}>
      <PieChart data={chartData} />
    </div>
  );
};
