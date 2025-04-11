import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export const useChatRoom = () => {
    const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))
    const [inputMessage, setInputMessage] = useState("")
    const [pickedFile, setPickedFile] = useState(null)

    const [socketMessage, setSocketMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const [serverMessage, setServerMessage] = useState([])

    const inputRefElement = useRef()

    const openFileHandler = () => {
        inputRefElement.current.click()
    }

    const pickedFileHandler = (e) => {
        const file = e.target.files[0]
        setPickedFile(file)
    }

    //send pickedFile to server later after sending messages.
    console.log("FILE PICKED TO SEND", pickedFile)

    useEffect(() => {
        if(!parsedData) return
        try {
            const getServerMessage = async() => { //haven't add route to backend
                const response = await fetch("http://localhost:5000/user/get/server/message", {
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization": "Bearer " + parsedData.token
                    }
                })
                const responseData = await response.json()
                if(!response.ok) throw new Error(responseData)
                setServerMessage(responseData)
            }
            getServerMessage()
        } catch(err) {
            console.log(err.message)
        }
    }, [])

    //send message function
    const sendMessage = async() => {
        try{
            setLoading(true)
            const response = await axios.post("http://localhost:5000/send/message", {
                message: inputMessage
            })
            console.log("SEND MESSAGE", response)
            setLoading(false)
            setInputMessage("")
        } catch(err) {
            setLoading(false)
            setInputMessage("")
            console.log(err.message)
        }
    }

    //onchange input entered
    const inputMessageHandler = (e) => {
        setInputMessage(e.target.value)
    }

    return {
        serverMessage, loading, inputMessage, 
        openFileHandler, inputRefElement,
        pickedFileHandler,
        sendMessage, inputMessageHandler
    }
}