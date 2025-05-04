import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";


import "./chat_details.css"

const ChatDetails = () => {
    const chatData = JSON.parse(sessionStorage.getItem("chat"))
    const url = `http://localhost:5000/`

    const navigate = useNavigate();

    return (
        <div className="chatDetails_container_wrapper_">
            <div className="chatDetails_contact_wrapper">
                <div><IoIosArrowBack /></div>
                <div>Contact info</div>
                <div></div>
            </div>
            <div className="chatDetails_image_profile_">
                <div><img src={`${url}${chatData.profile}`} alt="" /></div>
                <div>
                    <p>{chatData.fullname.toUpperCase()}</p>
                </div>
            </div>
            <div className="chatDetails_specialCases_">
                <div>Clear Chats</div>
                <hr />
                <div>Report {chatData.fullname}</div>
                <hr />
                <div>Block {chatData.fullname}</div>
            </div>
        </div>
    )
}

export default ChatDetails;