import Authentication from "../../../Reuse/authentication/authentication";


const signUp = ({ email, username, password, phoneNumber, onChangeEmailHandler,
    onChangeUsernameHandler, onChangePasswordHandler, setPhoneNumber,
     onSubmitFuncHandler, showPassword, error, loading,
    setPrevStateHandler }) => (
    <div>
        <Authentication 
            email={email} password={password} username={username}
            setPhoneNumber={setPhoneNumber} phoneNumber={phoneNumber}
            onChangePasswordHandler={onChangePasswordHandler}
            onChangeEmailHandler={onChangeEmailHandler}
            onChangeUsernameHandler={onChangeUsernameHandler}
            onSubmitFuncHandler={onSubmitFuncHandler}
            showPassword={showPassword}
            setPrevStateHandler={setPrevStateHandler}
            error={error} loading={loading}

            header="Sign up to BaseDay" titleOnButton="Sign up"
            paragraph="Already have an account?" account="Login" path="/" 
        />
    </div>
);

export default signUp;