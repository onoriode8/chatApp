import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './context'
// import axios from 'axios'

export const useChatRoom = () => {
    const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))
    const receiver = JSON.parse(sessionStorage.getItem("chat"))

    const [inputMessage, setInputMessage] = useState("")
    const [pickedFile, setPickedFile] = useState(null)

    // const [socketMessage, setSocketMessage] = useState("")
    const { socketMessage, setSocketMessage } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)

    const [serverMessage, setServerMessage] = useState([])

    const inputRefElement = useRef()

    const navigate = useNavigate()

    const openFileHandler = () => {
        inputRefElement.current.click()
    }

    const pickedFileHandler = (e) => {
        const file = e.target.files[0]
        setPickedFile(file)
    }

    //send pickedFile to server later after sending messages.
    console.log("FILE PICKED TO SEND", pickedFile)

    //Reload to get server messages.
    useEffect(() => {
        if(!parsedData && !receiver) return
        try {
            const getServerMessage = async() => {
                const response = await fetch(
                    `http://localhost:5000/user/get/server/message/${parsedData.id}/${receiver.id}`, {
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization": "Bearer " + parsedData.token
                    }
                })
                const responseData = await response.json()
                console.log(responseData)
                if(!response.ok) throw new Error(responseData)
                const conversations = 
                    responseData.filter(r => {
                        return r.creatorId === parsedData.id 
                        && r.receiverId === receiver.id
                        || r.creatorId === receiver.id 
                        && r.receiverId === parsedData.id
                })
                console.log(conversations)
                setServerMessage(conversations)
            }
            getServerMessage()
        } catch(err) {
            if(err.message === "jwt expired") {
                sessionStorage.removeItem("cookie-string")
                sessionStorage.removeItem("chat")
                navigate("/")
                window.location.reload()
            } else {
                // console.log(err.message)
            }
        }
    }, [])

    //send message function
    const sendMessage = async() => {
        if(!parsedData && !receiver) return
        try{
            setLoading(true)
            const response = await fetch(
                `http://localhost:5000/user/send/message/${parsedData.id}/${receiver.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + parsedData.token
                },
                body: JSON.stringify(
                    { message : inputMessage }
                )
            })
            const responseData = await response.json()
            if(!response.ok) throw new Error(responseData)
            // console.log("SEND MESSAGE", response)
            setLoading(false)
            setInputMessage("")
            setSocketMessage(responseData)
            // console.log(responseData)
        } catch(err) {
            setLoading(false)
            setInputMessage("") 
            if(err.message === "jwt expired") {
                sessionStorage.removeItem("cookie-string")
                sessionStorage.removeItem("chat")
                navigate("/")
                window.location.reload()
            } else {
                // console.log(err.message)
            }
        }
    }

    //onchange input entered for sending private message.
    const inputMessageHandler = (e) => {
        setInputMessage(e.target.value)
    }

    console.log("OMO SEE OH", serverMessage)
    return {
        serverMessage, loading, inputMessage, 
        openFileHandler, inputRefElement,
        pickedFileHandler, socketMessage,
        sendMessage, inputMessageHandler
    }
}