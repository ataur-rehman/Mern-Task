// Case data with fixed rates
const caseData = [
    { name: 'Legal Consultation', rate: 150 },
    { name: 'Contract Review', rate: 120 },
    { name: 'Court Hearing', rate: 200 },
    { name: 'Research & Analysis', rate: 100 },
    { name: 'Document Preparation', rate: 80 },
    { name: 'Client Meeting', rate: 130 },
    { name: 'Mediation', rate: 160 },
    { name: 'Arbitration', rate: 180 },
    { name: 'Due Diligence', rate: 140 },
    { name: 'Corporate Filing', rate: 90 }
];

// Time duration options for Working Time and Travel Time (in HH:MM:SS format)
const timeDurations = [
    { label: '00:06:00', value: 0.1, hours: 0, minutes: 6, seconds: 0 },
    { label: '00:12:00', value: 0.2, hours: 0, minutes: 12, seconds: 0 },
    { label: '00:18:00', value: 0.3, hours: 0, minutes: 18, seconds: 0 },
    { label: '00:24:00', value: 0.4, hours: 0, minutes: 24, seconds: 0 },
    { label: '00:30:00', value: 0.5, hours: 0, minutes: 30, seconds: 0 },
    { label: '00:36:00', value: 0.6, hours: 0, minutes: 36, seconds: 0 },
    { label: '00:42:00', value: 0.7, hours: 0, minutes: 42, seconds: 0 },
    { label: '00:48:00', value: 0.8, hours: 0, minutes: 48, seconds: 0 },
    { label: '00:54:00', value: 0.9, hours: 0, minutes: 54, seconds: 0 },
    { label: '01:00:00', value: 1.0, hours: 1, minutes: 0, seconds: 0 },
    { label: '01:06:00', value: 1.1, hours: 1, minutes: 6, seconds: 0 },
    { label: '01:12:00', value: 1.2, hours: 1, minutes: 12, seconds: 0 },
    { label: '01:18:00', value: 1.3, hours: 1, minutes: 18, seconds: 0 },
    { label: '01:24:00', value: 1.4, hours: 1, minutes: 24, seconds: 0 },
    { label: '01:30:00', value: 1.5, hours: 1, minutes: 30, seconds: 0 },
    { label: '02:00:00', value: 2.0, hours: 2, minutes: 0, seconds: 0 },
    { label: '02:30:00', value: 2.5, hours: 2, minutes: 30, seconds: 0 },
    { label: '03:00:00', value: 3.0, hours: 3, minutes: 0, seconds: 0 },
    { label: '04:00:00', value: 4.0, hours: 4, minutes: 0, seconds: 0 },
    { label: '05:00:00', value: 5.0, hours: 5, minutes: 0, seconds: 0 },
    { label: '06:00:00', value: 6.0, hours: 6, minutes: 0, seconds: 0 },
    { label: '07:00:00', value: 7.0, hours: 7, minutes: 0, seconds: 0 },
    { label: '08:00:00', value: 8.0, hours: 8, minutes: 0, seconds: 0 }
];

// Type options for main timesheet
const timesheetTypes = [
    'Project Work',
    'Client Meeting',
    'Training',
    'Administrative',
    'Other'
];

// Sub-row types
const subRowTypes = [
    'Working Time',
    'Travel Time',
    'Kilometers'
];

module.exports = {
    caseData,
    timeDurations,
    timesheetTypes,
    subRowTypes
};
