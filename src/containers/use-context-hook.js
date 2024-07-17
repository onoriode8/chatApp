import { useState } from 'react';
import axios from 'axios';


export const useChangeLoginPassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [createNewPassword, setCreateNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [passwordBoolean, setPasswordBoolean] = useState(false);
    const [passwordMatchBoolean, setPasswordMatchBoolean] = useState(false);
    const [error, setError] = useState(null);



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
        try {
            const postNewPasswordFunc = async() => {
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
            }
            postNewPasswordFunc();
        } catch(err) {
            setError(err.message);
        }
    }

} 