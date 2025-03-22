

import profile from '../../assets/profile.avif' 

import { MdOutlineMailOutline } from "react-icons/md";
import { FcLock, FcMultipleCameras } from "react-icons/fc";

import { useImagePicker } from '../../hooks/image-picker';
import { useSignup } from '../../hooks/authentication';
import Loading from '../loading/loading';

import './authentication.css'


const Authentication = ({btnTitle}) => {
    const {imageUrl, imageRef, openFileHandler, filePickerHandler} = useImagePicker()
    const { loading, onChangeEmailHandler, onChangePasswordHandler, signupUserHandler} = useSignup()
    
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
                <input type="email" placeholder="Email" onChange={onChangeEmailHandler}/>
            </div>
            <div className="authentication_password_wrapper">
                <div><FcLock /></div>
                <input type="password" placeholder="password" onChange={onChangePasswordHandler}/>
            </div>
            <button type="submit">
                <div>
                    <div></div>
                    <div>{btnTitle} Signup </div>
                    {loading && <Loading />}
                    {!loading && <div></div>} 
                </div>
            </button>
        </form>
    </div>
    )
}

export default Authentication;