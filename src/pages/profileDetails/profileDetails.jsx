import { IoIosArrowBack } from 'react-icons/io'

import './profileDetails.css';


const profileDetails = ({ navigate }) => (
    <div>
        <div className="profile_details">PROFILE</div>
        <div className="profile_details_containers">
            <div className="profile_details_containers_wrapper">
            <div onClick={navigate}><IoIosArrowBack className="profile_details_icon"/></div>
                <div className="profile_details_image_edit">
                    <div className="profile_details_profile_image">
                        <div>profile image</div>
                        <div>edit and icon</div>
                    </div>
                </div>
                <div className="profile_details_fullname_refCode">
                    <div>full name</div>
                    <div>RefCode: _________</div>
                </div>
                <div className="profile_details_wrapper_fullname_container">
                    <div className="profile_details_fullname_containers">
                        <div>Full Name</div>
                        <div>_________</div>
                    </div>
                    <div className="profile_details_accountnumber_containers">
                        <div>Account Number</div>
                        <div>_________</div>
                    </div>
                    <div className="profile_details_emails_containers">
                        <div>Email</div>
                        <div>_________</div>
                    </div>
                    <div className="profile_details_gender_containers">
                        <div>Gender</div>
                        <div>_________</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default profileDetails;