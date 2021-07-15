import React from 'react';
import Head from 'next/head';
import '../../../components/categories/category.module.scss';
import ActiveOffers from "../../../components/products/offer/offers";
import {Offer, Shop} from "../../../types";
import {useSelector} from "react-redux";

const OfferList = () => {
    const currentShop: Shop = useSelector(state => state.shops.current);
    return (
        <div>
            <Head>
                <title>Khan Fresh Corner | Product details.</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div>
                <ActiveOffers fetchUrl={`/offer/list/${currentShop?.id}`}/>
            </div>
        </div>
    )
}
export default OfferList;
