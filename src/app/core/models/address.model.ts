export interface Address {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string | null;
  street: string | null;
  city: string | null;
  province: string | null;
  postal_code: string | null;
  country: string | null;
  phone: string | null;
  type: 'shipping';
  is_default: boolean | number; 
}

export interface CreateAddress {
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  phone: string;
  type: 'shipping';
  is_default: boolean | number; 
}

export interface UpdateAddress {
  first_name?: string;
  last_name?: string;
  street?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
  type?: 'shipping';
  is_default?: boolean | number; 
}
