import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";

import ClearChats from '../clear_chats/clear_chats'
// import Report from '../block_report/report/report';
import Block from '../block_report/block/block';

import "./chat_details.css"

const ChatDetails = () => {
    const chatData = JSON.parse(sessionStorage.getItem("chat"))

    const [toggleBlock, setToggleBlock] = useState(false)
    const [toggleClearChat, setToggleClearChat] = useState(false)
    const [toggleReport, setToggleReport] = useState(false)

    const toggleBlockPopupScreenHandler = () => {
        setToggleBlock(prevState => !prevState)
    }

    const toggleClearChatPopupScreenHandler = () => {
        const prevState = toggleClearChat
        setToggleClearChat(!prevState)
    }

    const toggleReportPopupScreenHandler = () => {
        setToggleReport(prevState => !prevState)
    }

    const navigate = useNavigate();

    return (
        <div className="chatDetails_container_wrapper_">
            <div className="chatDetails_contact_wrapper">
                <div onClick={() => navigate(-1)}>
                    <IoIosArrowBack />
                </div>
                <div>Contact info</div>
                <div></div> {/* Edit*/}
            </div>
            <div className="chatDetails_image_profile_">
                <div><img src={`${chatData.profile}`} alt="" /></div>
                <div>
                    <p>{chatData.fullname.toUpperCase()}</p>
                </div>
            </div>
            <div className={
                !toggleClearChat && !toggleReport && !toggleBlock? 
                "chatDetails_specialCases_": null}>
                <ClearChats 
                    toggle={toggleClearChat}
                    togglePopupScreenHandler={
                        toggleClearChatPopupScreenHandler}
                    fullname={chatData.fullname} />
                {/* <Report 
                    toggle={toggleReport}
                    togglePopupScreenHandler={
                        toggleReportPopupScreenHandler}
                    fullname={chatData.fullname} /> */}
                <Block 
                    toggle={toggleBlock}
                    togglePopupScreenHandler={
                        toggleBlockPopupScreenHandler}
                    fullname={chatData.fullname} />
            </div>
            
        </div>
    )
}

export default ChatDetails;