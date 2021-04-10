import React, { Component, useState } from 'react';

import LoginForm from "../functional/auth/login-form";

class Login extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return <LoginForm />;
    }
}

export default Login;