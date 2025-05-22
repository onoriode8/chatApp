import { useContext } from 'react'
import { FcMultipleCameras } from "react-icons/fc"

import  { AuthContext } from '../../hooks/context'
import Loading from '../loader/loading/loading';
import { useImagePicker, useUploadProfile } from '../../hooks/image-picker';


import './profile.css'

const Profile = () => {
    const { user } = useContext(AuthContext)
    let serverProfile = null;
    if(user) {
        serverProfile = `${process.env.REACT_APP_FRONTEND_URL}/${user.profile}`
    }

    const {openFileHandler, 
        imageRef, imageUrl, files,
        filePickerHandler} = useImagePicker()

    const { updateProfileHandler,
        loading } = useUploadProfile(files, imageUrl)
    
    const profile = imageUrl === undefined ? serverProfile : imageUrl

    return (
        <div className="profile_wrapper">
            <div>
                <img src={`${profile}`} alt="" />
                <div title="upload photo" onClick={openFileHandler}>
                    <FcMultipleCameras />
                    <input ref={imageRef} type="file" 
                        style={{display: "none"}} 
                        onChange={filePickerHandler} 
                    />
                </div>
            </div>
            {imageUrl !== undefined && <button 
                onClick={updateProfileHandler}
                className="profile_button">Update</button>}
            {loading && <Loading />}
            
            {user && <div className="profile_name">
                <p>
                    {user.fullname.toUpperCase()}
                </p>
            </div>}
            <div className="profile_bio_wrapper">
                <p>Hey there am using this chat! 
                    Connect with me for free.
                </p>
            </div>
        </div>
    )
}

export default Profile;
