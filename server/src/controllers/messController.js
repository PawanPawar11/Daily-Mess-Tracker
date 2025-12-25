import Mess from "../models/Mess.js";

// @desc    Create or Update Mess configuration
// @route   POST /api/mess/create
// @access  Private
const createOrUpdateMess = async (req, res, next) => {
    try {
        const { messName, startDate, totalThalis, amountPerThali } = req.body;

        let mess = await Mess.findOne({ userId: req.user._id });

        if (mess) {
            mess.messName = messName;
            mess.startDate = startDate;
            mess.totalThalis = totalThalis;
            mess.amountPerThali = amountPerThali;

            const updatedMess = await mess.save();
            return res.json({ message: "Mess updated", mess: updatedMess });
        }

        const newMess = await Mess.create({
            userId: req.user._id,
            messName,
            startDate,
            totalThalis,
            amountPerThali,
        });

        res.status(201).json({ message: "Mess created", mess: newMess });
    } catch (error) {
        next(error);
    }
};

// @desc    Get Mess details
// @route   GET /api/mess/details
// @access  Private
const getMessDetails = async (req, res, next) => {
    try {
        const mess = await Mess.findOne({ userId: req.user._id });
        res.json(mess || {});
    } catch (error) {
        next(error);
    }
};

export { createOrUpdateMess, getMessDetails };
