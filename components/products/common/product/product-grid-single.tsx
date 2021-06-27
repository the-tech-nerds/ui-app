import React, { useState } from "react";
import Link from "next/link";
import Image from "../../../../components/image/image";
import { Product, ProductVariant } from "types";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, decrementCartProductQTY, incrementCartProductQTY } from "actions";

type ProductGridSingleProps = {
  product: Product;
  // onAddToCartClicked: () => {},
  // onAddToWishlistClicked: () => {},
  // onAddToCompareClicked: () => {},
};

const ProductGridSingle = ({
  product,
}: // onAddToCartClicked,
// onAddToWishlistClicked,
// onAddToCompareClicked
ProductGridSingleProps) => {
  const { cart } = useSelector((state) => state.cart);

  const [selectedVariant, setSelectedVariant] = useState(0);
  const dispatch = useDispatch();
  const selectedProductVariant: ProductVariant = product.productVariances[selectedVariant];
  
  const itemOnCart =
    product.productVariances && selectedProductVariant
      ? cart.find(
          ({ id }: ProductVariant) => id === selectedProductVariant.id
        )
      : false;

  const onAddToCart = () => {
    dispatch(addItemToCart(selectedProductVariant));
  };

  return (
    <div className="col-5 col-md-3 col-lg-2   m-2 p-2 d-flex flex-column justify-content-center text-center hover-item bg-white">
      <div className="img-wrapper">
        {/* <div className="lable-block">
                        {(product.new == true)? <span className="lable3">new</span> : ''}
                        {(product.sale == true)? <span className="lable4">on sale</span> : ''}
                    </div> */}
        <Link
          href={{
            pathname: "/views/product/[product]",
            query: { product: product.slug },
          }}
          as={`/product/${product.slug}`}
        >
          <div className="front">
            <Image
              src={product?.image ? product?.image : ""}
              height={150}
              alt={product.name}
              fullWidth
            />
          </div>
        </Link>
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
        {product.productVariances ? (
          <ul className="product-thumb-list">
            {product.productVariances.length > 1 && (
              <select
                className="form-control"
                onChange={(e) => setSelectedVariant(Number(e.target.value))}
              >
                {product.productVariances.map((variant, index) => (
                  <option value={index}>
                    {variant.unit_value} {variant.unit.name}
                  </option>
                ))}
              </select>
            )}
            {product.productVariances.length == 1 && (
              <h5 className="mt-2">
                {product.productVariances[0].unit_value +
                  " " +
                  product.productVariances[0].unit.name}
              </h5>
            )}
            {/* {product.variants.map((vari, i) =>
                            <li className={`grid_thumb_img ${(vari.images === this.state.image)?'active':''}`} key={i}>
                                <a href="javascript:void(0)" title="Add to Wishlist">
                                    <img src={`${vari.images}`} onClick={() => this.onClickHandle(vari.images)} />
                                </a>
                            </li>)
                        } */}
          </ul>
        ) : (
          ""
        )}
      </div>
      <div className="product-detail">
        <div>
          {/* <div className="rating">
                            {RatingStars}
                        </div> */}
          <Link
            href={{
              pathname: "/views/product/[product]",
              query: { slug: product.slug },
            }}
            as={`/product/${product.slug}`}
          >
            <h6>{product.name}</h6>
          </Link>
          <h4>
            {product.symbol || <span className="font-weight-bold"> </span>}
            {selectedProductVariant.price} Tk
          </h4>
          {/* {product.productVariances?
                        <ul className="color-variant">
                            {product.variants.map((vari, i) => {
                                return (
                                    <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>)
                            })}
                        </ul>:''} */}
        </div>
      </div>
      {!itemOnCart && (
        <button onClick={onAddToCart} className="btn btn-success btn-lg w-full">
          Add to Cart
        </button>
      )}
      {itemOnCart && (
        <div className="d-flex flex-row justify-content-around align-items-center">
          <span
            onClick={() => dispatch(incrementCartProductQTY(selectedProductVariant.id))}
          >
            <i className="fa fa-plus"></i>
          </span>
          <span>{itemOnCart.quantity} in cart</span>
          <span
            onClick={() => dispatch(decrementCartProductQTY(selectedProductVariant.id))}
          >
            <i className="fa fa-minus"></i>
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductGridSingle;
