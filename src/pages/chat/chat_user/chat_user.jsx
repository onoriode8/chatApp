import { useContext, useEffect } from 'react';
import { RiDeleteBinLine, RiArrowDropDownLine } from "react-icons/ri";
import socketConnect from "socket.io-client"

import { AuthContext } from '../../../hooks/context';


import "./chat_user.css"


export const ReceiverMessages = ({message, id, file, date, time}) => {
    const chatData = JSON.parse(sessionStorage.getItem("chat"))
    
    const formattedTimeFunc = () => { 
        const splitTime = time.split(":")
        let hours = Number(splitTime[0]);
        const minutes = splitTime[1];
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; 

        const formattedTime = `${hours}:${minutes} ${ampm}`;
        return formattedTime;
    }

    const currentTime = formattedTimeFunc()

    return (
        <div>
            <div className="Receiver_chat_wrapper">
                <div className="Chat_body_receiver_wrapper">
                    {file && <div>
                        <img src={file} alt="" />
                    </div>}
                    {message}
                    <div>{currentTime}</div>
                </div>
            </div>
            <div className="Chat_body_receiver_img">
                    <img src={`${chatData.profile}`} alt="" />
            </div>
        </div>
    )
}


export const CreatorMessages = ({message, time, id, file, data, date}) => {
    const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))
    const chatData = JSON.parse(sessionStorage.getItem("chat"))

    const { user, showModel, setShowModel, deletedMessageFunc } = useContext(AuthContext)

    const formattedTimeFunc = () => {
        const splitTime = time.split(":")
        let hours = Number(splitTime[0]);
        const minutes = splitTime[1];
        
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; 

        const formattedTime = `${hours}:${minutes} ${ampm}`;
        return formattedTime;
    }

    const currentTime = formattedTimeFunc()
    
    const deleteSingleMessageByIdHandler = async () => {
        if(!chatData && !id) return;
        try {
            const response = await fetch(`${process.env.REACT_APP_DB_URL}/user/single/chat/delete/${chatData.id}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": "Bearer " + parsedData.token
                }
            })
            const data = await response.json()
            if(data.ok === false) {
                throw new Error(data)
            }
            window.location.reload()
        } catch(err) {}
    }

    useEffect(() => {
        const socketC = socketConnect(`${process.env.REACT_APP_DB_URL}`)
        socketC.on("deletedMessage", socket => {
            if(socket.action.id === parsedData.id) {
                deletedMessageFunc(socket.message)
            }
            return () => socket.disconnect()
        })
    }, [])

    return (
        <div>
            <div className="Creator_chat_wrapper">
                <div>
                    <div className="creatorMessages_dropdown" onClick={setShowModel}>
                        <RiArrowDropDownLine />
                    </div>
                    {showModel && <div className="creatorMessage_show_model">
                        <div onClick={deleteSingleMessageByIdHandler}>
                            <div><RiDeleteBinLine /></div>
                            <div>Delete</div>
                        </div>
                        {/* <hr />
                        <div>
                            <div><RiDeleteBinLine /></div>
                            <div>Delete</div>
                        </div> */}
                    </div>}
                </div>
                <div className="Chat_body_sender_wrapper">
                    {file && <div>
                        <img src={file} alt="" />
                    </div>}
                    {message}
                    <div>{currentTime}</div>
                </div> 
            </div>
            <div className="Chat_body_sender_img">
                <img src={`${user ? user.profile : null}`} alt="" />
            </div>
        </div>
    )
}