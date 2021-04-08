import React, { Component, useState } from 'react';
import Root from "../layouts/Root";
import ReactDom from "react-dom";
import DefaultAddress from "../functional/user-dashboard/user/default-address";
import UserDashboard from "../functional/user-dashboard/user/user-dashboard";
import UpdateProfile from "../functional/user-dashboard/user/user-form";
import { ACCESS_TOKEN, CHANGE_PASSWORD, USER_DASHBOARD, USER_LOGIN } from "../../constants/app_constant";
import OtpForm from "../functional/otp/otp-form";
import axios from "axios";
import { errorHandle } from "../../share";
import AlertMessage from "../common/alert/alert-message";
import { AlertType } from "../functional/user-dashboard/utils";
import UpdatePhone from "../functional/user-dashboard/user/update-phone";
import UpdateEmail from "../functional/user-dashboard/user/update-email";
export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.handleProfileEdit = this.handleProfileEdit.bind(this);
        this.handleVerifyPhone = this.handleVerifyPhone.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOtpResponse = this.handleOtpResponse.bind(this);
        this.handleAlertResponse = this.handleAlertResponse.bind(this);
        this.handleAddPhone = this.handleAddPhone.bind(this);
        this.handleAddEmail = this.handleAddEmail.bind(this);
        this.state = {
            userInfo: null,
            currentMode: 'dashboard',
            title: 'Dashboard',
            otpInfo: undefined,
            otpError: undefined
        }

    }

    componentDidMount() {
        const { user } = this.props;
        if (user) {
            this.setState({
                userInfo: user
            });
            localStorage.setItem("userInfo", JSON.stringify(user));
        }
    }
    handleAlertResponse() {
        this.setState(state => ({
            otpError: undefined
        }))
    }
    handleProfileEdit() {
        this.setState(state => ({
            currentMode: 'edit-profile',
            title: 'Update profile'
        }))
    }
    handleAddPhone() {
        this.setState(state => ({
            currentMode: 'add-phone',
            title: 'Update Phone'
        }))
    }
    handleAddEmail() {
        this.setState(state => ({
            currentMode: 'add-email',
            title: 'Update Email'
        }))
    }
    handleOtpResponse(res) {
        axios.put(`/user/phone/verify`, null)
            .then(res => {
                window.location.href = USER_DASHBOARD;
            }).catch(error => {
                const err = errorHandle.serverError(error.response.data.message);
                this.setState(state => ({
                    otpError: err
                }))
            })
    }
    handleVerifyPhone() {
        const data = {
            phone: this.state.userInfo.phone,
            purpose: 'phone verification'
        }
        axios.post(`/otp/generate`, data)
            .then(res => {
                this.setState(state => ({
                    currentMode: 'verify-phone',
                    title: 'OTP Validation',
                    otpInfo: res.data.data
                }))
            }).catch(error => {
                const err = errorHandle.serverError(error.response.data.message);
                this.setState(state => ({
                    otpError: err
                }))
            })
    }
    handleCancel() {
        this.setState(state => ({
            currentMode: 'dashboard',
            title: 'Dashboard'
        }))
    }

    render() {
        const { userInfo, currentMode, title, otpInfo, otpError } = this.state;
        let dyComponent;
        if (currentMode === 'dashboard') {
            dyComponent = <div>
                {otpError && <AlertMessage alertType={AlertType.DANGER} message={otpError} alertCloseResponse={this.handleAlertResponse} />}
                <AccountInfo userInfo={userInfo} profileEdit={this.handleProfileEdit} verifyPhone={this.handleVerifyPhone} addPhone={this.handleAddPhone}
                    addEmail={this.handleAddEmail} />
            </div>
        } else if (currentMode === 'edit-profile') {
            dyComponent = <UpdateProfile userData={userInfo} cancel={this.handleCancel} />
        } else if (currentMode === 'verify-phone') {
            dyComponent = <OtpForm otpInfo={otpInfo} cancel={this.handleCancel} otpResponse={this.handleOtpResponse} />
        } else if (currentMode === 'add-phone') {
            dyComponent = <UpdatePhone cancel={this.handleCancel} />;
        } else if (currentMode === 'add-email') {
            dyComponent = <UpdateEmail cancel={this.handleCancel} />
        }

        return (
            <UserDashboard name={'AccountInfo'} component={dyComponent} title={title} />
        )
    }
}

export default function AccountInfo({ userInfo, profileEdit, verifyPhone, addPhone, addEmail }) {
    let userContactInformation = null;
    if (userInfo) {
        userContactInformation = <div>
            <div className="welcome-msg">
                <p>Hello, {userInfo.first_name} !</p>
                <p>From your My Account Dashboard you have the ability to view a snapshot of
                your recent account activity and update your account information. Select
                    a link below to view or edit information.</p>
            </div>
            <div className="box-account box-info">
                <div className="box-head">
                    <h2>Account Information</h2>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="box">
                            <div className="box-title">
                                <h3>Contact Information</h3>
                                <a href='javascript:void(0)' className="cursor-point" onClick={profileEdit}>Edit</a>
                            </div>
                            <div className="box-content">
                                <h6><i className="fa fa-user" aria-hidden="true"></i> {userInfo.first_name} {userInfo.last_name}</h6>
                                <h6 className="mt-2"><i className="fa fa-envelope" aria-hidden="true"></i> {userInfo.email}
                                    {(userInfo.email && userInfo.is_email_verified) && <i className="fa fa-check-circle" aria-hidden="true"></i>}
                                    {!userInfo.email && <span href='javascript:void(0)' className="btn btn-sm ml-3 btn-outline-primary verify-btn" onClick={addEmail}  > Add</span>}
                                    {userInfo.email && <span href='javascript:void(0)' className="btn btn-sm ml-3 btn-outline-primary verify-btn" onClick={addEmail}  > Change</span>}
                                </h6>
                                <h6 className="mt-2"><i className="fa fa-phone" aria-hidden="true"></i> {userInfo.phone_number}
                                    {!userInfo.phone && <span href='javascript:void(0)' className="btn btn-sm ml-3 btn-outline-primary verify-btn" onClick={addPhone}  > Add</span>}
                                    {(userInfo.phone && !userInfo.is_mobile_verified) &&
                                        <span href='javascript:void(0)' className="btn btn-sm ml-3 btn-outline-danger verify-btn" onClick={verifyPhone}  > Verify</span>}
                                    {(userInfo.phone && userInfo.is_mobile_verified) &&
                                        <i className="fa fa-check-circle" aria-hidden="true"></i>}
                                    {userInfo.phone && <span href='javascript:void(0)' className="btn btn-sm ml-3 btn-outline-primary verify-btn" onClick={addPhone}  > Change</span>}
                                </h6>
                                <h6 className="mt-2"><i className="fa fa-intersex" aria-hidden="true"></i> {userInfo.gender}</h6>
                                <h6 className="mt-2"><i className="fa fa-birthday-cake" aria-hidden="true"></i> {userInfo.birthday}</h6>
                                <h6 className="mt-2"><a href={CHANGE_PASSWORD}>Change Password</a></h6>
                            </div>
                        </div>
                    </div>
                    {/*<div className="col-sm-6">*/}
                    {/*    <div className="box">*/}
                    {/*        <div className="box-title">*/}
                    {/*            <h3>Newsletters</h3>*/}
                    {/*            <a href="#">Edit</a>*/}
                    {/*        </div>*/}
                    {/*        <div className="box-content">*/}
                    {/*            <p>*/}
                    {/*                You are currently not subscribed to any newsletter.*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div>
                    <DefaultAddress />
                </div>
            </div>
        </div>
    }
    return userInfo ? userContactInformation : <span />;
}
