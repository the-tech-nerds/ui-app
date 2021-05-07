import React from 'react';
import Head from 'next/head';
import ComponentWishlist from 'components/pages/wishlist.jsx';
import { useSelector } from 'react-redux';

const WishList = () => {
    const wishlist = useSelector(state => state?.wishlist?.list);
    return (
        <div>
            <Head>
                <title>Khan Fresh Corner | The best place to find fresh vegetables.</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <ComponentWishlist wishlist={wishlist} />
        </div>
    );
}

export default WishList;