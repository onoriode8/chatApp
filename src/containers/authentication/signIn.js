import { useState } from "react";
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
            const data = true;
            const userData = {
                id: responseData.id,
                balance: responseData.balance,
                fullname: responseData.fullname,
                email: responseData.email,
                walletNumber: responseData.walletNumber,
                notification: responseData.notification,
                image: responseData.image,
                username: responseData.username,
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
            <SignIn username={username} password={password}
                onChangePasswordHandler={onChangePasswordHandler}
                onChangeUsernameHandler={onChangeUsernameHandler}
                onSubmitFuncHandler={onSubmitFuncHandler}
                showPassword={showPassword}
                setPrevStateHandler={setPrevStateHandler}
                error={error} loading={loading}
                showSignIn={true}
            />
        </div>
    )
}

export default SignInFunction;