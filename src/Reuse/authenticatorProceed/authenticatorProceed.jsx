

const authenticatorProceed = ({ responseData, code, message,
    setCode, error, greetings, loading }) => (
    <div style={{display: "flex", flexDirection:"column", textAlign: "center"}}>
            <div>
                <div style={{fontFamily: "Times New Roman', Times, serif"}}>
                    <p>{greetings} {responseData.username}</p>
                    <p>Please enter Authenticator code to continue.</p>
                </div>
                <div>
                    <input style={{padding: "8px 16px"}} 
                     type="number" value={code} placeholder="Authenticator Code"
                     onChange={(e) => setCode(e.target.value) } />
                </div>
                <div>
                    <p style={{color: "red"}}>{error}</p>
                </div>     
                {loading && <div>
                    <p style={{textAlign: "center"}}>Loading...</p>
                </div>}  
                <div style={{color: "green"}}>{message}</div>
            </div>
        </div> 
)


export default authenticatorProceed