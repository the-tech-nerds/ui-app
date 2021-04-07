import React from "react";
import {AlertType} from "../../functional/user-dashboard/utils";
export  default function AlertMessage(props) {
    const {className = 'alert alert-warning alert-dismissible', children=<span/>} = props
        const element =<div className={className}>
             {children}
        </div>
       return element;
}
