export interface Product {
    id: number;
    name: string;
    description: string;
    image_url: string;
    price: number;
    stock: number;
    size: string;
    color: string;
    sku: string;
    categories: number[];
}

export interface CreateProduct {
    name: string;
    description: string;
    price: number;
    stock: number;
    size: string;
    color: string;
    sku: string;
    categories: number[];
    image: File; // obligatorio para creación
}

export interface UpdateProduct {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    size?: string;
    color?: string;
    sku?: string;
    categories?: number[];
    image?: File;
}

export interface DeleteProduct {
    message: string;
}