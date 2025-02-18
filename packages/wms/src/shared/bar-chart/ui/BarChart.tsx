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

const colors = [
  "#392061ff",
  "#392061ee",
  "#392061dd",
  "#392061cc",
  "#392061bb",
  "#392061aa",
  "#39206199",
  "#39206188",
  "#39206177",
  "#39206166",
];
const colors2 = [
  "#E54F6D",
  "#fe5d26ee",
  "#fe5d26dd",
  "#fe5d26cc",
  "#fe5d26bb",
  "#fe5d26aa",
  "#fe5d2699",
  "#fe5d2688",
  "#fe5d2677",
  "#fe5d2666",
];

export const BarChart = ({ title, data, labels, dataLabel }: BarChartProps) => {
  const chartData: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: dataLabel[0],
        data: data[0],
        backgroundColor: colors2[0],
        barPercentage: 1.0,
        categoryPercentage: 0.9,
        borderRadius: {
          topLeft: 4,
          topRight: 4,
        },
      },
      {
        label: dataLabel[1],
        data: data[1],
        backgroundColor: colors,
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
