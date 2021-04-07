import React, { Component } from 'react';
import Breadcrumb from "../common/breadcrumb";
import '../../index.scss';
import ReactDom from 'react-dom';
import Root from "../layouts/Root";
import CheckUserName from '../functional/forgot-password/check-user-name';
import OtpForm from '../functional/otp/otp-form';
import axios from "axios";
import { errorHandle } from '../../share';
import AlertMessage from '../common/alert/alert-message';
import { AlertType } from '../functional/user-dashboard/utils';
import CreatePassword from '../functional/forgot-password/create-pasword';
class ForgetPassword extends Component {

    constructor(props) {
        super(props)
        this.handleCheckUser.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOtpResponse = this.handleOtpResponse.bind(this);
        this.handleAlertResponse = this.handleAlertResponse.bind(this);
        this.state = {
            otpInfo: undefined,
            error: undefined,
            isVerified: false,
            forgotPasswordInfo: undefined,
        }
    }

    handleCheckUser = value => {
        this.generateOtp(value);
    }
    generateOtp = (data) => {
        data.purpose = 'forgot password';
        axios.post(`/otp/generate`, data)
            .then(res => {
                this.setState(state => ({
                    otpInfo: res.data.data
                }));
            }).catch(error => {
                const err = errorHandle.serverError(error.response.data.message);
                if (err) {
                    this.setState(state => ({
                        error: err
                    }))
                } else {
                    this.setState(state => ({
                        error: err
                    }))
                }
            })
    }
    handleOtpResponse = () => {
        this.setState(state => ({
            isVerified: true,
            forgotPasswordInfo: {
                phone: this.state.otpInfo.sent_number,
                email: this.state.otpInfo.sent_email
            },
            otpInfo: undefined
        }))
    }
    handleCancel = () => {
        this.setState(state => ({
            otpInfo: undefined,
            isVerified: false
        }))
    }
    handleAlertResponse = () => {
        this.setState(state => ({
            error: undefined
        }))
    }
    render() {
        const { otpInfo, error, isVerified, forgotPasswordInfo } = this.state
        return (
            <div>
                <Breadcrumb title={'forget password'} />
                <section className="register-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <h3>Forgot password</h3>
                                <div className="theme-card">
                                    {error && <AlertMessage alertType={AlertType.DANGER} message={error} alertCloseResponse={this.handleAlertResponse} />}
                                    {!otpInfo && !isVerified && <CheckUserName userCheckResponse={this.handleCheckUser} />}
                                    {otpInfo && !isVerified && <OtpForm otpInfo={otpInfo} cancel={this.handleCancel} otpResponse={this.handleOtpResponse} />}
                                    {!otpInfo && isVerified && <CreatePassword forgotPasswordInfo={forgotPasswordInfo} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}

const forgotPassword = (<Root>
    <ForgetPassword />
</Root>)
if (typeof document !== "undefined" && document.getElementById('forgot-password')) {
    ReactDom.render(forgotPassword, document.getElementById('forgot-password'));
}
