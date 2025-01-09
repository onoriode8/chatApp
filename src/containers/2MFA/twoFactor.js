import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export const useTwoFactorAuthenticator = ({ parsedUserData }) => {
    const [secret, setSecret] = useState("");
    const [qrCode, setqrCode] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);


    const [code, setCode] = useState("");



    //Get Generated 2FA Code.
    const getQrCodeHandler = async () => {
        const data = sessionStorage.getItem("user")
        const isMFAData = JSON.parse(data)

        try {
            if(isMFAData.isMFA === true) {
                throw new Error("You can't generate a new code")
            }
            setLoading(true)
            const response = await fetch(`https://final-year-project-pijh.onrender.com/generate_code/${parsedUserData.id}`,{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + parsedUserData.token
                } 
            })
            const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData);
            }

            setLoading(false)
            setSecret(responseData.secret);
            setqrCode(responseData.qrCode);
            
        } catch(err) {
            setLoading(false);
            setError(err.message);
        }
    }

    //verify 2FA Code.
    useEffect(() => {
        if(code === null || code.length !== 6 || !secret) return;
        
        const submitCodeHandler = async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://final-year-project-pijh.onrender.com/verify/2fa/token`, {
                    method: "POST",
                    body: JSON.stringify({
                        code: code,
                        secret: secret, //send from server backend.
                        userId: parsedUserData.id
                    }),
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : "Bearer " + parsedUserData.token
                    }
                })
                const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData);
                }

                setLoading(false)
                setCode("")
                const userData = JSON.parse(sessionStorage.getItem("user"));
                userData.isMFA = responseData.verified
                const data = JSON.stringify(userData)
                sessionStorage.setItem("user", data)
                setTimeout(() => {
                    setSuccessMessage(responseData.message);
                }, 3000)
            } catch(err) {
                setLoading(true)
                setCode("")
                setTimeout(() => {
                    setError(err.message);
                }, 1000);
            }
        }
        submitCodeHandler()
    }, [code, parsedUserData.id, parsedUserData.token, secret])

    return { secret, qrCode, loading, error, code, successMessage,
             setCode, getQrCodeHandler 
    }
}
