import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private readonly endpoint = 'categories';

    constructor(private api: ApiService) {}

    /**
     * Obtiene todas las categorías.
     * @returns Observable con arreglo de categorías
     */
    getAll(): Observable<Category[]> {
        return this.api.get<Category[]>(this.endpoint);
    }
}