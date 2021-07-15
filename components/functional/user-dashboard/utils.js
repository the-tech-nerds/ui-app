import { CHANGE_PASSWORD, USER_ADDRESS, USER_DASHBOARD, USER_LOGOUT, WISHLIST } from "../../../constants/app_constant";

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
            href: '/views/dashboard',
            as: USER_DASHBOARD
        },
        {
            id: 1,
            name: 'Address Book',
            className: name === 'AddressBook' ? 'text-danger' : 'Inactive',
            href: '/views/address',
            as: USER_ADDRESS
        },
        {
            id: 2,
            name: 'Wishlist',
            className: name === 'Wishlist' ? 'text-danger' : 'Inactive',
            href: '/views/wishlist',
            as: WISHLIST
        },
        {
            id: 3,
            name: 'Change Password',
            className: name === 'ChangePassword' ? 'text-danger' : 'Inactive',
            href: '/views/change-password',
            as: CHANGE_PASSWORD
        },
        {
            id: 4,
            name: 'Log Out',
            className: name === 'LogOut' ? 'text-danger' : 'Inactive',
            href: USER_LOGOUT
        },
    ]
}

export function ValidateEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

}

export function PhoneNumber(phone) {
    const phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (phone.match(phoneno)) {
        return phone.length === 11;
    }

    return false;

}

