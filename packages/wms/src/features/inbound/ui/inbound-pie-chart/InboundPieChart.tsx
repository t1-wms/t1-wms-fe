import { PieChart } from "@/shared";
import { useInboundChart } from "../../model";

export const InboundPieChart = () => {
  const { data } = useInboundChart();

  return (
    <div>
      <PieChart
        title="입고현황"
        labels={["입하예정", "입하검사", "입고적치"]}
        dataLabel="입고현황"
        data={[data.inboundSchedule, data.inboundCheck, data.inboundPutAway]}
      />
    </div>
  );
};
