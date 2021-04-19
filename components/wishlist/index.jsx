import React, { useReducer, userSate } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumb from '../common/breadcrumb';
import { addToCartAndRemoveWishlist, removeFromWishlist } from '../../actions'
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import wishlistReducer from 'reducers/wishlist';
import DeleteIcon from '@material-ui/icons/Delete';
import { ShoppingCart, ShoppingBasket } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
const WishList = (props) => {
    const { Items, symbol } = props;
    const classes = useStyles();
    return (
        <div>
            <Breadcrumb title={'Wishlist'} />
            {Items?.length > 0 ?
                <section className="wishlist-section section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                {Items.map((item, index) => {
                                    return (
                                        <div className="d-flex flex-row bd-highlight mb-3 card" key={index}>
                                            <div className="p-2 bd-highlight d-flex justify-content-center image-block" style={{ alignItems: 'center' }}>
                                                <Link href={`${process.env.PUBLIC_URL}/left-sidebar/product/${item.product_slug}`}>
                                                    <img style={{ maxHeight: "50px", maxWidth: "50px" }} src={item.images ?
                                                        item.images[0]
                                                        : item.images[0]} alt="" />
                                                </Link>
                                            </div>
                                            <div className="p-1 ml-3 bd-highlight flex-fill">
                                                <div className="d-flex">
                                                    <h3>{item.product_name}</h3>
                                                </div>
                                                <div className="d-flex">
                                                    <h4>{item.variance_price} Tk
                                                            {/* <del><span className="money">{symbol}{item.variance_price}</span></del> */}
                                                    </h4>
                                                </div>

                                                <div className="d-flex">
                                                    {item.stock_count > 0 && <p className="text-success">in stock</p>}
                                                    {item.stock_count == 0 && <p className="text-danger">out of stock!</p>}
                                                </div>
                                                <div className="d-flex">
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        className={classes.button}
                                                        startIcon={<ShoppingCart />}
                                                    >
                                                        Add to Cart
                                             </Button>
                                                </div>
                                            </div>
                                            <div class="p-2 bd-highlight">
                                                <IconButton color="primary" component="span">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </div>)
                                })}
                            </div>
                        </div>
                        <div className="row wishlist-buttons">
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
                                        className={classes.button}
                                        startIcon={<ShoppingBasket />}
                                    >
                                        check out
                                             </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <section className="cart-section section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div >
                                    <div className="col-sm-12 empty-cart-cls text-center">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/empty-wishlist.png`} className="img-fluid mb-4" alt="" />
                                        <h3>
                                            <strong>WhishList is Empty</strong>
                                        </h3>
                                        <h4>Explore more shortlist some items.</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </div>
    )
}

export default WishList;