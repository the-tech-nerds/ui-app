import { IconButton } from '@material-ui/core';
import { Add, ContactPhone, LocationCity } from '@material-ui/icons';
import React, { Component, useState } from 'react';
import AddAddress from "../functional/user-dashboard/user/address-form";
import UserDashboard from "../functional/user-dashboard/user/user-dashboard";
import axios from "axios";
import { USER_ADDRESS } from 'constants/app_constant';
import { errorHandle } from 'share';
import AlertMessage from 'components/common/alert/alert-message';
import { toast } from 'react-toastify';
export class AddressBook extends Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this)
        const { address = [] } = this.props
        const data = (address || []).map((m) => {
            return {
                id: m.id,
                name: m.name,
                address: m.details,
                mobile: m.contact_no,
                region: m?.area?.name + '->' + m?.city?.name + '->' + m?.division?.name,
                postcode: m.postcode,
                is_default: m.is_default,
                division_id: m.division_id,
                city_id: m.city_id,
                area_id: m.area_id
            };
        })
        this.state = {
            addresses: data,
            isViewMode: true
        }
    }
    handleClick() {
        this.setState(state => ({
            isViewMode: !state.isViewMode
        }))
    }
    handleCancel() {
        this.setState(state => ({
            isViewMode: !state.isViewMode
        }))
    }
    render() {
        const isViewMode = this.state.isViewMode;
        let addresses = [];
        this.state.addresses.forEach((d, index) => {
            addresses.push(<MyAddress key={index} item={d} />)
        })
        let dyComponent;
        if (isViewMode) {
            dyComponent = <div>
                <div className="d-flex justify-content-end">
                    <IconButton aria-label="delete" onClick={this.handleClick} color="primary" size="large">
                        <Add fontSize="inherit" />
                    </IconButton>
                </div>
                {addresses}
            </div>
        } else {
            dyComponent = <AddAddress cancel={this.handleCancel} />;
        }
        return (
            <UserDashboard name={'AddressBook'} component={dyComponent} title={'Address Book'} />
        )
    }
}

export function MyAddress({ item }) {
    const [serverError, setError] = useState(undefined);
    const [isEditMode, setEditMode] = useState(false);
    const error = {
        fontSize: "8px"
    };
    const deleteAddress = () => {
        if (item.is_default) {
            setError('default address can not delete. Please make other address as default.');
            return;
        }
        axios.delete(`/address/${item.id}`)
            .then(res => {
                toast.success('deleted');
                window.location.href = USER_ADDRESS;
            }).catch(error => {
                const err = errorHandle.serverError(error.response.data.message);
                if (err) {
                    setError(err);
                } else {
                    setError(
                        'delete failed. please try again'
                    );
                }
            })
    }
    const makeDefaultAddress = () => {
        axios.put(`/address/default/${item.id}`, null)
            .then(res => {
                toast.success('updated');
                window.location.href = USER_ADDRESS;
            }).catch(error => {
                const err = errorHandle.serverError(error.response.data.message);
                if (err) {
                    setError(err);
                } else {
                    setError(
                        'default address update failed. please try again'
                    );
                }
            })
    }
    const editModeEnable = () => {
        setEditMode(true);
    }
    const handleCancel = () => {
        setEditMode(false);
    }
    if (!isEditMode) {
        const element = <div className="card mb-2" >
            <div className="card-body">
                {serverError && <AlertMessage className="alert alert-danger alert-dismissible">{serverError}</AlertMessage>}
                <h5 className="card-title font-weight-bold">{item.name}{item.is_default && <span className="badge badge-secondary">Default</span>}</h5>
                <div className="d-flex">
                    <div>
                        <IconButton aria-label="delete" color="primary" size="small">
                            <ContactPhone fontSize="inherit" />
                        </IconButton>
                    </div>
                    <div className="mt-2 ml-2">
                        <h6 className="card-subtitle mb-0 text-muted">{item.mobile}</h6>
                    </div>
                </div>
                <div className=" d-flex">
                    <IconButton aria-label="delete" color="primary" size="small">
                        <LocationCity fontSize="inherit" />
                    </IconButton>
                    <div className="mt-2 ml-2">
                        <h6 className="card-subtitle mb-0 text-muted">{item.address}</h6>
                    </div>
                </div>
                <p className="card-text ml-2">
                    {item.region}, {item.postalCode}</p>
                <span style={error} onClick={editModeEnable} className="btn btn-sm btn-outline-secondary">Edit</span>
                <span style={error} onClick={deleteAddress} className="btn btn-sm btn-outline-danger ml-3">Delete</span>
                {!item.is_default && <span style={error} onClick={makeDefaultAddress} className="btn btn-sm btn-outline-primary ml-3">Make Default</span>}
            </div>
        </div>
        return element
    } else {
        const element = <AddAddress cancel={handleCancel} address={item} />
        return element;
    }

}
