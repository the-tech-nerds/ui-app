import React, { Component } from 'react';
import { SideMenu } from '../../sidebar/Sidebar';
import {SIDEBAR_STATUS} from "../../../../constants/app_constant";
class SideBar extends Component {
    state = {
        menu: []
    }

    componentDidMount() {
        const cachedMenu = localStorage.getItem('menu');
        const sideBarStatus = localStorage.getItem(SIDEBAR_STATUS) || 'close';
        const closemyslide = document.getElementById("mySidenav");
        if(sideBarStatus === 'close'){
                closemyslide.classList.remove('open-side');
            document.getElementById('app-body').classList.remove('left-sidebar_space')
        } else{
            closemyslide.classList.add('open-side');
            document.getElementById('app-body').classList.add('left-sidebar_space')
        }
        if (cachedMenu) {
            this.setState({
                menu: JSON.parse(cachedMenu),
            })
        }
        fetch("/category/all")
        .then(res => res.json())
        .then(res => {
            const { data: menu } = res;
            localStorage.setItem("menu", JSON.stringify(menu));
            this.setState({
                menu,
            })
        }).catch(e => { throw e; });

    }

    closeNav = () => {
        var closemyslide = document.getElementById("mySidenav");
        if (closemyslide)
            closemyslide.classList.remove('open-side');
    }

    handleSubmenu = (event) => {
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
    handleSubTwoMenu = (event) => {
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
    handleSubThreeMenu = (event) => {
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
    handleSubFourMenu = (event) => {
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

    handleMegaSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if (event.target.nextElementSibling.classList.contains('opensidesubmenu'))
            event.target.nextElementSibling.classList.remove('opensidesubmenu')
        else {
            event.target.nextElementSibling.classList.add('opensidesubmenu')
        }
    }

    render() {
        return (
            <div id="mySidenav" className="sidenav card">
                <a href="javascript:void(0)" onClick={this.closeNav}></a>
                <nav>
                    {this.state.menu && <SideMenu items={this.state.menu} />}
                </nav>
            </div >

        )
    }
}


export default SideBar;
