import { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

import SignUp from "../../pages/authentication/signup/signup";



//function to register new users.
const SignUpFunction = () => {
    // sessionStorage.removeItem("user") 

    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()


    const onChangeEmailHandler = (e) => {
        const dataEntered = e.target.value;
        setEmail(dataEntered);
    }

    const onChangeUsernameHandler = (e) => {
        const dataEntered = e.target.value;
        setUserName(dataEntered);
    }

    const onChangePasswordHandler = (e) => {
        const passwordDataEntered = e.target.value;
        setPassword(passwordDataEntered);
    }

    const setPrevStateHandler = () => {
        setShowPassword(prevState => !prevState);
    }

    const onSubmitFuncHandler = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await fetch("https://final-year-project-pijh.onrender.com/signup", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                    phoneNumber: phoneNumber
                }),
                headers: {
                    "Content-Type" : "application/json"
                }
            })

            const responseData = await response.json();
            if(!response.ok && response.status !== 200) {
                throw new Error(responseData);
            }
            setLoading(false);
            const data = true;
            const userData = {
                id: responseData.id,
                balance: responseData.balance,
                fullname: responseData.fullname,
                email: responseData.email,
                referenceCode: responseData.referenceCode,
                walletNumber: responseData.walletNumber,
                notification: responseData.notification,
                image: responseData.image,
                username: response.username,
                token: responseData.token
            }
            const authData = JSON.stringify(data);
            const userParsedToString = JSON.stringify(userData);

            sessionStorage.setItem("auth", authData);
            sessionStorage.setItem("user", userParsedToString);
            window.location.href = "/home";
            navigate("/home");
            window.location.reload();
        } catch(err) {
            setLoading(false)
            setError(err.message);
        }
    }


    return (
        <div>
            <SignUp email={email} password={password} username={username}
                onChangeUsernameHandler={onChangeUsernameHandler}
                onChangePasswordHandler={onChangePasswordHandler}
                onChangeEmailHandler={onChangeEmailHandler}
                setPhoneNumber={(e) =>setPhoneNumber(e.target.value)}
                onSubmitFuncHandler={onSubmitFuncHandler}
                showPassword={showPassword}
                setPrevStateHandler={setPrevStateHandler}

                error={error} loading={loading}
            />
        </div>
    )
}

export default SignUpFunction;