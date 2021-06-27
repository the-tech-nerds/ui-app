import { useForm } from "react-hook-form";
import axios from "axios";
import { ACCESS_TOKEN, Facebook_LOGIN, USER_LOGIN, GMAIL_LOGIN } from "../../../constants/app_constant";
import Breadcrumb from "../../common/breadcrumb";
import React, { useState, useRef } from 'react';
import { errorHandle } from "../../../share";
import AlertMessage from "../../common/alert/alert-message";
import { ValidateEmail, PhoneNumber } from "../user-dashboard/utils";
import '../../styles/user_dashbord.module.scss'
import OtpForm from "../otp/otp-form";
import {PasswordStrengthMeter} from "../../common/password-strength-meter";
import Button from "../../common/buttons/button";

export default function RegisterForm() {
    const { register, errors, watch, getValues } = useForm({
            defaultValues: {
                is_used_promotion: true
            }
        }
    );
    const [serverError, setError] = useState({
        error: undefined
    })
    const  [isLoading, setLoading] = useState(false)
    const [otpInfo, setOtpInfo] = useState(undefined);
    const [isVerified, setIsVerified] = useState(false);
    const [is_used_promotion, setIs_used_promotion] = useState(true);
    const [signUpWith, setSignUpWith] = useState({
        name: 'phone'
    })
    const password = useRef({});
    const phone = watch("phone");
    const email = watch("email");
    password.current = watch("password");
    const onSubmit = e => {
        e.preventDefault();
        const data = getValues();
        setLoading(true);
        setError({
            error: undefined
        });

        if (!isVerified) {
            setError({
                error: 'need to verify ' + (phone ? 'phone number' : 'email address')
            });
            return;
        }
        data.is_used_promotion = is_used_promotion;

        axios.post(`/sign-up`, data)
            .then(res => {
                setLoading(false);
                localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
                window.location.href = USER_LOGIN;
            }).catch(error => {
                setLoading(false);
            const err = errorHandle.serverError(error.response.data.message);
            if (err) {
                setError({
                    error: err
                });
            } else {
                setError({
                    error: 'Create profile failed. please try again'
                });
            }

        })
    };
    const verify = () => {
        let data = null;
        setError({
            error: undefined
        });
        if (phone) {
            if (!PhoneNumber(phone)) {
                setError({
                    error: 'phone number is incorrect.'
                });
                return;
            }
            setLoading(true);
            data = {
                phone: phone,
                purpose: 'phone verification'
            }
            axios.post(`/user/phone`, data).then(res => {
                if(res.data.data){
                    setLoading(false);
                    setError({
                        error: `${data.phone} already exist.please login with this phone number.`
                    })
                } else{
                    generateOtp(data);
                }

            }).catch(error => {
                setLoading(false)
                const err = error.response.data.message;
                if (err) {
                    setError({
                        error: err
                    });
                } else {
                    setError({
                            error: 'Otp sent failed. please try again'
                        }
                    );
                }
            })
        }
        if (email) {
            if (!ValidateEmail(email)) {
                setError({
                    error: 'email address is incorrect.'
                });
                return;
            }
            setLoading(true);
            data = {
                email: email,
                purpose: 'email verification'
            }
            axios.post(`/user/email`, data).then(res => {
                if(res.data.data){
                    setLoading(false);
                    setError({
                        error: `${data.email} already exist.please login with this email.`
                    })
                } else{
                    generateOtp(data);
                }
            }).catch(error => {
                setLoading(false);
                const err = error.response.data.message;
                if (err) {
                    setError({
                        error: err
                    });
                } else {
                    setError({
                            error: 'Otp sent failed. please try again'
                        }
                    );
                }
            })
        }

    };

    const generateOtp = (data) => {
        axios.post(`/otp/generate`, data)
            .then(res => {
                setLoading(false);
                setOtpInfo(res.data.data);
            }).catch(error => {
            setLoading(false);
            const err = errorHandle.serverError(error.response.data.message);
            if (err) {
                setError({
                    error: err
                });
            } else {
                setError({
                        error: 'Otp sent failed. please try again'
                    }
                );
            }
        })
    }

    const handleSwithOption = (name) => {
        if (name == 'email') {
            setSignUpWith({
                name: 'email'
            });
        }
        if (name == 'phone') {
            setSignUpWith({
                name: 'phone'
            });
        }
        setIsVerified(false);
        setOtpInfo(undefined);
    }
    const handleOtpResponse = () => {
        setIsVerified(true);
        setOtpInfo(undefined);
    }
    const handleCancel = () => {
        setOtpInfo(undefined);
    }

    const handleChange=()=>{
        setIs_used_promotion(!is_used_promotion);
    }
    const error = {
        color: "red",
        fontSize: "12px"
    };
    return (
        <div>
            <Breadcrumb title={'create account'} />

            {/*Regsiter section*/}
            <section className="register-page section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h3>create account</h3>
                            <div className="theme-card card">
                                {serverError.error && <AlertMessage className = "alert alert-danger alert-dismissible">{serverError.error}</AlertMessage>}
                                {otpInfo && <OtpForm otpInfo={otpInfo} cancel={handleCancel} otpResponse={handleOtpResponse} />}
                                <form className="theme-form" onSubmit={onSubmit}>
                                    <div className="form-row">
                                        {signUpWith.name == 'email' && <div className="col-md-12">
                                            <label htmlFor="email">email</label>
                                            <input type="text"
                                                  readOnly={isVerified}
                                                   name="email" className="form-control" id="email"
                                                   {...register('email', {
                                                       required: true,
                                                       pattern: {
                                                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                           message: "invalid email address",
                                                       },
                                                   })}
                                                   placeholder="enter your emial, example: example@gmail.com" required="" />
                                            {errors && errors.email && <span className="mb-2" style={error}>Email Name is required</span>}
                                        </div>}
                                        {signUpWith.name == 'phone' && <div className="col-md-12">
                                            <label htmlFor="phone">Mobile</label>
                                            <input
                                                 readOnly={isVerified}
                                                 type="text"
                                                 name="phone"
                                                 className="form-control"
                                                 id="phone"
                                                {...register('phone', {
                                                    required: true, minLength: 11,
                                                    pattern: {
                                                        value: /^[0-9]*$/,
                                                        message: "invalid phone number",
                                                    },
                                                })}
                                                placeholder="enter your phone number, example: 0167****753"
                                                required=""
                                            />
                                            {errors && errors.phone && <span className="mb-2" style={error}>please input valid phone number</span>}
                                        </div>}
                                        {!otpInfo && !isVerified && <Button type="button"  onClick={verify}  loading={isLoading} disabled={isLoading}>Verify</Button>}
                                    </div>
                                    <div className="form-row mt-2">
                                        <div className="col-md-6">
                                            <label htmlFor="first_name">First Name</label>
                                            <input type="text"
                                            {...register('first_name', { required: true })}
                                             className="form-control" id="first_name"
                                                   name="first_name" placeholder="First Name" required="" />
                                            {errors && errors.first_name && <span className="mb-2" style={error}>First Name is required</span>}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="review">Last Name</label>
                                            <input type="text"
                                                   name="last_name" className="form-control" id="last_name"
                                                    {...register('last_name', { required: true })}
                                                   placeholder="Last Name" required="" />
                                            {errors && errors.last_name && <span className="mb-2" style={error}>Last Name is required</span>}
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <label htmlFor="review">Password</label>
                                            <input type="password" name="password" className="form-control" id="password"
                                                   placeholder="Enter your password"
                                                    {...register('password', { required: true, minLength: 8 })}
                                                    />
                                            {errors &&  errors.password && errors.password.type === "required" && (
                                                <span style={error} role="alert" className="mb-2">Password is required</span>
                                            )}
                                            {errors && errors.password && errors.password.type === "minLength" && (
                                                <span style={error} role="alert">Minimum length is 8</span>
                                            )}
                                            <PasswordStrengthMeter text={password.current}/>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="ConfirmPassword">Confirm Password</label>
                                            <input type="password"
                                                {...register('confirm_password', {
                                                    validate: value =>
                                                    value === password.current || "The passwords do not match"
                                                })}
                                                   className="form-control" id="new_password_confirm"
                                                   name="confirm_password" placeholder="Confirm password" />
                                            {errors && errors.confirm_password && <span className="mb-2" style={error}>{errors.confirm_password.message}</span>}
                                        </div>
                                        <div className="col-md-12">

                                            <label >
                                                <input  onClick={handleChange} type="checkbox"  defaultValue={is_used_promotion}
                                                {...register('is_used_promotion')}
                                                 name="is_used_promotion"
                                                 />
                                                &nbsp; I want to receive exclusive offers and promotions from Khan fresh corner.</label>
                                        </div>
                                        <Button type="submit"  loading={isLoading} disabled={isLoading}>Create Account</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6 right-login">
                            <h3>Signup/Login</h3>
                            <div className="theme-card card authentication-right">
                                <h6 className="title-font">Create an Account</h6>
                                <p>Sign up for a free account at our store. Registration is quick and easy. It
                                    allows you to be able to order from our shop. To start shopping click
                                    register.</p>
                                {signUpWith.name == 'phone' && <div className="text-center">
                                    <a onClick={() => handleSwithOption('email')} className="btn btn-solid">Signup with email</a>
                                </div>
                                }
                                {signUpWith.name == 'email' && <div className="text-center">
                                    <a onClick={() => handleSwithOption('phone')} className="btn btn-solid">Signup with phone</a>
                                </div>
                                }
                                <div className="text-center or-seperator"><i>or</i></div>
                                <p className="text-center">Login with your social media account</p>
                                <div className="text-center social-btn">
                                    <a href={Facebook_LOGIN} className="btn btn-secondary facebook-btn"><i
                                        className="fa fa-facebook"></i>&nbsp; Facebook</a>
                                    {/*<a href="#" className="btn btn-info ml-2"><i className="fa fa-twitter"></i>&nbsp; Twitter</a>*/}
                                    <a href={GMAIL_LOGIN} className="btn btn-danger ml-2"><i className="fa fa-google"></i>&nbsp; Google</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

