import { useState } from "react";


import SignIn from "../../pages/authentication/signIn/signIn";


//function to login an existing users.
const SignInFunction = () => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const onChangeEmailOrUsernameHandler = (e) => {
        const dataEntered = e.target.value;
        console.log(dataEntered)
        setEmailOrUsername(dataEntered);
    }

    const onChangePasswordHandler = (e) => {
        const passwordDataEntered = e.target.value;
        console.log(passwordDataEntered)
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
            <SignIn emailOrUsername={emailOrUsername} password={password}
                onChangePasswordHandler={onChangePasswordHandler}
                onChangeEmailOrUsernameHandler={onChangeEmailOrUsernameHandler}
                onSubmitFuncHandler={onSubmitFuncHandler}
                showPassword={showPassword}
                setPrevStateHandler={setPrevStateHandler}
            />
        </div>
    )
}

export default SignInFunction;