import React, {Component, useState} from 'react';
import ReactDom from 'react-dom';
import Breadcrumb from "../common/breadcrumb";
import Root from "../layouts/Root";
import LoginForm from "../functional/auth/login-form";

class Login extends Component {

    constructor (props) {
        super (props);
    }
    render (){
        return <LoginForm />;
    }
}

export default Login;