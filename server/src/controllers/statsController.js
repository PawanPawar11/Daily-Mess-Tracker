import Mess from "../models/Mess.js";
import MessLog from "../models/MessLog.js";

// @desc    Get dashboard stats
// @route   GET /api/stats
// @access  Private
const getStats = async (req, res, next) => {
    try {
        // -----------------------------------------
        // FETCH USER MESS DETAILS
        // -----------------------------------------
        const mess = await Mess.findOne({ userId: req.user._id });

        if (!mess) {
            res.status(404);
            throw new Error("No mess found");
        }

        // -----------------------------------------
        // CALCULATE DAYS PASSED
        // -----------------------------------------
        const startDate = new Date(mess.startDate);
        const today = new Date();

        const diffMs = today - startDate;
        const daysPassed = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        // -----------------------------------------
        // FETCH ALL LOGS TO CALCULATE THALIS USED
        // -----------------------------------------
        const logs = await MessLog.find({ userId: req.user._id });

        const thalisUsed = logs.reduce(
            (sum, entry) => sum + (entry.timesVisited || 0),
            0
        );

        // -----------------------------------------
        // CALCULATIONS
        // -----------------------------------------
        // const thalisRemaining = mess.totalThalis - thalisUsed;
        const thalisRemaining = Math.max(0, mess.totalThalis - thalisUsed); // Ensuring non-negative

        const totalDays = mess.totalThalis / 2; // assuming 2 thalis max per day
        const daysRemaining = Math.max(0, Math.ceil(totalDays - daysPassed));

        const amountSpent = (thalisUsed * mess.amountPerThali).toFixed(2);

        const notify = daysRemaining <= 2;

        res.json({
            messName: mess.messName,
            totalThalis: mess.totalThalis,
            thalisUsed,
            thalisRemaining,
            startDate: mess.startDate,
            daysPassed,
            daysRemaining,
            amountPerThali: mess.amountPerThali,
            amountSpent,
            notify,
        });
    } catch (error) {
        next(error);
    }
};

export { getStats };
