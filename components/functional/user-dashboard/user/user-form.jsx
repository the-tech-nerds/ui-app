import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {USER_DASHBOARD} from "../../../../constants/app_constant";
import React, {useState, useEffect} from 'react';
import {errorHandle} from "../../../../share";
import {utils} from "../index";
import Button from "../../../common/buttons/button";
import AlertMessage from "../../../common/alert/alert-message";
export  default function UpdateProfile({userData, cancel}) {
    const  [serverError, setError] = useState({
        error: undefined
    })
    const  [isLoading, setLoading] = useState(false)
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            birthday: userData.birthday,
            gender_type: userData.gender_type?userData.gender_type : 1,
        }
    })
    const  [genders, setGender] = useState([])
    const [gender_type, setGenderType] = useState(userData.gender_type?userData.gender_type : 1)

    useEffect(() => {
        const gender = [];
        utils.Gender.forEach( g =>{
            gender.push( <option key={g.id} value={g.id}>{g.value}</option>)
        })
        setGender(gender);
    }, []);

    const onSubmit = data => {
        setError({
            error: undefined
        });
        setLoading(true);
        axios.put(`/user/update`,data)
            .then(res => {
                setLoading(false);
                window.location.href= USER_DASHBOARD;
            }).catch( error =>{
                setLoading(false);
            const err =errorHandle.serverError(error.response.data.message) ;
            if(err){
                setError({
                    error: err
                });
            } else {
                setError({
                    error: 'Update profile failed. please try again'
                });
            }
        })
    };
    const handleSelect=(e)=>{
        setGenderType(e.target.value);
    }
    const error = {
        color: "red",
        fontSize: "12px"
    };
    const element =   <div className=" register-page section-b-space mt-4">
        <div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="theme-card">
                        {serverError.error && <AlertMessage className = "alert alert-danger alert-dismissible">{serverError.error}</AlertMessage>}
                        <form className="theme-form"  onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <label htmlFor="FirstName">First Name</label>
                                    <input type="text" ref={register({ required: true })} className="form-control" id="first_name"
                                           name="first_name"  placeholder="Enter your first name. Example: Asif"/>
                                    {errors.first_name && <span style={error}>Fist Name is required</span>}
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="LastName">Last Name</label>
                                    <input type="text"
                                           name="last_name" className="form-control" id="last_name" ref={register}
                                           placeholder="Enter your last name. Example: Ahmed"/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <label htmlFor="Gender">Gender</label>
                                    <select name="gender_type" value ={gender_type}  className="form-control select-dropdown"  onChange={handleSelect}
                                            ref={register ({required: true})}>
                                        {genders}
                                    </select>
                                    {errors.gender_type && <span style={error}>Gender is required</span>}
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="BirthDay">Birth Day</label>
                                    <input  className="form-control select-dropdown" ref={register} type="date" id="birthday" name="birthday"/>
                                </div>
                                <Button type="submit" loading={isLoading} disabled={isLoading}>Update Profile</Button>
                                <button type="button" onClick={cancel} className="btn btn-solid ml-4">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    return element;
}
