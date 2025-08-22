import React, { useState } from 'react';
import {
    Box,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    IconButton,
    Typography,
    Checkbox,
    FormControlLabel,
    Collapse,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Add as AddIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Timesheet, SubRow, CaseData, TimeDuration } from '../types';
// @ts-ignore
import SubRowComponent from './SubRowComponent';

interface TimesheetRowProps {
    timesheet: Timesheet;
    onUpdate: (timesheet: Timesheet) => void;
    onDelete: () => void;
    cases: CaseData[];
    timeDurations: TimeDuration[];
    timesheetTypes: string[];
    subRowTypes: string[];
    isExpanded: boolean;
    onToggleExpanded: () => void;
}

const TimesheetRow: React.FC<TimesheetRowProps> = ({
    timesheet,
    onUpdate,
    onDelete,
    cases,
    timeDurations,
    timesheetTypes,
    subRowTypes,
    isExpanded,
    onToggleExpanded,
}) => {
    const [showSubRows, setShowSubRows] = useState(timesheet.subRows.length > 0);

    const handleInputChange = (field: keyof Timesheet, value: any) => {
        const updatedTimesheet = { ...timesheet, [field]: value };

        // If case is changed, auto-fill rate in ALL sub-rows
        if (field === 'case' && cases.length > 0) {
            const selectedCase = cases.find(c => c.name === value);
            if (selectedCase && updatedTimesheet.subRows.length > 0) {
                updatedTimesheet.subRows = updatedTimesheet.subRows.map(subRow => ({
                    ...subRow,
                    rate: selectedCase.rate,
                    amount: selectedCase.rate * subRow.quantity
                }));
            }
        }

        // Calculate total
        updatedTimesheet.total = updatedTimesheet.subRows.reduce((sum, subRow) => sum + subRow.amount, 0);

        onUpdate(updatedTimesheet);
    };

    const handleTypeChange = (value: string) => {
        const updatedTimesheet = { ...timesheet, type: value as any };

        // Show subrows and add first sub-row only when a valid type is selected (not empty)
        if (value && value !== '' && updatedTimesheet.subRows.length === 0) {
            const newSubRow: SubRow = {
                type: 'Working Time',
                rate: 0,
                quantity: 0.1, // Default to 6 minutes (00:06:00)
                status: false,
                amount: 0,
            };
            updatedTimesheet.subRows = [newSubRow];
            setShowSubRows(true);
        } else if (value && value !== '') {
            setShowSubRows(true);
        } else {
            setShowSubRows(false);
        }

        onUpdate(updatedTimesheet);
    };

    const handleSubRowUpdate = (index: number, subRow: SubRow) => {
        const updatedSubRows = [...timesheet.subRows];
        updatedSubRows[index] = subRow;
        const updatedTimesheet = { ...timesheet, subRows: updatedSubRows };

        // Calculate total
        updatedTimesheet.total = updatedSubRows.reduce((sum, subRow) => sum + subRow.amount, 0);

        onUpdate(updatedTimesheet);
    };

    const handleSubRowDelete = (index: number) => {
        const updatedSubRows = timesheet.subRows.filter((_, i) => i !== index);
        const updatedTimesheet = { ...timesheet, subRows: updatedSubRows };

        // Calculate total
        updatedTimesheet.total = updatedSubRows.reduce((sum, subRow) => sum + subRow.amount, 0);

        onUpdate(updatedTimesheet);

        if (updatedSubRows.length === 0) {
            setShowSubRows(false);
        }
    };

    const handleAddBillingItem = () => {
        // Get rate from selected case if available
        let defaultRate = 0;
        if (timesheet.case && cases.length > 0) {
            const selectedCase = cases.find(c => c.name === timesheet.case);
            if (selectedCase) {
                defaultRate = selectedCase.rate;
            }
        }

        const newSubRow: SubRow = {
            type: 'Working Time',
            rate: defaultRate,
            quantity: 0.1, // Default to 6 minutes (00:06:00)
            status: false,
            amount: defaultRate * 0.1,
        };

        const updatedSubRows = [...timesheet.subRows, newSubRow];
        const updatedTimesheet = { ...timesheet, subRows: updatedSubRows };

        // Calculate total
        updatedTimesheet.total = updatedSubRows.reduce((sum, subRow) => sum + subRow.amount, 0);

        onUpdate(updatedTimesheet);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h6">Timesheet Entry</Typography>
                        <IconButton
                            onClick={onToggleExpanded}
                            size="small"
                            sx={{ ml: 1 }}
                        >
                            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    </Box>
                    <IconButton onClick={onDelete} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Box>

                <Collapse in={isExpanded}>
                    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={2} mb={2}>
                        <FormControl fullWidth required>
                            <InputLabel id="type-select-label">Type</InputLabel>
                            <Select
                                labelId="type-select-label"
                                value={timesheet.type}
                                onChange={(e) => handleTypeChange(e.target.value)}
                                label="Type"
                            >
                                <MenuItem value="">
                                    <em>Select Type</em>
                                </MenuItem>
                                {timesheetTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <DatePicker
                            label="Date"
                            value={dayjs(timesheet.date)}
                            onChange={(newValue: Dayjs | null) => {
                                if (newValue) {
                                    handleInputChange('date', newValue.format('YYYY-MM-DD'));
                                }
                            }}
                            slotProps={{ textField: { fullWidth: true, required: true } }}
                        />

                        <FormControl fullWidth required>
                            <InputLabel>Case</InputLabel>
                            <Select
                                value={timesheet.case}
                                onChange={(e) => handleInputChange('case', e.target.value)}
                                label="Case"
                            >
                                {cases.map((caseItem) => (
                                    <MenuItem key={caseItem.name} value={caseItem.name}>
                                        {caseItem.name} (${caseItem.rate}/hr)
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <TextField
                        label="Description (Optional)"
                        value={timesheet.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                        sx={{ mb: 2 }}
                    />

                    {showSubRows && timesheet.type !== '' && timesheet.subRows.length > 0 && (
                        <Box mt={3}>
                            <Typography variant="subtitle1" gutterBottom>
                                Billing Items
                            </Typography>
                            {timesheet.subRows.map((subRow, index) => (
                                <SubRowComponent
                                    key={index}
                                    subRow={subRow}
                                    onUpdate={(updatedSubRow: SubRow) => handleSubRowUpdate(index, updatedSubRow)}
                                    onDelete={() => handleSubRowDelete(index)}
                                    timeDurations={timeDurations}
                                    subRowTypes={subRowTypes}
                                />
                            ))}

                            <Button
                                startIcon={<AddIcon />}
                                onClick={handleAddBillingItem}
                                variant="outlined"
                                sx={{ mt: 2 }}
                            >
                                Add Billing Item
                            </Button>
                        </Box>
                    )}
                </Collapse>
            </Paper>
        </LocalizationProvider>
    );
};

export default TimesheetRow;
