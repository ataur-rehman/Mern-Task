import React, { useState, useEffect } from 'react';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import { TimeDuration } from '../types';

interface EditableTimeInputProps {
    value: number;
    onChange: (value: number) => void;
    timeDurations: TimeDuration[];
    label?: string;
}

const EditableTimeInput: React.FC<EditableTimeInputProps> = ({
    value,
    onChange,
    timeDurations,
    label = 'Quantity'
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [timeString, setTimeString] = useState('00:06:00');
    const [showDropdown, setShowDropdown] = useState(false);

    // Convert value to time string
    useEffect(() => {
        // Always convert the current value to HH:MM:SS format for display
        const totalSeconds = Math.round(value * 3600);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const currentTimeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        setTimeString(currentTimeString);
    }, [value]);

    const handleTimeStringChange = (newTimeString: string) => {
        setTimeString(newTimeString);
    };

    const handleTimeStringBlur = () => {
        // Parse the time string and convert to decimal hours
        const timeRegex = /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        const match = timeString.match(timeRegex);

        if (match) {
            const hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
            const seconds = parseInt(match[3], 10);

            // Validate the time
            if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59) {
                const totalSeconds = hours * 3600 + minutes * 60 + seconds;
                const decimalHours = totalSeconds / 3600;
                onChange(decimalHours);
            }
        }
        setIsEditing(false);
    }; const handleDropdownChange = (selectedValue: number) => {
        onChange(selectedValue);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <TextField
                label={label}
                value={timeString}
                onChange={(e) => handleTimeStringChange(e.target.value)}
                onBlur={handleTimeStringBlur}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleTimeStringBlur();
                    }
                }}
                placeholder="HH:MM:SS"
                fullWidth
                autoFocus
                size="small"
            />
        );
    }

    if (isEditing) {
        return (
            <TextField
                label={label}
                value={timeString}
                onChange={(e) => handleTimeStringChange(e.target.value)}
                onBlur={handleTimeStringBlur}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleTimeStringBlur();
                    }
                }}
                placeholder="HH:MM:SS"
                fullWidth
                autoFocus
                size="small"
            />
        );
    }

    if (showDropdown) {
        return (
            <FormControl fullWidth required size="small">
                <InputLabel>{label}</InputLabel>
                <Select
                    open={true}
                    value={value}
                    onChange={(e) => {
                        handleDropdownChange(e.target.value as number);
                        setShowDropdown(false);
                    }}
                    onClose={() => setShowDropdown(false)}
                    label={label}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 200,
                                width: 150,
                            },
                        },
                    }}
                >
                    {timeDurations.map((duration) => (
                        <MenuItem key={duration.value} value={duration.value}>
                            {duration.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    return (
        <TextField
            label={label}
            value={timeString}
            onClick={() => setIsEditing(true)}
            InputProps={{
                readOnly: true,
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowDropdown(true);
                            }}
                            size="small"
                            edge="end"
                        >
                            <ArrowDropDownIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            fullWidth
            size="small"
            sx={{
                cursor: 'text',
                '& .MuiInputBase-input': {
                    cursor: 'text'
                }
            }}
            title="Click to edit time manually, or click arrow for dropdown"
        />
    );
};

export default EditableTimeInput;
