import React, { useEffect, useState} from 'react';

import ProductStyleOne from "./common/product-style-one";
import InfiniteScroll from 'react-infinite-scroller';
import {getVisibleproducts} from "../../../services";
import {addToCart, addToCompare, addToWishlist} from "../../../actions";
import { Skeleton } from 'components/skeleton-loader/skeletons';

const ElementProductNoSlider = (props) => {
        const {addToCart, symbol, addToWishlist, addToCompare, slug } = props;


        const [products, setProducts] = useState([]);
        const [loading, setLoading] = useState(false);
        const [nextUrl, setNextUrl] = useState(`?limit=10`);

        const fetchData = async () => {
           if (nextUrl && !loading) {
                setLoading(true);
                fetch(`/category-products/${slug}${nextUrl}`)
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
        <ProductStyleOne 
            product={product} 
            symbol={symbol}
            // onAddToCompareClicked={() => addToCompare(product)}
            // onAddToWishlistClicked={() => addToWishlist(product)}
            // onAddToCartClicked={addToCart}
            key={index}
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
                {/* <Breadcrumb parent={'Elements'} title={'product Slider'}/> */}

                <section className="ratio_asos section-b-space">
                    <div className="container">
                        <h4>Products</h4>
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

// const mapStateToProps = (state) => ({
//     products: getVisibleproducts(state.data, state.filters),
//     symbol: state.data.symbol,
// })

export default 
// connect(
//     mapStateToProps, {addToCart, addToWishlist, addToCompare}
// )(
    ElementProductNoSlider
    // )