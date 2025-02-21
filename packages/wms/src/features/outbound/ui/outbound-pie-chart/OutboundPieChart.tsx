import { PieChart } from "@/shared";
import { useOutboundChart } from "../../model";

export const OutboundPieChart = () => {
  const { data } = useOutboundChart();

  return (
    <div>
      <PieChart
        title="출고현황"
        labels={["출고예정", "출고지시", "출고피킹", "출고패킹", "출하상차"]}
        dataLabel="출고현황"
        data={[
          data.outboundSchedule,
          data.outboundAssign,
          data.outboundPicking,
          data.outboundPacking,
          data.outboundLoading,
        ]}
      />
    </div>
  );
};
