import { CHANGE_PASSWORD, USER_ADDRESS, USER_DASHBOARD, USER_LOGOUT } from "../../../constants/app_constant";

export const Gender = [
    {
        id: 1,
        value: 'Male'
    },
    {
        id: 2,
        value: 'Female'
    },
    {
        id: 3,
        value: 'Other'
    }
]
export const AlertType = {
    WARNING: 'warning',
    SUCCESS: 'success',
    DANGER: 'danger'
}
export function getSideMenus(name) {
    return [
        {
            id: 0,
            name: 'Account Info',
            className: name === 'AccountInfo' ? 'text-danger' : 'Inactive',
            url: USER_DASHBOARD
        },
        {
            id: 1,
            name: 'Address Book',
            className: name === 'AddressBook' ? 'text-danger' : 'Inactive',
            url: USER_ADDRESS
        },
        {
            id: 2,
            name: 'Change Password',
            className: name === 'ChangePassword' ? 'text-danger' : 'Inactive',
            url: CHANGE_PASSWORD
        },
        {
            id: 3,
            name: 'Log Out',
            className: name === 'LogOut' ? 'text-danger' : 'Inactive',
            url: USER_LOGOUT
        },
    ]
}

export function ValidateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return true;
    }
    return false;
}

export function PhoneNumber(phone) {
    var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (phone.match(phoneno)) {
        return phone.length == 11 ? true : false;
    }

    return false;

}

