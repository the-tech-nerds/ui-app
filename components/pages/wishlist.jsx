import React, { Component } from 'react';
import UserDashboard from "../functional/user-dashboard/user/user-dashboard";
import WishList from "../wishlist/index";
const Wishlist = (props) => {
    const dyComponent = <WishList Items={props?.wishlist?.data} />;
    return (
        <UserDashboard name={'Wishlist'} component={dyComponent} />
    )
}

export default Wishlist;