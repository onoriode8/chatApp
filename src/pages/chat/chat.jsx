import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoIosArrowBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";

import Input from '../input/input'
import { AuthContext } from '../../hooks/context';
import { useChatRoom } from '../../hooks/chat';
import  { ReceiverMessages, CreatorMessages } from './chat_user/chat_user'

import './chat.css'


const Chat = () => {
    const chatData = JSON.parse(sessionStorage.getItem("chat"))
    const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))

    const { chatInfo, deletedMessage, deletedMessageFunc } = useContext(AuthContext)

    const { socketMessage, serverMessage } = useChatRoom()

    const navigate = useNavigate()
    const backFunction = () => {
        sessionStorage.removeItem("chat")
        navigate(-1);
        window.location.reload();
    }

    let creatorMessage;
    if(socketMessage) {
        creatorMessage = socketMessage.conversation
            .filter(user => user.senderId === parsedData.id)
    }

    let receiverMessage;
    if(socketMessage) {
        receiverMessage = socketMessage.conversation
            .filter(user => user.senderId === chatData.id)
    }

    // //render receiver message when page reload.
    let renderedReceiverServerMessages = serverMessage;
    if(serverMessage.length !== 0) {
        const findUser = serverMessage.find(id => 
            id.creatorId === parsedData.id || id.creatorId === chatData.id)
        const filteredMsg = findUser.conversation.filter(msg => msg.senderId === chatData.id)
        renderedReceiverServerMessages = filteredMsg.map(message => 
            <ReceiverMessages key={message.id}
                id={message.id}
                file={message.file}
                message={message.message}
                date={message.createdAt} time={message.time} />)
    }

    // //render creator server message when page reload
    let renderedServerMessages = serverMessage;
    if(serverMessage.length !== 0) {
        const findUser = serverMessage.find(id => 
            id.creatorId === parsedData.id || id.creatorId === chatData.id)
        const filteredMsg = findUser.conversation.filter(msg => msg.senderId === parsedData.id)
        renderedServerMessages = filteredMsg.map(message => 
            <CreatorMessages key={message.id} id={message.id}
                file={message.file}
                message={message.message}
                date={message.createdAt} time={message.time} />)
    }

    useEffect(() => {
        setTimeout(() => {
           deletedMessageFunc(null)
        }, 1000);
    })

    return (
        <div className="Chat_wrapper">
            <div className="Chat_header_wrapper">
                <div onClick={backFunction}><IoIosArrowBack /></div>
                <div className="Chat_img_wrapper">
                    <div><img src={`${chatData.profile}`} alt="" /></div>
                    <div>{chatData.fullname.toUpperCase()}</div>
                    {chatInfo ? chatInfo.chatFullname : chatData.fullname}
                </div>
                <li>
                    <a href={`/chat_profile`}>
                    <BsThreeDotsVertical /></a>
                </li>
            </div>
            {/* Receiver chat */}
            {receiverMessage ? <div>
                {receiverMessage.map(message => 
                    <ReceiverMessages 
                        key={message.id} 
                        id={message.id}
                        file={message.file}
                        message={message.message} 
                        time={message.time}
                        date={message.createdAt} />
                )}
            </div> : renderedReceiverServerMessages }

            {/* Sender chat */}
            {creatorMessage ? <div>
                {creatorMessage.map(message => 
                    <CreatorMessages 
                        key={message.id}
                        id={message.id}
                        message={message.message}
                        file={message.file}
                        time={message.time}
                        date={message.createdAt}  />
                )}
                </div> : renderedServerMessages} 
                {/* <div id="divId"></div> */}
                {deletedMessage && <div className="chat_success_message">
                    {deletedMessage !== null ? <p>{deletedMessage}</p>: null}
                </div>}
            <Input />
        </div>
    )
}

export default Chat; 
