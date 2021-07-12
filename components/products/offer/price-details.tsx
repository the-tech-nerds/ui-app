import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {DayHourMinSec, secondsToDhms} from "../../../share/uitilies";
export interface PriceDetail {
    title: string;
    price: number;
    quantity: number;
    description?: string;
    start_date?: Date;
    end_date?: Date;
    items?: any [];
    isWishButtonShow?: boolean;
    isShowSocial?: boolean;
    isShowTimer?: boolean;
}
type ItemPrice = {
    itemPrice: PriceDetail
}

const DifferentDateTme = (from: Date, to: Date) =>{
   const dif = moment(to).diff(moment(from));
   return moment.duration(dif);
}

const DetailsPrice = (props: ItemPrice) => {
    let [quantity, setQuantity] = useState(0);
    const [stock, setStock] = useState(null);
    const [offerTime, setOfferTime] = useState<DayHourMinSec>(null);
    const { itemPrice } = props;
    useEffect(() => {
        const stockInfo = itemPrice.quantity?'In Stock' : 'Out Of Stock!';
        setStock(stockInfo);
        if(itemPrice?.start_date){
            const res = DifferentDateTme(itemPrice.start_date, itemPrice.end_date);
            let seconds =res.asSeconds();
            const interval = setInterval(() => {
                const result = secondsToDhms(seconds);
                setOfferTime(result);
                if(seconds === 0){
                    clearInterval(interval);
                }
                seconds--;
            }, 1000);
        }
    }, []);

    const minusQty = () => {
        if (quantity < itemPrice.quantity) {
            setStock('InStock')
            setQuantity(quantity - 1)
        } else {
            setStock('Out Of Stock!')
            setQuantity(0)
        }
    }

    const plusQty = () => {
        if (itemPrice.quantity > quantity) {
            setStock('InStock')
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity + 1);
            setStock('Out Of Stock !')
        }
    }

    return  <div className="col-lg-6 rtl-text">
    <div className="product-right">
        <h2> {itemPrice.title} </h2>
    {/*<h4>*/}
    {/*    <del>{symbol}{item.product_variances[0].price}</del>*/}
    {/*    <span>{item.discount}% off</span></h4>*/}
    {/*<h3>{symbol}{item.price - (item.price * item.discount / 100)} </h3>*/}
    <h3>{itemPrice.price} Tk </h3>
    {itemPrice?.items?.length > 1 ?
        <ul >
        <select className="form-control">
        {itemPrice.items.map((variant, index) => (
            <option value={index}>{variant.unit_value} {variant.unit_name}</option>
        ))}
        </select>
        </ul> : ''}

        {itemPrice?.items?.length == 1 ?
            <ul >
                <strong>{itemPrice.items[0].unit_value + ' ' + itemPrice.items[0].unit_name}</strong>
            </ul> : ''}
        <div className="product-description border-product">
            <span className="instock-cls">{stock}</span>
            <h6 className="product-title">quantity</h6>
            <div className="qty-box">
                <div className="input-group">
                            <span className="input-group-prepend">
                                <button type="button" className="btn quantity-left-minus" onClick={minusQty} data-type="minus" data-field="">
                                    <i className="fa fa-angle-left"></i>
                                </button>
                            </span>
                    <input type="text" name="quantity" value={quantity} readOnly  className="form-control input-number" />
                    <span className="input-group-prepend">
                                <button type="button" className="btn quantity-right-plus" onClick={plusQty} data-type="plus" data-field="">
                                    <i className="fa fa-angle-right"></i>
                                </button>
                            </span>
                </div>
            </div>
        </div>
            <div className="product-buttons" >
        <button disabled={itemPrice.quantity === 0 || itemPrice.quantity < quantity} className="btn btn-solid">add to cart</button>
        <a href={`${process.env.PUBLIC_URL}/checkout`} className="btn btn-solid">buy now</a>
        </div>
        {itemPrice?.description &&<div className="border-product">
        <h6 className="product-title">product details</h6>
            {/*<div dangerouslySetInnerHTML={item.product_variances[variance_index].description}></div>*/}
            <div dangerouslySetInnerHTML={{ __html: itemPrice.description }}></div>
        </div>}
        {itemPrice.isShowSocial && <div className="border-product">
            <h6 className="product-title">share it</h6>
            <div className="product-icon">
            <ul className="product-social">
                <li><a href="https://www.facebook.com/" target="_blank"><i className="fa fa-facebook"></i></a></li>
                <li><a href="https://plus.google.com/discover" target="_blank"><i className="fa fa-google-plus"></i></a></li>
                <li><a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter"></i></a></li>
                <li><a href="https://www.instagram.com/" target="_blank"><i className="fa fa-instagram"></i></a></li>
            </ul>
                {itemPrice.isWishButtonShow && <button className="wishlist-btn"><i
            className="fa fa-heart"></i><span
            className="title-font">Add To WishList</span>
        </button>}
        </div>
        </div>}
        {itemPrice.isShowTimer && <div className="border-product">
                <h6 className="product-title">Time Reminder</h6>
                <div className="timer">
                    <p id="demo">
                        <span>{offerTime?.days}
                            <span className="padding-l">:</span>
                            <span className="timer-cal">Days</span>
                        </span>
                        <span>{offerTime?.hours}
                            <span className="padding-l">:</span>
                            <span className="timer-cal">Hrs</span>
                        </span>
                        <span>{offerTime?.minutes}
                            <span className="padding-l">:</span>
                            <span className="timer-cal">Min</span>
                        </span>
                        <span>{offerTime?.seconds}
                            <span className="timer-cal">Sec</span>
                        </span>
                    </p>
                </div>
            </div>}
            </div>
            </div>

}


export default DetailsPrice;
