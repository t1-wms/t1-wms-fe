import { ResponsivePie } from "@nivo/pie";
import { ChartData } from "../model";

interface PieChartProps {
  data: ChartData[];
}

const PieChart = ({ data }: PieChartProps) => {
  return (
    <ResponsivePie
      data={data.filter((item) => item.value > 0)}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      activeOuterRadiusOffset={8}
      padAngle={1}
      cornerRadius={4}
      colors={{ scheme: "tableau10" }}
      enableArcLinkLabels={false}
      enableArcLabels={false}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 75,
          itemHeight: 18,
          itemTextColor: "#1e293b",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
