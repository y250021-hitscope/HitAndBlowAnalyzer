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
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
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