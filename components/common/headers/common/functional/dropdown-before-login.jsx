import React from "react";
import { withTranslate } from 'react-redux-multilingual'
import {USER_LOGIN, USER_SIGNUP} from "../../../../../constants/app_constant";
import {HeaderUserProfile} from "./dropdown-after-login";
export default function DropdownBeforeLogin  ({props}) {
    const {translate} = props;
    const element =
        <li className="onhover-dropdown mobile-account">
          <HeaderUserProfile translate = {translate}/>
            <ul className="onhover-show-div">
                <li>
                    <i className="fa fa-sign-in mt-1" aria-hidden="true"></i><a href={USER_LOGIN} data-lng="en">Login</a>
                </li>
                <li>
                    <i className="fa fa-user-plus mt-1" aria-hidden="true"></i><a href={USER_SIGNUP} data-lng="en">Register</a>
                </li>
            </ul>
        </li>
    return element;
}
