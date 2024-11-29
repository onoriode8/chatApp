import { useContext } from "react";

import { MdCircleNotifications, MdHome } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "../../hooks/context";

import './navlink.css';



const Navlink = ({styles, display,alignItems,justifyContent,flexDirection}) => {
  const sessionData = sessionStorage.getItem("user");

  const parsedUserData = JSON.parse(sessionData);

  const { logout } = useContext(AuthContext);

  return (
    <div className="navlink_container__QB2X">
      <div style={{display: display, alignItems: alignItems, 
            justifyContent: justifyContent, flexDirection: flexDirection }}>
        <li className="navlink_spacing"><a href="/home" title="Home"><MdHome style={styles} /></a></li>
        <li className="navlink_spacing"><a href="/notification" title="Notification"><MdCircleNotifications style={styles} /></a></li>
        <li className="navlink_spacing"><a href={`/profile/${parsedUserData.id}`} title="Profile"><RxAvatar style={styles}/></a></li>
        <li className="navlink_spacing"><a href='/settings' title="Settings"><IoMdSettings style={styles}/></a></li>
        <li onClick={logout} className="navlink_spacing" title="Logout">
            <AiOutlineLogout style={styles}/></li>
      </div>
    </div>
  )
}

export default Navlink;
