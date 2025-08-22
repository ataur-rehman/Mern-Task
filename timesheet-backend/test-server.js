const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { caseData, timeDurations, timesheetTypes, subRowTypes } = require('./data/seedData');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test routes without database
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Timesheet API is running (test mode)',
        timestamp: new Date().toISOString()
    });
});

// Seed data endpoint (without database)
app.get('/api/data/all', (req, res) => {
    const seedData = {
        cases: caseData,
        timeDurations: timeDurations,
        timesheetTypes: timesheetTypes,
        subRowTypes: subRowTypes
    };

    res.json({
        success: true,
        data: seedData
    });
});

// Dummy timesheets endpoint for testing
app.get('/api/timesheets', (req, res) => {
    res.json({
        success: true,
        data: []
    });
});

app.post('/api/timesheets', (req, res) => {
    res.json({
        success: true,
        message: 'Timesheet created successfully (test mode)',
        data: { ...req.body, _id: 'test-id-' + Date.now() }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Test server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📋 Seed data: http://localhost:${PORT}/api/data/all`);
    console.log(`💡 This is a test server without MongoDB connection`);
});

module.exports = app;
