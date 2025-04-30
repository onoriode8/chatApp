import { useContext } from 'react';
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

    const { chatInfo } = useContext(AuthContext)

    const { socketMessage, serverMessage } = useChatRoom()

    const navigate = useNavigate()
    const backFunction = () => {
        sessionStorage.removeItem("chat")
        navigate(-1)
    }

    //comment back on later.
    // let profileImage = `http://localhost:5000`+chatData.profile`;
    // if(chatInfo) {
    //     profileImage = `http://localhost:5000`+chatInfo.chatProfile
    // }

    // console.log("HERE ", socketMessage.conversation)
    // console.log(user)

    console.log("getConversation from server", serverMessage)

    const url = `http://localhost:5000/`

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

    //render receiver message when page reload.
    let renderedReceiverServerMessages = serverMessage;
    if(serverMessage.length !== 0) {
        const findUser = serverMessage.find(id => 
            id.creatorId === parsedData.id || id.creatorId === chatData.id)
        // console.log("TOGGLE", findUser)
        const filteredMsg = findUser.conversation.filter(msg => msg.senderId === chatData.id)
        //check if filteredMsg length is 0 before rendering to receiver.
        console.log("receiver check", filteredMsg)
        renderedReceiverServerMessages = filteredMsg.map(message => 
            <ReceiverMessages key={message.senderId} message={message.message}
                date={message.createdAt} time={message.time} />)
    }

    //render creator server message when page reload
    let renderedServerMessages = serverMessage;
    if(serverMessage.length !== 0) {
        const findUser = serverMessage.find(id => 
            id.creatorId === parsedData.id || id.creatorId === chatData.id)
        const filteredMsg = findUser.conversation.filter(msg => msg.senderId === parsedData.id)
        renderedServerMessages = filteredMsg.map(message => 
            <CreatorMessages key={message.senderId} message={message.message}
                date={message.createdAt}  time={message.time} />)
    }


    return (
        <div className="Chat_wrapper">
            <div className="Chat_header_wrapper">
                <div onClick={backFunction}><IoIosArrowBack /></div>
                <div className="Chat_img_wrapper">
                    <div><img src={`${url}${chatData.profile}`} alt="" /></div>
                    <div>{chatData.fullname.toUpperCase()}</div>
                    {chatInfo ? chatInfo.chatFullname : chatData.fullname}
                </div>
                <div><BsThreeDotsVertical /></div>
            </div>
            {/* Receiver chat */}
            {receiverMessage ? <div >
                {receiverMessage.map(message => 
                    <ReceiverMessages 
                        key={message.senderId} 
                        message={message.message} 
                        time={message.createdAt} />
                )}
            </div> : renderedReceiverServerMessages }

            {/* <div className="Chat_body_receiver_img">
                <img src={`${url}${chatData.profile}`} alt="" />
            </div> */}

            {/* Sender chat */}
            {creatorMessage ? <div >
                {creatorMessage.map(message => 
                    <CreatorMessages 
                        key={message.senderId}
                        message={message.message}
                        time={message.createdAt}  />
                )}
                </div> : renderedServerMessages}
           
            {/* <div className="Chat_body_sender_img">
                <img src={`${url}${user ? user.profile : null}`} alt="" />
            </div> */}

            <Input />
        </div>
    )
}

export default Chat;

 // {/* {serverMessage.length !== 0 ? <div>*/}
                // {/*serverMessage.map(message =>  */}
                    // {/*<CreatorMessages  */}
                        // {/*key={message.senderId} */}
                        // {/*message={message.message} */}
                        // {/*time={message.createdAt}  />)}</div>} */} */}




                //         creatorMessage ? <div >
                // {creatorMessage.map(message => 
                //     <CreatorMessages 
                //         key={message.senderId}
                //         message={message.message}
                //         time={message.createdAt}  />
                // )}
                // </div> : 
                // <div>{serverMessage.length !== 0 ? 
                //     <div>{serverMessage.map(message => <CreatorMessages
                //          key={message.senderId}
                //          message={message.message}
                //          time={message.createdAt}  />)} </div>