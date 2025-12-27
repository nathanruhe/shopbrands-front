import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
    Login,
    LoginResponse,
    Register,
    ChangePassword,
    ForgotPassword,
    ResetPassword,
    MessageResponse
} from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private baseUrl = `${environment.apiUrl}/auth`;

    constructor(private http: HttpClient) {}

    login(data: Login): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data);
    }

    register(data: Register): Observable<MessageResponse> {
        return this.http.post<MessageResponse>(`${this.baseUrl}/register`, data);
    }

    changePassword(data: ChangePassword): Observable<MessageResponse> {
        return this.http.put<MessageResponse>(`${this.baseUrl}/change-password`, data);
    }

    forgotPassword(data: ForgotPassword): Observable<MessageResponse> {
        return this.http.post<MessageResponse>(`${this.baseUrl}/forgot-password`, data);
    }

    resetPassword(data: ResetPassword): Observable<MessageResponse> {
        return this.http.post<MessageResponse>(`${this.baseUrl}/reset-password`, data);
    }
}
