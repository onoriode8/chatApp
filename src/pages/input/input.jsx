import { useChatRoom } from '../../hooks/chat'
import Loading from '../loading/loading'

import { FcMultipleCameras } from "react-icons/fc";
import { TbSend2 } from "react-icons/tb";

import './input.css'
import { useContext } from 'react';
import { AuthContext } from '../../hooks/context';
// import { useImagePicker } from '../../hooks/image-picker';


const Input = () => {
    const { serverMessage,
        openFileHandler, inputRefElement, inputMessage,
        sendMessage, loading, inputMessageHandler,
        pickedFileHandler } = useChatRoom()

    // const { inputMessage } = useContext(AuthContext)

    // const { imageRef, openFileHandler,
    //     filePickerHandler
    // } = useImagePicker()
    console.log("FROM SERVER WHEN RELOAD", serverMessage)
    console.log("CHECK", inputMessage)
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
                <div>{inputMessage.trim().length === 0 
                ? null : <TbSend2 onClick={sendMessage} />}</div>}
            </div>
        </div>
    )
}

export default Input;