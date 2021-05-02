import React, {useEffect, useState} from 'react';

import ProductGridSingle from "./common/product/product-grid-single";
// @ts-ignore
import InfiniteScroll from 'react-infinite-scroller';
import {Skeleton} from '../../components/skeleton-loader/skeletons';
import {Product} from 'types';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

type ProductGridProps = {
    slug: string;
    fetchUrl: string
}


const ProductGrid = (props: ProductGridProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [nextUrl, setNextUrl] = useState(undefined);
    const [fetched, setFetched] = useState<Record<string, true | undefined>>({});

    useEffect(() => {
        setProducts([]);
        setFetched({});
        if (!products.length) {
            fetchData();
        }
    }, [props.fetchUrl]);

    const fetchData = async () => {
        if (!loading) {
            const url = nextUrl ? `${props.fetchUrl}${nextUrl}` : props.fetchUrl;
            if (!fetched[url]) {
                setLoading(true);
                fetch(url)
                .then(res => res.json())
                .then(res => {
                    setFetched({ ...fetched, [url] : true });
                    if (res.code === 200) {
                        setProducts([...products, ...res.data.results]);
                        const next = res.data.links.next;
                        setNextUrl(next);
                    }
                    setLoading(false);
                })   
            }
        }    
    }

    const items = products
                .filter(product => product.productVariances && product.productVariances.length > 0)
                .map((product) =>
                    <ProductGridSingle
                        key={product.slug}
                        product={product}
                    />
    );

    if (!products.length) {
        return (
            <section className="ratio_asos section-b-space">
                <div className="container">
                    <h4>No products available!</h4>
                </div>
            </section>
        )
    }

    return (
        <div>
            <section className="ratio_asos section-b-space">
                <div className="container">
                    <div className="d-flex">
                        <div className="flex-fill"><hr/></div>
                        <div className="ml-4 mr-4 font-weight-bold">Product List</div>
                        <div className="flex-fill"><hr/></div>
                    </div>
                    <InfiniteScroll
                        loadMore={fetchData}
                        hasMore={!!nextUrl}
                        loader={() => <Skeleton width={500}></Skeleton>}
                    >
                        <div className="row">
                            <div className="col">
                                <div className="no-slider row">
                                    {items}
                                </div>
                            </div>
                        </div>
                        {loading && <div className="d-flex justify-content-center">
                             <CircularProgress />
                        </div>}
                    </InfiniteScroll>
                    <Skeleton width={500}></Skeleton>
                </div>
            </section>

        </div>
    )
}

export default ProductGrid;
