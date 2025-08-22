import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    Box,
    Alert,
    CircularProgress,
    Snackbar,
} from '@mui/material';
import { Add as AddIcon, Save as SaveIcon } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import { timesheetAPI, dataAPI } from '../services/api';
import { Timesheet, SubRow } from '../types';
import TimesheetRow from './TimesheetRow';

const TimesheetManager: React.FC = () => {
    const { state, dispatch } = useApp();
    const { timesheets, cases, timeDurations, timesheetTypes, subRowTypes, loading, error } = state;

    const [localTimesheets, setLocalTimesheets] = useState<Timesheet[]>([]);
    const [expandedTimesheets, setExpandedTimesheets] = useState<Set<number>>(new Set());
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        setLocalTimesheets(timesheets);
    }, [timesheets]);

    const loadInitialData = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });

            // Load seed data
            const seedDataResponse = await dataAPI.getAllData();
            if (seedDataResponse.success) {
                dispatch({ type: 'SET_SEED_DATA', payload: seedDataResponse.data });
            }

            // Load existing timesheets
            const timesheetsResponse = await timesheetAPI.getAll();
            if (timesheetsResponse.success) {
                dispatch({ type: 'SET_TIMESHEETS', payload: timesheetsResponse.data });
            }
        } catch (error: any) {
            dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to load data' });
            showSnackbar('Failed to load data', 'error');
        }
    };

    const createNewTimesheet = (): Timesheet => ({
        type: '',
        date: new Date().toISOString().split('T')[0],
        case: '',
        subRows: [],
        total: 0,
    });

    const handleAddTimesheet = () => {
        const newTimesheet = createNewTimesheet();
        setLocalTimesheets([newTimesheet, ...localTimesheets]);

        // Collapse all other timesheets and expand the new one
        setExpandedTimesheets(new Set([0]));
    };

    const handleToggleExpanded = (index: number) => {
        const newExpanded = new Set(expandedTimesheets);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedTimesheets(newExpanded);
    };

    const calculateGrandTotal = (): number => {
        return localTimesheets.reduce((total, timesheet) => {
            return total + (timesheet.total || 0);
        }, 0);
    };

    const handleUpdateTimesheet = (index: number, updatedTimesheet: Timesheet) => {
        const updated = [...localTimesheets];
        updated[index] = updatedTimesheet;
        setLocalTimesheets(updated);
    };

    const handleDeleteTimesheet = async (index: number) => {
        const timesheet = localTimesheets[index];

        if (timesheet._id) {
            try {
                await timesheetAPI.delete(timesheet._id);
                dispatch({ type: 'DELETE_TIMESHEET', payload: timesheet._id });
                showSnackbar('Timesheet deleted successfully', 'success');
            } catch (error: any) {
                showSnackbar('Failed to delete timesheet', 'error');
                return;
            }
        }

        const updated = localTimesheets.filter((_, i) => i !== index);
        setLocalTimesheets(updated);
    };

    const handleSaveTimesheet = async (index: number) => {
        const timesheet = localTimesheets[index];

        // Validation - only check required fields
        if (!timesheet.case) {
            showSnackbar('Case selection is required', 'error');
            return;
        }

        if (timesheet.subRows.length === 0) {
            showSnackbar('At least one billing item is required', 'error');
            return;
        }

        try {
            if (timesheet._id) {
                // Update existing
                const response = await timesheetAPI.update(timesheet._id, timesheet);
                if (response.success) {
                    dispatch({ type: 'UPDATE_TIMESHEET', payload: response.data });
                    showSnackbar('Timesheet updated successfully', 'success');
                }
            } else {
                // Create new
                const response = await timesheetAPI.create(timesheet);
                if (response.success) {
                    dispatch({ type: 'ADD_TIMESHEET', payload: response.data });

                    // Update local state with the saved timesheet (with ID)
                    const updated = [...localTimesheets];
                    updated[index] = response.data;
                    setLocalTimesheets(updated);

                    showSnackbar('Timesheet created successfully', 'success');
                }
            }
        } catch (error: any) {
            showSnackbar(error.response?.data?.message || 'Failed to save timesheet', 'error');
        }
    };

    const handleSaveAllTimesheets = async () => {
        const unsavedTimesheets = localTimesheets.filter(ts => !ts._id);

        if (unsavedTimesheets.length === 0) {
            showSnackbar('No new timesheets to save', 'error');
            return;
        }

        try {
            dispatch({ type: 'SET_LOADING', payload: true });

            for (let i = 0; i < localTimesheets.length; i++) {
                const timesheet = localTimesheets[i];
                if (!timesheet._id) {
                    await handleSaveTimesheet(i);
                }
            }

            showSnackbar(`Saved ${unsavedTimesheets.length} timesheet(s) successfully`, 'success');
        } catch (error) {
            showSnackbar('Failed to save some timesheets', 'error');
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (loading && localTimesheets.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" component="h1">
                    Timesheet Management
                </Typography>

                <Box display="flex" gap={2}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddTimesheet}
                        size="large"
                    >
                        Add Timesheet
                    </Button>

                    {localTimesheets.some(ts => !ts._id) && (
                        <Button
                            variant="outlined"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveAllTimesheets}
                            disabled={loading}
                        >
                            Save All
                        </Button>
                    )}
                </Box>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {localTimesheets.length === 0 ? (
                <Box textAlign="center" py={8}>
                    <Typography variant="h6" color="textSecondary">
                        No timesheets yet. Click "Add Timesheet" to create your first entry.
                    </Typography>
                </Box>
            ) : (
                <Box>
                    {localTimesheets.map((timesheet, index) => (
                        <Box key={index} position="relative">
                            <TimesheetRow
                                timesheet={timesheet}
                                onUpdate={(updatedTimesheet) => handleUpdateTimesheet(index, updatedTimesheet)}
                                onDelete={() => handleDeleteTimesheet(index)}
                                cases={cases}
                                timeDurations={timeDurations}
                                timesheetTypes={timesheetTypes}
                                subRowTypes={subRowTypes}
                                isExpanded={expandedTimesheets.has(index)}
                                onToggleExpanded={() => handleToggleExpanded(index)}
                            />

                            {!timesheet._id && (
                                <Box position="absolute" top={16} right={60}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => handleSaveTimesheet(index)}
                                        disabled={loading}
                                    >
                                        Save
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    ))}

                    {/* Grand Total Display */}
                    {localTimesheets.length > 0 && (
                        <Box
                            sx={{
                                mt: 4,
                                p: 3,
                                bgcolor: 'success.main',
                                color: 'white',
                                borderRadius: 2,
                                textAlign: 'center',
                                boxShadow: 3
                            }}
                        >
                            <Typography variant="h4" fontWeight="bold">
                                Grand Total: ${calculateGrandTotal().toFixed(2)}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
                                Total from {localTimesheets.length} timesheet{localTimesheets.length !== 1 ? 's' : ''}
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default TimesheetManager;
