import React, {useEffect, useRef, useState} from "react";
import {Offer, OfferItem} from "../../../types";
import Breadcrumb from "../../common/breadcrumb";
import Service from "../common/service";
import ImageZoom from "../common/product/image-zoom";
import SmallImages from "../common/product/small-image";
import DetailsWithPrice from "../common/product/details-price";
import Slider from "react-slick";
import DetailsTabs, {TabsInfo} from "./details-tab";
import DetailsPrice, {PriceDetail} from "./price-details";
const sliders = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    fade: true
};
const sliderNav = {
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    infinite: false,
};
type OfferDetail = {
    item: OfferItem
}
const OfferItemDetail =(props: OfferDetail) =>{
    let {item} = props;
    const priceDetails: PriceDetail = {
        quantity: item.offer.stock,
        title: item.offer.name,
        price: item.offer.total_price,
        isWishButtonShow: false,
        isShowTimer: true,
        start_date: item.offer.start_date,
        end_date: item.offer.end_date
    }
    const tabDetails:TabsInfo= {
        description: item.offer.description
    }
    const [nav1, setNav1] = useState(null);
    useEffect(() =>{

    },[])
    return  <div>
        {/*Section Start*/}
        {(item.offer) ?
            <section className="section-b-space">
                <div className="collection-wrapper">
                    <div className="container mt-4">
                        <Breadcrumb parent={'Offer'} title={item.offer.name} />
                        <div className="row">

                            <div className="col-sm-3 collection-filter" id="filter">
                                <Service />
                            </div>
                            <div className="card p-4 col-lg-9 col-sm-12 col-xs-12">
                                <div className="">
                                    <div className="row">
                                        <div className="col-lg-6 product-thumbnail">
                                            <Slider {...sliders} asNavFor={nav1}     ref={slider1 => setNav1(slider1)} className="product-slick">
                                                {item.images?.map((img, index) =>
                                                    <div key={index}>
                                                        <ImageZoom image={img} />
                                                    </div>
                                                ) }
                                            </Slider>
                                            {item.images.length > 0 && <SmallImages images={item.images} settings={sliderNav} navOne={nav1} />}
                                        </div>
                                        <DetailsPrice itemPrice={priceDetails}/>
                                    </div>
                                </div>
                                <DetailsTabs tabs={tabDetails}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section> : ''}
        {/*Section End*/}
    </div>
}

export default  OfferItemDetail;
