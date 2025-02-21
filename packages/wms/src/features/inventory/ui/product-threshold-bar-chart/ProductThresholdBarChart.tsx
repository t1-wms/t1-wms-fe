import { BarChart } from "@/shared";
import { useMemo } from "react";
import { useProductThresholdChart } from "../../model";

export const ProductThresholdBarChart = () => {
  const { data } = useProductThresholdChart();

  const chartData = useMemo(() => {
    const newChartData: number[][] = [];
    newChartData.push(data.content.map((product) => product.productCount));
    newChartData.push(data.content.map((product) => product.availableQuantity));
    newChartData.push(data.content.map((product) => product.threshold));

    return newChartData;
  }, [data]);

  return (
    <div>
      <BarChart
        title="재고현황"
        labels={data.content.map((product) => product.productName)}
        dataLabel={["재고", "가용재고", "안전재고"]}
        data={chartData}
      />
    </div>
  );
};
