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

function DigitChart({ counts }) {
  const data = {
    labels: counts.map((item) => String(item.digit)),
    datasets: [
      {
        label: "出現回数",
        data: counts.map((item) => item.count),
        backgroundColor: "rgba(108, 168, 255, 0.75)",
        borderColor: "rgba(108, 168, 255, 1)",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#dbe8ff",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#dbe8ff",
          precision: 0,
        },
        grid: {
          color: "rgba(159, 183, 220, 0.12)",
        },
      },
    },
  };

  if (counts.length === 0) {
    return <p>まだグラフに表示できるデータがありません。</p>;
  }

  return (
    <div className="chart-card">
      <Bar data={data} options={options} />
    </div>
  );
}

export default DigitChart;