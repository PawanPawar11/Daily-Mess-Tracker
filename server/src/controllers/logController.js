import MessLog from "../models/MessLog.js";

// @desc    Add or update a meal log
// @route   POST /api/logs/add
// @access  Private
const addOrUpdateLog = async (req, res, next) => {
    try {
        const { date, timesVisited, reason } = req.body;

        const log = await MessLog.findOne({ userId: req.user._id, date });

        if (log) {
            log.timesVisited = timesVisited;
            log.reason = reason || "";
            await log.save();
            return res.json({ message: "Log updated", log });
        }

        const newLog = await MessLog.create({
            userId: req.user._id,
            date,
            timesVisited,
            reason,
        });

        res.status(201).json({ message: "Log created", log: newLog });
    } catch (error) {
        next(error);
    }
};

// @desc    Get logs for a specific month
// @route   GET /api/logs/month/:year/:month
// @access  Private
const getMonthlyLogs = async (req, res, next) => {
    try {
        const { month, year } = req.params;

        const prefix = `${year}-${month.padStart(2, "0")}`;

        const logs = await MessLog.find({
            userId: req.user._id,
            date: { $regex: `^${prefix}` },
        });

        res.json(logs);
    } catch (error) {
        next(error);
    }
};

// @desc    Export logs as CSV
// @route   GET /api/export/csv/:year/:month
// @access  Private
// ... imports
import Mess from "../models/Mess.js";

// ... existing code ...

// @desc    Export logs as CSV
// @route   GET /api/export/csv/:year/:month
// @access  Private
const exportLogsCsv = async (req, res, next) => {
    try {
        const { year, month } = req.params;
        const prefix = `${year}-${month.padStart(2, "0")}`;

        // Fetch logs and mess in parallel
        const [logs, mess] = await Promise.all([
            MessLog.find({
                userId: req.user._id,
                date: { $regex: `^${prefix}` },
            }).sort({ date: 1 }),
            Mess.findOne({ userId: req.user._id })
        ]);

        const messName = mess ? mess.messName : "Unknown Mess";

        let csv = "Date,Mess Name,Times Visited,Reason\n";

        logs.forEach((log) => {
            csv += `${log.date},"${messName}",${log.timesVisited},"${log.reason || ""}"\n`;
        });

        res.header("Content-Type", "text/csv");
        res.attachment(`mess-logs-${prefix}.csv`);
        res.send(csv);
    } catch (error) {
        next(error);
    }
};

export { addOrUpdateLog, getMonthlyLogs, exportLogsCsv };
