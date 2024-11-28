import NotificationList from "";


const notification = ({ parsedUserData }) => {
    const mapNotification = parsedUserData.notification;
    let mapData;
    if(mapNotification.length !== 0) {
        mapData = mapNotification.map(item => <NotificationList
            key={item.date} message={item.message} date={item.date}
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