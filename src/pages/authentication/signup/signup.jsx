import { NavLink } from 'react-router-dom';
import profile from '../../../assets/profile.avif' 

import { MdOutlineMailOutline } from "react-icons/md";
import { FcLock, FcMultipleCameras } from "react-icons/fc";

import { useImagePicker } from '../../../hooks/image-picker';
import { useSignup } from '../../../hooks/authentication';
import Loading from '../../loading/loading';

import './signup.css'


const Signup = () => {
    const {imageUrl, imageRef, openFileHandler,
        filePickerHandler} = useImagePicker()
    const { loading, onChangeEmailHandler, 
        email, password, errorMessage,
        onChangePasswordHandler, 
        signupUserHandler} = useSignup()

    //disbled signin button
    let disabled = true;
    if(password.trim().length >= 6 && email.trim().length >= 12 &&
        imageUrl !== undefined) {
        disabled =  false
    }

    return (
    <div className="authentication_wrapper">
        <div className="authentication_image_wrapper">
            <div className="authentication_camera_picker">
                {!imageUrl && <img src={profile} alt="non_profile" />}
                {imageUrl && <img src={imageUrl} alt="choose_profile" />}
                <input ref={imageRef} style={{display: "none"}} type="file" onChange={filePickerHandler} />
                <div onClick={openFileHandler}><FcMultipleCameras /></div>
            </div>
        </div>
        <form className="authentication_form_wrapper" onSubmit={signupUserHandler}>
            <div className="authentication_email_wrapper">
                <div><MdOutlineMailOutline /></div>
                <input type="email" value={email} placeholder="Email" onChange={onChangeEmailHandler}/>
            </div>
            <div className="authentication_password_wrapper">
                <div><FcLock /></div>
                <input type="password" value={password} placeholder="password" onChange={onChangePasswordHandler}/>
            </div>
            <button type="submit" disabled={disabled}>
                <div>
                    <div></div>
                    <div>Signup</div>
                    {loading && <Loading />}
                    {!loading && <div></div>} 
                </div>
            </button>
        </form>
        <NavLink to="/">switch to signin</NavLink>
        {errorMessage &&
        <div className="authentication_errorMessage_p">
            <p><strong>Message: </strong> {errorMessage}</p>
        </div>}
    </div>
    )
}

export default Signup;