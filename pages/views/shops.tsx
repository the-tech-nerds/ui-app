import React from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { Shop } from 'types';
import { fetchItemsForCategory, selectShop } from 'actions';
import Image from 'components/image/image';

type ShopListProps = {
    shops: Shop[];
    current: Shop;
}

const ShopList = ({ shops, current }: ShopListProps) => {
    const dispatch = useDispatch();
    return (
        <div className="d-flex flex-row p-5 m-5">
            {shops.map((shop: Shop) => (
                <div
                    key={shop.id}
                    className={`d-flex flex-column  m-2 shop`}
                    onClick={() => {
                        dispatch(selectShop(shop));
                        dispatch(fetchItemsForCategory(shop.type_id, true))
                    }}
                >
                    <div className={`card ${current.id === shop.id ? 'shop--selected' : ''}`}>
                        <Image
                            className={current.id === shop.id ? 'shop--selected-image' : ''}
                            src={shop && shop.images?.length > 0 ? shop.images[0].url : "https://khan-fresh-corner.s3.amazonaws.com/shop/4da05526-0aa3-4daa-92e9-e533dffaad1d.jpg"}
                            alt={shop.name}
                            width={100}
                            height={100}
                            layout="intrinsic"
                        />
                    </div>
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
    return (
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
