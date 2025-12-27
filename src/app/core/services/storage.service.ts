import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    /**
     * Guardar un valor en localStorage.
     * Convierte objetos a JSON automáticamente.
     * @param key Clave bajo la cual se guarda el valor
     * @param value Valor a guardar (string, number, object, array, etc.)
     */
    set(key: string, value: any): void {
        try {
        const storedValue = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, storedValue);
        } catch (error) {
        console.error(`Error guardando la clave ${key} en localStorage`, error);
        }
    }

    /**
     * Obtener un valor de localStorage.
     * Intenta parsear JSON automáticamente.
     * @param key Clave del valor a obtener
     * @returns Valor almacenado o null si no existe
     */
    get<T = any>(key: string): T | null {
        const value = localStorage.getItem(key);
        if (!value) return null;
        try {
        return JSON.parse(value) as T;
        } catch {
        return value as unknown as T;
        }
    }

    /**
     * Eliminar un valor de localStorage.
     * @param key Clave del valor a eliminar
     */
    remove(key: string): void {
        localStorage.removeItem(key);
    }

    /**
     * Limpiar todo el localStorage.
     */
    clear(): void {
        localStorage.clear();
    }

    /**
     * Guardar un valor en sessionStorage.
     * Convierte objetos a JSON automáticamente.
     * @param key Clave bajo la cual se guarda el valor
     * @param value Valor a guardar
     */
    setSession(key: string, value: any): void {
        try {
        const storedValue = typeof value === 'string' ? value : JSON.stringify(value);
        sessionStorage.setItem(key, storedValue);
        } catch (error) {
        console.error(`Error guardando la clave ${key} en sessionStorage`, error);
        }
    }

    /**
     * Obtener un valor de sessionStorage.
     * Intenta parsear JSON automáticamente.
     * @param key Clave del valor a obtener
     * @returns Valor almacenado o null si no existe
     */
    getSession<T = any>(key: string): T | null {
        const value = sessionStorage.getItem(key);
        if (!value) return null;
        try {
        return JSON.parse(value) as T;
        } catch {
        return value as unknown as T;
        }
    }

    /**
     * Eliminar un valor de sessionStorage.
     * @param key Clave del valor a eliminar
     */
    removeSession(key: string): void {
        sessionStorage.removeItem(key);
    }

    /**
     * Limpiar todo el sessionStorage.
     */
    clearSession(): void {
        sessionStorage.clear();
    }
}
