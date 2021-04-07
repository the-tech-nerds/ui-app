import React, {useEffect, useState} from 'react';
import  '../../../styles/user_dashbord.module.scss'
import axios from "axios";
export default function UserProfilePic(){
    const [user, setUser] = useState(null);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')) || {});
    }, [])
    
    return user ? (
         <div className="profile-sidebar ">
            <div className="profile-userpic">
                <img
                    src={user.image_url}
                    className="img-responsive" alt=""/>
            </div>
            <div className="profile-usertitle">
                <div className="profile-usertitle-name">
                    {user.first_name + ' ' + user.last_name}
                </div>
                <div className = "mb-3">
                    {user.email}
                </div>
            </div>
        </div>) : <span />;
}
