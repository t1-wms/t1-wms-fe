import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import styles from "./PieChart.module.css";
import { ChartData, ChartOptions } from "chart.js";

const colors = ["#392061", "#F6AE2D", "#E54F6D", "#86BBD8", "#B7F0AD"];

interface PieChartProps {
  title: string;
  labels: string[];
  dataLabel: string;
  data: number[];
}

export const PieChart = ({ title, labels, dataLabel, data }: PieChartProps) => {
  const chartData: ChartData<"doughnut"> = {
    labels,
    datasets: [
      {
        label: dataLabel,
        data,
        backgroundColor: colors,
        hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    layout: {
      padding: 16,
    },
    cutout: "20%",
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className={styles.container}>
      <h1 className="font-h4">{title}</h1>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
