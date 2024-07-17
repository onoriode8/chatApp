import { IoIosArrowBack, IoMdEyeOff } from 'react-icons/io';


import "./ChangePasswordComponentPage.css";


const changePasswordComponentPage = ({ navigate }) => (
    <div className="changePasswordComponentPage_container">
        <div className="changePasswordComponentPage_header_wrapper">
            <div><IoIosArrowBack onClick={navigate} /></div>
            <div>Change Login Password</div>
            <div></div>
        </div>
        <div className="changePasswordComponentPage_input_wrapper">
            <div className="changePasswordComponentPage_currentPassword">
                <div className="changePasswordComponentPage_current_wrapper">
                    <input type="text" placeholder="Current Password" />
                    <div><IoMdEyeOff style={{fontSize: "1.5em"}} /></div>
                </div>
                <div>
                    <div>Enter digits</div>
                    <div>error message = password can't be empty.</div>
                </div>
            </div>
            <div className="changePasswordComponentPage_currentPassword">
                <div className="changePasswordComponentPage_current_wrapper">
                    <input type="text" placeholder="Create a New Password" />
                    <div><IoMdEyeOff style={{fontSize: "1.5em"}} /></div>
                </div>
                <div>
                    <div>Enter digits</div>
                    <div>error message = password can't be empty.</div>
                </div>
            </div>
            <div className="changePasswordComponentPage_currentPassword">
                <div className="changePasswordComponentPage_current_wrapper">
                    <input type="text" placeholder="Confirm New Password" />
                    <div><IoMdEyeOff style={{fontSize: "1.5em"}} /></div>

                </div>
                <div>
                    <div>Enter digits</div>
                    <div>error message = password can't be empty.</div>
                </div>
            </div>
            <div className="changePasswordComponentPage_changePassword_button">
                <button>Change Password</button>
            </div>
        </div>
    </div>
);

export default changePasswordComponentPage;