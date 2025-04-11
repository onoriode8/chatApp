import { useState, useEffect, createContext, useCallback } from 'react';
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext({
    pickedFile: null,
    user: null,
    setFilePicker: () => {},
    chatInfo: null,
    chatPushInfo: () => {},
    toggleSearchBarCont: null,
    setToggleSearchBarCont: () => {}
});


export const ContextProvider = (props) => {
    const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))
    const [profilePic, setProfilePic] = useState()
    const [user, setUser] = useState(null)

    const [chatInfo, setChatInfo] = useState({
        chatFullname: null, chatId: null, chatProfile: null
    })

    const [toggleSearchBar, setToggleSearchBar] = useState()

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

    // useEffect(() => {
    //     if(parsedData ===  null) {
    //         navigate("/")
    //     }
    // }, [])

    useEffect(() => {
        if(!parsedData) return
        try {
            const getUserFunc = async() => {
                const response = 
                await fetch(`http://localhost:5000/user/user/${parsedData.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + parsedData.token
                    }
                })
                const responseData = await response.json()
                console.log(responseData)
                if(!response.ok) throw new Error(responseData)
                setUser(responseData)
                console.log(responseData)
            }
            getUserFunc()
        } catch(err) {
            if(err.message === "jwt expired") {
                sessionStorage.removeItem("cookie-string")
                navigate("/")
                window.location.reload()
            } else {
                console.log(err.message)
            }
        }
    }, [])


    return (
        <AuthContext.Provider value={{
            pickedFile: profilePic,
            user: user,
            setFilePicker: setFileHandler,
            chatInfo: chatInfo,
            chatPushInfo: dispatchChatInfoHandler,
            toggleSearchBarCont: toggleSearchBar,
            setToggleSearchBarCont: toggleSearchBarFunction
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}