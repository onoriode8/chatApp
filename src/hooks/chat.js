import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import connectSocket from 'socket.io-client'

import { AuthContext } from './context'


export const useChatRoom = () => {
    const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))
    const receiver = JSON.parse(sessionStorage.getItem("chat"))

    const [inputMessage, setInputMessage] = useState("")
    const [pickedFile, setPickedFile] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    const { socketMessage, setSocketMessage } = useContext(AuthContext)
    

    const [loading, setLoading] = useState(false)
    const [fileLoading, setFileLoading] = useState(false)

    const [serverMessage, setServerMessage] = useState([])

    const inputRefElement = useRef()
    const socketRef = useRef(null)

    const navigate = useNavigate()

    const openFileHandler = () => {
        inputRefElement.current.click()
    }

    const pickedFileHandler = (e) => {
        const file = e.target.files[0]
        setPickedFile(file)
    }

    useEffect(() => {
        if(!pickedFile) return
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            const result = e.target.result
            setImageUrl(result)
        }
        fileReader.readAsDataURL(pickedFile)
    }, [pickedFile, imageUrl])

    useEffect(() => {
        if(!parsedData && !receiver) return
        try {
            const getServerMessage = async() => {
                const response = await fetch(`${process.env.REACT_APP_DB_URL}/user/get/server/message/${parsedData.id}/${receiver.id}`, {
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization": "Bearer " + parsedData.token
                    }
                })
                const responseData = await response.json()
                if(!response.ok) {
                    throw new Error(responseData) 
                }
                let data;
                for(const array of responseData) {
                    data = array;
                }
                if(data === null) return
                const conversations = 
                    responseData.filter(r => {
                        return r.creatorId === parsedData.id 
                        && r.receiverId === receiver.id
                        || r.creatorId === receiver.id 
                        && r.receiverId === parsedData.id
                })
                setServerMessage(conversations)
            }
            getServerMessage()
        } catch(err) {
            if(err.message !== "jwt expired") {
                alert(err.message)
            } else if(err.message === "jwt expired") {
                sessionStorage.removeItem("cookie-string")
                sessionStorage.removeItem("chat")
                navigate("/")
                window.location.reload()
            } 
        }
    }, [])

    //send file handler
    const sendFileHandler = async() => {
        if(!parsedData && !receiver) return
        if(!pickedFile) return
        try{
            setFileLoading(true)
            const formData = new FormData();
            formData.append("sendFile", pickedFile)
            const response = await fetch(`${process.env.REACT_APP_DB_URL}/user/api/send/image/${parsedData.id}/${receiver.id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": "Bearer " + parsedData.token
                },
                body: formData
            })
            const responseData = await response.json()
            if(!response.ok) throw new Error(responseData)
            setFileLoading(false)
            setPickedFile(null)
            setImageUrl(null)
        } catch(err) {
            setFileLoading(false)
            setPickedFile(null)
            setImageUrl(null)
            if(err.message === "jwt expired") {
                sessionStorage.removeItem("cookie-string")
                sessionStorage.removeItem("chat")
                navigate("/")
                window.location.reload()
            } else {}
        }
    }

    const sendMessage = async() => {
        if(!parsedData && !receiver) return
        if(inputMessage.length === 0) return
        try{
            setLoading(true)
            const formData = new FormData();
            formData.append("sendImage", pickedFile)
            formData.append("message", inputMessage)
            const response = await fetch(`${process.env.REACT_APP_DB_URL}/user/send/message/${parsedData.id}/${receiver.id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": "Bearer " + parsedData.token
                },
                body: formData
            })
            const responseData = await response.json()
            if(!response.ok) throw new Error(responseData)
            setLoading(false)
            setInputMessage("")
        } catch(err) {
            setLoading(false)
            setInputMessage("") 
            if(err.message === "jwt expired") {
                sessionStorage.removeItem("cookie-string")
                sessionStorage.removeItem("chat")
                navigate("/")
                window.location.reload()
            } else {}
        }
    }

    useEffect(() => {
        socketRef.current = connectSocket(`${process.env.REACT_APP_DB_URL}`)
        socketRef.current.on("message", socket => {
            if(socket.conversation.creatorId === parsedData.id 
                && socket.conversation.receiverId === receiver.id 
                || socket.conversation.creatorId === receiver.id 
                && socket.conversation.receiverId === parsedData.id) {
                    setSocketMessage(socket.conversation)
            }
            return () => socketRef.current.disconnect()
        })
    }, [])

    const inputMessageHandler = (e) => {
        setInputMessage(e.target.value)
    }

    return {
        serverMessage, loading, inputMessage, 
        openFileHandler, inputRefElement,
        pickedFileHandler, socketMessage,
        sendMessage, inputMessageHandler,
        imageUrl, setImageUrl, setPickedFile,
        fileLoading, sendFileHandler
    }
}