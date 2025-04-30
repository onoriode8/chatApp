import { useContext } from 'react';

import { AuthContext } from '../../../hooks/context';


import "./chat_user.css"


const url = `http://localhost:5000/`


export const ReceiverMessages = ({message, time }) => {
    const chatData = JSON.parse(sessionStorage.getItem("chat"))

    // const now = time
    // const hours = now.getHours()
    // const minutes = now.getMinutes()
    // const ampm = hours >= 12 ? "PM" : "AM"
    return (
        <div>
            <div className="Receiver_chat_wrapper">
                <div className="Chat_body_receiver_wrapper">
                    {message}
                </div>
                {/* <p>{time.toString().split(" ")[4]} {ampm}</p> */}
            </div>
            <div className="Chat_body_receiver_img">
                    <img src={`${url}${chatData.profile}`} alt="" />
            </div>
        </div>
    )
}


export const CreatorMessages = ({message, time, date}) => {
    const { user } = useContext(AuthContext)
    
    console.log("SEE", message, time, date)

    // const now = time
    // const hours = now.getHours()
    // const minutes = now.getMinutes()
    // const ampm = hours >= 12 ? "PM" : "AM"
    return (
        <div>
            <div className="Creator_chat_wrapper">
                <div className="Chat_body_sender_wrapper">
                    {message}
                </div>
                {/* <p>{time.toString().split(" ")[4]} {ampm}</p> */}
            </div>
            <div className="Chat_body_sender_img">
                <img src={`${url}${user ? user.profile : null}`} alt="" />
            </div>
        </div>
    )
}