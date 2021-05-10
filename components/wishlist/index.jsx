import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumb from '../common/breadcrumb';
import { fetchWishlist } from '../../actions'
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { ShoppingCart, ShoppingBasket } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import axios from "axios";
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
const WishList = (props) => {
    const [wishlist, setWishlist] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const { Items = [], symbol } = props;
        setWishlist(Items);
    }, []);
    const classes = useStyles();
    const deleteWishList = (item) => {
        axios.delete(`/user/wishlist/${item.id}`).then(res => {
            const list = wishlist.filter(x => x.id !== item.id);
            setWishlist(list);
            dispatch(fetchWishlist(list))
        }).catch(err => {

        });

    }
    return (
        <div>
            <Breadcrumb title={'Wishlist'} />
            {wishlist?.length > 0 ?
                <section className="wishlist-section section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                {wishlist.map((item, index) => {
                                    return (
                                        <div className="d-flex flex-row bd-highlight mb-3 card hover-item" key={index}>
                                            <div className="p-2 bd-highlight d-flex justify-content-center image-block" style={{ alignItems: 'center' }}>
                                                <Link href={`/product/${item.product_slug}`}>
                                                    <img style={{ maxHeight: "50px", maxWidth: "50px" }} src={item.images ?
                                                        item?.images[0]
                                                        : item?.images[0]} alt="" />
                                                </Link>
                                            </div>
                                            <div className="p-1 ml-3 bd-highlight flex-fill">
                                                <div className="d-flex">
                                                    <Link href={`/product/${item.product_slug}`}>
                                                        <span className="font-weight-bold">{item.variance_name}</span>
                                                    </Link>
                                                </div>
                                                <div className="d-flex">
                                                    <span className="font-weight-bold">{item.variance_price} Tk
                                                            {/* <del><span className="money">{symbol}{item.variance_price}</span></del> */}
                                                    </span>
                                                </div>

                                                <div className="d-flex">
                                                    {item.stock_count > 0 && <span className="text-success">in stock</span>}
                                                    {item.stock_count == 0 && <span className="text-danger">out of stock!</span>}
                                                </div>
                                            </div>
                                            <div class="p-2 bd-highlight">
                                                <IconButton color="primary" onClick={() => deleteWishList(item)} component="span">
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton color="secondary" component="span">
                                                    <ShoppingCart />
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
                                        className={`${classes.button} ml-2`}
                                        startIcon={<ShoppingCart />}
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
