import { useChatRoom } from '../../hooks/chat'
import Loading from '../loader/loading/loading'

import { FcMultipleCameras } from "react-icons/fc";
import { TbSend2 } from "react-icons/tb";

import './input.css'


const Input = () => {
    const { serverMessage,
        openFileHandler, inputRefElement, inputMessage,
        sendMessage, loading, inputMessageHandler,
        pickedFileHandler } = useChatRoom()

    return (
        <div className="Input_container_wrapper">
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
                <div>
                    <a href="#divId">{inputMessage.trim().length === 0 
                    ? null : <TbSend2 onClick={sendMessage} />}</a>
                </div>}
            </div>
        </div>
    )
}

export default Input;