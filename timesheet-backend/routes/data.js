const express = require('express');
const router = express.Router();
const { caseData, timeDurations, timesheetTypes, subRowTypes } = require('../data/seedData');

// Get all seed data
router.get('/all', (req, res) => {
    res.json({
        success: true,
        data: {
            cases: caseData,
            timeDurations,
            timesheetTypes,
            subRowTypes
        }
    });
});

// Get case data
router.get('/cases', (req, res) => {
    res.json({
        success: true,
        data: caseData
    });
});

// Get time durations
router.get('/time-durations', (req, res) => {
    res.json({
        success: true,
        data: timeDurations
    });
});

// Get timesheet types
router.get('/timesheet-types', (req, res) => {
    res.json({
        success: true,
        data: timesheetTypes
    });
});

// Get sub-row types
router.get('/sub-row-types', (req, res) => {
    res.json({
        success: true,
        data: subRowTypes
    });
});

module.exports = router;
