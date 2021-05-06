import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import '../../../components/categories/category.module.scss';
import ProductGrid from '../../../components/products/product-grid';
import {useRouter} from 'next/router'
import { useSelector } from 'react-redux';
import { Shop } from 'types';

type ProductListProps = {
    searchKey: string
}

const ProductList = ({ searchKey }: ProductListProps) => {
    const currentShop: Shop = useSelector(state => state.shops.current);
    const [apiUrl, setApiUrl] = useState(null);
    useEffect(() => {
        setApiUrl(`/product/search/${currentShop.id}/${searchKey}`);
    }, [searchKey])
    return <ProductGrid fetchUrl={apiUrl} />
};

const SearchProducts = () => {
    const router = useRouter();
    const searchKey = router.asPath.replace('product/search?q=', '').replace('/', '');

    return (
        <div>
            <Head>
                <title>Khan Fresh Corner | Search Result.</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <ProductList searchKey={searchKey}/>
        </div>
    )
}

export default SearchProducts;
