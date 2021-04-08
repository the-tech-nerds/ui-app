
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { AlertType, PhoneNumber, ValidateEmail } from '../user-dashboard/utils';
import AlertMessage from '../../common/alert/alert-message';
import Button from "../../common/buttons/button";

export default function CheckUserName({ userCheckResponse }) {
    const { register, handleSubmit, errors } = useForm();

    const [serverError, setError] = useState(undefined);
    const [isLoading, setLoading] = useState(false)
    const onSubmit = value => {
        setLoading(true);
        setError(undefined);
        if (PhoneNumber(value.username)) {
            value.phone = value.username;
            axios.post(`/user/phone`, value).then(res => {
                setLoading(true);
                if (!res.data.data) {
                    setError({
                        error: `${value.username} is not register user.`
                    })
                } else {
                    userCheckResponse(value);
                }

            }).catch(error => {
                setLoading(false);
                const err = error.response.data.message;
                setLoading(false);
                if (err) {
                    setError({
                        error: err
                    });
                } else {
                    setError({
                        error: 'something wrong. please try again'
                    }
                    );
                }
            })
        }
        else if (ValidateEmail(value.username)) {
            value.email = value.username;
            axios.post(`/user/email`, value).then(res => {
                setLoading(false);
                if (!res.data.data) {
                    setError({
                        error: `${value.username} is not register user.`
                    })
                } else {
                    userCheckResponse(value);
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
                        error: 'something wrong. please try again'
                    }
                    );
                }
            })
        } else {
            setError({
                error: 'please input valid email or phone number.'
            })
        }

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
                    <input name="username" type="text" className="form-control" id="username"
                        {...register('username', { required: true })} placeholder="enter your phone or email" required />
                    {errors && errors.username && <span style={error}>please input phone or email</span>}
                </div>
                <Button type="submit" loading={isLoading} disabled={isLoading}>submit</Button>
            </div>
        </form>
    </div>
    return element;
}
