import { BarChart, BarChartData } from "@/shared";
import { useMemo } from "react";
import { useProductThresholdChart } from "../../model";

const indexBy = "productName";
const keys: string[] = ["productCount", "availableQuantity"];

export const ProductThresholdBarChart = () => {
  const { data } = useProductThresholdChart();

  const chartData: BarChartData[] = useMemo(() => {
    const newChartData: BarChartData[] = [];

    data.content.forEach((product) => {
      newChartData.push({
        productName: product.productName,
        productCount: product.productCount,
        availableQuantity: product.availableQuantity,
      });
    });

    return newChartData;
  }, [data]);

  return (
    <div style={{ width: "100%", aspectRatio: 2 }}>
      <BarChart indexBy={indexBy} keys={keys} data={chartData} />
    </div>
  );
};
