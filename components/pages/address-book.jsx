import React, {Component} from 'react';
import Root from "../layouts/Root";
import ReactDom from "react-dom";
import AddAddress from "../functional/user-dashboard/user/address-form";
import UserDashboard from "../functional/user-dashboard/user/user-dashboard";
class AddressBook extends Component {

    constructor (props) {
        super (props)
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this)
        const data = window.addressResponse.data.map((m) =>{
            return {
             'name' : m.name,
              'address': m.details,
                'mobile': m.contact_no,
                'region': m.division_id + '->' + m.city_id + '->' + m.area_id,
                'postcode': m.postcode,
                'address_default': m.is_default ? 'Default': 'Make default'
            };
        })
        this.state = {
            addresses : data,
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
    render (){
        const isViewMode = this.state.isViewMode;
        let addresses = [];
        this.state.addresses.forEach( (d, index)=>{
            addresses.push( <MyAddress key={index} item={d}/>)
        })
        let dyComponent;
        if (isViewMode) {
            dyComponent = <div>
                <button type="submit"  onClick={this.handleClick} className="btn btn-solid mb-2">add new address</button>
                {addresses}
            </div>
        } else {
            dyComponent = <AddAddress cancel ={this.handleCancel}/>;
        }
        return (
            <UserDashboard name ={'AddressBook'} component={dyComponent} title={'Address Book'}/>
        )
    }
}

export default function MyAddress({item}){
    const error = {
        fontSize: "8px"
    };
    const element = <div className="card mb-2" >
        <div className="card-body">
            <h5 className="card-title">{item.name} <span style={error} className="btn btn-sm btn-outline-primary">{item.address_default}</span></h5>
            <h6 className="card-subtitle mb-2 text-muted">{item.mobile}</h6>
            <p className="card-text">
                {item.address}, {item.region}, {item.postalCode}</p>
            <span className="btn btn-sm btn-outline-secondary">Edit</span>
            <span className="btn btn-sm btn-outline-danger ml-3">Delete</span>
        </div>
    </div>
    return element
}



const addressBook = (<Root>
    <AddressBook/>
</Root>)
if(typeof document !== "undefined" && document.getElementById('addressBook')){
    ReactDom.render(addressBook, document.getElementById('addressBook'));
}
