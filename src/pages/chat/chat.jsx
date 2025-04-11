import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";

import Input from '../input/input'
import { AuthContext } from '../../hooks/context';
import profile from '../../assets/profile.avif'

import './chat.css'


const Chat = () => {
    const chatData = JSON.parse(sessionStorage.getItem("chat"))
    const { chatInfo } = useContext(AuthContext)

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

    return (
        <div className="Chat_wrapper">
            <div className="Chat_header_wrapper">
                <div onClick={backFunction}><IoIosArrowBack /></div>
                <div className="Chat_img_wrapper">
                    <div><img src={profile} alt="" /></div>
                    <div>ONORIODE UMUKORO</div>
                    {chatInfo ? chatInfo.chatFullname : chatData.fullname}
                </div>
                <div><BsThreeDotsVertical /></div>
            </div>
            {/* Receiver chat */}
            <div className="Chat_body_receiver_wrapper">
                <p>Hello from receiver</p>
            </div>
            <div className="Chat_body_receiver_img">
                <img src={profile} alt="" />
            </div>

            {/* Sender chat */}
            <div className="Chat_body_sender_wrapper">
                <p>HELLO FROM ME SENDER</p>
            </div>
            <div className="Chat_body_sender_img">
                <img src={profile} alt="" />
            </div>

            <Input />
        </div>
    )
}

export default Chat;