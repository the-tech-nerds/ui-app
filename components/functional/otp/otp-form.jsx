import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import  '../../styles/user_dashbord.module.scss'
import OtpTimer from "./otp-timer";
import axios from "axios";
import {errorHandle} from "../../../share";
import AlertMessage from "../../common/alert/alert-message";
import Button from "../../common/buttons/button";
export default class OtpForm extends Component {
    constructor(props) {
        super(props);
        this.resendOtp =this.resendOtp.bind(this);
        this.state = {
            otp: '',
            numInputs: 4,
            separator: '-',
            isDisabled: false,
            otpTime: this.props.otpInfo.timeInSeconds,
            placeholder: '',
            otpInfo:this.props.otpInfo,
            otpError: undefined,
            otpSent: undefined,
            isLoading: false
        };
    }
    handleChange = otp => this.setState({ otp });
    clearOtp = () => {
        this.setState({ otp:'' });
    }

    resendOtp = () => {
        this.setState({  otpError: undefined,
            otpSent: undefined,
            otpTime: 0
         });
        const data = {
            phone: this.state.otpInfo.sent_number,
            email: this.state.otpInfo.sent_email,
            purpose: this.state.otpInfo.sent_number? 'phone verification': 'email verification'
        }
        axios.post(`/otp/generate`,data)
            .then(res => {
                this.setState({  otpTime: res.data.data.timeInSeconds,
                    otpSent:res.data.data.info});
            }).catch( error =>{
            const err =errorHandle.serverError(error.response.data.message) ;
            this.setState({  otpError: err});
        })
    }
    handleSubmit = e => {
        this.setState(state => ({
            isLoading: true,
        }))
        e.preventDefault();
        const data = {
            phone: this.state.otpInfo.sent_number,
            email: this.state.otpInfo.sent_email,
            code: this.state.otp
        }
        axios.post(`/otp/validate`,data)
            .then(res => {
                this.setState(state => ({
                    isLoading: false,
                }))
               this.props.otpResponse(res);
            }).catch( error =>{
            this.setState(state => ({
                isLoading: false,
            }))
            const err =errorHandle.serverError(error.response.data.message) ;
            this.setState({  otpError: err});
        })
    };
    render() {
        const {
            otp,
            numInputs,
            isDisabled,
            otpTime,
            otpError,
            otpSent,
            isLoading
        } = this.state;

        return (
        <div>
            <div className="login-page section-b-space mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {otpError && <AlertMessage className = "alert alert-danger alert-dismissible">{otpError}</AlertMessage>}
                            {otpSent && <AlertMessage className = "alert alert-success alert-dismissible">{otpSent}</AlertMessage>}
                                <form onSubmit={this.handleSubmit}>
                                    <p>Enter verification code</p>
                                    <div className="margin-top--small">
                                        <OtpInput
                                            inputStyle="inputStyle"
                                            value={this.state.otp}
                                            onChange={this.handleChange}
                                            numInputs={4}
                                            separator={<span>-</span>}
                                        />
                                        {otpTime && <OtpTimer timeInSecond={otpTime} resend ={this.resendOtp} />}
                                    </div>
                                    <div className="btn-row mt-4">
                                        <Button type="submit" loading={isLoading} disabled={otp.length < numInputs}>Verify</Button>
                                        <button type="button"  disabled={isDisabled || otp.trim() === ''}
                                                onClick={this.clearOtp} className="btn btn-solid ml-4">Clear</button>
                                        <button type="button"
                                                onClick={this.props.cancel} className="btn btn-solid ml-4">Cancel</button>
                                    </div>
                                </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        );
    }
}
