import { useContext } from "react"
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { GiCheckMark } from "react-icons/gi";
import { MdOutlineContentCopy } from "react-icons/md";

import { useTwoFactorAuthenticator } from '../../containers/2MFA/twoFactor';
import { AuthContext } from '../../hooks/context';


const TwoFactorAuthenticatorPage = ({ parsedUserData }) => {

    const { secret, qrCode, loading, error, code, copyText,
         successMessage, copySecretTextHandler, setCode, 
        getQrCodeHandler } = useTwoFactorAuthenticator({parsedUserData})

    const navigate = useNavigate();

    // const parsedData = JSON.parse(sessionStorage.getItem("user"));
    const { isMFA } = useContext(AuthContext)

    return (
        <div>
        <div style={{display: "flex", marginTop: "6px", 
            alignItem: "center", justifyContent: "space-between"}}>
            <div onClick={() => navigate(-1)}><IoIosArrowBack /></div>
            <div></div>
        </div>
        <div style={{textAlign: "center", marginTop: "20px"}}>
            <div>
                {isMFA ? null : <img src={qrCode} alt="" />}
            </div>
            
            {isMFA ? null : <div>
                {secret && <p>Secret Code</p>}
                <div style={{display: "flex", alignItems: "center", 
                    justifyContent: "center"}}>
                    <p style={{color: "black", fontSize: "11px"}}>{secret}</p>
                    {!copyText ? <p onClick={copySecretTextHandler} 
                        style={{marginLeft: "25px", cursor: "pointer",
                            display: !secret ? "none" : null
                        }}
                        ><MdOutlineContentCopy /></p> : 
                        <p style={{color: "green", 
                        marginLeft: "25px"}}>Copied</p>}
                </div>
            </div>}
            
            {isMFA || secret ? null : <button 
             style={{ display: isMFA ? "none" : null,
                background: "green", border: "none", color: "#fff", 
                cursor: "pointer", padding: "8px 12px" }} 
             onClick={getQrCodeHandler}>Generate Code</button>}
            {loading && <p>Loading...</p>}
            <p style={{color: "red"}}>{error}</p>

            <div>
                {secret && <div style={{ display: isMFA ? "none" : null }} 
                >Scan the QR code on your google authenticator App to get Code.</div>}
                {secret.length !== 0 ? 
                <div style={{fontSize: "15px", margin: "40px", display: isMFA ? "none" : null }}>
                    Enter Code to complete Two
                    Factor authenticator Process.</div> : null}
                {secret ? <div>
                    <input style={{padding: "8px 16px", display: isMFA ? "none" : null }} 
                    type="number" value={code} onChange={(e) => setCode(e.target.value)}
                    placeholder="Authenticator code" />
                </div> : null}
            </div>
            {isMFA && <div style={{color: "green", display: "flex", 
                alignItems: "center", flexDirection: "column"}}>
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

TwoFactorAuthenticatorPage.propTypes = {
    isMFA: PropTypes.bool,
    code: PropTypes.string,
    loading: PropTypes.bool,
    qrCode: PropTypes.string,
    secret: PropTypes.string,
    successMessage: PropTypes.string
}

export default TwoFactorAuthenticatorPage;