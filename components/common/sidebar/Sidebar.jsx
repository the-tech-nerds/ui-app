import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
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
}) => { 
    const subItemsWithOutChildren = <Link key={index} href={`/${slug}`}>
        <li key={index} className="p-2">
            {icon && <i className={`fa fa-${icon} p-2`} />}{name}
        </li>
    </Link>;
    const subItemsWithChildren = children ? <div key={index} className="d-flex flex-column">
        <li className="d-flex flex-row justify-content-between p-2" onClick={() => onToggle(index)}>
            <Link  href={`/${slug}`}><span>{icon && <i className={`fa fa-${icon} p-2`}></i>}{name}</span></Link>
            {children.length > 0 && <span onClick={() => onToggle(index)}>
                {status === MENU_STATUS.EXPANDED && <i className="fa fa-angle-down" />}
                {status === MENU_STATUS.COLLAPSED && <i className="fa fa-angle-right" />}
            </span>}
        </li>
        {children.length > 0 && status === MENU_STATUS.EXPANDED && (<ul>
            {children.map(child =>
                <SideBarItem
                    name={child.name}
                    children={child.children}
                    index={child.index}
                    onToggle={() => onToggle(child.index)}
                    status={child.status}
                    icon={child.icon}
                    slug={child.slug}
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

export const SideMenu = ({
    items = [],
}) => {
    const createMenu = useCallback((items) => {
        const createIndividualMenu = (item) => {
            return {
                name: item.name,
                index: item.id,
                children: item.children ? item.children.map(child => createIndividualMenu(child)) : null,
                status: MENU_STATUS.COLLAPSED,
                icon: item.icon,
                slug: item.slug,
            };
        }
        return items.map(item => createIndividualMenu(item))
    }, [items])

    const [menu, setMenu] = useState(createMenu(items));
    const toggleMenu = (index) => {
        const updateItems = (items, index) => items.map(item => ({
            ...item,
            children: item.children ? updateItems(item.children, index) : null,
            status: item.index === index ? item.status = !item.status : item.status,
        }));
        const itemsToChange = updateItems(menu, index);
        setMenu(itemsToChange);
    }

    useEffect(() => {
        setMenu(createMenu(items));
    }, [items])

    return (
        <div className="d-flex flex-column sidemenu">
            {menu.map(item => <SideBarItem
                name={item.name}
                children={item.children}
                index={item.index}
                onToggle={toggleMenu}
                status={item.status}
                icon={item.icon}
                slug={item.slug}
            />)}
        </div>
    );
};