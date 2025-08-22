import React from 'react';
import {
    Box,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Checkbox,
    FormControlLabel,
    Typography,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { SubRow, TimeDuration } from '../types';
import EditableTimeInput from './EditableTimeInput';

interface SubRowComponentProps {
    subRow: SubRow;
    onUpdate: (subRow: SubRow) => void;
    onDelete: () => void;
    timeDurations: TimeDuration[];
    subRowTypes: string[];
}

const SubRowComponent: React.FC<SubRowComponentProps> = ({
    subRow,
    onUpdate,
    onDelete,
    timeDurations,
    subRowTypes,
}) => {
    const handleInputChange = (field: keyof SubRow, value: any) => {
        const updatedSubRow = { ...subRow, [field]: value };

        // Auto-calculate amount when rate or quantity changes
        if (field === 'rate' || field === 'quantity') {
            updatedSubRow.amount = updatedSubRow.rate * updatedSubRow.quantity;
        }

        onUpdate(updatedSubRow);
    };

    const renderQuantityInput = () => {
        if (subRow.type === 'Kilometers') {
            return (
                <TextField
                    label="Quantity (km)"
                    type="number"
                    value={Math.round(subRow.quantity)}
                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                    required
                    fullWidth
                    inputProps={{ min: 0, step: 1 }}
                />
            );
        }

        return (
            <EditableTimeInput
                value={subRow.quantity}
                onChange={(value) => handleInputChange('quantity', value)}
                timeDurations={timeDurations}
                label="Quantity"
            />
        );
    };

    return (
        <Paper
            elevation={1}
            sx={{
                p: 2,
                mb: 2,
                ml: 2,
                borderLeft: '4px solid #1976d2',
                backgroundColor: '#f8f9fa'
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle2" color="primary">
                    Billing Item
                </Typography>
                <IconButton onClick={onDelete} color="error" size="small">
                    <DeleteIcon />
                </IconButton>
            </Box>

            <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={2}>
                <FormControl fullWidth required>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={subRow.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        label="Type"
                    >
                        {subRowTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Rate ($)"
                    type="number"
                    value={subRow.rate}
                    onChange={(e) => handleInputChange('rate', parseFloat(e.target.value) || 0)}
                    required
                    fullWidth
                    inputProps={{ min: 0, step: 0.01 }}
                />

                {renderQuantityInput()}

                <TextField
                    label="Amount ($)"
                    value={subRow.amount.toFixed(2)}
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={subRow.status}
                            onChange={(e) => handleInputChange('status', e.target.checked)}
                        />
                    }
                    label="Billable"
                />
            </Box>
        </Paper>
    );
};

export default SubRowComponent;
