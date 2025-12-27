export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: 'admin' | 'customer';
    phone?: string | null;
}

export interface UpdateProfile {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
}

export interface DeleteResponse {
    message: string;
}