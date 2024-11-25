import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SignUp from "../../pages/authentication/signup/signup";



//function to register new users.
const SignUpFunction = () => {
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()


    const onChangeEmailHandler = (e) => {
        const dataEntered = e.target.value;
        console.log("Signup on EMail", dataEntered); 
        setEmail(dataEntered);
    }

    const onChangeUsernameHandler = (e) => {
        const dataEntered = e.target.value;
        console.log("Signup on Username", dataEntered); 
        setUserName(dataEntered);
    }

    const onChangePasswordHandler = (e) => {
        const passwordDataEntered = e.target.value;
        console.log("signUp for password", passwordDataEntered)
        setPassword(passwordDataEntered);
    }

    const setPrevStateHandler = () => {
        setShowPassword(prevState => !prevState);
    }

    const onSubmitFuncHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = 
            await axios.post("https://final-year-project-pijh.onrender.com/signup", {
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password
                })
            })
            const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData);
            }
            setLoading(false)
            const data = {
                auth: true
            }
            sessionStorage.setItem("auth", data);
            console.log("SERVER RESPONSE IN SIGNUP", responseData);
            navigate("/home");
            window.location.reload("/home");
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
                onSubmitFuncHandler={onSubmitFuncHandler}
                showPassword={showPassword}
                setPrevStateHandler={setPrevStateHandler}

                error={error} loading={loading}
            />
        </div>
    )
}

export default SignUpFunction;