import React, { useEffect, useState } from 'react';
import axios from "axios";
import { SERVER_PATH, USER_ADDRESS } from "../../../../constants/app_constant";
import { MyAddress } from 'components/pages/address-book';
export default function DefaultAddress() {
    const [defaultAddress, setDefaultAddress] = useState(undefined);
    useEffect(() => {
        axios.get(`/address/default`)
            .then(res => {
                const address = res?.data?.data;
                if (address) {
                    const data = {
                        id: address.id,
                        name: address.name,
                        address: address.details,
                        mobile: address.contact_no,
                        region: address?.area?.name + '->' + address?.city?.name + '->' + address?.division?.name,
                        postcode: address.postcode,
                        is_default: address.is_default,
                        division_id: address.division_id,
                        city_id: address.city_id,
                        area_id: address.area_id
                    };
                    setDefaultAddress(data);
                }

            }).catch(error => {
                // console.log(error);
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
                {defaultAddress && <address className="mt-1">
                    <MyAddress item={defaultAddress} />
                </address>}
            </div>
        </div>
    </div>
    return element;
}
