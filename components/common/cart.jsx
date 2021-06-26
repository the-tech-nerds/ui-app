import React from "react";
import Link from "next/link";
import { withTranslate } from "react-redux-multilingual";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Image from "components/image/image";
import { deleteItemFromCart, removeFromCart } from "actions";

const ItemList = ({ list, dispatch }) => (
  <div className="container">
    <div className="row">
      <div className="col-sm-12">
        {list.map((item, index) => {
          return (
            <div
              className="d-flex flex-row bd-highlight mb-3 card hover-item"
              key={index}
            >
              <div
                className="p-2 bd-highlight d-flex justify-content-center image-block"
                style={{ alignItems: "center" }}
              >
                <Link href={`/product/${item.product_slug}`}>
                  <Image
                    height={30}
                    width={30}
                    style={{ maxHeight: "50px", maxWidth: "50px" }}
                    src={item.image}
                    alt=""
                  />
                </Link>
              </div>
              <div className="p-1 ml-3 bd-highlight flex-fill">
                <div className="d-flex">
                  <Link href={`/product/${item.product_slug}`}>
                    <span className="font-weight-bold">{item.title}</span>
                  </Link>
                </div>
                <div className="d-flex">
                  <span className="font-weight-bold">
                    {item.price} Tk
                    {/* <del><span className="money">{symbol}{item.variance_price}</span></del> */}
                  </span>
                </div>
              </div>
              <div className="p-2 bd-highlight d-flex flex-column">
                <span>Qty: {item.quantity}</span>
                <span onClick={() => dispatch(deleteItemFromCart(item.id))}>
                  <i className="fa fa-remove"></i>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    {/* <div className="row wishlist-buttons">
      <div className="col-12">
        <Link href={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<ShoppingBasket />}
          >
            continue shopping
          </Button>
        </Link>
        <Link href={`${process.env.PUBLIC_URL}/checkout`}>
          <Button
            variant="contained"
            color="primary"
            className={`${classes.button} ml-2`}
            startIcon={<ShoppingCart />}
          >
            check out
          </Button>
        </Link>
      </div>
    </div> */}
  </div>
);

const EmptyCart = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-12">
        <div>
          <div className="col-sm-12 empty-cart-cls text-center">
            <img
              src={`/assets/images/icon-empty-cart.png`}
              className="img-fluid mb-4"
              alt=""
            />
            <h3>
              <strong>Your Cart is Empty</strong>
            </h3>
            <h4>Explore more. Shortlist some items.</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const openCart = () => {
    document.getElementById("cart").classList.add("open-cart");
  };
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const closeCart = () => {
    document.getElementById("cart").classList.remove("open-cart");
  };

  return (
    <div>
      <div id="cart" className="cart">
        <div className="cart_body">
          <div onClick={closeCart}>
            <div className="sidebar-back text-left">
              <i className="fa fa-close pr-2" aria-hidden="true"></i> Cart
            </div>
          </div>
          <div>
            {cart.length == 0 && (
              <section className="cart-section section-b-space">
                <EmptyCart />
              </section>
            )}
            {cart.length > 0 && (
              <div>
                <div className="d-flex justify-content-between p-2">
                  <span className="p-3">Total: {totalAmount}</span>
                  <button className="btn btn-success btn-sm ">Checkout</button>
                </div>
                <section className="cart-section">
                  <ItemList list={cart} dispatch={dispatch} />
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="sidebar-btn bg-success">
        <div className="dark-light cart-icon bg-success" onClick={openCart}>
          <span className="cart_count">{cart.length}</span>
          <i className="fa fa-cart-plus text-light"></i>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default withTranslate(Cart);
