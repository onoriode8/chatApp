import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const TwoFactorAuthenticator = ({ parsedUserData }) => {
    const [secret, setSecret] = useState("");
    const [qrCode, setqrCode] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [code, setCode] = useState("");

    const navigate = useNavigate();

    const getQrCodeHandler = async () => {
        try {
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

    useEffect(() => {
        if(code.length !== 6) return;
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
                //sessionStorage.setItem("code", code);
                alert("successfully added two factor auhtenticator");
            } catch(err) {
                setLoading(true)
                setError(err.message);
            }
        }
        submitCodeHandler()
    }, [code, parsedUserData.id, parsedUserData.token, secret])

    return (
        <div>
        <div style={{display: "flex", marginTop: "6px", alignItem: "center", justifyContent: "space-between"}}>
            <div onClick={() => navigate(-1)}><IoIosArrowBack /></div>
            <div></div>
        </div>
        <div style={{textAlign: "center", marginTop: "20px"}}>
            <div>
                <img src={qrCode} alt="" />
            </div>
            
            <div>
                <p>Secret Code</p>
                <p style={{color: "black", fontSize: "11px"}}>{secret}</p>
            </div>
            
            {!secret ? <button onClick={getQrCodeHandler}>Click to get code</button>: null}
            {loading && <p>Loading...</p>}
            <p style={{color: "red"}}>{error}</p>

            <div>
                {secret && <div>Scan the QR code on your google authenticator App to get Code.</div>}
                {secret.length !== 0 ? 
                <div style={{fontSize: "15px"}}>Enter Code to complete Two
                     Factor authenticator Process.</div> : null}
                {secret ? <div>
                    <input type="number" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter Google Authenticator code" />
                    {/* <button onClick={submitCodeHandler()}>Submit Code</button> */}
                </div> : null}
            </div>
        </div>
        </div>
    )
}

export default TwoFactorAuthenticator;