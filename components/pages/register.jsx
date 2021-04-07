import React, {Component} from 'react';
import Root from "../layouts/Root";
import ReactDom from 'react-dom';
import RegisterForm from "../functional/auth/registration-form";


class Register extends Component {
    constructor (props) {
        super (props);
    }
    render (){
        return <RegisterForm />;
    }
}

export default Register
