import Root from 'components/layouts/Root';
import React from 'react';
import Head from 'next/head';
import '../../../components/categories/category.module.scss';
import LeftSideBar from "components/products/left-sidebar";
type ProductSlug = {
    product: any;
};

const productDetails = ({ product }: ProductSlug) => {
    return (
        <div>
            <Head>
                <title>Khan Fresh Corner | Product details.</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Root>
                <LeftSideBar product={product} />
            </Root>
        </div>
    )
}

productDetails.getInitialProps = (ctx: any) => {
    return {
        product: ctx.query.product.data,
    }
}

export default productDetails;
