import { useState, useEffect, createContext, useCallback } from 'react';
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext({
    pickedFile: null,
    user: null,
    setFilePicker: () => {},
    chatInfo: null,
    chatPushInfo: () => {},
    toggleSearchBarCont: null,
    setToggleSearchBarCont: () => {},
    socketMessage: "",
    setSocketMessage: () => {},
    errorMessage: null, 
    setErrorMessage: () => {},
    input: "", 
    setInput: () => {},
    showModel: false,
    setShowModel: () => {},
    deletedMessage: null,
    deletedMessageFunc: () => {}
});


export const ContextProvider = (props) => {
    const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))
    const [profilePic, setProfilePic] = useState()
    const [user, setUser] = useState(null)

    const [socketMessage, setSocketMessage] = useState("")
    const [input, setInput] = useState("")

    const [chatInfo, setChatInfo] = useState({
        chatFullname: null, chatId: null, chatProfile: null
    })

    const [toggleSearchBar, setToggleSearchBar] = useState()

    const [errorMessage, setErrorMessage] = useState(null)

    const [showModel, setShowModel] = useState(false)
    const [deletedMessage, setDeletedMessageFunc] = useState(null)
 
    const deletedMessageHandler = (successMessage) => {
        setDeletedMessageFunc(successMessage)
    }

    const toggleModelHandler = () => {
        setShowModel(prevState => !prevState)
    } 

    const toggleSearchBarFunction = (toggleBoolean) => {
        setToggleSearchBar(toggleBoolean)
    }

    const setFileHandler = useCallback((profilePics) => {
        if(profilePics) {
            setProfilePic(profilePics)
        } 
    }, [])

    const dispatchChatInfoHandler = (fullname, id, profile) => {
        setChatInfo({
            chatFullname: fullname, 
            chatId: id, chatProfile: profile
        })
    }

    const navigate = useNavigate()

    useEffect(() => {

        if(parsedData ===  null) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        if(!parsedData) return
        const getUserFunc = async() => {
            try {
                // ${process.env.REACT_APP_DB_URL}
                const response = await fetch(`${process.env.REACT_APP_DB_URL}/user/user/${parsedData.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + parsedData.token
                    }
                })
                const responseData = await response.json()
                if(!response.ok) throw new Error(responseData)
                setUser(responseData)
            } catch(err) {
                if(err.message === "jwt expired" || err.message === "Not found") {
                    sessionStorage.removeItem("cookie-string")
                    sessionStorage.removeItem("chat")
                    navigate("/")
                    window.location.reload()
                } else {
                    setErrorMessage(err.message)
                }
            }
        }
        getUserFunc()
    }, [])

    const toggleSetErrorMessage = () => {
        setErrorMessage(null)
        window.location.reload()
    }


    return (
        <AuthContext.Provider value={{
            pickedFile: profilePic,
            user: user,
            setFilePicker: setFileHandler,
            chatInfo: chatInfo,
            chatPushInfo: dispatchChatInfoHandler,
            toggleSearchBarCont: toggleSearchBar,
            setToggleSearchBarCont: toggleSearchBarFunction,
            socketMessage, setSocketMessage,
            errorMessage, setErrorMessage,
            toggleSetErrorMessage,
            input, setInput,
            showModel: showModel,
            setShowModel: toggleModelHandler,
            deletedMessage: deletedMessage,
            deletedMessageFunc: deletedMessageHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
