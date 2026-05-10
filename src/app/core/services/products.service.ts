import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Product, CreateProduct, UpdateProduct } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private readonly endpoint = 'products';

    constructor(private api: ApiService) {}

    /**
     * Obtiene todos los productos.
     * Se pueden aplicar filtros opcionales de categorías y paginación.
     * @param categories IDs de categorías para filtrar (opcional)
     * @param limit Número máximo de resultados (opcional)
     * @param offset Desplazamiento para paginación (opcional)
     * @returns Observable con arreglo de productos
     */
    getAll(categories?: number[], limit?: number, offset?: number): Observable<Product[]> {
        let query = '';
        const params: string[] = [];
        if (categories?.length) params.push(`categories=${categories.join(',')}`);
        if (limit !== undefined) params.push(`limit=${limit}`);
        if (offset !== undefined) params.push(`offset=${offset}`);
        if (params.length) query = `?${params.join('&')}`;

        return this.api.get<Product[]>(`${this.endpoint}${query}`);
    }

    /**
     * Obtiene un producto específico por su ID.
     * @param id ID del producto
     * @returns Observable con el producto
     */
    getById(id: number): Observable<Product> {
        return this.api.get<Product>(`${this.endpoint}/${id}`);
    }

    /**
     * Crea un nuevo producto.
     * Convierte automáticamente a FormData si incluye imagen o categorías.
     * @param product Datos del producto a crear
     * @returns Observable con mensaje de éxito e ID del producto
     */
    create(product: CreateProduct): Observable<{ message: string; id: number }> {
        const formData = this.toFormData(product);
        return this.api.post<{ message: string; id: number }>(this.endpoint, formData);
    }

    /**
     * Actualiza un producto existente.
     * Convierte automáticamente a FormData si incluye imagen o categorías.
     * @param id ID del producto
     * @param product Datos a actualizar
     * @returns Observable con el producto actualizado
     */
    update(id: number, product: UpdateProduct): Observable<Product> {
        const formData = this.toFormData(product);
        return this.api.put<Product>(`${this.endpoint}/${id}`, formData);
    }

    /**
     * Elimina un producto por su ID.
     * @param id ID del producto a eliminar
     * @returns Observable con mensaje de éxito
     */
    delete(id: number): Observable<{ message: string }> {
        return this.api.delete<{ message: string }>(`${this.endpoint}/${id}`);
    }

    /**
     * Convierte un objeto product a FormData para envío en multipart/form-data.
     * - Si el objeto incluye `categories` como array, lo convierte a CSV.
     * - Si el objeto incluye un `File`, lo agrega directamente.
     * - Para otros valores, los convierte a string.
     * @param product Objeto CreateProduct o UpdateProduct
     * @returns FormData listo para enviar
     */
    private toFormData(product: CreateProduct | UpdateProduct): FormData {
        const formData = new FormData();
        Object.keys(product).forEach(key => {
            const value: any = (product as any)[key];
            if (value !== undefined && value !== null) {
                if (key === 'categories' && Array.isArray(value)) {
                    formData.append(key, value.join(','));
                } else if (value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, value.toString());
                }
            }
        });
        return formData;
    }
}

