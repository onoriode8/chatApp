import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import AuthenticatorProceed from './authenticatorProceed'; 
import { AuthContext } from "../../hooks/context";


const Proceed = ({ responseData, amount, narration, recipientData }) => {

    const [code, setCode] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const [message, setMessage] = useState(null)


    const { secret } = useContext(AuthContext)

    const navigate = useNavigate()

    //function to verify authenticator code before successfull transaction.
    useEffect(() => {
        if(code.length !== 6) return
        const verifyAuthenticatorCodeBeforeTransfer = async () => {
            try {
                setLoading(true)
                const verified = await fetch("https://final-year-project-pijh.onrender.com/signin/verify/2fa/token", {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : "Bearer " + responseData.token
                    },
                    body: JSON.stringify({
                        code: code, 
                        userId: responseData.id,
                        secret: secret
                    })
                })
                const verifiedData = await verified.json()
                if(!verified.ok && !verifiedData) throw new Error(verified)
                setLoading(false)
                setCode("")
                setSuccess(verified)
            } catch(err) {
                setCode("")
                setLoading(false)
                setError(err.message)
                setTimeout(() => {
                    setError(null);
                }, 3000)
            }
        }
        verifyAuthenticatorCodeBeforeTransfer()
    }, [code, secret, responseData.id, responseData.token])


    //function to transfer money to existing user if isMFA is true
    useEffect(() => {
        if(!success) return
        const fetchUserDataHandler = async() => {
            //convert amount in string to Number.
            const formattedDataAmount = amount.replace(/[^0-9.-]+/g, "");

            try {
                const transferResponse = await fetch(`https://final-year-project-pijh.onrender.com/transfer-fund`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        description: narration,
                        walletNumber: Number(recipientData.walletNumber),
                        amount: Number(formattedDataAmount),
                        fullName: recipientData.fullname,
                        creatorId: responseData.id
                    }),
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : "Bearer " + responseData.token
                    }
                })
                const transferResponseData = await transferResponse.json();
                if(transferResponse.ok === false) {
                    throw new Error(transferResponseData);
                }
                setLoading(false);
                setCode("")
                setMessage("Your Transaction was successful.");
                navigate("/home");
            } catch(err) {
                setLoading(false)
                setCode("")
                setError(err.message);
            }
        }
        fetchUserDataHandler();
    }, [success, narration, amount, recipientData,
         responseData.id, navigate, responseData.token])

    return (
        <div>
            <AuthenticatorProceed code={code} setCode={setCode}
             loading={loading} error={error} greetings="" 
             responseData={responseData} message={message} />
        </div>
    )
}

export default Proceed;