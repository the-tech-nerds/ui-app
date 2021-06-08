import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { SERVER_PATH, USER_ADDRESS } from "../../../../constants/app_constant";
import React, { useState, useEffect } from 'react';
import { number } from "prop-types";
import Button from "components/common/buttons/button";
function BuildDropwDown(list = []) {
    let items = [];
    items.push(<option></option>);
    list.forEach((item) => {
        items.push(<option key={item.id} value={item.id}>{item.name}</option>)
    });
    return items;
}
export default function AddAddress(props) {
    const { register, handleSubmit, errors } = useForm();
    const [serverError, setError] = useState({
        error: undefined
    })
    const [divisions, setDivision] = useState([]);
    const [division_id, setDebisionId] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [city_id, setCityId] = useState(0);
    const [cities, setCities] = useState({
        current: [],
        total: []
    })
    const [areas, setAreas] = useState({
        current: [],
        total: []
    });
    useEffect(() => {
        axios.get(`/address/division`)
            .then(res => {
                setDivision(res?.data?.data || []);
                setDebisionId(divisions.length > 0 ? divisions[0].id : 0);
            }).catch(error => {
            })
        axios.get(`/address/cities`)
            .then(res => {
                setCities({
                    ...cities,
                    total: res?.data?.data
                });
            }).catch(error => {
            })
        axios.get(`/address/areas`)
            .then(res => {
                setAreas({
                    ...areas,
                    total: res?.data?.data
                });
            }).catch(error => {
            })
    }, []);

    const divisionChange = (event) => {
        const crnt = cities.total.filter(x => x.division_id == Number(event.target.value));
        setCities({
            ...cities,
            current: crnt
        })
        setDebisionId(Number(event.target.value));
    }

    const cityChange = (event) => {
        const crnt = areas.total.filter(x => x.city_id == Number(event.target.value));
        setAreas({
            ...areas,
            current: crnt
        })
        setCityId(Number(event.target.value));
    }

    const onSubmit = data => {
        setError({
            error: undefined
        });
        setLoading(true);
        data.division_id = Number(division_id);
        data.area_id = Number(data.area_id);
        data.city_id = Number(city_id);
        axios.post(`/address`, data)
            .then(res => {
                window.location.href = USER_ADDRESS;
            }).catch(error => {
                const err = error.response.data.message;
                const matches = err.match(/\[(.*?)\]/);
                setLoading(false);
                if (matches) {
                    setError({
                        error: matches[1]
                    });
                } else {
                    setError({
                        error: 'Address creation failed. please try again'
                    });
                }

            })
    };
    const error = {
        color: "red",
        fontSize: "12px"
    };
    // function cancel() {
    //   window.location.href = '/user/address'
    // }

    const element = <section className=" register-page section-b-space">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="theme-card">
                        {serverError.error && <span style={error}>{serverError.error}</span>}
                        <form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" {...register('name', { required: true })} className="form-control" id="name"
                                        name="name" placeholder="Enter your first and last name. Example: Asif Ahmed" />
                                    {errors && errors.name && <span style={error}>Name is required</span>}
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="Address">Address</label>
                                    <input type="text"
                                        name="details" className="form-control" id="details" {...register('details', { required: true })}
                                        placeholder="For Example: House# 123, Street# 123, ABC Road" required="" />
                                    {errors && errors.details && <span style={error}>Details is required</span>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <label htmlFor="Division">Division</label>
                                    <select name="division_id" value={division_id} onChange={divisionChange} className="form-control select-dropdown font-14">
                                        {BuildDropwDown(divisions)}
                                    </select>
                                    {errors && errors.division_id && <span style={error}>Division is required</span>}
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="City">City</label>
                                    <select name="city_id" className="form-control select-dropdown" value={city_id} onChange={cityChange} >
                                        {BuildDropwDown(cities.current)}
                                    </select>
                                    {errors && errors.city_id && <span style={error}>City is required</span>}
                                </div>

                            </div>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <label htmlFor="Area">Area</label>
                                    <select name="area_id" className="form-control select-dropdown" {...register('area_id', { required: true })}>
                                        {BuildDropwDown(areas.current)}
                                    </select>
                                    {errors && errors.area_id && <span style={error}>Area is required</span>}
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="PostCode">Post Code</label>
                                    <input type="number" name="postcode" className="form-control" id="postcode"
                                        placeholder="postcode" required="" />
                                </div>
                            </div>
                            <div className="form-row">

                                <div className="col-md-6">
                                    <label htmlFor="phone">Mobile</label>
                                    <input type="text" name="contact_no" className="form-control" id="contact_no"
                                        {...register('contact_no', { minLength: 11 })} placeholder="Please enter your phone number" />
                                    {errors && errors.contact_no && <span style={error}>Phone number is required</span>}
                                </div>
                                <div className="col-md-6">

                                </div>
                                {/* <button type="submit" className="btn btn-solid">create Address</button> */}
                                <Button type="submit" loading={isLoading} disabled={isLoading}>Create Address</Button>
                                <button type="button" onClick={props.cancel} className="btn btn-solid ml-4">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    return element;
}
