import { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom';

import { FaUsers } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { FcSearch } from "react-icons/fc";
import { PiPowerThin } from "react-icons/pi";

import { AuthContext } from '../../hooks/context';
import { useGetUser } from '../../hooks/getUsers';

import './toolbar.css'

// import profile from '../../assets/profile.avif'

const Toolbar = () => {
    const { user, chatInfo } = useContext(AuthContext)
    const { toggleSearchBarHandler } = useGetUser()
    let imageUrl = null
    if(user) {
        console.log(user)
        imageUrl = `http://localhost:5000/${user.profile.replace(/\\/g, "/")}` //.replace(/\\/g, "/")
    }
    console.log("User from context", imageUrl)
    const location = useLocation()
    const logoutHandler = () => {
        sessionStorage.removeItem("cookie-string")
        sessionStorage.removeItem("chat")
        window.location.reload()
    }

    return (
        <div className="Toolbar_wrapper">
            {location.pathname === `/chat/${chatInfo.chatId}`
            || location.pathname === `/chat/undefined`
            ? null : <div className="Toolbar_ul_wrapper">
                <ul>
                    {user && <NavLink to="/view-profile" title="profile">
                      <img src={imageUrl} alt="" /></NavLink>}
                    <NavLink to="/users" title="users"><FaUsers /></NavLink>
                    <NavLink to="add-group-chat" title="Add group chat"><IoIosAddCircle /></NavLink>
                    {location.pathname === "/users" ? <li title="search users" 
                        onClick={toggleSearchBarHandler}><FcSearch /></li> : null}
                    <NavLink to="/" title="Logout" onClick={logoutHandler}><PiPowerThin /></NavLink>
                </ul>
            </div>}
        </div>
    );
}
export default Toolbar;