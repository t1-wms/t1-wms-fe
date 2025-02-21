import { HorizontalBarChart } from "@/shared";
import { useOrderChart } from "../../model";

export const OrderBarChart = () => {
  const { data } = useOrderChart();

  return (
    <div>
      <HorizontalBarChart
        title="발주현황"
        labels={["발주 요청", "발주 승인"]}
        dataLabel="발주"
        data={[data.notApproved, data.approved]}
      />
    </div>
  );
};
