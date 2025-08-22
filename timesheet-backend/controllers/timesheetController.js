const Timesheet = require('../models/Timesheet');
const { timesheetValidation, updateTimesheetValidation } = require('../validation/timesheetValidation');

// Get all timesheets
const getTimesheets = async (req, res) => {
    try {
        const timesheets = await Timesheet.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: timesheets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching timesheets',
            error: error.message
        });
    }
};

// Get single timesheet
const getTimesheet = async (req, res) => {
    try {
        const timesheet = await Timesheet.findById(req.params.id);

        if (!timesheet) {
            return res.status(404).json({
                success: false,
                message: 'Timesheet not found'
            });
        }

        res.json({
            success: true,
            data: timesheet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching timesheet',
            error: error.message
        });
    }
};

// Create new timesheet
const createTimesheet = async (req, res) => {
    try {
        // Validate request body
        const { error, value } = timesheetValidation.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.details.map(detail => detail.message)
            });
        }

        const timesheet = new Timesheet(value);
        await timesheet.save();

        res.status(201).json({
            success: true,
            message: 'Timesheet created successfully',
            data: timesheet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating timesheet',
            error: error.message
        });
    }
};

// Update timesheet
const updateTimesheet = async (req, res) => {
    try {
        // Validate request body
        const { error, value } = updateTimesheetValidation.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.details.map(detail => detail.message)
            });
        }

        const timesheet = await Timesheet.findByIdAndUpdate(
            req.params.id,
            value,
            { new: true, runValidators: true }
        );

        if (!timesheet) {
            return res.status(404).json({
                success: false,
                message: 'Timesheet not found'
            });
        }

        res.json({
            success: true,
            message: 'Timesheet updated successfully',
            data: timesheet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating timesheet',
            error: error.message
        });
    }
};

// Delete timesheet
const deleteTimesheet = async (req, res) => {
    try {
        const timesheet = await Timesheet.findByIdAndDelete(req.params.id);

        if (!timesheet) {
            return res.status(404).json({
                success: false,
                message: 'Timesheet not found'
            });
        }

        res.json({
            success: true,
            message: 'Timesheet deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting timesheet',
            error: error.message
        });
    }
};

module.exports = {
    getTimesheets,
    getTimesheet,
    createTimesheet,
    updateTimesheet,
    deleteTimesheet
};
