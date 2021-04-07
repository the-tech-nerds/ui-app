import React from "react";
import {USER_DASHBOARD, USER_LOGOUT} from "../../../../../constants/app_constant";
function DropdownAfterLogin  ({props}) {
    const {translate} = props;
    const element =
        <li className="onhover-dropdown mobile-account">
            <HeaderUserProfile translate ={translate}/>
            <ul className="onhover-show-div">
                <li>
                    <i className="fa  fa-cogs mt-1" aria-hidden="true"></i>  <a  href={USER_DASHBOARD}>Mange Account</a>
                </li>
                {/*<li>*/}
                {/*    <a href="">My Orders</a>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <a>My Wishlist</a>*/}
                {/*</li>*/}
                <li>
                    <i className="fa fa-sign-out mt-1" aria-hidden="true"></i> <a href={USER_LOGOUT}>Logout</a>
                </li>
            </ul>
        </li>

    return element;
}

function HeaderUserProfile(props){
    const {translate} = props
     const profile = {
         width: '25px',
         height: '25px'
     }
     return <span>
         <img src={'/assets/images/profile.png'} style={profile}/> {translate('my_account')}
     </span>
}

export {DropdownAfterLogin, HeaderUserProfile}
