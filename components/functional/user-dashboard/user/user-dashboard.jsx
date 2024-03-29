import React from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import {utils} from "../index";
import UserProfilePic from "./user-profile-pic";
import Link from 'next/link';
export default  function UserDashboard({name,title,component}){
    const menuList = [];
    const sideMenus = utils.getSideMenus(name);

    sideMenus.forEach((menu)=>{
        menuList.push(<li className={menu.className} key={menu.id.toString()}><Link className={menu.className} href={menu.href} as={menu.as}>{menu.name}</Link></li>)
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

                        <div className="dashboard-left card no-border">
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
                        <div className="dashboard-right card no-border">
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
