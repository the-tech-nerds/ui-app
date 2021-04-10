
import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import {errorHandle} from "../../../../share";
import OtpForm from "../../otp/otp-form";
import AlertMessage from "../../../common/alert/alert-message";
import {USER_DASHBOARD} from "../../../../constants/app_constant";
import Button from "../../../common/buttons/button";
import {PhoneNumber} from "../utils";

export  default function UpdatePhone({cancel, verifyPhone}) {
    const { register, handleSubmit, errors  } = useForm();
    const  [step, setStep] = useState(1);
    const  [otpInfo, setOtpInfo] = useState(undefined);
    const  [serverError, setError] = useState(undefined);
    const  [isLoading, setLoading] = useState(false);

    const onSubmit = value => {
        const data = {
            phone: value.phone,
            purpose: 'phone verification'
        }
        if(PhoneNumber(data.phone)){
            setLoading(true);
            axios.post(`/user/phone`, data).then(res => {
                if(res.data.data){
                    setLoading(false);
                    setError(
                        `${data.phone} already has account.please use other phone number.`
                    )
                } else{
                    generateOtp(data);
                }

            })
        } else {
            setError(
                'please enter valid phone number e.g 0167******3'
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
            phone: otpInfo.sent_number
        }
        axios.put(`/user/phone/update`,data)
            .then(res => {
                window.location.href=USER_DASHBOARD;
            }).catch( error =>{
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

    const error = {
        color: "red",
        fontSize: "12px"
    };
    if( step == 1){
        const element =   <div className=" register-page section-b-space mt-4">
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="theme-card">
                            {serverError && <AlertMessage className = "alert alert-danger alert-dismissible">{serverError}</AlertMessage>}
                            <form className="theme-form"  onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <input type="text" name="phone"  className="form-control" id="phone"
                                               ref={register({ required: true, minLength: 11,
                                                   pattern:{
                                                       value: /^[0-9]*$/,
                                                       message: "invalid phone number",
                                                   },})}   placeholder="enter your phone number without country code, e.g. 0167******3" required="" />
                                        {errors.phone && <span style={error}>please input valid phone number</span>}
                                    </div>
                                </div>
                                <div className="form-row">
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
    } else {
        return <OtpForm otpInfo ={otpInfo} cancel = {handleCancel} otpResponse = {handleOtpResponse}/>
    }

}
