import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../hooks/context";


import "./userList.css"

const UserList = ({ fullname, profile, id }) => {
    const {chatInfo, chatPushInfo} = useContext(AuthContext)
    console.log("FROM USERLIST", chatInfo)

    const addChatInfoHandler = () => {
        chatPushInfo(fullname, id, profile)
        const chat = { fullname, id, profile }
        JSON.stringify(sessionStorage.setItem(chat, "chat"))
    }

    return (
        <div className="userList_wrapper">
            <NavLink to={`/chat/${id}`} 
                onClick={addChatInfoHandler}
                className="userList_profile_log_wrapper">
                <div><img src={profile} alt="" /></div>
                <p>{fullname ? fullname.toUpperCase() : fullname}</p>
            </NavLink>
        </div>
    )
}

export default UserList;