// import Navlink from "../navlink/navlink";
import { useContext } from "react";

import { MdCircleNotifications, MdHome } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "../../hooks/context";


import './sidedrawerList.css';


const SidedrawerList = () => {
 const sessionData = sessionStorage.getItem("user");

  const parsedUserData = JSON.parse(sessionData);

  const { logout } = useContext(AuthContext);
  
  const styleList = {
    listStyle: "none"
  }

  const styles = {
    fontSize: "20px",
    padding: "12px 20px"
  }
    return (
    <div className="sidedrawerList_wrapper_">
        <div>
            <div>LOGO</div> 
        </div>
        <div style={{marginTop: "20px"}}>
            <div>
                <li style={styleList}><a href="/home" 
                    title="Home"><MdHome style={styles}/></a></li>

                <li style={styleList}><a href="/notification" 
                    title="Notification"><MdCircleNotifications
                    style={styles} /></a></li>

                <li style={styleList}><a href={`/profile/${parsedUserData.id}`}
                    title="Profile"><RxAvatar style={styles}/></a></li>

                <li style={styleList}><a href='/settings' 
                    title="Settings"><IoMdSettings style={styles}/></a></li>

                <li style={styleList} onClick={logout} 
                    title="Logout"><AiOutlineLogout style={styles}/>
                </li>
            </div>
        </div>
    </div>
  );
}

export default SidedrawerList;