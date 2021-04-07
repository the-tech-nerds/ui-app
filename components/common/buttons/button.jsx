import React  from "react";

export default function Button (props) {
        const {type ='button', onClick =() =>{}, disabled = false, loading = false,  children=<span/>} = props
        return (
                <button type={type} onClick={onClick} className="btn btn-solid" disabled={disabled}>
                    {props.loading && (
                        <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginRight: "5px" }}
                        />
                    )}
                    {loading && <span>Loading....</span>}
                    {!loading && children}
                </button>
        );
}
