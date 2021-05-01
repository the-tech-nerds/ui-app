import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { SIDEBAR_MENU, SIDEBAR_STATUS, USER_DASHBOARD } from "../../../constants/app_constant";
import { useSelector } from "react-redux";
const MENU_STATUS = {
    EXPANDED: true,
    COLLAPSED: false
}

const SideBarItem = ({
    name = "",
    children = null,
    onToggle = () => { },
    index = "",
    status = MENU_STATUS.COLLAPSED,
    icon = null,
    slug,
    selected = false
}) => {
    const subItemsWithOutChildren = <Link href={`/${slug}`} key={index} onClick={() => {
        //  window.location.href=`/${slug}`;
    }}>
        <li key={index} className="p-1">
            {icon && <i className={`fa fa-${icon} p-1`} />}{name}
        </li>
    </Link>;
    const subItemsWithChildren = children ? <div key={index} className="d-flex flex-column">
        <li className={`d-flex flex-row justify-content-between p-1 ${selected ? 'item-selected' : ''} menu-item`} onClick={() => onToggle(index)}>
            <Link href={`/${slug}`}><span>{icon && <i className={`fa fa-${icon} p-1`}></i>}{name}</span></Link>
            {children.length > 0 && <span onClick={() => onToggle(index)}>
                {status === MENU_STATUS.EXPANDED && <i className="fa fa-angle-down" />}
                {status === MENU_STATUS.COLLAPSED && <i className="fa fa-angle-right" />}
            </span>}
        </li>
        {children.length > 0 && status === MENU_STATUS.EXPANDED && (<ul className='vl'>
            {children.map(child =>
                <SideBarItem
                    name={child.name}
                    children={child.children}
                    index={child.index}
                    onToggle={() => onToggle(child.index)}
                    status={child.status}
                    icon={child.icon}
                    slug={child.slug}
                    selected={child.selected}
                />)
            }</ul>)
        }
    </div> : <span />;

    return (
        <div>
            {children ? subItemsWithChildren : subItemsWithOutChildren}
        </div>
    );
};

export const SideMenu = () => {
    // const { items } = useSelector(state => ({
    //     items: state.categories?.list?.menus,
    // }));
    const { total = 0, items = [] } = useSelector(state => ({
        total: state.categories?.list?.total,
        items: state.categories?.list?.menus,
    }));
    const createMenu = useCallback((items) => {
        const createIndividualMenu = (item) => {
            return {
                name: item.name,
                index: item.id,
                children: item.children ? item.children.map(child => createIndividualMenu(child)) : null,
                status: MENU_STATUS.COLLAPSED,
                icon: item.icon,
                slug: item.slug,
                selected: false,
            };
        }
        return items.map(item => createIndividualMenu(item))
    }, [items])
    const [menu, setMenu] = useState(null);
    const toggleMenu = (index) => {
        const updateItems = (items, index) => items.map(item => ({
            ...item,
            children: item.children ? updateItems(item.children, index) : null,
            status: item.index === index ? item.status = !item.status : item.status,
            selected: item.index === index
        }));
        const itemsToChange = updateItems(menu, index);
        setMenu(itemsToChange);
        // store_sidebar
        const sideMenu = {
            menus: itemsToChange,
            total: total
        }
        localStorage.setItem(SIDEBAR_MENU, JSON.stringify(sideMenu));
    }
    useEffect(() => {
        let menuItems = localStorage.getItem(SIDEBAR_MENU) || null;
        if (menuItems) {
            menuItems = JSON.parse(menuItems);
        }
        if (!menuItems || menuItems?.total !== total) {
            setMenu(createMenu(items));
        }
        else {
            setMenu(menuItems.menus)
        }
    }, [items])

    return (
        <div className="d-flex flex-column sidemenu">
            {menu?.map(item => <SideBarItem
                name={item.name}
                children={item.children}
                index={item.index}
                onToggle={toggleMenu}
                status={item.status}
                icon={item.icon}
                slug={item.slug}
                selected={item.selected}
            />)}
        </div>
    );
};
