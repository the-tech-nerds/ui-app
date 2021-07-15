import { type } from "os";

export type Image = {
    url: string;
}

export type Unit = {
    name: string;
}

export type ProductVariant = {
    id: number;
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
    image: string;
};

export type Category = {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
    children: Category[];
    images: Image[];
};

export type Shop = {
    id: number;
    name: string;
    description: string;
    type_id: number;
    is_active: boolean;
    address: string;
    images: Image[];
}

export type AxiosDefaultResponseData<T> = {
    message: string[];
    data: T;
    code: number;
}

export type AxiosDefaultResponse<T> = {
    status: number;
    data: AxiosDefaultResponseData<T>,
}

export type Offer = {
    id: number;
    name: string;
    description: string;
    status: number;
    total_price: number;
    offer_detail: string;
    start_date: Date;
    image: string;
    end_date: Date;
    stock: number;
    slug: string;
}

export type OfferItem = {
    offer: Offer,
    images: string []
}
export type Address = {
    name: string;
    details: string;
    area_id: number;
    city_id: number;
    division_id: number;
    postcode: string;
    contact_no: string;
    lat: number;
    long: number;
    is_default: boolean;
    is_active: boolean;
    city: City;
    area: Area;
    division: Division;
}

export type City = {
    id: number;
    name: string;
    division_id: number;
}
export type Division = {
    id: number;
    name: string;
}
export type Area = {
    id: number;
    name: string;
    city_id: number;
}
declare module 'react-redux-multilingual';
