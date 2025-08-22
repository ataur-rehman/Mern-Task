export interface SubRow {
    _id?: string;
    type: 'Working Time' | 'Travel Time' | 'Kilometers';
    rate: number;
    quantity: number;
    status: boolean; // billable status
    amount: number;
}

export interface Timesheet {
    _id?: string;
    type: 'Project Work' | 'Client Meeting' | 'Training' | 'Administrative' | 'Other' | '';
    date: string;
    case: string;
    description?: string; // Made optional
    subRows: SubRow[];
    total?: number; // Added total field
    createdAt?: string;
    updatedAt?: string;
}

export interface CaseData {
    name: string;
    rate: number;
}

export interface TimeDuration {
    label: string;
    value: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    errors?: string[];
}
