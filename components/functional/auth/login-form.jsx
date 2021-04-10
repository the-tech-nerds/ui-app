import {useForm} from "react-hook-form";
import axios from "axios";
import {
    Facebook_LOGIN,
    GMAIL_LOGIN,
    FORGOT_PASSWORD,
    USER_DASHBOARD, USER_LOGIN,
    USER_SIGNUP
} from "../../../constants/app_constant";
import Breadcrumb from "../../common/breadcrumb";
import React, {useState} from 'react';
import {errorHandle} from "../../../share";
import  '../../styles/user_dashbord.module.scss'
import AlertMessage from "../../common/alert/alert-message";
import Button from "../../common/buttons/button";

export default  function    LoginForm(){
    const { register, handleSubmit, errors  } = useForm();
    const  [serverError, setError] = useState({
        error: undefined
    })
    const  [isLoading, setLoading] = useState(false)
    const onSubmit = (data, e) => {
        e.preventDefault();
        setError({
            error: undefined
        });
        setLoading(true);
        axios.post(USER_LOGIN,data)
            .then(res => {
                setLoading(false);
                window.isLogin = true;
                window.location.href=USER_DASHBOARD;
            }).catch( error =>{
            const err =errorHandle.serverError(error.response.data.message) ;
            if(err){
                setError({
                    error: err
                });
                setLoading(false);
            } else {
                setError({
                    error: 'Login failed. please try again'
                });
                setLoading(false);
            }
        })
    };
    const error = {
        fontSize: "12px",
        color: "red"
    };
    return( <div>
        <Breadcrumb title={'Login'}/>
        {/*Login section*/}
        <section className="login-page section-b-space">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h3>Login</h3>
                        <div className="theme-card">
                            {serverError.error && <AlertMessage className = "alert alert-danger alert-dismissible">{serverError.error}</AlertMessage>}
                            <form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label htmlFor="email">User Name</label>
                                    <input
                                         type="text"
                                         name="username"
                                         className="form-control"
                                         {...register('username', { required: true })}
                                         id="email"
                                        placeholder="Login with email or phone number"
                                          />
                                    {errors && errors.username && <span style={error}>User name is required</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="review">Password</label>
                                    <input type="password" name="password" className="form-control" id="review"
                                            {...register('password', { required: true })}
                                               placeholder="Enter your password" required="" />
                                    {errors && errors.password && <span style={error}>Password is required</span>}
                                </div>
                                <Button type="submit"   loading={isLoading} disabled={isLoading}>Login</Button>
                                <a className="float-right mt-4" href={FORGOT_PASSWORD}>Forgot Password?</a>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6 right-login">
                        <h3>Create An Account</h3>
                        <div className="theme-card authentication-right">
                            <h6 className="title-font">Create A Accounts</h6>
                            <p>Sign up for a free account at our store. Registration is quick and easy. It
                                allows you to be able to order from our shop. To start shopping click
                                register.</p>
                            <div className="text-center">
                                <a href={USER_SIGNUP} className="btn btn-solid">Create an Account</a>
                            </div>

                            <div className="text-center or-seperator"><i>or</i></div>
                            <p className="text-center">Login with your social media account</p>
                            <div className="text-center social-btn">
                                <a href={Facebook_LOGIN} className="btn btn-secondary facebook-btn"><i className="fa fa-facebook"></i>&nbsp; Facebook</a>
                                {/*<a href="#" className="btn btn-info ml-2"><i className="fa fa-twitter"></i>&nbsp; Twitter</a>*/}
                                <a href={GMAIL_LOGIN} className="btn btn-danger ml-2"><i className="fa fa-google"></i>&nbsp; Google</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>);
}
