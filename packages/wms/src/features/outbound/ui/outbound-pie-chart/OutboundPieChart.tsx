import { ChartData, PieChart } from "@/shared";
import { useMemo } from "react";
import { useOutboundChart } from "../../model";

export const OutboundPieChart = () => {
  const { data } = useOutboundChart();

  const chartData: ChartData[] = useMemo(() => {
    return [
      {
        id: "출고예정",
        label: "출고예정",
        value: data.outboundSchedule,
      },
      {
        id: "출고지시",
        label: "출고지시",
        value: data.outboundAssign,
      },
      {
        id: "출고피킹",
        label: "출고피킹",
        value: data.outboundPicking,
      },
      {
        id: "출고패킹",
        label: "출고패킹",
        value: data.outboundPacking,
      },
      {
        id: "출하상차",
        label: "출하상차",
        value: data.outboundLoading,
      },
    ];
  }, [data]);

  return (
    <div style={{ width: "100%", aspectRatio: 1 }}>
      <PieChart data={chartData} />
    </div>
  );
};
