
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { errorHandle } from "../../../../share";
import AlertMessage from "../../../common/alert/alert-message";
import { UPDATE_EMAIL, USER_DASHBOARD } from "../../../../constants/app_constant";
import OtpForm from '../../otp/otp-form';
import Button from "../../../common/buttons/button";
import {ValidateEmail} from "../utils";

export default function UpdateEmail({ cancel }) {
    const { register, handleSubmit, errors } = useForm();
    const [step, setStep] = useState(1);
    const  [otpInfo, setOtpInfo] = useState(undefined);
    const [serverError, setError] = useState(undefined);
    const  [isLoading, setLoading] = useState(false);

    const onSubmit = value => {
        const data = {
            email: value.email,
            purpose: 'email verification'
        }
        if (ValidateEmail(data.email)) {
            setLoading(true);
            axios.post(`/user/email`, data).then(res => {
                if (res.data.data) {
                    setLoading(false);
                    setError(
                        `${data.email} already has account.please use other email address.`
                    )
                } else {
                      generateOtp(data);
                }
            })
        } else {
            setError(
                'please enter valid email address. e.g. exmple@gmail.com'
            );
        }
    };
    const generateOtp = (data) =>{
        axios.post(`/otp/generate`,data)
                .then(res => {
                    setLoading(false);
                    setOtpInfo( res.data.data);
                    setStep(2);
                }).catch( error =>{
                    setLoading(false);
                const err =errorHandle.serverError(error.response.data.message) ;
                if(err){
                    setError(err);
                } else {
                    setError(
                        'Otp sent failed. please try again'
                    );
                }
            })
       }

    function handleCancel(){
        setStep(1);
    }
    function  handleOtpResponse(){
        const data = {
            email: otpInfo.sent_email
        }
        axios.put(UPDATE_EMAIL, data)
        .then(res => {
            window.location.href = USER_DASHBOARD;
        }).catch(error => {
            const err = errorHandle.serverError(error.response.data.message);
            if (err) {
                setError(err);
            } else {
                setError(
                    'email update failed. please try again'
                );
            }
        })
    }
    const error = {
        color: "red",
        fontSize: "12px"
    };
    if (step == 1) {
        const element = <div className=" register-page section-b-space mt-4">
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="theme-card">
                            {serverError && <AlertMessage className = "alert alert-danger alert-dismissible">{serverError}</AlertMessage>}
                            <form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <label htmlFor="email">email</label>
                                        <input type="text" name="email" className="form-control" id="email"
                                            {...register('email',{
                                                required: true,
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "invalid email address",
                                                },
                                            })} placeholder="enter email. e.g. example@gmail.com" required="" />
                                        {errors && errors.email && <span style={error}>valid email address is required</span>}
                                    </div>
                                </div>
                                <div className="form-row mt-2">
                                    <div className="col-md-6">
                                        <Button type="submit" loading={isLoading} disabled={isLoading}>Update</Button>
                                        <button type="button" className="btn btn-solid ml-4" onClick={cancel} >Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        return element;
    }else {
        return <OtpForm otpInfo ={otpInfo} cancel = {handleCancel} otpResponse = {handleOtpResponse}/>
    }
}
