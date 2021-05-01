import React from "react";
import { withTranslate } from 'react-redux-multilingual'
import Link from 'next/link';
import {USER_LOGIN, USER_SIGNUP} from "../../../../../constants/app_constant";
import {HeaderUserProfile} from "./dropdown-after-login";
export default function DropdownBeforeLogin  ({props}) {
    const {translate} = props;
    const element =
        <li className="onhover-dropdown mobile-account">
          <HeaderUserProfile translate = {translate}/>
            <ul className="onhover-show-div">
                <li>
                    <i className="fa fa-sign-in mt-1" aria-hidden="true"></i><Link href="/views/login" as={USER_LOGIN} data-lng="en">Login</Link>
                </li>
                <li>
                    <i className="fa fa-user-plus mt-1" aria-hidden="true"></i><Link href="/views/register" as={USER_SIGNUP} data-lng="en">Register</Link>
                </li>
            </ul>
        </li>
    return element;
}
