import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useDispatch } from 'react-redux';
import Modal from 'react-responsive-modal';
import wishlistReducer from 'reducers/wishlist';
import { ADD_TO_WISHLIST } from 'constants/ActionTypes';
import { addItemToWishlist } from '../../../../actions';


const DetailsWithPrice = (props) => {
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [nav3, setNav3] = useState(null);
    const [variance_index, setVariance_index] = useState(0);
    const [stock, setStock] = useState(null);
    const { item } = props;
    useEffect(() => {
        const stock = props.item.product_variances[0].stock_count ? 'InStock' : 'Out of Stock !';
        setStock(stock);
    }, []);

    const dispatch = useDispatch();
    const addToWishList = () => {
        dispatch(addItemToWishlist( item.product_variances[variance_index]));
    }

    const onOpenModal = () => {
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false);
    };
    const minusQty = () => {
        if (quantity > 1) {
            setStock('InStock')
            setQuantity(quantity - 1)
        }
    }

    const plusQty = () => {
        if (item.product_variances[variance_index].stock_count >= quantity) {
            setQuantity(quantity + 1);
        } else {
            setStock('Out of Stock !')
        }
    }
    const changeQty = (e) => {
        setQuantity(parseInt(e.target.value))
    }
    const changeVariance = (e) => {
        setVariance_index(Number(e.target.value));
        setQuantity(1);
        const stock = item.product_variances[Number(e.target.value)].stock_count ? 'InStock' : 'Out of Stock !';
        setStock(stock);
    }
    // const { symbol, item, addToCartClicked, BuynowClicked, addToWishlistClicked } = props;

    var colorsnav = {
        slidesToShow: 6,
        swipeToSlide: true,
        arrows: false,
        dots: false,
        focusOnSelect: true
    };

    return (
        <div className="col-lg-6 rtl-text">
            <div className="product-right">
                <h2> {item.productInfo.name} </h2>
                {/*<h4>*/}
                {/*    <del>{symbol}{item.product_variances[0].price}</del>*/}
                {/*    <span>{item.discount}% off</span></h4>*/}
                {/*<h3>{symbol}{item.price - (item.price * item.discount / 100)} </h3>*/}
                <h3>{item.product_variances[variance_index].price} Tk </h3>
                {item.product_variances.length > 1 ?
                    <ul >
                        {/*<Slider {...colorsnav} asNavFor={this.props.navOne} ref={slider => (this.slider1 = slider)} className="color-variant">*/}
                        {/*    {item.product_variances.map((vari, i) => {*/}
                        {/*        return <li className={vari.color} key={i} title={vari.title}></li>*/}
                        {/*    })}*/}
                        {/*</Slider>*/}
                        <select className="form-control" onChange={e => changeVariance(e)}>
                            {item.product_variances.map((variant, index) => (
                                <option value={index}>{variant.unit_value} {variant.unit_name}</option>
                            ))}
                        </select>
                    </ul> : ''}
                {item.product_variances.length == 1 ?
                    <ul >
                        <strong>{item.product_variances[0].unit_value + ' ' + item.product_variances[0].unit_name}</strong>
                    </ul> : ''}
                <div className="product-description border-product">
                    {item.size ?
                        <div>
                            <h6 className="product-title size-text">select size
                                    <span><a href="#" data-toggle="modal"
                                    data-target="#sizemodal" onClick={onOpenModal} >size chart</a></span></h6>
                            <div className="modal fade" id="sizemodal" tabIndex="-1"
                                role="dialog" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered"
                                    role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title"
                                                id="exampleModalLabel">Sheer Straight
                                                    Kurta</h5>
                                            <button type="button" className="close"
                                                data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/size-chart.jpg`} alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="size-box">
                                <ul>
                                    {item.size.map((size, i) => {
                                        return <li key={i}><a href="#">{size}</a></li>
                                    })}
                                </ul>
                            </div>
                        </div> : ''}
                    <span className="instock-cls">{stock}</span>
                    <h6 className="product-title">quantity</h6>
                    <div className="qty-box">
                        <div className="input-group">
                            <span className="input-group-prepend">
                                <button type="button" className="btn quantity-left-minus" onClick={minusQty} data-type="minus" data-field="">
                                    <i className="fa fa-angle-left"></i>
                                </button>
                            </span>
                            <input type="text" name="quantity" value={quantity} onChange={changeQty} className="form-control input-number" />
                            <span className="input-group-prepend">
                                <button type="button" className="btn quantity-right-plus" onClick={plusQty} data-type="plus" data-field="">
                                    <i className="fa fa-angle-right"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="product-buttons" >
                    <a className="btn btn-solid" onClick={() => addToCartClicked(item, quantity)}>add to cart</a>
                    <a href={`${process.env.PUBLIC_URL}/checkout`} className="btn btn-solid" onClick={() => BuynowClicked(item, quantity)} >buy now</a>
                </div>
                <div className="border-product">
                    <h6 className="product-title">product details</h6>
                    {/*<div dangerouslySetInnerHTML={item.product_variances[variance_index].description}></div>*/}
                    <div dangerouslySetInnerHTML={{ __html: item.product_variances[variance_index].description }}></div>
                </div>
                <div className="border-product">
                    {/*<h6 className="product-title">share it</h6>*/}
                    <div className="product-icon">
                        {/*<ul className="product-social">*/}
                        {/*    <li><a href="https://www.facebook.com/" target="_blank"><i className="fa fa-facebook"></i></a></li>*/}
                        {/*    <li><a href="https://plus.google.com/discover" target="_blank"><i className="fa fa-google-plus"></i></a></li>*/}
                        {/*    <li><a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter"></i></a></li>*/}
                        {/*    <li><a href="https://www.instagram.com/" target="_blank"><i className="fa fa-instagram"></i></a></li>*/}
                        {/*</ul>*/}
                        <button className="wishlist-btn" onClick={addToWishList}><i
                            className="fa fa-heart"></i><span
                                className="title-font">Add To WishList</span>
                        </button>
                    </div>
                </div>
                {/*<div className="border-product">*/}
                {/*    <h6 className="product-title">Time Reminder</h6>*/}
                {/*    <div className="timer">*/}
                {/*        <p id="demo">*/}
                {/*            <span>25*/}
                {/*                <span className="padding-l">:</span>*/}
                {/*                <span className="timer-cal">Days</span>*/}
                {/*            </span>*/}
                {/*            <span>22*/}
                {/*                <span className="padding-l">:</span>*/}
                {/*                <span className="timer-cal">Hrs</span>*/}
                {/*            </span>*/}
                {/*            <span>13*/}
                {/*                <span className="padding-l">:</span>*/}
                {/*                <span className="timer-cal">Min</span>*/}
                {/*            </span>*/}
                {/*            <span>57*/}
                {/*                <span className="timer-cal">Sec</span>*/}
                {/*            </span>*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <Modal open={open} onClose={onCloseModal} center>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Sheer Straight Kurta</h5>
                        </div>
                        <div className="modal-body">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/size-chart.jpg`} alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )

}


export default DetailsWithPrice;
