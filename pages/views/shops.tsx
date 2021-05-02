import React from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { Shop } from 'types';
import { selectShop } from 'actions';

type ShopListProps = {
    shops: Shop[];
    current: Shop;
}

const ShopList= ({ shops, current }: ShopListProps) => {
    const dispatch = useDispatch();
    return (
        <div className="d-flex flex-row p-5 m-5">
            {shops.map((shop: Shop) => (
                <div
                    key={shop.id} 
                    className={`jumbotron d-flex p-5 m-2 align-items-center justify-content-center
                                ${current.id === shop.id ? 'shop--selected': ''} shop`}
                    onClick={() => dispatch(selectShop(shop))}
                >
                    {shop.name}
                </div>
            ))}
        </div>
    );
}

const Shops = () => {
    const { shops = [], selected = 0 } = useSelector(state => ({
        shops: state.shops.list,
        selected: state.shops.current,
    }));
    console.log(shops, selected)
    return(
        <div>
            <Head>
                <title>Khan Fresh Corner | Shop List`.</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <ShopList shops={shops} current={selected} />
        </div>
    )
};

export default Shops;
