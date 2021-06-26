import React, { useEffect, useState } from 'react';
import { SideMenu } from '../../sidebar/Sidebar';
import { SIDEBAR_STATUS } from "../../../../constants/app_constant";
import { useDispatch, useSelector } from "react-redux";
import { setSideMenu } from '../../../../actions/action-menu';
import { addPreviousLength } from '../../../../actions/action-category'


const SideBar = () => {
    const { items = [], menu = [], currentMenuLength = 0, previousMenuLength = 0 } = useSelector(state => ({
        items: state.categories?.list,
        menu: state.menus.menu,
        currentMenuLength: state.menuLength.currentLength,
        previousMenuLength: state.menuLength.previousLength,
    }));
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        if (currentMenuLength === previousMenuLength && menu.length > 0) {
            setCategories(menu);
        } else {
            setCategories(items);
            dispatch(addPreviousLength(currentMenuLength));
        }

        const sideBarStatus = localStorage.getItem(SIDEBAR_STATUS) || 'close';
        const closemyslide = document.getElementById("mySidenav");
        if (sideBarStatus === 'close') {
            closemyslide.classList.remove('open-side');
            document.getElementById('app-body').classList.remove('left-sidebar_space')
        } else {
            closemyslide.classList.add('open-side');
            document.getElementById('app-body').classList.add('left-sidebar_space')
        }
    }, [items, menu]);

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
        <div id="mySidenav" className="sidenav">
            <nav>
                <SideMenu
                    items={categories}
                    setSideMenu={(menu) => dispatch(setSideMenu(menu))}
                />
            </nav>
        </div >

    )
}


export default SideBar;
