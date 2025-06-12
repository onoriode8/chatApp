import { useContext } from "react";

import { AuthContext } from "../../hooks/context";


import "./userList.css"

const UserList = ({ fullname, profile, id }) => {
    const {chatInfo, chatPushInfo} = useContext(AuthContext)

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
                <div>
                    <div><img src={`${profile}`} alt="" /></div>
                    <div></div>
                    <div>{fullname ? fullname.toUpperCase() : fullname}</div>
                </div>
            </a>
        </div>
    )
}

export default UserList;
