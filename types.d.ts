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
    slug: string;
    productVariances: ProductVariant[];
    images: Image[];
};

export type Category = {};


declare module 'react-redux-multilingual';
