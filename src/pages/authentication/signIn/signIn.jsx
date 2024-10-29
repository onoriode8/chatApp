import Authentication from "../../../Reuse/authentication/authentication";


const signIn = ({ emailOrUsername, password, onChangeEmailOrUsernameHandler,
    onChangePasswordHandler, onSubmitFuncHandler, showPassword, setPrevStateHandler }) => (
    <div>
        <Authentication 
            emailOrUsername={emailOrUsername} password={password}
            onChangePasswordHandler={onChangePasswordHandler}
            onChangeEmailOrUsernameHandler={onChangeEmailOrUsernameHandler}
            onSubmitSignInHandler={onSubmitFuncHandler}
            showPassword={showPassword}
            setPrevStateHandler={setPrevStateHandler}

            header="Sign in to BaseDay" titleOnButton="Sign in"
            paragraph="New to BaseDay?" account="Create an account" path="/signup/new-user"
        />
    </div>
);

export default signIn;