import { useChatRoom } from '../../hooks/chat'
import Loading from '../loading/loading'

import { FcMultipleCameras } from "react-icons/fc";
import { TbSend2 } from "react-icons/tb";

import './input.css'
// import { useImagePicker } from '../../hooks/image-picker';


const Input = () => {
    const { serverMessage, inputMessage,
        openFileHandler, inputRefElement,
        sendMessage, loading, inputMessageHandler,
        pickedFileHandler } = useChatRoom()

    // const { imageRef, openFileHandler,
    //     filePickerHandler
    // } = useImagePicker()
    console.log("FROM SERVER WHEN RELOAD", serverMessage)
    return (
        <div>
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