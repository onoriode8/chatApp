import { useContext } from 'react';

import { AuthContext } from '../../hooks/context';
import { IoIosArrowBack } from 'react-icons/io'
import { CgProfile } from "react-icons/cg";

import './profileDetails.css';


const ProfileDetails = ({ navigate }) => {
    const parsedUserData = useContext(AuthContext)
    return (
    <div>
        <div className="profile_details">PROFILE</div>
        <div className="profile_details_containers">
            <div className="profile_details_containers_wrapper">
            <div onClick={navigate}><IoIosArrowBack className="profile_details_icon"/></div>
                <div className="profile_details_image_edit">
                    <div className="profile_details_profile_image">
                        <div><CgProfile style={{color: "green", fontSize: "30px"}}/></div>
                        {/* <div>edit and icon</div> */}
                    </div>
                </div>
                <div className="profile_details_fullname_refCode">
                    <div>{parsedUserData.fullname}</div>
                    <div>RefCode: {parsedUserData.referenceCode}</div>
                </div>
                <div className="profile_details_wrapper_fullname_container">
                    <div className="profile_details_fullname_containers">
                        <div>Full Name</div>
                        <div>{parsedUserData.fullname ? parsedUserData.fullname.toUpperCase() : null}</div>
                    </div>
                    <div className="profile_details_accountnumber_containers">
                        <div>Account Number</div>
                        <div>{parsedUserData.walletNumber}</div>
                    </div>
                    <div className="profile_details_emails_containers">
                        <div>Email</div>
                        <div>{parsedUserData.email}</div>
                    </div>
                    <div className="profile_details_gender_containers">
                        <div>Gender</div>
                        <div>None</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default ProfileDetails;