import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Timesheet, CaseData, TimeDuration } from '../types';

interface AppState {
    timesheets: Timesheet[];
    cases: CaseData[];
    timeDurations: TimeDuration[];
    timesheetTypes: string[];
    subRowTypes: string[];
    loading: boolean;
    error: string | null;
}

type AppAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_TIMESHEETS'; payload: Timesheet[] }
    | { type: 'ADD_TIMESHEET'; payload: Timesheet }
    | { type: 'UPDATE_TIMESHEET'; payload: Timesheet }
    | { type: 'DELETE_TIMESHEET'; payload: string }
    | { type: 'SET_SEED_DATA'; payload: { cases: CaseData[]; timeDurations: TimeDuration[]; timesheetTypes: string[]; subRowTypes: string[] } };

const initialState: AppState = {
    timesheets: [],
    cases: [],
    timeDurations: [],
    timesheetTypes: [],
    subRowTypes: [],
    loading: false,
    error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'SET_TIMESHEETS':
            return { ...state, timesheets: action.payload, loading: false };
        case 'ADD_TIMESHEET':
            return { ...state, timesheets: [action.payload, ...state.timesheets] };
        case 'UPDATE_TIMESHEET':
            return {
                ...state,
                timesheets: state.timesheets.map(t =>
                    t._id === action.payload._id ? action.payload : t
                ),
            };
        case 'DELETE_TIMESHEET':
            return {
                ...state,
                timesheets: state.timesheets.filter(t => t._id !== action.payload),
            };
        case 'SET_SEED_DATA':
            return {
                ...state,
                cases: action.payload.cases,
                timeDurations: action.payload.timeDurations,
                timesheetTypes: action.payload.timesheetTypes,
                subRowTypes: action.payload.subRowTypes,
            };
        default:
            return state;
    }
};

const AppContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
