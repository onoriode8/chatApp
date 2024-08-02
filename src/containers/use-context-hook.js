import { useState } from 'react';
import axios from 'axios';


export const useChangeLoginPassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [createNewPassword, setCreateNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showPasswordVisibility, setShowPasswordVisibility] = useState(false);

    const [passwordBoolean, setPasswordBoolean] = useState(false);
    const [passwordMatchBoolean, setPasswordMatchBoolean] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //function for toggling password visibility.
    const togglePasswordVisibilityHandler = () => {
        setShowPasswordVisibility(prevState => !prevState);
    }

    //function to cancel error messages.
    const errorHandler = () => setError(null);

    //function for changing password.
    const submitChangeLoginPasswordHandler = (event) => {
        event.preventDefault();
        if(currentPassword.trim().length === 0 || currentPassword.trim().length <= 6) {
            return setPasswordBoolean(true);
        }
        if(createNewPassword.trim().length === 0 || createNewPassword.trim().length <= 6) {
            return setPasswordBoolean(true);
        }
        if(currentPassword !== confirmNewPassword) {
            return setPasswordMatchBoolean(true)
        }
        const data = {
            currentPassword, createNewPassword, confirmNewPassword
        }
        setIsLoading(true);
        const postNewPasswordFunc = async() => {
        try {
            const response = await axios.post("", {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer + "
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            if(response.ok === false) {
                throw new Error(responseData)
            }
            setIsLoading(false);
            } catch(err) {
                setIsLoading(false);
                setError(err.message || "Bad Connection");
            }
        } 
        postNewPasswordFunc();

    }
    return { setCurrentPassword, setCreateNewPassword, 
        setConfirmNewPassword, passwordBoolean, showPasswordVisibility, 
        togglePasswordVisibilityHandler, isLoading,
        passwordMatchBoolean, error, errorHandler, 
        submitChangeLoginPasswordHandler 
    }
} 