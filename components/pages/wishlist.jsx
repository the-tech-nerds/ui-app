import React, { Component } from 'react';
import UserDashboard from "../functional/user-dashboard/user/user-dashboard";
import WishList from "../wishlist/index";
const Wishlist = ({ wishlist }) => {
    const dyComponent = <WishList Items={wishlist} />;
    return (
        <UserDashboard name={'Wishlist'} component={dyComponent} />
    )
}

export default Wishlist;