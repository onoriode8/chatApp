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
    setInput: () => {}
    
});


export const ContextProvider = (props) => {
    const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))
    const [profilePic, setProfilePic] = useState()
    const [user, setUser] = useState(null)

    //use state on another file
    const [socketMessage, setSocketMessage] = useState("")
    const [input, setInput] = useState("")


    const [chatInfo, setChatInfo] = useState({
        chatFullname: null, chatId: null, chatProfile: null
    })

    const [toggleSearchBar, setToggleSearchBar] = useState()

    //displaying error message.
    const [errorMessage, setErrorMessage] = useState(null)


    //toggle search use bar function
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
                const response = 
                await fetch(`${process.env.REACT_APP_DB_URL}/user/user/${parsedData.id}`, {
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
            input, setInput

        }}>
            {props.children}
        </AuthContext.Provider>
    )
}