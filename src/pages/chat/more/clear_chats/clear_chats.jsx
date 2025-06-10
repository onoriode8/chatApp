import { useNavigate } from 'react-router-dom'

import PopupScreen from "../popup_screen/popup_screen";

import "./clear_chats.css"


const ClearChats = ({ fullname, toggle, togglePopupScreenHandler }) => {
    const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))
    const chatData = JSON.parse(sessionStorage.getItem("chat"))

    const navigate = useNavigate()
    const clearAllExistingChatHandler = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_DB_URL}/user/delete/${chatData.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + parsedData.token
                }
            })
            const data = await response.json()
            if(data.ok === false) {
                throw new Error(data)
            }
            navigate(`/chat/${chatData.id}`)
            window.location.reload()
        } catch(err) {}
    }

    return (
        <div className="clear_chats_wrappe">
            {!toggle && <div style={{margin: "20px 0px"}} onClick={togglePopupScreenHandler}>Clear Chats</div>}
            {toggle && <div>
                <PopupScreen 
                    fullname={fullname} tag="Clear Chats" 
                    text="Are you sure you want to delete all 
                        your messages with this user.
                        Deleting messages can't be undo." 
                    cancel={togglePopupScreenHandler}
                    processButton={clearAllExistingChatHandler}
                />
                </div>}
        </div>
    )
}

export default ClearChats;