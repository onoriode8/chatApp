import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import PopupScreen from "../../popup_screen/popup_screen";

import "./block.css"


const Block = ({ fullname, toggle, togglePopupScreenHandler }) => {
    const [blocked, setBlocked] = useState(false)
    const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))
    const chatData = JSON.parse(sessionStorage.getItem("chat"))

    const navigate = useNavigate()
    const blockUserHandler = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_DB_URL}/user/block/${chatData.id}`, {
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
            togglePopupScreenHandler()
            setBlocked(true)
        } catch(err) {}
    }

    return (
        <div className="block_wrappe">
            {!toggle && <div onClick={togglePopupScreenHandler}>
                {blocked ? <div>Blocked {fullname}</div> : <div>Block {fullname}</div>}
            </div>}
            {toggle && <div>
                <PopupScreen 
                    fullname={fullname} tag="Block" 
                    text="This person won't be able to message you,
                    neither will they see your profile.
                    They won't know you blocked them." 
                    cancel={togglePopupScreenHandler}
                    processButton={blockUserHandler}
                />
            </div>}
        </div>
    )
}

export default Block;