import React, { Component } from 'react';
import Slider from 'react-slick';
// import custom Components
// import RelatedProduct from "../common/related-product"
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import ImageZoom from './common/product/image-zoom'
import SmallImages from './common/product/small-image'

class LeftImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null,
            vertical: true,
        };
    }

    componentWillMount() {
        // if (window.innerWidth > 576) {
        //     this.setState({ vertical: true })
        // } else {
        //     this.setState({ vertical: false })
        // }
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });

    }

    render() {
        const { symbol, product } = this.props
        const products = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true
        };
        const productsnav = {
            vertical: this.state.vertical,
            verticalSwiping: this.state.vertical,
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.product-right-slick',
            arrows: false,
            infinite: true,
            centerMode: false,
            dots: false,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <div>

                <Breadcrumb title={' Product / ' + product.name} />

                {/*Section Start*/}
                {(product) ?
                    <section >
                        <div className="collection-wrapper">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-1 col-sm-2 col-xs-12 p-0">
                                        {/*<SmallImages item={product} settings={productsnav} navOne={this.state.nav1} />*/}
                                    </div>
                                    <div className="col-lg-5 col-sm-10 col-xs-12  order-up">
                                        <Slider {...products} asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)} className="product-right-slick">
                                            {product.productInfo.images.map((p, index) =>
                                                <div key={index}>
                                                    <ImageZoom image={p} className="img-fluid image_zoom_cls-0" />
                                                </div>
                                            )}
                                        </Slider>
                                    </div>
                                    <DetailsWithPrice symbol={symbol} item={product} navOne={this.state.nav1}/>
                                </div>
                            </div>
                        </div>
                    </section> : ''}
                {/*Section End*/}

                <section className="tab-product m-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-lg-12">
                                <DetailsTopTabs item={product} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* <RelatedProduct /> */}

            </div>
        )
    }
}

export default LeftImage;
