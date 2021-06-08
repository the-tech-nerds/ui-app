import { IconButton } from '@material-ui/core';
import { Add, ContactPhone, LocationCity } from '@material-ui/icons';
import React, { Component } from 'react';
import AddAddress from "../functional/user-dashboard/user/address-form";
import UserDashboard from "../functional/user-dashboard/user/user-dashboard";
class AddressBook extends Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this)
        const { address = [] } = this.props
        const data = (address || []).map((m) => {
            return {
                'name': m.name,
                'address': m.details,
                'mobile': m.contact_no,
                'region': m?.area?.name + '->' + m?.city?.name + '->' + m?.division?.name,
                'postcode': m.postcode,
                'address_default': m.is_default ? 'Default' : 'Make default'
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
                <div class="d-flex justify-content-end">
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

function MyAddress({ item }) {
    const error = {
        fontSize: "8px"
    };
    const element = <div className="card mb-2" >
        <div className="card-body">
            <h5 className="card-title font-weight-bold">{item.name}{item.is_default && <span class="badge badge-secondary">Default</span>}</h5>
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
            <span style={error} className="btn btn-sm btn-outline-secondary">Edit</span>
            <span style={error} className="btn btn-sm btn-outline-danger ml-3">Delete</span>
            {!item.is_default && <span style={error} className="btn btn-sm btn-outline-primary ml-3">{item.address_default}</span>}
        </div>
    </div>
    return element
}

export default AddressBook;
