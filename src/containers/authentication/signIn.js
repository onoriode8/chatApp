import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
        console.log("testing");
        const dataEntered = e.target.value;
        console.log(dataEntered)
        setUsername(dataEntered);
    }

    const onChangePasswordHandler = (e) => {
        const passwordDataEntered = e.target.value;
        console.log(passwordDataEntered)
        setPassword(passwordDataEntered);
    }

    const setPrevStateHandler = () => {
        setShowPassword(prevState => !prevState);
    }


    const onSubmitFuncHandler = async (e) => {
        // e.preventDefault();
        console.log("LOGIN!!!");
        try {
            setLoading(true);
            const response = await axios.post("https://final-year-project-pijh.onrender.com/signin", {
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData);
            }
            setLoading(false)
            console.log("REGISTER!!!");
            const data = {
                auth: true 
            }
            sessionStorage.setItem("auth", data);
            console.log("SERVER RESPONSE IN SIGIN", responseData)
            navigate("/home")
            window.location.reload("/home");
        } catch(err) {
            setLoading(false)
            setError(err.message);
        }
    }

    // console.log("sub", onSubmitFuncHandler())

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