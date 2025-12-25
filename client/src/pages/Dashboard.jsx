import { useState, useEffect } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'
import MarkAttendance from '../components/MarkAttendance'
import { useTheme } from '../context/ThemeContext'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const { theme } = useTheme()
    const [stats, setStats] = useState(null)
    const [chartData, setChartData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [filterType, setFilterType] = useState('all') // 'all', 'skipped', '1meal', '2meals'
    const [monthlyLogs, setMonthlyLogs] = useState([])

    const fetchDashboardData = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            setLoading(false)
            return
        }

        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');

        try {
            const [statsRes, logsRes] = await Promise.all([
                fetch("http://localhost:3000/api/stats", {
                    headers: { "Authorization": `Bearer ${token}` }
                }),
                fetch(`http://localhost:3000/api/logs/month/${year}/${month}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                })
            ]);

            if (statsRes.ok) {
                const statsData = await statsRes.json();
                setStats(statsData);
            }

            if (logsRes.ok) {
                const logsData = await logsRes.json();
                setMonthlyLogs(logsData);
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // We run this effect even if logs are empty (start of month), but need stats or initial load done.
        if (loading && !stats) return;

        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');

        const daysInMonth = new Date(year, month, 0).getDate();
        const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const dataPoints = new Array(daysInMonth).fill(null);
        const reasons = new Array(daysInMonth).fill(null);

        monthlyLogs.forEach(log => {
            const day = new Date(log.date).getDate();
            if (day >= 1 && day <= daysInMonth) {
                // Apply Filter
                let shouldInclude = true;
                const visitedCount = Number(log.timesVisited);

                if (filterType === 'skipped' && visitedCount !== 0) shouldInclude = false;
                if (filterType === '1meal' && visitedCount !== 1) shouldInclude = false;
                if (filterType === '2meals' && visitedCount !== 2) shouldInclude = false;

                if (shouldInclude) {
                    dataPoints[day - 1] = visitedCount;
                    reasons[day - 1] = log.reason;
                }
            }
        });

        const backgroundColors = dataPoints.map(val => {
            if (val === 0) return 'rgba(239, 68, 68, 0.7)';
            if (val === 1) return 'rgba(59, 130, 246, 0.7)';
            if (val >= 2) return 'rgba(34, 197, 94, 0.7)';
            return 'rgba(200, 200, 200, 0.2)';
        });

        const borderColors = dataPoints.map(val => {
            if (val === 0) return 'rgb(239, 68, 68)';
            if (val === 1) return 'rgb(59, 130, 246)';
            if (val >= 2) return 'rgb(34, 197, 94)';
            return 'rgb(200, 200, 200)';
        });

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Meals Taken',
                    data: dataPoints,
                    reasons: reasons,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                    minBarLength: 8,
                },
            ],
        });

    }, [monthlyLogs, filterType, loading])

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
                labels: {
                    color: theme === 'dark' ? '#9ca3af' : '#4b5563'
                }
            },
            title: {
                display: true,
                text: 'Monthly Meal Attendance',
                color: theme === 'dark' ? '#e5e7eb' : '#1f2937'
            },
            tooltip: {
                callbacks: {
                    title: (context) => {
                        // context[0].label is the day number (e.g., "1", "24")
                        const day = context[0].label;
                        const date = new Date();
                        const year = date.getFullYear();
                        const monthName = date.toLocaleString('default', { month: 'long' });
                        return `${day} ${monthName} ${year}`;
                    },
                    label: (context) => {
                        const value = context.raw;
                        const reason = context.dataset.reasons[context.dataIndex];
                        let label = `Meals: ${value !== null ? value : 0}`;
                        if (reason) {
                            const truncatedReason = reason.length > 30 ? reason.substring(0, 30) + '...' : reason;
                            label += `\nReason: ${truncatedReason}`;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 3,
                ticks: {
                    stepSize: 1,
                    color: theme === 'dark' ? '#9ca3af' : '#4b5563'
                },
                grid: {
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                }
            },
            x: {
                ticks: {
                    color: theme === 'dark' ? '#9ca3af' : '#4b5563'
                },
                grid: {
                    display: false
                }
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-secondary-500">Loading dashboard...</div>

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Dashboard</h1>
                    <p className="text-secondary-500 dark:text-secondary-400 mt-1">
                        {stats?.messName ? `Welcome to ${stats.messName}` : 'Overview of your mess activities'}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link to="/logs">
                        <Button variant="secondary">View Logs</Button>
                    </Link>
                    <Link to="/mess-setup">
                        <Button variant="primary">Setup Mess</Button>
                    </Link>
                </div>
            </div>

            {stats ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-secondary-500 dark:text-secondary-400 font-medium">Thalis Used</span>
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                    {Math.round((stats.thalisUsed / stats.totalThalis) * 100)}%
                                </span>
                            </div>
                            <span className="text-3xl font-bold text-secondary-900 dark:text-white">
                                {stats.thalisUsed} <span className="text-base text-secondary-400 font-normal">/ {stats.totalThalis}</span>
                            </span>
                        </Card>

                        <Card className="flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-secondary-500 dark:text-secondary-400 font-medium">Days Remaining</span>
                                {stats.notify && (
                                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                        Expiring Soon
                                    </span>
                                )}
                            </div>
                            <span className="text-3xl font-bold text-secondary-900 dark:text-white">{stats.daysRemaining}</span>
                        </Card>

                        <Card className="flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-secondary-500 dark:text-secondary-400 font-medium">Amount Spent</span>
                            </div>
                            <span className="text-3xl font-bold text-secondary-900 dark:text-white">₹{stats.amountSpent}</span>
                        </Card>
                    </div>

                    {chartData && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <Card>
                                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                                        <h3 className="text-lg font-bold text-secondary-900 dark:text-white">Attendance</h3>
                                        <div className="flex bg-secondary-100 dark:bg-secondary-800 rounded-lg p-1 gap-1">
                                            {[
                                                { id: 'all', label: 'All' },
                                                { id: 'skipped', label: 'Skipped', color: 'text-red-500' },
                                                { id: '1meal', label: '1 Meal', color: 'text-blue-500' },
                                                { id: '2meals', label: '2 Meals', color: 'text-green-500' }
                                            ].map((filter) => (
                                                <button
                                                    key={filter.id}
                                                    onClick={() => setFilterType(filter.id)}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filterType === filter.id
                                                        ? 'bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white shadow-sm'
                                                        : 'text-secondary-500 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white'
                                                        }`}
                                                >
                                                    <span className={filterType === filter.id && filter.color ? filter.color : ''}>
                                                        {filter.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <Bar key={theme} options={chartOptions} data={chartData} />
                                </Card>
                            </div>
                            <div>
                                <MarkAttendance onUpdate={fetchDashboardData} />
                            </div>
                        </div>
                    )}

                    {!chartData && (
                        <div className="max-w-md mx-auto">
                            <MarkAttendance onUpdate={fetchDashboardData} />
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-8">
                        <Card>
                            <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-6">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Link to="/logs" className="block">
                                    <Button variant="secondary" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                                        <span className="text-xl">📅</span>
                                        <span>View Logs</span>
                                    </Button>
                                </Link>
                                <Link to="/mess-setup" className="block">
                                    <Button variant="secondary" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                                        <span className="text-xl">⚙️</span>
                                        <span>Mess Config</span>
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    </div>
                </>
            ) : (
                <Card className="text-center py-12">
                    <p className="text-secondary-600 dark:text-secondary-300 mb-4">No mess configured yet.</p>
                    <Link to="/mess-setup">
                        <Button variant="primary">Setup Now</Button>
                    </Link>
                </Card>
            )}
        </div>
    )
}

export default Dashboard
