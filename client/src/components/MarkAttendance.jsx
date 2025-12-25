import { useState, useEffect } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import messService from '../services/messService';

const MarkAttendance = ({ onUpdate }) => {
    const getTodayDate = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [selectedDate, setSelectedDate] = useState(getTodayDate());
    const [timesVisited, setTimesVisited] = useState(null);
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchLogForDate = async () => {
        const year = selectedDate.split('-')[0];
        const month = selectedDate.split('-')[1];

        try {
            const logs = await messService.getMonthlyLogs(year, month);
            const entry = logs.find(l => l.date === selectedDate);
            if (entry) {
                setTimesVisited(entry.timesVisited);
                setReason(entry.reason || "");
            } else {
                setTimesVisited(0);
                setReason("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchLogForDate();
    }, [selectedDate]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await messService.addLog({
                date: selectedDate,
                timesVisited: timesVisited,
                reason: reason
            });

            if (onUpdate) onUpdate();
            alert("Attendance updated!");
        } catch (error) {
            console.error(error);
            alert("Error updating attendance.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="h-full flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-secondary-900 dark:text-white">Log Meals</h3>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="text-sm bg-secondary-50 dark:bg-secondary-800 border-none rounded-md px-2 py-1 text-secondary-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                </div>

                <div className="flex gap-2 mb-4">
                    {[0, 1, 2].map((count) => (
                        <button
                            key={count}
                            onClick={() => setTimesVisited(count)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${timesVisited === count
                                ? 'bg-primary-600 text-white ring-2 ring-primary-600 ring-offset-2 dark:ring-offset-secondary-900'
                                : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                                }`}
                        >
                            {count === 0 ? 'Skip' : count === 1 ? '1 Meal' : '2 Meals'}
                        </button>
                    ))}
                </div>
                {timesVisited < 2 && (
                    <div className="mb-4">
                        <Input
                            label={`Reason for ${timesVisited === 0 ? 'skipping' : 'partial attendance'}`}
                            placeholder={timesVisited === 0 ? "e.g. Sick, Out of station" : "e.g. Skipped dinner"}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                )}
            </div>

            <Button
                onClick={handleSubmit}
                variant="primary"
                className="w-full"
                isLoading={loading}
            >
                Update Log
            </Button>
        </Card>
    );
};

export default MarkAttendance;
