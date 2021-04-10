export type Image = {
  url: string;
}

export type Unit = {
  name: string;
}

export type ProductVariant = {
  unit: Unit;
  unit_value: string;
  images: Image[];
  price: number;
}

export type Product = {
  id: number;
  name: string;
  symbol: string;
  productVariances: ProductVariant[];
};

export type Category = {

};


declare module 'react-redux-multilingual';