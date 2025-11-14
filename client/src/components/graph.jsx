import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function CommitChart({ commitData }) {
  const now = new Date();
  const labels = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(d.toLocaleString("default", { month: "short" }));
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Commits per Month",
        data: commitData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderRadius: 6,
        borderColor: "#3b82f6",
        borderWidth: 2,
        fill: false,
        tension: 0.4, // smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    elements: { line: { borderJoinStyle: "round" } },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div className="h-16 w-32">
      <Line data={data} options={options} />
    </div>
  );
}
