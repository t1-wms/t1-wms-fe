import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import styles from "./HorizontalBarChart.module.css";
import { ChartData, ChartOptions } from "chart.js";

interface BarChartProps {
  title: string;
  labels: string[];
  data: number[];
  dataLabel: string;
}

const colors = ["#1C60B8", "#F5E0B4"];

export const HorizontalBarChart = ({
  title,
  labels,
  data,
  dataLabel,
}: BarChartProps) => {
  const chartData: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: dataLabel,
        data,
        backgroundColor: colors,
        barPercentage: 1.0,
        categoryPercentage: 0.7,
        borderRadius: {
          bottomRight: 4,
          topRight: 4,
        },
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    indexAxis: "y",
    layout: {
      padding: 20,
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={styles.container}>
      <h1 className="font-h4">{title}</h1>
      <Bar data={chartData} options={options} />
    </div>
  );
};
