import { User } from './user.model';

export interface Register {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: 'customer';
    phone?: string | null;
}

export interface Login {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface ChangePassword {
    current_password: string;
    new_password: string;
}

export interface ForgotPassword {
    email: string;
}

export interface ResetPassword {
    token: string;
    new_password: string;
}

export interface MessageResponse {
    message: string;
}
