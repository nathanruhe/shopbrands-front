import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    private buildUrl(endpoint: string): string {
        return `${this.baseUrl}/${endpoint.replace(/^\/+/, '')}`;
    }

    private buildHeaders(customHeaders?: { [key: string]: string }): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...customHeaders
        });
    }

    get<T>(endpoint: string, customHeaders?: { [key: string]: string }): Observable<T> {
        return this.http.get<T>(this.buildUrl(endpoint), { headers: this.buildHeaders(customHeaders) });
    }

    post<T>(endpoint: string, body: any, customHeaders?: { [key: string]: string }): Observable<T> {
        return this.http.post<T>(this.buildUrl(endpoint), body, { headers: this.buildHeaders(customHeaders) });
    }

    put<T>(endpoint: string, body: any, customHeaders?: { [key: string]: string }): Observable<T> {
        return this.http.put<T>(this.buildUrl(endpoint), body, { headers: this.buildHeaders(customHeaders) });
    }

    delete<T>(endpoint: string, customHeaders?: { [key: string]: string }): Observable<T> {
        return this.http.delete<T>(this.buildUrl(endpoint), { headers: this.buildHeaders(customHeaders) });
    }
}
