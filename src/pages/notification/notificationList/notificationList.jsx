import "./notificationList.css";


const notificationList = (props) => {
    return (
        <div className="notification_container_wrapper">
            <div>
                <p><strong>{props.message.toUpperCase()}</strong></p>
                <p>Here goes the IP address used to register this account.</p>
                <p>{props.ip}</p>
                <p><strong>Registeration Date: {props.date}</strong></p>
            </div>
        </div>
    )
}

export default notificationList;