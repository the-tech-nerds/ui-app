import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual'
import axios from "axios";
import Link from 'next/link';
import DropdownBeforeLogin from "./functional/dropdown-before-login";
import { DropdownAfterLogin } from "./functional/dropdown-after-login";
import SideBar from './sidebar';

class TopBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false,
        }
    }
    componentDidMount() {
        axios.get(`login/check`)
            .then((res) => {
                this.setState({
                    isLogin: res.data.isLogin
                })
            }).catch(error => {
            });
        // this.toggleNav();
    }


    toggleNav() {
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



    render() {
        const { translate } = this.props;
        const { isLogin } = this.state;
        return (
            <div className="top-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-1 d-flex align-items-center justify-content-start p-0">
                            <div className="navbar navbar-dark">
                                <button onClick={this.toggleNav} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <SideBar />
                            </div>
                        </div>
                        <div className="col-lg-1 d-flex align-items-center justify-content-end p-0">
                            <div className="bg-success w-75 h-75 d-flex justify-content-center align-items-center text-white rounded-left">KFC</div>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center col-lg-10 w-100 p-0">
                            <div className="w-75 h-75">
                                <input type="text" placeholder="Search..." className="form-control w-75 h-100 rounded" />
                            </div>
                            <ul className="header-dropdown float-right text-right mr-5">
                                {isLogin && <DropdownAfterLogin props={this.props} />}
                                {!isLogin && <DropdownBeforeLogin props={this.props} />}
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


export default withTranslate(TopBar);
