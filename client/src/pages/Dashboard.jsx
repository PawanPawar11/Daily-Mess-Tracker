import { useEffect, useState } from "react";

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const token = localStorage.getItem("token");

    const fetchStats = async () => {
        const res = await fetch("http://localhost:5000/api/stats", {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setStats(data);
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (!stats) return <div style={{ padding: 20 }}>Loading dashboard...</div>;

    return (
        <div style={{ padding: 20 }}>
            <h2>{stats.messName} — Dashboard</h2>

            {stats.notify && (
                <div
                    style={{
                        backgroundColor: "#ffe6e6",
                        color: "#b30000",
                        padding: "10px",
                        borderRadius: "5px",
                        marginBottom: "15px",
                    }}
                >
                    ⚠️ Your mess plan is ending in {stats.daysRemaining} day(s).
                </div>
            )}

            <p><b>Total Thalis:</b> {stats.totalThalis}</p>
            <p><b>Used Thalis:</b> {stats.thalisUsed}</p>
            <p><b>Remaining Thalis:</b> {stats.thalisRemaining}</p>

            <hr />

            <p><b>Days Passed:</b> {stats.daysPassed}</p>
            <p><b>Days Remaining:</b> {stats.daysRemaining}</p>

            <hr />

            <p><b>Amount Per Thali:</b> ₹{stats.amountPerThali}</p>
            <p><b>Amount Spent:</b> ₹{stats.amountSpent}</p>
        </div>
    );
}
