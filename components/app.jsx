import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual'

// Custom Components
import HeaderOne from './common/headers/header-one';
import HeaderTwo from './common/headers/header-two';
import HeaderThree from './common/headers/header-three';
import headerFour from './common/headers/header-four';

import FooterOne from "./common/footers/footer-one";
import FooterTwo from "./common/footers/footer-two";
import FooterThree from "./common/footers/footer-three";

// ThemeSettings
import ThemeSettings from "./common/theme-settings"
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsForCategory } from 'actions';



const App = ({ children }) => {
    const currentShop = useSelector(state => state.shops.current);
    const dispatch = useDispatch();
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
