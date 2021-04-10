import React, {Component, useState} from 'react';
import Link from 'next/link';
import Image from 'components/image/image';


const ProductStyleOne = (props) => {
        const { product, symbol, onAddToCartClicked, onAddToWishlistClicked, onAddToCompareClicked} = props;

        const [selectedVariant, setSelectedVariant] = useState(0);

        return (

            <div className="card m-4 p-2 d-flex flex-column justify-content-center text-center">
                <div className="img-wrapper">
                    {/* <div className="lable-block">
                        {(product.new == true)? <span className="lable3">new</span> : ''}
                        {(product.sale == true)? <span className="lable4">on sale</span> : ''}
                    </div> */}
                    <div className="front">
                        <Link href={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`} >
                            <Image src={product.productVariances[selectedVariant].images[0].url} height={150} width={200} alt={product.name} />
                        </Link>
                    </div>
                    {/* <div className="cart-info cart-wrap">
                        <button title="Add to cart" onClick={() => onAddToCartClicked(product, 1)}>
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </button>
                        <a href="javascript:void(0)" title="Add to Wishlist" onClick={onAddToWishlistClicked} >
                            <i className="fa fa-heart" aria-hidden="true"></i>
                        </a>
                        <a href="javascript:void(0)" data-toggle="modal"
                           data-target="#quick-view"
                           title="Quick View">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </a>
                        <Link href={`${process.env.PUBLIC_URL}/compare`} title="Compare" onClick={onAddToCompareClicked}>
                            <i className="fa fa-refresh" aria-hidden="true"></i></Link>
                    </div> */}
                    {product.productVariances?
                    <ul className="product-thumb-list">
                        <select className="form-control" onChange={e => setSelectedVariant(e.target.value)}> 
                            {product.productVariances.map((variant, index) => (
                                <option value={index}>{variant.unit_value} {variant.unit.name}</option>
                            ))}
                        </select>
                        {/* {product.variants.map((vari, i) =>
                            <li className={`grid_thumb_img ${(vari.images === this.state.image)?'active':''}`} key={i}>
                                <a href="javascript:void(0)" title="Add to Wishlist">
                                    <img src={`${vari.images}`} onClick={() => this.onClickHandle(vari.images)} />
                                </a>
                            </li>)
                        } */}
                    </ul>:''}
                </div>
                <div className="product-detail">
                    <div>
                        {/* <div className="rating">
                            {RatingStars}
                        </div> */}
                        <Link href={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}>
                            <h6>{product.name}</h6>
                        </Link>
                        <h4>${product.productVariances[selectedVariant].price}</h4>
                        {product.variants?
                        <ul className="color-variant">
                            {product.variants.map((vari, i) => {
                                return (
                                    <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>)
                            })}
                        </ul>:''}
                    </div>
                </div>
                <button className="btn btn-success btn-lg w-full">Add to Cart</button>
            </div>
    )
};

export default ProductStyleOne;