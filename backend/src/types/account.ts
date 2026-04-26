export interface Account {
  id: string;
  title: string;
  description: string;
  price: number;
  category_id: number | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateAccountDTO {
  title: string;
  description: string;
  price: number;
}

export interface UpdateAccountDTO {
  title?: string;
  description?: string;
  price?: number;
  status?: 'available' | 'sold' | 'pending';
}
