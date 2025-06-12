import { useChatRoom } from '../../hooks/chat'
import Loading from '../loader/loading/loading'

import { FcMultipleCameras } from "react-icons/fc";
import { TbSend2 } from "react-icons/tb";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { BsSend } from "react-icons/bs";

import './input.css'


const Input = () => {
    const { serverMessage, imageUrl, setImageUrl, 
        setPickedFile, fileLoading, sendFileHandler,
        openFileHandler, inputRefElement, inputMessage,
        sendMessage, loading, inputMessageHandler,
        pickedFileHandler } = useChatRoom()
    const cancelFilePickedHandler = () => {
        setImageUrl(null)
        setPickedFile(null)
    }

    return (
        <div className="Input_container_wrapper">
            {imageUrl && <div>
                <img src={imageUrl} alt="" />
                <div>
                    <div title="close" onClick={cancelFilePickedHandler}><MdOutlineCancelPresentation /></div>
                    <div title="send" onClick={sendFileHandler}><BsSend /></div>
                    <div>{fileLoading}</div>
                </div>
            </div>}
            <div className="Input_wrapper">
                {inputMessage.trim().length !== 0 
                ? null : <div onClick={openFileHandler}>
                    <FcMultipleCameras /></div>}
                <input ref={inputRefElement} onChange={pickedFileHandler}
                    style={{display: "none"}} type="file" />
                <input type="text" value={inputMessage}
                    onChange={inputMessageHandler}
                    placeholder="Message" />
                {loading ? <Loading /> : 
                    inputMessage.trim().length === 0 ? null : 
                <div><TbSend2 onClick={sendMessage} /></div>}
            </div>
        </div>
    )
}

export default Input;