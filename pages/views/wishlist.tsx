import Root from 'components/layouts/Root';
import React from 'react';
import Head from 'next/head';
import ComponentWishlist from 'components/pages/wishlist.jsx';

const WishList = ({ wishlist }: any) => (<div>
    <Head>
        <title>Khan Fresh Corner | The best place to find fresh vegetables.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Root>
        <ComponentWishlist wishlist={wishlist} />
    </Root>
</div>)

export async function getServerSideProps(ctx: any) {
    return {
        props: {
            wishlist: ctx.query.wishlist
        }
    };
}

export default WishList;