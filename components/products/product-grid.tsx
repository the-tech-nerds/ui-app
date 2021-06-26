import React, {useEffect, useState, useCallback } from 'react';

import ProductGridSingle from "./common/product/product-grid-single";
// @ts-ignore
import InfiniteScroll from 'react-infinite-scroller';
import {Skeleton} from '../../components/skeleton-loader/skeletons';
import {Product} from 'types';
import { CircularProgress } from '@material-ui/core';

type ProductGridProps = {
    fetchUrl: string
}


const ProductGrid = (props: ProductGridProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [baseUrl, setBaseUrl] = useState(null);
    const [nextUrl, setNextUrl] = useState(undefined);
    const [fetched, setFetched] = useState<Record<string, true | undefined>>({});

    useEffect(() => {
        if (props.fetchUrl !== baseUrl) {
             setBaseUrl(props.fetchUrl);
             setProducts([]);
             setLoading(false);
             setFetched({});
        } else {
            fetchData();
        }
    }, [props.fetchUrl, baseUrl]);

    const fetchData = async () => {
        if (!loading) {
            const url = nextUrl ? `${baseUrl}${nextUrl}` : baseUrl;
            if (!fetched[url]) {
                setLoading(true);
                if (nextUrl) {
                    setScrolling(true);
                }
                fetch(url)
                .then(res => res.json())
                .then(res => {
                    setLoading(false);
                    setScrolling(false);
                    setFetched({ ...fetched, [url] : true });
                    if (res.code === 200) {
                        setProducts([...products, ...res.data.results]);
                        const next = res.data.links.next;
                        setNextUrl(next);
                    }
                }).catch(e => setLoading(false))  
            }
        }    
    };

    const items = products
                .filter(product => product.productVariances && product.productVariances.length > 0)
                .map((product) =>
                    <ProductGridSingle
                        key={product.slug}
                        product={product}
                    />
    );
    
    if (loading && !scrolling) {
        return (
            <div className="d-flex justify-content-center section-b-space m-5">
                <CircularProgress />
            </div>
        );
    }

    if (!products.length) {
        return (
            <section className="ratio_asos section-b-space top-spacing--lg">
                <div className="container">
                    <h4>No products available!</h4>
                </div>
            </section>
        )
    }

    return (
        <div key={props.fetchUrl}>
            <section className="ratio_asos section-b-space top-spacing--lg">
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
                        {/* <div className="row"> */}
                            {/* <div className="col-3"> */}
                                <div className="no-slider row d-flex justify-content-center">
                                    {items}
                                </div>
                            {/* </div> */}
                        {/* </div> */}
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
