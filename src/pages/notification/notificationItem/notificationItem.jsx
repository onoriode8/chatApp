import NotificationList from "../notificationList/notificationList";


const notification = ({ parsedUserData }) => {
    const mapNotification = parsedUserData.notification;
    let mapData;
    if(mapNotification.length !== 0) {
        mapData = mapNotification.map(item => <NotificationList
            key={item.id} message={item.message} date={item.date}
            ip={item.ip}
            />)
    }

    return (
        <div>
            {mapData}
        </div>
    )
}

export default notification;