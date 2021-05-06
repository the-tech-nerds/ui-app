import React, { Component } from 'react';
import Slider from 'react-slick';
// import custom Components
import Service from "./common/service";
import NewProduct from "../common/new-product";
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import ImageZoom from './common/product/image-zoom'
import SmallImages from "./common/product/small-image";



class LeftSideBar extends Component {

    constructor(props) {
        super(props);
        const { productInfo, product_variances } = props.product;
        this.state = {
            open: false,
            nav1: null,
            nav2: null,
            product: props.product,
            productInfo,
            product_variances,
        };
       
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    filterClick() {
        document.getElementById("filter").style.left = "-15px";
    }

    backClick() {
        document.getElementById("filter").style.left = "-365px";
    }

    getImagesList = (product, variances) => {
        let images = [];
        variances.forEach((v) => {
            v.images.forEach((i) => {
                images.push(i);
            })
        })
        return images;
    }
    render() {
        const { symbol } = this.props;

        const imageUrls = this.getImagesList(this.state.productInfo, this.state.product_variances);
        var products = {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            fade: true
        };
        var productsnav = {
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            arrows: false,
            dots: false,
            focusOnSelect: true,
            infinite: false,
        };

        return (
            <div>
                <Breadcrumb parent={'Product'} title={this.state.productInfo.name} />

                {/*Section Start*/}
                {(this.state.product) ?
                    <section className="section-b-space">
                        <div className="collection-wrapper">
                            <div className="container">
                                <div className="row">

                                    <div className="col-sm-3 collection-filter" id="filter">
                                        <div className="collection-mobile-back pl-5">
                                            <span onClick={this.backClick} className="filter-back">
                                                <i className="fa fa-angle-left" aria-hidden="true"></i> back
                                        </span>
                                        </div>

                                        {/* <BrandBlock/> */}
                                        <Service />
                                        {/*side-bar single product slider start*/}
                                        {/*<NewProduct/>*/}
                                        {/*side-bar single product slider end*/}
                                    </div>
                                    <div className="col-lg-9 col-sm-12 col-xs-12">
                                        <div className="">
                                            <div className="row">
                                                <div className="col-xl-12">
                                                    <div className="filter-main-btn mb-2">
                                                        <span onClick={this.filterClick} className="filter-btn" >
                                                            <i className="fa fa-filter" aria-hidden="true"></i> offer</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 product-thumbnail">
                                                    <Slider {...products} asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)} className="product-slick">
                                                            {imageUrls.map((vari, index) =>
                                                                <div key={index}>
                                                                    <ImageZoom image={vari} />
                                                                </div>
                                                            ) }
                                                    </Slider>
                                                    {imageUrls.length > 0 && <SmallImages images={imageUrls} settings={productsnav} navOne={this.state.nav1} />}
                                                </div>
                                                <DetailsWithPrice symbol={symbol} item={this.state.product} navOne={this.state.nav1} />
                                            </div>
                                        </div>
                                        <DetailsTopTabs item={this.state.product} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> : ''}
                {/*Section End*/}
            </div>
        )
    }
}


export default LeftSideBar;
