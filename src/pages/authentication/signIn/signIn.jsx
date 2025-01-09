import Authentication from "../../../Reuse/authentication/authentication";


const signIn = ({ username, password, onChangeUsernameHandler,
    onChangePasswordHandler, onSubmitFuncHandler, showPassword, 
    showSignIn, setPrevStateHandler, error, loading }) => (
    <div> 
        <Authentication 
            username={username} password={password}
            onChangePasswordHandler={onChangePasswordHandler}
            onChangeUsernameHandler={onChangeUsernameHandler}
            onSubmitFuncHandler={onSubmitFuncHandler}
            showPassword={showPassword}
            setPrevStateHandler={setPrevStateHandler}
            error={error} loading={loading}

            showSignIn={showSignIn}
            header="Sign in to BaseDay" titleOnButton="Sign in"
            paragraph="New to BaseDay?" account="Create an account"
            path="/signup/new-user"
        />
    </div>
);

export default signIn;