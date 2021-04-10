import React, { Component } from 'react';
import Root from "../layouts/Root";
import ReactDom from "react-dom";
import UserDashboard from "../functional/user-dashboard/user/user-dashboard";
import ResetPasswordForm from "../functional/user-dashboard/user/change-password-form";
class ResetPassword extends Component {

    constructor(props) {
        super(props)
        debugger
        this.state = {
            user: this.props.user
        }
    }
    render() {
        const dyComponent = <ResetPasswordForm user={this.state.user} />;

        return (
            <UserDashboard name={'ChangePassword'} component={dyComponent} title={'Reset Password'} />
        )
    }
}

export default ResetPassword;
