import { useState, useEffect, createContext, useCallback } from 'react';
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext({
    imageUrl: null,
    setImageUrlPreview: () => {}
});


export const ContextProvider = (props) => {
    const [profilePic, setProfilePic] = useState()

    const setImageUrlHandler = (profilePics) => {
        setProfilePic(profilePics)
    }

    return (
        <AuthContext.Provider value={{
            imageUrl: profilePic, 
            setImageUrlPreview: setImageUrlHandler 
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}