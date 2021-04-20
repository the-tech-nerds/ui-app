import React, {useEffect, useState} from 'react';

import ProductGridSingle from "./common/product/product-grid-single";
// @ts-ignore
import InfiniteScroll from 'react-infinite-scroller';
import {Skeleton} from '../../components/skeleton-loader/skeletons';
import {Product} from 'types';

type ProductGridProps = {
    slug: string;
    fetchUrl: string
}


const ProductGrid = (props: ProductGridProps) => {
    const {slug} = props;
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [nextUrl, setNextUrl] = useState(`?limit=10`);

    const fetchData = async () => {
        if (nextUrl && !loading) {
            setLoading(true);
            fetch(`${props.fetchUrl}${nextUrl}`)
                .then(res => res.json())
                .then(res => {
                    if (res.code === 200) {
                        setProducts([...products, ...res.data.results]);
                        setNextUrl(res.data.links.next)
                    }
                    setLoading(false);
                })
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    const items = products.map((product, index) =>
        <ProductGridSingle
            key={product.id}
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
                    </InfiniteScroll>
                    <Skeleton width={500}></Skeleton>
                </div>
            </section>

        </div>
    )
}

export default ProductGrid;
