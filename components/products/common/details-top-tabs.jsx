import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const DetailsTopTabs = (props) => {
    const {item} = props;
        return (
            <section className="tab-product m-0">
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <Tabs className="tab-content nav-material">
                            <TabList className="nav nav-tabs nav-material">
                                <Tab className="nav-item">
                                    <span className="nav-link active">
                                        <i className="icofont icofont-ui-home"></i>Description</span>
                                    <div className="material-border"></div>
                                </Tab>
                                {/*<Tab className="nav-item">*/}
                                {/*    <span className="nav-link" ><i className="icofont icofont-man-in-glasses"></i>Details</span>*/}
                                {/*    <div className="material-border"></div>*/}
                                {/*</Tab>*/}
                                {/*<Tab className="nav-item">*/}
                                {/*    <span className="nav-link" >*/}
                                {/*        <i className="icofont icofont-contacts"></i>Video</span>*/}
                                {/*    <div className="material-border"></div>*/}
                                {/*</Tab>*/}
                                {/*<Tab className="nav-item">*/}
                                {/*    <span className="nav-link" >*/}
                                {/*        <i className="icofont icofont-contacts"></i>Write Review</span>*/}
                                {/*    <div className="material-border"></div>*/}
                                {/*</Tab>*/}
                            </TabList>
                            <TabPanel className="tab-pane fade mt-4 show active">
                                <div dangerouslySetInnerHTML={{__html: item.productInfo.description}}></div>
                            </TabPanel>
                            {/* <TabPanel>
                            </TabPanel>
                            <TabPanel>
                            </TabPanel> */}
                            {/* <TabPanel> */}
                                {/*<form className="theme-form mt-4">*/}
                                {/*    <div className="form-row">*/}
                                {/*        <div className="col-md-12 ">*/}
                                {/*            <div className="media m-0">*/}
                                {/*                <label>Rating</label>*/}
                                {/*                <div className="media-body ml-3">*/}
                                {/*                    <div className="rating three-star">*/}
                                {/*                        <i className="fa fa-star"></i>*/}
                                {/*                        <i className="fa fa-star"></i>*/}
                                {/*                        <i className="fa fa-star"></i>*/}
                                {/*                        <i className="fa fa-star"></i>*/}
                                {/*                        <i className="fa fa-star"></i>*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*        <div className="col-md-6">*/}
                                {/*            <label htmlFor="name">Name</label>*/}
                                {/*            <input type="text" className="form-control" id="name" placeholder="Enter Your name" required />*/}
                                {/*        </div>*/}
                                {/*        <div className="col-md-6">*/}
                                {/*            <label htmlFor="email">Email</label>*/}
                                {/*            <input type="text" className="form-control" id="email" placeholder="Email" required />*/}
                                {/*        </div>*/}
                                {/*        <div className="col-md-12">*/}
                                {/*            <label htmlFor="review">Review Title</label>*/}
                                {/*            <input type="text" className="form-control" id="review" placeholder="Enter your Review Subjects" required />*/}
                                {/*        </div>*/}
                                {/*        <div className="col-md-12">*/}
                                {/*            <label htmlFor="review">Review Title</label>*/}
                                {/*            <textarea className="form-control" placeholder="Wrire Your Testimonial Here" id="exampleFormControlTextarea1" rows="6"></textarea>*/}
                                {/*        </div>*/}
                                {/*        <div className="col-md-12">*/}
                                {/*            <button className="btn btn-solid" type="submit">Submit YOur Review</button>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</form>*/}
                            {/* </TabPanel> */}
                        </Tabs>
                    </div>
                </div>
            </section>
        )
}

export default DetailsTopTabs;
