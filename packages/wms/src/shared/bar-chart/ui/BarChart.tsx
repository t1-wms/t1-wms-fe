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
  "#392061ef",
  "#392061df",
  "#392061cf",
  "#392061bf",
  "#392061af",
  "#3920619f",
  "#3920618f",
  "#3920617f",
  "#3920616f",
];
const colors2 = [
  "#E54F6D",
  "#E54F6Def",
  "#E54F6Ddf",
  "#E54F6Dcf",
  "#E54F6Dbf",
  "#E54F6Daf",
  "#E54F6D9f",
  "#E54F6D8f",
  "#E54F6D7f",
  "#E54F6D6f",
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
