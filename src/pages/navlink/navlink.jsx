import { MdCircleNotifications, MdHome } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";

import './navlink.css';

const userId = 2568456788; //change to real userId from DB/server side.

const navlink = ({styles, display,alignItems,justifyContent,flexDirection}) => (
    <div className="navlink_container__QB2X">
      <div style={{display: display, alignItems: alignItems, 
            justifyContent: justifyContent, flexDirection: flexDirection }}>
        <li className="navlink_spacing"><a href="/" title="Home"><MdHome style={styles} /></a></li>
        <li className="navlink_spacing"><a href="/notification" title="Notification"><MdCircleNotifications style={styles} /></a></li>
        <li className="navlink_spacing"><a href={`/profile/${userId}`} title="Profile"><RxAvatar style={styles}/></a></li>
        <li className="navlink_spacing"><a href='/settings' title="Settings"><IoMdSettings style={styles}/></a></li>
      </div>
    </div>
  );

export default navlink;
