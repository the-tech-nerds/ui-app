import React, {Component, useEffect, useState} from 'react';
import { SideMenu } from '../../sidebar/Sidebar';
import {SIDEBAR_STATUS} from "../../../../constants/app_constant";
import Link from 'next/link';
import {useSelector} from "react-redux";
import {fetchItemsForCategory} from "../../../../actions";
const SideBar = () => {
    const [menu, setMenu] = useState([]);
    const { categories } = useSelector(state => ({
        categories: state.categories?.list?.menus,
    }));
    useEffect(() => {
        setMenu(categories);
        const sideBarStatus = localStorage.getItem(SIDEBAR_STATUS) || 'close';
        const closemyslide = document.getElementById("mySidenav");
        if(sideBarStatus === 'close'){
            closemyslide.classList.remove('open-side');
            document.getElementById('app-body').classList.remove('left-sidebar_space')
        } else{
            closemyslide.classList.add('open-side');
            document.getElementById('app-body').classList.add('left-sidebar_space')
        }
    }, []);

    const closeNav = () => {
        var closemyslide = document.getElementById("mySidenav");
        if (closemyslide)
            closemyslide.classList.remove('open-side');
    }

    const handleSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if (event.target.nextElementSibling.classList.contains('opensub1'))
            event.target.nextElementSibling.classList.remove('opensub1')
        else {
            document.querySelectorAll('.opensub1').forEach(function (value) {
                value.classList.remove('opensub1');
            });
            event.target.nextElementSibling.classList.add('opensub1')
        }
    }
   const handleSubTwoMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if (event.target.nextElementSibling.classList.contains('opensub2'))
            event.target.nextElementSibling.classList.remove('opensub2')
        else {
            document.querySelectorAll('.opensub2').forEach(function (value) {
                value.classList.remove('opensub2');
            });
            event.target.nextElementSibling.classList.add('opensub2')
        }
    }
   const handleSubThreeMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if (event.target.nextElementSibling.classList.contains('opensub3'))
            event.target.nextElementSibling.classList.remove('opensub3')
        else {
            document.querySelectorAll('.opensub3').forEach(function (value) {
                value.classList.remove('opensub3');
            });
            event.target.nextElementSibling.classList.add('opensub3')
        }
    }
   const handleSubFourMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if (event.target.nextElementSibling.classList.contains('opensub4'))
            event.target.nextElementSibling.classList.remove('opensub4')
        else {
            document.querySelectorAll('.opensub4').forEach(function (value) {
                value.classList.remove('opensub4');
            });
            event.target.nextElementSibling.classList.add('opensub4')
        }
    }

    const handleMegaSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if (event.target.nextElementSibling.classList.contains('opensidesubmenu'))
            event.target.nextElementSibling.classList.remove('opensidesubmenu')
        else {
            event.target.nextElementSibling.classList.add('opensidesubmenu')
        }
    }
        return (
            <div id="mySidenav" className="sidenav card">
                <nav>
                    {menu && <SideMenu items={menu} />}
                </nav>
            </div >

        )
}


export default SideBar;
