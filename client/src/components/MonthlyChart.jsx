import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

export default function MonthlyChart({ logs }) {
    const data = {
        labels: logs.map((log) => log.date),
        datasets: [
            {
                label: "Times Visited",
                data: logs.map((log) => log.timesVisited),
            },
        ],
    };

    return (
        <div style={{ maxWidth: "700px", marginTop: "30px" }}>
            <h3>Monthly Visit Count</h3>
            <Bar data={data} />
        </div>
    );
}
