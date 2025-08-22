const mongoose = require('mongoose');

const subRowSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Working Time', 'Travel Time', 'Kilometers']
    },
    rate: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: Boolean,
        default: false // false = not billable, true = billable
    },
    amount: {
        type: Number,
        default: 0
    }
}, { _id: true });

const timesheetSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Project Work', 'Client Meeting', 'Training', 'Administrative', 'Other', '']
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    case: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    total: {
        type: Number,
        default: 0
    },
    subRows: [subRowSchema]
}, {
    timestamps: true
});

// Pre-save middleware to calculate amounts and total
timesheetSchema.pre('save', function (next) {
    this.subRows.forEach(subRow => {
        subRow.amount = subRow.rate * subRow.quantity;
    });

    // Calculate total
    this.total = this.subRows.reduce((sum, subRow) => sum + subRow.amount, 0);

    next();
});

module.exports = mongoose.model('Timesheet', timesheetSchema);
