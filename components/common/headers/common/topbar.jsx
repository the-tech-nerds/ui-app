import React, {Component, useState, useEffect} from 'react';
import {withTranslate} from 'react-redux-multilingual'
import axios from "axios";
import Link from 'next/link';
import DropdownBeforeLogin from "./functional/dropdown-before-login";
import {DropdownAfterLogin} from "./functional/dropdown-after-login";
import SideBar from './sidebar';
import {useRouter} from 'next/router'

const TopBar = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const router = useRouter();
    useEffect(() => {
        axios.get(`login/check`)
            .then((res) => {
                setIsLogin(res.data.isLogin);
            }).catch(error => {
        });
        // this.toggleNav();
    }, []);


    const toggleNav = () => {
        var openmyslide = document.getElementById("mySidenav");
        if (openmyslide) {
            if (openmyslide.classList.contains('open-side')) {
                openmyslide.classList.remove('open-side');
                document.getElementById('app-body').classList.remove('left-sidebar_space')
            } else {
                openmyslide.classList.add('open-side')
                document.getElementById('app-body').classList.add('left-sidebar_space')
            }
        }
    }

    const searchHandle = (event) => {
        event.preventDefault();
        router.push('/product/search?q=' + event.target.value);
        // window.history.replaceState(null, "Product Search", "/product/search?q=" + event.target.value);
    }
    const {translate} = props;
    return (<div className="top-header">
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-1 d-flex align-items-center justify-content-start p-0">
                    <div className="navbar navbar-dark">
                        <button onClick={toggleNav} className="navbar-toggler" type="button"
                                data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent"
                                aria-controls="navbarToggleExternalContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <SideBar/>
                    </div>
                </div>
                <div className="col-sm-1 d-flex align-items-center justify-content-end p-0">
                    <div
                        className="bg-success w-75 h-75 d-flex justify-content-center align-items-center text-white rounded-left">KFC
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center col-sm-10 w-100 p-0">
                    <div className="w-75 h-75">
                        <input type="text" placeholder="Search..." className="form-control w-75 h-100 rounded"
                               onInput={searchHandle}/>
                    </div>
                    <ul className="header-dropdown float-right text-right mr-5">
                        {isLogin && <DropdownAfterLogin props={props}/>}
                        {!isLogin && <DropdownBeforeLogin props={props}/>}
                    </ul>
                </div>
            </div>
        </div>
    </div>);

}


export default withTranslate(TopBar);
