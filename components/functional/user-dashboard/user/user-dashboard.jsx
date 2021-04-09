import React from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import {utils} from "../index";
import UserProfilePic from "./user-profile-pic";
export default  function UserDashboard({name,title,component}){
    const menuList = [];
    const sideMenus =utils.getSideMenus(name);
    sideMenus.forEach((menu)=>{
        menuList.push(  <li className={menu.className} key={menu.id.toString()}><a className={menu.className} href={menu.url}>{menu.name}</a></li>)
    })


    const element =    <div>
        <Breadcrumb title={title}/>
        {/*Dashboard section*/}
        <section className="section-b-space">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        {/*<div className="account-sidebar">*/}
                        {/*    <a href={USER_DASHBOARD} className="popup-btn">*/}
                        {/*        my account*/}
                        {/*    </a>*/}
                        {/*</div>*/}

                        <div className="dashboard-left">
                            {/*<div className="collection-mobile-back">*/}
                            {/*    <span className="filter-back">*/}
                            {/*        <i className="fa fa-angle-left" aria-hidden="true"></i> back*/}
                            {/*    </span>*/}
                            {/*</div>*/}
                            <div className="block-content">
                               <UserProfilePic/>
                                <ul>
                                    {menuList}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="dashboard-right">
                            <div className="dashboard">
                                <div className="box-head">
                                    <h2>{title}</h2>
                                </div>
                                <div>
                                    <div>
                                        {component}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
    return element;
}
