import { IoIosArrowBack, IoMdEyeOff } from 'react-icons/io';
import { useChangeLoginPassword } from "../../containers/use-context-hook";
import Loading from '../loading/loading';
import Spinner from '../loading/spinner/spinner';

import "./ChangePasswordComponentPage.css";
import Error from '../errorMessage/error';


const ChangePasswordComponentPage = ({ navigate }) => {
    const { setCurrentPassword, setCreateNewPassword, setConfirmNewPassword, passwordBoolean, 
        showPasswordVisibility, togglePasswordVisibilityHandler, passwordMatchBoolean, error, errorHandler, 
        submitChangeLoginPasswordHandler, isLoading } = useChangeLoginPassword();

    let errorMessage = <div>Enter digits</div>
    if(passwordBoolean === true) {
        errorMessage = <p className="changePasswordComponentPage_errorMessage">
            password can't be empty.
        </p>
    }

    let spinner = null;
    if(isLoading === true) {
        spinner = (
            <div>
                <div><Loading /></div>
                <div><Spinner /></div>
            </div>
        );
    }

    return (
    <>
    {spinner}
    {error ? <Error error={error} errorFun={errorHandler} /> : null}
    <div className="changePasswordComponentPage_container">
        <div className="changePasswordComponentPage_header_wrapper">
            <div><IoIosArrowBack onClick={navigate} /></div>
            <div>Change Login Password</div>
            <div></div>
        </div>
        <div className="changePasswordComponentPage_input_wrapper">
            <div className="changePasswordComponentPage_currentPassword">
                <div className="changePasswordComponentPage_current_wrapper">
                    <input type={showPasswordVisibility ? "text" : "password"} placeholder="Current Password" 
                       onChange={(event) => setCurrentPassword(event.target.value)}/>
                    <div><IoMdEyeOff style={{fontSize: "1.5em"}} onClick={togglePasswordVisibilityHandler}/></div>
                </div>
                <div>
                    {/* <div>Enter digits</div> */}
                    {errorMessage}
                </div>
            </div>
            <div className="changePasswordComponentPage_currentPassword">
                <div className="changePasswordComponentPage_current_wrapper">
                    <input type={showPasswordVisibility ? "text" : "password"} placeholder="Create a New Password" 
                        onChange={(event) => setCreateNewPassword(event.target.value)}/>
                    <div><IoMdEyeOff style={{fontSize: "1.5em"}} /></div>
                </div>
                <div>
                    {/* <div>Enter digits</div> */}
                    {errorMessage}
                </div>
            </div>
            <div className="changePasswordComponentPage_currentPassword">
                <div className="changePasswordComponentPage_current_wrapper">
                    <input type={showPasswordVisibility ? "text" : "password"} placeholder="Confirm New Password" 
                        onChange={(event) => setConfirmNewPassword(event.target.value)}/>
                    <div><IoMdEyeOff style={{fontSize: "1.5em"}} /></div>
                </div>
                <div>
                    {/* <div>Enter digits</div> */}
                    {errorMessage}
                    {passwordMatchBoolean ? <p className="changePasswordComponentPage_errorMessage">Password don't match</p> : null}
                </div>
            </div>
            <div className="changePasswordComponentPage_changePassword_button">
                <button onClick={submitChangeLoginPasswordHandler}>Change Password</button>
            </div>
        </div>
    </div>
    </>
  );
};

export default ChangePasswordComponentPage;