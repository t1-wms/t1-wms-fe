import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import styles from "./BarChart.module.css";
import { ChartData, ChartOptions } from "chart.js";

interface BarChartProps {
  title: string;
  labels: string[];
  dataLabel: string[];
  data: number[][];
}

const colors = ["#1C60B8", "#F5E0B4"];

export const BarChart = ({ title, data, labels, dataLabel }: BarChartProps) => {
  const chartData: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: dataLabel[0],
        data: data[0],
        backgroundColor: "#00000000",
        barPercentage: 1.0,
        categoryPercentage: 0.9,
        borderColor: "#ff0000",
        borderWidth: {
          top: 8,
        },
        borderSkipped: false,
      },
      {
        label: dataLabel[1],
        data: data[1],
        backgroundColor: colors[0],
        barPercentage: 1.0,
        categoryPercentage: 0.9,
        borderRadius: {
          topLeft: 4,
          topRight: 4,
        },
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    layout: {
      padding: 20,
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
        stacked: true,
      },
      y: {
        display: false,
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
