import { NavLink } from "react-router-dom";

import { MdOutlineMailOutline } from "react-icons/md";
import { FcLock } from "react-icons/fc";

import { useSignin } from '../../../hooks/authentication';
import Loading from '../../loading/loading';

import './signin.css'


const Signin = () => {
    const { loading, onChangeEmailHandler, 
        email, password,
        onChangePasswordHandler, 
        signupUserHandler} = useSignin()

    //disbled signin button
    let disabled = true;
    if(password.trim().length >= 6 && email.trim().length >= 12 ) {
        disabled =  false
    }

    return (
    <div className="signin_authentication_wrapper">
        <form className="signin_authentication_form_wrapper" 
            onSubmit={signupUserHandler}>
            <div className="signin_authentication_email_wrapper">
                <div><MdOutlineMailOutline /></div>
                <input type="email" value={email} required
                placeholder="Email" onChange={onChangeEmailHandler}/>
            </div>
            <div className="signin_authentication_password_wrapper">
                <div><FcLock /></div>
                <input type="password" value={password} required
                placeholder="password" onChange={onChangePasswordHandler} />
            </div>
            <button disabled={disabled} type="submit"> 
                <div>
                    <div></div> 
                    <div>SignIn </div>
                    {loading && <Loading />}
                    {!loading && <div></div>} 
                </div>
            </button>
        </form>
        <NavLink to="/signup">switch to signup</NavLink>
    </div>
    )
}

export default Signin;