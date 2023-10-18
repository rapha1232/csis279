export type Listing = {
  product_id: number;
  seller_id: number;
  title: string;
  description: string;
  price: number;
  category_id: number;
  image: string;
  date_posted: string;
};

export type User = {
  user_id: number;
  user_firstName: string;
  user_lastName: string;
  email: string;
  password: string;
};

export type Service = {
  servide_id: number;
  provider_id: number;
  title: string;
  description: string;
  rate: number;
  avaialability: string;
  category_id: number;
  image: string;
  date_posted: string;
};

export type CartEntry = {
  cart_id: number;
  product: Listing;
  quantity: number;
};

export type Cart = {
  user_id: number;
  products: CartEntry[];
};
