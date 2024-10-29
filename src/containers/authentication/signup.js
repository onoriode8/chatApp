import { useState } from "react";


import SignUp from "../../pages/authentication/signup/signup";



//function to register new users.
const SignUpFunction = () => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const onChangeEmailOrUsernameHandler = (e) => {
        const dataEntered = e.target.value;
        console.log("Signup on EMail & Username", dataEntered);
        setEmailOrUsername(dataEntered);
    }

    const onChangePasswordHandler = (e) => {
        const passwordDataEntered = e.target.value;
        console.log("signUp for password", passwordDataEntered)
        setPassword(passwordDataEntered);
    }

    const setPrevStateHandler = () => {
        setShowPassword(prevState => !prevState);
    }

    const onSubmitFuncHandler = (e) => {
        e.preventDefault();
    }


    return (
        <div>
            <SignUp emailOrUsername={emailOrUsername} password={password}
                onChangePasswordHandler={onChangePasswordHandler}
                onChangeEmailOrUsernameHandler={onChangeEmailOrUsernameHandler}
                onSubmitFuncHandler={onSubmitFuncHandler}
                showPassword={showPassword}
                setPrevStateHandler={setPrevStateHandler}
            />
        </div>
    )
}

export default SignUpFunction;