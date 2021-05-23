import React from 'react';
import {withTranslate} from 'react-redux-multilingual'

// Custom Components
import HeaderThree from './common/headers/header-three';

import FooterOne from "./common/footers/footer-one";

// ThemeSettings
import ThemeSettings from "./common/theme-settings"
import {useDispatch, useSelector} from 'react-redux';
import {fetchItemsForCategory} from 'actions';
import {fetchItemsForWishlist, fetchUserDetails} from "../actions";


const App = ({ children }) => {
    const currentShop = useSelector(state => state.shops.current);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    if(isLoggedIn){
        dispatch(fetchUserDetails());
        dispatch(fetchItemsForWishlist());
    }

    if (currentShop) {
      dispatch(fetchItemsForCategory(currentShop.type_id));
    }
    return (
        <div>
            <HeaderThree logoName={'logo.png'} />
            <div className="app-body" id="app-body">
                {children}
                <FooterOne logoName={'logo.png'} />
                <ThemeSettings />
            </div>
        </div>
    );
}


export default withTranslate(App);
