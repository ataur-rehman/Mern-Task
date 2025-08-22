const Joi = require('joi');

const subRowValidation = Joi.object({
    type: Joi.string().valid('Working Time', 'Travel Time', 'Kilometers').required(),
    rate: Joi.number().min(0).required(),
    quantity: Joi.number().min(0).required(),
    status: Joi.boolean().default(false),
    amount: Joi.number().min(0)
});

const timesheetValidation = Joi.object({
    type: Joi.string().valid('Project Work', 'Client Meeting', 'Training', 'Administrative', 'Other', '').required(),
    date: Joi.date().required(),
    case: Joi.string().required(),
    description: Joi.string().trim().allow('').optional(),
    subRows: Joi.array().items(subRowValidation).optional(),
    total: Joi.number().optional()
});

const updateTimesheetValidation = Joi.object({
    type: Joi.string().valid('Project Work', 'Client Meeting', 'Training', 'Administrative', 'Other', ''),
    date: Joi.date(),
    case: Joi.string(),
    description: Joi.string().trim().allow('').optional(),
    subRows: Joi.array().items(subRowValidation),
    total: Joi.number().optional()
});

module.exports = {
    timesheetValidation,
    updateTimesheetValidation
};
