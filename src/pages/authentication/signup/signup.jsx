import Authentication from "../../../Reuse/authentication/authentication";


const signUp = ({ emailOrUsername, password, onChangeEmailOrUsernameHandler,
    onChangePasswordHandler, onSubmitFuncHandler, showPassword,
    setPrevStateHandler }) => (
    <div>
        <Authentication 
            emailOrUsername={emailOrUsername} password={password}
            onChangePasswordHandler={onChangePasswordHandler}
            onChangeEmailOrUsernameHandler={onChangeEmailOrUsernameHandler}
            onSubmitSignInHandler={onSubmitFuncHandler}
            showPassword={showPassword}
            setPrevStateHandler={setPrevStateHandler}

            header="Sign up to BaseDay" titleOnButton="Sign up"
            paragraph="Already have an account?" account="Login" path="/" 
        />
    </div>
);

export default signUp;