export interface Account {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  status: 'available' | 'sold' | 'pending';
  created_at: Date;
  updated_at: Date;
}

export interface CreateAccountDTO {
  title: string;
  description: string;
  price: number;
  category: string;
}

export interface UpdateAccountDTO {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  status?: 'available' | 'sold' | 'pending';
}
