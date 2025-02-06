import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';

import SignIn from "../../pages/authentication/signIn/signIn";


//function to login an existing users.
const SignInFunction = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);


    const [responseData, setResponseData] = useState(null)
    const [code, setCode] = useState("")


    const navigate = useNavigate()


    const onChangeUsernameHandler = (e) => {
        const dataEntered = e.target.value;
        setUsername(dataEntered);
    }

    const onChangePasswordHandler = (e) => {
        const passwordDataEntered = e.target.value;
        setPassword(passwordDataEntered);
    }

    const setPrevStateHandler = () => {
        setShowPassword(prevState => !prevState);
    }


    const onSubmitFuncHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch("https://final-year-project-pijh.onrender.com/signin", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData);
            }
            setLoading(false)
            setUsername("")
            setPassword("")
            if(!responseData.isMFA) {
                const data = true;
                const userData = {
                    id: responseData.id,
                    // balance: responseData.balance,
                    // fullname: responseData.fullname,
                    // email: responseData.email,
                    // referenceCode: responseData.referenceCode,
                    // walletNumber: responseData.walletNumber,
                    // notification: responseData.notification,
                    // image: responseData.image,
                    // username: responseData.username,
                    token: responseData.token,
                    // isMFA: responseData.isMFA
                }
                const authData = JSON.stringify(data);
                const userParsedToString = JSON.stringify(userData);

                sessionStorage.setItem("auth", authData);
                sessionStorage.setItem("user", userParsedToString);
                navigate("/home");
            }
           
            if(responseData.isMFA) {
                setResponseData(responseData)
            }
        } catch(err) {
            setLoading(false)
            setUsername("")
            setPassword("")
            setError(err.message);
            setTimeout(() => {
                setError(null);
            }, 3000)
        }
    }


    //verify 2FA Code when loggedIn if isMFA is true/already verified before.
    useEffect(() => {
        if(code === null || code.length !== 6 || !responseData.secret) return;
        if(!responseData.isMFA) return
        const submitCodeHandler = async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://final-year-project-pijh.onrender.com/signin/verify/2fa/token`, {
                    method: "POST",
                    body: JSON.stringify({
                        code: code,
                        secret: responseData.secret, 
                        userId: responseData.id
                    }),
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : "Bearer " + responseData.token
                    }
                })
                const responseParsedData = await response.json();
                if(!response.ok) {
                    throw new Error(responseParsedData);
                }

                setLoading(false)
                setCode("")
                const data = true;
                const userData = {
                    id: responseData.id, 
                    // balance: responseData.balance,
                    // fullname: responseData.fullname,
                    // email: responseData.email,
                    // referenceCode: responseData.referenceCode,
                    // walletNumber: responseData.walletNumber,
                    // notification: responseData.notification,
                    // image: responseData.image,
                    // username: responseData.username,
                    token: responseData.token,
                    // isMFA: responseData.isMFA
                }
                const authData = JSON.stringify(data);
                const userParsedToString = JSON.stringify(userData);

                sessionStorage.setItem("auth", authData);
                sessionStorage.setItem("user", userParsedToString);
                navigate("/home")
            } catch(err) {
                setLoading(false)
                setCode("")
                setError(err.message)
                setTimeout(() => {
                    setError(null);
                }, 3000)
            }
        }
        submitCodeHandler()
    }, [code, responseData, navigate])


    return (
        <div>
            <SignIn username={username} password={password}
                onChangePasswordHandler={onChangePasswordHandler}
                onChangeUsernameHandler={onChangeUsernameHandler}
                onSubmitFuncHandler={onSubmitFuncHandler}
                showPassword={showPassword}
                setPrevStateHandler={setPrevStateHandler}
                error={error} loading={loading}
                showSignIn={true}

                responseData={responseData} code={code} setCode={setCode}
            />
        </div>
    )
}

export default SignInFunction;