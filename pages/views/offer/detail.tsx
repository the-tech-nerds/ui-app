import React from 'react';
import Head from 'next/head';
import '../../../components/categories/category.module.scss';
import {OfferItem} from "../../../types";
import OfferItemDetail from "../../../components/products/offer/offer-details";
import {fetchProductDetailsApi} from "../../../api/product";
import {fetchOfferDetailsApi} from "../../../api/offer";

export type OfferDetailType = {
    off: OfferItem;
};

const OfferDetail = ({ off }: OfferDetailType) => {
    return (
        <div>
            <Head>
                <title>Khan Fresh Corner | Product details.</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div>
                {off && <OfferItemDetail item={off}/>}
            </div>
        </div>
    )
}

OfferDetail.getInitialProps = async (ctx: any) => {
    let item: OfferItem= ctx.query.offers?.data || null;
    if (!item) {
        const slug = ctx.query.offer;
        const response = await fetchOfferDetailsApi(slug);
        if (response) {
            item = response?.data?.offers?.data;
        }
    }
    return {
        off: item,
    }
}

export default OfferDetail;
