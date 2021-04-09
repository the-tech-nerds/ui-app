import React, { useEffect } from 'react';
import axios from "axios";
import { SERVER_PATH, USER_ADDRESS } from "../../../../constants/app_constant";
export default function DefaultAddress() {
    useEffect(() => {
        axios.get(SERVER_PATH + `user/address/default`)
            .then(res => {
                //  window.location.href="/dashboard";
            }).catch(error => {
                //  const err = error.response.data.message;
                console.log(error);
            })
    }, []);


    const element = <div className="box">
        <div className="box-title">
            <h3>Address Book</h3>
            <a href={USER_ADDRESS}>Manage Addresses</a>
        </div>
        <div className="row">
            <div className="col-sm-12">
                <h6>Default Shipping Address</h6>
                <address>
                    You have not set a default shipping address.<br />
                    <a href="/user/address">Edit Address</a>
                </address>
            </div>
        </div>
    </div>
    return element;
}
