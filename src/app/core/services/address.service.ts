import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Address, CreateAddress, UpdateAddress } from '../models/address.model';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    private readonly endpoint = 'addresses';

    constructor(private api: ApiService) {}

    /**
     * Crear una nueva dirección para el usuario autenticado.
     * 
     * @param {CreateAddress} data - Objeto con los datos de la dirección, incluyendo opcionalmente is_default.
     * @returns {Observable<Address>} Observable con la dirección creada.
     */
    createAddress(data: CreateAddress): Observable<Address> {
        return this.api.post<Address>(this.endpoint, data);
    }

    /**
     * Obtener todas las direcciones del usuario autenticado.
     * El backend las retorna ordenadas, poniendo la predeterminada (is_default: 1) primero.
     * 
     * @returns {Observable<Address[]>} Lista de direcciones del usuario.
     */
    getUserAddresses(): Observable<Address[]> {
        return this.api.get<Address[]>(this.endpoint);
    }

    /**
     * Actualizar una dirección existente (actualización parcial).
     * 
     * @param {number} id - ID único de la dirección.
     * @param {UpdateAddress} data - Campos a actualizar. Puede incluir is_default: true para marcarla como principal.
     * @returns {Observable<Address>} Observable con la dirección actualizada.
     */
    updateAddress(id: number, data: UpdateAddress): Observable<Address> {
        return this.api.put<Address>(`${this.endpoint}/${id}`, data);
    }

    /**
     * Eliminar una dirección del sistema.
     * 
     * @param {number} id - ID de la dirección a eliminar.
     * @returns {Observable<void>}
     */
    deleteAddress(id: number): Observable<void> {
        return this.api.delete<void>(`${this.endpoint}/${id}`);
    }

    /**
     * Método de conveniencia para marcar una dirección como predeterminada.
     * 
     * @param {number} id - ID de la dirección que se quiere establecer como principal.
     * @returns {Observable<Address>}
     */
    setDefaultAddress(id: number): Observable<Address> {
        return this.updateAddress(id, { is_default: true });
    }
}
