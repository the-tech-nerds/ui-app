import React from 'react';
import Head from 'next/head';
import '../../../components/categories/category.module.scss';
import ActiveOffers from "../../../components/products/offer/offers";
import {Offer} from "../../../types";

type Offers = {
    off: Offer;
};

const OfferDetail = ({ off }: Offers) => {
    return (
        <div>
            <Head>
                <title>Khan Fresh Corner | Product details.</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div>
            </div>
        </div>
    )
}

OfferDetail.getInitialProps = async (ctx: any) => {
    let offers: Offer[] = ctx.query.offers?.data.results || null;
    return {
        off: offers,
    }
}

export default OfferDetail;
