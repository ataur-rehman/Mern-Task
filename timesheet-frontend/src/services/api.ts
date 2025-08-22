import axios from 'axios';
import { Timesheet, ApiResponse, CaseData, TimeDuration } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Timesheet APIs
export const timesheetAPI = {
    getAll: (): Promise<ApiResponse<Timesheet[]>> =>
        api.get('/timesheets').then(res => res.data),

    getById: (id: string): Promise<ApiResponse<Timesheet>> =>
        api.get(`/timesheets/${id}`).then(res => res.data),

    create: (timesheet: Omit<Timesheet, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Timesheet>> =>
        api.post('/timesheets', timesheet).then(res => res.data),

    update: (id: string, timesheet: Partial<Timesheet>): Promise<ApiResponse<Timesheet>> =>
        api.put(`/timesheets/${id}`, timesheet).then(res => res.data),

    delete: (id: string): Promise<ApiResponse<void>> =>
        api.delete(`/timesheets/${id}`).then(res => res.data),
};

// Data APIs
export const dataAPI = {
    getAllData: (): Promise<ApiResponse<{
        cases: CaseData[];
        timeDurations: TimeDuration[];
        timesheetTypes: string[];
        subRowTypes: string[];
    }>> =>
        api.get('/data/all').then(res => res.data),

    getCases: (): Promise<ApiResponse<CaseData[]>> =>
        api.get('/data/cases').then(res => res.data),

    getTimeDurations: (): Promise<ApiResponse<TimeDuration[]>> =>
        api.get('/data/time-durations').then(res => res.data),

    getTimesheetTypes: (): Promise<ApiResponse<string[]>> =>
        api.get('/data/timesheet-types').then(res => res.data),

    getSubRowTypes: (): Promise<ApiResponse<string[]>> =>
        api.get('/data/sub-row-types').then(res => res.data),
};

export default api;
