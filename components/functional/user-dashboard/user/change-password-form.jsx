import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { CHANGE_PASSWORD, CREATE_PASSWORD, SERVER_PATH, USER_LOGIN } from "../../../../constants/app_constant";
import React, { useState, useRef } from 'react';
import '../../../styles/user_dashbord.module.scss'
import { errorHandle } from '../../../../share'
import AlertMessage from "../../../common/alert/alert-message";
import { AlertType } from "../utils";
import { PasswordStrengthMeter } from "../../../common/password-strength-meter";
import Button from "../../../common/buttons/button";

export default function ResetPasswordForm(props) {
    const { register, handleSubmit, errors, watch } = useForm();
    const [serverError, setError] = useState({
        error: undefined
    })
    const [isLoading, setLoading] = useState(false)
    const { user } = props;;
    const new_password = useRef({});
    new_password.current = watch("new_password");

    const onSubmit = data => {
        setLoading(true);
        setError({
            error: undefined
        });
        let url = 'change-password';
        if (!user.has_password) {
            url = 'create-password';
        }
        axios.post(url, data)
            .then(res => {
                setLoading(false);
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
                        error: 'Password change failed. please try again'
                    });
                }
            })
    };

    const error = {
        color: "red",
        fontSize: "12px"
    };
    const element = <div className=" register-page mt-4">
        <div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="theme-card">
                        {serverError.error && <AlertMessage className="alert alert-danger alert-dismissible">{serverError.error}</AlertMessage>}
                        <form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row">
                                {user && user.has_password && <div className="col-md-12">
                                    <label htmlFor="OldPassword">Old Password</label>
                                    <input type="password"    {...register('old_password', {
                                        required: "You must specify a password",
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        }
                                    })}
                                        className="form-control" id="old_password"
                                        name="old_password" placeholder="Enter your current password" />
                                    {errors && errors.old_password && <span style={error}>{errors.old_password.message}</span>}
                                </div>}
                            </div>
                            <div className="form-row">
                                <div className="col-md-12">
                                    <label htmlFor="NewPassword">New Password</label>
                                    <input type="password"  {...register('new_password', {
                                        required: "You must specify a password",
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        }
                                    })}
                                        className="form-control" id="new_password"
                                        name="new_password" placeholder="Enter your new password" />
                                    <PasswordStrengthMeter text={new_password.current} />
                                    {errors && errors.new_password && <span style={error}>{errors.new_password.message}</span>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-12">
                                    <label htmlFor="NewPasswordConfirm">Confirm Password</label>
                                    <input type="password"  {...register('new_password_confirm', {
                                        validate: value =>
                                            value === new_password.current || "The passwords do not match"
                                    })}
                                        className="form-control" id="new_password_confirm"
                                        name="new_password_confirm" placeholder="Confirm password" />
                                    {errors && errors.new_password_confirm && <span style={error}>{errors.new_password_confirm.message}</span>}
                                </div>
                                <Button type="submit" loading={isLoading} disabled={isLoading}>Update Password</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    return element;
}
