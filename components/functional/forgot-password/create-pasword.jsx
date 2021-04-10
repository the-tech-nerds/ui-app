
import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import AlertMessage from '../../common/alert/alert-message';
import { USER_LOGIN } from '../../../constants/app_constant';
import { errorHandle } from '../../../share';
import { PasswordStrengthMeter } from "../../common/password-strength-meter";
import Button from "../../common/buttons/button";

export default function CreatePassword({ forgotPasswordInfo }) {
    const { register, handleSubmit, errors, watch } = useForm();
    const [serverError, setError] = useState(undefined);
    const [isLoading, setLoading] = useState(false)
    const new_password = useRef({});
    new_password.current = watch("new_password");
    const onSubmit = value => {
        setLoading(true);
        setError(undefined);
        value.password = value.new_password;
        value.phone = forgotPasswordInfo.phone;
        value.email = forgotPasswordInfo.email;
        axios.post(`/recover/password`, value)
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
                        error: 'Password create failed. please try again'
                    });
                }
            })
    };

    const error = {
        color: "red",
        fontSize: "12px"
    };
    const element = <div>
        {serverError && <AlertMessage className="alert alert-danger alert-dismissible">{serverError.error}</AlertMessage>}
        <form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="col-md-12">
                    <label htmlFor="NewPassword">New Password</label>
                    <input type="password" {...register('new_password', {
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
                    <input type="password" {...register('new_password_confirm', {
                        validate: value =>
                            value === new_password.current || "The passwords do not match"
                    })}
                        className="form-control" id="new_password_confirm"
                        name="new_password_confirm" placeholder="Confirm password" />
                    {errors && errors.new_password_confirm && <span style={error}>{errors.new_password_confirm.message}</span>}
                </div>
                <Button type="submit" loading={isLoading} disabled={isLoading}>Create Password</Button>
            </div>
        </form>
    </div>
    return element;
}
