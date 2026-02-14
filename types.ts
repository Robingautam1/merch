export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  imageHover: string;
  slug: string;
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
  color?: string;
  customDesign?: string; // URL or identifier for custom asset
}

export interface CustomizerState {
  selectedColor: string;
  printLocation: 'front' | 'back' | 'sleeve';
  uploadedImage: string | null;
  quantity: number;
  selectedSize: string;
}

export type Category = {
  id: string;
  name: string;
  image: string;
  description: string;
};