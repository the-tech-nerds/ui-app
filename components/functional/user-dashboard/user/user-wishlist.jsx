import React, { useEffect, useState } from 'react';
import WishList from '../../../wishlist/index'
export default function UserWishlist(props) {
    // const [wishlist, setUser] = useState(null);
    const { wishlist } = props;
    useEffect(() => {
        // setUser(JSON.parse(localStorage.getItem('userInfo')) || {});
    }, [])

    return (<WishList />);
}
