import React, {Component} from 'react';
import Root from "../layouts/Root";
import ReactDom from "react-dom";
import UserDashboard from "../functional/user-dashboard/user/user-dashboard";
import ResetPasswordForm from "../functional/user-dashboard/user/change-password-form";
class ResetPassword extends Component {

    constructor (props) {
        super (props)
    }
    render (){
         const   dyComponent = <ResetPasswordForm/>;

        return (
            <UserDashboard name ={'ChangePassword'} component={dyComponent} title={'Reset Password'}/>
        )
    }
}


const resetPassword = (<Root>
    <ResetPassword/>
</Root>)
if(typeof document !== "undefined" && document.getElementById('reset-password')){
    ReactDom.render(resetPassword, document.getElementById('reset-password'));
}
