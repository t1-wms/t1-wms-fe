import { BarChart } from "@/shared";
import { useProductThresholdChart } from "../../model";
import { useMemo } from "react";

export const ProductThresholdBarChart = () => {
  const { data } = useProductThresholdChart();

  const chartData = useMemo(() => {
    const newChartData: number[][] = [];
    newChartData.push(data.content.map((product) => product.productThreshold));
    newChartData.push(data.content.map((product) => product.productCount));

    return newChartData;
  }, [data]);

  return (
    <div>
      <BarChart
        title="재고현황"
        labels={data.content.map((product) => product.productName)}
        dataLabel={["안전재고", "재고"]}
        data={chartData}
      />
    </div>
  );
};
