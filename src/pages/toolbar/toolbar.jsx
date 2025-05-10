import { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom';

import { FaUsers } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { FcSearch } from "react-icons/fc";
import { PiPowerThin } from "react-icons/pi";

import { AuthContext } from '../../hooks/context';
import { useGetUser } from '../../hooks/getUsers';

import './toolbar.css'

const Toolbar = () => {
    const receiver = JSON.parse(sessionStorage.getItem("chat"))

    const { user, chatInfo } = useContext(AuthContext)
    const { toggleSearchBarHandler } = useGetUser()
    let imageUrl = null
    if(user) {
        imageUrl = `${process.env.REACT_APP_DB_URL}/${user.profile.replace(/\\/g, "/")}`
    }
    const location = useLocation()
    const logoutHandler = () => {
        sessionStorage.removeItem("cookie-string")
        sessionStorage.removeItem("chat")
        window.location.reload()
    }

    return (
        <div className="Toolbar_wrapper">
            {location.pathname === `/chat/${chatInfo.chatId}`
            || location.pathname === `/chat_profile`
            || location.pathname === `/chat/${receiver ? receiver.id : null}`
            ? null : <div className="Toolbar_ul_wrapper">
                <ul>
                    {user && <NavLink to="/view-profile" title="profile">
                      <img src={imageUrl} alt="profile" /></NavLink>}
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