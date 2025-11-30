export interface GameAccount {
  id: number;
  gameTitle: string;
  image: string;
  description: string;
  price: string;
  badge?: string;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  code: string;
  bgColor: string;
  image: string;
  textColor?: string;
}

export interface GameCategory {
  id: number;
  title: string;
  image: string;
}
