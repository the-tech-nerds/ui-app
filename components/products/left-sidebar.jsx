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

    constructor() {
        super();
        this.state = {
            open: false,
            nav1: null,
            nav2: null
        };
    }

    // document.getElementById('idOfElement').classList.add('newClassName');


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
        let images = product.images || [];
        variances.forEach((v) => {
            v.images.forEach((i) => {
                images.push(i);
            })
        })
        return images;
    }
    render() {
        const { symbol, product } = this.props
        const { productInfo, product_variances } = product;
        const imageUrls = this.getImagesList(productInfo, product_variances);
        var products = {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            fade: true
        };
        var productsnav = {
            slidesToShow: 3,
            swipeToSlide: true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };

        return (
            <div>
                {/*SEO Support*/}
                {/*<Helmet>*/}
                {/*    <title>MultiKart | {item.category} | {item.name}</title>*/}
                {/*    <meta name="description" content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses." />*/}
                {/*</Helmet>*/}
                {/*SEO Support End */}

                <Breadcrumb parent={'Product'} title={product.productInfo.name} />

                {/*Section Start*/}
                {(product) ?
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
                                                        {imageUrls.length > 0 ?
                                                            imageUrls.map((vari, index) =>
                                                                <div key={index}>
                                                                    <ImageZoom image={vari} />
                                                                </div>
                                                            ) :
                                                            imageUrls.map((vari, index) =>
                                                                <div key={index}>
                                                                    <ImageZoom image={vari} />
                                                                </div>
                                                            )}
                                                    </Slider>
                                                    {imageUrls.length > 1 && <SmallImages images={imageUrls} settings={productsnav} navOne={this.state.nav1} />}
                                                </div>
                                                <DetailsWithPrice symbol={symbol} item={product} navOne={this.state.nav1} />
                                            </div>
                                        </div>
                                        <DetailsTopTabs item={product} />
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
