import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {withTranslate} from 'react-redux-multilingual';
import axios from "axios";
import DropdownBeforeLogin from "./functional/dropdown-before-login";
import {DropdownAfterLogin} from "./functional/dropdown-after-login";
import {useRouter} from 'next/router';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from '@material-ui/core/styles';
import {SIDEBAR_STATUS} from "../../../../constants/app_constant";
import SearchSuggestionBlock from './../../../products/common/product/search-suggestion-block'

const TopBar = (props) => {
    const { wishlist, isLogin } = useSelector(state => ({
        wishlist: state.wishlist.list,
        isLogin: state.login.isLoggedIn,
    }));
    const [SuggestionList, setSuggestionList] = useState([]);
    const router = useRouter();

    const toggleNav = () => {
        var openmyslide = document.getElementById("mySidenav");
        if (openmyslide) {
            if (openmyslide.classList.contains('open-side')) {
                openmyslide.classList.remove('open-side');
                document.getElementById('app-body').classList.remove('left-sidebar_space')
                localStorage.setItem(SIDEBAR_STATUS, 'close');
            } else {
                openmyslide.classList.add('open-side')
                document.getElementById('app-body').classList.add('left-sidebar_space')
                localStorage.setItem(SIDEBAR_STATUS, 'open');
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
                <div className="col-xs-1 d-flex align-items-center justify-content-start p-0">
                    <div className="navbar navbar-dark">
                        <button onClick={toggleNav} className="navbar-toggler" type="button"
                                data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent"
                                aria-controls="navbarToggleExternalContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
                <div className="col-xs-1 d-flex align-items-center justify-content-end p-0 logo-container">
                    <a href="/" className="kfc-logo bg-success w-75 h-75 d-flex justify-content-center align-items-center text-white rounded-left">
                            KFC
                    </a>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center col-xs-8 pr-2">
                    {/*<input type="text" placeholder="Search..."*/}
                    {/*       className="form-control w-75 h-100 rounded d-inline"*/}
                    {/*       onInput={searchInputHandle}*/}
                    {/*       onKeyDown={(e) => searchInputHandle(e.key === 'Enter' ? 'enter' : false)}/>*/}
                    <Autocomplete
                        className="search-autocomplete"
                        id="debug"
                        freeSolo
                        options={[...SuggestionList]}
                        autoHighlight
                        getOptionLabel={(option) => option?.name || ''}
                        renderOption={(option) => (
                                <SearchSuggestionBlock product={option}/>
                        )}
                        openOnFocus={false}
                        renderInput={(params) => (
                            <TextField
                                style={{ height: '100%' }}
                                onFocus={searchInputHandle}
                                onBlur={() => setSuggestionList([])}
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
                    <button onClick={searchSubmitHandle} className="search-button btn btn-success h-100 rounded"
                            type="button">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
                <div className="d-flex align-items-center col-xs-2 other-nav-items">
                    {isLogin && <a href="/user/wishlist" className="d-flex items-center text-danger" replace>
                        <span className="text-danger">
                            <i className="fa fa-heart mr-2"></i> 
                            <span className="badge badge-secondary">{wishlist.length}</span>
                        </span>
                    </a>}
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
