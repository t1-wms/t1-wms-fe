import { BarChartData } from "@/shared";
import { lazy, useMemo } from "react";
import { useProductThresholdChart } from "../../model";

const BarChart = lazy(() => import("@shared/bar-chart/ui/BarChart"));

const indexBy = "productName";
const keys: string[] = ["재고량", "가용재고량"];

export const ProductThresholdBarChart = () => {
  const { data } = useProductThresholdChart();

  const chartData: BarChartData[] = useMemo(() => {
    const newChartData: BarChartData[] = [];

    data.content.forEach((product) => {
      newChartData.push({
        productName: product.productName,
        재고량: product.productCount,
        가용재고량: product.availableQuantity,
      });
    });

    return newChartData;
  }, [data]);

  return (
    <div style={{ width: "100%", aspectRatio: 3 }}>
      <BarChart indexBy={indexBy} keys={keys} data={chartData} />
    </div>
  );
};
