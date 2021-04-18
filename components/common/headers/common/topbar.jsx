import React, {useEffect, useState} from 'react';
import {withTranslate} from 'react-redux-multilingual'
import axios from "axios";
import DropdownBeforeLogin from "./functional/dropdown-before-login";
import {DropdownAfterLogin} from "./functional/dropdown-after-login";
import SideBar from './sidebar';
import {useRouter} from 'next/router';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from '@material-ui/core/styles';

const TopBar = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const [SuggestionList, setSuggestionList] = useState([]);
    const router = useRouter();
    useEffect(() => {
        axios.get(`/login/check`)
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
    const getAutoCompleteSearchData = (key) => {
        axios.get(`/product/search/${key}`)
            .then((res) => {
                if (res.data.code == 200) {
                    setSuggestionList(res.data.data.results);
                }
            }).catch(error => {
        });
    }
    const searchInputHandle = (event) => {
        if (!event) return;
        if (event == "enter") {
            router.push('/product/search' + window.location.search);
            return;
        }
        getAutoCompleteSearchData(event.target.value);
        window.history.replaceState(null, "Product Search", "/product/search?q=" + event.target.value);
    }
    const searchSubmitHandle = (event) => {
        event.preventDefault();
        router.push('/product/search' + window.location.search);
    }
    const {translate} = props;
    const useStyles = makeStyles({
        option: {
            // fontSize: 15,
            // '& > span': {
            //     marginRight: 10,
            //     fontSize: 18,
            // },
        },
    });
    const classes = useStyles();
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
                        {/*<input type="text" placeholder="Search..."*/}
                        {/*       className="form-control w-75 h-100 rounded d-inline"*/}
                        {/*       onInput={searchInputHandle}*/}
                        {/*       onKeyDown={(e) => searchInputHandle(e.key === 'Enter' ? 'enter' : false)}/>*/}
                        <Autocomplete
                            style={{
                                width: '75%',
                                height: '80%',
                                display: 'inline-block'
                            }}
                            options={SuggestionList}
                            autoHighlight
                            getOptionLabel={(option) => option?.name || ''}
                            renderOption={(option) => (
                                <React.Fragment>
                                    <img  width='20px'
                                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt=""/>
                                    <span>{' '+option?.name || ''}</span>
                                </React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    onInput={searchInputHandle}
                                    onKeyDown={(e) => searchInputHandle(e.key === 'Enter' ? 'enter' : false)}
                                    {...params}
                                    // label="Seach product"
                                    variant="outlined"
                                    inputProps={{
                                        ...params.inputProps,
                                        // autoComplete: 'procuct-serach', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                        <button onClick={searchSubmitHandle} className="btn btn-success h-100 rounded"
                                type="button">
                            <i className="fa fa-search"></i>
                        </button>
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
