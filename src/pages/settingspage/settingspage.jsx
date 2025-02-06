import { useContext } from "react"
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io';
import { IoLockClosedOutline } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md';
import { LiaKeySolid } from 'react-icons/lia';
import { TfiPowerOff } from "react-icons/tfi";

import { AuthContext } from "../../hooks/context";

import "./settingspage.css";


const SettingsPage = ({ navigate, parsedUserData }) => {
    const { logout } = useContext(AuthContext)

    return (
    <div>
        <div className="settingsPage_wrappers">
            <header className="settingsPage_header_wrapper">
                <div onClick={navigate} title="goBack">
                    <IoIosArrowBack className="settingsPage_arrowback_icon"/>
                </div>
                <div className="settingsPage_settings_div">
                    <div>Settings</div>
                </div>
            </header>
            <div className="settingsPage_change_password_container">
                <div><IoLockClosedOutline /> change login password</div>
                <Link to="/change_password/userId"><MdKeyboardArrowRight /></Link>
            </div>
            <div className="settingsPage_change_password_container">
                <div><IoLockClosedOutline /> change Transaction pin</div>
                <Link to=""><MdKeyboardArrowRight /></Link>
            </div>
            <div className="settingsPage_change_password_container">
                <div><LiaKeySolid /> Two factor Authenticator</div>
                <Link to="/two_factor_authenticator"><MdKeyboardArrowRight /></Link>
            </div>
            <div className="settingsPage_change_password_container">
                <div><TfiPowerOff /> Close Account</div>
                <Link to=""><MdKeyboardArrowRight /></Link>
            </div>
        </div>
        <div className="settingsPage_signout" onClick={logout}>Sign out</div>
    </div>
)}

export default SettingsPage;