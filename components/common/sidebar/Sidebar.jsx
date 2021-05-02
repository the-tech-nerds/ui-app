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
    onSelect = () => { },
    index = "",
    status = MENU_STATUS.COLLAPSED,
    icon = null,
    slug,
    selected = false
}) => {
    const subItemsWithOutChildren = <Link
        href={{
            pathname: '/views/category/[slug]',
            query: { slug: slug },
        }}
        as={`/${slug}`}
        key={slug} onClick={() =>{
        //  window.location.href=`/${slug}`;
        }}>
        <li key={slug} className={`p-1 ${selected ? 'item-selected' : ''}`}>
            {icon && <i className={`fa fa-${icon} p-1`} />}{name}
        </li>
    </Link>;
    const subItemsWithChildren = children ? <div key={slug} className="d-flex flex-column">
        <Link
                href={{
                    pathname: '/views/category/[slug]',
                    query: { slug: slug },
                  }}
                  as={`/${slug}`}
            >
            <li className={`d-flex flex-row justify-content-between p-1 ${selected ? 'item-selected' : ''} menu-item`} onClick={() => { onSelect(index); }}>
                
                    <span>{icon && <i className={`fa fa-${icon} p-1`}></i>}{name}</span>
                        {children.length > 0 && <span className="nav-toggle-icon" onClick={() => onToggle(index)}>
                    {status === MENU_STATUS.EXPANDED && <i className="fa fa-angle-down" onClick={() => onToggle(index)}/>}
                    {status === MENU_STATUS.COLLAPSED && <i className="fa fa-angle-right" onClick={() => onToggle(index)} />}
                </span>}
            </li>
        </Link>
        {children.length > 0 && status === MENU_STATUS.EXPANDED && (<ul className='vl'>
            {children.map(child =>
                <SideBarItem
                    name={child.name}
                    children={child.children}
                    index={child.index}
                    onToggle={onToggle}
                    onSelect={onSelect}
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

export const SideMenu = ({ items = [] }) => {
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
        return items && items.length ? items.map(item => createIndividualMenu(item)) : [];
    }, [items])
    const [menu, setMenu] = useState(null);
    const toggleMenu = (index) => {
        const updateItems = (items, index) => items.map(item => ({
            ...item,
            children: item.children ? updateItems(item.children, index) : null,
            status: item.index === index ? item.status = !item.status : item.status,
        }));
        const itemsToChange = updateItems(menu, index);
        setMenu(itemsToChange);
    }
    const selectMenu = (index) => {
        const updateItems = (items, index) => items.map(item => ({
            ...item,
            children: item.children ? updateItems(item.children, index) : null,
            selected: item.index === index,
        }));
        const itemsToChange = updateItems(menu, index);
        setMenu(itemsToChange);
    }
    useEffect(() => {
            setMenu(createMenu(items));
    }, [items])

    return (
        <div className="d-flex flex-column sidemenu">
            {menu?.map(item => <SideBarItem
                name={item.name}
                children={item.children}
                index={item.index}
                onToggle={toggleMenu}
                onSelect={selectMenu}
                status={item.status}
                icon={item.icon}
                slug={item.slug}
                selected={item.selected}
            />)}
        </div>
    );
};
