/*
So what do I need here?
Well, I need firstly a calender that help the user to pick the date at which he ate at the mess.
Then, I need a drop box that will tell user to select between three values 0, 1, 2. Which determines the
number of times the user has gone to mess at that specific date.
Then I will need the user to give me reason for not going to mess. I can easily do that by adding 
an input field.
*/

import React, { useEffect, useState } from 'react'

const MessLogs = () => {
    const token = localStorage.getItem("token");

    const [logs, setLogs] = useState([]);
    const [month, setMonth] = useState("01");
    const [year, setYear] = useState("2025");

    const [date, setDate] = useState("");
    const [timesVisited, setTimesVisited] = useState(0);
    const [reason, setReason] = useState("");

    const fetchLogs = async () => {
        const res = await fetch(`http://localhost:3000/api/logs/month/${year}/${month}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        setLogs(data);
    }

    useEffect(() => {
        fetchLogs();
    }, [year, month])

    const submitLog = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/api/logs/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                date,
                timesVisited,
                reason
            })
        })

        const data = await res.json();

        alert(data.message);

        fetchLogs();
    }
    return (
        <div>
            <h2>Daily Mess Logs</h2>

            <form onSubmit={submitLog}>
                <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <br /><br />

                <select
                    value={timesVisited}
                    onChange={(e) => setTimesVisited(Number(e.target.value))}
                >
                    <option value={0}>0 times</option>
                    <option value={1}>1 times</option>
                    <option value={2}>2 times</option>
                </select>
                <br /><br />

                {
                    timesVisited === 0 && (
                        <>
                            <input
                                type="text"
                                placeholder="Reason for not going"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                            <br /><br />
                        </>
                    )
                }

                <button>Save Log</button>
            </form>

            <hr />

            <h3>View Logs by Month</h3>

            <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option>2025</option>
                <option>2024</option>
            </select>

            <select value={month} onChange={(e) => setMonth(e.target.value)}>
                {
                    ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map(m => (
                        <option key={m}>{m}</option>
                    ))
                }
            </select>
            <br /><br />

            {
                logs.map((log) => (
                    <li key={log._id}>
                        {log.date} → {log.timesVisited} times
                        {log.reason && ` (Reason: ${log.reason})`}
                    </li>
                ))
            }
        </div>
    )
}

export default MessLogs