import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { GiCheckMark } from "react-icons/gi";

import { useTwoFactorAuthenticator } from '../../containers/2MFA/twoFactor';

const TwoFactorAuthenticatorPage = ({ parsedUserData }) => {

    const { secret, qrCode, loading, error, code, successMessage, setCode, 
        getQrCodeHandler } = useTwoFactorAuthenticator({parsedUserData})

    const navigate = useNavigate();

    const parsedData = JSON.parse(sessionStorage.getItem("user"));

    return (
        <div>
        <div style={{display: "flex", marginTop: "6px", 
            alignItem: "center", justifyContent: "space-between"}}>
            <div onClick={() => navigate(-1)}><IoIosArrowBack /></div>
            <div></div>
        </div>
        <div style={{textAlign: "center", marginTop: "20px"}}>
            <div>
                {parsedUserData.isMFA ? null : <img src={qrCode} alt="" />}
            </div>
            
            {parsedUserData.isMFA ? null : <div>
                {secret && <p>Secret Code</p>}
                <p style={{color: "black", fontSize: "11px"}}>{secret}</p>
            </div>}
            
            {parsedData.isMFA ? null : <button 
             style={{ display: parsedData.isMFA ? "none" : null, cursor: "pointer" }} 
             onClick={getQrCodeHandler}>Click to get code</button>}
            {loading && <p>Loading...</p>}
            <p style={{color: "red"}}>{error}</p>

            <div>
                {secret && <div style={{ display: parsedData.isMFA ? "none" : null }} 
                >Scan the QR code on your google authenticator App to get Code.</div>}
                {secret.length !== 0 ? 
                <div style={{fontSize: "15px", margin: "40px", display: parsedData.isMFA ? "none" : null }}>
                    Enter Code to complete Two
                    Factor authenticator Process.</div> : null}
                {secret ? <div>
                    <input style={{padding: "8px 16px", display: parsedData.isMFA ? "none" : null }} 
                    type="number" value={code} onChange={(e) => setCode(e.target.value)}
                    placeholder="Authenticator code" />
                </div> : null}
            </div>
            {parsedData.isMFA && <div style={{color: "green", display: "flex", alignItems: "center", flexDirection: "column"}}>
                <div style={{fontSize: "2em"}}><GiCheckMark /></div>
                <p>2FA verified</p>
            </div>}
            <div>
                <p style={{color: "green"}}>{successMessage}</p>
            </div>
        </div>
        </div>
    )
}

export default TwoFactorAuthenticatorPage;