import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function CoexistChart({ counts }) {
  if (counts.length === 0) {
    return <p>共起データがありません。</p>;
  }

  const data = {
    labels: counts.map((item) => String(item.digit)),
datasets: [
  {
    label: "共起率",
    data: counts.map((item) => item.percent),

    backgroundColor: [
      "#ff4d6d",
      "#00b4ff",
      "#4cd137",
      "#fbc531",
      "#9c6bff",
      "#ff7f50",
      "#00d2d3",
      "#ff9ff3",
      "#2ed573",
      "#ffa502",
    ],

    borderWidth: 0,

    borderRadius: 10,

    barPercentage: 0.75,

    categoryPercentage: 0.8,
  },
],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const item = counts[context.dataIndex];
            return `${item.count}回（${item.percent}%）`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: "#dbe8ff",
          callback: (value) => `${value}%`,
        },
        grid: {
          color: "rgba(159, 183, 220, 0.12)",
        },
      },
      y: {
        ticks: {
          color: "#dbe8ff",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="chart-card">
      <Bar data={data} options={options} />
    </div>
  );
}

export default CoexistChart;