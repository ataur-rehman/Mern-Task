const express = require('express');
const router = express.Router();
const {
    getTimesheets,
    getTimesheet,
    createTimesheet,
    updateTimesheet,
    deleteTimesheet
} = require('../controllers/timesheetController');

// Routes
router.get('/', getTimesheets);
router.get('/:id', getTimesheet);
router.post('/', createTimesheet);
router.put('/:id', updateTimesheet);
router.delete('/:id', deleteTimesheet);

module.exports = router;
