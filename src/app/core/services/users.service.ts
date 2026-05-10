import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { 
    User, 
    UpdateProfile, 
    ChangePassword, 
    DeleteProfile, 
    MessageResponse 
} from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    // private baseUrl = `${environment.apiUrl}/users`;
    private readonly endpoint = 'users';

    // constructor(private http: HttpClient) {}
    constructor(private api: ApiService) {}

    // userProfile (): Observable<User> {
    //     return this.http.get<User>(`${this.baseUrl}/me`);
    // }
    getProfile(): Observable<User> {
        return this.api.get<User>(`${this.endpoint}/me`);
    }

    updateProfile(data: UpdateProfile): Observable<User> {
        return this.api.put<User>(`${this.endpoint}/me`, data);
    }

    changePassword(data: ChangePassword): Observable<MessageResponse> {
        return this.api.put<MessageResponse>(`${this.endpoint}/security`, data);
    }

    deleteProfile(): Observable<DeleteProfile> {
        return this.api.delete<DeleteProfile>(`${this.endpoint}/me`);
    }

}