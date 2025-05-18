import { useContext } from 'react';

import { AuthContext } from '../../../hooks/context';


import "./chat_user.css"


const url = process.env.REACT_APP_DB_URL



export const ReceiverMessages = ({message, date, time }) => {
    const chatData = JSON.parse(sessionStorage.getItem("chat"))
    
    const formattedTimeFunc = () => { 
        //learn how this time is programmed to am or pm later on.
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
                    {message}
                    <div>{currentTime}</div>
                </div>
            </div>
            <div className="Chat_body_receiver_img">
                    <img src={`${url}/${chatData.profile}`} alt="" />
            </div>
        </div>
    )
}


export const CreatorMessages = ({message, time, date}) => {
    const { user } = useContext(AuthContext)

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
            <div className="Creator_chat_wrapper">
                <div className="Chat_body_sender_wrapper">
                    {message}
                    <div>{currentTime}</div>
                </div> 
            </div>
            <div className="Chat_body_sender_img">
                <img src={`${url}/${user ? user.profile : null}`} alt="" />
            </div>
        </div>
    )
}