import { useState, useEffect } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'

const MessLogs = () => {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentDate, setCurrentDate] = useState(new Date())

    // Helper to format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    const fetchLogs = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');

        try {
            const res = await fetch(`http://localhost:3000/api/logs/month/${year}/${month}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setLogs(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const downloadCSV = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');

        try {
            const res = await fetch(`http://localhost:3000/api/export/csv/${year}/${month}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `mess-logs-${year}-${month}.csv`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                alert("Failed to download CSV");
            }
        } catch (error) {
            console.error(error);
            alert("Error downloading CSV");
        }
    }

    useEffect(() => {
        fetchLogs();
    }, [currentDate])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Mess Logs</h1>
                    <p className="text-secondary-500 dark:text-secondary-400 mt-1">History of meals</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={downloadCSV} variant="secondary">
                        Export CSV
                    </Button>
                    <Button onClick={fetchLogs} variant="secondary">
                        Refresh
                    </Button>
                </div>
            </div>

            <Card className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-secondary-50 dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">Meals Taken</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">Reason</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary-100 dark:divide-secondary-800 bg-white dark:bg-secondary-950">
                            {loading ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-8 text-center text-secondary-500 dark:text-secondary-400">
                                        Loading logs...
                                    </td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-secondary-900 dark:text-white font-medium">No logs found</p>
                                            <p className="text-secondary-500 dark:text-secondary-400 text-sm">Start tracking your meals to see history.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log._id} className="hover:bg-secondary-50 dark:hover:bg-secondary-900/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900 dark:text-white">
                                            {formatDate(log.date)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 dark:text-secondary-300">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${log.timesVisited > 0
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                                                }`}>
                                                {log.timesVisited === 1 ? '1 Meal' : log.timesVisited === 2 ? '2 Meals' : 'Skipped'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 dark:text-secondary-300">
                                            {log.reason || "-"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}

export default MessLogs