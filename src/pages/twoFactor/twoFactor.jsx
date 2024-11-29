import { useState, useEffect } from "react";


const TwoFactorAuthenticator = ({ parsedUserData }) => {
    const [secret, setSecret] = useState("");
    const [qrCode, setqrCode] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [code, setCode] = useState("");

    const getQrCodeHandler = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://final-year-project-pijh.onrender.com/generate_code/${parsedUserData.id}`)
            const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData);
            }

            setLoading(false)

            setSecret(responseData.secret);
            setqrCode(responseData.qrCode);
        } catch(err) {
            setLoading(true)
            setError(err.message);
        }
    }

    const submitCodeHandler = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://final-year-project-pijh.onrender.com/submit_code`, {
                method: "POST",
                body: JSON.stringify({
                    code: code
                }),
                headers: {
                    "Content-Type" : "applocation/json"
                }
            })
            const responseData = await response.json();
            // if(!response.ok) {
            //     throw new Error(responseData);
            // }

            setLoading(false)
            sessionStorage.setItem("code", code);
            alert("successfully added two factor auhtenticator");
        } catch(err) {
            setLoading(true)
            setError(err.message);
        }
    }

    return (
        <div style={{textAlign: "center", marginTop: "20px"}}>
            <div>
                <img src={qrCode} alt="" />
            </div>
            
            <div>
                <p>Secret Code</p>
                <p style={{color: "black"}}>{secret}</p>
            </div>
            
            <button onClick={getQrCodeHandler}>Click to get code</button>
            {loading && <p>Loading...</p>}
            <p>{error}</p>

            <div>
                <div>Scan the QR code on your google authenticator App to get Code.</div>
                {secret.length !== 0 ? 
                <div>Enter Code to complete to Two
                     Factor authenticator Process</div> : null}
                {secret ? <div>
                    <input type="number" onChange={(e) => setCode(e.target.value)} placeholder="Enter Google Authenticator code" />
                    <button onClick={submitCodeHandler}>Submit Code</button>
                </div> : null}
            </div>
        </div>
    )
}

export default TwoFactorAuthenticator;