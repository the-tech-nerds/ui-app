import React from 'react';
import Head from 'next/head';
import '../../../components/categories/category.module.scss';
import LeftSideBar from "components/products/left-sidebar";
import { fetchProductDetailsApi } from '../../../api/product';
import { Product } from 'types';

type ProductSlug = {
    pro: Product;
};

const ProductDetails = ({ pro }: ProductSlug) => {
    return (
        <div>
            <Head>
                <title>Khan Fresh Corner | Product details.</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div>
                <LeftSideBar product={pro} />
            </div>
        </div>
    )
}

ProductDetails.getInitialProps = async (ctx: any) => {
    let product: Product = ctx.query.productDetails?.data || null;
    if (!product) {
        const slug = ctx.query.product;
        const productDetailsResponse = await fetchProductDetailsApi(slug);
        if (productDetailsResponse) {
            product = productDetailsResponse?.data?.product?.data;
        }
    }
    return {
        pro: product,
    }
}

export default ProductDetails;
