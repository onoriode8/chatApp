import { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../hooks/context";

export const useTwoFactorAuthenticator = ({ parsedUserData }) => {
    const [secret, setSecret] = useState("");
    const [qrCode, setqrCode] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const [copyText, setCopyText] = useState(false)

    const [code, setCode] = useState("");

    const { isMFA } = useContext(AuthContext)

    //Get Generated 2FA Code.
    const getQrCodeHandler = async () => {
        // const data = sessionStorage.getItem("user")
        // const isMFAData = JSON.parse(data)

        try {
            if(isMFA === true) {
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
                        secret: secret, 
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
                setTimeout(() => {
                    setSuccessMessage(responseData.message);
                }, 3000)
            } catch(err) {
                setLoading(false)
                setCode("")
                setTimeout(() => {
                    setError(err.message);
                }, 1000);
            }
        }
        submitCodeHandler()
    }, [code, parsedUserData.id, parsedUserData.token, secret])

    const copySecretTextHandler = async () => {
        try {
            if(secret.length === 0) throw new Error("Text can't be empty.")
            await navigator.clipboard.writeText(secret)
            setCopyText(true)
        } catch(err) {}
    }

    return { secret, qrCode, loading, error, code, 
             successMessage, copyText,
             setCode, getQrCodeHandler, copySecretTextHandler
    }
}
