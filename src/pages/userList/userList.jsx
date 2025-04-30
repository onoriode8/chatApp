import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../hooks/context";


import "./userList.css"

const UserList = ({ fullname, profile, id }) => {
    const {chatInfo, chatPushInfo} = useContext(AuthContext)
    // console.log("FROM USERLIST", chatInfo)

    const addChatInfoHandler = () => {
        chatPushInfo(fullname, id, profile)
        const chat = { fullname, id, profile }
        sessionStorage.setItem("chat", JSON.stringify(chat))
    }

    return (
        <div className="userList_wrapper">
            <a href={`/chat/${id}`} 
                onClick={addChatInfoHandler}
                className="userList_profile_log_wrapper">
                <div><img src={`http://localhost:5000/${profile}`} alt="" /></div>
                <p>{fullname ? fullname.toUpperCase() : fullname}</p>
            </a>
        </div>
    )
}

export default UserList;