import { useContext } from 'react'

import NotificationList from "../notificationList/notificationList";
import Header from "../../../Reuse/header/header";
import { AuthContext } from '../../../hooks/context';

const Notification = ({ navigate }) => {
    const { notification } = useContext(AuthContext)
    // parsedUserData.notification;
    let mapData;
    if(notification.length !== 0) {
        mapData = notification.map(item => <NotificationList
            key={item.id} message={item.message} date={item.date}
            ip={item.ip}
        />)
    }

    return (
        <div>
            <Header header="Notification" navigate={navigate} />
            {mapData}
        </div>
    )
}

export default Notification;